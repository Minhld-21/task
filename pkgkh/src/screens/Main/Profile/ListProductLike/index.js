import Config from 'react-native-config';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '~navigator/navigationUtils';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Fontisto';

import styles from './styles';
import {Sizes} from '~theme';
import currencyFormat from '~helper/currencyFormat';
import NoImage from '~assets/images/no-pictures.png';
import {
  commonSelectors,
  orderActions,
  commonActions,
} from '~reduxCore/reducers';
import Like from '~shared/components/Like';
import BuyToCart from '~shared/components/BuyToCart';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  // init data
  const [visibleScrollTop, setVisibleScrollTop] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const listProductRef = useRef(null);
  // get data likes
  const dataLikes = useSelector(state => commonSelectors.getLike(state));
  // set data for list product
  useEffect(() => {
    const updatedListProduct = [];
    dataLikes.map(item => {
      getProductById(item?.IDSanPham, item?.SoLuong, updatedListProduct);
    });
    setListProduct(updatedListProduct);
  }, [dataLikes]);
  // get product by id
  const getProductById = async (idsanphams, soluong, updatedListProduct) => {
    const payload = await {
      params: {
        idsanphams: idsanphams,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        updatedListProduct.push({...data, SoLuongMua: soluong});
        setListProduct([...updatedListProduct]); // Cập nhật listProduct sau khi getProductById
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(orderActions.getProductById(payload));
  };
  // handle on button scroll when offset >0
  const handleScroll = event => {
    if (event.nativeEvent.contentOffset.y > 0) {
      setVisibleScrollTop(true);
    } else {
      setVisibleScrollTop(false);
    }
  };
  // handle scroll to top
  const scrollToTop = () => {
    if (listProductRef.current) {
      listProductRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };
  // render Product
  const renderListProduct = ({item}) => {
    return (
      <SafeAreaView style={styles.wrapItemProduct}>
        <TouchableOpacity
          onPress={() =>
            navigate('detailProduct', {productCode: item?.IDSanPham})
          }>
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
              source={{uri: Config.API_URL_WEB + item?.URLImage}}
            />
          )}
          <View style={styles.wrapDetailProduct}>
            <Text style={styles.textNameProduct}>{item?.TenSanPham}</Text>
            <View style={styles.wrapPrice}>
              <Text style={styles.textPrice}>
                {item?.GiaBan > 0
                  ? currencyFormat(item?.GiaBan)
                  : t('contactPrice')}
              </Text>
            </View>
            <View style={styles.groupIcon}>
              <Like
                productCode={item?.IDSanPham}
              />
              <BuyToCart productCode={item?.IDSanPham} />
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{marginTop: Sizes.margin}}
        data={listProduct}
        numColumns={2}
        renderItem={renderListProduct}
        keyExtractor={listProduct?.IDSanPham}
        onScroll={event => handleScroll(event)}
        ref={listProductRef}
      />
      {visibleScrollTop == true ? (
        <View style={styles.scrollToTopButtonContainer}>
          <TouchableOpacity onPress={scrollToTop}>
            <Icon style={styles.iconToTop} name="arrow-up" />
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default Index;
