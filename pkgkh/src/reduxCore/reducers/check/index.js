import {createAction, handleActions} from 'redux-actions';

export const types = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  CHECK_DISTANCE_SUCCESS: 'CHECK_DISTANCE_SUCCESS',
  CHECK_DISTANCE_FAILURE: 'CHECK_DISTANCE_FAILURE',
  CONFIRM_CHECK_DISTANCE: 'CONFIRM_CHECK_DISTANCE',
  CONFIRM_CHECK_DISTANCE_FAILURE: 'CONFIRM_CHECK_DISTANCE_FAILURE',
  GET_TIME_SHEET: 'GET_TIME_SHEET',
  GET_DIA_DIEM_CHECK_SUCCESS: 'GET_DIA_DIEM_CHECK_SUCCESS',
  GET_DIA_DIEM_CHECK_FAILURE: 'GET_DIA_DIEM_CHECK_FAILURE',
  QUAN_LY_DIEM_CHECK_SUCCESS: 'QUAN_LY_DIEM_CHECK_SUCCESS',
  QUAN_LY_DIEM_CHECK_FAILURE: 'QUAN_LY_DIEM_CHECK_FAILURE',
};

export const actions = {
  toggleLoading: createAction(types.TOGGLE_LOADING),
  checkDistance: createAction(types.CHECK_DISTANCE_SUCCESS),
  checkDistanceFailure: createAction(types.CHECK_DISTANCE_FAILURE),
  confirmCheck: createAction(types.CONFIRM_CHECK_DISTANCE),
  confirmCheckFailure: createAction(types.CONFIRM_CHECK_DISTANCE_FAILURE),
  getTimeSheet: createAction(types.GET_TIME_SHEET),
  getDiemCheck: createAction(types.GET_DIA_DIEM_CHECK_SUCCESS),
  getDiemCheckFailure: createAction(types.GET_DIA_DIEM_CHECK_FAILURE),
  quanlydiemcheck: createAction(types.QUAN_LY_DIEM_CHECK_SUCCESS),
  quanlydiadiemcheckFailure: createAction(types.QUAN_LY_DIEM_CHECK_FAILURE),
};

const defaultState = {
  distance: null,
  loading: true,
  error: null,
};

export default handleActions(
  {
    [types.TOGGLE_LOADING]: state => {
      return {...state, loading: true, error: null};
    },
    [types.CHECK_DISTANCE_SUCCESS]: (state, {payload}) => {
      return {...state, distance: payload, loading: false};
    },
    [types.CHECK_DISTANCE_FAILURE]: (state, {payload}) => {
      return {...state, error: payload, loading: false};
    },
    [types.CONFIRM_CHECK_DISTANCE]: (state, {payload}) => {
      return {...state, distance: payload, loading: false};
    },
    [types.CONFIRM_CHECK_DISTANCE_FAILURE]: (state, {payload}) => {
      return {...state, error: payload, loading: false};
    },
    [types.GET_DIA_DIEM_CHECK_SUCCESS]: (state, {payload}) => {
      return {...state, distance: payload, loading: false};
    },
    [types.GET_DIA_DIEM_CHECK_FAILURE]: (state, {payload}) => {
      return {...state, error: payload, loading: false};
    },
    [types.QUAN_LY_DIEM_CHECK_SUCCESS]: (state, {payload}) => {
      return {...state, distance: payload, loading: false};
    },
    [types.QUAN_LY_DIEM_CHECK_FAILURE]: (state, {payload}) => {
      return {...state, error: payload, loading: false};
    },
  },
  defaultState,
);
