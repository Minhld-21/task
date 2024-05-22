import React, {useState} from 'react';
import {} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {navigate} from '~navigator/navigationUtils';

import HeaderBar from '~components/HeaderBar';
import {Colors, Sizes, parseSize, Width, Height} from '~theme';
import { userActions, userSelectors} from '~reduxCore/reducers';
import {TouchableOpacity} from 'react-native';
import HistoryNumero from '~assets/images/history_Numero.jpeg';
import ConsultNumero from '~assets/images/consult_Numero.jpeg';
import AlertModal from '~shared/components/Modals/AlertModal';


export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [visbleAlertModal, setVisibleAlertModal] = useState(false);
  const [alert, setAlert] = useState('');
  const user = useSelector(state => userSelectors.getUserData(state));
  useFocusEffect(
    React.useCallback(() => {
      if (user === null) {
        showMessage({
          duration: 3000,
          message: 'Chức năng này cần đăng nhập trước khi sử dụng',
          type: 'error',
        });
        dispatch(userActions.toggleModalLogin(false));
      } else {
        dispatch(userActions.toggleModalLogin(true));
        checkRoleNumerologies(user?.TaiKhoan);
      }
    }, [navigate, user]),
  );

  // Kiểm tra tài khoản có tồn tại không
  const checkRoleNumerologies = async userName => {
    const payload = await {
      params: {
        loai: 3,
        taikhoan: userName,
      },
      onSuccess: () => {
        setVisibleAlertModal(false);
      },
      onError: message => {
        setAlert(message);
        setVisibleAlertModal(true);
      },
    };
    await dispatch(userActions.checkAccount(payload));
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.wrapFuture}
          onPress={() => navigate('consultfengshui')}>
          <ImageBackground
            resizeMode={'stretch'}
            style={styles.logoNumero}
            source={ConsultNumero}>
            <View style={styles.wrapTitle}>
              <Text style={styles.textTitle}>Khám phá ngay </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrapFuture}
          onPress={() => navigate('historyfengshui')}>
          <ImageBackground
            resizeMode={'stretch'}
            style={styles.logoNumero}
            source={HistoryNumero}>
            <View style={styles.wrapTitle}>
              <Text style={styles.textTitle}>Xem lại lịch sử</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <AlertModal
        visible={visbleAlertModal}
        title={t('alert')}
        content={alert}
        onConfirm={()=>navigate('HomeStack')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingBottom: parseSize(-30),
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.padding,
    marginVertical: Sizes.margin,
  },
  wrapFuture: {
    marginVertical: Sizes.margin / 2,
    marginHorizontal: Sizes.margin / 2,
    borderRadius: Sizes.radius * 2,
  },
  wrapTitle: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textTitle: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.white,
    marginLeft: Sizes.margin * 2,
  },
  iconNext: {
    position: 'absolute',
    right: 10,
    fontSize: 24,
    color: Colors.dark,
  },
  logoNumero: {
    height: Height / 5,
    width: Width - 20,
    borderRadius: Sizes.radius * 2,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});
