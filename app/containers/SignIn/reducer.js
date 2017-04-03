import { fromJS } from 'immutable';

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
} from './constants';

// Create initial state
const initialState = fromJS({
  email: '',
  password: '',
  isEmailValid: null,
  isPasswordValid: null,
});

function signInReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state
        .set('email', action.value)
        .set('isEmailValid', action.valid);
    case CHANGE_PASSWORD:
      return state
        .set('password', action.value)
        .set('isPasswordValid', action.valid);
    default:
      return state;
  }
}

export default signInReducer;
