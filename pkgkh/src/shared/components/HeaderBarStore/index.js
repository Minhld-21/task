import React from 'react';
import {useSelector} from 'react-redux';
import {navigate} from '~navigator/navigationUtils';
import {TouchableOpacity, Text, View, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

import Logo from '~assets/images/logo.png';
import {orderActions, orderSelectors} from '~reduxCore/reducers';
import styles from './styles';

export default HeaderBar = () => {
  const dataCarts = useSelector(state => orderSelectors.getCart(state));
  let numberProduct =
    dataCarts && dataCarts.length > 0
      ? dataCarts.reduce((total, item) => total + (item.SoLuong || 0), 0)
      : 0;
  const goToDetailCart = () => {
    if (numberProduct > 0) {
      navigate('detailCart');
    } else {
      navigate('emptyCart');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable style={styles.wrapLogo} onPress={() => navigate('store')}>
          <Image source={Logo} style={styles.logoStyle} />
        </Pressable>
        {Config.ENVIROMENT === 'DEV' ? (
          <View style={styles.wrapEnv}>
            <Text style={styles.textEnv}>{Config.ENVIROMENT}</Text>
          </View>
        ) : null}
        <View style={styles.wrapRightHeaderBar}>
          <TouchableOpacity onPress={() => goToDetailCart()}>
            <Icon name="cart-outline" style={styles.icon} />
            {numberProduct > 0 ? (
              <View style={styles.wrapNumberProduct}>
                <Text style={styles.numberProduct}>{numberProduct}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
