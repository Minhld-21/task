import {createAction, handleActions} from 'redux-actions';

export const types = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  GET_LIST_STORE: 'GET_LIST_STORE',
  GET_LIST_USER: 'GET_LIST_USER',
  PUSH_NOTIFY: 'PUSH_NOTIFY',
  GET_LIST_PRODUCT: 'GET_LIST_PRODUCT',
  GET_DETAIL_PRODUCT: 'GET_DETAIL_PRODUCT',
  GET_NATIO: 'GET_NATIO',
  GET_LIST_CITY: 'GET_LIST_CITY',
  GET_LIST_ZIPCODE: 'GET_LIST_ZIPCODE',
  GET_TRANSPORTER: 'GET_TRANSPORTER',
  CHECK_DISCOUNT_CODE: 'CHECK_DISCOUNT_CODE',
  GET_FEE_SHIP: 'GET_FEE_SHIP',
  CREATE_ORDER: 'CREATE_ORDER',
  GET_LIST_ORDER: 'GET_LIST_ORDER',
  FIND_ORDER: 'FIND_ORDER',
  GET_DETAIL_ORDER: 'GET_DETAIL_ORDER',
  SEND_MAIL_BOOKING: 'SEND_MAIL_BOOKING',
  GET_PAYMENT_METHOD: 'GET_PAYMENT_METHOD',
  GET_RECEIVING_METHOD: 'GET_RECEIVING_METHOD',
  HANDLE_LIKE: 'HANDLE_LIKE', // Gọi api xử lý like hoặc dislike
  SET_LIKE: 'SET_LIKE',
  UPDATE_LIKE: 'UPDATE_LIKE',
  VIEW_NUMEROLOGIES: 'VIEW_NUMEROLOGIES',
  GET_NUMEROLOGIES: 'GET_NUMEROLOGIES',
  UPDATE_NUMEROLOGIES: 'UPDATE_NUMEROLOGIES',
  HISTORY_NUMEROLOGIES: 'HISTORY_NUMEROLOGIES',
  GET_DESTINY: 'GET_DESTINY',

  SET_LIST_STORE: 'SET_LIST_STORE',
  SET_LIST_PRODUCT: 'SET_LIST_PRODUCT',
  SET_LIST_CUSTOMER: 'SET_LIST_CUSTOMER',
  SET_LIST_CITY: 'SET_LIST_CITY',
  SET_LIST_ZIPCODE: 'SET_LIST_ZIPCODE',
  SET_TRANSPORTER: 'SET_TRANSPORTER',
  SET_ROUTE: 'SET_ROUTE',
  GET_ROUTE: 'GET_ROUTE',
  GET_LIST_TEMPLATE_ZALO_OA: 'GET_LIST_TEMPLATE_ZALO_OA',
  SEND_MESSAGE_ZALO_OA: 'SEND_MESSAGE_ZALO_OA',
};

