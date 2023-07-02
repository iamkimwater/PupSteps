import {combineReducers} from 'redux';
import userSlice from './user';
import errorSlice from './error';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  error: errorSlice.reducer,
});

export default rootReducer;
