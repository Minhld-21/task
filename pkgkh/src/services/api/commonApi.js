import {Axios} from '../configApi';
import {POST, GET, PUT, DELETE} from '~shared/constants';
import urlApp from '~shared/constants';

export const getListStore = payload => {
  console.log('Call api getListStore');
  return Axios(POST, urlApp?.postUrl?.getListStore, payload);
};
export const getListProduct = payload => {
  console.log('Call api getListProduct');
  return Axios(POST, urlApp?.postUrl?.getListProduct, payload);
};
export const getDetailProduct = payload => {
  console.log('Call api getDetailProduct');
  return Axios(POST, urlApp?.postUrl?.getDetailProduct, payload);
};
export const getNatio = payload => {
  console.log('Call api getNatio');
  return Axios(POST, urlApp?.postUrl?.getNatio, payload);
};
export const getListCity = payload => {
  console.log('Call api getListCity');
  return Axios(POST, urlApp?.postUrl?.getListCity, payload);
};
export const getListZipCode = payload => {
  console.log('Call api getListZipCode');
  return Axios(POST, urlApp?.postUrl?.getListZipCode, payload);
};
export const getTransporter = payload => {
  console.log('Call api getTransporter');
  return Axios(POST, urlApp?.postUrl?.getTransporter, payload);
};
export const checkDiscountCode = payload => {
  console.log('Call api checkDiscountCode');
  return Axios(POST, urlApp?.postUrl?.checkDiscountCode, payload);
};
export const getFeeShip = payload => {
  console.log('Call api getFeeShip');
  return Axios(POST, urlApp?.postUrl?.getFeeShip, payload);
};
export const createOrder = payload => {
  console.log('Call api checkDiscountCode');
  return Axios(POST, urlApp?.postUrl?.createOrder, payload);
};
export const getListOrder = payload => {
  console.log('Call api getListOrder');
  return Axios(POST, urlApp?.postUrl?.getListOrder, payload);
};
export const getDetailOrder = payload => {
  console.log('Call api getDetailOrder');
  return Axios(POST, urlApp?.postUrl?.getDetailOrder, payload);
};
export const sendMailBooking = payload => {
  console.log('Call api sendMailBooking');
  return Axios(POST, urlApp?.postUrl?.sendMailBooking, payload);
};
export const getPaymentMethod = payload => {
  console.log('Call api getPaymentMethod');
  return Axios(POST, urlApp?.postUrl?.getPaymentMethod, payload);
};
export const getReceivingMethod = payload => {
  console.log('Call api getReceivingMethod');
  return Axios(POST, urlApp?.postUrl?.getReceivingMethod, payload);
};
export const findOrder = payload => {
  console.log('Call api findOrder');
  return Axios(POST, urlApp?.postUrl?.findOrder, payload);
};
export const getListUser = payload => {
  console.log('Call api getListUser');
  return Axios(POST, urlApp?.postUrl?.getListUser, payload);
};
export const pushNotify = payload => {
  console.log('Call api pushNotify');
  return Axios(POST, urlApp?.postUrl?.pushNotify, payload);
};
export const handleLike = payload => {
  console.log('Call api handleLike');
  return Axios(POST, urlApp?.postUrl?.handleLike, payload);
};
export const viewNumerologies = payload => {
  console.log('Call api viewNumerologies');
  return Axios(POST, urlApp?.postUrl?.viewNumerologies, payload);
};
export const getNumerologies = payload => {
  console.log('Call api getNumerologies');
  return Axios(POST, urlApp?.postUrl?.getNumerologies, payload);
};

export const getDestiny = payload => {
  console.log('Call api getDestiny');
  return Axios(POST, urlApp?.postUrl?.getDestiny, payload);
};
export const updateNumerologies = payload => {
  console.log('Call api updateNumerologies');
  return Axios(POST, urlApp?.postUrl?.updateNumerologies, payload);
};
export const historyNumerologies = payload => {
  console.log('Call api historyNumerologies');
  return Axios(POST, urlApp?.postUrl?.historyNumerologies, payload);
};
export const getListTempalteZaloOA = payload => {
  console.log('Call api getListTempalteZaloOA');
  return Axios(POST, urlApp?.postUrl?.getListTempalteZaloOA, payload);
};
export const sendMessageZaloOA = payload => {
  console.log('Call api sendMessageZaloOA');
  return Axios(POST, urlApp?.postUrl?.sendMessageZaloOA, payload);
};