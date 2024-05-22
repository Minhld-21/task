import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {navigate} from '~navigator/navigationUtils';
import moment from 'moment';

import {Colors, Sizes, parseSize} from '~theme';
import currencyFormat from '~helper/currencyFormat';

const Index = props => {
  const {t} = useTranslation();
  const {data} = props;

  // render list order Flatlist
  const _renderLisOrder = ({item}) => {
    const handleClickOrder = dataOrder => {
      navigate('detailOrder', {orderCode: dataOrder?.MaDonHang});
    };
    return (
      <TouchableOpacity
        style={styles.warpItemOrder}
        onPress={() => handleClickOrder(item)}>
        <View style={styles.wrapInfoOrder}>
          <View style={styles.InfoOrder}>
            <Text style={styles.textOrderCode}>
              <Text style={styles.titleInfo}>{t('orderNumber')}: </Text>
              {item?.MaDonHang}
            </Text>
            <Text style={styles.textOrderCode}>
              <Text style={styles.titleInfo}>{t('nameReciving')}: </Text>
              {item?.NguoiNhan}
            </Text>
            <Text style={styles.textOrderCode}>
              <Text style={styles.titleInfo}>{t('phoneReciving')}: </Text>
              {item?.DienThoaiKhachHang}
            </Text>
            <Text style={styles.textOrderCode}>
              <Text style={styles.titleInfo}>{t('buyDate')}: </Text>
              {moment(item?.NgayDatHang).format('DD/MM/YYYY HH:mm:ss')}
            </Text>
            <Text style={styles.textOrderCode}>
              <Text style={styles.titleInfo}>{t('address')}: </Text>
              {item?.DiaChiNhan}, {item?.ThanhPhoNhan}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.wrapTotal}>
          <View style={styles.groupTotal}>
            <Text style={styles.labelTotal}>{t('totalProducts')}</Text>
            <Text style={styles.valueTotal}>
              {item?.TongSoLuong} {t('products')}
            </Text>
          </View>
          <View style={styles.groupTotal}>
            <Text style={styles.labelTotal}>{t('totalAmount')}:</Text>
            <Text style={styles.valueTotalPrice}>
              {currencyFormat(item?.TongSoTienThanhToan)}
            </Text>
          </View>
          <View style={styles.groupTotal}>
            <Text style={styles.labelTotal}>{t('receivingMethod')}:</Text>
            <Text style={styles.valueTotal}>
              {item?.HinhThucNhanHang === 1
                ? t('shiping')
                : item?.HinhThucNhanHang === 2
                ? t('recevingAtShop')
                : 'directSales'}
            </Text>
          </View>
          <View style={styles.groupTotal}>
            <Text style={styles.labelTotal}>{t('statusOrder')}:</Text>
            <Text style={styles.valueTotal}>{item?.TinhTrangDonHang}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={_renderLisOrder}
          keyExtractor={data?.MaDonHang}
        />
      </View>
    </SafeAreaView>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightWhite,
  },
  content: {
    flex: 1,
    marginVertical: Sizes.margin,
  },
  warpItemOrder: {
    marginTop: Sizes.margin,
    backgroundColor: Colors.white,
    borderColor: Colors.darkGrey,
    borderWidth: Sizes.border,
    paddingHorizontal: Sizes.padding * 2,
    paddingVertical: Sizes.padding,
    borderRadius: Sizes.radius,
  },
  wrapInfoOrder: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  InfoOrder: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.dark,
  },
  valueInfo: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  textDateOrder: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 14,
    color: Colors.lightDark,
  },
  textTotalPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.warning,
  },
  textOrderCode: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 13,
    color: Colors.dark,
  },
  line: {
    marginVertical: Sizes.margin,
    width: '100%',
    height: 5,
    backgroundColor: Colors.border,
  },
  wrapTotal: {
    flex: 1,
  },
  groupTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingVertical: Sizes.padding,
  },
  labelTotal: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark,
  },
  valueTotal: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.warning,
  },
  valueTotalPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.warning,
  },
});
