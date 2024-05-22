import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Modal from 'react-native-modal';

import {Colors, Sizes, parseSize} from '~theme';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';

const Index = props => {
  const {
    visible,
    title = 'Thông báo',
    content = '',
    nameButtonConfirm,
    nameButtonCancel,
    onCancel = null,
    onConfirm = null,
    onClose = null,
    timeout = 3000,
  } = props;

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.wrapContent}>
            <Text style={styles.textTitle}>{title}</Text>
            <View
              padding={Sizes.padding}
              paddingX={Sizes.padding * 2}
              alignItems="center">
              <Text style={styles.textContent}>{content}</Text>
            </View>
            <View
              style={[
                styles.wrapBtn,
                {justifyContent: onCancel ? 'space-between' : 'center'},
              ]}>
              {onConfirm && (
                <ButtonWithText
                  title={nameButtonConfirm || 'xác nhận'}
                  styleButton={styles.btn}
                  onPress={onConfirm}
                />
              )}
              {onCancel && (
                <ButtonWithText
                  title={nameButtonCancel || 'Huỷ bỏ'}
                  styleButton={[
                    styles.btn,
                    {backgroundColor: Colors.lightDark},
                  ]}
                  onPress={onCancel}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapContent: {
    width: '90%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
  },
  textTitle: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.default,
  },
  wrapBtn: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
  },
  btn: {
    width: '48%',
    height: parseSize(35),
  },
  textContent: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-Regular',
    fontSize: 11,
    color: Colors.dark,
  },
});

export default Index;
