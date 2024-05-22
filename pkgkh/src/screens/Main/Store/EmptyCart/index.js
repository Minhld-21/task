import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {navigate} from '~navigator/navigationUtils';
import CartEmpty from '~assets/images/empty-cart.png';

import HeaderBarStore from '~components/HeaderBarStore';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';
import {Colors, Sizes, Width, Height, parseSize} from '~theme';

export default Index = props => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBarStore />
      <View style={styles.content}>
        <Image
          source={CartEmpty}
          style={styles.emtyCartStyle}
          resizeMode="stretch"
        />
        <Text style={styles.textEmptyCart}>{t('textEmptyCart')}</Text>
        <ButtonWithText
          title={t('continueShopping')}
          onPress={() => navigate('store')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.margin,
  },
  textEmptyCart: {
    fontFamily: 'Hahmlet-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.danger,
  },
  emtyCartStyle: {
    width: Width - 20,
    height: Height / 2 - 20,
  },
});
