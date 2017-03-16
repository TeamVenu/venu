import { fromJS } from 'immutable';

import {
  CREATE_USER_ACCOUNT,
  CHANGE_USER_EMAIL,
  CHANGE_USER_DISPLAYNAME,
  SETUP_GEOLOCATION,
} from './constants';

// Create our initial State
const initialState = fromJS({
  stage: 0,
  user: {
    name: '',
    email: '',
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
  userLocation: {
    lat: 43.08516,
    lng: -77.677192,
  },
  locationEnabled: false,
});

function onboardingReducer(state = initialState, action) {
  switch (action.type) {
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
              .set('user', action.value)
              .set('stage', action.stage);
    case SETUP_GEOLOCATION:
      return state
              .set('userLocation', action.value)
              .set('locationEnabled', action.isEnabled)
              .setIn(['validation', 'geolocationSetup', 'mode'], action.mode);
    default:
      return state;
  }
}

export default onboardingReducer;
