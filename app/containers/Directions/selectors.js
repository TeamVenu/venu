/*
 * The directions state selectors
 */

import { createSelector } from 'reselect';

const selectDirections = (state) => state.get('directions');

const makeSelectDirections = () => createSelector(
  selectDirections,
  (directionsState) => directionsState.get('directions')
);

const makeSelectIsNavigating = () => createSelector(
  selectDirections,
  (directionsState) => directionsState.get('isNavigating')
);

const makeSelectIsLocationEnabled = () => createSelector(
  selectDirections,
  (directionsState) => directionsState.get('isLocationEnabled')
);

const makeSelectTimer = () => createSelector(
  selectDirections,
  (directionsState) => directionsState.get('timer')
);

export {
  makeSelectTimer,
  selectDirections,
  makeSelectDirections,
  makeSelectIsNavigating,
  makeSelectIsLocationEnabled,
};
