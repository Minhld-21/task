import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView, StyleSheet} from 'react-native';
import {navigate} from '~navigator/navigationUtils';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, parseSize} from '~theme';
import {userActions, commonActions} from '~reduxCore/reducers';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';
import InputLabelValueText from '~shared/components/inputs/InputLabelValueText';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';

const Index = props => {
  const {user} = props.route.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [matkhau, setMatKhau] = useState('');
  const [matkhau2, setMatKhau2] = useState('');

  const checkPass = () => {
    if (matkhau !== matkhau2) {
      showMessage({
        duration: 3000,
        message: t('wrongRePassword'),
        type: 'danger',
      });
    }
  };

  const CheckInput = () => {
    if (matkhau === '') {
      showMessage({
        duration: 3000,
        message: t('missingPassword'),
        type: 'error',
      });
    } else if (matkhau2 === '') {
      showMessage({
        duration: 3000,
        message: t('missingRePassword'),
        type: 'error',
      });
    } else if (matkhau2 !== matkhau) {
      showMessage({
        duration: 3000,
        message: t('wrongRePassword'),
        type: 'error',
      });
    } else {
      changePassword();
    }
  };

  const changePassword = async () => {
    const payload = await {
      params: {
        matkhaumoi: matkhau,
        taikhoan: user?.TaiKhoan,
        matkhau: user?.MatKhau,
      },
      onSuccess: () => {
        showMessage({
          duration: 3000,
          message: t('changePasswordSuccess'),
          type: 'success',
        });
        reLogin();
      },
      onError: () => {
        showMessage({
          duration: 3000,
          message: t('changePasswordFail'),
          type: 'danger',
        });
      },
    };
    await dispatch(userActions.changePassword(payload));
  };
  // relogin
  const reLogin = async () => {
    const payload = {
      params: {
        taikhoan: user?.TaiKhoan,
        matkhau: matkhau,
      },
      onSuccess: async () => {
        await dispatch(commonActions.toggleLoading(false));
        navigate('profile');
      },
      onError: async () => {
        console.log('Logout Fail !!');
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(userActions.userLogin(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('changePass')} />
      <KeyboardAwareScrollView style={styles.content}>
        <InputLabelValueText
          titleLabel={t('newPassword')}
          secureTextEntry={true}
          value={matkhau}
          maxLength={100}
          changeText={value => setMatKhau(value)}
        />
        <InputLabelValueText
          titleLabel={t('rePassword')}
          secureTextEntry={true}
          value={matkhau2}
          maxLength={100}
          onBlur={() => checkPass()}
          changeText={value => setMatKhau2(value)}
        />
        <ButtonWithText title={t('changePass')} onPress={() => CheckInput()} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightWhite,
  },
  content: {
    borderRadius: Sizes.radius,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.padding,
    marginHorizontal: Sizes.margin,
    paddingVertical: Sizes.padding,
    marginVertical: Sizes.margin,
  },
  wrapGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styleLabelView: {
    marginVertical: Sizes.margin / 2,
  },
  wrapPronoun: {
    marginVertical: Sizes.margin / 2,
  },
  wrapLastName: {
    marginVertical: Sizes.margin / 2,
    flex: 0.6,
  },
  wrapFirstName: {
    marginVertical: Sizes.margin / 2,
    flex: 0.4,
  },
  styleContainerDatePicker: {
    paddingHorizontal: 0,
  },
  styleContentDatePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleTextDatePicker: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark,
  },
  wrapInput: {
    borderBottomWidth: Sizes.border,
    borderBottomColor: Colors.border,
    paddingVertical: Sizes.padding / 2,
    paddingHorizontal: Sizes.padding,
    marginHorizontal: Sizes.margin / 4,
  },
  textInput: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  buttonUpdate: {
    height: parseSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.default,
    marginTop: Sizes.margin * 2,
  },
  quality: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.white,
  },
});
