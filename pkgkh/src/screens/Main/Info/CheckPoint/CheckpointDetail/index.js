import {
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import Map from '~shared/components/Map';
import styles from './styles';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';
import {navigate} from '~navigator/navigationUtils';
import {checkActions} from '~reduxCore/reducers';

export default Index = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {listCheckPoint} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const [formValues, setFormValues] = useState({
    longitude: null,
    latitude: null,
    locationName: '',
    qrCode: '',
    natioCode: '',
    natioName: '',
    provinceCode: '',
    provinceName: '',
    districtName: '',
    cityName: '',
    address: '',
  });

  // lưu lại các dữ liệu thay đổi từ input
  const handleInputChange = (name, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // nhận dữ liệu location từ modal
  const handleLocationData = locationDetails => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...locationDetails,
    }));
    setModalVisible(false);
  };

  // sửa điểm check
  const handleConfirmChange = async () => {
    dispatch(checkActions.toggleLoading(true));
    const payload = {
      params: {
        loai: 2,
        IDDiaDiem: listCheckPoint.IDDiaDiem,
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
      onSuccess: async () => {
        await dispatch(checkActions.toggleLoading(false));
        navigate('checkpoint');
      },
      onError: async err => {
        await dispatch(checkActions.toggleLoading(false));
      },
    };
    await dispatch(checkActions.quanlydiemcheck(payload));
  };

  // lấy dữ liệu theo id từ màn repair
  useEffect(() => {
    if (listCheckPoint) {
      setFormValues({
        longitude: listCheckPoint.Longitude,
        latitude: listCheckPoint.Latitude,
        locationName: listCheckPoint.TenDiaDiem,
        qrCode: listCheckPoint.MaCheck,
        natioCode: listCheckPoint.MaQuocGia,
        natioName: listCheckPoint.TenQuocGia,
        provinceCode: listCheckPoint.MaBang,
        provinceName: listCheckPoint.TenBang,
        districtName: listCheckPoint.TenQuan,
        cityName: listCheckPoint.ThanhPho,
        address: listCheckPoint.DiaChi,
      });
    }
  }, [listCheckPoint]);
  useEffect(() => {
    formValues;
  }, [formValues]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('repaircp')} />

      <ScrollView showsVerticalScrollIndicator={false}>
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
              dataLocation={handleLocationData}
              formValues={formValues}
            />
          </View>
        </Modal>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => handleConfirmChange()}
            style={styles.btn}>
            <Text style={styles.txtBtn}>Xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btn}>
            <Text style={styles.txtBtn}>Chọn lại vị trí</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
