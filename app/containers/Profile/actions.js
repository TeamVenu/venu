import {
  CHANGE_USER_NAME,
  CHANGE_USER_AGE,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_REPASSWORD,
  CHANGE_USER_INTERESTS,
  CHANGE_USER_PARKING,
} from './constants';

export function changeUserName(name, valid) {
  return {
    type: CHANGE_USER_NAME,
    value: name,
    valid,
  };
}

export function changeUserAge(age, valid) {
  return {
    type: CHANGE_USER_AGE,
    value: age,
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

export function changeUserPassword(password, valid) {
  return {
    type: CHANGE_USER_PASSWORD,
    value: password,
    valid,
  };
}

export function changeUserRePassword(password, valid) {
  return {
    type: CHANGE_USER_REPASSWORD,
    value: password,
    valid,
  };
}

export function changeUserInterests(interests, valid) {
  return {
    type: CHANGE_USER_INTERESTS,
    value: interests,
    valid,
  };
}

export function changeUserParking(parking) {
  return {
    type: CHANGE_USER_PARKING,
    value: parking,
  };
}
