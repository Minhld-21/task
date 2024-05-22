import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Sizes, parseSize} from '~theme';
import NatioPicker from '~components/DropDownPicker';
import {commonActions} from '~reduxCore/reducers';

export default Index = props => {
  const dispatch = useDispatch();
  const {country, getDataSelect} = props;
  const [dataNatio, setDataNatio] = useState([]);

  // handle data city when list data city change
  useEffect(() => {
    getDataNatio();
  }, [country]);
  // get data city
  const getDataNatio = async () => {
    const payload = await {
      params: {
        loai: 'quocgia',
      },
      onSuccess: async data => {
        handleDataNatio(data);
      },
      onError: () => {},
    };
    await dispatch(commonActions.getNatio(payload));
  };
  // handle data city
  const handleDataNatio = async data => {
    const transformedData = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const dataItem = {
        value: item?.CountryCode,
        label: item?.CountryName,
        val: item?.CountryCode,
      };
      transformedData.push(dataItem);
    }
    await setDataNatio(transformedData);
  };

  const handleSelectValue = value => {
    const dataFind = dataNatio.find(natio => natio.value === value);
    getDataSelect({country: dataFind?.value, countryName: dataFind?.label});
  };
  return (
    <NatioPicker
      title={'Quốc Gia'}
      data={dataNatio}
      searchable={false}
      style={styles.styleSelectBox}
      labelStyle={styles.labelStyleSelect}
      defaultValue={country}
      itemKey={dataNatio?.CountryCode}
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
