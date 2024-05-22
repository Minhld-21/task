import {call, takeLatest, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {
  userTypes,
  userActions,
  commonActions,
  orderActions,
} from '~reduxCore/reducers';
import {loginApi} from '~services';
import LocalDB from '~data/asyncStorage';

const userLogin = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga login');
  try {
    yield LocalDB.logOut();
    if (params?.taikhoan === '') {
      yield showMessage({
        duration: 3000,
        message: 'Bạn chưa nhập tài khoản',
        type: 'danger',
      });
      yield onError();
    } else {
      if (params?.matkhau === '') {
        yield showMessage({
          duration: 3000,
          message: 'Bạn chưa nhập mật khẩu',
          type: 'danger',
        });
        yield onError();
      } else {
        const variables = yield {
          loai: 1,
          taikhoan: params?.taikhoan,
          matkhau: params?.matkhau,
          token: params?.token,
          chude: params?.chude,
          bangdulieu: ['nguoidung', 'chuyenmuc', 'giohang', 'yeuthich'],
        };
        const res = yield call(loginApi?.userLogin, variables);
        if (res.success) {
          const result = res?.data;
          if (result?.nguoidung[0]?.TaiKhoan !== undefined) {
            yield put(userActions.setUserData(result?.nguoidung[0]));
            yield onSuccess();
            yield put(orderActions.syncCart(result?.giohang));
            yield put(commonActions.setLike(result?.yeuthich));
          } else {
            yield showMessage({
              duration: 3000,
              message: 'Tài khoản hoặc mật khẩu không chính xác',
              type: 'danger',
            });
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
      }
    }
  } catch (err) {
    showMessage({
      duration: 3000,
      message: 'Tài khoản hoặc mật khẩu không chính xác',
      type: 'danger',
    });
    yield onError();
    console.log({err});
  }
};

const userLogout = function* ({payload: {onSuccess, onError}}) {
  try {
    yield put(userActions.setEmptyProfile());
    yield put(orderActions.cleanCart());
    yield put(commonActions.setLike([]));
    yield onSuccess();
  } catch (err) {
    yield onError();
  }
};

const registerUser = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateStaff');
  try {
    const variables = {
      ho: params?.ho,
      ten: params?.ten,
      taikhoan: params?.taikhoan,
      matkhau: params?.matkhau,
      dienthoai: params?.dienthoai,
      email: params?.email,
      cmnd: params?.cmnd,
      ngaysinhnhat: params?.ngaysinhnhat,
      token: params?.token,
      chude: params?.chude,
      idvaitro: 5,
      idcuahang: 0,
    };
    const res = yield call(loginApi?.registerUser, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '01') {
        onSuccess();
      } else {
        const err = result[0]?.message;
        onError(err);
      }
    } else {
      // Thông báo lỗi từ API trả về
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

const changePassword = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga changePassword');
  try {
    let variables = {
      loai: 9,
      matkhaumoi: params?.matkhaumoi,
      taikhoan: params?.taikhoan,
      matkhau: params?.matkhau,
    };
    const res = yield call(loginApi?.changePassword, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '01') {
        onSuccess();
      } else {
        onError();
      }
    } else {
      // Thông báo lỗi từ API trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    yield onError(err);
  }
};

const checkAccount = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga checkAccount');
  try {
    let variables = {
      loai: params?.loai,
      taikhoan: params?.taikhoan,
      email: params?.email,
    };
    const res = yield call(loginApi?.checkAccount, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result.success === '01') {
        onSuccess(result);
      } else {
        onError(result?.message);
      }
    } else {
      // Thông báo lỗi từ API trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    yield onError(err);
  }
};
// cập nhật danh sách nhân viên
const blockAccount = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga blockAccount');
  try {
    let variables = {
      loai: params?.loai,
      idnguoidung: params?.idnguoidung,
      islock: params?.islock,
    };
    const res = yield call(loginApi?.blockAccount, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '01') {
        onSuccess();
      } else {
        const err = result[0]?.msgErr;
        onError(err);
      }
    } else {
      // Thông báo lỗi từ API trả về
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
  yield takeLatest(userTypes.USER_LOGIN, userLogin);
  yield takeLatest(userTypes.USER_LOGOUT, userLogout);
  yield takeLatest(userTypes.REGISTER_USER, registerUser);
  yield takeLatest(userTypes.CHANGE_PASSWORD, changePassword);
  yield takeLatest(userTypes.CHECK_ACCOUNT, checkAccount);
  yield takeLatest(userTypes.BLOCK_ACCOUNT, blockAccount);

};
export default watcher();
