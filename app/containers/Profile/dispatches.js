// Validation
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

// Global actions
// import { updateUserData } from 'containers/App/actions';

import {
  changeUserAge,
  changeUserName,
  changeUserEmail,
  changeUserParking,
  changeUserPassword,
  changeUserRePassword,
  changeUserInterests,
} from './actions';

/**
 * dispatchChangeUserAge
 * Changes the user's age
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeUserAge(dispatch, event) {
  // Cache the name
  const age = event.target.value;
  const valid = isNumeric(age);

  // Dispatch our action
  dispatch(changeUserAge(age, valid));
}

/**
 * dispatchChangeName
 * Validates the name input and dispatches action
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeName(dispatch, event) {
  // Cache the name
  const name = event.target.value;

  const valid = (name.length > 0);
  // Dispatch our action
  dispatch(changeUserName(name, valid));
}

export function dispatchChangeUserEmail(dispatch, event) {
  const email = event.target.value;
  const valid = isEmail(email);

  dispatch(changeUserEmail(email, valid));
}

export function dispatchChangeUserPassword(dispatch, event, otherPassword) {
  const password = event.target.value;
  const valid = (password.length >= 6 && password === otherPassword);

  dispatch(changeUserPassword(password, valid));
}

export function dispatchChangeUserRePassword(dispatch, event, otherPassword) {
  const password = event.target.value;
  const valid = (password.length >= 6 && password === otherPassword);

  dispatch(changeUserRePassword(password, valid));
}

/**
 * dispatchChangeParkingLocation
 * Dispatches parking location action
 * @param {Function} dispatch
 * @param {Object} location
 */
export function dispatchChangeParkingLocation(dispatch, location) {
  dispatch(changeUserParking(location));
}

/**
 * dispatchChangeUserInterests
 * Dispatches user interests action if valid
 * @param {Function} dispatch
 * @param {Object} interests
 */
export function dispatchChangeUserInterests(dispatch, interests) {
  const valid = (interests.length > 0);
  dispatch(changeUserInterests(interests, valid));
}

