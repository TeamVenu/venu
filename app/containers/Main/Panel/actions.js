import {
  PANEL_HANDLE_DRAG,
  PANEL_HANDLE_PRESS,
  PANEL_HANDLE_RELEASE,
} from './constants';

export function handleDrag(props) {
  return {
    type: PANEL_HANDLE_DRAG,
    value: props,
  };
}

export function handlePress(props) {
  return {
    type: PANEL_HANDLE_PRESS,
    value: props,
  };
}

export function handleRelease(props) {
  return {
    type: PANEL_HANDLE_RELEASE,
    value: props,
  };
}
