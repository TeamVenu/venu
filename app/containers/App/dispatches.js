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
  changeCurrentPlace,
  changeMapCenter,
  navigateToPlace,
  likePlace,
  unLikePlace,
  changeExhibit,
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

  if (valid) {
    // Set local storage so we don't have to repeat these steps on reload
    localStorage.setItem('venuUserName', name);
    localStorage.setItem('venuAccountValidationName', valid);
  }

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

  if (valid) {
    // Set local storage so we don't have to repeat these steps on reload
    localStorage.setItem('venuUserEmail', email);
    localStorage.setItem('venuAccountValidationEmail', valid);
  }

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
  localStorage.setItem('venuParkingLocationLat', location.lat);
  localStorage.setItem('venuParkingLocationLng', location.lng);
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
    // Set local storage so we don't have to repeat these steps on reload
    localStorage.setItem('venuUserLocationLat', location.lat);
    localStorage.setItem('venuUserLocationLng', location.lng);
    localStorage.setItem('venuUserLocationEnabled', enabled);
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
  // Set local storage so we don't have to repeat these steps on reload
  localStorage.setItem('venuUserLocationLat', location.lat);
  localStorage.setItem('venuUserLocationLng', location.lng);
  localStorage.setItem('venuUserLocationEnabled', enabled);
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
  // Set local storage so we don't have to repeat these steps on reload
  localStorage.setItem('venuUserLocationLat', location.lat);
  localStorage.setItem('venuUserLocationLng', location.lng);
  localStorage.setItem('venuUserLocationEnabled', enabled);
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

/**
 * dispatchChangeCurrentPlace
 * Dispatches action to change currently selected place
 * @param {Function} dispatch
 * @param {Object} place
 */
export function dispatchChangeCurrentPlace(dispatch, place) {
  dispatch(changeCurrentPlace(place));
}

/**
 * dispatchChangeMapCenter
 * Dispatches action to change the map's center
 * @param {Function} dispatch
 * @param {Object} center
 */
export function dispatchChangeMapCenter(dispatch, center) {
  dispatch(changeMapCenter(center));
}

/**
 * dispatchNavigateToPlace
 * Dispatches action to navigate to location
 * @param {Function} dispatch
 * @param {Object} location
 */
export function dispatchNavigateToPlace(dispatch, location) {
  dispatch(navigateToPlace(location));
}

/**
 * dispatchLikePlace
 * Dispatches action to like a place
 * @param {Function} dispatch
 * @param {Object} place
 */
export function dispatchLikePlace(dispatch, place) {
  dispatch(likePlace(place));
}

/**
 * dispatchUnlikePlace
 * Dispatches action to unlike a place
 * @param {Function} dispatch
 * @param {Object} place
 */
export function dispatchUnlikePlace(dispatch, place) {
  dispatch(unLikePlace(place));
}

/**
 * dispatchChangeExhibit
 * Dispatches action to change an exhibit
 * @param {Function} dispatch
 * @param {Object} place
 */
export function dispatchChangeExhibit(dispatch, place) {
  dispatch(changeExhibit(place));
}
