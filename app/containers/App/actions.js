import {
  CHANGE_USER_NAME,
  CHANGE_USER_EMAIL,
  CHANGE_USER_LOCATION,
  CHANGE_USER_INTERESTS,
  CHANGE_PARKING_LOCATION,
  SETUP_GEOLOCATION,
  CHANGE_MAP_MODE,
} from './constants';

/**
 * changeUserName
 * Returns the new user name validated
 * @param  {String} name
 * @param  {Bool} valid
 */
export function changeUserName(name, valid) {
  return {
    type: CHANGE_USER_NAME,
    value: name,
    valid,
  };
}

/**
 * changeEmail
 * Returns the new user email validated
 * @param  {String} email
 * @param  {Bool} valid
 */
export function changeUserEmail(email, valid) {
  return {
    type: CHANGE_USER_EMAIL,
    value: email,
    valid,
  };
}

/**
 * changeUserLocation
 * Returns the new user location
 * @param  {Object} location
 */
export function changeUserLocation(location) {
  return {
    type: CHANGE_USER_LOCATION,
    value: location,
  };
}

/**
 * changeUserInterests
 * Returns the new user interests
 * @param  {Object} interests
 */
export function changeUserInterests(interests) {
  return {
    type: CHANGE_USER_INTERESTS,
    value: interests,
  };
}

/**
 * changeParkingLocation
 * Returns the new user parking location
 * @param  {Object} location
 */
export function changeParkingLocation(location) {
  return {
    type: CHANGE_PARKING_LOCATION,
    value: location,
  };
}

/**
 * setupGeolocation
 * Returns the geolocation setup
 * @param  {Object} location
 * @param  {Bool} isEnabled
 * @param  {String} mode
 */
export function setupGeolocation(location, isEnabled, mode) {
  return {
    type: SETUP_GEOLOCATION,
    value: location,
    isEnabled,
    mode,
  };
}

/**
 * changeMapMode
 * Returns the new map mode
 * @param  {Object} mode
 */
export function changeMapMode(mode) {
  return {
    type: CHANGE_MAP_MODE,
    value: mode,
  };
}
