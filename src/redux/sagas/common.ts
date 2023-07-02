import {call, put} from 'redux-saga/effects';
import {ZError} from '../../types/zodinfoTypes';
import errorSlice from '../reducers/error';
import {IError} from '../../types/infoTypes';

export function gateWayWrapper(sagaFunction: any) {
  return function* gateWay(action: any) {
    try {
      yield call(sagaFunction, action);
    } catch (e) {
      console.error(e);
      const parsedResult = ZError.safeParse(e);
      if (parsedResult.success) {
        const error: IError = {
          code: parsedResult.data.response.data.code,
          type: parsedResult.data.response.data.type,
          message: parsedResult.data.response.data.message,
        };
        yield put({
          type: errorSlice.actions.setError,
          payload: {error},
        });
      } else {
        console.error(parsedResult.error.message);
      }
    }
  };
}
