import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RadioGroup from 'react-native-radio-buttons-group';

const ConfirmCheck = ({route}: any) => {
  const data = route.params;
  const [time, date] = data.checkDateTime.split(',');
  const [dataUser, setDataUser] = useState();
  console.log(dataUser);

  useEffect(() => {
    (async () => {
      const Response = await fetch(
        'https://api-dev-pkg.azurewebsites.net/api/common/GetThongTinKhachHang',
        {
          body: JSON.stringify({
            loai: 1,
            taikhoan: 'Test000',
            matkhau: '123456',
            token:
              'crirB604T2qdVFdmsJ1WSS:APA91bElRttb5LqK11JqBVjW05wV1M9DHMw91FLQ9UT8QVmDqEKCoGw8gIo6Bm_3rbRdkkZl-du2ti3zJ2j6ypA2782jt7-g6bCccxHCi05fidenEsHhz_gcxUdwPGKSwfSHX6iUkVaA',
            chude: 'phuckhangshop',
            bangdulieu: ['nguoidung', 'chuyenmuc', 'giohang', 'yeuthich'],
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie:
              'ARRAffinity=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5; ARRAffinitySameSite=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5',
          },
        },
      );
      const Json = await Response.json();
      setDataUser(Json.nguoidung);
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxIn4}>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Ngày Check:</Text>
          <Text style={styles.txtContent}>{date}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Ngày Check:</Text>
          <Text style={styles.txtContent}>{time}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Vị trí:</Text>
          <Text style={styles.txtContent}>{data.DiaChi}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmCheck;

const styles = StyleSheet.create({
  txtContent: {
    color: 'black',
    width: '70%',
    textAlign: 'right',
  },
  txtTitel: {
    color: 'black',
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxIn4: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 5,
  },
  container: {
    flex: 1,
  },
});
