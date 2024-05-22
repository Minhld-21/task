import {createAction, handleActions} from 'redux-actions';

export const types = {
  ADD_TO_CART: 'ADD_TO_CART', // Thêm sản phẩm vào giỏ
  REMOVE_FROM_CART: 'REMOVE_FROM_CART', //  xóa sản phẩm trong giỏ
  INCREASE_NUMBER_OF_PRODUCT: 'INCREASE_NUMBER_OF_PRODUCT', // tăng số lượng cho sản phẩm
  DESCREASE_NUMBER_OF_PRODUCT: 'DESCREASE_NUMBER_OF_PRODUCT', // giảm số lượng cho sản phẩm
  SET_CART: 'SET_CART', // up dữ liệt cart lên api  khi đã đăng nhập và set cart local
  SYNC_CART: 'SYNC_CART', // đồng bộ lại dữ liệu cart khi login
  CLEAN_CART: 'CLEAN_CART', // Xóa hết sản phẩm khi đã thanh toán
  GET_PRODUCT_BY_ID: 'GET_PRODUCT_BY_ID',
};

export const actions = {
  addToCart: createAction(types.ADD_TO_CART),
  removeFromCart: createAction(types.REMOVE_FROM_CART),
  increaseNumberOfProduct: createAction(types.INCREASE_NUMBER_OF_PRODUCT),
  descreaseNumberOfProduct: createAction(types.DESCREASE_NUMBER_OF_PRODUCT),
  setCart: createAction(types.SET_CART),
  syncCart: createAction(types.SYNC_CART),
  cleanCart: createAction(types.CLEAN_CART),
  getProductById: createAction(types.GET_PRODUCT_BY_ID),
};
export const selectors = {
  getCart: state => state.order.carts.sort((a, b) => a.IDSanPham - b.IDSanPham),
};
const defaultState = {
  carts: [],
};
export default handleActions(
  {
    [types.CLEAN_CART]: (state, {payload}) => {
      return {
        ...state,
        carts: [],
      };
    },
    // xử lý giỏ hàng
    [types.SYNC_CART]: (state, {payload}) => {
      if (payload.length > 0) {
        const updatedCarts = state.carts.map(cartItem => {
          const matchingItem = payload.find(
            item => item?.IDSanPham === cartItem.IDSanPham,
          );
          if (matchingItem) {
            // Nếu tìm thấy item trùng, cập nhật số lượng
            return {
              ...cartItem,
              SoLuong: cartItem.SoLuong + matchingItem.SoLuong,
            };
          }
          return cartItem;
        });

        // Thêm các sản phẩm từ payload mà không trùng với giỏ hàng
        payload.forEach(item => {
          const existsInCart = updatedCarts.some(
            cartItem => cartItem.IDSanPham === item?.IDSanPham,
          );
          if (!existsInCart) {
            updatedCarts.push(item);
          }
        });

        return {...state, carts: updatedCarts};
      } else {
        return state;
      }
    },

    [types.ADD_TO_CART]: (state, {payload}) => {
      return {
        ...state,
        carts: [
          ...state.carts,
          {IDSanPham: payload?.idsanpham, SoLuong: payload?.soluong},
        ],
      };
    },
    [types.REMOVE_FROM_CART]: (state, {payload}) => {
      const cartsWithoutItemToRemove = state.carts.filter(
        item => item.IDSanPham !== payload?.idsanpham,
      );

      return {...state, carts: cartsWithoutItemToRemove};
    },
    [types.INCREASE_NUMBER_OF_PRODUCT]: (state, {payload}) => {
      const {idsanpham, soluong} = payload;
      const updatedCarts = state.carts.map(item => {
        if (item.IDSanPham === idsanpham) {
          return {...item, SoLuong: (item.SoLuong || 0) + soluong};
        }
        return item;
      });
      return {...state, carts: updatedCarts};
    },
    [types.DESCREASE_NUMBER_OF_PRODUCT]: (state, {payload}) => {
      const {idsanpham, soluong} = payload;
      const updatedCarts = state.carts.map(item => {
        if (item.IDSanPham === idsanpham) {
          return {...item, SoLuong: (item.SoLuong || 0) - soluong};
        }
        return item;
      });
      return {...state, carts: updatedCarts};
    },
  },
  defaultState,
);
