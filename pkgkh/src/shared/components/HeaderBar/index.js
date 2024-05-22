import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import Config from 'react-native-config';

import {navigate} from '~navigator/navigationUtils';
import Logo from '~assets/images/logo.png';
import styles from './styles';

export default HeaderBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable style={styles.wrapLogo} onPress={() => navigate('store')}>
          <Image source={Logo} style={styles.logoStyle} />
        </Pressable>
        {Config.ENVIROMENT === 'DEV' ? (
          <View style={styles.wrapEnv}>
            <Text style={styles.textEnv}>{Config.ENVIROMENT}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
