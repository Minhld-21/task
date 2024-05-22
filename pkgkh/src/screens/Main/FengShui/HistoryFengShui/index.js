import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {navigate} from '~navigator/navigationUtils';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import {commonActions, userSelectors} from '~reduxCore/reducers';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';
import InputSearch from '~shared/components/inputs/InputSearch';
import ListFengShui from './ListFengShui';

export default Index = props => {
  const dispatch = useDispatch();
  // init state
  const [stringSearch, setStringSearch] = useState('');
  const [listFengShui, setListFengShui] = useState([]);
  const userInfo = useSelector(state => userSelectors.getUserData(state));

  // get all Buyer when load first
  useFocusEffect(
    React.useCallback(() => {
      historyNumerologies();
    }, [navigate]),
  );

  const historyNumerologies = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        chuoitimkiem: stringSearch,
        idnguoitao: userInfo?.IDNguoiDung,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        await setListFengShui(data);
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: 'Không tìm thấy dữ liệu ',
          type: 'danger',
        });
        await setListFengShui([]);
      },
    };
    await dispatch(commonActions.historyNumerologies(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle="Danh sách luận giải số mệnh" />
      <View style={styles.content}>
        <InputSearch
          placeholder={'Nhập số điện thoại hoặc tên KH'}
          getString={value => setStringSearch(value)}
          onSearch={() => historyNumerologies()}
        />
        <ListFengShui data={listFengShui} />
      </View>
    </SafeAreaView>
  );
};
