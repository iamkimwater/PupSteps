import {call} from 'redux-saga/effects';

export function gateWayWrapper(sagaFunction: any) {
  return function* gateWay(action: any) {
    try {
      yield call(sagaFunction, action);
    } catch (e) {
      console.log(e);
    }
  };
}
