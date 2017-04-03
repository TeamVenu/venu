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
