import { createSelector } from 'reselect';

const selectOnboarding = (state) => state.get('onboarding');

const makeSelectOnboardingStage = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('stage')
);

const makeSelectUser = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('user')
);

const makeSelectUserDisplayName = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.getIn(['user', 'name'])
);

const makeSelectUserEmail = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.getIn(['user', 'email'])
);

const makeSelectOnboardingErrorMessages = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('errorMessages')
);

const makeSelectOnboardingValidation = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('validation')
);

const makeSelectUserLocation = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('userLocation')
);

const makeSelectGeolocationEnabled = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('locationEnabled')
);

export {
  selectOnboarding,
  makeSelectOnboardingStage,
  makeSelectUser,
  makeSelectUserDisplayName,
  makeSelectUserEmail,
  makeSelectUserLocation,
  makeSelectGeolocationEnabled,
  makeSelectOnboardingValidation,
  makeSelectOnboardingErrorMessages,
};
