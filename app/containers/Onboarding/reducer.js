import { fromJS } from 'immutable';

import {
  CREATE_USER_ACCOUNT,
  CHANGE_USER_EMAIL,
  CHANGE_USER_DISPLAYNAME,
  SETUP_GEOLOCATION,
  CHANGE_PARKING_LOCATION,
  ONBOARDING_PREV_STAGE,
  ONBOARDING_NEXT_STAGE,
  ONBOARDING_START_VENU,
} from './constants';

// Create our initial State
const initialState = fromJS({
  stage: 1,
  user: {
    name: '',
    email: '',
    location: {},
    locationEnabled: null,
    parking: {},
    interests: [],
  },
  validation: {
    accountCreation: {
      username: null,
      email: null,
    },
    geolocationSetup: {
      mode: '',
    },
  },
});

function onboardingReducer(state = initialState, action) {
  switch (action.type) {
    case ONBOARDING_PREV_STAGE:
    case ONBOARDING_NEXT_STAGE:
    case ONBOARDING_START_VENU:
      return state
              .set('stage', action.value);
    case CHANGE_USER_DISPLAYNAME:
      return state
              .setIn(['user', 'name'], action.value)
              .setIn(['validation', 'accountCreation', 'username'], action.valid);
    case CHANGE_USER_EMAIL:
      return state
              .setIn(['user', 'email'], action.value)
              .setIn(['validation', 'accountCreation', 'email'], action.valid);
    case CREATE_USER_ACCOUNT:
      return state
              .set('stage', action.stage);
    case SETUP_GEOLOCATION:
      return state
              .setIn(['user', 'location'], action.value)
              .setIn(['user', 'locationEnabled'], action.isEnabled)
              .setIn(['validation', 'geolocationSetup', 'mode'], action.mode);
    case CHANGE_PARKING_LOCATION:
      return state
              .setIn(['user', 'parking'], action.value);
    default:
      return state;
  }
}

export default onboardingReducer;
