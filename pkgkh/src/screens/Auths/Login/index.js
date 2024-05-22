import React, {useRef, useState, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {navigate} from '~navigator/navigationUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';

import styles from './styles';
import {Colors} from '~theme';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';
import InputWithIcon from '~shared/components/inputs/InputWithIcon';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';

import {
  userActions,
  userSelectors,
  orderActions,
  orderSelectors,
  commonActions,
} from '~reduxCore/reducers';
import LogoLogin from '~assets/images/logoLogin.png';
import {getFcmToken, subscribeToTopic} from '~helper/notifyFCM';

export default Index = props => {
  const {t} = useTranslation();
  //useDisPatch
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  // get data carts
  const dataCarts = useSelector(state => orderSelectors.getCart(state));
  // useState
  const [userName, setValueUserName] = useState('');
  const [passWord, setValuePassWord] = useState('');
  //get global state
  const user = useSelector(state => userSelectors.getUserData(state));
  useEffect(() => {
    if (user?.nguoidung?.TaiKhoan !== '' && user !== null) {
      navigate('profile');
    } else {
      setValueUserName('');
      setValuePassWord('');
    }
  }, [user]);

  const handleChangeTextUser = value => {
    setValueUserName(value);
  };
  const handleChangeTextPass = value => {
    setValuePassWord(value);
  };
  // handle click button Login
  const gotoSignIn = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const token = await getFcmToken();
    subscribeToTopic('phuckhangshop');
    const payload = {
      params: {
        taikhoan: userName,
        matkhau: passWord,
        token: token,
        chude: 'phuckhangshop',
      },
      onSuccess: async () => {
        dataCarts.map(item => {
          const data = {idsanpham: item?.IDSanPham, soluong: item?.SoLuong};
          handleSyncCart(data);
        });
        await dispatch(commonActions.toggleLoading(false));
        await dispatch(userActions.toggleModalLogin(true));
        await navigate('profile');
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(userActions.userLogin(payload));
  };

  const handleSyncCart = async data => {
    const payload = {
      params: {
        type: 'SYNC_CART',
        idnguoidung: 0,
        idsanpham: data?.idsanpham,
        soluong: data?.soluong,
      },
      onSuccess: async () => {},
      onError: async () => {},
    };
    dispatch(orderActions.setCart(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle
        nameHeaderTitle={t('login')}
        onPressBack={() => dispatch(userActions.toggleModalLogin(true))}
      />
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              resizeMode={'contain'}
              style={styles.headerLogin_logo}
              source={LogoLogin}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.wrapFormLogin}>
              <View style={styles.formLogin}>
                <Text style={styles.textVersion}>
                  Version: {Config.VERSION}
                </Text>
                <InputWithIcon
                  value={userName}
                  type={'text'}
                  placeholder={t('account')}
                  nameLeftIcon={'account'}
                  colorLeftIcon={Colors.darkGrey}
                  onChangeText={handleChangeTextUser}
                  returnKeyType={'next'}
                  onBlur={() =>
                    passwordRef.current && passwordRef.current.focus()
                  }
                />
                <InputWithIcon
                  refInput={passwordRef}
                  value={passWord}
                  type={'password'}
                  placeholder={t('password')}
                  nameLeftIcon={'lock'}
                  colorLeftIcon={Colors.darkGrey}
                  colorRightIcon={Colors.darkGrey}
                  nameRightIcon={'eye'}
                  onChangeText={handleChangeTextPass}
                  returnKeyType={'done'}
                  onSubmitEditing={gotoSignIn}
                />
                <TouchableOpacity
                  style={styles.wrapFogetPass}
                  onPress={() => navigate('forgetPass')}>
                  <Text style={styles.textForgetPass}>{t('forgetPass')}</Text>
                </TouchableOpacity>
                <ButtonWithText
                  styleButton={styles.buttonLogin}
                  title={t('login')}
                  onPress={gotoSignIn}
                />
                <ButtonWithText
                  styleButton={styles.buttonReister}
                  title={t('register')}
                  onPress={() => navigate('regis')}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
