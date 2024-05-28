import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import HeaderTitle from '~components/HeaderTitle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {navigate} from '~navigator/navigationUtils';
import HeaderBar from '~components/HeaderBar';
import {checkActions} from '~reduxCore/reducers';

export default Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [listCheckPoint, setListCheckPoint] = useState([]);
  const handleSelect = item => {
    navigate('checkpointdetail', {
      listCheckPoint: item,
    });
  };

  useEffect(() => {
    const fetchCheckPoints = () => {
      dispatch(checkActions.toggleLoading(false));
      const payload = {
        parrams: {},
        onSuccess: data => {
          dispatch(checkActions.toggleLoading(false));
          setListCheckPoint(data);
        },
        onError: err => {
          dispatch(checkActions.toggleLoading(false));
        },
      };
      dispatch(checkActions.getDiemCheck(payload));
    };
    fetchCheckPoints();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('repaircp')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {listCheckPoint.map(item => (
          <View key={item.IDDiaDiem} style={styles.box}>
            <View style={styles.boxLeft}>
              <Text style={styles.txtLocation}>{item.TenDiaDiem}</Text>
              <Text style={styles.txtAdress}>{item.DiaChi}</Text>
            </View>
            <View style={styles.boxRight}>
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.btn}>
                <Icon name="edit" size={25} color={'black'} />
              </TouchableOpacity>
              <View style={styles.line}></View>
              <TouchableOpacity style={styles.btn}>
                <Icon name="qr-code" size={25} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
