import React, { useState, useLayoutEffect } from 'react';
import Config from 'react-native-config';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';


import { Sizes, Colors, Height, Width } from '~theme';

const Footer = props => {
  const { styleFooter } = props;
  return (
    <View style={styles.container}>
      <View style={{flex:1, backgroundColor:'yellow'}}>
        <Text style={styles.copyRight}>© 2022 Copyright by VanSuongIT</Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex:0.1,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'center',
    marginBottom:20,
  },
  copyRight: {
    fontSize: 10,
    color: Colors.dark,
    textAlign: 'center',
  },
});
