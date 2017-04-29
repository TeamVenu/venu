import { fromJS } from 'immutable';
import {
  SET_TIMER,
  SET_DIRECTIONS,
  SET_IS_NAVIGATING,
  SET_LOCATION_ENABLED,
} from './constants';

const initialState = fromJS({
  timer: null,
  directions: null,
  isNavigating: null,
  isLocationEnabled: true,
});

function directionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TIMER:
      return state.set('timer', action.value);
    case SET_DIRECTIONS:
      return state.set('directions', action.value);
    case SET_IS_NAVIGATING:
      return state.set('isNavigating', action.value);
    case SET_LOCATION_ENABLED:
      return state.set('isLocationEnabled', action.value);
    default:
      return state;
  }
}

export default directionsReducer;
