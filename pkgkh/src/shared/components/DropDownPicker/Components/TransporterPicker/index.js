import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Colors, Sizes, parseSize} from '~theme';
import {commonActions} from '~reduxCore/reducers';
import DropDownPicker from '~components/DropDownPicker';

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {defaultCity, onChange} = props;
  const [dataTransporter, setDataTransporter] = useState([]);

  useEffect(() => {
    getTransporter();
  }, []);
  // get data city
  const getTransporter = async () => {
    const payload = await {
      params: {
        loai: 27,
        mabanghotro: defaultCity,
      },
      onSuccess: data => {
        setDataTransporter(data);
      },
      onError: () => {},
    };
    await dispatch(commonActions.getTransporter(payload));
  };

  const handleChooseTransporter = async value => {
    const filterData = dataTransporter.filter(item => item?.value === value);
    onChange(filterData[0]);
  };

  return (
    <View>
      <DropDownPicker
        title={t('transporter')}
        data={dataTransporter}
        searchable={false}
        style={styles.styleSelectBox}
        labelStyle={styles.labelStyleSelect}
        itemKey={dataTransporter?.value}
        onSelect={value => handleChooseTransporter(value)}
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
