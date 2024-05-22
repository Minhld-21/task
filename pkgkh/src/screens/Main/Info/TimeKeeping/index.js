import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {navigate} from '~navigator/navigationUtils';
import {showMessage} from 'react-native-flash-message';

import HeaderBar from '~components/HeaderBar';
import {Colors, Sizes, parseSize, Width, Height} from '~theme';
import {TouchableOpacity} from 'react-native';
import {checkPermission} from '~helper/permission';
import HeaderTitle from '~components/HeaderTitle';

const Index = props => {
  const {t} = useTranslation();

  const handleClickQRCheck = async () => {
    const permissionLocation = await checkPermission('location');
    const permissionCamera = await checkPermission('camera');

    if (!permissionLocation) {
      showMessage({
        duration: 3000,
        message: 'Vui lòng cấp quyền truy cập vị trí',
        type: 'error',
      });
    }

    if (!permissionCamera) {
      showMessage({
        duration: 3000,
        message:
          'Vui lòng cấp quyền truy cập camera trước khi sử dụng tính năng này',
        type: 'error',
      });
    }

    if (permissionLocation && permissionCamera) {
      navigate('qrcheck');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('timeKeeping')} />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.wrapFuture}
          onPress={() => handleClickQRCheck()}>
          <View style={styles.wrapTitle}>
            <Text style={styles.textTitle}>Checkin Checkout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrapFuture}
          onPress={() => navigate('timesheet')}>
          <View style={styles.wrapTitle}>
            <Text style={styles.textTitle}>Xem lịch sử checkin checkout</Text>
          </View>
        </TouchableOpacity>
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
    paddingHorizontal: Sizes.padding,
    marginVertical: Sizes.margin,
  },
  wrapFuture: {
    height: parseSize(100),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderRadius: Sizes.radius * 2,
    borderWidth: 2,
    borderColor: Colors.danger,
    overflow: 'hidden',
    marginVertical: Sizes.margin / 2,
    marginHorizontal: Sizes.margin / 2,
  },
  logoNumeroWrapper: {
    justifyContent: 'center',
    borderRadius: Sizes.radius * 2,
    overflow: 'hidden',
  },
  wrapTitle: {
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textTitle: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.dark,
    marginLeft: Sizes.margin * 2,
  },
  iconNext: {
    position: 'absolute',
    right: 10,
    fontSize: 24,
    color: Colors.dark,
  },
  logoNumero: {
    height: 50,
    width: 50,
  },
});

export default Index;
