import {all, fork, put, takeEvery} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosResponse} from 'axios';
import userSlice from '../reducers/user';
import {gateWayWrapper} from './common';
import {ZMeInfo, ZPetInfo} from '../../types/zodinfoTypes';
import errorSlice from '../reducers/error';
import {IError} from '../../types/infoTypes';
import Config from 'react-native-config';

function* loginByFirebaseWatch() {
  yield takeEvery(
    userSlice.actions.loginByFirebase,
    gateWayWrapper(loginByFirebase),
  );
}

function* loginByFirebase(action: any) {
  const {idToken} = action.payload;
  // const res: AxiosResponse<any, any> = yield axios.get(
  //   `${Config.API_URL}/users/login/firebase`,
  //   {
  //     withCredentials: true,
  //     headers: {
  //       authorization: `Bearer ${idToken}`,
  //     },
  //   },
  // );
  const res: AxiosResponse<any, any> = yield axios.get(
    `${Config.API_URL}/users/login`,
    {
      headers: {
        authorization: `Bearer ${idToken}`,
      },
    },
  );
  const {user} = res.data;
  const parsedResult = ZMeInfo.safeParse(user);
  if (parsedResult.success) {
    const cookie = res.headers['set-cookie']![0];
    yield EncryptedStorage.setItem('cookie', cookie);
    axios.defaults.headers.cookie = cookie;
    yield put({
      type: userSlice.actions.loginByFirebaseSuccess,
      payload: {user},
    });
  } else {
    console.error(parsedResult.error.message);
    const error: IError = {
      code: 404,
      type: 'user-type-error',
      message: '유저 타입이 잘못되었습니다.',
    };
    yield put({
      type: errorSlice.actions.setError,
      payload: {error},
    });
  }

  return res;
}

function* logoutWatch() {
  yield takeEvery(userSlice.actions.logout, gateWayWrapper(logout));
}

function* logout() {
  yield axios.get(`${Config.API_URL}/users/logout`);
  yield EncryptedStorage.removeItem('cookie');
  axios.defaults.headers.cookie = null;
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
  const {cookie} = action.payload;
  const res: AxiosResponse<any, any> = yield axios.get(
    `${Config.API_URL}/users/login`,
    {
      headers: {
        cookie: cookie,
      },
    },
  );

  const {user} = res.data;

  const parsedResult = ZMeInfo.safeParse(user);
  if (parsedResult.success) {
    axios.defaults.headers.cookie = cookie;
    yield put({
      type: userSlice.actions.loginByCookieSuccess,
      payload: {user: parsedResult.data},
    });
  } else {
    console.error(parsedResult.error.message);
    const error: IError = {
      code: 404,
      type: 'user-type-error',
      message: '유저 타입이 잘못되었습니다.',
    };
    yield put({
      type: errorSlice.actions.setError,
      payload: {error},
    });
  }
}

function* addPetInfoWatch() {
  yield takeEvery(userSlice.actions.addPetInfo, gateWayWrapper(addPetInfo));
}

function* addPetInfo(action: any) {
  const {petName, petAge, petGender, petBreed, formData} = action.payload;
  const res: AxiosResponse = yield axios.post(`${Config.API_URL}/users/pet`, {
    petName,
    petAge,
    petGender,
    petBreed,
    formData,
  });

  const {petInfo} = res.data;

  const parsedResult = ZPetInfo.safeParse(petInfo);
  if (parsedResult.success) {
    yield put({
      type: userSlice.actions.addPetInfoSuccess,
      payload: {petInfo: parsedResult.data},
    });
  } else {
    console.error(parsedResult.error.message);
  }
}

export default function* userSaga() {
  yield all([fork(loginByCookieWatch)]);
  yield all([fork(loginByFirebaseWatch)]);
  yield all([fork(logoutWatch)]);
  yield all([fork(addPetInfoWatch)]);
}
