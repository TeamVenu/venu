/*
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

// User method
const makeSelectUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('user')
);

// Exhibits method
const makeSelectExhibits = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('exhibits')
);

// Facilities method
const makeSelectFacilities = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('facilities')
);

// Onboarding validation method
const makeSelectOnboardingValidation = () => createSelector(
  selectGlobal,
  (onboardingState) => onboardingState.get('validation')
);

// MapMode method
const makeSelectMapMode = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('mapMode')
);

// Current Place method
const makeSelectCurrentPlace = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentPlace')
);

// Venu Map Props method
const makeSelectVenuMap = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('venuMap')
);

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectUser,
  makeSelectVenuMap,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectCurrentPlace,
  makeSelectLocationState,
  makeSelectOnboardingValidation,
};
