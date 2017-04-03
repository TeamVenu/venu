import {
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_REPASSWORD,
  ONBOARDING_PREV_STAGE,
  ONBOARDING_NEXT_STAGE,
  ONBOARDING_START_VENU,
} from './constants';

export function changeUserEmail(email, validation) {
  return {
    type: CHANGE_USER_EMAIL,
    value: email,
    valid: validation,
  };
}

export function changeUserPassword(password, validation) {
  return {
    type: CHANGE_USER_PASSWORD,
    value: password,
    valid: validation,
  };
}

export function changeUserRePassword(password, validation) {
  return {
    type: CHANGE_USER_REPASSWORD,
    value: password,
    valid: validation,
  };
}

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
