/*
 * AppReducer
 * The reducer takes care of our data.
 * Using actions, we can change our application state.
 * To add a new global action,
 * add it to the switch statement in the reducer function
 *
 * Example:
 * case ACTION_TYPE_CONSTANT:
 *  return state.set('stateVariable', action.value);
 * case ACTION_TYPE_CONSTANT_PROP:
 *  return state.setIn(['stateObject', 'stateProp'], action.value);
 */

import { fromJS } from 'immutable';

import {
  CHANGE_USER_NAME,
  CHANGE_USER_EMAIL,
  CHANGE_USER_LOCATION,
  CHANGE_USER_INTERESTS,
  CHANGE_PARKING_LOCATION,
  SETUP_GEOLOCATION,
} from './constants';

// Initial State of the App
const initialState = fromJS({
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

/**
 * appReducer
 * Changes application state based on action taken
 * @param {Object} state
 * @param {Object} action
 */
function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_NAME:
      return state
              .setIn(['user', 'name'], action.value)
              .setIn(['validation', 'accountCreation', 'username'], action.valid);
    case CHANGE_USER_EMAIL:
      return state
              .setIn(['user', 'email'], action.value)
              .setIn(['validation', 'accountCreation', 'email'], action.valid);
    case SETUP_GEOLOCATION:
      return state
              .setIn(['user', 'location'], action.value)
              .setIn(['user', 'locationEnabled'], action.isEnabled)
              .setIn(['validation', 'geolocationSetup', 'mode'], action.mode);
    case CHANGE_PARKING_LOCATION:
      return state
              .setIn(['user', 'parking'], action.value);
    case CHANGE_USER_LOCATION:
      return state
              .setIn(['user', 'location'], action.value);
    case CHANGE_USER_INTERESTS:
      return state
              .setIn(['user', 'interests'], action.value);
    default:
      return state;
  }
}

export default appReducer;
