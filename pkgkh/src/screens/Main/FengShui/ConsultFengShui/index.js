import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {navigate} from '~navigator/navigationUtils';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

import {Colors, Sizes} from '~theme';
import {commonActions, userSelectors} from '~reduxCore/reducers';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';
import InputNumerologies from '~shared/components/inputs/InputNumerologies';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import GenderRadioButton from '~shared/components/RadioButton/GenderRadioButton';
import Logo from '~assets/images/logoname.png';

const options = [
  {label: 'Nam', value: 'male'},
  {label: 'Nữ', value: 'female'},
];

const Index = props => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [DoB, setDoB] = useState();
  const [isValidDoB, setIsValidDoB] = useState(true);
  const [checkFullName, setCheckFullName] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [phone, setPhone] = useState('');
  const [checkPhone, setCheckPhone] = useState();
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState();
  const [gender, setGender] = useState('male');

  const userInfo = useSelector(state => userSelectors.getUserData(state));
  //hiển thị picker date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  // xử lý thay đổi Tên
  const textUserNameChange = (value, key) => {
    if (key === 'fullName' && value) {
      setFullName(value);
      setCheckFullName(true);
    } else {
      setFullName('Vui lòng nhập tên của bạn');
      setCheckFullName(false);
    }
  };
  // Định dạng date
  const formatDate = value => {
    let fullDate = moment(value)?.format('DD/MM/YYYY') || '';
    console.log(value, fullDate, 'value format date');
    if (fullDate) {
      setDoB(fullDate);
      setIsValidDoB(true);
    } else {
      setIsValidDoB(false);
      setDoB(fullDate);
    }
  };
  // ẩn picker date khi đã chọn
  const hideDatePicker = value => {
    if (value || DoB) {
      setDatePickerVisibility(false);
    } else {
      setIsValidDoB(false);
      setDatePickerVisibility(false);
    }
  };
  // chọn Date
  const handleConfirm = date => {
    formatDate(date);
    hideDatePicker(date);
  };
  // kiểm tra số điện thoại việt nam
  function isVietnamesePhoneNumber(number) {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
  }
  //xử lý thay đổi số điện thoại
  const textPhoneChange = (value, key, validateKey) => {
    if (key === 'phone' && value) {
      if (isVietnamesePhoneNumber(value)) {
        setCheckPhone(true);
        setPhone(value);
      } else {
        setCheckPhone(false);
      }
    } else {
      setPhone(value);
      setCheckPhone(false);
    }
  };
  //Xử lý thay đổi email
  const textEmailChange = (value, key, validateKey) => {
    if (key === 'email' && value) {
      setCheckEmail(true);
      setEmail(value);
    } else {
      setEmail('');
      setCheckEmail(false);
    }
  };
  // xử lý nhấn nút xem cung mệnh
  const handleGetDesTiny = () => {
    if (DoB === null || DoB === undefined) {
      setIsValidDoB(false);
    } else {
      getDestiny();
    }
  };
  // xử lý nhấn nút Khám phá
  const handleViewNumero = () => {
    if (fullName === '') {
      setCheckFullName(false);
      if (DoB === null || DoB === undefined) {
        setIsValidDoB(false);
        if (phone === '') setCheckPhone(false);
      }
    } else {
      viewNumerologies();
    }
  };
  // call api xem phong thuỷ
  const viewNumerologies = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const parts = DoB.split('/');
    const payload = await {
      params: {
        fullname: fullName,
        dayofbirth: parts[0],
        monthofbirth: parts[1],
        yearofbirth: parts[2],
        phonenumber: phone,
        email: email,
        gender: gender,
        creatorid: userInfo?.IDNguoiDung,
        destiny: 1,
      },
      onSuccess: async data => {
        await navigate('resultfengshui', {data: data});
        await dispatch(commonActions.toggleLoading(false));
      },
      onError: async mess => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: mess,
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.viewNumerologies(payload));
  };
  // call api xem cung mệnh
  const getDestiny = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const parts = DoB.split('/');
    const payload = await {
      params: {
        fullname: fullName,
        dayofbirth: parts[0],
        monthofbirth: parts[1],
        yearofbirth: parts[2],
        gender: gender,
      },
      onSuccess: async data => {
        await navigate('resultfengshui', {data: data});
        await dispatch(commonActions.toggleLoading(false));
      },
      onError: async mess => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: mess,
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.getDestiny(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle="Phúc Khang Numerologies" />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.text_header}>PHUC KHANG NUMEROLOGIES</Text>
        </View>
        <InputNumerologies
          title="Họ và tên"
          placeholder="Họ và tên của bạn"
          name="fullName"
          nameValidate="isValidUserName"
          onChangeText={textUserNameChange}
          icon={() => (
            <FontAwesome name="user-o" color={Colors.primary} size={20} />
          )}
          helperStatus={checkFullName}
          helperText={'Bạn chưa nhập họ tên'}
        />
        <GenderRadioButton
          data={options}
          valueSelected={gender}
          getValueSelected={value => setGender(value)}
        />
        <TouchableOpacity style={styles.paddingV} onPress={showDatePicker}>
          <Text style={styles.text_footer}>Ngày sinh</Text>
          <View style={styles.action}>
            <MaterialIcons name="date-range" size={20} color={Colors.primary} />
            <Text
              style={[
                {
                  color: DoB === '' ? Colors.textColor : Colors.primary,
                },
                styles.textDate,
              ]}>
              {DoB ? DoB : 'Chọn ngày sinh'}
            </Text>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              style={{backgroundColor: 'red'}}
              value={DoB ? DoB : new Date()}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          {isValidDoB ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Bạn chưa nhập ngày sinh </Text>
            </Animatable.View>
          )}
        </TouchableOpacity>
        <InputNumerologies
          title="Số điện thoại"
          placeholder="Số điện thoại của bạn "
          name="phone"
          nameValidate="isValidPhone"
          onChangeText={textPhoneChange}
          icon={() => <Feather name="phone" size={20} color={Colors.primary} />}
          helperStatus={checkPhone}
          helperText={'Vui lòng nhập số điện thoại việt nam'}
          keyboardType="phone-pad"
        />
        <InputNumerologies
          title="Email"
          placeholder="Địa chỉ email của bạn "
          name="email"
          nameValidate="isValidEmail"
          onChangeText={textEmailChange}
          icon={() => (
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              color={Colors.primary}
            />
          )}
          helperStatus={checkEmail}
          helperText={''}
        />
        <TouchableOpacity onPress={() => navigate('siginnumero')}>
          <Text
            style={{
              color: Colors.primary,
              marginVertical: 15,
              textAlign: 'right',
            }}>
            Bạn đã có IGEN? Đăng nhập ngay
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleViewNumero}>
            <View>
              <Image style={styles.tinyLogo} source={Logo} />
            </View>
            <View>
              <Text style={styles.textButtonNumero}>Xem lá số & Cung mệnh</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleGetDesTiny}>
            <View>
              <Image style={styles.tinyLogo} source={Logo} />
            </View>
            <View>
              <Text style={styles.textSign}>Xem cung mệnh</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    borderRadius: Sizes.radius,
    paddingHorizontal: Sizes.padding,
    marginHorizontal: Sizes.margin,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  footer: {
    flex: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 30,
  },
  textDate: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
  },
  text_footer: {
    color: Colors.primary,
    fontSize: 18,
  },
  icon: {
    color: Colors.primary,
  },

  button: {
    marginBottom: 20,
    flex: 1,
    flexWrap: 'wrap',
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderColor: Colors.primary,
    borderWidth: 2,
    height: 70,
    alignItems: 'center',
    borderRadius: 5,
  },
  tinyLogo: {
    width: 70,
    height: '70%',
    resizeMode: 'stretch',
  },
  textSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  paddingV: {
    paddingBottom: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.red,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: Colors.primary,
  },
  errorMsg: {
    color: Colors.red,
    fontSize: 14,
  },
  text_footer: {
    color: Colors.primary,
    fontSize: 18,
  },
  textValueCheck: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 14,
    color: Colors.dark,
  },
  textButtonNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
