import { fromJS } from 'immutable';
import searchData from 'fixtures/searchDemo.json';

import { SEARCH_TERM, SET_TERM } from './constants';

const initialState = fromJS({
  searchTerm: '',
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
    default:
      return state;
  }
}

export default searchReducer;
