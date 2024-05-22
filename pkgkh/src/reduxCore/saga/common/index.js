import {
  call,
  takeLatest,
  takeEvery,
  takeLeading,
  put,
} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {commonApi} from '~services';
import {commonTypes, commonActions} from '~reduxCore/reducers';

const getListStore = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListStore');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    res = yield call(commonApi?.getListStore, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getListProduct = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListProduct');
  try {
    const variables = yield {
      loai: params?.loai,
      sotrang: params?.sotrang,
      soitem: params?.soitem,
      timkiem: params?.timkiem,
    };
    res = yield call(commonApi?.getListProduct, variables);
    console.log(params);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '00') {
        yield onError();
        yield put(commonActions.setListProduct(null));
      } else {
        yield put(commonActions.setListProduct(result));
        yield onSuccess();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getDetailProduct = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getDetailProduct');
  try {
    const variables = yield {
      loai: 4,
      idsanpham: params?.idsanpham,
    };
    res = yield call(commonApi?.getDetailProduct, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success === '01') {
        yield onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

// get Natio
const getNatio = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getNatio');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    res = yield call(commonApi?.getNatio, variables);
    if (res.success) {
      const result = res?.data?.content;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getListCity = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListCity');
  try {
    const variables = yield {
      loai: params?.loai,
      CountryCode: params.CountryCode,
    };
    res = yield call(commonApi?.getListCity, variables);
    if (res.success) {
      const result = res?.data?.content;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getListZipCode = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListZipCode');
  try {
    const variables = yield {
      loai: params?.loai,
      CountryCode: params?.CountryCode,
      StateCode: params?.StateCode,
    };
    res = yield call(commonApi?.getListZipCode, variables);
    if (res.success) {
      const result = res?.data?.content;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getTransporter = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getTransporter');
  try {
    const variables = yield {
      loai: params?.loai,
      mabanghotro: params?.mabanghotro,
    };
    res = yield call(commonApi?.getTransporter, variables);
    if (res.success) {
      const result = res?.data;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const checkDiscountCode = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga checkDiscountCode');
  try {
    const variables = yield {
      loai: params?.loai,
      magiamgias: params?.magiamgias,
    };
    res = yield call(commonApi?.checkDiscountCode, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success == '01') {
        yield onSuccess(result);
      } else {
        const err = 'Mã khuyến mãi không chính xác!';
        yield onError(err);
      }
    } else {
      //thông báo lỗi từ api trả về
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

const getFeeShip = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getFeeShip');
  try {
    const variables = yield {
      matinhgui: params?.matinhgui,
      tinhgui: params?.tinhgui,
      quangui: params?.quangui,
      matinhnhan: params?.matinhnhan,
      tinhnhan: params?.tinhnhan,
      quannhan: params?.quannhan,
      diachinhan: params?.diachinhan,
      trongluong: params?.trongluong,
      trigia: params?.trigia,
      manhavanchuyen: params?.manhavanchuyen,
      chuyenphatnhanh: params?.chuyenphatnhanh,
      giatoithieunoitinh: params?.giatoithieunoitinh,
      giatoithieulientinh: params?.giatoithieulientinh,
    };
    res = yield call(commonApi?.getFeeShip, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success == '01') {
        yield onSuccess(result?.cuocphi);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
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

const createOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga createOrder');
  let Ho = '';
  let Ten = '';
  try {
    if (params?.ten === undefined) {
      const lastSpaceIndex = params?.tenkhachhang.lastIndexOf(' ');
      Ho = params?.tenkhachhang.slice(0, lastSpaceIndex);
      Ten = params?.tenkhachhang.slice(lastSpaceIndex + 1);
    }
    const variables = yield {
      loaidonhang: params.loaidonhang,
      dienthoai: params?.dienthoai,
      dienthoainhan: params?.dienthoainhan,
      tenkhachhang: params?.tenkhachhang,
      maquocgia: params?.maquocgia,
      tenquocgia: params?.tenquocgia,
      mabang: params?.mabang,
      thanhpho: params?.thanhpho,
      tenbang: params?.tenbang,
      tenquan: params?.tenquan,
      diachi: params?.diachi,
      hinhthucnhanhang: params?.hinhthucnhanhang,
      hinhthucthanhtoan: params?.hinhthucthanhtoan,
      dichvucongthem: [],
      ghichu: params?.ghichu,
      magiamgia: params?.magiamgia,
      nhantaicuahang: params?.nhantaicuahang,
      magiamgias: params?.magiamgias,
      email: params?.email,
      ho: params?.ho === undefined ? Ho : params?.ho,
      ten: params?.ten === undefined ? Ten : params?.ten,
      ngaysinh: params?.ngaysinh,
      sanphamdachon: params?.sanphamdachon,
      phiship: params?.phiship,
      sotiengiam: params?.sotiengiam,
      idnguoithuchien: params?.idnguoithuchien,
    };
    res = yield call(commonApi?.createOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result === undefined || result === null) {
        yield onError();
      } else {
        yield onSuccess(result);
      }
    } else {
      //thông báo lỗi từ api trả về
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

const getListOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListOrder');
  try {
    const {loai, laynhieudon, idcuahang, type} = params;
    let variables = {
      loai,
      laynhieudon,
      idcuahang,
    };

    if (type === 1) {
      variables = {
        ...variables,
        dienthoaikhachhang: params?.stringsearch,
      };
    } else if (type === 2) {
      variables = {
        ...variables,
        madonhang: params?.stringsearch,
      };
    }
    const res = yield call(commonApi.getListOrder, variables);
    if (res.success) {
      const result = res.data?.DonHang;
      if (result.length > 0) {
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

const getDetailOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getDetailOrder');
  try {
    const variables = yield {
      loai: params?.loai,
      idcuahang: params?.idcuahang,
      madonhang: params?.madonhang,
      tungay: params?.tungay,
      denngay: params?.denngay,
    };
    res = yield call(commonApi?.getDetailOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result.DonHang.length > 0) {
        yield onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
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

const sendMailBooking = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga sendMailBooking');
  try {
    const variables = yield {
      to: params?.to,
      title: params?.title,
      body: params?.body,
    };
    res = yield call(commonApi?.sendMailBooking, variables);
    const result = res?.data;
    if (result?.success == '01') {
      yield onSuccess();
    } else {
      yield onError();
    }
  } catch (err) {
    yield onError(err);
  }
};

const getPaymentMethod = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getPaymentMethod');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    res = yield call(commonApi?.getPaymentMethod, variables);
    const result = res?.data;
    if (result?.length > 0) {
      yield onSuccess(result);
    } else {
      yield onError();
    }
  } catch (err) {
    yield onError(err);
  }
};

const getReceivingMethod = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getReceivingMethod');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    res = yield call(commonApi?.getReceivingMethod, variables);
    const result = res?.data;
    if (result.length > 0) {
      yield onSuccess(result);
    } else {
      yield onError();
    }
  } catch (err) {
    yield onError(err);
  }
};
// Tìm kiếm đơn hàng
const findOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga findOrder');
  try {
    const variables = yield {
      idnguoidung: params?.idnguoidung,
      idcuahang: params?.idcuahang,
      tungay: params?.tungay,
      denngay: params?.denngay,
      chuoitimkiem: params?.chuoitimkiem,
    };
    res = yield call(commonApi?.findOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result.success == '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError(result?.message);
      }
    } else {
      //thông báo lỗi từ api trả về
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

// lấy danh sách user
const getListUser = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListUser');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    res = yield call(commonApi?.getListUser, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) onSuccess(result);
      else {
        yield showMessage({
          duration: 3000,
          message: res?.data?.message,
          type: 'danger',
        });
      }
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.data?.message,
        type: 'danger',
      });
      onError();
    }
  } catch (err) {
    yield onError(err);
  }
};

// Push Notification
const pushNotify = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga pushNotify');
  try {
    const variables = yield {
      to: params?.to,
      title: params?.title,
      body: params?.body,
    };
    res = yield call(commonApi?.pushNotify, variables);
    if (res.success) {
      const result = res?.data;
      if (result.success == '01') {
        yield onSuccess();
      } else {
        yield onError(result?.message);
      }
    } else {
      //thông báo lỗi từ api trả về
      const err = 'error';
      yield onError(err);
    }
  } catch (err) {
    yield onError(err);
  }
};

// cập nhật thông tin người mua
const handleLike = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga handleLike');
  try {
    const variables = yield {
      loai: 5,
      yeuthich: params?.yeuthich,
      idsanpham: params?.idsanpham,
      idnguoidung: params?.idnguoidung,
    };
    const res = yield call(commonApi?.handleLike, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success === '01') {
        yield onSuccess();
      } else {
        yield onError();
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: 'Error',
        type: 'danger',
      });
    }
  } catch (err) {
    yield onError(err);
  }
};

// Xem phong thủy
const viewNumerologies = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga viewNumerologies');
  try {
    const variables = yield {
      fullname: params?.fullname,
      gender: params?.gender,
      dayofbirth: params?.dayofbirth,
      monthofbirth: params?.monthofbirth,
      yearofbirth: params?.yearofbirth,
      phonenumber: params?.phonenumber,
      email: params?.email,
      creatorid: params?.creatorid,
      destiny: params?.destiny,
    };
    const res = yield call(commonApi?.viewNumerologies, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError(result?.message);
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: 'Error',
        type: 'danger',
      });
    }
  } catch (err) {
    yield onError(err);
  }
};

// Lấy thông tin xem phong thủy trước đó
const getNumerologies = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getNumerologies');
  try {
    const variables = yield {
      igencode: params?.igencode,
      ngaythexuat: params?.ngaythexuat,
    };
    const res = yield call(commonApi?.getNumerologies, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError(result?.message);
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: 'Error',
        type: 'danger',
      });
    }
  } catch (err) {
    yield onError(err);
  }
};

