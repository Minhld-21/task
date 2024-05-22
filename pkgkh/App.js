/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/reduxCore/store';

import './src/helper/i18n';
import {registerListenerWithFCM} from '~helper/notifyFCM';
import Index from '~root';
import LoadingScreen from '~shared/components/Modals/LoadingScreen';

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Các cuộc gọi API sẽ ở đây
        await new Promise(resolve => setTimeout(resolve, 3000)); // Chờ 3 giây
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    };
    prepare();
  }, []);
  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Index />
        <LoadingScreen />
      </PersistGate>
    </Provider>
  );
};
export default App;
