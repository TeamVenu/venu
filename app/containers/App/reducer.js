/*
 * AppReducer
 * The reducer takes care of our data.
 * Using actions, we can change our application state.
 * To add a new global action,
 * add it to the switch statement in the reducer function
 *
 * Example:
 * case ACTION_TYPE_CONSTANT:
 *  return state.set('stateVariable', action.value);
 * case ACTION_TYPE_CONSTANT_PROP:
 *  return state.setIn(['stateObject', 'stateProp'], action.value);
 */

import { fromJS } from 'immutable';
import imagineRITData from 'fixtures/places.json';
import mapStyles from 'fixtures/map-styles.json';

import {
  SIGN_IN_USER,
  SIGN_IN_USER_ERROR,
  SIGN_IN_USER_SUCCESS,
  SIGN_OUT_USER,
  CHANGE_USER_ID,
  CREATE_USER_ACCOUNT,
  CREATE_USER_ACCOUNT_ERROR,
  CREATE_USER_ACCOUNT_SUCCESS,
  LOAD_USER_DATA,
  LOAD_USER_DATA_ERROR,
  LOAD_USER_DATA_SUCCESS,
  SYNC_USER_DATA,
  SYNC_USER_DATA_ERROR,
  SYNC_USER_DATA_ADDED,
  SYNC_USER_DATA_REMOVED,
  CHANGE_USER_NAME,
  CHANGE_USER_AGE,
  CHANGE_USER_EMAIL,
  CHANGE_USER_LOCATION,
  CHANGE_USER_INTERESTS,
  CHANGE_PARKING_LOCATION,
  SETUP_GEOLOCATION,
  CHANGE_MAP_MODE,
  CHANGE_MAP_CENTER,
  CHANGE_SELECTED_PLACE,
  NAVIGATE_TO_PLACE,
  LIKE_PLACE,
  UNLIKE_PLACE,
  CHANGE_EXHIBIT,
  SET_ERROR_MESSAGES,
} from './constants';

// Returns intial user stage with localStorage
function createInitialUserState() {
  // const name = (localStorage.getItem('venuUserName')) ? localStorage.getItem('venuUserName') : '';
  // const email = (localStorage.getItem('venuUserEmail')) ? localStorage.getItem('venuUserEmail') : '';
  // const locationLat = (localStorage.getItem('venuUserLocationLat')) ? parseFloat(localStorage.getItem('venuUserLocationLat')) : 43.084167;
  // const locationLng = (localStorage.getItem('venuUserLocationLng')) ? parseFloat(localStorage.getItem('venuUserLocationLng')) : -77.677085;
  // const locationEnabled = (localStorage.getItem('venuUserLocationEnabled')) ? localStorage.getItem('venuUserLocationEnabled') : null;
  // const parkingLat = (localStorage.getItem('venuParkingLocationLat')) ? parseFloat(localStorage.getItem('venuParkingLocationLat')) : null;
  // const parkingLng = (localStorage.getItem('venuParkingLocationLng')) ? parseFloat(localStorage.getItem('venuParkingLocationLng')) : null;
  // const interests = (localStorage.getItem('venuUserInterests')) ? localStorage.getItem('venuUserInterests').split('-') : [];

  return {
    uid: '',
    name: '',
    email: '',
    location: {
      lat: '',
      lng: '',
    },
    locationEnabled: false,
    parking: {
      lat: '',
      lng: '',
    },
    interests: '',
  };
}

// Create an intial user state with localStorage
const initialUserState = createInitialUserState();

// Initial State of the App
const initialState = fromJS({
  // Indicates a saga is underway
  loading: false,
  // Indicates there is an error
  error: null,
  // User id used for database
  uid: '',
  // User, will receive data from firebase
  user: initialUserState,
  isSignedIn: null,
  // Onboarding validation props
  validation: {
    accountCreation: {
      username: (localStorage.getItem('venuAccountValidationName')) ? true : null,
      email: (localStorage.getItem('venuAccountValidationEmail')) ? true : null,
    },
    geolocationSetup: {
      mode: '',
    },
  },
  // Main props
  exhibits: imagineRITData.exhibits,
  facilities: imagineRITData.facilities,
  mapMode: 'Discover',
  // Map props
  venuMap: {
    bootstrapURLKeys: {
      key: 'AIzaSyCC_hT5gMai_hZh8JSnlFzFOCTetRBYhQg',
      language: 'en',
    },
    center: {
      lat: (localStorage.getItem('venuUserLocationLat')) ? parseFloat(localStorage.getItem('venuUserLocationLat')) : 43.084167,
      lng: (localStorage.getItem('venuUserLocationLng')) ? parseFloat(localStorage.getItem('venuUserLocationLng')) : -77.677085,
    },
    markerSize: 40,
    options: {
      clickableIcons: false,
      zoomControl: false,
      styles: mapStyles,
    },
    zoom: 20,
  },
  // Current place
  currentPlace: {},
});

/**
 * appReducer
 * Changes application state based on action taken
 * @param {Object} state
 * @param {Object} action
 */
function appReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return state
        .set('loading', true);
    case SIGN_IN_USER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.value);
    case SIGN_IN_USER_SUCCESS:
      return state
      .set('loading', false)
      .set('isSignedIn', true)
      .set('uid', action.value);
    case SIGN_OUT_USER:
      return state
        .set('uid', '')
        .set('isSignedIn', false)
        .set('user', fromJS(initialUserState));
    case CHANGE_USER_ID:
      return state
        .set('uid', action.value);
    case CREATE_USER_ACCOUNT:
      return state
        .set('loading', true)
        .set('error', null);
    case CREATE_USER_ACCOUNT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.value);
    case CREATE_USER_ACCOUNT_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null);
    case LOAD_USER_DATA:
      return state
        .set('loading', true)
        .set('error', null);
    case LOAD_USER_DATA_ERROR:
      return state
        .set('loading', false)
        .set('error', action.value);
    case LOAD_USER_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('isSignedIn', true)
        .set('user', action.value);
    case SET_ERROR_MESSAGES:
      return state
        .set('error', action.value);
    case CHANGE_USER_NAME:
      return state
        .setIn(['user', 'name'], action.value);
    case CHANGE_USER_AGE:
      return state
        .setIn(['user', 'age'], action.value);
    case CHANGE_USER_EMAIL:
      return state
        .setIn(['user', 'email'], action.value);
    case SETUP_GEOLOCATION:
      return state
        .setIn(['user', 'location'], action.value)
        .setIn(['user', 'locationEnabled'], action.isEnabled)
        .setIn(['validation', 'geolocationSetup', 'mode'], action.mode);
    case CHANGE_PARKING_LOCATION:
      return state
        .setIn(['user', 'parking'], action.value);
    case CHANGE_USER_LOCATION:
      return state
        .setIn(['user', 'location'], action.value);
    case CHANGE_USER_INTERESTS:
      return state
        .setIn(['user', 'interests'], action.value);
    case CHANGE_MAP_MODE:
      return state
        .set('mapMode', action.value);
    case CHANGE_SELECTED_PLACE:
      return state
        .set('currentPlace', action.value);
    case CHANGE_MAP_CENTER:
      return state
        .setIn(['venuMap', 'center'], action.value);
    case CHANGE_EXHIBIT:
      // Change exhibits prop
      // Go to colorZone which our exhibit belongs
      // Using the key which is the position in the array
      return state
        .setIn(['exhibits', action.value.colorZone, action.value.key], action.value);
    case NAVIGATE_TO_PLACE:
    case LIKE_PLACE:
    case UNLIKE_PLACE:
    default:
      return state;
  }
}

export default appReducer;
