import {createSlice} from '@reduxjs/toolkit';
import {IMe, meSchema} from '../../types/commonTypes';

export interface IUserState {
  me: IMe | null;
}

const userState: IUserState = {
  me: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    loginByCookie(state, action) {},
    loginByCookieSuccess(state, action) {
      const {user} = action.payload;
      state.me = meSchema.parse(user);
    },
    loginByFirebase(state, action) {},
    loginByFirebaseSuccess(state, action) {
      const {user} = action.payload;
      state.me = meSchema.parse(user);
    },
    logout(state, action) {},
    logoutSuccess(state, action) {
      state.me = null;
    },
  },
});

export default userSlice;