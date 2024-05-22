import React, {useState} from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {View, Text, Image} from 'react-native';
import {Colors, Width, Height} from '~theme';

const emptyImg = require('~assets/images/wait-logo.png');
import Product from './components/ProductBlock';

const FlatlistPage = ({
  onPress,
  onSelect,
  onRefresh,
  onEndReached,
  onScroll,
  data,
  listProductRef,
  horizontal = false,
  type = '',
  grid = false,
  numColumns = 1,
  blur = false,
  iconOpen = true,
  fetching = false,
  loading = false,
  scrollEnabled = true,
  style,
  contentContainerStyleProp,
  columnWrapperStyleProp,
}) => {
  const [gridState, setGrid] = useState(grid);
  const changeLayout = () => {
    setGrid(!gridState);
  };

  const renderItem = ({item}) => {
    return (
      <View flex-center>
        {type === 'product' ? (
          <Product onPress={onPress} data={item} />
        ) : (
          <View />
        )}
      </View>
    );
  };

  const listFooter = loading ? (
    <View height={Height * 0.1} justifyContent={'center'}>
      <ActivityIndicator color={Colors.default} size={'large'} />
    </View>
  ) : null;

  const listEmpty = !data ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: Width * 0.8, height: Width * 0.5}}>
        <Image
          source={emptyImg}
          style={{width: '100%', height: '100%'}}
          resizeMode="stretch"
        />
      </View>
    </View>
  ) : null;

  return (
    <FlatList
      key={gridState ? 'grid' : 'row'}
      data={data || []}
      ref={listProductRef}
      horizontal={horizontal}
      numColumns={gridState ? numColumns : 1}
      style={[style, {padding: 0}]}
      contentContainerStyle={
        horizontal
          ? [{padding: 0, flexGrow: 1}, contentContainerStyleProp]
          : {width: 'auto', flexGrow: 1}
      }
      columnWrapperStyle={
        gridState
          ? [
              {justifyContent: 'space-between', width: Width * 0.95},
              columnWrapperStyleProp,
            ]
          : null
      }
      renderItem={renderItem}
      keyExtractor={(item, index) => `key${index}`}
      refreshing={fetching}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      onScroll={onScroll}
      removeClippedSubviews={true}
      refreshControl={
        scrollEnabled && (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={Colors.default}
            progressBackgroundColor={Colors.default}
          />
        )
      }
      ListFooterComponent={listFooter}
      ListEmptyComponent={listEmpty}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default React.memo(FlatlistPage);
