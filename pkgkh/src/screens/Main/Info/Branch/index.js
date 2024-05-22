import React, {useEffect, useState} from 'react';
import {} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';

import HeaderBar from '~components/HeaderBar';
import {Colors, Sizes, parseSize} from '~theme';
import {commonActions} from '~reduxCore/reducers';
import HeaderTitle from '~components/HeaderTitle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const link = Config.API_URL_WEB;

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [listStore, setListStore] = useState([]);

  useEffect(() => {
    getListStore();
  }, []);
  // handle get list  data order
  const getListStore = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        loai: 1,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        setListStore(data);
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(commonActions.getListStore(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('branch')} />
      <KeyboardAwareScrollView style={styles.content}>
        {listStore &&
          listStore.length > 0 &&
          listStore.map((store, index) => {
            return (
              <View style={styles.wrapBranch} key={index}>
                <View style={styles.wrapLogo}>
                  <Image
                    resizeMode="contain"
                    source={{uri: `${link}${store?.URLLogo}`}}
                    style={styles.logoFooter}
                  />
                </View>
                <Text style={styles.nameBranch}>{store?.TenCuaHang}</Text>

                <View style={styles.groupDetail}>
                  <Text style={styles.titleBranch}>Điện thoại: </Text>
                  <Text style={styles.valueBranch}>
                    {store?.DienThoaiCuaHang}
                  </Text>
                </View>
                <View style={styles.groupAddress}>
                  <Text style={styles.titleBranch}>Địa chỉ: </Text>
                  <Text style={[styles.valueBranch, {textAlign: 'left'}]}>
                    {store?.DiaChiCuaHang2}
                  </Text>
                </View>
                <View style={styles.groupDetail}>
                  <Text style={styles.titleBranch}>Email: </Text>
                  <Text style={styles.valueBranch}>{store?.EmailCuaHang}</Text>
                </View>
                <View style={styles.groupDetail}>
                  <Text style={styles.titleBranch}>Website: </Text>
                  <Text style={styles.valueBranch}>
                    {store?.DiaChiWebCuaHang1}
                  </Text>
                </View>
              </View>
            );
          })}
      </KeyboardAwareScrollView>
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
  wrapBranch: {
    marginTop: Sizes.margin,
    borderWidth: Sizes.border,
    borderColor: Colors.dark,
    padding: Sizes.padding,
    marginHorizontal: Sizes.margin,
    marginVertical: Sizes.margin,
    borderRadius: Sizes.radius,
  },
  nameBranch: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.warning,
  },
  groupDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  groupAddress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleBranch: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  valueBranch: {
    flex: 1,
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  wrapLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFooter: {
    height: parseSize(80),
    width: parseSize(100),
  },
});
