import {
  searchTerm,
  beginSearch,
  setSearchTerm,
  searchCompleted,
} from './actions';

export function dispatchSetSearchTerm(dispatch, event) {
  // Cache search term
  const term = event.target.value;

  // Dispatch our action
  dispatch(setSearchTerm(term));
}

export function dispatchSearchTerm(dispatch, event) {
  const term = event.target.value;
  dispatch(searchTerm(term));
}

export function dispatchBeginSearch(dispatch) {
  dispatch(beginSearch());
}

export function dispatchSearchCompleted(dispatch, results) {
  dispatch(searchCompleted(results));
}
