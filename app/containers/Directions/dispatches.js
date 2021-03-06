import {
  setUser,
  updateUserData,
  changeMapCenter,
  trackNewLocation,
  setErrorMessages,
} from 'containers/App/actions';

import {
  setTimer,
  setDirections,
  setIsNavigating,
  setLocationEnabled,
 } from './actions';

export function dispatchSetTimer(dispatch, timerId) {
  dispatch(setTimer(timerId));
}

export function dispatchSetDirections(dispatch, directions) {
  dispatch(setDirections(directions));
}

export function dispatchSetNavigating(dispatch, navigating) {
  dispatch(setIsNavigating(navigating));
}

export function dispatchSetLocationEnabled(dispatch, enabled) {
  dispatch(setLocationEnabled(enabled));
}

/**
 * dispatchGetUserLocation
 * Prompts user for access to geolocation and dispatches action
 * @param {Function} dispatch
 */
export function dispatchGetUserLocation(dispatch, userProp) {
  const user = (userProp.location) ? userProp : userProp.toJS();
  // Verify that device has geolocation available
  if ('geolocation' in navigator) {
    // Device supports geolocation
    // Let's ask user for access
    navigator.geolocation.getCurrentPosition((position) => {
      // User allowed tracking
      retrieveUserLocationSucceeded(dispatch, user, position);
    }, () => {
      // User most likely denied access to their location
      retrieveUserLocationFailed(dispatch);
    });
  } else {
    // Geolocation is
    // a. Not supported by device or
    // b. Disabled by device
    // Set local storage so we don't have to repeat these steps on reload
    const errorMessage = 'Your location is unavailable.';
    dispatch(setErrorMessages(errorMessage));
    dispatch(setLocationEnabled(false));
  }
}

/**
 * retrieveUserLocationSucceeded
 * Successfully retrieves user location
 * @param {Function} dispatch
 * @param {Object} position
 */
export function retrieveUserLocationSucceeded(dispatch, userProp, position) {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  const user = Object.assign({}, userProp, { location });
  dispatch(setLocationEnabled(true));
  dispatch(setUser(user));
  dispatch(changeMapCenter(user.location));
  dispatch(updateUserData());
  dispatch(trackNewLocation());
}

/**
 * retrieveUserLocationFailed
 * Dispatches action for when user geolocation fails
 * @param {Function} dispatch
 * @param {Object} position
 */
export function retrieveUserLocationFailed(dispatch) {
  const errorMessage = 'Unable to retrieve your location. Please check your browser settings to enable tracking.';
  dispatch(setErrorMessages(errorMessage));
  dispatch(setLocationEnabled(false));
}
