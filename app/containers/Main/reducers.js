/*
 * Main Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 *
 * Format:
 * case MY_ACTION_CONSTANT:
 *  return state.set('myStateVariable', true);
 */

// Import immutable
import { fromJS } from 'immutable';

// Import constants
import { CHANGE_MAP_MODE, CHANGE_USERNAME } from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  mapMode: 'Discover',
});

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MAP_MODE:
      return state.set('mapMode', action.name);
    case CHANGE_USERNAME:
      return state.set('username', action.name);
    default:
      return state;
  }
}

export default mainReducer;
