import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';
import styles from './styles';
import Map from '~components/Map';
import {checkActions} from '~reduxCore/reducers';
import {navigate} from '~navigator/navigationUtils';

export default Index = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    longitude: 0,
    latitude: 0,
    locationName: '',
    qrCode: '',
    natioCode: 'VN',
    natioName: 'Viet Nam',
    provinceCode: '',
    provinceName: '',
    districtName: '',
    cityName: '',
    address: '',
  });

  //lưu lại thay đổi từ các input
  const handleInputChange = (name, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // truyền dữ liệu lati và longi sang màn modal
  const handledata = coordinate => {
    setFormValues({
      ...formValues,
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
    });
    setModalVisible(false);
  };

  // truyền dữ liệu location sang màn modal
  const handleLocationData = locationDetails => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...locationDetails,
    }));
  };

  // nút xác nhận và call api quản lý điểm check
  const handleConfirm = async e => {
    dispatch(checkActions.toggleLoading(true));
    const payload = {
      params: {
        loai: 1,
        tendiadiem: formValues.locationName,
        diachi: formValues.address,
        macheck: formValues.qrCode,
        latitude: formValues.latitude,
        longitude: formValues.longitude,
        thanhpho: formValues.cityName,
        mabang: formValues.provinceCode,
        maquocgia: formValues.natioCode,
        tenbang: formValues.provinceName,
        tenquocgia: formValues.natioName,
        tenquan: formValues.districtName,
      },
      onSuccess: async data => {
        await dispatch(checkActions.toggleLoading(false));
        navigate('checkpoint');
      },
      onError: async err => {
        await dispatch(checkActions.toggleLoading(false));
      },
    };
    await dispatch(checkActions.quanlydiemcheck(payload));
  };

  useEffect(() => {
    formValues;
  }, [formValues]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('createcp')} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View>
          <Map
            onClose={() => setModalVisible(false)}
            dataCoordinate={handledata}
            dataLocation={handleLocationData}
          />
        </View>
      </Modal>
      {!modalVisible && (
        <ScrollView scrollIndicatorInsets={false}>
          <View style={styles.boxInput}>
            <Text style={styles.txtTitle}>Kinh độ</Text>
            <TextInput
              value={`${formValues.longitude}`}
              style={styles.input}
              editable={false}
            />
          </View>
          <View style={styles.boxInput}>
            <Text style={styles.txtTitle}>Vĩ độ</Text>
            <TextInput
              value={`${formValues.latitude}`}
              style={styles.input}
              editable={false}
            />
          </View>
          <View style={styles.boxInput}>
            <Text style={styles.txtTitle}>Tên địa điểm</Text>
            <TextInput
              value={formValues.locationName}
              onChangeText={val => handleInputChange('locationName', val)}
              style={styles.input}
            />
          </View>
          <View style={styles.boxInput}>
            <Text style={styles.txtTitle}>Chuỗi gen QRcode</Text>
            <TextInput
              value={formValues.qrCode}
              onChangeText={val => handleInputChange('qrCode', val)}
              style={styles.input}
            />
          </View>
          <View style={styles.boxInput}>
            <Text style={styles.txtTitle}>Địa chỉ checkin</Text>
            <TextInput
              value={formValues.address}
              onChangeText={val => handleInputChange('address', val)}
              style={styles.input}
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => handleConfirm()}
              style={styles.btn}>
              <Text style={styles.txtBtn}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.btn}>
              <Text style={styles.txtBtn}>Chọn vị trí</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
