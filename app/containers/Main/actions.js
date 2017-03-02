/*
 * Main Actions
 *
 * Actions change things in our application.
 * Since venu uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way our application interacts with
 * our application state. This guarantees that our state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * Format:
 * 1) Import constant
 * 2) Add function:
 *    export function myAction(var) {
 *      return { type: MY_ACTION_CONSTANT, var: var }
 *    }
 */

// Import constants
import { CHANGE_MAP_MODE, CHANGE_USERNAME } from './constants';

/**
 * Changes the map's mode
 * @param  {String} name - The name of the map mode
 * @return {Object}      - An action object with a type of CHANGE_MAP_MODE
 */
export function changeMapMode(name) {
  return {
    type: CHANGE_MAP_MODE,
    name,
  };
}

/**
 * Changes the user's name
 * @param  {String} name - The new name of the user
 * @return {Object}      - An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}
