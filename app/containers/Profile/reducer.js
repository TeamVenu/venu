import { fromJS } from 'immutable';

import {
  CHANGE_USER_AGE,
  CHANGE_USER_EMAIL,
  CHANGE_USER_NAME,
  CHANGE_USER_PARKING,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_INTERESTS,
  CHANGE_USER_REPASSWORD,
} from './constants';

const initialState = fromJS({
  name: '',
  age: '',
  email: '',
  password: '',
  rePassword: '',
  parking: {},
  interests: [],
  isNameValid: null,
  isAgeValid: null,
  isEmailValid: null,
  isPasswordValid: null,
  areInterestsValid: null,
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_AGE:
      return state
        .set('isAgeValid', action.valid)
        .set('age', action.value);
    case CHANGE_USER_NAME:
      return state
        .set('isNameValid', action.valid)
        .set('name', action.value);
    case CHANGE_USER_EMAIL:
      return state
        .set('isEmailValid', action.valid)
        .set('email', action.value);
    case CHANGE_USER_PASSWORD:
      return state
        .set('isPasswordValid', action.valid)
        .set('password', action.value);
    case CHANGE_USER_REPASSWORD:
      return state
        .set('isPasswordValid', action.valid)
        .set('rePassword', action.value);
    case CHANGE_USER_INTERESTS:
      return state
        .set('areInterestsValid', action.valid)
        .set('interests', action.value);
    case CHANGE_USER_PARKING:
      return state
        .set('parking', action.value);
    default:
      return state;
  }
}

export default profileReducer;
