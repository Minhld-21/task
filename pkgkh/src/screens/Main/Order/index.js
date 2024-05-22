import React, {useState, useEffect} from 'react';
import {} from 'react-native';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import HeaderBar from '~components/HeaderBar';
import InputSearch from '~shared/components/inputs/InputSearch';
import {Colors, Sizes, parseSize} from '~theme';
import RadioButton from '~shared/components/RadioButton';
import {commonActions} from '~reduxCore/reducers';
import ListOrder from './ListOrder';

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [stringSearch, setStringSearch] = useState('');
  const [page, setPage] = useState(1);
  const [stopLoad, setStopLoad] = useState(false);
  const [dataListOrder, setDataListOrder] = useState(false);
  const [optionSearch, setOptionSearch] = useState(1);

  // Search product
  const handleSearchProduct = async () => {};

  // handle get list  data order
  const getListOrder = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        loai: 10,
        type: optionSearch,
        laynhieudon: 1,
        stringsearch: stringSearch,
        idcuahang: 0,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        setDataListOrder(data);
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(commonActions.getListOrder(payload));
  };

  const options = [
    {label: 'Số điện thoại', value: 1},
    {label: 'Mã đơn hàng', value: 2},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.content}>
        <View style={styles.wrapNotifile}>
          <Text style={styles.textnotify}>{t('textNotifyOrder')}</Text>
        </View>
        <RadioButton
          styleContainer={styles.containerRadio}
          options={options}
          selected={optionSearch}
          onValueChange={value => setOptionSearch(value)}
        />
        <InputSearch
          placeholder={t('searchOrder')}
          getString={value => setStringSearch(value)}
          onSearch={() => getListOrder()}
        />
        <ListOrder data={dataListOrder} />
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
  wrapNotifile: {
    marginVertical: Sizes.magin,
    marginHorizontal: Sizes.magin,
    padding: Sizes.padding,
  },
  textnotify: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 13,
    color: Colors.dark,
  },
  containerRadio: {
    flexDirection: 'row',
    marginHorizontal: Sizes.magin,
  },
});
