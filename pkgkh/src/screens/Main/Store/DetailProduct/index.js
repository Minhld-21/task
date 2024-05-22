import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {navigate} from '~navigator/navigationUtils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';
import RenderHtml from 'react-native-render-html';

import moment from 'moment';

import styles from './styles';
import {Width} from '~theme';

import HeaderBarStore from '~components/HeaderBarStore';
import HeaderTitle from '~components/HeaderTitle';
import {commonActions} from '~reduxCore/reducers';
import Like from '~shared/components/Like';
import currencyFormat from '~helper/currencyFormat';
import BuyToCart from '~shared/components/BuyToCart';

const link = Config.API_URL_WEB;
export default Index = props => {
  const {productCode} = props.route?.params;
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [description, setDescription] = useState('');

  useEffect(() => {
    getDetailProduct();
  }, []);

  //get data product
  const getDetailProduct = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        idsanpham: productCode,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        await setProduct(data);
        const source = {
          html: `
          ${data?.MoTa === null ? '' : data?.MoTa}
        `,
        };
        await setDescription(source);
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(commonActions.getDetailProduct(payload));
  };

  const MyCarousel = () => {
    // Tạo một mảng chứa các URL hình ảnh không rỗng
    const imageUrls = [
      product?.URLImage,
      product?.URLImage2,
      product?.URLImage3,
      product?.URLImage4,
      product?.URLImage5,
    ].filter(url => url);
    return (
      <Swiper>
        {imageUrls.map((url, index) => (
          <View key={index} style={styles.wrapImage}>
            <Image
              resizeMode="stretch"
              source={{uri: `${link}${url}`}}
              style={styles.imageProduct}
            />
          </View>
        ))}
      </Swiper>
    );
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBarStore />
      <HeaderTitle nameHeaderTitle={t('detailProduct')} />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.wrapListImage}>
          <MyCarousel />
          <Like
            styleContainer={styles.containerLike}
            styleIcon={styles.iconLike}
            productCode={productCode}
          />
        </View>
        <View style={styles.wrapInfo} />
        <Text style={styles.nameProduct}>{product?.TenSanPham}</Text>
        <View style={styles.groupPriceCart}>
          <View style={styles.wrapPrice}>
            <Text style={styles.textPrice}>
              {product?.GiaBan > 0
                ? currencyFormat(product?.GiaBan)
                : t('contactPrice')}
            </Text>
          </View>
          <BuyToCart
            styleContainer={styles.containerCart}
            styleIcon={styles.iconCart}
            productCode={productCode}
          />
        </View>
        <View style={styles.wrapDescription}>
          <Text style={styles.titleDesciption}>{t('titleDesciption')}</Text>
          <RenderHtml contentWidth={Width} source={description} />
        </View>
        <View style={styles.wrapBranch}>
          <Text style={styles.nameBranch}>{product?.TenCuaHang}</Text>
          <View style={styles.groupAddress}>
            <Text style={styles.titleBranch}>Địa chỉ showroom: </Text>
            <Text style={[styles.valueBranch,{textAlign:'center'}]}>{product?.DiaChiCuaHang}</Text>
          </View>
          <View style={styles.groupDetail}>
            <Text style={styles.titleBranch}>Điện thoại: </Text>
            <Text style={styles.valueBranch}>{product?.DienThoaiCuaHang}</Text>
          </View>
          <View style={styles.groupDetail}>
            <Text style={styles.titleBranch}>Email: </Text>
            <Text style={styles.valueBranch}>{product?.EmailCuaHang}</Text>
          </View>
          <View style={styles.wrapLogo}>
          <Image
              resizeMode="contain"
              source={{uri: `${link}/_imageslibrary/logo.png`}}
              style={styles.logoFooter}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
