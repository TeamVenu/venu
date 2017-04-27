import { setSearchTerm, searchTerm } from './actions';

export function dispatchSetSearchTerm(dispatch, event) {
  // Cache search term
  const term = event.target.value;

  // Dispatch our action
  dispatch(setSearchTerm(term));
}

export function dispatchSearchTerm(dispatch, event) {
  const term = event.target.value;
  console.log('Searching for term');
  dispatch(searchTerm(term));
}
