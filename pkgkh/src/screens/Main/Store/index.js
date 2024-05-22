import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Keyboard, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import styles from './styles';
import {userSelectors, commonSelectors} from '~reduxCore/reducers';
import HeaderBarStore from '~components/HeaderBarStore';
import InputSearch from '~shared/components/inputs/InputSearch';
import {commonActions} from '~reduxCore/reducers';
import FlatList from '~shared/components/FlatList';
import Icon from 'react-native-vector-icons/Fontisto';

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [stringSearch, setStringSearch] = useState('');
  const [page, setPage] = useState(1);
  const [activeLoadMore, setActiveLoadMore] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [visibleScrollTop, setVisibleScrollTop] = useState(false);
  const listProductRef = useRef(null);

  const user = useSelector(state => userSelectors.getUserData(state));
  const products = useSelector(state => commonSelectors.setListProduct(state));

  // Search product
  const handleSearchProduct = async () => {
    await dispatch(commonActions.setListProduct({reset: true}));
    await setPage(1);
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        loai: 1,
        sotrang: 1,
        soitem: 10,
        timkiem: stringSearch,
      },
      onSuccess: async () => {
        await dispatch(commonActions.toggleLoading(false));
        await setActiveLoadMore(false);
        await setPage(2);
        await setActiveLoadMore(true);
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
        await setFetching(false);
        await setActiveLoadMore(false);
      },
    };
    await dispatch(commonActions.getListProduct(payload));
  };

  useEffect(() => {
    getListProduct();
  }, []);
  // reset list product when user change
  useEffect(() => {
    handleSearchProduct();
  }, [user]);

  //get data product
  const getListProduct = async () => {
    await Keyboard.dismiss();
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        loai: 1,
        sotrang: page,
        soitem: 10,
        timkiem: stringSearch,
      },
      onSuccess: async () => {
        await setFetching(false);
        await setPage(page + 1);
        await setActiveLoadMore(true);
        await dispatch(commonActions.toggleLoading(false));
      },
      onError: async () => {
        await setFetching(false);
        await setActiveLoadMore(false);
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(commonActions.getListProduct(payload));
  };
  // load more
  const handleLoadMore = async () => {
    if (activeLoadMore === true) {
      await setFetching(true);
      await getListProduct();
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBarStore />
      <View style={styles.content}>
        <InputSearch
          placeholder={t('search product')}
          getString={value => setStringSearch(value)}
          onSearch={() => handleSearchProduct()}
        />
        <FlatList
          style={styles.styleFlatList}
          data={products}
          listProductRef={listProductRef}
          onScroll={event => handleScroll(event)}
          grid={true}
          numColumns={2}
          loading={false}
          fetching={fetching}
          onEndReached={() => {
            if (activeLoadMore) {
              handleLoadMore();
            }
          }}
          type="product"
          columnWrapperStyleProp={styles.columnWrapperStyleProp}
        />
        {visibleScrollTop == true ? (
          <View style={styles.scrollToTopButtonContainer}>
            <TouchableOpacity onPress={scrollToTop}>
              <Icon style={styles.iconToTop} name="arrow-up" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
