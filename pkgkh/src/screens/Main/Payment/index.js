import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Linking,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';

import {showMessage} from 'react-native-flash-message';
import {navigate} from '~navigator/navigationUtils';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Sizes, Colors, parseSize} from '~theme';
import {paymentActions, commonActions} from '~reduxCore/reducers';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';
import AlertModal from '~shared/components/Modals/AlertModal';

const querystring = require('querystring');

const dataPaymentMoMo = [
  {
    id: 1,
    title: 'Ví Momo',
    logo: require('~assets/images/momo.png'),
  },
  {
    id: 2,
    title: 'ATM',
    logo: require('~assets/images/atm.png'),
  },
  {
    id: 3,
    title: 'Visa',
    logo: require('~assets/images/visa.png'),
  },
];
const dataPaymentVnpay = [
  {
    id: 4,
    title: 'Ví Momo',
    logo: require('~assets/images/vnpay.png'),
  },
];

const Index = props => {
  const {t} = useTranslation();
  const {data} = props.route.params;

  const dispatch = useDispatch();
  const [idPayment, setIdPayment] = useState(0);
  const [requestType, setRequestType] = useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [contentAlert, setConentAlert] = useState('');

  const handleSelectPayment = id => {
    setIdPayment(id);
    id == 1
      ? setRequestType('captureWallet')
      : id == 2
      ? setRequestType('payWithATM')
      : id == 3
      ? setRequestType('payWithCC')
      : setRequestType('');
  };
  // xử lý click xác nhận thanh toán
  const handlePayment = () => {
    if (idPayment == 0) {
      showMessage({
        duration: 3000,
        message: t('notifyChoosePaymentMethod'),
        type: 'error',
      });
    } else {
      if (idPayment < 4) {
        createPaymentLinkMomo();
      } else {
        createPaymentLinkVnpay();
      }
    }
  };
  // Tạo đường link thanh toán momo
  const createPaymentLinkMomo = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        MaDoiTac: 'PKG_SHOP',
        orderId: data?.DonHang[0]?.MaDonHang,
        orderInfo: t('payByMomo'),
        amount:
          data?.DonHang[0]?.TongSoTien +
          data?.DonHang[0]?.VAT +
          data?.DonHang[0]?.PhiShip,
        requestType: requestType,
        extraData: '',
        storeId: 'PhucKhangGems',
        orderGroupId: '',
        autoCapture: true,
        lang: 'vi',
      },
      onSuccess: async url => {
        await dispatch(commonActions.toggleLoading(false));
        OpenURLButton(url);
      },
      onSuccessWeb:  async url => {
        await dispatch(commonActions.toggleLoading(false));
        Linking.openURL(url).catch(err =>
          console.error(t('dontOpenLink'), err),
        );
      },
      onError: async err => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(paymentActions.createPaymentLinkMomo(payload));
  };

  // Tạo đường link thanh toán vnpay
  const createPaymentLinkVnpay = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        MaDoiTac: 'PKG_SHOP',
        vnp_Amount:
          data?.DonHang[0]?.TongSoTien +
          data?.DonHang[0]?.VAT +
          data?.DonHang[0]?.PhiShip,
        vnp_CurrCode: 'VND',
        vnp_Locale: 'vn',
        vnp_OrderInfo: t('paymentBill'),
        vnp_OrderType: 'other',
        vnp_TxnRef: data?.DonHang[0]?.MaDonHang,
      },
      onSuccess: async url => {
        await dispatch(commonActions.toggleLoading(false));
        navigate('paymentVnpay', {url: url, data: data});
      },
      onError: async err => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: err,
          type: 'danger',
        });
      },
    };
    await dispatch(paymentActions.createPaymentLinkVnpay(payload));
  };
  //

  const OpenURLButton = async url => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.error(t('dontOpenLink'), err);
    }
  };
  // Xử lý quay về khi đã hoànt hành thanh toán
  useEffect(() => {
    const handleDeepLink = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleUrlEvent(initialUrl);
      }
    };
    handleDeepLink();

    const handleUrlEvent = url => {
      const params = querystring.parse(url.split('?')[1]);
      const resultCode = params.resultCode;

      if (resultCode === '9000' || resultCode === '0' || resultCode === '0') {
        setConentAlert(`${t('paymentSuccess')}${data?.DonHang[0]?.MaDonHang}`);
        setVisibleAlert(true);
      } else {
        setConentAlert(`${t('paymentFail')}${data?.DonHang[0]?.MaDonHang}`);
        setVisibleAlert(true);
      }
    };

    const handleUrlEventCallback = event => {
      handleUrlEvent(event.url);
    };

    Linking.addEventListener('url', handleUrlEventCallback);
  }, []);
  // back home page
  const handleContinue = () => {
    setVisibleAlert(false);
    navigate('store');
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('paymentBill')} />
      <View style={styles.wrapListPayment}>
        <View style={styles.wrapTitlePayment}>
          <Text style={styles.textTitlePayment}>
            {t('choosePaymentMethod')}
          </Text>
        </View>
        <View style={styles.listPayment}>
          <View style={styles.paymentGroup}>
            <Text style={styles.textPaymentGroup}>{t('payByMomo')}</Text>
            <View style={styles.wrapAllItem}>
              {dataPaymentMoMo.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={
                    item.id === idPayment
                      ? styles.wrap_item_select
                      : styles.wrap_item
                  }
                  onPress={() => handleSelectPayment(item?.id)}>
                  <View style={styles.wrap_icon_item}>
                    <Image style={styles.icon} source={item.logo} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.paymentGroup}>
            <Text style={styles.textPaymentGroup}>{t('payByVnpay')}</Text>
            <View style={styles.wrapAllItem}>
              {dataPaymentVnpay.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={
                    item.id === idPayment
                      ? styles.wrap_item_select
                      : styles.wrap_item
                  }
                  onPress={() => handleSelectPayment(item?.id)}>
                  <View style={styles.wrap_icon_item}>
                    <Image style={styles.icon} source={item.logo} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <ButtonWithText title={t('confirm')} onPress={() => handlePayment()} />
      </View>
      <AlertModal
        visible={visibleAlert}
        content={contentAlert}
        onConfirm={() => handleContinue()}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightWhite,
  },
  wrapListPayment: {
    marginHorizontal: Sizes.margin,
  },
  wrapTitlePayment: {
    marginHorizontal: Sizes.margin,
    borderBottomWidth: Sizes.border,
    borderBottomColor: Colors.border,
    paddingVertical: Sizes.padding,
  },
  textTitlePayment: {
    fontFamily: 'Hahmlet-Bold',
    fontSize: 14,
    color: Colors.darkGrey,
  },
  listPayment: {
    flexWrap: 'wrap', // Sử dụng flexWrap để tự động xuống hàng khi không đủ không gian
    marginHorizontal: Sizes.margin,
  },
  wrapAllItem: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Sử dụng flexWrap để tự động xuống hàng khi không đủ không gian
    marginHorizontal: Sizes.margin,
  },
  wrap_item: {
    marginRight: Sizes.margin,
    marginVertical: Sizes.margin,
    paddingVertical: Sizes.padding / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: parseSize(50),
    backgroundColor: Colors.white,
    borderRadius: Sizes.radius,
  },
  wrap_item_select: {
    marginRight: Sizes.margin,
    marginVertical: Sizes.margin,
    paddingVertical: Sizes.padding / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: parseSize(50),
    height: parseSize(40),
    backgroundColor: Colors.yellow,
    borderRadius: Sizes.radius,
    borderColor: Colors.red,
    borderWidth: Sizes.border,
    borderStyle: 'solid',
  },
  wrap_icon_item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: parseSize(30),
    width: parseSize(30),
  },
  txt_item: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    resizeMode: 'contain',
    height: parseSize(30),
    width: parseSize(30),
  },
  paymentGroup: {
    marginVertical: Sizes.margin,
    marginHorizontal: Sizes.margin,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: Colors.border,
    borderBottomWidth: Sizes.border,
  },
  textPaymentGroup: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
