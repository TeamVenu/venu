// Validation
import isEmail from 'validator/lib/isEmail';

// Actions
import {
  goToPreviousStage,
  goToNextStage,
} from './actions';

// Methods

/**
 * dispatchGoToPreviousStage
 * Dispatches to the previous stage
 * @param {Function} dispatch
 * @param {Number} stage
 */
export function dispatchGoToPreviousStage(dispatch, stage) {
  const previousStage = stage - 1;
    // Set localStorage to save stage
  localStorage.setItem('venuOnboardingStage', previousStage);
  dispatch(goToPreviousStage(previousStage));
}

/**
 * dispatchGoToNextStage
 * Dispatches to the next stage
 * @param {Function} dispatch
 * @param {Number} stage
 */
export function dispatchGoToNextStage(dispatch, stage) {
  const nextStage = stage + 1;
    // Set localStorage to save stage
  localStorage.setItem('venuOnboardingStage', nextStage);
  dispatch(goToNextStage(nextStage));
}

/**
 * dispatchGoToNextStageFromAccountCreation
 * Dispatches to next stage if email and name are valid
 * @param {Function} dispatch
 * @param {Object} event
 */
export function dispatchGoToNextStageFromAccountCreation(dispatch, event, userProp, stage) {
  // Cache the user prop
  const user = {
    name: userProp.get('name'),
    email: userProp.get('email'),
  };

  // Make on final validation check
  if (user.name.length > 0 && isEmail(user.email)) {
    const nextStage = stage + 1;
    // Dispatch our action
    // Set localStorage to save stage
    localStorage.setItem('venuOnboardingStage', nextStage);
    dispatch(goToNextStage(nextStage));
  }
}

/**
 * dispatchGoToNextStageFromGeolocation
 * Dispatches to next stage if locationEnabled is not null and there is a location
 * @param {Function} dispatch
 * @param {Object} props
 */
export function dispatchGoToNextStageFromGeolocation(dispatch, props) {
  if (props.location && props.locationEnabled !== null) {
    const stage = props.stage + 1;
    // Set localStorage to save stage
    localStorage.setItem('venuOnboardingStage', stage);
    dispatch(goToNextStage(stage));
  }
}
