import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors, Sizes} from '~theme';

export default Index = ({listProduct}) => {
  const listContactOrder = listProduct.filter(item => item.GiaSauGiam === 0);
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      {listContactOrder && listContactOrder.length > 0 ? (
        <View style={styles.content}>
          <View style={styles.wrapNameProduct}>
            <Text style={styles.textProductName}>Sản phẩm </Text>
            {listContactOrder.map((item, index) => (
              <React.Fragment key={item.IDSanPham}>
                <Text style={styles.textNameProduct}>{item?.TenSanPham}</Text>
                {index !== listContactOrder.length - 1 && (
                  <Text style={styles.comma}>, </Text>
                )}
              </React.Fragment>
            ))}
            <Text style={styles.textProductName}>
              chưa được tính trong đơn hàng. Cửa hàng sẽ liên hệ lại với bạn
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Sizes.margin,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: Sizes.margin,
  },
  textNameProduct: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.red,
  },
  wrapNameProduct: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderColor: Colors.border,
    borderWidth: 2,
    padding: Sizes.padding / 2,
  },
  textProductName: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  comma: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.red,
  },
});
