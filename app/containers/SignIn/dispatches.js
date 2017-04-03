import isEmail from 'validator/lib/isEmail';

// Actions
import {
  signInMode,
  changeEmail,
  changePassword,
} from './actions';

/**
 * dispatchChangeEmail
 * dispatches function that changes and validates email
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeEmail(dispatch, event) {
  const email = event.target.value;
  const valid = isEmail(email);

  dispatch(changeEmail(email, valid));
}

/**
 * dispatchChangePassword
 * dispatches function that changes and validates password
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangePassword(dispatch, event) {
  const password = event.target.value;
  const valid = (password.length >= 6);

  dispatch(changePassword(password, valid));
}
