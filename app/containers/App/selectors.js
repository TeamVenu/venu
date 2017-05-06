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

const makeSelectIsSignedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isSignedIn')
);

// Error method
const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

// Success method
const makeSelectSuccess = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('success')
);

// Loading method
const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

// User Email method
const makeSelectUserId = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('uid')
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

const makeSelectIsAccountCreated = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('isAccountCreated')
);

const makeSelectDestination = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('destination')
);

const makeSelectIsLocationEnabled = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isLocationEnabled')
);

const makeSelectTimer = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('timer')
);

const makeSelectMapCenter = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('center')
);

export {
  selectGlobal,
  makeSelectUser,
  makeSelectTimer,
  makeSelectError,
  makeSelectUserId,
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectVenuMap,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectMapCenter,
  makeSelectFacilities,
  makeSelectIsSignedIn,
  makeSelectDestination,
  makeSelectCurrentPlace,
  makeSelectLocationState,
  makeSelectIsAccountCreated,
  makeSelectIsLocationEnabled,
  makeSelectOnboardingValidation,
};
