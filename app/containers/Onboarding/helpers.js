// Validation
import isEmail from 'validator/lib/isEmail';

// Actions
import { changeUserDisplayName, changeUserEmail, createUserAccount, errorUserAccountCreation } from './actions';

// Methods

/**
 * onChangeDisplayName
 * Validates the name input and dispatches to redux
 * @param {Function} dispatch 
 * @param {Object} event 
 */
export function onChangeDisplayName(dispatch, event) {
  // Cache the name
  const name = event.target.value;

  // If name is not empty string set to true
  const valid = (name.length > 0) ? true : null;

  // Dispatch our action
  dispatch(changeUserDisplayName(name, valid));
}

/**
 * onChangeEmail
 * Validates the email input and dispatches to redux
 * @param {Function} dispatch 
 * @param {Object} event 
 */
export function onChangeEmail(dispatch, event) {
  // Cache the email
  const email = event.target.value;

  // If email is not empty
  // Check if email is a valid email
  const valid = (email.length > 0) ? isEmail(email) : null;

  // Dispatch our action
  dispatch(changeUserEmail(email, valid));
}

/**
 * onSubmitAccountCreation
 * Dispatches username and email to redux
 * @param {Function} dispatch 
 * @param {Object} event 
 */
export function onSubmitAccountCreation (dispatch, event) {
  // Dispatch our action
  dispatch(createUserAccount(user));
}