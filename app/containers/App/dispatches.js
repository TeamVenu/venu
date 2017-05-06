// Validation
import isEmail from 'validator/lib/isEmail';

import {
  setTimer,
  setMapCenter,
  setLocationEnabled,
  signInUserWithGoogle,
  signInUserWithFacebook,
  signInUserWithProviderError,
  signInUserWithProviderSuccess,
  setUser,
  signInUser,
  signInUserError,
  signInUserSuccess,
  signOutUser,
  createUserAccount,
  updateUserData,
  updateUserAuthEmail,
  updateUserAuthEmailError,
  updateUserAuthEmailSuccess,
  updateUserAuthPassword,
  updateUserAuthPasswordError,
  updateUserAuthPasswordSuccess,
  changeUserId,
  loadUserData,
  changeUserName,
  changeUserAge,
  changeUserEmail,
  changeParkingLocation,
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
  setSuccessMessages,
} from 'containers/App/actions';

import { dispatchSetStage } from 'containers/Onboarding/dispatches';

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
 * dispatchGetUserLocation
 * Prompts user for access to geolocation and dispatches action
 * @param {Function} dispatch
 */
export function dispatchGetUserLocation(dispatch, userProps) {
  const userObject = (userProps.location) ? userProps : userProps.toJS();
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
      retrieveUserLocationSucceeded(dispatch, userObject, position);
    }, () => {
      // User most likely denied access to their location
      retrieveUserLocationFailed(dispatch, userObject, location);
    });
  } else {
    // Geolocation is
    // a. Not supported by device or
    // b. Disabled by device
    // Set local storage so we don't have to repeat these steps on reload
    const errorMessage = 'Unable to retrieve your location. Please check your browser settings to enable tracking.';
    const user = Object.assign({}, userObject, { location });
    dispatch(setLocationEnabled(false));
    dispatch(setUser(user));
    dispatch(changeMapCenter(user.location));
    dispatch(updateUserData());
    dispatch(setErrorMessages(errorMessage));
  }
}

/**
 * retrieveUserLocationSucceeded
 * Successfully retrieves user location
 * @param {Function} dispatch
 * @param {Object} position
 */
export function retrieveUserLocationSucceeded(dispatch, userProps, position) {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  const user = Object.assign({}, userProps, { location });
  dispatch(setLocationEnabled(true));
  dispatch(setUser(user));
  dispatch(changeMapCenter(user.location));
  dispatch(updateUserData());
}

/**
 * retrieveUserLocationFailed
 * Dispatches action for when user geolocation fails
 * @param {Function} dispatch
 * @param {Object} position
 */
export function retrieveUserLocationFailed(dispatch, userProps, location) {
  const errorMessage = 'Unable to retrieve your location. Please check your browser settings to enable tracking.';
  const user = Object.assign({}, userProps, { location });
  dispatch(setLocationEnabled(false));
  dispatch(setUser(user));
  dispatch(changeMapCenter(user.location));
  dispatch(updateUserData());
  dispatch(setErrorMessages(errorMessage));
}

/**
 * dispatchChangeMapMode
 * Validates the mode string and dispatches action
 * @param {Function} dispatch
 * @param {String} mode
 */
