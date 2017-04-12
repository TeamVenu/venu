import { createSelector } from 'reselect';

const selectProfile = (state) => state.get('profile');

const makeSelectName = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('name')
);

const makeSelectAge = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('age')
);

const makeSelectEmail = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('email')
);

const makeSelectPassword = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('password')
);

const makeSelectRePassword = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('rePassword')
);

const makeSelectParking = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('parking')
);

const makeSelectInterests = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('interests')
);

const makeSelectEmailValid = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('isEmailValid')
);

const makeSelectPasswordValid = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('isPasswordValid')
);

const makeSelectNameValid = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('isNameValid')
);

const makeSelectAgeValid = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('isAgeValid')
);

const makeSelectInterestsValid = () => createSelector(
  selectProfile,
  (profileState) => profileState.get('areInterestsValid')
);

export {
  selectProfile,
  makeSelectAge,
  makeSelectName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectRePassword,
  makeSelectParking,
  makeSelectInterests,
  makeSelectEmailValid,
  makeSelectPasswordValid,
  makeSelectAgeValid,
  makeSelectNameValid,
  makeSelectInterestsValid,
};
