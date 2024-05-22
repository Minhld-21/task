/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';
import {navigate} from '~navigator/navigationUtils';
import {useTranslation} from 'react-i18next';

import AlertModal from '~shared/components/Modals/AlertModal';

import VnpayMerchant, {VnpayMerchantModule} from 'react-native-vnpay-merchant';
const eventEmitter = new NativeEventEmitter(VnpayMerchantModule);

const Index = props => {
  const {t} = useTranslation();
  const {url, data} = props?.route?.params;

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [contentAlert, setConentAlert] = useState('');

  useEffect(() => {
    VnpayMerchant.show({
      isSandbox: true,
      scheme: 'phuckhangshop',
      title: 'Thanh toán VNPAY',
      titleColor: '#333333',
      beginColor: '#ffffff',
      endColor: '#ffffff',
      iconBackName: 'close',
      tmn_code: 'PKGSWT01',
      paymentUrl: url,
    });
  }, [url]);

  useEffect(() => {
    eventEmitter.addListener('PaymentBack', e => {
      console.log('Sdk back!');
      if (e) {
        console.log('e.resultCode = ' + e.resultCode);
        switch (e.resultCode) {
          case -1:
            navigation.goBack();
            break;

          case 99:
            setConentAlert(t('cancelPayVnpay'));
            setVisibleAlert(true);
            break;
          case 98:
            setConentAlert(`${t('paymentFail')}${data?.DonHang[0]?.MaDonHang}`);
            setVisibleAlert(true);
            break;
          case 97:
            setConentAlert(
              `${t('paymentSuccess')}${data?.DonHang[0]?.MaDonHang}`,
            );
            setVisibleAlert(true);
            break;

          default:
            navigation.goBack();
            break;
          //resultCode == -1
          //vi: Người dùng nhấn back từ sdk để quay lại
          //en: back from sdk (user press back in button title or button back in hardware android)

          //resultCode == 10
          //vi: Người dùng nhấn chọn thanh toán qua app thanh toán (Mobile Banking, Ví...) lúc này app tích hợp sẽ cần lưu lại cái PNR, khi nào người dùng mở lại app tích hợp thì sẽ gọi kiểm tra trạng thái thanh toán của PNR Đó xem đã thanh toán hay chưa.
          //en: user select app to payment (Mobile banking, wallet ...) you need save your PNR code. because we don't know when app banking payment successfully. so when user re-open your app. you need call api check your PNR code (is paid or unpaid). PNR: it's vnp_TxnRef. Reference code of transaction at Merchant system

          //resultCode == 99
          //vi: Người dùng nhấn back từ trang thanh toán thành công khi thanh toán qua thẻ khi gọi đến http://sdk.merchantbackapp
          //en: back from button (button: done, ...) in the webview when payment success. (incase payment with card, atm card, visa ...)

          //resultCode == 98
          //vi: giao dịch thanh toán bị failed
          //en: payment failed

          //resultCode == 97
          //vi: thanh toán thành công trên webview
          //en: payment success
        }

        // khi tắt sdk
        eventEmitter.removeAllListeners('PaymentBack');
      }
    });
  }, []);

  const handleContinue = () => {
    setVisibleAlert(false);
    navigate('store');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <AlertModal
          visible={visibleAlert}
          content={contentAlert}
          onConfirm={() => handleContinue()}
        />
      </SafeAreaView>
    </>
  );
};

export default Index;
