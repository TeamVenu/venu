import { fromJS } from 'immutable';
import update from 'immutability-helper';
import { 
  CREATE_USER_ACCOUNT,
  CHANGE_USER_EMAIL,
  CHANGE_USER_DISPLAYNAME,
  ERROR_USER_ACCOUNT_CREATION,
} from './constants';

const initialState = fromJS({
  user: {
    name: '',
    email: '',
  },
  errorMessages: {
    accountCreation: [],
    geolocation: [],
    interestSelection: [],
  },
});

function onboardingReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_DISPLAYNAME:
      return state.setIn(['user', 'name'], action.value);
    case CHANGE_USER_EMAIL:
      return state.setIn(['user', 'email'], action.value);
    case ERROR_USER_ACCOUNT_CREATION:
      return state.setIn(['errorMessages', 'accountCreation'], action.value);
    default:
      return state;
  }
}

export default onboardingReducer;