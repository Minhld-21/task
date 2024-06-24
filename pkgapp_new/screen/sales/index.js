import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Line} from 'react-native-svg';

import styles from './styles';
import Navigation from '../Navigation';
import Header from '../Header';
const index = () => {
  const [isPressed, setIsPressed] = useState(null);
  const handlePressIn = index => {
    setIsPressed(index);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  const dotList = [1, 2, 3];
  //index lần lượt từ 0, 1, 2
  const [dotLight, setDotLight] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View style={styles.InforOrder}>
          <LinearGradient
            colors={[
              '#0A8040',
              '#098843',
              '#089147',
              '#07994A',
              '#06A24D',
              '#05AA50',
            ]}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.quantityOrder}>
            <View>
              <Text style={styles.txtOrdorOfday}>Số đơn trong ngày</Text>
              <Text style={styles.txtResulOrderOfday}>10</Text>
            </View>
            <View style={styles.Content}>
              <Text style={styles.txtTitle}>Đơn đã tạo</Text>
              <Text style={styles.txtResult}>7</Text>
            </View>
            <View style={styles.Content}>
              <Text style={styles.txtTitle}>Đơn chờ xử lý</Text>
              <Text style={styles.txtResult}>3</Text>
            </View>
          </LinearGradient>
          <View style={styles.buttonRight}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.button, isPressed === 1 && styles.buttonPressed]}
              onPressIn={() => handlePressIn(1)}
              onPressOut={handlePressOut}>
              <Icon
                name="qrcode"
                size={24}
                color={isPressed === 1 ? '#198B4D' : '#454545'}
              />
              <Text
                style={[
                  styles.txtButton,
                  isPressed === 1 && styles.txtButtonPressed,
                ]}>
                Quét mã
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onPressIn={() => handlePressIn(2)}
              onPressOut={handlePressOut}
              style={[styles.button, isPressed === 2 && styles.buttonPressed]}>
              <Icon
                name="plus-circle-outline"
                size={24}
                color={isPressed === 2 ? '#198B4D' : '#454545'}
              />
              <Text
                style={[
                  styles.txtButton,
                  isPressed === 2 && styles.txtButtonPressed,
                ]}>
                Tạo đơn hàng
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonUnder}>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => handlePressIn(3)}
            onPressOut={handlePressOut}
            style={[styles.button, isPressed === 3 && styles.buttonPressed]}>
            <Icon
              name="printer-outline"
              size={24}
              color={isPressed === 3 ? '#198B4D' : '#454545'}
            />
            <Text
              style={[
                styles.txtButton,
                isPressed === 3 && styles.txtButtonPressed,
              ]}>
              In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => handlePressIn(4)}
            onPressOut={handlePressOut}
            style={[styles.button, isPressed === 4 && styles.buttonPressed]}>
            <Icon
              name="moped-outline"
              size={24}
              color={isPressed === 4 ? '#198B4D' : '#454545'}
            />
            <Text
              style={[
                styles.txtButton,
                isPressed === 4 && styles.txtButtonPressed,
              ]}>
              Giao hàng
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => handlePressIn(5)}
            onPressOut={handlePressOut}
            style={[styles.button, isPressed === 5 && styles.buttonPressed]}>
            <Icon
              name="note-multiple-outline"
              size={24}
              color={isPressed === 5 ? '#198B4D' : '#454545'}
            />
            <Text
              style={[
                styles.txtButton,
                isPressed === 5 && styles.txtButtonPressed,
              ]}>
              Xử lý đơn
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Notifi}>
          <Text style={styles.txtTitleSaleOff}>Khuyến mãi tháng 6</Text>
          <View style={styles.contentSaleOff}>
            <Text style={styles.headLine}>*</Text>
            <Text style={styles.txtContent}>
              Giảm 25% khi mua 2 sản phẩm trở lên
            </Text>
          </View>
          <View style={styles.contentSaleOff}>
            <Text style={styles.headLine}>*</Text>
            <Text style={styles.txtContent}>
              Free ship các hóa đơn từ 1 triệu
            </Text>
          </View>
          <Svg height="2" width="100%">
            <Line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="#D3D4DB"
              strokeWidth="3"
            />
          </Svg>
          <Text style={styles.txtContent}>Áp dụng tại tất cả chi nhánh</Text>
        </View>

        <View style={styles.dotsContainer}>
          {dotList.map((dot, index) => (
            <View
              key={index}
              style={dotLight === index ? styles.dotLight : styles.dot}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Navigation />
      </View>
    </View>
  );
};

export default index;
