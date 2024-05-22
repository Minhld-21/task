import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes, parseSize} from '~theme';
import {commonActions} from '~reduxCore/reducers';
import LabelView from '~shared/components/Label/LabelView';
import currencyFormat from '~helper/currencyFormat';

export default Index = ({getDiscount}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState('');
  const [editable, setEditable] = useState(true);
  const [data, setData] = useState();

  const checkDiscountCode = () => {
    const payload = {
      params: {
        loai: 62,
        magiamgias: discountCode,
      },
      onSuccess: async data => {
        setData(data);
        setEditable(false);
        getDiscount({
          MaGiamGia: data?.MaGiamGia,
          LoaiGiamGia: data?.LoaiGiamGia,
          SoTienGiamGia: data?.SoTienGiamGia,
          TyLeGiamGia: data?.TyLeGiamGia,
          success: '01',
        });
        data?.SoTienGiamGia > 0
          ? setDiscountCode(
              `Giảm ${currencyFormat(data?.SoTienGiamGia)} ${t(
                data?.LoaiGiamGia,
              )}`,
            )
          : setDiscountCode(
              `Giảm ${data?.TyLeGiamGia}% ${t(data?.LoaiGiamGia)}`,
            );
      },
      onError: async err => {
        await showMessage({
          duration: 3000,
          message: t('errorDiscount'),
          type: 'danger',
        });
        await setDiscountCode('');
      },
    };
    dispatch(commonActions.checkDiscountCode(payload));
  };
  const handleReset = () => {
    setData();
    setDiscountCode('');
    getDiscount({
      MaGiamGia: '',
      LoaiGiamGia: 'BILLING',
      SoTienGiamGia: 0,
      TyLeGiamGia: 0.0,
      success: '00',
    });
    setEditable(true);
  };
  return (
    <View style={styles.container}>
      <LabelView
        title={t('discountCode')}
        styleLabelView={styles.styleLabelView}>
        <View style={styles.wrapInput}>
          <TextInput
            maxLength={10}
            style={
              data?.success === '01' ? styles.textInputActive : styles.textInput
            }
            value={discountCode != null ? discountCode.toString() : ''}
            onChangeText={text => setDiscountCode(text)}
            onBlur={discountCode != '' ? checkDiscountCode : null}
            returnKeyType={'done'}
            editable={editable}
          />
          {data?.success === '01' ? (
            <TouchableOpacity onPress={handleReset}>
              <Icon style={styles.iconRemove} name="close" />
            </TouchableOpacity>
          ) : null}
        </View>
      </LabelView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Sizes.margin,
  },
  content: {
    paddingHorizontal: Sizes.margin,
  },
  styleLabelView: {
    flex: 1,
    marginTop: parseSize(5),
  },
  wrapInput: {
    borderBottomWidth: Sizes.border,
    borderBottomColor: Colors.border,
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding / 4,
    marginHorizontal: Sizes.margin / 4,
    backgroundColor: Colors.white,
    borderRadius: Sizes.radius / 2,
  },
  textInput: {
    padding: 0,
    height: parseSize(30),
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  textInputActive: {
    padding: 0,
    height: parseSize(30),
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.danger,
  },
  iconRemove: {
    position: 'absolute',
    right: 10,
    top: -25,
    color: Colors.danger,
  },
});
