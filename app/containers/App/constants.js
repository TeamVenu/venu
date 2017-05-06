/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'venu/ComponentName' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'venu/MyContainer/MY_ACTION_CONSTANT';
 */

// Social Media Sign in
export const SIGN_IN_WITH_GOOGLE = 'venu/App/SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_WITH_FACEBOOK = 'venu/App/SIGN_IN_WITH_FACEBOOK';
export const SIGN_IN_WITH_PROVIDER_ERROR = 'venu/App/SIGN_IN_WITH_PROVIDER_ERROR';
export const SIGN_IN_WITH_PROVIDER_SUCCESS = 'venu/App/SIGN_IN_WITH_PROVIDER_SUCCESS';

export const DEFAULT_LOCALE = 'en';

export const CHANGE_USER_ID = 'venu/App/CHANGE_USER_ID';
export const SIGN_OUT_USER = 'venu/App/SIGN_OUT_USER';

export const SIGN_IN_USER = 'venu/App/SIGN_IN_USER';
export const SIGN_IN_USER_ERROR = 'venu/App/SIGN_IN_USER_ERROR';
export const SIGN_IN_USER_SUCCESS = 'venu/App/SIGN_IN_USER_SUCCESS';

// Create User
export const CREATE_USER_ACCOUNT = 'venu/App/CREATE_USER_ACCOUNT';
export const CREATE_USER_ACCOUNT_ERROR = 'venu/App/CREATE_USER_ACCOUNT_ERROR';
export const CREATE_USER_ACCOUNT_SUCCESS = 'venu/App/CREATE_USER_ACCOUNT_SUCCESS';

// Load User
export const LOAD_USER_DATA = 'venu/App/LOAD_USER_DATA';
export const LOAD_USER_DATA_ERROR = 'venu/App/LOAD_USER_DATA_ERROR';
export const LOAD_USER_DATA_SUCCESS = 'venu/App/LOAD_USER_DATA_SUCCESS';

// Sync User
export const SYNC_USER_DATA = 'venu/App/SYNC_USER_DATA';
export const SYNC_USER_DATA_ERROR = 'venu/App/SYNC_USER_DATA_ERROR';
export const SYNC_USER_DATA_ADDED = 'venu/App/SYNC_USER_DATA_ADDED';
export const SYNC_USER_DATA_REMOVED = 'venu/App/SYNC_USER_DATA_REMOVED';

export const UPDATE_USER_DATA = 'venu/App/UPDATE_USER_DATA';
export const UPDATE_USER_DATA_ERROR = 'venu/App/UPDATE_USER_DATA_ERROR';
export const UPDATE_USER_DATA_SUCCESS = 'venu/App/UPDATE_USER_DATA_SUCCESS';


// Update Locations
export const TRACK_NEW_LOCATION = 'venu/App/TRACK_NEW_LOCATION';
export const TRACK_NEW_LOCATION_ERROR = 'venu/App/TRACK_NEW_LOCATION_ERROR';
export const TRACK_NEW_LOCATION_SUCCESS = 'venu/App/TRACK_NEW_LOCATION_SUCCESS';

// Auth Email Update
export const UPDATE_AUTH_EMAIL = 'venu/App/UPDATE_AUTH_EMAIL';
export const UPDATE_AUTH_EMAIL_ERROR = 'venu/App/UPDATE_AUTH_EMAIL_ERROR';
export const UPDATE_AUTH_EMAIL_SUCCESS = 'venu/App/UPDATE_AUTH_EMAIL_SUCCESS';

// Auth Password Update
export const UPDATE_AUTH_PASSWORD = 'venu/App/UPDATE_AUTH_PASSWORD';
export const UPDATE_AUTH_PASSWORD_ERROR = 'venu/App/UPDATE_AUTH_PASSWORD_ERROR';
export const UPDATE_AUTH_PASSWORD_SUCCESS = 'venu/App/UPDATE_AUTHPASSWORD_SUCCESS';

//
export const CHANGE_USER_NAME = 'venu/App/CHANGE_USER_NAME';
export const CHANGE_USER_EMAIL = 'venu/App/CHANGE_USER_EMAIL';
export const CHANGE_USER_AGE = 'venu/App/CHANGE_USER_AGE';
export const CHANGE_USER_LOCATION = 'venu/App/CHANGE_USER_LOCATION';
export const CHANGE_USER_INTERESTS = 'venu/App/CHANGE_USER_INTERESTS';
export const CHANGE_PARKING_LOCATION = 'venu/App/CHANGE_PARKING_LOCATION';
export const SETUP_GEOLOCATION = 'venu/App/SETUP_GEOLOCATION';
export const CHANGE_MAP_MODE = 'venu/App/CHANGE_MAP_MODE';
export const CHANGE_SELECTED_PLACE = 'venu/App/CHANGE_SELECTED_PLACE';
export const CHANGE_MAP_CENTER = 'venu/App/CHANGE_MAP_CENTER';

// Detail View
export const CHANGE_EXHIBIT = 'venu/App/CHANGE_EXHIBIT';
export const NAVIGATE_TO_PLACE = 'venu/App/NAVIGATE_TO_PLACE';
export const LIKE_PLACE = 'venu/App/LIKE_PLACE';
export const UNLIKE_PLACE = 'venu/App/UNLIKE_PLACE';

// Error
export const SET_ERROR_MESSAGES = 'venu/App/SET_ERROR_MESSAGES';
export const SET_SUCESS_MESSAGES = 'venu/App/SET_SUCCESS_MESSAGES';
export const SET_USER = 'venu/App/SET_USER';
export const SET_TIMER = 'venu/App/SET_TIMER';
export const SET_LOCATION_ENABLED = 'venu/App/SET_LOCATION_ENABLED';

export const SET_MAP_CENTER = 'venu/App/SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'venu/App/SET_MAP_ZOOM';
