import { fromJS } from 'immutable';

import {
  CREATE_USER_ACCOUNT,
  CHANGE_USER_EMAIL,
  CHANGE_USER_DISPLAYNAME,
  ERROR_USER_ACCOUNT_CREATION,
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
  },
  errorMessages: {
    accountCreation: [],
    geolocation: [],
    interestSelection: [],
  },
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
    case ERROR_USER_ACCOUNT_CREATION:
      return state.setIn(['errorMessages', 'accountCreation'], action.value);
    case CREATE_USER_ACCOUNT:
      return state
        .set('user', action.value)
        .set('stage', action.stage);
    default:
      return state;
  }
}

export default onboardingReducer;
