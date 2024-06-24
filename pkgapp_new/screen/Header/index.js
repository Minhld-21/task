import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const index = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={require('../asset/Back.png')} resizeMode="cover" />
      </TouchableOpacity>
      <Text style={styles.txtHeader}>Bán Hàng</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: 22,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#454545',
    flex: 1,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
