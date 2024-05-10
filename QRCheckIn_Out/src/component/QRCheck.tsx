import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';

const QRCheck = ({navigation}: any) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setLatitude(latitude);
      setLongitude(longitude);
    });
  }, []);

  const onSuccess = async (e: {data: string}) => {
    try {
      const Response = await fetch(
        `https://api-dev-pkg.azurewebsites.net/api/Check/checkDistance`,
        {
          body: JSON.stringify({
            stringCheck: e.data,
            latitude: '10.7438615',
            longitude: '106.6911594',
          }),
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            Cookie:
              'ARRAffinity=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5; ARRAffinitySameSite=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5',
          },
        },
      );
      const Json = await Response.json();
      if (Json.success === '00') {
        Alert.alert(Json.message);
      } else {
        const checkDateTime = new Date().toLocaleString('vi-VN');

        navigation.navigate('ConfirmCheck', {...Json.data, checkDateTime});
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <View style={{width: '100%', height: '100%'}}>
      <QRCodeScanner
        reactivateTimeout={2000}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        cameraStyle={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default QRCheck;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
