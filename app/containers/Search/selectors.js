import { createSelector } from 'reselect';

const selectSearch = (state) => state.get('search');

const makeSelectSearchTerm = () => createSelector(
  selectSearch,
  (searchState) => searchState.get('searchTerm')
);

const makeSelectSearchData = () => createSelector(
  selectSearch,
  (searchState) => searchState.get('searchData')
);

export {
  selectSearch,
  makeSelectSearchTerm,
  makeSelectSearchData,
};
