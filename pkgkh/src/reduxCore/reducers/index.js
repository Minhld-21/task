import {combineReducers} from 'redux';

import user, {
  actions as userActions,
  selectors as userSelectors,
  types as userTypes,
} from './user';

import order, {
  actions as orderActions,
  selectors as orderSelectors,
  types as orderTypes,
} from './order';

import common, {
  actions as commonActions,
  selectors as commonSelectors,
  types as commonTypes,
} from './common';

import payment, {
  actions as paymentActions,
  types as paymentTypes,
} from './payment';

import check, {actions as checkActions, types as checkTypes} from './check';
const rootReducer = combineReducers({
  user,
  order,
  common,
  payment,
  check,
});

export {userActions, userSelectors, userTypes};
export {orderActions, orderSelectors, orderTypes};
export {commonActions, commonSelectors, commonTypes};
export {paymentActions, paymentTypes};
export {checkActions, checkTypes};

export default rootReducer;
