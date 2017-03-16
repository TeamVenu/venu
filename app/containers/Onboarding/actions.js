import {
  ONBOARDING_PREV_STAGE,
  ONBOARDING_NEXT_STAGE,
  ONBOARDING_START_VENU,
} from './constants';

export function goToPreviousStage(stage) {
  return {
    type: ONBOARDING_PREV_STAGE,
    value: stage,
  };
}

export function goToNextStage(stage) {
  return {
    type: ONBOARDING_NEXT_STAGE,
    value: stage,
  };
}

export function finishOnboarding(props) {
  return {
    type: ONBOARDING_START_VENU,
    value: props,
  };
}
