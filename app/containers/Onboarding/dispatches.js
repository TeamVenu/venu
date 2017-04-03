// Validation
import isEmail from 'validator/lib/isEmail';

// Global actions
import {
  createUserAccount,
  changeMapCenter,
} from 'containers/App/actions';

// Actions
import {
  changeUserEmail,
  changeUserPassword,
  changeUserRePassword,
  goToPreviousStage,
  goToNextStage,
} from './actions';

// Methods
export function dispatchChangeUserEmail(dispatch, event) {
  const email = event.target.value;
  const valid = isEmail(email);

  dispatch(changeUserEmail(email, valid));
}

export function dispatchChangeUserPassword(dispatch, event, otherPassword) {
  const password = event.target.value;
  const valid = (password.length >= 6 && password === otherPassword);

  dispatch(changeUserPassword(password, valid));
}

export function dispatchChangeUserRePassword(dispatch, event, otherPassword) {
  const password = event.target.value;
  const valid = (password.length >= 6 && password === otherPassword);

  dispatch(changeUserRePassword(password, valid));
}

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
    dispatch(changeMapCenter(props.location));
  }
}
