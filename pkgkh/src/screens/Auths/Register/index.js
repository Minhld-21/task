import React, {useState, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {navigate} from '~navigator/navigationUtils';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, parseSize} from '~theme';
import {userActions, commonActions} from '~reduxCore/reducers';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';
import LabelView from '~shared/components/Label/LabelView';
import DateTimePicker from '~shared/components/DateTimePicker';
import InputLabelValueText from '~shared/components/inputs/InputLabelValueText';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';
import AlertModal from '~shared/components/Modals/AlertModal';

import {getFcmToken, subscribeToTopic} from '~helper/notifyFCM';

const Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matkhau, setMatKhau] = useState('');
  const [matkhau2, setMatKhau2] = useState('');
  const [ngaySinh, setNgaySinh] = useState();
  const [dienThoai, setDienThoai] = useState('');
  const [CCCD, setCCCD] = useState('');
  const [email, setEmail] = useState('');
  const [visbleAlertModal, setVisibleAlertModal] = useState(false);

  const checkPass = () => {
    if (matkhau !== matkhau2) {
      showMessage({
        duration: 3000,
        message: t('wrongRePassword'),
        type: 'error',
      });
    }
  };

  const CheckInput = () => {
    if (taiKhoan === '') {
      showMessage({
        duration: 3000,
        message: t('missingAccount'),
        type: 'error',
      });
    } else if (matkhau === '') {
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
    } else if (ho === '') {
      showMessage({
        duration: 3000,
        message: t('missingLastName'),
        type: 'error',
      });
    } else if (ten === '') {
      showMessage({
        duration: 3000,
        message: t('missingFirstName'),
        type: 'error',
      });
    } else if (dienThoai == '') {
      showMessage({
        duration: 3000,
        message: t('missingYourPhone'),
        type: 'error',
      });
    } else {
      regisUser();
    }
  };

  const regisUser = async () => {
    const token = await getFcmToken();
    await subscribeToTopic('phuckhangshop');
    const payload = await {
      params: {
        ho: ho,
        ten: ten,
        taikhoan: taiKhoan,
        matkhau: matkhau,
        dienthoai: dienThoai,
        email: email,
        cmnd: CCCD,
        ngaysinhnhat:
          ngaySinh == null ? '' : moment(ngaySinh).format('YYYY-MM-DD'),
        token: token,
        chude: 'phuckhangshop',
      },
      onSuccess: () => {
        setVisibleAlertModal(true);
      },
      onError: err => {
        showMessage({
          duration: 3000,
          message: err,
          type: 'danger',
        });
      },
    };
    await dispatch(userActions.registerUser(payload));
  };
  // handle click button Login
  const gotoSignIn = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = {
      params: {
        taikhoan: taiKhoan,
        matkhau: matkhau,
      },
      onSuccess: async () => {
        setVisibleAlertModal(false);
        setTen('');
        setHo('');
        setTaiKhoan('');
        setNgaySinh();
        setMatKhau2('');
        setMatKhau('');
        setEmail('');
        setDienThoai('');
        setCCCD('');
        await dispatch(commonActions.toggleLoading(false));
        navigate('profile');
      },
      onError: async () => {
        console.log('Logout Fail !!');
        await dispatch(commonActions.toggleLoading(false));
        setVisibleAlertModal(false);
      },
    };
    await dispatch(userActions.userLogin(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('register')}/>
      <KeyboardAwareScrollView style={styles.content}>
        <InputLabelValueText
          titleLabel={t('account')}
          value={taiKhoan}
          maxLength={100}
          changeText={value => setTaiKhoan(value)}
        />
        <InputLabelValueText
          titleLabel={t('password')}
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
        <View style={styles.wrapGroup}>
          <InputLabelValueText
            styleContainer={styles.wrapLastName}
            titleLabel={t('lastName')}
            value={ho}
            maxLength={100}
            changeText={value => setHo(value)}
          />
          <InputLabelValueText
            styleContainer={styles.wrapFirstName}
            titleLabel={t('firstName')}
            value={ten}
            maxLength={100}
            changeText={value => setTen(value)}
          />
        </View>
        <InputLabelValueText
          keyboardType={'number-pad'}
          titleLabel={t('phone')}
          value={dienThoai}
          maxLength={10}
          changeText={value => setDienThoai(value)}
        />
        <LabelView
          title={t('birthDay')}
          styleLabelView={styles.styleLabelView}>
          <View style={styles.wrapInput}>
            <DateTimePicker
              styleContainer={styles.styleContainerDatePicker}
              styleContent={styles.styleContentDatePicker}
              styleText={styles.styleTextDatePicker}
              value={ngaySinh}
              placeholder={'DD/MM/YYYY'}
              minDate={new Date('1900-01-01')}
              selectDate={date => setNgaySinh(date)}
            />
          </View>
        </LabelView>
        <InputLabelValueText
          titleLabel={'Email'}
          value={email}
          maxLength={100}
          changeText={value => setEmail(value)}
        />
        <InputLabelValueText
          keyboardType={'number-pad'}
          titleLabel={t('idProfile')}
          value={CCCD}
          maxLength={12}
          changeText={value => setCCCD(value)}
        />
        <ButtonWithText title={'Đăng ký'} onPress={() => CheckInput()} />
      </KeyboardAwareScrollView>
      <AlertModal
        visible={visbleAlertModal}
        title={t('alert')}
        content={t('alertCreateAccountSuccess')}
        onConfirm={gotoSignIn}
        onCancel={() => navigate('login')}
      />
    </SafeAreaView>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.lightWhite,

  },
  content: {
    borderRadius: Sizes.radius,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.padding,
    marginHorizontal: Sizes.margin,
    paddingVertical: Sizes.padding,
    marginVertical:Sizes.margin,
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
