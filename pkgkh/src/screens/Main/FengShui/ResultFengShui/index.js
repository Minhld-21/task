import React, {useRef, useState, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {navigate} from '~navigator/navigationUtils';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';

import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '~assets/images/backgroundNumero.png';
import Logo from '~assets/images/logoname.png';
import {commonActions} from '~reduxCore/reducers';
import HeaderBar from '~components/HeaderBar';
import HeaderTitle from '~components/HeaderTitle';

import _0 from '~assets/images/ThanSoHoc/0.png';
import _1 from '~assets/images/ThanSoHoc/1.png';
import _2 from '~assets/images/ThanSoHoc/2.png';
import _3 from '~assets/images/ThanSoHoc/3.png';
import _4 from '~assets/images/ThanSoHoc/4.png';
import _5 from '~assets/images/ThanSoHoc/5.png';
import _6 from '~assets/images/ThanSoHoc/6.png';
import _7 from '~assets/images/ThanSoHoc/7.png';
import _8 from '~assets/images/ThanSoHoc/8.png';
import _9 from '~assets/images/ThanSoHoc/9.png';
import _11 from '~assets/images/ThanSoHoc/11.png';
import _22 from '~assets/images/ThanSoHoc/22.png';
import _33 from '~assets/images/ThanSoHoc/33.png';

import {Sizes, Colors, Height, Width, parseSize} from '~theme';

const Index = props => {
  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();
  const [data, setData] = useState(props.route.params?.data);

  const reloadData = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        igencode: data?.IGenCode,
        ngaythexuat: moment(data?.TheNgayXuat).format('yyyy-MM-DD HH:mm:ss'),
      },
      onSuccess: async data => {
        await setData(data);
        await dispatch(commonActions.toggleLoading(false));
        await showMessage({
          duration: 3000,
          message: 'Đã làm mới dữ liệu!',
          type: 'success',
        });
      },
      onError: async mess => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: 'Lỗi Api không thể làm mới được dữ liệu',
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.updateNumerologies(payload));
  };

  const groupedData =
    data?.ThanSoHoc &&
    data?.ThanSoHoc.reduce((groups, item) => {
      const groupKey = item?.Group.toString();
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
  // Chuyển đổi object thành mảng để sử dụng trong việc render
  const arrThanSoHoc =
    groupedData &&
    Object.entries(groupedData).map(([key, value]) => ({
      title: `Group ${key}`,
      data: value,
    }));

  const captureView = async () => {
    try {
      const uri = await captureRef(scrollViewRef, {
        format: 'jpg',
        quality: 0.8,
        result: 'tmpfile',
      });
      console.log('Captured URI:', uri);
      shareImages(uri);
      // Handle the captured URI as needed (e.g., display, share, etc.)
    } catch (error) {
      console.error('Error capturing view:', error);
    }
  };

  const shareImages = async images => {
    try {
      console.log('Images to share:', images); // Check the value of images before sharing
      const shareOptions = {
        title: 'Share via',
        urls: [images], // Change to urls: images if it's a single URI
        type: 'image/jpg',
        failOnCancel: false,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing images:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle
        nameHeaderTitle="Phúc Khang Numnerologies"
        containerHeaderStyle={styles.containerHeaderStyle}
        textTitleHeader={styles.textTitleHeader}
        iconBack={styles.iconBack}
      />
      <ScrollView style={styles.content}>
        <View collapsable={false} ref={scrollViewRef}>
          <ImageBackground
            style={styles.background}
            source={Background}
            resizeMode="stretch"
          />
          <View>
            <View style={styles.wrapLogo}>
              <Image
                style={styles.logoImage}
                source={Logo}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.wrapName}>
              <View style={styles.wrapTextAvatar}>
                <Text style={styles.textAvatar}>
                  {data?.HoTen?.trim().split(' ').pop()?.charAt(0)}
                </Text>
              </View>
              <Text style={styles.textTitleName}>{data?.HoTen}</Text>
              <Text style={styles.textTitleGender}>({data?.GioiTinh})</Text>
              <Text style={styles.textTitleBirthday}>
                {moment(data?.SinhNhat).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.wrapCreateDate}>
              <Text style={styles.textCreateDate}>
                Thẻ ngày xuất:{' '}
                {moment(data?.TheNgayXuat).format('DD/MM/YYYY HH:mm:ss')}
              </Text>
            </View>
            <View style={styles.groupButton}>
              {data?.ThanSoHoc ? (
                <Pressable style={styles.wrapButton} onPress={reloadData}>
                  <Icon style={styles.iconButton} name="reload" />
                  <Text style={styles.textButtonReload}>Làm mới dữ liệu</Text>
                </Pressable>
              ) : null}
              <Pressable style={styles.wrapButton} onPress={captureView}>
                <Icon style={styles.iconButton} name="share" />
                <Text style={styles.textButtonReload}>Chia sẽ kết quả</Text>
              </Pressable>
            </View>
            <View style={styles.contentLaso}>
              <View style={styles.wrapFlatlist}>
                {arrThanSoHoc &&
                  Array.isArray(arrThanSoHoc) &&
                  arrThanSoHoc.map((item, index) => (
                    <View key={index} style={styles.flatlistContainer}>
                      {item.data.map(dataItem => (
                        <View key={dataItem.Title} style={styles.wrapItem}>
                          <View style={styles.wrapImageIcon}>
                            {dataItem?.Value.split(',').map((x, i, array) => (
                              <React.Fragment key={i}>
                                <Image
                                  resizeMode="stretch"
                                  style={{
                                    height:
                                      x > 10
                                        ? 20 - array.length
                                        : 18 - array.length,
                                    width:
                                      x > 10
                                        ? 20 - array.length
                                        : 18 - array.length,
                                  }}
                                  source={
                                    x.trim() === '0'
                                      ? _0
                                      : x.trim() === '1'
                                      ? _1
                                      : x.trim() === '2'
                                      ? _2
                                      : x.trim() === '3'
                                      ? _3
                                      : x.trim() === '4'
                                      ? _4
                                      : x.trim() === '5'
                                      ? _5
                                      : x.trim() === '6'
                                      ? _6
                                      : x.trim() === '7'
                                      ? _7
                                      : x.trim() === '8'
                                      ? _8
                                      : x.trim() === '9'
                                      ? _9
                                      : x.trim() === '11'
                                      ? _11
                                      : x.trim() === '22'
                                      ? _22
                                      : x.trim() === '33'
                                      ? _33
                                      : null
                                  }
                                />
                                {i !== array.length - 1 && (
                                  <Text style={styles.comma}>,</Text>
                                )}
                              </React.Fragment>
                            ))}
                          </View>
                          <Text style={styles.textTitleItem}>
                            {dataItem.Title}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
              </View>
            </View>
          </View>
          {data?.SoCungMenh !== -1 ? (
            <View style={styles.tableCungMenh}>
              <View style={styles.wrapTitleTable}>
                <Text style={styles.titleTable}>Bảng cung mệnh</Text>
              </View>
              <View style={styles.wrapContentTable}>
                <View style={styles.col1}>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.titleContentG1}>Số cung mệnh</Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.titleContentG1}>Cung</Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.titleContentG1}>Mệnh</Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.titleContentG1}>Cung Mệnh</Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.titleContentG1}>Màu bảng mệnh</Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.titleContentG1}>Màu tương sinh</Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.titleContentG1}>Màu tương khắc</Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.titleContentG2}>Hướng tốt 1</Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.titleContentG2}>Hướng tốt 2</Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.titleContentG2}>Hướng tốt 3</Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.titleContentG2}>Hướng tốt 4</Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.titleContentG3}>Hướng xấu 1</Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.titleContentG3}>Hướng xấu 2</Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.titleContentG3}>Hướng xấu 3</Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.titleContentG3}>Hướng xấu 4</Text>
                  </View>
                </View>
                <View style={styles.col2}>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.valueContentG1}>
                      {data?.SoCungMenh}
                    </Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.valueContentG1}>
                      {data?.BangCungMenh[0].Cung}
                    </Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.valueContentG1}>
                      {data?.BangCungMenh[0].Menh}
                    </Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.valueContentG1}>
                      {data?.BangCungMenh[0].Cung_Menh}
                    </Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.valueContentG1}>
                      {data?.BangCungMenh[0].Mau_Ban_Menh}
                    </Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.valueContentG1}>
                      {data?.BangCungMenh[0].Mau_Tuong_Sinh}
                    </Text>
                  </View>
                  <View style={styles.rowTableG1}>
                    <Text style={styles.valueContentG1}>
                      {data?.BangCungMenh[0].Mau_Tuong_Khac}
                    </Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.valueContentG2}>
                      {data?.BangCungMenh[0].Huong_Tot_1}
                    </Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.valueContentG2}>
                      {data?.BangCungMenh[0].Huong_Tot_2}
                    </Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.valueContentG2}>
                      {data?.BangCungMenh[0].Huong_Tot_3}
                    </Text>
                  </View>
                  <View style={styles.rowTableG2}>
                    <Text style={styles.valueContentG2}>
                      {data?.BangCungMenh[0].Huong_Tot_4}
                    </Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.valueContentG3}>
                      {data?.BangCungMenh[0].Huong_Xau_1}
                    </Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.valueContentG3}>
                      {data?.BangCungMenh[0].Huong_Xau_2}
                    </Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.valueContentG3}>
                      {data?.BangCungMenh[0].Huong_Xau_3}
                    </Text>
                  </View>
                  <View style={styles.rowTableG3}>
                    <Text style={styles.valueContentG3}>
                      {data?.BangCungMenh[0].Huong_Xau_4}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapScrollView: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: Width - 18,
    height: parseSize(800),
    zIndex: -1,
    elevation: -1,
  },
  wrapImageIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapTextAvatar: {
    backgroundColor: Colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    height: parseSize(70),
    width: parseSize(70),
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  textAvatar: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 40,
    color: Colors.white,
  },
  wrapName: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Sizes.margin,
    paddingTop: Sizes.padding * 2,
    borderRadius: Sizes.radius,
  },
  content: {
    flex: 1,
    marginHorizontal: Sizes.margin,
  },
  wrapFlatlist: {
    flex: 1,
    opacity: 0.95,
  },
  logoImage: {
    position: 'absolute',
    left: parseSize(10),
    top: parseSize(112),
    width: parseSize(80),
    height: parseSize(40),
  },
  flatlistContainer: {
    flexDirection: 'row',
  },
  wrapItem: {
    width: Width / 4 - 10,
    height: Width / 4 - 4,
    marginVertical: Sizes.margin / 4,
    paddingHorizontal: Sizes.padding / 4,
    paddingVertical: Sizes.padding,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: Sizes.radius,
    marginRight: 4,
  },
  textTitleName: {
    marginTop: Sizes.margin,
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
  },
  textTitleGender: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: 'orange',
  },
  textTitleBirthday: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.white,
  },
  textTitleItem: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.dark,
    textAlign: 'center',
  },
  textValueItem: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.danger,
  },
  textBack: {
    marginHorizontal: Sizes.margin,
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.white,
  },
  comma: {
    padding: 0,
    margin: 0,
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.danger,
  },
  //
  tableCungMenh: {
    flex: 1,
    marginVertical: Sizes.margin,
    paddingHorizontal: Sizes.margin,
    paddingBottom: Sizes.padding,
    backgroundColor: Colors.white,
  },
  wrapTitleTable: {
    marginVertical: Sizes.margin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapContentTable: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col1: {
    flex: 0.45,
  },
  col2: {
    flex: 0.55,
  },
  rowTableG1: {
    borderWidth: 1,
    borderStyle: 'dotted',
    padding: Sizes.padding / 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexBasis: '25%', // Điều chỉnh độ rộng của cột
  },
  rowTableG2: {
    borderWidth: 1,
    borderStyle: 'dotted',
    padding: Sizes.padding / 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexBasis: '25%', // Điều chỉnh độ rộng của cột
  },
  rowTableG3: {
    borderWidth: 1,
    borderStyle: 'dotted',
    padding: Sizes.padding / 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexBasis: '25%', // Điều chỉnh độ rộng của cột
  },
  titleTable: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.dark,
  },
  titleContentG1: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'blue',
  },
  titleContentG2: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.success,
  },
  titleContentG3: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.danger,
  },
  valueContentG1: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'blue',
  },
  valueContentG2: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.success,
  },
  valueContentG3: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.danger,
  },
  wrapCreateDate: {
    marginVertical: Sizes.margin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCreateDate: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.primary,
  },
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: Sizes.margin,
  },
  wrapButton: {
    flexDirection: 'row',
    backgroundColor: Colors.info,
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding * 0.7,
    borderRadius: Sizes.radius / 2,
  },
  textButtonReload: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Sizes.padding,
  },
  iconButton: {
    marginRight: Sizes.margin / 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
  },
  // Header title style
  containerHeaderStyle: {
    height: parseSize(40),
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  wrapIconBack: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapTitleHeader: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBack: {
    paddingLeft: Sizes.padding,
    fontSize: 28,
    color: Colors.primary,
  },
  textTitleHeader: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-SemiBold',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
