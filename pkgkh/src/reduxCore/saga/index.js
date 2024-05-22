import {all} from 'redux-saga/effects';

import user from './user';
import order from './order';
import common from './common';
import payment from './payment';
import check from './check';
export default function* rootSaga() {
  yield all([...user, ...order, ...common, ...payment, ...check]);
}
