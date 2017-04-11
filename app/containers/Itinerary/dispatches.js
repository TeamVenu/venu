import { setExhibitMode } from './actions';

export function dispatchSetExhibitMode(dispatch, event) {
  const modePattern = /(Itinerary|Visited)/i;
  const mode = event.target.textContent;

  if (modePattern.test(mode)) {
    dispatch(setExhibitMode(mode));
  } else {
    dispatch(setExhibitMode('Itinerary'));
  }
}
