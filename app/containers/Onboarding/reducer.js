import { fromJS } from 'immutable';

import {
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_REPASSWORD,
  ONBOARDING_PREV_STAGE,
  ONBOARDING_NEXT_STAGE,
  ONBOARDING_START_VENU,
} from './constants';

// Create our initial State
const initialState = fromJS({
  stage: (localStorage.getItem('venuOnboardingStage')) ? parseInt(localStorage.getItem('venuOnboardingStage'), 10) : 0,
  email: '',
  password: '',
  rePassword: '',
  isEmailValid: false,
  isPasswordValid: false,
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
