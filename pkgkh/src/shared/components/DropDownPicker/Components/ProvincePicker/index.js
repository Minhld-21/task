import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, parseSize} from '~theme';
import {commonActions} from '~reduxCore/reducers';
import ProvincePicker from '~components/DropDownPicker';

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {country, defaultCity, getDataSelect} = props;
  const [dataCity, setDataCity] = useState([]);
  const [cityDefault, setCityDefault] = useState('');

  useEffect(() => {
    getDataCity();
  }, [country]);

  useEffect(() => {
    if (!dataCity) {
      handleDataCity();
    }
  }, [country, dataCity]);

  // get data city
  const getDataCity = async () => {
    const payload = {
      params: {
        loai: 'bang',
        CountryCode: country,
      },
      onSuccess: data => {
        handleDataCity(data);
      },
      onError: () => {},
    };
    dispatch(commonActions.getListCity(payload));
  };

  // handle data city
  const handleDataCity = dataListCity => {
    const transformedData = [];
    for (let index = 0; index < dataListCity.length; index++) {
      const item = dataListCity[index];
      const dataItem = {
        value: index.toString(),
        label: item?.StateName,
        val: item?.StateCode,
      };
      if (item?.StateCode === defaultCity) {
        setCityDefault(index.toString());
      }
      transformedData.push(dataItem);
    }
    setDataCity(transformedData);
  };

  // find city select
  const handleSelectValue = value => {
    const dataFind = dataCity.find(item => item.value === value);
    if (dataFind)
      getDataSelect({cityCode: dataFind?.val, cityName: dataFind?.label});
  };

  return (
    <View>
      <ProvincePicker
        title={t('province') + '(*)'}
        data={dataCity}
        style={styles.styleSelectBox}
        labelStyle={styles.labelStyleSelect}
        defaultValue={cityDefault}
        itemKey={dataCity?.value}
        searchable={true}
        searchPlaceholder={t('search')}
        onOpen={handleDataCity}
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
