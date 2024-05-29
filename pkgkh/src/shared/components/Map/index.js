import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import styles from './styles';
import NatioPicker from '~shared/components/DropDownPicker/Components/NatioPicker';
import ProvincePicker from '~shared/components/DropDownPicker/Components/ProvincePicker';
import ZipCodePicker from '~shared/components/DropDownPicker/Components/ZipCodePicker';
import InputLabelValueText from '~shared/components/inputs/InputLabelValueText';
import {checkActions} from '~reduxCore/reducers';

export default Index = ({dataLocation, onClose, formValues}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  /*vị trí hiện tại*/
  const [lati, setLati] = useState(0);
  const [longti, setLongti] = useState(0);
  const [isMap, setIsMap] = useState(false);
  const [listCheckPoint, setListCheckPoint] = useState([]);
  const [locationDetails, setLocationDetails] = useState({
    latitude: parseFloat(formValues.latitude),
    longitude: parseFloat(formValues.longitude),
    natioCode: formValues.natioCode,
    natioName: formValues.natioName,
    provinceCode: formValues.provinceCode,
    provinceName: formValues.provinceName,
    districtName: formValues.districtName,
    cityName: formValues.cityName,
    address: formValues.address,
  });
  /*lưu thay đổi location*/
  const handleLocationChange = value => {
    setLocationDetails(prevLocation => ({
      ...prevLocation,
      ...value,
    }));
  };

  /*Cập nhật lại currentLocation khi click*/
  const handleMapPress = e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setLocationDetails(prevLocation => ({
      ...prevLocation,
      latitude,
      longitude,
    }));
  };

  const handleSelectedAdress = () => {
    setIsMap(true);
  };

  /*xác nhận chọn địa điểm check*/
  const handleConfirm = () => {
    dataLocation(locationDetails);
  };

  /*lấy vị trí hiện tại*/
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setLati(position.coords.latitude);
      setLongti(position.coords.longitude);
    });
  }, [lati, longti]);

  /*fetch api getDS địa điểm check*/
  useEffect(() => {
    const fetchCheckPoints = () => {
      dispatch(checkActions.toggleLoading(false));
      const payload = {
        parrams: {},
        onSuccess: data => {
          dispatch(checkActions.toggleLoading(false));
          setListCheckPoint(data);
        },
        onError: () => {
          dispatch(checkActions.toggleLoading(false));
        },
      };
      dispatch(checkActions.getDiemCheck(payload));
    };
    fetchCheckPoints();
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <TouchableOpacity onPress={onClose} style={styles.btnClose}>
        <Icon name="close" size={35} color={'white'} />
      </TouchableOpacity>
      {isMap ? (
        <View style={{flex: 1}}>
          <MapView
            showsMyLocationButton
            showsUserLocation
            userLocationPriority="balanced"
            onPress={handleMapPress}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: lati,
              longitude: longti,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {locationDetails.latitude != null &&
              locationDetails.longitude != null && (
                <Marker coordinate={locationDetails} pinColor="#4E41D9" />
              )}
            {listCheckPoint.map(item => {
              return (
                <Marker
                  key={item.IDDiaDiem}
                  coordinate={{
                    latitude: parseFloat(item.Latitude),
                    longitude: parseFloat(item.Longitude),
                  }}
                  title={item.TenDiaDiem}
                  description={item.DiaChi}
                />
              );
            })}
          </MapView>
          <View style={styles.bottom}>
            {locationDetails.latitude != null &&
              locationDetails.longitude != null && (
                <TouchableOpacity
                  onPress={() => handleConfirm()}
                  style={styles.btnConfirm}>
                  <Text style={styles.txtBtn}>Xác nhận điểm check</Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
      ) : (
        <View style={styles.chooseAdress}>
          <View style={styles.body}>
            <NatioPicker
              country={locationDetails.natioCode}
              getDataSelect={data =>
                handleLocationChange({
                  natioCode: data?.country,
                  natioName: data?.countryName,
                })
              }
            />
            <ProvincePicker
              country={locationDetails.natioCode}
              defaultCity={locationDetails.provinceCode}
              getDataSelect={data => {
                handleLocationChange({
                  provinceCode: data?.cityCode,
                  provinceName: data?.cityName,
                });
              }}
            />
            <ZipCodePicker
              country={locationDetails.natioCode}
              city={locationDetails.provinceCode}
              defaultZipCode={locationDetails.cityName}
              getDataSelect={data => {
                handleLocationChange({
                  districtName: data?.districtName,
                  cityName: data?.wardName,
                });
              }}
            />
            <InputLabelValueText
              titleLabel={t('address') + '(*)'}
              value={locationDetails.address}
              maxLength={500}
              changeText={value => handleLocationChange({address: value})}
            />
          </View>
          <TouchableOpacity
            onPress={() => handleSelectedAdress()}
            style={styles.btnAdress}>
            <Text style={styles.txtBtn}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
