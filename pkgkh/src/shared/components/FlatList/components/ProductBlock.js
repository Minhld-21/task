import Config from 'react-native-config';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {navigate} from '~navigator/navigationUtils';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, parseSize, Width} from '~theme';
import currencyFormat from '~helper/currencyFormat';
import NoImage from '~assets/images/no-pictures.png';
import Like from '~shared/components/Like';
import BuyToCart from '~shared/components/BuyToCart';

const Index = props => {
  const {data} = props;
  const {t} = useTranslation();
  // render Product
  return (
    <SafeAreaView style={styles.wrapItemProduct}>
      <TouchableOpacity
        onPress={() =>
          navigate('detailProduct', {productCode: data?.IDSanPham})
        }>
        {data?.URLImage == null ? (
          <Image
            resizeMode={'stretch'}
            style={styles.imgProduct}
            source={NoImage}
          />
        ) : (
          <Image
            resizeMode={'stretch'}
            style={styles.imgProduct}
            source={{uri: Config.API_URL_WEB + data?.URLImage}}
          />
        )}
        <View style={styles.wrapDetailProduct}>
          <Text style={styles.textNameProduct}>{data?.TenSanPham}</Text>
          <View style={styles.wrapPrice}>
            <Text style={styles.textPrice}>
              {data?.GiaBan > 0
                ? currencyFormat(data?.GiaBan)
                : t('contactPrice')}
            </Text>
          </View>
          <View style={styles.groupIcon}>
            <Like
              productCode={data?.IDSanPham}
              numberLike={data?.SoLuongYeuThich}
            />
            <BuyToCart productCode={data?.IDSanPham} />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Index;

const styles = StyleSheet.create({
  wrapListProdut: {
    marginTop: Sizes.margin,
  },
  wrapItemProduct: {
    width: Width * 0.5 - 20,
    marginVertical: Sizes.margin / 2,
    marginHorizontal: Sizes.margin / 2,
    backgroundColor: '#FFF7F2',
    borderWidth: Sizes.border,
    borderColor: Colors.border,
    borderRadius: Sizes.radius,
  },
  imgProduct: {
    height: Width * 0.5,
    width: Width * 0.5 - 20,
    borderRadius: Sizes.radius,
    alignSelf: 'center',
  },
  wrapDetailProduct: {
    flex: 1,
    marginHorizontal: Sizes.margin,
    marginVertical: Sizes.margin,
  },
  wrapPrice: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: Sizes.margin / 2,
  },
  textNameProduct: {
    fontFamily: 'Hahmlet-Bold',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  textPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.warning,
  },
  textQuality: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  groupIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollToTopButtonContainer: {
    position: 'absolute',
    bottom: parseSize(10),
    right: parseSize(10),
    backgroundColor: Colors.default,
    padding: Sizes.padding,
    borderRadius: Sizes.radius * 2,
  },
  iconToTop: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 18,
    color: Colors.white,
  },
  textNoProduct: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.danger,
  },
});
