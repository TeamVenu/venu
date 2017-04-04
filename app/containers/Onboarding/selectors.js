import { createSelector } from 'reselect';

const selectOnboarding = (state) => state.get('onboarding');

const makeSelectOnboardingStage = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('stage')
);

const makeSelectDisplayName = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('name')
);

const makeSelectAge = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('age')
);

const makeSelectEmail = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('email')
);

const makeSelectPassword = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('password')
);

const makeSelectRePassword = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('rePassword')
);

const makeSelectUserLocation = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('location')
);

const makeSelectGeolocationMode = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('geolocationMode')
);

const makeSelectParking = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('parking')
);

const makeSelectInterests = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('interests')
);

const makeSelectEmailValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('isEmailValid')
);

const makeSelectPasswordValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('isPasswordValid')
);

const makeSelectNameValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('isNameValid')
);

const makeSelectAgeValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('isAgeValid')
);

const makeSelectLocationValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('isLocationValid')
);

const makeSelectInterestsValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('areInterestsValid')
);

const makeSelectOnboardingErrorMessages = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('errorMessages')
);

const makeSelectOnboardingValidation = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('validation')
);

export {
  selectOnboarding,
  makeSelectOnboardingStage,
  makeSelectAge,
  makeSelectDisplayName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectRePassword,
  makeSelectUserLocation,
  makeSelectParking,
  makeSelectInterests,
  makeSelectEmailValid,
  makeSelectPasswordValid,
  makeSelectAgeValid,
  makeSelectNameValid,
  makeSelectLocationValid,
  makeSelectInterestsValid,
  makeSelectGeolocationMode,
  makeSelectOnboardingValidation,
  makeSelectOnboardingErrorMessages,
};
