import React from 'react';
import {StyleSheet, Text, TextInput, Platform, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
export default function Input(props) {
  const {
    title = 'InputName',
    placeholder = 'Vui lòng nhập',
    name = '',
    nameValidate = '',
    onChangeText = () => {},
    icon = () => {},
    showHelper = false,
    helperStatus = true,
    helperText = 'Lỗi rồi',
    keyboardType = 'default',
  } = props;
  return (
    <View style={styles.paddingV}>
      <Text style={styles.text_footer}>{title}</Text>
      <View style={styles.action}>
        {icon()}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#666666"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={val => onChangeText(val, name, nameValidate)}
          keyboardType={keyboardType}
        />
      </View>
      {helperStatus ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{helperText}</Text>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  paddingV: {
    paddingBottom: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D39A4B',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    // flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 18,
    color: '#D39A4B',
    width: '100%',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  text_footer: {
    color: '#D39A4B',
    fontSize: 18,
  },
});
