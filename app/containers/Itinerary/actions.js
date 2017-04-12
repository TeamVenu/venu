import { SET_EXHIBIT_MODE } from './constants';

/**
 * setExhibitMode
 * Sets the mode which determines which list of exhibits to display
 */
export function setExhibitMode(mode) {
  return {
    type: SET_EXHIBIT_MODE,
    value: mode,
  };
}
