import {
  CREATE_USER_ACCOUNT,
  CHANGE_USER_EMAIL,
  CHANGE_USER_DISPLAYNAME,
  ERROR_USER_ACCOUNT_CREATION,
} from './constants';

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
