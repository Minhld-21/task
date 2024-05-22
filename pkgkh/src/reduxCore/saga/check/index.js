import {checkApi} from '~services';
import {checkTypes} from '~reduxCore/reducers';
import {call, takeLatest} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

function* checkDistanceSaga({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga checkDistanceSaga');
  try {
    const variables = yield {
      stringCheck: params?.stringCheck,
      latitude: params?.latitude,
      longitude: params?.longitude,
    };
    const res = yield call(checkApi?.checkQR, variables);

    if (res.data.success === '01') {
      if (onSuccess) onSuccess(res.data.data);
    } else {
      if (onError) onError(res.data.message);
      yield showMessage({
        duration: 3000,
        message: res.data.message,
        type: 'danger',
      });
    }
  } catch (error) {
    console.log({err});
    yield onError();
  }
}

function* confirmCheckDistance({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga confirmCheckDistance');
  try {
    const variables = {
      IDNguoiDung: params?.IDNguoiDung,
      IDThietBi: params?.IDThietBi,
      NenTangThietBi: params?.NenTangThietBi,
      ChuoiCheck: params?.ChuoiCheck,
      LoaiCheck: params?.LoaiCheck,
      NgayGioCheck: params?.NgayGioCheck,
      Lati: params?.Lati,
      Longi: params?.Longi,
    };
    const res = yield call(checkApi?.confirmCheck, variables);
    if (res.data.success == '02') {
      if (onError) onError(res.data.message);
      yield showMessage({
        duration: 3000,
        message: res.data.message,
        type: 'danger',
      });
    } else if (res.data.success == '01') {
      if (onSuccess) onSuccess(res.data.data);
      yield showMessage({
        duration: 3000,
        message: res.data.message,
        type: 'danger',
        backgroundColor: 'green',
      });
    } else {
      if (onError) onError(res.data.message);
      yield showMessage({
        duration: 3000,
        message: res.data.message,
        type: 'danger',
      });
    }
  } catch (error) {
    console.log({err});
    yield onError();
  }
}
// get data time sheet
const getTimeSheet = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getTimeSheet');
  try {
    const variables = yield {
      idnguoidung: params?.idnguoidung,
      thang: params?.thang,
      nam: params?.nam,
    };
    res = yield call(checkApi?.getTimeSheet, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success == '01') onSuccess(result?.data);
      else {
        yield onError(result?.message);
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: res?.data?.message,
        type: 'danger',
      });
      onError(res?.data?.message);
    }
  } catch (err) {
    yield onError(err);
  }
};
function* watcher() {
  yield takeLatest(checkTypes.CHECK_DISTANCE_SUCCESS, checkDistanceSaga);
  yield takeLatest(checkTypes.CONFIRM_CHECK_DISTANCE, confirmCheckDistance);
  yield takeLatest(checkTypes.GET_TIME_SHEET, getTimeSheet);
}

export default watcher();
