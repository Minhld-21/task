import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconBack from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

export default HeaderTitle = props => {
  const navigation = useNavigation();
  const {
    containerHeaderStyle,
    nameHeaderTitle,
    textTitleHeader,
    wrapTitleHeader,
    iconBack,
    onPressBack = null,
  } = props;

  const hanldClickBack = () => {
    if (onPressBack == null) {
      navigation.goBack();
    } else {
      onPressBack();
    }
  };
  return (
    <View style={containerHeaderStyle || styles.containerHeaderStyle}>
      <TouchableOpacity
        style={styles.wrapIconBack}
        onPress={() => hanldClickBack()}>
        <IconBack name="chevron-left" style={iconBack || styles.iconBack} />
      </TouchableOpacity>
      <View style={wrapTitleHeader || styles.wrapTitleHeader}>
        <Text style={textTitleHeader || styles.textTitleHeader}>
          {nameHeaderTitle}
        </Text>
      </View>
    </View>
  );
};
