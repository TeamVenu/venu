import {
  CHANGE_USER_AGE,
  CHANGE_USER_NAME,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_REPASSWORD,
  CHANGE_USER_LOCATION,
  CHANGE_PARKING_LOCATION,
  CHANGE_USER_INTERESTS,
  SET_LOCATING,
  SETUP_GEOLOCATION,
  ONBOARDING_SET_STAGE,
  ONBOARDING_PREV_STAGE,
  ONBOARDING_NEXT_STAGE,
  ONBOARDING_START_VENU,
} from './constants';

/**
 * changeUserName
 * Returns the new user name
 * @param  {String} name
 */
export function changeUserName(name, validation) {
  return {
    type: CHANGE_USER_NAME,
    value: name,
    valid: validation,
  };
}

/**
 * changeUserAge
 * Returns the new user age
 * @param  {String} age
 */
export function changeUserAge(age, validation) {
  return {
    type: CHANGE_USER_AGE,
    value: age,
    valid: validation,
  };
}

export function changeUserEmail(email, validation) {
  return {
    type: CHANGE_USER_EMAIL,
    value: email,
    valid: validation,
  };
}

export function changeUserPassword(password, validation) {
  return {
    type: CHANGE_USER_PASSWORD,
    value: password,
    valid: validation,
  };
}

export function changeUserRePassword(password, validation) {
  return {
    type: CHANGE_USER_REPASSWORD,
    value: password,
    valid: validation,
  };
}

/**
 * changeUserLocation
 * Returns the new user location
 * @param  {Object} location
 */
export function changeUserLocation(location, validation, mode) {
  return {
    type: CHANGE_USER_LOCATION,
    value: location,
    valid: validation,
    mode,
  };
}

/**
 * changeUserInterests
 * Returns the new user interests
 * @param  {Object} interests
 */
export function changeUserInterests(interests, validation) {
  return {
    type: CHANGE_USER_INTERESTS,
    value: interests,
    valid: validation,
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
 * setLocating
 * Begins geolocation process
 * @param  {Bool} locating
 */
export function setLocating(locating) {
  return {
    type: SET_LOCATING,
    value: locating,
  };
}

/**
 * setupGeolocation
 * Returns the geolocation setup
 * @param  {Object} location
 * @param  {Bool} isEnabled
 * @param  {String} mode
 */
export function setupGeolocation(location, mode) {
  return {
    type: SETUP_GEOLOCATION,
    value: location,
    valid: true,
    mode,
  };
}

export function setStage(stage) {
  return {
    type: ONBOARDING_SET_STAGE,
    value: stage,
  };
}

export function goToPreviousStage(stage) {
  return {
    type: ONBOARDING_PREV_STAGE,
    value: stage,
  };
}

export function goToNextStage(stage) {
  return {
    type: ONBOARDING_NEXT_STAGE,
    value: stage,
  };
}

export function finishOnboarding(props) {
  return {
    type: ONBOARDING_START_VENU,
    value: props,
  };
}
