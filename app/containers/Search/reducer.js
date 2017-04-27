import { fromJS } from 'immutable';
import searchData from 'fixtures/searchData.json';

import {
  SET_TERM,
  BEGIN_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_TERM,
} from './constants';

const initialState = fromJS({
  searchTerm: '',
  searching: false,
  searchResults: [],
  searchData: searchData.data,
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TERM:
      return state
        .set('searchTerm', action.value);
    case SEARCH_TERM:
      return state
        .set('searchTerm', action.value);
    case BEGIN_SEARCH:
      return state
        .set('searching', true)
        .set('searchResults', []);
    case SEARCH_COMPLETE:
      return state
        .set('searching', false)
        .set('searchResults', action.value);
    default:
      return state;
  }
}

export default searchReducer;
