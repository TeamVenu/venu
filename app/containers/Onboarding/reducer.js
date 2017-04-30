import { fromJS } from 'immutable';

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

// Create our initial State
const initialState = fromJS({
  stage: 0,
  email: '',
  password: '',
  rePassword: '',
  name: '',
  age: '',
  location: {
    lat: 43.084167,
    lng: -77.677085,
  },
  parking: {},
  interests: [],
  geolocationMode: '',
  isLocating: null,
  isEmailValid: false,
  isPasswordValid: false,
  isNameValid: false,
  isAgeValid: false,
  isLocationValid: false,
  areInterestsValid: false,
});

function onboardingReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_EMAIL:
      return state
        .set('email', action.value)
        .set('isEmailValid', action.valid);
    case CHANGE_USER_PASSWORD:
      return state
        .set('password', action.value)
        .set('isPasswordValid', action.valid);
    case CHANGE_USER_REPASSWORD:
      return state
        .set('rePassword', action.value)
        .set('isPasswordValid', action.valid);
    case CHANGE_USER_AGE:
      return state
        .set('age', action.value)
        .set('isAgeValid', action.valid);
    case CHANGE_USER_NAME:
      return state
        .set('name', action.value)
        .set('isNameValid', action.valid);
    case CHANGE_USER_LOCATION:
      return state
        .set('location', action.value)
        .set('isLocationValid', action.valid);
    case CHANGE_PARKING_LOCATION:
      return state
        .set('parking', action.value);
    case CHANGE_USER_INTERESTS:
      return state
        .set('interests', action.value)
        .set('areInterestsValid', action.valid);
    case SET_LOCATING:
      return state
        .set('isLocating', action.value);
    case SETUP_GEOLOCATION:
      return state
        .set('location', action.value)
        .set('parking', action.value)
        .set('geolocationMode', action.mode)
        .set('isLocationValid', action.valid);
    case ONBOARDING_SET_STAGE:
    case ONBOARDING_PREV_STAGE:
    case ONBOARDING_NEXT_STAGE:
    case ONBOARDING_START_VENU:
      return state
        .set('stage', action.value);
    default:
      return state;
  }
}

export default onboardingReducer;
