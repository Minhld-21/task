import Config from 'react-native-config';
import React, {useEffect} from 'react';

import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {navigate} from '~navigator/navigationUtils';

import styles from './styles';
import currencyFormat from '~helper/currencyFormat';
import NoImage from '~assets/images/no-pictures.png';
import {orderActions, orderSelectors, userSelectors} from '~reduxCore/reducers';

const link = Config.API_URL_WEB;

export default Index = ({dataProduct}) => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  // get data carts
  const dataCarts = useSelector(state => orderSelectors.getCart(state));
  useEffect(() => {
    if (dataCarts.length === 0) {
      navigate('emptyCart');
    }
  }, [dataCarts]);

  // get data user
  const user = useSelector(state => userSelectors.getUserData(state));
  const hanldeRemoveProduct = async productCode => {
    // check cart
    const checkCart = dataCarts.some(carts => carts?.IDSanPham === productCode);
    if (checkCart) {
      handleUpdateCart(productCode, 'REMOVE_FROM_CART');
    }
  };
  const clickDecrease = async productCode => {
    // check cart
    const checkCart = dataCarts.some(
      carts => carts?.IDSanPham === productCode && carts?.SoLuong > 1,
    );
    if (checkCart) {
      handleUpdateCart(productCode, 'DESCREASE_NUMBER_OF_PRODUCT');
    }
  };
  const clickIncrease = async productCode => {
    // check cart
    const checkCart = dataCarts.some(carts => carts?.IDSanPham === productCode);
    if (checkCart) {
      handleUpdateCart(productCode, 'INCREASE_NUMBER_OF_PRODUCT');
    }
  };

  // hanlde click buy product
  const handleUpdateCart = async (productCode, type) => {
    if (user) {
      const payload = {
        params: {
          type: type,
          idnguoidung: user?.IDNguoiDung,
          idsanpham: productCode,
          soluong: 1,
        },
        onSuccess: async () => {},
        onError: async () => {},
      };
      dispatch(orderActions.setCart(payload));
    } else {
      const payload = {idsanpham: productCode, soluong: 1};
      type === 'REMOVE_FROM_CART'
        ? dispatch(orderActions.removeFromCart(payload))
        : type === 'DESCREASE_NUMBER_OF_PRODUCT'
        ? dispatch(orderActions.descreaseNumberOfProduct(payload))
        : dispatch(orderActions.increaseNumberOfProduct(payload));
    }
  };
  const data = [...dataProduct].sort((a, b) => a.IDSanPham - b.IDSanPham);
  return (
    <View>
      {data &&
        data.map((item, index) => {
          return (
            <View style={styles.wrapItemProduct} key={index}>
              <View style={styles.wrapInfoProduct}>
                <TouchableOpacity
                  style={styles.wrapIconRemove}
                  onPress={() => hanldeRemoveProduct(item?.IDSanPham)}>
                  <Icon style={styles.iconRemove} name="close" />
                </TouchableOpacity>
                {item?.URLImage == null ? (
                  <Image
                    resizeMode={'stretch'}
                    style={styles.imgProduct}
                    source={NoImage}
                  />
                ) : (
                  <Image
                    resizeMode={'stretch'}
                    style={styles.imgProduct}
                    source={{uri: link + item?.URLImage}}
                  />
                )}
                <View style={styles.wrapDetailProduct}>
                  <Text style={styles.textNameProduct}>{item?.TenSanPham}</Text>
                  <Text style={styles.textProductCode}>{item?.MaSanPham}</Text>
                  <View style={styles.wrapPrice}>
                    <Text style={styles.textPrice}>
                      {item?.GiaSauGiam > 0
                        ? currencyFormat(item?.GiaSauGiam)
                        : t('contactPrice')}
                    </Text>
                  </View>
                  <View style={styles.wrapQuality}>
                    <TouchableOpacity
                      onPress={() => clickDecrease(item?.IDSanPham)}
                      style={styles.wrapChangeQuality}>
                      <Text style={styles.textQuality}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapNumberQuality}>
                      <Text style={styles.textQuality}>{item?.SoLuongMua}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => clickIncrease(item?.IDSanPham)}
                      style={styles.wrapChangeQuality}>
                      <Text style={styles.textQuality}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};
