import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import styles from './styles';
import NatioPicker from '~shared/components/DropDownPicker/Components/NatioPicker';
import ProvincePicker from '~shared/components/DropDownPicker/Components/ProvincePicker';
import ZipCodePicker from '~shared/components/DropDownPicker/Components/ZipCodePicker';
import InputLabelValueText from '~shared/components/inputs/InputLabelValueText';
import {checkActions} from '~reduxCore/reducers';

export default Index = ({dataCoordinate, dataLocation, onClose}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  //vị trí hiện tại
  const [lati, setLati] = useState(0);
  const [longti, setLongti] = useState(0);
  // vị trí chọn trên bản đồ
  const [coordinate, setCoordinate] = useState(null);
  const [isMap, setIsMap] = useState(false);
  const [listCheckPoint, setListCheckPoint] = useState([]);

  const [locationDetails, setLocationDetails] = useState({
    natioCode: 'VN',
    natioName: 'Viet Nam',
    provinceCode: '',
    provinceName: '',
    districtName: '',
    cityName: '',
    address: '',
  });

  // lưu thay đổi location
  const handleLocationChange = fields => {
    setLocationDetails(prevDetails => ({
      ...prevDetails,
      ...fields,
    }));
  };

  // cập nhật lại lati longti khi click
  const handleMapPress = e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setCoordinate({latitude, longitude});
  };

  // xác nhận chọn địa điểm check
  const handleConfirm = () => {
    dataCoordinate(coordinate);
    dataLocation(locationDetails);
  };

  const handleSelectedAdress = () => {
    setIsMap(true);
  };

  // lấy vị trí hiện tại
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setLati(position.coords.latitude);
      setLongti(position.coords.longitude);
    });
  }, [lati, longti]);

  //fetch api getDS địa điểm check
  useEffect(() => {
    const fetchCheckPoints = () => {
      dispatch(checkActions.toggleLoading(false));
      const payload = {
        parrams: {},
        onSuccess: data => {
          dispatch(checkActions.toggleLoading(false));
          setListCheckPoint(data);
        },
        onError: err => {
          dispatch(checkActions.toggleLoading(false));
        },
      };
      dispatch(checkActions.getDiemCheck(payload));
    };
    fetchCheckPoints();
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <TouchableOpacity onPress={() => onClose(false)} style={styles.btnClose}>
        <Icon name="close" size={35} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelectedAdress}
        style={styles.btnClose}>
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
            {coordinate && (
              <Marker coordinate={coordinate} pinColor="#4E41D9" />
            )}
            {listCheckPoint.map(item => {
              return (
                <Marker
                  key={item.IDDiaDiem}
                  coordinate={{
                    latitude: parseFloat(item.Latitude),
                    longitude: parseFloat(item.Longitude),
                  }}
                  title="Điểm check"
                  description={item.DiaChi}
                />
              );
            })}
          </MapView>
          <View style={styles.bottom}>
            {coordinate && (
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
              country={locationDetails.natioCode || 'VN'}
              getDataSelect={data =>
                handleLocationChange({
                  natioCode: data?.country,
                  natioName: data?.countryName,
                })
              }
            />
            <ProvincePicker
              country={locationDetails.natioCode || 'VN'}
              defaultCity={locationDetails.provinceCode}
              getDataSelect={data => {
                handleLocationChange({
                  provinceCode: data?.cityCode,
                  provinceName: data?.cityName,
                });
              }}
            />
            <ZipCodePicker
              country={locationDetails.natioCode || 'VN'}
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
