import { createSelector } from 'reselect';

const selectSignIn = (state) => state.get('signIn');

const makeSelectEmail = () => createSelector(
  selectSignIn,
  (signInState) => signInState.get('email')
);

const makeSelectEmailValidation = () => createSelector(
  selectSignIn,
  (signInState) => signInState.get('isEmailValid')
);

const makeSelectPassword = () => createSelector(
  selectSignIn,
  (signInState) => signInState.get('password')
);

const makeSelectPasswordValidation = () => createSelector(
  selectSignIn,
  (signInState) => signInState.get('isPasswordValid')
);

export {
  selectSignIn,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectEmailValidation,
  makeSelectPasswordValidation,
};
