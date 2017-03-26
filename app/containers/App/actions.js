import {
  CHANGE_USER_NAME,
  CHANGE_USER_EMAIL,
  CHANGE_USER_LOCATION,
  CHANGE_USER_INTERESTS,
  CHANGE_PARKING_LOCATION,
  SETUP_GEOLOCATION,
  CHANGE_MAP_MODE,
  CHANGE_MAP_CENTER,
  CHANGE_SELECTED_PLACE,
  NAVIGATE_TO_PLACE,
  LIKE_PLACE,
  UNLIKE_PLACE,
  CHANGE_EXHIBIT,
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

/**
 * changeCurrentPlace
 * Returns the new selected place
 * @param  {Object} place
 */
export function changeCurrentPlace(place) {
  return {
    type: CHANGE_SELECTED_PLACE,
    value: place,
  };
}

/**
 * changeMapCenter
 * Returns the new map center
 * @param  {Object} center
 */
export function changeMapCenter(center) {
  return {
    type: CHANGE_MAP_CENTER,
    value: center,
  };
}

/**
 * navigateToPlace
 * Returns the place to navigate to
 * @param  {Object} place
 */
export function navigateToPlace(place) {
  return {
    type: NAVIGATE_TO_PLACE,
    value: place,
  };
}

/**
 * likePlace
 * Returns exhibit to like
 * @param  {Object} place
 */
export function likePlace(place) {
  return {
    type: LIKE_PLACE,
    value: place,
  };
}

/**
 * unLikePlace
 * Returns exhibit to unlike
 * @param  {Object} place
 */
export function unLikePlace(place) {
  return {
    type: UNLIKE_PLACE,
    value: place,
  };
}

/**
 * changeExhibit
 * Returns newly changed exhibit
 * @param  {Object} place
 */
export function changeExhibit(place) {
  return {
    type: CHANGE_EXHIBIT,
    value: place,
  };
}
