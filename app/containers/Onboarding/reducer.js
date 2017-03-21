import { fromJS } from 'immutable';

import {
  ONBOARDING_PREV_STAGE,
  ONBOARDING_NEXT_STAGE,
  ONBOARDING_START_VENU,
} from './constants';

// Create our initial State
const initialState = fromJS({
  stage: (localStorage.getItem('venuOnboardingStage')) ? parseInt(localStorage.getItem('venuOnboardingStage'), 10) : 0,
});

function onboardingReducer(state = initialState, action) {
  switch (action.type) {
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
