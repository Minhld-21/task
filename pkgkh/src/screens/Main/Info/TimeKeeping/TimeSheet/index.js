import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useSelector, useDispatch} from 'react-redux';
import IconCalendar from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';

import {commonActions, userSelectors, checkActions} from '~reduxCore/reducers';
import Avatar from '~assets/images/avatar.png';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';
import {Colors, Sizes, parseSize} from '~theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
};

LocaleConfig.defaultLocale = 'fr';

export default function Index() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [selecteddayofweek, setSelectedDayofWeek] = useState('');
  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);

  const user = useSelector(state => userSelectors.getUserData(state));

  useEffect(() => {
    getTimeSheet();
  }, [thang, nam]);

  const getTimeSheet = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        idnguoidung: user?.IDNguoiDung,
        thang: thang,
        nam: nam,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        await setData(data);
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(checkActions.getTimeSheet(payload));
  };

  const renderComponentDay = (date, state) => {
    const item = Array.isArray(data?.BangChamCong)
      ? data.BangChamCong.find(item => item.Ngay === date.dateString)
      : null;

    let component;
    let colorIcon = 'grey';
    let nameIcon = 'checkmark-circle';

    if (!item) {
      // Ngày không có dữ liệu
      component = (
        <View style={styles.wrapDate} onPress={() => handleSelectDate(date)}>
          <Text
            style={
              state === 'disabled' ? styles.textDateDisabled : styles.textDate
            }>
            {date.day}
          </Text>
        </View>
      );
    } else if (item.ChamCongTrongNgay.length > 0) {
      // Ngày có dữ liệu
      const attendance = item.ChamCongTrongNgay;
      const lastCheck = new Date(attendance[attendance.length - 1].TimeCheck);
      const firstCheck = new Date(attendance[0].TimeCheck);
      const workTime = Math.abs(lastCheck.getTime() - firstCheck.getTime());
      const hoursDifference = workTime / (1000 * 60 * 60);
      // Hàm kiểm tra xem mảng có cả Loai 1 và Loai 2 hay không
      const hasBothTypes = () => {
        const hasType1 = item.ChamCongTrongNgay.some(x => x.Loai === 1);
        const hasType2 = item.ChamCongTrongNgay.some(x => x.Loai === 2);
        return hasType1 && hasType2;
      };

      // Xác định màu sắc của biểu tượng IconCalendar dựa trên kết quả của hasBothTypes
      const colorIcon = hasBothTypes()
        ? hoursDifference >= 8
          ? 'green'
          : 'red'
        : 'orange';

      const nameIcon = hasBothTypes()
        ? hoursDifference >= 8
          ? 'checkmark-circle'
          : 'checkmark-circle'
        : 'remove-circle';

      component = (
        <TouchableOpacity
          style={
            date.dateString === selectedDate
              ? styles.wrapDateSelected
              : styles.wrapDate
          }
          onPress={() => handleSelectDate(date)}>
          <Text style={styles.textDate}>{date.day}</Text>
          <IconCalendar
            name={nameIcon}
            color={colorIcon}
            style={styles.iconCalendar}
          />
        </TouchableOpacity>
      );
    } else {
      // Trường hợp mặc định (nếu có)
      colorIcon = 'grey';
      nameIcon = 'close-circle';
      component = (
        <TouchableOpacity
          style={
            date.dateString === selectedDate
              ? styles.wrapDateSelected
              : styles.wrapDate
          }
          onPress={() => handleSelectDate(date)}>
          <Text style={styles.textDate}>{date.day}</Text>
          <IconCalendar
            name={nameIcon}
            color={colorIcon}
            style={styles.iconCalendar}
          />
        </TouchableOpacity>
      );
    }
    return component;
  };

  const handleSelectDate = date => {
    const {dateString} = date;
    setSelectedDate(dateString);
    const dateObject = new Date(dateString);
    const dayOfWeek =
      dateObject.getDay() + 2 === 8
        ? 'Chủ nhật'
        : 'Thứ ' + Math.abs(dateObject.getDay() + 2);
    const dayOfMonth = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const dateOfWeek = `${dayOfWeek} ngày ${dayOfMonth} tháng ${month} năm ${year}`;
    setSelectedDayofWeek(dateOfWeek);
  };

  const changeMonth = data => {
    setThang(data?.month);
    setNam(data?.year);
  };
  const renderDetail = item => {
    if (!Array.isArray(item?.ChamCongTrongNgay)) return null;

    let lanCheckIn = 1;
    let lanCheckOut = 1;

    return item.ChamCongTrongNgay.map((check, index) => {
      const checkType = check.Loai === 1 ? 'CheckIn' : 'CheckOut';
      const checkCount = check.Loai === 1 ? lanCheckIn++ : lanCheckOut++;
      return (
        <View style={styles.boxCheck} key={index}>
          <Text
            style={
              styles.txtTitleCheck
            }>{`${checkType} lần ${checkCount}: `}</Text>
          <Text style={styles.txtCheck}>
            {new Date(check.TimeCheck).toLocaleTimeString()}
          </Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle="Bảng checkin checkout" />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.boxIn4User}>
          <Image source={Avatar} style={styles.avatar} resizeMode="cover" />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{data?.HoTenNhanVien}</Text>
            <Text style={styles.userDetail}>Ngày sinh: {data?.NgaySinh}</Text>
            <Text style={styles.userDetail}>Chức vụ: {data?.ChucVu}</Text>
          </View>
        </View>
        <View style={styles.notes}>
          <View style={styles.circle}>
            <IconCalendar
              name={'checkmark-circle'}
              color={'green'}
              style={styles.iconCalendar}
            />
            <Text style={styles.txtNote}>Đạt</Text>
          </View>
          <View style={styles.circle}>
            <IconCalendar
              name={'checkmark-circle'}
              color={'red'}
              style={styles.iconCalendar}
            />
            <Text style={styles.txtNote}>Không đạt</Text>
          </View>
          <View style={styles.circle}>
            <IconCalendar
              name={'remove-circle'}
              color={'orange'}
              style={styles.iconCalendar}
            />
            <Text style={styles.txtNote}>Check thiếu</Text>
          </View>
          <View style={styles.circle}>
            <IconCalendar
              name={'close-circle'}
              color={'grey'}
              style={styles.iconCalendar}
            />
            <Text style={styles.txtNote}>Quên check</Text>
          </View>
        </View>
        <Calendar
          onMonthChange={changeMonth}
          dayComponent={({date, state}) => renderComponentDay(date, state)}
          style={styles.calendar}
        />
        <View style={styles.boxDetailCheck}>
          <Text style={styles.boxDetailTitle}>Chi tiết checkin checkout</Text>
          <Text style={styles.textDateOfWeek}>{selecteddayofweek}</Text>
          <FlatList
            data={
              Array.isArray(data?.BangChamCong)
                ? data?.BangChamCong.filter(item => item.Ngay === selectedDate)
                : []
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => renderDetail(item)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: Sizes.margin,
  },
  boxCheck: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
    marginVertical: Sizes.margin / 4,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Sizes.radius / 2,
  },
  boxDetailCheck: {
    marginHorizontal: Sizes.margin,
    backgroundColor: '#DCF2F1',
    paddingVertical: Sizes.padding,
    marginTop: Sizes.margin,
    gap: 5,
    borderRadius: Sizes.radius / 2,
  },
  boxDetailTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  textDateOfWeek: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  txtNote: {
    fontSize: 10,
    fontWeight: '500',
    color: '#0F1035',
  },
  circle: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  notes: {
    height: parseSize(50),
    marginVertical: Sizes.margin,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  calendar: {
    backgroundColor: '#DCF2F1',
    marginVertical: Sizes.margin,
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
  },
  boxIn4User: {
    backgroundColor: '#DCF2F1',
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  avatar: {
    width: parseSize(60),
    height: parseSize(60),
    borderRadius: Sizes.radius,
  },
  userInfo: {
    gap: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0F1035',
  },
  userDetail: {
    fontSize: 14,
    color: '#0F1035',
  },
  dot: {
    width: parseSize(10),
    height: parseSize(10),
    borderRadius: Sizes.radius,
  },
  detailBox: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DCF2F1',
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
    justifyContent: 'space-between',
    marginBottom: 5,
    borderRadius: Sizes.radius / 2,
  },
  txtHeader: {
    fontSize: 20,
    color: '#0F1035',
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#7FC7D9',
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: Sizes.padding,
    marginVertical: Sizes.margin,
    justifyContent: 'flex-start',
  },
  // css date
  wrapDateSelected: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.danger,
    backgroundColor: Colors.lightWhite,
    paddingVertical: Sizes.padding / 6,
    paddingHorizontal: Sizes.padding,
    borderRadius: 10,
  },
  testDateSelected: {
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },
  wrapDate: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  textDate: {
    fontSize: 16,
    fontWeight: '500',
    color: 'blue',
  },
  textDateDisabled: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
  },
  iconCalendar: {
    fontSize: 20,
  },
});
