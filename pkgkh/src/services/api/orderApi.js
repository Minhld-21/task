import {Axios} from '../configApi';
import {POST, GET, PUT, DELETE} from '~shared/constants';
import urlApp from '~shared/constants';

export const setCart = payload => {
  console.log('Call api setCart');
  return Axios(POST, urlApp?.postUrl?.setCart, payload);
};
export const getProductById = payload => {
  console.log('Call api getProductById');
  return Axios(POST, urlApp?.postUrl?.getProductById, payload);
};