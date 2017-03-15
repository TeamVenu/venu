import { createSelector } from 'reselect';

const selectOnboarding = (state) => state.get('onboarding');

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

export {
  selectOnboarding,
  makeSelectUser,
  makeSelectUserDisplayName,
  makeSelectUserEmail,
  makeSelectOnboardingErrorMessages,
};