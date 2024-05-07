import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useEffect, useState } from "react";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  dayNames: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
  dayNamesShort: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
};

LocaleConfig.defaultLocale = "fr";

export default function App() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selecteddayofweek, setSelectedDayofWeek] = useState<string>("");

  const handleDay = (day: any) => {
    const { dateString } = day;
    const dateObject = new Date(dateString);
    const dayOfWeek =
      dateObject.getDay() + 2 === 8
        ? "Chủ nhật"
        : "Thứ " + Math.abs(dateObject.getDay() + 2);
    const dayOfMonth = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const date = `${dayOfWeek} ngày ${dayOfMonth} tháng ${month} năm ${year}`;
    setSelectedDayofWeek(date);
    setSelectedDate(dateString);
  };

  const getBirthDay = () => {
    const [year, month, day] = data.NgaySinh.split("-");
    const birthdayUser = `${day}/${month}/${year}`;
    return birthdayUser;
  };

  //đánh dấu trên lịch
  const markedDates: { [key: string]: any } = data.BangChamCong.reduce(
    (accumulator: any, item) => {
      const attendance = item.ChamCongTrongNgay;

      if (item.ChamCongTrongNgay.length > 1) {
        const lastCheck = new Date(attendance[attendance.length - 1].TimeCheck);
        const firstCheck = new Date(attendance[0].TimeCheck);

        const workTime = Math.abs(lastCheck.getTime() - firstCheck.getTime());
        const hoursDifference = workTime / (1000 * 60 * 60);
        // check đủ
        accumulator[item.Ngay] = {
          marked: true,
          dotColor: hoursDifference >= 8 ? "green" : "#874CCC",
          selected: true,
          selectedColor: hoursDifference >= 8 ? "green" : "#874CCC",
        };
      } else if (item.ChamCongTrongNgay.length === 1) {
        //check thiếu
        accumulator[item.Ngay] = {
          marked: true,
          dotColor: "orange",
          selected: true,
          selectedColor: "orange",
        };
      } else {
        //không check
        accumulator[item.Ngay] = {
          marked: true,
          dotColor: "red",
          selected: true,
          selectedColor: "red",
        };
      }
      return accumulator;
    },
    {}
  );

  useEffect(() => {
    setSelectedDate(selectedDate);
    getBirthDay;
    handleDay;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={styles.txtHeader}>Bảng checkin checkout</Text>
      </View>

      <View style={styles.boxIn4User}>
        <Image
          source={require("./assets/image.jpg")}
          style={{ width: 80, height: 80, borderRadius: 10 }}
          resizeMode="cover"
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#0F1035" }}>
            {data.HoTenNhanVien}
          </Text>
          <Text style={{ fontSize: 14, color: "#0F1035" }}>
            Ngày sinh: {getBirthDay()}
          </Text>
          <Text style={{ fontSize: 14, color: "#0F1035" }}>
            Chức vụ: {data.ChucVu}
          </Text>
        </View>
      </View>
      <View style={styles.notes}>
        <View style={styles.circle}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 100,
              backgroundColor: "green",
            }}
          ></View>
          <Text style={styles.txtNote}>Check đủ</Text>
        </View>
        <View style={styles.circle}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 100,
              backgroundColor: "#874CCC",
            }}
          ></View>
          <Text style={styles.txtNote}>Check không đạt</Text>
        </View>
        <View style={styles.circle}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 100,
              backgroundColor: "red",
            }}
          ></View>
          <Text style={styles.txtNote}>Không check</Text>
        </View>
        <View style={styles.circle}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 100,
              backgroundColor: "orange",
            }}
          ></View>
          <Text style={styles.txtNote}>check thiếu</Text>
        </View>
      </View>
      <Calendar
        onDayPress={handleDay}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
          },
        }}
        theme={{
          selectedDayBackgroundColor: "",
        }}
        style={styles.calender}
      />
      <View style={styles.boxDetailCheck}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Chi tiết checkin checkout
        </Text>
        <Text>{selecteddayofweek}</Text>
        {data.BangChamCong.filter((item) => item.Ngay === selectedDate).map(
          (item) => {
            return item.ChamCongTrongNgay.map((check, index) => {
              const checkType = check.Loai === 1 ? "CheckIn" : "CheckOut";
              return (
                <View style={styles.boxCheck} key={index}>
                  <Text style={styles.txtTitleCheck}>{`${checkType} lần ${
                    index + 1
                  }: `}</Text>
                  <Text style={styles.txtCheck}>
                    {new Date(check.TimeCheck).toLocaleTimeString()}
                  </Text>
                </View>
              );
            });
          }
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtCheck: {},
  txtTitleCheck: {},
  boxCheck: {
    width: "90%",
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  boxDetailCheck: {
    width: "90%",
    height: "auto",
    backgroundColor: "#DCF2F1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    alignSelf: "center",
    gap: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  txtNote: {
    fontSize: 10,
    fontWeight: "500",
    color: "#0F1035",
  },
  circle: {
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  notes: {
    width: "90%",
    height: 50,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  calender: {
    backgroundColor: "#DCF2F1",
    width: "95%",
    alignSelf: "center",
  },
  boxIn4User: {
    backgroundColor: "#DCF2F1",
    width: "95%",
    height: "auto",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 20,
  },
  txtHeader: {
    fontSize: 20,
    color: "#0F1035",
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#7FC7D9",
    width: "100%",
    height: "7%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
  },
});

interface TimeCheck {
  Loai: number;
  TimeCheck: string;
}

interface ChamCongTrongNgay {
  Ngay: string;
  ChamCongTrongNgay: TimeCheck[] | [];
}

interface EmployeeData {
  HoTenNhanVien: string;
  NgaySinh: string;
  ChucVu: string;
  BangChamCong: ChamCongTrongNgay[];
}

const data: EmployeeData = {
  HoTenNhanVien: "Lê Văn Lương",
  NgaySinh: "1980-05-04",
  ChucVu: "Nhân viên IT",
  BangChamCong: [
    {
      Ngay: "2024-05-01",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2023-03-01 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2023-03-01 12:00:00",
        },
        {
          Loai: 1,
          TimeCheck: "2023-03-01 13:00:00",
        },
        {
          Loai: 2,
          TimeCheck: "2023-03-01 17:30:00",
        },
      ],
    },
    {
      Ngay: "2024-05-02",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2023-03-02 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2023-03-02 16:30:00",
        },
      ],
    },
    {
      Ngay: "2024-05-03",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2023-03-03 08:20:00",
        },
      ],
    },
    {
      Ngay: "2024-05-04",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2023-03-04 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2023-03-04 18:20:00",
        },
      ],
    },
    {
      Ngay: "2024-05-05",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2023-03-05 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2023-03-05 15:20:00",
        },
      ],
    },
    {
      Ngay: "2024-05-06",
      ChamCongTrongNgay: [],
    },
    {
      Ngay: "2024-05-07",
      ChamCongTrongNgay: [],
    },
    {
      Ngay: "2024-05-08",
      ChamCongTrongNgay: [],
    },
    {
      Ngay: "2024-05-09",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2024-05-09 08:20:00",
        },
      ],
    },
    {
      Ngay: "2024-05-10",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2024-05-10 08:20:00",
        },
      ],
    },
    {
      Ngay: "2024-05-11",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2024-05-11 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2024-05-11 12:00:00",
        },
        {
          Loai: 1,
          TimeCheck: "2024-05-11 13:00:00",
        },
        {
          Loai: 2,
          TimeCheck: "2024-05-11 17:30:00",
        },
      ],
    },
    {
      Ngay: "2024-05-12",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2024-05-12 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2024-05-12 12:00:00",
        },
        {
          Loai: 1,
          TimeCheck: "2024-05-12 13:00:00",
        },
        {
          Loai: 2,
          TimeCheck: "2024-05-12 17:30:00",
        },
      ],
    },
    {
      Ngay: "2024-05-13",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2024-05-13 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2024-05-13 16:00:00",
        },
      ],
    },
    {
      Ngay: "2024-05-14",
      ChamCongTrongNgay: [
        {
          Loai: 1,
          TimeCheck: "2024-05-14 08:20:00",
        },
        {
          Loai: 2,
          TimeCheck: "2024-05-14 14:20:00",
        },
      ],
    },
  ],
};
