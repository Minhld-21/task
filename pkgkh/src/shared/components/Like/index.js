import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IconHeart from 'react-native-vector-icons/FontAwesome';

import {
  commonActions,
  commonSelectors,
  userActions,
  userSelectors,
} from '~reduxCore/reducers';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

const Index = ({styleContainer, styleIcon, productCode, numberLike}) => {
  const dispatch = useDispatch();
  // get data user
  const user = useSelector(state => userSelectors.getUserData(state));
  // get data likes
  const dataLikes = useSelector(state => commonSelectors.getLike(state));
  // check status like
  const status = dataLikes.some(likes => likes?.IDSanPham === productCode);
  // hanlde click like product
  const handleClickHeart = async () => {
    if (user === null) {
      showMessage({
        duration: 3000,
        message: 'Bạn cần đăng nhập để lưu lại sản phẩm yêu thích',
        type: 'info',
      });
      dispatch(userActions.toggleModalLogin(false));
    } else {
      const payload = {
        params: {
          yeuthich: status === true ? -1 : 1,
          idnguoidung:
            user?.IDNguoiDung === undefined ? null : user?.IDNguoiDung,
          idsanpham: productCode,
        },
        onSuccess: async () => {
          dispatch(
            commonActions.updateLike({
              idsanpham: productCode,
              islike: !status,
            }),
          );
        },
        onError: async () => {},
      };
      dispatch(commonActions.handleLike(payload));
    }
  };
  return (
    <View style={styleContainer || styles.container}>
      <TouchableOpacity
        style={styles.wrapLike}
        onPress={() => handleClickHeart()}>
        {status === true ? (
          <View style={styles.wrapHeart}>
            <IconHeart
              style={[styleIcon || styles.icon, {color: Colors.red}]}
              name="heart"
            />
            <Text style={styles.numberLike}>
              {numberLike !== undefined ? numberLike : null}
            </Text>
          </View>
        ) : (
          <View style={styles.wrapHeart}>
            <IconHeart
              style={[styleIcon || styles.icon, {color: Colors.dark}]}
              name="heart-o"
            />
            <Text style={styles.numberLike}>
              {numberLike !== undefined ? numberLike : null}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.margin,
  },
  groupIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 24,
    color: Colors.dark,
  },
  wrapHeart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberLike: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});
