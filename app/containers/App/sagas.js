import { LOCATION_CHANGE } from 'react-router-redux';
import { take, takeLatest, call, cancel, put, fork, select } from 'redux-saga/effects';
import {
  getAll,
  // get,
  create,
  // push,
  // remove,
  update,
  sync,
  CHILD_ADDED,
  CHILD_REMOVED,
} from 'firebase-saga';

import {
  CREATE_USER_ACCOUNT,
  LOAD_USER_DATA,
  SYNC_USER_DATA,
  UPDATE_USER_DATA,
} from './constants';

import {
  makeSelectUser,
  makeSelectUserId,
} from './selectors';

// Import actions
import {
  loadUserData,
  createUserAccount,
  createUserAccountError,
  createUserAccountSuccess,
  loadUserDataError,
  loadUserDataSuccess,
  updateUserDataError,
  updateUserDataSuccess,
  syncUserDataAdded,
  syncUserDataRemoved,
} from './actions';

export function* syncUserData() {
  // Get the user email
  const { userId } = yield select(makeSelectUserId);
  const requestURL = `users/${userId}`;

  // Yield fork for syncing user data
  yield fork(sync, requestURL, {
    [CHILD_ADDED]: syncUserDataAdded,
    [CHILD_REMOVED]: syncUserDataRemoved,
  });
}

export function* fetchUserData() {
  // Get the userId so we can access user part of database
  const userId = yield select(makeSelectUserId());
  // Create a request URL
  const requestURL = `users/${userId}`;

  try {
    const users = yield call(getAll, requestURL);

    // If user does exist
    if (users !== null) {
      // Load them
      yield put(loadUserDataSuccess(users));
    } else {
      // Otherwise create a user
      yield put(createUserAccount());
    }
  } catch (error) {
    yield put(loadUserDataError(error.message));
  }
}

export function* createUser() {
  try {
    const userId = yield select(makeSelectUserId());
    const userProp = yield select(makeSelectUser());
    const user = (userProp.location) ? userProp : userProp.toJS();

    const userURL = `users/${userId}`;
    yield call(create, 'users', () => ({
      [userURL]: {
        uid: userId,
        name: user.name,
        email: user.email,
        location: {
          lat: 43.084167,
          lng: -77.677085,
        },
        photoURL: user.photoURL,
        parking: '',
        interests: '',
        exhibits: {
          recommended: [''],
          saved: [''],
          visited: [''],
        },
      },
    }));

    yield put(createUserAccountSuccess());
    yield put(loadUserData());
  } catch (error) {
    yield put(createUserAccountError(error.message));
  }
}

export function* updateUser() {
  try {
    const userId = yield select(makeSelectUserId());
    const userProp = yield select(makeSelectUser());
    const user = (userProp.location) ? userProp : userProp.toJS();

    yield call(update, 'users', userId, {
      email: user.email,
      interests: user.interests,
      location: user.location,
      photoURL: user.photoURL,
      name: user.name,
      parking: user.parking,
      uid: user.uid,
      exhibits: user.exhibits,
    });

    yield put(updateUserDataSuccess());
  } catch (error) {
    yield put(updateUserDataError(error.message));
  }
}

export function* firebaseData() {
  const createUserWatcher = yield takeLatest(CREATE_USER_ACCOUNT, createUser);
  const loadUserWatcher = yield takeLatest(LOAD_USER_DATA, fetchUserData);
  const syncUserDataWatcher = yield takeLatest(SYNC_USER_DATA, syncUserData);
  const updateUserWatcher = yield takeLatest(UPDATE_USER_DATA, updateUser);

  yield take(LOCATION_CHANGE);
  yield cancel(createUserWatcher);
  yield cancel(loadUserWatcher);
  yield cancel(updateUserWatcher);
  yield cancel(syncUserDataWatcher);
}

export default [
  firebaseData,
];
