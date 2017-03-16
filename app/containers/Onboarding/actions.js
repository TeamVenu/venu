import {
  ONBOARDING_PREV_STAGE,
  ONBOARDING_NEXT_STAGE,
  ONBOARDING_START_VENU,
  CREATE_USER_ACCOUNT,
  CHANGE_USER_EMAIL,
  CHANGE_USER_DISPLAYNAME,
  CHANGE_USER_INTERESTS,
  ERROR_USER_ACCOUNT_CREATION,
  SETUP_GEOLOCATION,
  CHANGE_PARKING_LOCATION,
} from './constants';

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

export function changeUserDisplayName(name, valid) {
  return {
    type: CHANGE_USER_DISPLAYNAME,
    value: name,
    valid,
  };
}

export function changeUserEmail(email, valid) {
  return {
    type: CHANGE_USER_EMAIL,
    value: email,
    valid,
  };
}

export function createUserAccount(user, stage) {
  return {
    type: CREATE_USER_ACCOUNT,
    value: user,
    stage,
  };
}

export function errorUserAccountCreation(errors) {
  return {
    type: ERROR_USER_ACCOUNT_CREATION,
    value: errors,
  };
}

export function setupGeolocation(location, isEnabled, mode) {
  return {
    type: SETUP_GEOLOCATION,
    value: location,
    isEnabled,
    mode,
  };
}

export function changeParkingLocation(location) {
  return {
    type: CHANGE_PARKING_LOCATION,
    value: location,
  };
}

export function changeUserInterests(interest) {
  return {
    type: CHANGE_USER_INTERESTS,
    value: interest,
  };
}
