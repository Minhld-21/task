import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {navigate} from '~navigator/navigationUtils';
import {userActions, userSelectors} from '~reduxCore/reducers';
import {Sizes, Colors, parseSize} from '~theme';
import Avatar from '~assets/images/avatar.png';
import HeaderBar from '~components/HeaderBar';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListProductLike from './ListProductLike';
import AlertModal from '~shared/components/Modals/AlertModal';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  //get global state
  const userInfo = useSelector(state => userSelectors.getUserData(state));
  useFocusEffect(
    React.useCallback(() => {
      userInfo === null
        ? dispatch(userActions.toggleModalLogin(false))
        : dispatch(userActions.toggleModalLogin(true));
    }, [navigate, userInfo]),
  );
  // init tabview
  const [routes] = useState([
    {key: '1', title: 'Thông tin'},
    {key: '2', title: 'Yêu thích'},
  ]);

  const clickLogout = async () => {
    const payload = {
      onSuccess: () => {
        dispatch(userActions.toggleModalLogin(false));
      },
      onError: () => {
        console.log('Logout Fail !!');
      },
    };
    await dispatch(userActions.userLogout(payload));
  };
  const [visbleAlertModal, setVisibleAlertModal] = useState(false);

  // handle block user
  const blockAccount = async () => {
    const payload = await {
      params: {
        loai: 8,
        idnguoidung: userInfo?.IDNguoiDung,
        islock: 1,
      },
      onSuccess: () => {
        clickLogout();
      },
      onError: () => {
        showMessage({
          duration: 3000,
          message: t('deleteAccountFail'),
          type: 'danger',
        });
      },
    };
    await dispatch(userActions.blockAccount(payload));
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Info = () => {
    return (
      <View>
        <View styles={styles.wrapInfo}>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>
              {t('fullName')}: {userInfo?.TenNguoiDung}
            </Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>
              {t('phone')}: {userInfo?.DienThoaiKhachHang}
            </Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>
              {t('natio')}: {userInfo?.TenQuocGia}
            </Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>
              {t('province')}: {userInfo?.TenBang}
            </Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>
              {t('ward')}: {userInfo?.TenQuan}
            </Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>
              {t('address')}: {userInfo?.DiaChi}, {userInfo?.TenQuan},{' '}
              {userInfo?.TenBang}
            </Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>
              {t('birthday')}:{' '}
              {moment(userInfo?.NgaySinhNhat).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>CMND/CCCD: {userInfo?.CMND}</Text>
          </View>
          <View style={styles.wrapDetailInfo}>
            <Text style={styles.textinfo}>Email: {userInfo?.Email}</Text>
          </View>
        </View>
        <View style={styles.wrapFooter}>
          <TouchableOpacity
            style={styles.wrapLogout}
            onPress={() => clickLogout()}>
            <Text style={styles.textLogout}>{t('logOut')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapDeleteAcc}
            onPress={() => setVisibleAlertModal(true)}>
            <Text style={styles.textDeleteAcc}>{t('deleteAccount')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderScene = SceneMap({
    1: Info,
    2: ListProductLike,
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.wrapMainProfile}>
        <View style={styles.wrapAvatar}>
          <Image
            resizeMode={'cover'}
            style={styles.imgAvatar}
            source={Avatar}
          />
        </View>
        <View style={styles.wrapUser}>
          <Text style={styles.textName}>{userInfo?.TenNguoiDung}</Text>
          <Text style={styles.textPhone}>{userInfo?.DienThoai}</Text>
          <TouchableOpacity
            style={styles.wrapChangePass}
            onPress={() => navigate('changePass', {user: userInfo})}>
            <Text style={styles.textChangePass}>{t('changePass')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <View style={styles.tabBar}>
            {props.navigationState.routes.map((route, i) => (
              <Text
                key={route.key}
                style={[styles.tabItem, i === index && styles.activeTab]}
                onPress={() => setIndex(i)}>
                {route.title}
              </Text>
            ))}
          </View>
        )}
      />
      <AlertModal
        visible={visbleAlertModal}
        title={t('alert')}
        content={t('alertDeleteAccount')}
        onConfirm={blockAccount}
        onCancel={() => setVisibleAlertModal(false)}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  tabItem: {
    flex: 1,
    padding: Sizes.padding,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: Colors.info,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Sizes.radius,
  },
  content: {},
  wrapMainProfile: {
    marginVertical: Sizes.margin,
    flex: 0.2,
    flexDirection: 'row',
  },
  wrapAvatar: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgAvatar: {
    borderColor: Colors.border,
    borderWidth: Sizes.border,
    height: 80,
    width: 80,
  },
  wrapUser: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: Sizes.padding,
  },
  textName: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.default,
  },
  textPhone: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  wrapChangePass: {
    backgroundColor: Colors.success,
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding / 3,
    borderRadius: Sizes.radius,
  },
  textChangePass: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
  wrapInfo: {
    flex: 0.1,
  },
  wrapDetailInfo: {
    paddingHorizontal: Sizes.padding * 2,
    paddingVertical: Sizes.padding / 2,
    borderColor: Colors.border,
    borderWidth: Sizes.border,
  },
  textinfo: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  wrapFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapLogout: {
    height: parseSize(35),
    width: parseSize(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderRadius: Sizes.radius / 2,
    marginTop: Sizes.margin * 2,
  },
  textLogout: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 14,
    color: Colors.dark,
  },
  wrapDeleteAcc: {
    marginVertical: Sizes.margin * 2,
  },
  textDeleteAcc: {
    fontFamily: 'Hahmlet-Regular',
    textDecorationLine: 'underline',
    fontSize: 14,
    color: Colors.danger,
  },
});
