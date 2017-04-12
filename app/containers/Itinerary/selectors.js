import { createSelector } from 'reselect';

const selectItinerary = (state) => state.get('itinerary');

const makeSelectMode = () => createSelector(
  selectItinerary,
  (itineraryState) => itineraryState.get('mode')
);

export { selectItinerary, makeSelectMode };