// Xem cung menh
const getDestiny = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getDestiny');
  try {
    const variables = yield {
      fullname: params?.fullname === '' ? undefined : params?.fullname,
      gender: params?.gender,
      dayofbirth: params?.dayofbirth,
      monthofbirth: params?.monthofbirth,
      yearofbirth: params?.yearofbirth,
    };
    const res = yield call(commonApi?.getDestiny, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError(result?.message);
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: 'Error',
        type: 'danger',
      });
    }
  } catch (err) {
    yield onError(err);
  }
};

// update lại dữ liệu Numerologies cũ
const updateNumerologies = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateNumerologies');
  try {
    const variables = yield {
      igencode: params?.igencode,
      ngaythexuat: params?.ngaythexuat,
    };
    const res = yield call(commonApi?.updateNumerologies, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError(result?.message);
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: 'Error',
        type: 'danger',
      });
    }
  } catch (err) {
    yield onError(err);
  }
};
const historyNumerologies = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga historyNumerologies');
  try {
    const variables = yield {
      chuoitimkiem: params?.chuoitimkiem,
      idnguoitao: params?.idnguoitao,
    };
    const res = yield call(commonApi?.historyNumerologies, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]['success'] === '01') {
        yield onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      yield showMessage({
        duration: 3000,
        message: 'Error',
        type: 'danger',
      });
    }
  } catch (err) {
    yield onError(err);
  }
};

