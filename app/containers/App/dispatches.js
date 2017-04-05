// Validation
import isEmail from 'validator/lib/isEmail';

import {
  signInUser,
  signInUserError,
  signInUserSuccess,
  signOutUser,
  createUserAccount,
  updateUserData,
  changeUserId,
  loadUserData,
  changeUserName,
  changeUserAge,
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
  setErrorMessages,
} from 'containers/App/actions';

import { dispatchSetStage } from 'containers/Onboarding/dispatches';

export function dispatchGetAuthenticatedUser(dispatch) {
  // Check if there is someone signed in
  window.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Set the userId to uid returned
      dispatch(changeUserId(user.uid));

      // Load user
      dispatch(loadUserData());
    } else {
      // No user is signed in
      dispatch(signOutUser());
    }
  });
}

/**
 * dispatchChangeDisplayName
 * Validates the name input and dispatches action
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeDisplayName(dispatch, event) {
  // Cache the name
  const name = event.target.value;

  // Dispatch our action
  dispatch(changeUserName(name));
}

/**
 * dispatchChangeUserAge
 * Changes the user's age
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeUserAge(dispatch, event) {
  // Cache the name
  const age = event.target.value;

  // Dispatch our action
  dispatch(changeUserAge(age));
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
    // Dispatch our action
    dispatch(changeUserEmail(email));
  }
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
    // Set local storage so we don't have to repeat these steps on reload
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
 * Dispatches action to navigate to place
 * @param {Function} dispatch
 * @param {Object} place
 */
export function dispatchNavigateToPlace(dispatch, place) {
  dispatch(navigateToPlace(place));
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

/**
 * dispatchSetErrorMessages
 * Dispatches action to set error messages
 * @param {Function} dispatch
 * @param {String} error
 */
export function dispatchSetErrorMessages(dispatch, error) {
  dispatch(setErrorMessages(error));
}

/**
 * authenticateUser
 * Dispatches actions about user authentication
 * @param {Function} dispatch
 * @param {Object} credentials
 */
export function authenticateUser(dispatch, credentials) {
  // Send out dispatch saying we are signing in
  dispatch(signInUser());

  // Authenticate user
  window.firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) => {
      // Authentication succeeded
      // Dispatch with uid
      dispatch(signInUserSuccess(user.uid));

      // Load the user's data
      dispatch(loadUserData());
    })
    .catch((error) => {
      // Dispatch error message
      dispatch(signInUserError(error.message));
    });
}

/**
 * dispatchCreateUserAccount
 * Dispatches actions and creates user account
 * @param {Function} dispatch
 * @param {Object} credentials
 */
export function dispatchCreateUserAccount(dispatch, credentials) {
  // Create user account
  window.firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) => {
      // Account creation succeeded
      // Dispatch with uid
      dispatch(signInUserSuccess(user.uid));
      // Send out dispatch saying we are creating user account
      dispatch(createUserAccount());
      dispatchSetStage(dispatch, 1);
    })
    .catch((error) => {
      // Dispatch error message
      dispatch(signInUserError(error.message));
    });
}

/**
 * dispatchUpdateUserData
 * Dispatches actions and updates user account
 * @param {Function} dispatch
 */
export function dispatchUpdateUserData(dispatch) {
  dispatch(updateUserData());
}
