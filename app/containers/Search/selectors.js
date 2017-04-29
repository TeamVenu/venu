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

const makeSelectIsSearching = () => createSelector(
  selectSearch,
  (searchState) => searchState.get('searching')
);

const makeSelectSearchResults = () => createSelector(
  selectSearch,
  (searchState) => searchState.get('searchResults')
);

export {
  selectSearch,
  makeSelectSearchTerm,
  makeSelectSearchData,
  makeSelectIsSearching,
  makeSelectSearchResults,
};