export const actions = {
  toggleLoading: createAction(types.TOGGLE_LOADING),
  getListStore: createAction(types.GET_LIST_STORE),
  getListUser: createAction(types.GET_LIST_USER),
  pushNotify: createAction(types.PUSH_NOTIFY),
  getListProduct: createAction(types.GET_LIST_PRODUCT),
  getDetailProduct: createAction(types.GET_DETAIL_PRODUCT),
  getNatio: createAction(types.GET_NATIO),
  getListCity: createAction(types.GET_LIST_CITY),
  getListZipCode: createAction(types.GET_LIST_ZIPCODE),
  getTransporter: createAction(types.GET_TRANSPORTER),
  checkDiscountCode: createAction(types.CHECK_DISCOUNT_CODE),
  getFeeShip: createAction(types.GET_FEE_SHIP),
  createOrder: createAction(types.CREATE_ORDER),
  findOrder: createAction(types.FIND_ORDER),
  getListOrder: createAction(types.GET_LIST_ORDER),
  getDetailOrder: createAction(types.GET_DETAIL_ORDER),
  sendMailBooking: createAction(types.SEND_MAIL_BOOKING),
  getPaymentMethod: createAction(types.GET_PAYMENT_METHOD),
  getReceivingMethod: createAction(types.GET_RECEIVING_METHOD),

  setListProduct: createAction(types.SET_LIST_PRODUCT),
  setListCustomer: createAction(types.SET_LIST_CUSTOMER),
  setListCity: createAction(types.SET_LIST_CITY),
  setListZipCode: createAction(types.SET_LIST_ZIPCODE),
  setTransporter: createAction(types.SET_TRANSPORTER),
  handleLike: createAction(types.HANDLE_LIKE),
  setLike: createAction(types.SET_LIKE),
  updateLike: createAction(types.UPDATE_LIKE),

  viewNumerologies: createAction(types.VIEW_NUMEROLOGIES),
  getNumerologies: createAction(types.GET_NUMEROLOGIES),
  updateNumerologies: createAction(types.UPDATE_NUMEROLOGIES),
  historyNumerologies: createAction(types.HISTORY_NUMEROLOGIES),
  getDestiny: createAction(types.GET_DESTINY),
  setRoute: createAction(types.SET_ROUTE),
  getRoute: createAction(types.GET_ROUTE),
  getListTempalteZaloOA: createAction(types.GET_LIST_TEMPLATE_ZALO_OA),
  sendMessageZaloOA: createAction(types.SEND_MESSAGE_ZALO_OA),
};
export const selectors = {
  getLoading: state => state.common.isLoading,
  setListProduct: state => state.common.dataProduct,
  getLike: state => state.common.likes,
  getRoute: state => state.common.route,
};
const defaultState = {
  route: 'HomeStack',
  isLoading: false,
  dataProduct: null,
  likes: [],
};
export default handleActions(
  {
    [types.SET_ROUTE]: (state, {payload}) => {
      return {...state, route: payload};
    },
    [types.TOGGLE_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.SET_LIST_PRODUCT]: (state, {payload}) => {
      if (payload.reset == true) {
        return {...state, dataProduct: null};
      } else {
        if (state.dataProduct) {
          // Nếu dataProduct đã có dữ liệu, thêm dữ liệu mới vào mảng hiện có
          const newDataProduct = [...state.dataProduct, ...payload];
          return {...state, dataProduct: newDataProduct};
        } else {
          // Nếu dataProduct chưa có dữ liệu, gán dữ liệu mới
          return {...state, dataProduct: payload};
        }
      }
    },
    // xử lý like sản phẩm
    [types.SET_LIKE]: (state, {payload}) => {
      return {
        ...state,
        likes: payload,
      };
    },

    [types.UPDATE_LIKE]: (state, {payload}) => {
      const {idsanpham, islike} = payload;
      const existingLikeIndex = state.likes.findIndex(
        like => like.IDSanPham === idsanpham,
      );

      if (islike) {
        // Nếu `islike` là `true`, thêm `newLike`
        if (existingLikeIndex === -1) {
          const newLike = {IDSanPham: idsanpham};
          return {
            ...state,
            likes: [...state.likes, newLike],
            dataProduct: state.dataProduct.map(product =>
              product.IDSanPham === idsanpham
                ? {...product, SoLuongYeuThich: product.SoLuongYeuThich + 1}
                : product,
            ),
          };
        }
      } else {
        // Nếu `islike` là `false`, xóa `idsanpham` nếu tồn tại
        if (existingLikeIndex !== -1) {
          const updatedLikes = state.likes.filter(
            like => like.IDSanPham !== idsanpham,
          );
          return {
            ...state,
            likes: updatedLikes,
            dataProduct: state.dataProduct.map(product =>
              product.IDSanPham === idsanpham
                ? {...product, SoLuongYeuThich: product.SoLuongYeuThich - 1}
                : product,
            ),
          };
        }
      }
      // Nếu không có thay đổi, trả về state hiện tại
      return state;
    },
  },
  defaultState,
);
