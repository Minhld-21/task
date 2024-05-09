import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const QRCheck = (props: any) => {
  const [on, setOn] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const torchControll = () => {};
  const onSuccess = (e: {data: string}) => {
    console.log(e.data);
    setOn(true);
  };
  return (
    <View style={{width: '100%', height: '100%'}}>
      <QRCodeScanner
        reactivateTimeout={2000}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        cameraStyle={{width: '100%', height: '100%'}}
      />
      <Button
        title="torch"
        onPress={() =>
          props.navigation.navigate('ConfirmCheck', {name: 'minh'})
        }
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
