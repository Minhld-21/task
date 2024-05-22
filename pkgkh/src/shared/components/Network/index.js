import React, {useState, useEffect} from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
import RNRestart from 'react-native-restart';
import NetInfo from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, Height, parseSize} from '~theme';

const Network = () => {
  const {t} = useTranslation();
  const opacity = new Animated.Value(0);
  const [isConnected, setConnected] = useState(true);
  const height = Sizes.tab;

  useEffect(() => {
    onChangeHeight();
  }, [isConnected]);

  useEffect(() => {
    const handleConnectionChange = async state => {
      console.log('Is network connected?', state.isConnected);
      const currentStatus = state.isConnected;

      if (currentStatus === isConnected) {
        return;
      }
      await setConnected(currentStatus);
      // Reload app when network is connected
      if (currentStatus) {
        RNRestart.Restart();
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const onChangeHeight = () => {
    Animated.timing(opacity, {
      toValue: isConnected ? 0 : height,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[{height: opacity}, styles.container]}>
      <Text style={styles.textStyles}>{t('disconnected')}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: parseSize(150),
    position: 'relative',
    top: Height / 4,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
  },
  textStyles: {
    color: 'white',
    fontSize: Sizes.small,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Network;