const getListTempalteZaloOA = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getListTempalteZaloOA');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    res = yield call(commonApi?.getListTempalteZaloOA, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const sendMessageZaloOA = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga sendMessageZaloOA');
  try {
    const variables = yield {
      loai: params?.loai,
      template_id: params?.template_id,
      creator_id: params?.creator_id,
      phone: params?.phone,
      order_code: params?.order_code,
      tracking_id: params?.tracking_id,
    };
    res = yield call(commonApi?.sendMessageZaloOA, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        onSuccess();
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.error,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const watcher = function* () {
  yield takeLatest(commonTypes.GET_LIST_STORE, getListStore);
  yield takeLeading(commonTypes.GET_LIST_PRODUCT, getListProduct);
  yield takeLatest(commonTypes.GET_DETAIL_PRODUCT, getDetailProduct);
  yield takeLatest(commonTypes.GET_LIST_ZIPCODE, getListZipCode);
  yield takeLatest(commonTypes.GET_NATIO, getNatio);
  yield takeLatest(commonTypes.GET_LIST_CITY, getListCity);
  yield takeLatest(commonTypes.GET_TRANSPORTER, getTransporter);
  yield takeEvery(commonTypes.CHECK_DISCOUNT_CODE, checkDiscountCode);
  yield takeLatest(commonTypes.GET_FEE_SHIP, getFeeShip);
  yield takeLatest(commonTypes.CREATE_ORDER, createOrder);
  yield takeLatest(commonTypes.GET_LIST_ORDER, getListOrder);
  yield takeLatest(commonTypes.GET_DETAIL_ORDER, getDetailOrder);
  yield takeLatest(commonTypes.SEND_MAIL_BOOKING, sendMailBooking);
  yield takeLatest(commonTypes.GET_PAYMENT_METHOD, getPaymentMethod);
  yield takeLatest(commonTypes.GET_RECEIVING_METHOD, getReceivingMethod);
  yield takeLatest(commonTypes.FIND_ORDER, findOrder);
  yield takeLatest(commonTypes.GET_LIST_USER, getListUser);
  yield takeLatest(commonTypes.PUSH_NOTIFY, pushNotify);
  yield takeLatest(commonTypes.HANDLE_LIKE, handleLike);
  yield takeLatest(commonTypes.VIEW_NUMEROLOGIES, viewNumerologies);
  yield takeLatest(commonTypes.GET_NUMEROLOGIES, getNumerologies);
  yield takeLatest(commonTypes.UPDATE_NUMEROLOGIES, updateNumerologies);
  yield takeLatest(commonTypes.HISTORY_NUMEROLOGIES, historyNumerologies);
  yield takeLatest(commonTypes.GET_DESTINY, getDestiny);
  yield takeLatest(
    commonTypes.GET_LIST_TEMPLATE_ZALO_OA,
    getListTempalteZaloOA,
  );
  yield takeLatest(commonTypes.SEND_MESSAGE_ZALO_OA, sendMessageZaloOA);
};
export default watcher();
