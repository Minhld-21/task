import {Axios} from '../configApi';
import {POST, GET, PUT, DELETE} from '~shared/constants';
import Config from 'react-native-config';

const host_api_payment = Config.API_URL_PAYMENT;

export const createPaymentLinkMomo = payload => {
  console.log('Call api get token');
  return Axios(
    POST,
    `${host_api_payment}/api/ThanhToanMoMo/TaoLinkThanhToan`,
    payload,
  );
};

export const createPaymentLinkVnpay = payload => {
  console.log('Call api get token');
  return Axios(
    POST,
    `${host_api_payment}/api/ThanhToanVnpay/TaoLinkThanhToan`,
    payload,
  );
};
