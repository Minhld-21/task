import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import HeaderTitle from '~components/HeaderTitle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

import styles from './styles';
import {navigate} from '~navigator/navigationUtils';
import HeaderBar from '~components/HeaderBar';
import {checkActions} from '~reduxCore/reducers';

export default Index = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [valueQR, setValueQR] = useState(null);
  const [listCheckPoint, setListCheckPoint] = useState([]);
  const capQRref = useRef();
  const dispatch = useDispatch();

  // sửa điểm check theo id
  const handleSelect = item => {
    navigate('checkpointdetail', {
      listCheckPoint: item,
    });
  };

  // QRcode theo id
  const handleGenerateQR = item => {
    setValueQR(item);
    setModalVisible(true);
  };

  //share QR
  const handleShareQR = async () => {
    capQRref.current.capture().then(uri => {
      const option = {
        url: uri,
      };
      Share.open(option);
    });
  };

  //xóa điểm check
  const handleDeleteCheck = async item => {
    dispatch(checkActions.toggleLoading(true));
    const payload = {
      params: {
        loai: 3,
        IDDiaDiem: item.IDDiaDiem,
        tendiadiem: item.TenDiaDiem,
        diachi: item.DiaChi,
        macheck: item.MaCheck,
        latitude: item.Latitude,
        longitude: item.Longitude,
        thanhpho: item.ThanhPho,
        mabang: item.MaBang,
        maquocgia: item.MaQuocGia,
        tenbang: item.TenBang,
        tenquocgia: item.TenQuocGia,
        tenquan: item.TenQuan,
      },
      onSuccess: async data => {
        await dispatch(checkActions.toggleLoading(false));
        fetchCheckPoints();
      },
      onError: async err => {
        await dispatch(checkActions.toggleLoading(false));
      },
    };
    await dispatch(checkActions.quanlydiemcheck(payload));
  };
  // get list ds check point
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

  useEffect(() => {
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
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={styles.btn}>
                  <Icon name="edit" size={25} color={'black'} />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity
                  onPress={() => handleGenerateQR(item)}
                  style={styles.btn}>
                  <Icon name="qr-code" size={25} color={'black'} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnDelete}>
                <TouchableOpacity
                  onPress={() => handleDeleteCheck(item)}
                  style={styles.btn}>
                  <Icon name="delete" size={25} color={'black'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.backgroundModal}>
          <View style={styles.content}>
            {valueQR ? (
              <ViewShot
                key={valueQR.IDDiaDiem}
                ref={capQRref}
                options={{fileName: 'QRcode', format: 'png', quality: 0.9}}
                style={styles.QR}>
                <QRCode size={250} value={valueQR.MaCheck} />
                <Text style={styles.txtMaCheck}>
                  Chuỗi QRcode: {valueQR.MaCheck}
                </Text>
              </ViewShot>
            ) : (
              <View style={styles.QR}>
                <Text style={styles.txtLocation}>Không có chuỗi genQRcode</Text>
              </View>
            )}
            <View style={styles.bottomModal}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.btnModal}>
                <Text style={styles.txtBtnModal}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShareQR()}
                style={styles.btnModal}>
                <Text style={styles.txtBtnModal}>Share QR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
