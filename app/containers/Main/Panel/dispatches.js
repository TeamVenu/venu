import {
  handleDrag,
  handlePress,
  handleRelease,
} from './actions';

/**
 * dispatchHandleDrag
 * Dispatches the handleDrag action
 * @param {Function} dispatch
 * @param {Object} props
 */
export function dispatchHandleDrag(dispatch, props) {
  dispatch(handleDrag(props));
}

/**
 * dispatchHandlePress
 * Dispatches the handlePress action
 * @param {Function} dispatch
 * @param {Object} props
 */
export function dispatchHandlePress(dispatch, props) {
  dispatch(handlePress(props));
}

/**
 * dispatchHandleRelease
 * Dispatches the handleRelease action
 * @param {Function} dispatch
 * @param {Object} props
 */
export function dispatchHandleRelease(dispatch, props) {
  dispatch(handleRelease(props));
}
