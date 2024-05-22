import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {CommonActions} from '@react-navigation/native';
import i18n from 'i18next';
//import auth from '@react-native-firebase/auth';

import {
  TIME_OUT,
  SUCCESS,
  SUCCESS_POST,
  NO_CONTENT,
  NOT_FOUND,
  INVALID_DATA,
  UNAUTHORIZED,
} from '~shared/constants';
import * as utils from '~helper/utils';
import {
  accountActions,
  commonActions,
  configActions,
} from '~reduxCore/reducers';
import LocalDB from '~data/asyncStorage';
import {store} from '~reduxCore/store';
import Navigation from '~navigator';

const apiPath = '';
let config = {
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Request-Method': '*',
    'Access-Control-Request-Headers': '*',
  },
  timeout: TIME_OUT,
};

export const Axios = async (method, path, params) => {
  console.log('Call api Axios');
  const config = {timeout: TIME_OUT};
  let getQuery = (await (method === 'get'))
    ? '?' + utils.objectToQueryString(params)
    : '';
  console.log('[API Axios] : ' + method + ': ' + apiPath + path);
  config.method = method;
  config.url = apiPath + path + getQuery;
  if (method === 'post') {
    config.data = await params;
  } else {
    await delete config.data;
  }
  const authToken = store.getState().user.Token;
  if (authToken) {
    config.headers = await {
      ...config.headers,
      Authorization: authToken ? `${authToken}` : null,
    };
  } else {
    config.headers = await {
      ...config.headers,
      Cookie: null,
    };
    delete config.headers['Authorization'];
  }

  return await axios(config)
    .then(res => {
      console.log(`Result api ${path} ::: `, res);
      const status = res?.status;
      const dataResult = res?.data;
      const codeStatus = res?.data?.IsSuccess;
      const errorMessage = res?.data?.ErrorMessage;
      // data badge number for notification api
      const badge = res?.data?.total_read || 0;

      //SUCCESS PUT/GET/DELETE 200
      if (status == SUCCESS) {
        return Promise.resolve({
          success: true,
          error: null,
          data: dataResult,
          badge,
        });
      }
      //SUCCESS POST 201
      else if (status === SUCCESS_POST) {
        return Promise.resolve({
          success: true,
          error: errorMessage || i18n.t(`errMsg`),
          data: dataResult,
        });
      }
      //ERROR 202
      else if (status === INVALID_DATA) {
        return Promise.resolve({
          success: false,
          error: errorMessage || i18n.t(`errMsg`),
          data: null,
        });
      }
      //ERROR NO CONTENT 204
      else if (status === NO_CONTENT) {
        return Promise.resolve({
          success: false,
          error: errorMessage || i18n.t(`errMsg`),
          data: null,
        });
      }
      //ERROR NOT FOUND 404
      else if (status === NOT_FOUND) {
        return Promise.resolve({
          success: false,
          error: errorMessage || i18n.t(`errMsg`),
          data: null,
        });
      }
      // OTHER
      else {
        return Promise.resolve({
          success: false,
          error: errorMessage || i18n.t(`errMsg`),
          data: null,
        });
      }
    })
    .catch(error => {
      console.log(`===================Error api : ${path}====================`);
      console.log(error);
      console.log('===================END====================');

      let dataError = error?.response;
      const status = dataError?.status;
      //ERROR UNAUTHORIZED 401
      if (status === UNAUTHORIZED) {
        return failAuthorization();
      } else {
        return Promise.resolve({
          success: false,
          error: error?.message || i18n.t(`errMsg`),
        });
      }
    });
};

const onResetRoute = async () => {
  Navigation?.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'Home'}],
    }),
  );
};

const failAuthorization = async () => {
  await LocalDB.logOut();
  await store.dispatch(accountActions.setProfileEmpty());
  await store.dispatch(configActions.setBadgeCount(null));
  await store.dispatch(commonActions.setSkipLogin(false));
  await auth()
    .signOut()
    .then(async data => {
      console.log('Logout Firebase auth success: ', {data});
    })
    .catch(error => {
      console.log('Logout Firebase auth failed: ', {error});
    });
  await onResetRoute();

  //token hết hạn => force logOut
  showMessage({
    duration: 3000,
    message: i18n.t(`sessionExpired`),
    type: 'danger',
  });
};
