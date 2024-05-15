import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {getUniqueId, getSystemName} from 'react-native-device-info';
import {SelectList} from 'react-native-dropdown-select-list';
interface DataUSer {
  CMND: string;
  ChuDe: string;
  DiaChi: string;
  DiaChiCuaHang: string;
  DiaChiWebCuaHang: string;
  DienThoai: string;
  DienThoaiCuaHang: string;
  DienThoaiKhachHang: string;
  Email: string;
  EmailKhachHang: string;
  GioiTinh: string | null;
  Ho: string;
  IDCuaHang: number;
  IDKhachHang: number;
  IDNguoiDung: number;
  IDVaiTro: number;
  MaBang: string;
  MaBangCuaHang: string;
  MaQuocGia: string;
  MatKhau: string;
  NgaySinhNhat: string;
  NhanEmail: number;
  TaiKhoan: string;
  Ten: string;
  TenBang: string;
  TenBangCuaHang: string;
  TenCuaHang: string;
  TenKhachHang: string;
  TenNguoiDung: string;
  TenQuan: string;
  TenQuanCuaHang: string;
  TenQuocGia: string;
  ThanhPho: string;
  Token: string;
  URLLogoCuaHang: string;
  VaiTro: string;
}

const dataCheck = [
  {key: 1, value: 'Check In'},
  {key: 2, value: 'Check Out'},
];
const ConfirmCheck = ({route}: any) => {
  const data = route.params;
  const [time, date] = data.checkDateTime.split(',');
  const [dataUser, setDataUser] = useState<DataUSer[]>([]);
  const [idDevice, setidDevice] = useState<string>();
  const [systemName, setSystemName] = useState<string>();
  const [check, setCheck] = useState<number>(0);

  //lấy id và nameSystem device
  const getDeviceInfo = async () => {
    let device = await getUniqueId();
    let systemName = await getSystemName();
    setSystemName(systemName);
    setidDevice(device);
  };
  // handle confirm check
  const handleCheck = async () => {
    const formatDateTime = moment(
      data.checkDateTime,
      'HH:mm:ss, DD/MM/YYYY',
    ).format('YYYY-MM-DD HH:mm:ss');

    const ResponseConfirm = await fetch(
      'https://api-dev-pkg.azurewebsites.net/api/Check/CheckInCheckOut',
      {
        body: JSON.stringify({
          IDNguoiDung: /*dataUser[0].IDNguoiDung*/ '1',
          IDThietBi: idDevice,
          NenTangThietBi: systemName,
          ChuoiCheck: data.stringCheck,
          LoaiCheck: check,
          NgayGioCheck: formatDateTime,
          Lati: data.latitude,
          Longi: data.longitude,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie:
            'ARRAffinity=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5; ARRAffinitySameSite=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5',
        },
      },
    );
    console.log(
      JSON.stringify({
        IDNguoiDung: /*dataUser[0].IDNguoiDung*/ '1',
        IDThietBi: idDevice,
        NenTangThietBi: systemName,
        ChuoiCheck: data.stringCheck,
        LoaiCheck: check,
        NgayGioCheck: formatDateTime,
        Lati: data.latitude,
        Longi: data.longitude,
      }),
    );

    const JsonConfirm = await ResponseConfirm.json();
    console.log(JsonConfirm);
    if (JsonConfirm.success === '02') {
      // thiết bị đã check in hoặc check out
      Alert.alert(JsonConfirm.message);
    } else if (JsonConfirm.success === '01') {
      // thành công
      Alert.alert(JsonConfirm.message);
    } else {
      // thiếu dữ liệu
      Alert.alert(JsonConfirm.message);
    }
  };

  useEffect(() => {
    // lấy data user
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
    getDeviceInfo();
    handleCheck;
  }, []);

  return (
    <ScrollView style={styles.container}>
      {dataUser.map((item: DataUSer, index) => {
        const fomatBirthday = moment(item?.NgaySinhNhat).format('DD/MM/YYYY');
        return (
          <View style={styles.boxIn4} key={index}>
            <View style={styles.twoInBox}>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>Ngày Check</Text>
                <Text style={styles.txtContent}>{date}</Text>
              </View>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>Giờ Check</Text>
                <Text style={styles.txtContent}>{time}</Text>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.txtTitle}>Vị trí</Text>
              <Text style={styles.txtContent}>{data.DiaChi}</Text>
            </View>
            <View style={styles.twoInBox}>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>Họ và Tên</Text>
                <Text style={styles.txtContent}>{item?.TenNguoiDung}</Text>
              </View>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>Chức vụ</Text>
                <Text style={styles.txtContent}>{item?.VaiTro}</Text>
              </View>
            </View>
            <View style={styles.twoInBox}>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>Giới tính</Text>
                <Text style={styles.txtContent}>{item?.GioiTinh}</Text>
              </View>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>Ngày sinh</Text>
                <Text style={styles.txtContent}>{fomatBirthday}</Text>
              </View>
            </View>
            <View style={styles.twoInBox}>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>Điện thoại</Text>
                <Text style={styles.txtContent}>{item?.DienThoai}</Text>
              </View>
              <View style={styles.twoBox}>
                <Text style={styles.txtTitle}>CMND</Text>
                <Text style={styles.txtContent}>{item?.CMND}</Text>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.txtTitle}>Email</Text>
              <Text style={styles.txtContent}>{item?.Email}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.txtTitle}>Chi nhánh</Text>
              <Text style={styles.txtContent}>{item?.DiaChiCuaHang}</Text>
            </View>
          </View>
        );
      })}
      <SelectList
        setSelected={setCheck}
        data={dataCheck}
        save="key"
        placeholder="Chọn loại check"
        boxStyles={styles.input}
        inputStyles={{color: '#365486', fontWeight: '600', fontSize: 14}}
        dropdownTextStyles={{color: '#B6BBC4', fontWeight: '500', fontSize: 14}}
        dropdownStyles={{
          width: '90%',
          alignSelf: 'center',
          borderColor: '#B6BBC4',
        }}
      />
      {check != 0 ? (
        <TouchableOpacity onPress={handleCheck} style={styles.btn}>
          <Text style={{fontWeight: '700', color: 'white'}}>
            Xác Nhận {check === 1 ? 'Check In' : 'Check Out'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity disabled style={styles.btnOff}>
          <Text style={{fontWeight: '700'}}>Chọn loại check</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ConfirmCheck;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#365486',
  },
  twoInBox: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  txtTitle: {
    color: '#365486',
    position: 'absolute',
    left: '10%',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    zIndex: 1,
    height: 'auto',
    width: 'auto',
    fontWeight: '700',
    fontSize: 14,
  },
  txtContent: {
    color: 'black',
    fontWeight: '400',
    fontSize: 12,
    marginTop: 5,
    left: '8%',
  },
  twoBox: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
    position: 'relative',
    flex: 1,
    borderColor: '#365486',
  },
  box: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
    position: 'relative',
    borderColor: '#365486',
  },
  btnOff: {
    width: '70%',
    height: 50,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btn: {
    width: '70%',
    height: 50,
    backgroundColor: '#FFC94A',
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
  boxIn4: {
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    marginTop: 25,
    gap: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
