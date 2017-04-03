import { createSelector } from 'reselect';

const selectOnboarding = (state) => state.get('onboarding');

const makeSelectOnboardingStage = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('stage')
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

const makeSelectEmailValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('isEmailValid')
);

const makeSelectPasswordValid = () => createSelector(
  selectOnboarding,
  (onboardingState) => onboardingState.get('isPasswordValid')
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
  makeSelectEmail,
  makeSelectPassword,
  makeSelectRePassword,
  makeSelectEmailValid,
  makeSelectPasswordValid,
  makeSelectOnboardingValidation,
  makeSelectOnboardingErrorMessages,
};
