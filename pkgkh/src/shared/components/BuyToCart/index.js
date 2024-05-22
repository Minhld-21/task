import React from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Fontisto';

import {Colors, Sizes, parseSize, Height, Width} from '~theme';
import {orderActions, orderSelectors, userSelectors} from '~reduxCore/reducers';

const Index = ({styleContainer, styleIcon, productCode}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  // get data carts
  const dataCarts = useSelector(state => orderSelectors.getCart(state));
  // check cart
  const checkCart = dataCarts.some(carts => carts?.IDSanPham === productCode);
  // get data user
  const user = useSelector(state => userSelectors.getUserData(state));

  // hanlde click buy product
  const handleClickCart = async () => {
    if (user) {
      const payload = {
        params: {
          type: checkCart == true ? 'REMOVE_FROM_CART' : 'ADD_TO_CART',
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
      checkCart === false
        ? dispatch(orderActions.addToCart(payload))
        : dispatch(orderActions.removeFromCart(payload));
    }
  };
  return (
    <SafeAreaView style={styleContainer || styles.container}>
      <TouchableOpacity
        style={styles.wrapCart}
        onPress={() => handleClickCart()}>
        <Icon
          style={[
            styleIcon || styles.iconCart,
            {color: checkCart === true ? Colors.info : Colors.dark},
          ]}
          name="shopping-basket-add"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.margin,
  },
  iconCart: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 24,
    color: Colors.dark,
  },
});
