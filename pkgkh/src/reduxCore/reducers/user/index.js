import {createAction, handleActions} from 'redux-actions';

export const types = {
  //AUTH
  USER_LOGIN: 'USER_LOGIN',
  TOGGLE_MODAL_LOGIGN: 'TOGGLE_MODAL_LOGIGN',
  REGISTER_USER: 'REGISTER_USER',
  CHECK_ACCOUNT: 'CHECK_ACCOUNT',
  BLOCK_ACCOUNT: 'BLOCK_ACCOUNT',
  SET_USER_DATA: 'SET_USER_DATA',
  GET_USER_DATA: 'GET_USER_DATA',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',

  FORGET_PASSWORD: 'FORGET_PASSWORD',
  OTP_VERIFY: 'OTP_VERIFY',
  RESET_PASSWORD: 'RESET_PASSWORD',

  REFRESH_TOKEN: 'REFRESH_TOKEN',

  USER_LOGOUT: 'USER_LOGOUT',
  SET_EMPTY_PROFILE: 'SET_EMPTY_PROFILE',

  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
};

export const actions = {
  //AUTH
  userLogin: createAction(types.USER_LOGIN),
  setUserData: createAction(types.SET_USER_DATA),
  getUserData: createAction(types.GET_USER_DATA),

  registerUser: createAction(types.REGISTER_USER),
  changePassword: createAction(types.CHANGE_PASSWORD),
  checkAccount: createAction(types.CHECK_ACCOUNT),
  blockAccount: createAction(types.BLOCK_ACCOUNT),
  forgetPassword: createAction(types.FORGET_PASSWORD),
  otpVerify: createAction(types.OTP_VERIFY),
  resetPassword: createAction(types.RESET_PASSWORD),

  refreshToken: createAction(types.REFRESH_TOKEN),

  userLogout: createAction(types.USER_LOGOUT),
  setEmptyProfile: createAction(types.SET_EMPTY_PROFILE),
  userLogoutSuccess: createAction(types.USER_LOGOUT_SUCCESS),
  toggleModalLogin: createAction(types.TOGGLE_MODAL_LOGIGN),
};

export const selectors = {
  getUserData: state => state.user.userInfo,
  getVisibleLogin: state => state.user.visibleLogin,
};

const defaultState = {
  visibleLogin: true,
  userInfo: null,
  isLogin: false,
};

export default handleActions(
  {
    [types.SET_USER_DATA]: (state, {payload}) => {
      return {...state, userInfo: payload, isLogin: true};
    },
    [types.SET_EMPTY_PROFILE]: () => {
      return {userInfo: null, isLogin: false};
    },
    [types.TOGGLE_MODAL_LOGIGN]: (state, {payload}) => {
      return {...state, visibleLogin: payload};
    },
  },
  defaultState,
);
