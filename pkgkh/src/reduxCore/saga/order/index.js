import {call, takeLatest, takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {orderTypes, orderActions, orderSelectors} from '~reduxCore/reducers';
import {orderApi} from '~services';

// cập nhật giỏ hàng
const setCart = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga setCart');
  try {
    const variables = yield {};
    const type = params?.type;
    if (type === 'REMOVE_FROM_CART') {
      (variables.loai = 3), (variables.idnguoidung = params?.idnguoidung);
      variables.idsanpham = params?.idsanpham;
    } else {
      (variables.loai = 1), (variables.idnguoidung = params?.idnguoidung);
      variables.idsanpham = params?.idsanpham;
      variables.soluong = params?.soluong;
    }
    const res = yield call(orderApi?.setCart, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success === '01') {
        switch (type) {
          case 'ADD_TO_CART':
            yield put(orderActions.addToCart(params));
            break;
          case 'REMOVE_FROM_CART':
            yield put(orderActions.removeFromCart(params));
            break;
          case 'INCREASE_NUMBER_OF_PRODUCT':
            yield put(orderActions.increaseNumberOfProduct(params));
            break;
          case 'DESCREASE_NUMBER_OF_PRODUCT':
            yield put(orderActions.descreaseNumberOfProduct(params));
            break;
          default:
            break;
        }
        yield onSuccess();
      } else {
        yield onError();
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

// Lấy dữ liệu sản phẩm theo ID
const getProductById = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getProductById');
  try {
    const variables = yield {
      loai: 21,
      idsanphams: params?.idsanphams,
    };
    const res = yield call(orderApi?.getProductById, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success === '01') {
        yield onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const watcher = function* () {
  yield takeLatest(orderTypes.SET_CART, setCart);
  yield takeEvery(orderTypes.GET_PRODUCT_BY_ID, getProductById);
};
export default watcher();
