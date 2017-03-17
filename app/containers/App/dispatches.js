// Validation
import isEmail from 'validator/lib/isEmail';

import {
  changeUserName,
  changeUserEmail,
  changeParkingLocation,
  setupGeolocation,
  changeUserInterests,
  changeUserLocation,
  changeMapMode,
} from 'containers/App/actions';

/**
 * dispatchChangeDisplayName
 * Validates the name input and dispatches action
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeDisplayName(dispatch, event) {
  // Cache the name
  const name = event.target.value;

  // If name is not empty string set to true
  const valid = (name.length > 0) ? true : null;

  // Dispatch our action
  dispatch(changeUserName(name, valid));
}

/**
 * dispatchChangeEmail
 * Validates the email input and dispatches action
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
 * dispatchChangeParkingLocation
 * Dispatches parking location action
 * @param {Function} dispatch
 * @param {Object} location
 */
export function dispatchChangeParkingLocation(dispatch, location) {
  dispatch(changeParkingLocation(location));
}

/**
 * dispatchChangeUserLocation
 * Dispatches user location action if valid
 * @param {Function} dispatch
 * @param {Object} location
 */
export function dispatchChangeUserLocation(dispatch, location) {
  if (location.lat && location.lng) {
    dispatch(changeUserLocation(location));
  }
}

/**
 * dispatchChangeUserInterests
 * Dispatches user interests action if valid
 * @param {Function} dispatch
 * @param {Object} interests
 */
export function dispatchChangeUserInterests(dispatch, interests) {
  if (interests.length > 0) {
    dispatch(changeUserInterests(interests));
  }
}

/**
 * askUserToEnableLocation
 * Prompts user for access to geolocation and dispatches action
 * @param {Function} dispatch
 */
export function askUserToEnableLocation(dispatch) {
  // Initialize enabled as false
  const enabled = false;

  // Initialize location
  const location = {
    lat: 43.08516,
    lng: -77.677192,
  };

  // Verify that device has geolocation available
  if ('geolocation' in navigator) {
    // Device supports geolocation
    // Let's ask user for access
    navigator.geolocation.getCurrentPosition((position) => {
      // User allowed tracking
      retrieveUserLocationSucceeded(dispatch, position);
    }, () => {
      // User most likely denied access to their location
      retrieveUserLocationFailed(dispatch, location);
    });
  } else {
    // Geolocation is
    // a. Not supported by device or
    // b. Disabled by device
    console.warn('⚠️🗺 Geolocation is not available');
    dispatch(setupGeolocation(location, enabled, 'unavailable'));
  }
}

/**
 * retrieveUserLocationSucceeded
 * Successfully retrieves user location
 * @param {Function} dispatch
 * @param {Object} position
 */
export function retrieveUserLocationSucceeded(dispatch, position) {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  const enabled = true;
  dispatch(setupGeolocation(location, enabled, 'succeeded'));
}

/**
 * retrieveUserLocationFailed
 * Dispatches action for when user geolocation fails
 * @param {Function} dispatch
 * @param {Object} position
 */
export function retrieveUserLocationFailed(dispatch, location) {
  const enabled = false;
  console.warn(' ⛔️ 📍 Unable to retrieve location, user might have declined to use location');
  dispatch(setupGeolocation(location, enabled, 'failed'));
}

/**
 * dispatchChangeMapMode
 * Validates the mode string and dispatches action
 * @param {Function} dispatch
 * @param {String} mode
 */
export function dispatchChangeMapMode(dispatch, mode) {
  // Regex pattern
  const modePattern = /(Discover|Itinerary|Facilities)/i;

  // If mode matches pattern
  if (modePattern.test(mode)) {
    // Set mode to new mode
    dispatch(changeMapMode(mode));
  } else {
    // Otherwise set to Discover as fallback
    dispatch(changeMapMode('Discover'));
  }
}
