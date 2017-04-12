import { fromJS } from 'immutable';

import { SET_EXHIBIT_MODE } from './constants';

const initialState = fromJS({
  mode: 'Itinerary',
});

function itineraryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXHIBIT_MODE:
      return state
        .set('mode', action.value);
    default:
      return state;
  }
}

export default itineraryReducer;
