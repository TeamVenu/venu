import {
  SET_TERM,
  BEGIN_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_TERM,
} from './constants';

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

export function beginSearch() {
  return {
    type: BEGIN_SEARCH,
  };
}

export function searchCompleted(results) {
  return {
    type: SEARCH_COMPLETE,
    value: results,
  };
}
