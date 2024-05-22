import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {navigate} from '~navigator/navigationUtils';
import {checkActions} from '~reduxCore/reducers';
import styles from './styles';

export default Index = props => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [flash, setFlash] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const dispatch = useDispatch();
  const {width: screenWidth} = Dimensions.get('window');

  const animatedValue = useRef(new Animated.Value(0)).current;
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth * 0.7 - 5],
  });

  const handleScan = async e => {
    const stringCheck = e.data;
    await dispatch(checkActions.toggleLoading(true));
    const payload = {
      params: {
        stringCheck: stringCheck,
        latitude: latitude,
        longitude: longitude,
      },
      onSuccess: async data => {
        const checkDateTime = new Date();
        await dispatch(checkActions.toggleLoading(false));
        navigate('confirmcheck', {
          data,
          stringCheck,
          latitude,
          longitude,
          checkDateTime,
        });
        setIsCameraActive(false);
      },
      onError: async () => {
        await dispatch(checkActions.toggleLoading(false));
        navigate('timekeeping');
      },
    };
    await dispatch(checkActions.checkDistance(payload));
  };
  // Function to request permission
  const requestLocationPermission = () => {
    Geolocation.requestAuthorization(
      () => {
        startLocationUpdates();
      },
      error => {
        goToAppSettings();
      },
    );
  };

  // Function to start listening for location updates
  const startLocationUpdates = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.error('Error getting location: ', error);
        checkAndEnableGPS();
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };
  const checkAndEnableGPS = () => {
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          '<h2>Bật định vị ?</h2>Bạn cần bật định vị để sử dụng chức năng này',
        ok: 'Đồng ý',
        cancel: 'Từ chối',
      })
        .then(success => {
          // success => {alreadyEnabled: true, enabled: true, status: "already-enabled"}
          console.log('GPS status:', success);
          if (!success.enabled) {
            // Yêu cầu bật GPS
            LocationServicesDialogBox.forceCloseDialog();
            LocationServicesDialogBox.enableLocationServices();
          } else {
            Geolocation.getCurrentPosition(position => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            });
          }
        })
        .catch(error => {
          if (error.message === 'disabled') {
            navigate('info');
          }
        });
    }
  };
  const goToAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings:');
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      startLocationUpdates();
    }
  }, []);

  useEffect(() => {
    if (isCameraActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [animatedValue, isCameraActive]);

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigate('timekeeping')}>
              <Icon name="chevron-left" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.txtHeader}>QR Code</Text>
            <TouchableOpacity onPress={() => setFlash(!flash)}>
              <Icon name="bolt" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapCammera}>
          <Text style={styles.overlayText}>Quét mã QR để checkin/checkout</Text>
          {isCameraActive && (
            <QRCodeScanner
              reactivateTimeout={2000}
              onRead={handleScan}
              flashMode={
                !flash
                  ? RNCamera.Constants.FlashMode.off
                  : RNCamera.Constants.FlashMode.torch
              }
              cameraStyle={styles.cameraStyle}
              showMarker={true}
              customMarker={
                <View style={styles.markerContainer}>
                  <View style={styles.markerStyle}>
                    <Animated.View
                      style={[styles.animatedLine, {transform: [{translateY}]}]}
                    />
                  </View>
                </View>
              }
              reactivate={true}
            />
          )}
        </View>

        <TouchableOpacity style={styles.btnCamera} onPress={toggleCamera}>
          <Icon name={'camera'} style={styles.iconCamera} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
