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
  CHANGE_USER_NAME,
  CHANGE_USER_EMAIL,
  CHANGE_USER_LOCATION,
  CHANGE_USER_INTERESTS,
  CHANGE_PARKING_LOCATION,
  SETUP_GEOLOCATION,
  CHANGE_MAP_MODE,
  CHANGE_MAP_CENTER,
  CHANGE_SELECTED_PLACE,
} from './constants';

// Returns intial user stage with localStorage
function createInitialUserState() {
  const name = (localStorage.getItem('venuUserName')) ? localStorage.getItem('venuUserName') : '';
  const email = (localStorage.getItem('venuUserEmail')) ? localStorage.getItem('venuUserEmail') : '';
  const locationLat = (localStorage.getItem('venuUserLocationLat')) ? parseFloat(localStorage.getItem('venuUserLocationLat')) : 43.084167;
  const locationLng = (localStorage.getItem('venuUserLocationLng')) ? parseFloat(localStorage.getItem('venuUserLocationLng')) : -77.677085;
  const locationEnabled = (localStorage.getItem('venuUserLocationEnabled')) ? localStorage.getItem('venuUserLocationEnabled') : null;
  const parkingLat = (localStorage.getItem('venuParkingLocationLat')) ? parseFloat(localStorage.getItem('venuParkingLocationLat')) : null;
  const parkingLng = (localStorage.getItem('venuParkingLocationLng')) ? parseFloat(localStorage.getItem('venuParkingLocationLng')) : null;
  const interestString = (localStorage.getItem('venuUserInterests')) ? localStorage.getItem('venuUserInterests').slice(0, -1) : '';
  const interests = (interestString.length > 0) ? interestString.split('-') : [];

  return {
    name,
    email,
    location: {
      lat: locationLat,
      lng: locationLng,
    },
    locationEnabled,
    parking: {
      lat: parkingLat,
      lng: parkingLng,
    },
    interests,
  };
}

// Create an intial user state with localStorage
const initialUserState = createInitialUserState();

// Initial State of the App
const initialState = fromJS({
  // User props
  user: initialUserState,
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
      lat: 43.084167,
      lng: -77.677085,
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
  // Detail View props
  detailViewActions: {},
});

/**
 * appReducer
 * Changes application state based on action taken
 * @param {Object} state
 * @param {Object} action
 */
function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_NAME:
      return state
              .setIn(['user', 'name'], action.value)
              .setIn(['validation', 'accountCreation', 'username'], action.valid);
    case CHANGE_USER_EMAIL:
      return state
              .setIn(['user', 'email'], action.value)
              .setIn(['validation', 'accountCreation', 'email'], action.valid);
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
    default:
      return state;
  }
}

export default appReducer;
