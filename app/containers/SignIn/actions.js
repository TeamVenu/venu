import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
} from './constants';

/**
 * changeEmail
 * Changes user entered email and validation
 * @param {String} email
 * @param {Bool} validation
 */
export function changeEmail(email, validation) {
  return {
    type: CHANGE_EMAIL,
    value: email,
    valid: validation,
  };
}

/**
 * changePassword
 * Changes user entered password and validation
 * @param {String} password
 * @param {Bool} validation
 */
export function changePassword(password, validation) {
  return {
    type: CHANGE_PASSWORD,
    value: password,
    valid: validation,
  };
}
