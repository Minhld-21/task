import {Axios} from '../configApi';
import {POST, GET, PUT, DELETE} from '~shared/constants';
import urlApp from '~shared/constants';

export const checkQR = payload => {
  console.log('Call api checkQR');
  return Axios(POST, urlApp?.postUrl?.checkQR, payload);
};

export const confirmCheck = payload => {
  console.log('Call api CheckInCheckOut');
  return Axios(POST, urlApp?.postUrl?.confirmCheck, payload);
};

export const getTimeSheet = payload => {
  console.log('Call api getTimeSheet');
  return Axios(POST, urlApp?.postUrl?.getTimeSheet, payload);
};

export const getDSDiaDiemCheck = payload => {
  console.log('Call api getDSDiaDiemCheck');
  return Axios(POST, urlApp?.postUrl?.getDSDiaDiemCheck, payload);
};

export const quanlydiadiemcheck = payload => {
  console.log('Call api quanlydiadiemcheck');
  return Axios(POST, urlApp?.postUrl?.quanlydiadiemcheck, payload);
};
