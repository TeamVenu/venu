// Validation
import isEmail from 'validator/lib/isEmail';

// Actions
import {
  goToPreviousStage,
  goToNextStage,
  changeUserDisplayName,
  changeUserEmail,
  createUserAccount,
  setupGeolocation,
  changeParkingLocation,
} from './actions';

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
export function dispatchSubmitAccountCreation(dispatch, event, userProp, stage) {
  // Cache the user prop
  const user = {
    name: userProp.get('name'),
    email: userProp.get('email'),
  };

  // Make on final validation check
  if (user.name.length > 0 && isEmail(user.email)) {
    const nextStage = stage + 1;

    // Dispatch our action
    dispatch(createUserAccount(user, nextStage));
  }
}

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

export function retrieveUserLocationSucceeded(dispatch, position) {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  const enabled = true;
  dispatch(setupGeolocation(location, enabled, 'succeeded'));
}

export function retrieveUserLocationFailed(dispatch, location) {
  const enabled = false;
  console.warn(' ⛔️ 📍 Unable to retrieve location, user might have declined to use location');
  dispatch(setupGeolocation(location, enabled, 'failed'));
}

export function getBroswer() {
  const patterns = {
    broswers: /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
    trident: /trident/i,
    ie: /\brv[ :]+(\d+)/g,
    opera: /\bOPR|Edge\/(\d+)/,
    version: /version\/(\d+)/i,
  };

  const userAgent = navigator.userAgent;
  let temp;
  let broswerArray = userAgent.match(patterns.broswers) || [];

  if (patterns.trident.test(broswerArray[1])) {
    temp = patterns.ie.exec(userAgent) || [];
    return {
      name: 'IE',
      version: (temp[1] || ''),
    };
  }

  if (broswerArray[1] === 'Chrome') {
    temp = userAgent.match(patterns.opera);

    if (temp !== null) {
      return {
        name: 'Opera',
        version: temp[1],
      };
    }
  }
  broswerArray = broswerArray[2] ? [broswerArray[1], broswerArray[2]] : [navigator.appName, navigator.appVersion, '-?'];

  const versionMatch = temp = userAgent.match(patterns.version);

  if (versionMatch !== null) {
    broswerArray.splice(1, 1, temp[1]);
  }

  return {
    name: broswerArray[0],
    version: broswerArray[1],
  };
}

export function dispatchChangeParkingLocation(dispatch, location) {
  dispatch(changeParkingLocation(location));
}

export function dispatchGoToPreviousStage(dispatch, stage) {
  const previousStage = stage - 1;
  dispatch(goToPreviousStage(previousStage));
}

export function dispatchGoToNextStageFromGeolocation(dispatch, props) {
  if (props.location && props.locationEnabled !== null) {
    const stage = props.stage + 1;
    dispatch(goToNextStage(stage));
  }
}
