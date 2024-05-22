import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {navigate} from '~navigator/navigationUtils';
import moment from 'moment';
import {Colors, Sizes, parseSize} from '~theme';
import {commonActions} from '~reduxCore/reducers';

const Index = props => {
  const {data} = props;
  const dispatch = useDispatch();

  // render list order Flatlist
  const _renderLisOrder = ({item}) => {
    const goToDetail = async data => {
      await dispatch(commonActions.toggleLoading(true));
      const payload = await {
        params: {
          igencode: data?.IGenCode,
          ngaythexuat: moment(data?.NgayHeThong).format('YYYY-MM-DD HH:mm:ss'),
        },
        onSuccess: async data => {
          await navigate('resultfengshui', {data: data});
          await dispatch(commonActions.toggleLoading(false));
        },
        onError: async mess => {
          await dispatch(commonActions.toggleLoading(false));
          showMessage({
            duration: 3000,
            message: mess,
            type: 'danger',
          });
        },
      };
      await dispatch(commonActions.getNumerologies(payload));
    };
    return (
      <TouchableOpacity
        style={styles.warpItemOrder}
        onPress={() => goToDetail(item)}>
        <View style={styles.wrapInfoFengShui}>
          <View style={styles.InfoFengShui}>
            <Text style={styles.titleInfo}>IGenCode: </Text>
            <Text style={styles.textIGenCode}>{item?.IGenCode}</Text>
          </View>
        </View>
        <View style={styles.wrapInfoFengShui}>
          <View style={styles.InfoFengShui}>
            <Text style={styles.titleInfo}>Tên khách hàng: </Text>
            <Text style={styles.valueInfo}>
              {item?.HoTenGoc || item?.HoTen}
            </Text>
          </View>
        </View>
        <View style={styles.wrapInfoFengShui}>
          <View style={styles.InfoFengShui}>
            <Text style={styles.titleInfo}>Điện thoại: </Text>
            <Text style={styles.valueInfo}>{item?.SoDienThoai}</Text>
          </View>
          <View style={styles.InfoFengShui}>
            <Text style={styles.titleInfo}>Ngày sinh: </Text>
            <Text style={styles.valueInfo}>
              {moment(item?.SinhNhat).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.wrapDate}>
          <Text style={styles.titleInfo}>Thẻ ngày xuất: </Text>
          <Text style={styles.textDateOrder}>
            {moment(item?.NgayHeThong).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={_renderLisOrder}
          keyExtractor={data?.MaDonHang}
        />
      </View>
    </SafeAreaView>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightWhite,
  },
  content: {
    flex: 1,
    marginVertical: Sizes.margin,
  },
  warpItemOrder: {
    marginTop: Sizes.margin,
    height: parseSize(100),
    backgroundColor: Colors.white,
    borderColor: Colors.darkGrey,
    borderWidth: Sizes.border,
    paddingHorizontal: Sizes.padding * 2,
    paddingVertical: Sizes.padding,
    borderRadius: Sizes.radius,
  },
  wrapInfoFengShui: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InfoFengShui: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInfo: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.dark,
  },
  valueInfo: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.price,
  },
  textDateOrder: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.info,
  },
  textTotalPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.warning,
  },
  textIGenCode: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'blue',
  },
  wrapDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
