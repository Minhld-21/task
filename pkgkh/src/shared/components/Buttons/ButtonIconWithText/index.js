import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
const ButtonIconWithText = props => {
  const {onPress, buttonStyle, iconStyle, titleStyle, nameIcon, nameTitle} = props;
  let _buttonStyle = buttonStyle ? buttonStyle : styles.buttonDefault;
  let _iconStyle = iconStyle ? iconStyle : styles.iconDefault;
  let _titleStyle = titleStyle ? titleStyle : styles.titleDefault;
  let _nameIcon = nameIcon ? nameIcon : 'default';
  let _nameTitle = nameTitle ? nameTitle :'default';
  return (
    <TouchableOpacity style={_buttonStyle} onPress={onPress}>
      <LinearGradient colors={['red', 'orange']} style={styles.linearDefault}>
        <Icon name={_nameIcon} style={_iconStyle} />
      </LinearGradient>
      <Text style={_titleStyle}>{_nameTitle}</Text>
    </TouchableOpacity>
  );
};
export default ButtonIconWithText;
