import {Axios} from '../configApi';
import {POST, GET, PUT, DELETE} from '~shared/constants';
import urlApp from '~shared/constants';

//AUTH API
export const userSignUp = payload => {
  return Axios(POST, '/v1/users/sign_up', payload);
};

export const userLogin = payload => {
  console.log('Call api get token');
  return Axios(POST, urlApp?.postUrl?.getInformationUser, payload);
};

export const userLogout = payload => {
  return Axios(DELETE, '/logout', payload);
};
export const registerUser = payload => {
  console.log('Call api registerUser');
  return Axios(POST, urlApp?.postUrl?.registerUser, payload);
};
export const changePassword = payload => {
  console.log('Call api changePassword');
  return Axios(POST, urlApp?.postUrl?.changePassword, payload);
};
export const checkAccount = payload => {
  console.log('Call api checkAccount');
  return Axios(POST, urlApp?.postUrl?.checkAccount, payload);
};
export const userDelete = payload => {
  return Axios(DELETE, '/deleteAccount', payload);
};
export const blockAccount = payload => {
  console.log('Call api blockAccount');
  return Axios(POST, urlApp?.postUrl?.blockAccount, payload);
};
