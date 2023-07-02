import {createSlice} from '@reduxjs/toolkit';
import {IError} from '../../types/infoTypes';

export interface IErrorState {
  error: IError | null;
}

const errorState: IErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState: errorState,
  reducers: {
    setError(state, actions) {
      const {error} = actions.payload;
      state.error = error;
    },
    clearError(state, actions) {
      state.error = null;
    },
  },
});

export default errorSlice;
