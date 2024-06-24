import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Path, Text} from 'react-native-svg';

import styles from './styles';
const index = () => {
  const SvgComponent = () => (
    <Svg width={350} height={90} viewBox="0 0 300 80">
      <Path
        d="M112.452 13.656C109.788 6.421 103.767 0 96.057 0H40C17.909 0 0 17.909 0 40s17.909 40 40 40h220c22.091 0 40-17.909 40-40S282.091 0 260 0h-56.057c-7.71 0-13.731 6.421-16.395 13.656-5.626 15.281-20.314 26.18-37.548 26.18s-31.922-10.899-37.548-26.18z"
        style={styles.Svg}
      />
      <Text style={styles.txtFastAccess}>Truy cập nhanh</Text>
    </Svg>
  );

  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.btnNavigation}>
        <Icon name="bell-outline" size={35} color="#6D6D6D" />
      </TouchableOpacity>
      <View style={styles.btnLongPress}>
        <TouchableOpacity
          delayLongPress={500}
          onLongPress={() => console.log('đã được nhấn')}
          style={styles.btnFastAccess}>
          <LinearGradient
            colors={['#198B4D', '#05AA50']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.btnAccessGradient}>
            <Icon name="gesture-tap-hold" size={35} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        <SvgComponent />
      </View>
      <TouchableOpacity style={styles.btnNavigation}>
        <Icon name="account-outline" size={35} color="#6D6D6D" />
      </TouchableOpacity>
    </View>
  );
};

export default index;
