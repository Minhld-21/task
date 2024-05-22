import React, {useState, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, parseSize} from '~theme';
import {commonActions} from '~reduxCore/reducers';
import DropDownPicker from '~components/DropDownPicker';


export default Index = props => {
  const {t} = useTranslation();
    const dispatch = useDispatch();
  const {defaultMethod, onChange} = props;
  const [dataReceivingMethod, setDataReceivingMethod] = useState([]);
  const [ReceivingMethodDefault, setReceivingMethodDefault] = useState();

   // Load data
   useEffect(() => {
    getReceivingMethod();
  }, []);

  // get data 
  const getReceivingMethod = async () => {
    const payload = await {
      params: {
        loai: 251,
      },
      onSuccess: data => {
        handleData(data);
      },
      onError: () => {
        showMessage({
          duration: 3000,
          message: t('loadDataFail'),
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.getReceivingMethod(payload));
  };
  // handle data
  const handleData = async data => {
    const transformedData = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const dataItem = {
        value: index.toString(),
        label: item?.label,
        val: item?.value,
      };
      if (item?.value == defaultMethod) {
        setReceivingMethodDefault(index.toString());
      }
      transformedData.push(dataItem);
    }
    await setDataReceivingMethod(transformedData);
  };
  // find  select
  const handleSelectValue = value => {
    const dataFind = dataReceivingMethod.find(item => item.value == value);
    if (dataFind) {
        onChange(dataFind?.val);
    }
  };
  return (
    <DropDownPicker
      title={t('receivingMethod')}
      defaultValue={ReceivingMethodDefault}
      data={dataReceivingMethod}
      searchable={false}
      style={styles.styleSelectBox}
      labelStyle={styles.labelStyleSelect}
      onSelect={value => handleSelectValue(value)}
      listMode={'MODAL'}
    />
  );
};

const styles = StyleSheet.create({
  styleSelectBox: {
    borderWidth: 0,
    minHeight: parseSize(30),
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
    fontSize: 10,
  },
});

