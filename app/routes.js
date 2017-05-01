// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Home'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(partialNextState, cb) {
          const importModules = Promise.all([
            import('containers/App/sagas'),
            import('containers/Main'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([sagas, component]) => {
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      childRoutes: [
        {
          path: ':place/:zone/:code/:id',
          name: 'place',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/App/sagas'),
              import('containers/DetailView'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    },
    {
      path: '/itinerary',
      name: 'itinerary',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/Itinerary'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: ':place/:zone/:code/:id',
          name: 'place',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/App/sagas'),
              import('containers/DetailView'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/Search'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: ':place/:zone/:code/:id',
          name: 'place',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/App/sagas'),
              import('containers/DetailView'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/Profile'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: ':place/:zone/:code/:id',
          name: 'place',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/App/sagas'),
              import('containers/DetailView'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    },
    {
      path: '/changeinterests',
      name: 'changeInterests',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/Profile/ChangeInterests'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/changeparking',
      name: 'changeParking',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/Profile/ChangeParking'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/directions',
      name: 'directions',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/Directions'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/login',
      name: 'signIn',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/SignIn'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/sagas'),
          import('containers/Onboarding'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFound')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
