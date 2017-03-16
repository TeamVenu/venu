// Validation
import isEmail from 'validator/lib/isEmail';

// Actions
import { changeUserDisplayName, changeUserEmail, createUserAccount } from './actions';

// Methods

/**
 * dispatchChangeDisplayName
 * Validates the name input and dispatches to redux
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeDisplayName(dispatch, event) {
  // Cache the name
  const name = event.target.value;

  // If name is not empty string set to true
  const valid = (name.length > 0) ? true : null;

  // Dispatch our action
  dispatch(changeUserDisplayName(name, valid));
}

/**
 * dispatchChangeEmail
 * Validates the email input and dispatches to redux
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeEmail(dispatch, event) {
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
export function dispatchSubmitAccountCreation(dispatch, event, userProp) {
  // Cache the user prop
  const user = {
    name: userProp.get('name'),
    email: userProp.get('email'),
  };

  const stage = 1;

  // Make on final validation check
  if (user.name.length > 0 && isEmail(user.email)) {
    // Dispatch our action
    dispatch(createUserAccount(user, stage));
  }
}
