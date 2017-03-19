import { createSelector } from 'reselect';

const selectPanel = (state) => state.get('panel');

const makePanelSelect = () => createSelector(
  selectPanel,
  (panelState) => panelState.get('panelProps')
);

export {
  selectPanel,
  makePanelSelect,
};
