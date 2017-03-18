/**
 * Panel reducer
 */

import { fromJS } from 'immutable';

import {
  PANEL_HANDLE_DRAG,
  PANEL_HANDLE_PRESS,
  PANEL_HANDLE_RELEASE,
} from './constants';

const initialState = fromJS({
  panelProps: {
    pressing: false,
    dragging: false,
    absolutePositionY: null,
    initialPositionY: null,
    previousPositionY: null,
    inlineStyles: {},
    panelClass: 'collapsed',
  },
});

function panelReducer(state = initialState, action) {
  switch (action.type) {
    case PANEL_HANDLE_DRAG:
    case PANEL_HANDLE_PRESS:
    case PANEL_HANDLE_RELEASE:
      return state
              .set('panelProps', action.value);
    default:
      return state;
  }
}

export default panelReducer;
