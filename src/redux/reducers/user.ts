import {createSlice} from '@reduxjs/toolkit';
import {IMeInfo, IOtherInfo} from '../../types/infoTypes';

export interface IUserState {
  me: IMeInfo | null;
  other: IOtherInfo | null;
}

const userState: IUserState = {
  me: null,
  other: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    loginByCookie(state, action) {},
    loginByCookieSuccess(state, action) {
      state.me = action.payload.user;
    },
    loginByFirebase(state, action) {},
    loginByFirebaseSuccess(state, action) {
      state.me = action.payload.user;
    },
    logout(state, action) {},
    logoutSuccess(state, action) {
      state.me = null;
    },
  },
});

export default userSlice;
