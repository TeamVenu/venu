import { SET_TERM, SEARCH_TERM } from './constants';

export function setSearchTerm(term) {
  return {
    type: SET_TERM,
    value: term,
  };
}

export function searchTerm(term) {
  return {
    type: SEARCH_TERM,
    value: term,
  };
}
