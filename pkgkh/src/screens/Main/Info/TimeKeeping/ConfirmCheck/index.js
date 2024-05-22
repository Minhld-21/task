import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '~navigator/navigationUtils';
import {Colors, Sizes} from '~theme';
import {Image} from 'react-native-elements';
import {userSelectors} from '~reduxCore/reducers';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {getUniqueId} from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {checkActions} from '~reduxCore/reducers';
import Avatar from '~assets/images/avatar.png';
import styles from './styles';

export default Index = props => {
  const route = useRoute();
  const [idDevice, setidDevice] = useState('');
  const dispatch = useDispatch();

  //data khi nguoi dung quet QR
  const {checkDateTime, data, latitude, longitude, stringCheck} = route.params;

  // data khi nguoi dung dang nhap
  const userInfo = useSelector(state => userSelectors.getUserData(state));

  //lấy id và name device
  const getDeviceInfo = async () => {
    let device = await getUniqueId();
    setidDevice(device);
  };

  const handleCheck = async check => {
    //gọi api
    await dispatch(checkActions.toggleLoading(false));
    const payload = await {
      params: {
        IDNguoiDung: userInfo.IDNguoiDung,
        IDThietBi: idDevice,
        NenTangThietBi: Platform.OS,
        ChuoiCheck: stringCheck,
        LoaiCheck: check,
        NgayGioCheck: moment(checkDateTime).format('YYYY-MM-DD HH:mm:ss'),
        Lati: latitude,
        Longi: longitude,
      },
      onSuccess: async data => {
        await dispatch(checkActions.toggleLoading(false));
        navigate('info');
      },
      onError: async () => {
        await dispatch(checkActions.toggleLoading(false));
      },
    };
    await dispatch(checkActions.confirmCheck(payload));
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('timekeeping')}>
          <Icon name="chevron-back-outline" style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>{'Xác nhận Checkin Checkout'}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View style={styles.fontUnder}></View>
        <View style={styles.boxInfo}>
          <Image source={Avatar} containerStyle={styles.avatar} />
          <Text style={styles.txtName}>{userInfo?.TenNguoiDung}</Text>
          <Text style={styles.txtBirthday}>
            {moment(userInfo.NgaySinhNhat).format('DD/MM/YYYY')}
          </Text>

          <View style={styles.boxContent}>
            <View style={styles.content}>
              <Text style={styles.txtTitle}>Điện Thoại:</Text>
              <Text style={styles.txtContent}>{userInfo?.DienThoai}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.txtTitle}>Email:</Text>
              <Text style={styles.txtContent}>{userInfo?.Email}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.txtTitle}>CMND:</Text>
              <Text style={styles.txtContent}>{userInfo?.CMND}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.txtTitle}>Chức vụ:</Text>
              <Text style={styles.txtContent}>{userInfo.VaiTro}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.txtTitle}>Chi nhánh:</Text>
              <Text style={styles.txtContent}>{data.DiaChiCuaHang}</Text>
            </View>
          </View>
        </View>
        <View style={styles.boxInfo2}>
          <View style={styles.space}>
            <View style={styles.content}>
              <Icon name="calendar-outline" style={styles.iconInfo} />
              <Text style={styles.txtBottomContent}>
                {moment(checkDateTime).format('YYYY-MM-DD')}
              </Text>
            </View>
            <View style={styles.content}>
              <Icon name="time-outline" style={styles.iconInfo} />
              <Text style={styles.txtBottomContent}>
                {moment(checkDateTime).format('HH:mm:ss')}
              </Text>
            </View>
          </View>
          <View style={styles.content2}>
            <Icon name="navigate-circle-outline" style={styles.iconInfo} />
            <Text style={styles.txtBottomContent}>{data.DiaChi}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.boxBtn}>
        <TouchableOpacity
          onPress={() => handleCheck(2)}
          style={styles.btnCheckout}>
          <Text style={styles.txtCheckout}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCheck(1)}
          style={styles.btnCheckin}>
          <Text style={styles.txtCheckin}>Checkin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
