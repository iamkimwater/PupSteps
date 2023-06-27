import {all, fork, put, takeEvery} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import userSlice from '../reducers/user';
import {gateWayWrapper} from './common';

function* loginByFirebaseWatch() {
  yield takeEvery(
    userSlice.actions.loginByFirebase,
    gateWayWrapper(loginByFirebase),
  );
}

function* loginByFirebase(action: any) {
  // const {idToken} = action.payload;
  // const res: AxiosResponse<any, any> = yield axios.get(
  //   `${Config.API_URL}/users/login/firebase`,
  //   {
  //     withCredentials: true,
  //     headers: {
  //       authorization: `Bearer ${idToken}`,
  //     },
  //   },
  // );
  const res = {
    headers: {
      'set-cookie': 'fake-cookie',
      'set-token': null,
    },
    data: {
      user: {
        userId: 1,
        email: 'xxx@naver.com',
      },
    },
  };
  const {user} = res.data;
  if (res.headers['set-cookie']) {
    // cookie
    const cookie = res.headers['set-cookie'][0];
    EncryptedStorage.setItem('cookie', cookie);
    axios.defaults.headers.Cookie = cookie;
    yield put({
      type: userSlice.actions.loginByFirebaseSuccess,
      payload: {user},
    });
  } else if (res.headers['set-token']) {
    // token
    // accessToken store at redux
    // refreshToken store at encryptedStorage
  } else {
    console.log('not received cookie from server');
  }
  return res;
}

function* logoutWatch() {
  yield takeEvery(userSlice.actions.logout, gateWayWrapper(logout));
}

function* logout(action: any) {
  EncryptedStorage.removeItem('cookie');
  yield put({
    type: userSlice.actions.logoutSuccess,
  });
}

function* loginByCookieWatch() {
  yield takeEvery(
    userSlice.actions.loginByCookie,
    gateWayWrapper(loginByCookie),
  );
}

function* loginByCookie(action: any) {
  const res = {
    headers: {
      'set-cookie': 'fake-cookie',
      'set-token': null,
    },
    data: {
      user: {
        userId: 1,
        email: 'xxx@naver.com',
      },
    },
  };
  const {user} = res.data;
  yield put({
    type: userSlice.actions.loginByCookieSuccess,
    payload: {user},
  });
}

export default function* userSaga() {
  yield all([fork(loginByCookieWatch)]);
  yield all([fork(loginByFirebaseWatch)]);
  yield all([fork(logoutWatch)]);
}
