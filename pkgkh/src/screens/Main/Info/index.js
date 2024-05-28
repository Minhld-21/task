import React, {useState} from 'react';
import {} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {navigate} from '~navigator/navigationUtils';

import HeaderBar from '~components/HeaderBar';
import {Colors, Sizes, parseSize} from '~theme';
import {userSelectors} from '~reduxCore/reducers';
import Icon from 'react-native-vector-icons/Entypo';

export default Index = props => {
  const {t} = useTranslation();

  const user = useSelector(state => userSelectors.getUserData(state));

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.wrapTitle}
          onPress={() => navigate('branch')}>
          <Text style={styles.textTitle}>{t('branch')}</Text>
          <Icon name="chevron-right" style={styles.iconNext} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrapTitle}
          onPress={() => navigate('policy')}>
          <Text style={styles.textTitle}>{t('policy')}</Text>
          <Icon name="chevron-right" style={styles.iconNext} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrapTitle}
          onPress={() => navigate('checkpoint')}>
          <Text style={styles.textTitle}>{t('checkpoint')}</Text>
          <Icon name="chevron-right" style={styles.iconNext} />
        </TouchableOpacity>
        {user?.IDVaiTro && user?.IDVaiTro !== 5 ? (
          <TouchableOpacity
            style={styles.wrapTitle}
            onPress={() => navigate('timekeeping')}>
            <Text style={styles.textTitle}>{t('timeKeeping')}</Text>
            <Icon name="chevron-right" style={styles.iconNext} />
          </TouchableOpacity>
        ) : null}
        {user?.IDVaiTro === 1 ? (
          <TouchableOpacity
            style={styles.wrapTitle}
            onPress={() => navigate('notify')}>
            <Text style={styles.textTitle}>{t('createNotify')}</Text>
            <Icon name="chevron-right" style={styles.iconNext} />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingBottom: parseSize(-30),
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.margin,
  },
  wrapTitle: {
    height: parseSize(80),
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: Sizes.border * 2,
    borderColor: Colors.lightDark,
  },
  textTitle: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.dark,
    marginLeft: Sizes.margin * 2,
  },
  iconNext: {
    position: 'absolute',
    right: 10,
    fontSize: 24,
    color: Colors.dark,
  },
});
