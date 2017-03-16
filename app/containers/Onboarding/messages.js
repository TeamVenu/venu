/*
 * Onboarding Messages
 *
 * This contains all the text for the Onboarding component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'venu.components.Onboarding.header',
    defaultMessage: 'Venu',
  },
  buttons: {
    id: 'venu.components.Onboarding.buttons',
    messages: {
      back: {
        id: 'venu.components.Onboarding.buttons.back',
        defaultMessage: 'Back',
      },
      next: {
        id: 'venu.components.Onboarding.buttons.next',
        defaultMessage: 'Proceed',
      },
      finish: {
        id: 'venu.components.Onboarding.buttons.finish',
        defaultMessage: 'Finish',
      },
      retryGeolocation: {
        id: 'venu.components.Onboarding.buttons.retryGeolocation',
        defaultMessage: 'Enable Geolocation',
      },
    },
  },
  accountCreation: {
    id: 'venu.components.Onboarding.accountCreation',
    messages: {
      title: {
        id: 'venu.components.Onboarding.accountCreation.title',
        defaultMessage: 'Welcome to Venu!',
      },
      intro: {
        id: 'venu.components.Onboarding.accountCreation.intro',
        defaultMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam rem distinctio fugit et, consequatur molestias laudantium placeat laboriosam dolorum a voluptatum autem ipsa quasi quo minus, debitis nihil quaerat officia.',
      },
      subtitle: {
        id: 'venu.components.Onboarding.accountCreation.subtitle',
        defaultMessage: 'Create Account',
      },
      nameLabel: {
        id: 'venu.components.Onboarding.accountCreation.nameLabel',
        defaultMessage: 'Enter your name:',
      },
      emailLabel: {
        id: 'venu.components.Onboarding.accountCreation.emailLabel',
        defaultMessage: 'Enter a valid email:',
      },
    },
  },
  geolocationSetup: {
    id: 'venu.components.Onboarding.geolocationSetup',
    messages: {
      title: {
        id: 'venu.components.Onboarding.geolocationSetup.title',
        defaultMessage: 'Allow Venu to access your location',
      },
      intro: {
        id: 'venu.components.Onboarding.geolocationSetup.intro',
        defaultMessage: ' Venu is a wayfinding app that assists you in finding nearby activities that you might be interested in. For a better experience Venu will need access to your location. Is that ok?',
      },
      location: {
        id: 'venu.components.Onboarding.geolocationSetup.location',
        retrieving: {
          id: 'venu.components.Onboarding.geolocationSetup.location.retrieving',
          defaultMessage: 'Please wait while we retrieve your location. This might take a few seconds.',
        },
        succeeded: {
          id: 'venu.components.Onboarding.geolocationSetup.location.succeeded',
          defaultMessage: 'We have successfuly retrieved your location! You may now continue the setup process.',
        },
        failed: {
          id: 'venu.components.Onboarding.geolocationSetup.location.failed',
          defaultMessage: 'You have denied access to access your location. Please follow the steps below to retry. Otherwise you may proceed to the next step if you wish geolocation to remain turned off. Some features will be unavailable.',
        },
        unavailable: {
          id: 'venu.components.Onboarding.geolocationSetup.location.unavailable',
          defaultMessage: 'It appears that your device has location tracking services disabled. Please follow the steps below to retry. Otherwise you may proceed to the next step if you wish geolocation to remain turned off. Some features will be unavailable.',
        },
      },
      device: {
        id: 'venu.components.Onboarding.geolocationSetup.device',
        android: {
          id: 'venu.components.Onboarding.geolocationSetup.device.android',
          chrome: {
            id: 'venu.components.Onboarding.geolocationSetup.device.android.chrome',
            defaultMessages: [
              'ANDROID',
              'CHROME',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
          firefox: {
            id: 'venu.components.Onboarding.geolocationSetup.device.android.firefox',
            defaultMessages: [
              'ANDROID',
              'FIREFOX',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
        },
        ios: {
          id: 'venu.components.Onboarding.geolocationSetup.device.ios',
          chrome: {
            id: 'venu.components.Onboarding.geolocationSetup.device.ios.chrome',
            defaultMessages: [
              'iOS',
              'CHROME',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
          firefox: {
            id: 'venu.components.Onboarding.geolocationSetup.device.ios.firefox',
            defaultMessages: [
              'iOS',
              'FIREFOX',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
          safari: {
            id: 'venu.components.Onboarding.geolocationSetup.device.ios.safari',
            defaultMessages: [
              'iOS',
              'SAFARI',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
        },
        web: {
          id: 'venu.components.Onboarding.geolocationSetup.device.web',
          chrome: {
            id: 'venu.components.Onboarding.geolocationSetup.device.web.chrome',
            defaultMessages: [
              'WEB',
              'CHROME',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
          edge: {
            id: 'venu.components.Onboarding.geolocationSetup.device.web.edge',
            defaultMessages: [
              'WEB',
              'MICROSOFT EDGE',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
          firefox: {
            id: 'venu.components.Onboarding.geolocationSetup.device.web.firefox',
            defaultMessages: [
              'WEB',
              'FIREFOX',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
          ie: {
            id: 'venu.components.Onboarding.geolocationSetup.device.web.ie',
            defaultMessages: [
              'WEB',
              'INTERNET EXPLODER (why?)',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
          safari: {
            id: 'venu.components.Onboarding.geolocationSetup.device.web.safari',
            defaultMessages: [
              'WEB',
              'SAFARI',
              'INSTRUCTIONS ON HOW TO ENABLE GEOLOCATION',
            ],
          },
        },
      },
    },
  },
});