export function dispatchChangeMapMode(dispatch, event) {
  // Regex pattern
  const modePattern = /(All|Recommended)/i;

  // Mode
  const mode = event.target.textContent;

  // If mode matches pattern
  if (modePattern.test(mode)) {
    // Set mode to new mode
    dispatch(changeMapMode(mode));
  } else {
    // Otherwise set to Default as fallback
    dispatch(changeMapMode('All'));
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
 * dispatchSetSuccessMessages
 * Dispatches action to set success messages
 * @param {Function} dispatch
 * @param {String} success
 */
export function dispatchSetSuccessMessages(dispatch, success) {
  dispatch(setSuccessMessages(success));
}

export function dispatchChangeUserAuthEmail(dispatch, userProps, email) {
  const currentUser = window.firebase.auth().currentUser;

  // Send dispatch so that app knows we're loading some data
  dispatch(updateUserAuthEmail());

  currentUser.updateEmail(email)
    .then(() => {
      // Update successful
      const user = Object.assign({}, userProps, { email });
      const message = 'Your email has been updated!';
      dispatch(updateUserAuthEmailSuccess(message));
      dispatch(setUser(user));
      dispatch(updateUserData());
    }, (error) => {
      // Error updating email
      dispatch(updateUserAuthEmailError(error.message));
    });
}

export function dispatchChangeUserAuthPassword(dispatch, password) {
  const user = window.firebase.auth().currentUser;

  dispatch(updateUserAuthPassword());

  user.updatePassword(password).then(() => {
    const message = 'Your password has been updated!';
    dispatch(updateUserAuthPasswordSuccess(message));
  }, (error) => {
    dispatch(updateUserAuthPasswordError(error.message));
  });
}

export function dispatchSignOutUser(dispatch) {
  // Clear user data
  dispatch(signOutUser());

  // Sign User out
  window.firebase.auth().signOut();
}

/**
 * dispatchUpdateUserData
 * Dispatches actions and updates user account
 * @param {Function} dispatch
 */
export function dispatchUpdateUserData(dispatch) {
  dispatch(updateUserData());
}

/**
 * dispatchSetUser
 * Dispatches actions and sets user data
 * @param {Function} dispatch
 * @param {Object} user
 */
export function dispatchSetUser(dispatch, user) {
  dispatch(setUser(user));
  dispatchUpdateUserData(dispatch);
}

/**
 * dispatchSignInUserWithGoogle
 * Redirects user to Google authentication page
 * @param {Function} dispatch
 */
export function dispatchSignInUserWithGoogle(dispatch) {
  const provider = window.firebaseProviders.google;
  dispatch(signInUserWithGoogle());
  window.firebase.auth().signInWithRedirect(provider);
}

/**
 * dispatchSignInUserWithFacebook
 * Redirects user to Facebook authentication page
 * @param {Function} dispatch
 */
export function dispatchSignInUserWithFacebook(dispatch) {
  const provider = window.firebaseProviders.facebook;
  dispatch(signInUserWithFacebook());
  window.firebase.auth().signInWithRedirect(provider);
}

/**
 * dispatchSignInUserAnonymously
 * Dispatches action which creates an anonymous user account in firebase
 * @param {Function} dispatch
 */
export function dispatchSignInUserAnonymously(dispatch) {
  // Authenticate user anonymously
  window.firebase.auth().signInAnonymously()
    .then((result) => {
      // Create a new anonymous user
      const newUser = {
        uid: result.uid,
        name: 'You',
        email: '',
        location: {
          lat: 43.084167,
          lng: -77.677085,
        },
        photoURL: '',
        parking: '',
        interests: '',
        exhibits: {
          recommended: [''],
          saved: [''],
          visited: [''],
        },
      };

      dispatch(setUser(newUser));
    })
    .catch((error) => {
      // Dispatch error message
      dispatch(signInUserError(error.message));
    });
}

/**
 * dispatchGetAuthenticatedUserFromProvider
 * Obtains the promise from Authentication Provicer
 * dispatches action to store user data using their provider account
 * @param {Function} dispatch
 */
export function dispatchGetAuthenticatedUserFromProvider(dispatch) {
  window.firebase.auth().getRedirectResult().then((result) => {
    const user = result.user;

    // In case user doesn't exist let's create a user
    const newUser = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      location: {
        lat: 43.084167,
        lng: -77.677085,
      },
      photoURL: user.photoURL,
      parking: '',
      interests: '',
      exhibits: {
        recommended: [''],
        saved: [''],
        visited: [''],
      },
    };

    dispatch(signInUserWithProviderSuccess());
    // Save user id
    dispatch(changeUserId(user.uid));
    dispatch(setUser(newUser));
    // Load user
    dispatch(loadUserData());
  }).catch((error) => {
    // Handle errors
    dispatch(signInUserWithProviderError(error.message));
    // No user is signed in
    dispatch(signOutUser());
  });
}

/**
 * dispatchGetAuthenticatedUser
 * Get's the currently authenticated user
 * @param {Function} dispatch
 */
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
 * authenticateUserWithEmailAndPassword
 * Dispatches actions about user authentication with email and password - not used
 * @param {Function} dispatch
 * @param {Object} credentials
 */
export function authenticateUserWithEmailAndPassword(dispatch, credentials) {
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
 * dispatchCreateUserAccountWithEmailAndPassword
 * Dispatches actions and creates user account with email and password - not used
 * @param {Function} dispatch
 * @param {Object} credentials
 */
export function dispatchCreateUserAccountWithEmailAndPassword(dispatch, credentials) {
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

export function dispatchSetTimer(dispatch, timerId) {
  dispatch(setTimer(timerId));
}

export function dispatchSetLocationEnabled(dispatch, enabled) {
  dispatch(setLocationEnabled(enabled));
}

export function dispatchSetMapCenter(dispatch, coordinates) {
  // Validate data
  if (coordinates.lat && coordinates.lng) {
    // Dispatch
    dispatch(setMapCenter(coordinates));
  }
}
