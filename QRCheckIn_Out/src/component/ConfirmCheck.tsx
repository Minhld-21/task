import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {getUniqueId} from 'react-native-device-info';
import {SelectList} from 'react-native-dropdown-select-list';
const ConfirmCheck = ({route}: any) => {
  const data = route.params;
  const [time, date] = data.checkDateTime.split(',');
  const [dataUser, setDataUser] = useState<any>();
  const [idDevice, setidDevice] = useState<any>();
  const [check, setCheck] = useState('');
  const getDeviceInfo = async () => {
    let device = await getUniqueId();
    setidDevice(device);
  };

  const handleCheck = () => {};

  const fomatBirthday = moment(dataUser?.NgaySinhNhat).format('DD/MM/YYYY');
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
      getDeviceInfo();
    })();
  }, []);

  console.log(check);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxIn4}>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Ngày Check:</Text>
          <Text style={styles.txtContent}>{date}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Giờ Check:</Text>
          <Text style={styles.txtContent}>{time}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Vị trí:</Text>
          <Text style={styles.txtContent}>{data.DiaChi}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Họ và Tên:</Text>
          <Text style={styles.txtContent}>{dataUser?.TenNguoiDung}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Ngày sinh:</Text>
          <Text style={styles.txtContent}>{fomatBirthday}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Giới tính:</Text>
          <Text style={styles.txtContent}>{dataUser?.GioiTinh}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Điện thoại:</Text>
          <Text style={styles.txtContent}>{dataUser?.DienThoai}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Email:</Text>
          <Text style={styles.txtContent}>{dataUser?.Email}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>CMND:</Text>
          <Text style={styles.txtContent}>{dataUser?.CMND}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Chức vụ:</Text>
          <Text style={styles.txtContent}>{dataUser?.VaiTro}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.txtTitel}>Chi nhánh:</Text>
          <Text style={styles.txtContent}>{dataUser?.DiaChiCuaHang}</Text>
        </View>
      </View>
      <SelectList
        setSelected={(val: string) => setCheck(val)}
        data={dataCheck}
        save="value"
        placeholder="Chọn loại check"
        boxStyles={{width: '80%', alignSelf: 'center', marginTop: 20}}
        inputStyles={{color: 'black'}}
        dropdownTextStyles={{color: 'black'}}
        dropdownStyles={{width: '80%', alignSelf: 'center'}}
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={{fontWeight: '700'}}>Xác nhận {check}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConfirmCheck;

const styles = StyleSheet.create({
  btn: {
    width: '70%',
    height: 50,
    backgroundColor: 'orange',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  txtContent: {
    color: 'black',
    width: '65%',
    textAlign: 'right',
    fontWeight: '400',
    fontSize: 14,
  },
  txtTitel: {
    color: 'black',
    fontWeight: '700',
    fontSize: 14,
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxIn4: {
    width: '80%',
    height: 'auto',
    borderWidth: 0.3,
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
    borderRadius: 15,
  },
  container: {
    flex: 1,
  },
});
const dataCheck = [
  {key: '1', value: 'Check In'},
  {key: '2', value: 'Check Out'},
];
