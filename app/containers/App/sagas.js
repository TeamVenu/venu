import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { take, takeLatest, call, cancel, put, fork, select } from 'redux-saga/effects';
import {
  getAll,
  get,
  create,
  push,
  remove,
  update,
  sync,
  CHILD_ADDED,
  CHILD_REMOVED,
} from 'firebase-saga';

import { makeSelectEmail } from 'containers/Onboarding/selectors';

import {
  CREATE_USER_ACCOUNT,
  LOAD_USER_DATA,
  SYNC_USER_DATA,
} from './constants';

import {
  makeSelectUser,
  makeSelectUserId,
} from './selectors';

// Import actions
import {
  loadUserData,
  createUserAccountError,
  createUserAccountSuccess,
  loadUserDataError,
  loadUserDataSuccess,
  syncUserDataAdded,
  syncUserDataRemoved,
} from './actions';

export function* syncUserData() {
  // Get the user email
  const { email } = yield select(makeSelectUser);
  const requestURL = `users/${email}`;

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
    yield put(loadUserDataSuccess(users));
  } catch (error) {
    yield put(loadUserDataError(error));
  }
}

export function* createUser() {
  try {
    const userId = yield select(makeSelectUserId());
    const email = yield select(makeSelectEmail());

    const userURL = `users/${userId}`;

    yield call(create, 'users', () => ({
      [userURL]: {
        uid: userId,
        name: '',
        age: '',
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
        role: 'user',
        email,
      },
    }));

    yield put(createUserAccountSuccess());
    yield put(loadUserData());
  } catch (error) {
    yield put(createUserAccountError(error));
  }
}

export function* firebaseData() {
  const createUserWatcher = yield takeLatest(CREATE_USER_ACCOUNT, createUser);
  const loadUserWatcher = yield takeLatest(LOAD_USER_DATA, fetchUserData);
  const syncUserDataWatcher = yield takeLatest(SYNC_USER_DATA, syncUserData);

  yield take(LOCATION_CHANGE);
  yield cancel(createUserWatcher);
  yield cancel(loadUserWatcher);
  yield cancel(syncUserDataWatcher);
}

export default [
  firebaseData,
];
