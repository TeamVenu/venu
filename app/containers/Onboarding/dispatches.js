// Validation
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

// Global actions
import {
  setUser,
  updateUserData,
  changeMapCenter,
} from 'containers/App/actions';

// Actions
import {
  changeUserAge,
  changeUserName,
  changeUserEmail,
  changeUserPassword,
  changeUserRePassword,
  changeUserLocation,
  changeParkingLocation,
  changeUserInterests,
  setupGeolocation,
  setStage,
  goToPreviousStage,
  goToNextStage,
} from './actions';

// Methods
/**
 * dispatchChangeDisplayName
 * Validates the name input and dispatches action
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchChangeDisplayName(dispatch, event) {
  // Cache the name
  const name = event.target.value;

  const valid = (name.length > 0);
  // Dispatch our action
  dispatch(changeUserName(name, valid));
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
  const valid = isNumeric(age);

  // Dispatch our action
  dispatch(changeUserAge(age, valid));
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
  dispatch(changeParkingLocation(location));
}

/**
 * dispatchChangeUserLocation
 * Dispatches user location action if valid
 * @param {Function} dispatch
 * @param {Object} location
 */
export function dispatchChangeUserLocation(dispatch, location) {
  const valid = (location.lat && location.lng);
  dispatch(changeUserLocation(location, valid));
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

export function dispatchSetStage(dispatch, stage) {
  dispatch(setStage(stage));
}

/**
 * dispatchGoToPreviousStage
 * Dispatches to the previous stage
 * @param {Function} dispatch
 * @param {Number} stage
 */
export function dispatchGoToPreviousStage(dispatch, stage) {
  const previousStage = stage - 1;
  dispatch(goToPreviousStage(previousStage));
}

/**
 * dispatchGoToNextStage
 * Dispatches to the next stage
 * @param {Function} dispatch
 * @param {Number} stage
 */
export function dispatchGoToNextStage(dispatch, user, stage) {
  const nextStage = stage + 1;
  dispatch(setUser(user));
  dispatch(updateUserData());
  dispatch(goToNextStage(nextStage));
}

/**
 * dispatchGoToNextStageFromGeolocation
 * Dispatches to next stage if locationEnabled is not null and there is a location
 * @param {Function} dispatch
 * @param {Object} props
 */
export function dispatchGoToNextStageFromGeolocation(dispatch, props) {
  if (props.location && props.locationEnabled !== null) {
    const stage = props.stage + 1;
    dispatch(goToNextStage(stage));
    dispatch(updateUserData());
    dispatch(changeMapCenter(props.location));
  }
}

/**
 * askUserToEnableLocation
 * Prompts user for access to geolocation and dispatches action
 * @param {Function} dispatch
 */
export function askUserToEnableLocation(dispatch) {
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
    dispatch(setupGeolocation(location, 'unavailable'));
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

  dispatch(setupGeolocation(location, 'succeeded'));
}

/**
 * retrieveUserLocationFailed
 * Dispatches action for when user geolocation fails
 * @param {Function} dispatch
 * @param {Object} position
 */
export function retrieveUserLocationFailed(dispatch, location) {
  dispatch(setupGeolocation(location, 'failed'));
}
