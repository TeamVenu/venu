import {
  CHANGE_USER_NAME,
  CHANGE_USER_EMAIL,
  CHANGE_USER_LOCATION,
  CHANGE_USER_INTERESTS,
  CHANGE_PARKING_LOCATION,
  SETUP_GEOLOCATION,
} from './constants';

export function changeUserName(name, valid) {
  return {
    type: CHANGE_USER_NAME,
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

export function changeUserLocation(location) {
  return {
    type: CHANGE_USER_LOCATION,
    value: location,
  };
}

export function changeUserInterests(interests) {
  return {
    type: CHANGE_USER_INTERESTS,
    value: interests,
  };
}

export function changeParkingLocation(location) {
  return {
    type: CHANGE_PARKING_LOCATION,
    value: location,
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
