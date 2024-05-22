import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView, View, StyleSheet} from 'react-native';
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
import Icon from 'react-native-vector-icons/Entypo';

const Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState(0);
  const [mailPass, setMailPass] = useState(0);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState();

  // Kiểm tra tài khoản có tồn tại không
  const checkUserName = async () => {
    if (userName === '') {
      setUserPass(-1);
      showMessage({
        duration: 3000,
        message: t('missingAccount'),
        type: 'danger',
      });
    } else {
      const payload = await {
        params: {
          loai: 1,
          taikhoan: userName,
        },
        onSuccess: () => {
          setUserPass(1);
        },
        onError: message => {
          setUserPass(-1);
          showMessage({
            duration: 3000,
            message: message,
            type: 'danger',
          });
        },
      };
      await dispatch(userActions.checkAccount(payload));
    }
  };
  // call api send mail auto
  const sendMailForgetPass = async (user, newPass) => {
    const payload = await {
      params: {
        to: user?.Email,
        title: `Mail Reset mật khẩu`,
        body: `<div>
          <div style="border-radius: 10px; text-align: center; font-size: 20px; box-shadow: 3px 0px 5px 2px #999999; padding: 10px; width: 80%; margin: 0 auto; border: 1px solid #ccc">
           <div style="font-weight: bold">Bạn đã gửi yêu cầu reset mật khẩu tài khoản: ${user?.TaiKhoan} </div>
           <div>Mật khẩu mới của bạn là: <b>${newPass}</b>. Hãy đăng nhập App mà đổi mất khẩu mới để thuận tiện sử dụng. </div>
           <div style="font-style: italic; margin-top: 50px; font-size: 15px">Đây là thư gửi tự động. Vui lòng không trả lời. Cảm ơn./.</div>
           </div>
          </div>`,
      },
      onSuccess: () => {
        showMessage({
          duration: 3000,
          message: 'Mật khẩu của bạn đã được gửi tới email đăng ký tài khoản!',
          type: 'success',
        });
        navigate('login');
      },
      onError: () => {
        showMessage({
          duration: 3000,
          message: 'Gửi mail lấy lại mật khẩu thất bại',
          type: 'warning',
        });
      },
    };
    await dispatch(commonActions.sendMailBooking(payload));
  };

  // Kiểm tra email đăng ký có đúng không
  const checkMail = async () => {
    if (email === '') {
      setMailPass(-1);
      showMessage({
        duration: 3000,
        message: t('missingMail'),
        type: 'danger',
      });
    } else {
      const payload = await {
        params: {
          loai: 2,
          taikhoan: userName,
          email: email,
        },
        onSuccess: data => {
          setMailPass(1);
          setUser(data);
        },
        onError: message => {
          setMailPass(-1);
          showMessage({
            duration: 3000,
            message: message,
            type: 'danger',
          });
        },
      };
      await dispatch(userActions.checkAccount(payload));
    }
  };
  // hàm random  pass
  function genPassword() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Bộ ký tự bạn muốn sử dụng
    let result = '';

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  const resetPass = async () => {
    const newPass = await genPassword();
    const payload = await {
      params: {
        matkhaumoi: newPass,
        taikhoan: user?.TaiKhoan,
        matkhau: user?.MatKhau,
      },
      onSuccess: () => {
        sendMailForgetPass(user, newPass);
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
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('forgetPass')} />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.wrapInput}>
          <InputLabelValueText
            titleLabel={t('account')}
            value={userName}
            maxLength={100}
            onBlur={() => checkUserName()}
            changeText={value => setUserName(value)}
          />
          {userPass === 1 ? (
            <Icon style={styles.iconPass} name="check" />
          ) : userPass === -1 ? (
            <Icon style={styles.iconRemove} name="cross" />
          ) : null}
        </View>
        <View style={styles.wrapInput}>
          <InputLabelValueText
            titleLabel={t('email')}
            value={email}
            maxLength={200}
            onBlur={() => checkMail()}
            changeText={value => setEmail(value)}
          />
          {mailPass === 1 ? (
            <Icon style={styles.iconPass} name="check" />
          ) : mailPass === -1 ? (
            <Icon style={styles.iconRemove} name="cross" />
          ) : null}
        </View>
        <ButtonWithText title={t('resetPass')} onPress={() => resetPass()} />
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
    justifyContent: 'center',
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
  iconRemove: {
    position: 'absolute',
    fontSize: 20,
    right: 10,
    bottom: 10,
    color: Colors.danger,
  },
  iconPass: {
    position: 'absolute',
    fontSize: 20,
    right: 10,
    bottom: 10,
    color: Colors.success,
  },
});
