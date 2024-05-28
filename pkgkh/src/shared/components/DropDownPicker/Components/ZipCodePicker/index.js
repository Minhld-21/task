import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, parseSize} from '~theme';
import {commonActions, commonSelectors} from '~reduxCore/reducers';
import DropDownPicker from '~components/DropDownPicker';

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {country, city, defaultZipCode, getDataSelect} = props;
  const [dataZipCode, setDataZipCode] = useState([]);
  const [zipCodeDefault, setZipCodeDefault] = useState();
  useEffect(() => {
    getDataZipCode();
  }, [city, defaultZipCode]);

  // get data ZipCode
  const getDataZipCode = async () => {
    const payload = await {
      params: {
        loai: 'zipcode',
        CountryCode: country,
        StateCode: city,
      },
      onSuccess: data => {
        handleDataZipCode(data);
      },
      onError: () => {
        setDataZipCode([]);
      },
    };
    await dispatch(commonActions.getListZipCode(payload));
  };
  // handle data ZipCode
  const handleDataZipCode = async dataListZipCode => {
    const transformedData = [];
    for (let index = 0; index < dataListZipCode.length; index++) {
      const item = dataListZipCode[index];
      const dataItem = {
        value: index.toString(),
        label: item.SubdivisionName2,
        val: item.CityName,
      };
      if (item.SubdivisionName2 === defaultZipCode) {
        setZipCodeDefault(index.toString());
      }
      transformedData.push(dataItem);
    }
    await setDataZipCode(transformedData);
  };
  // handleSelect data zipcode
  const handleSelectValue = id => {
    const dataFind = dataZipCode.find(item => item.value === id);
    if (dataFind) {
      getDataSelect({districtName: dataFind?.val, wardName: dataFind?.label});
    }
  };
  return (
    <View>
      <DropDownPicker
        title={t('zipcode') + '(*)'}
        data={dataZipCode}
        defaultValue={zipCodeDefault}
        style={styles.styleSelectBox}
        labelStyle={styles.labelStyleSelect}
        itemKey={dataZipCode.value}
        searchable={true}
        searchPlaceholder={t('search')}
        onSelect={value => handleSelectValue(value)}
        listMode={'MODAL'}
      />
    </View>
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
    fontSize: 8,
  },
});
