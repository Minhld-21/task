import React, {useState, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Sizes, parseSize} from '~theme';
import {commonActions} from '~reduxCore/reducers';
import CustomerPicker from '~components/DropDownPicker';

export default Index = props => {
  const dispatch = useDispatch();
  const {defaultCustomer, getDataSelect} = props;
  const [dataCustomer, setDataCustomer] = useState([]);
  const [customerDefault, setCustomerDefault] = useState();
  // Load data
  useEffect(() => {
    getListCustomer();
  }, []);

  // get data city
  const getListCustomer = async () => {
    const payload = await {
      params: {
        loai: 42,
      },
      onSuccess: data => {
        handleData(data);
      },
      onError: () => {
        showMessage({
          duration: 3000,
          message: 'Load danh sách bảo hành thất bại',
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.getListUser(payload));
  };
  // handle data city
  const handleData = async data => {
    const transformedData = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const dataItem = {
        value: index.toString(),
        label: `${item?.Ho} ${item?.Ten} ${item?.DienThoai}`,
        token: item?.Token,
      };
      if (item?.value == defaultCustomer) {
        setCustomerDefault(index.toString());
      }
      transformedData.push(dataItem);
    }
    await setDataCustomer(transformedData);
  };
  // find cty select
  const handleSelectValue = value => {
    const dataFind = dataCustomer.find(item => item.value == value);
    if (dataFind) getDataSelect(dataFind);
  };
  return (
    <View>
      <CustomerPicker
        data={dataCustomer}
        style={styles.styleSelectBox}
        labelStyle={styles.labelStyleSelect}
        itemKey={dataCustomer?.value}
        searchable={true}
        searchPlaceholder={'Tìm kiếm...'}
        onOpen={handleData}
        onSelect={value => handleSelectValue(value)}
        listMode={'MODAL'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  styleSelectBox: {
    borderWidth: 0,
    minHeight: parseSize(40),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  labelStyleSelect: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  wrapTitleInfo: {
    marginHorizontal: Sizes.margin,
    borderBottomWidth: Sizes.border,
    borderBottomColor: Colors.border,
    paddingVertical: Sizes.padding,
  },
  textTitleInfo: {
    fontFamily: 'Hahmlet-Bold',
    fontSize: 14,
    color: Colors.green,
  },
  textTitleStyle: {
    position: 'relative',
    left: 10,
    fontFamily: 'Hahmlet-Regular',
    color: '#5B5353',
    fontSize: 8,
  },
});
