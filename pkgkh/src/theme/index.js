import {Dimensions, Platform, StatusBar} from 'react-native';

import deviceInfo from '~helper/deviceInfo';

export const platform = Platform.OS;
const deviceName = deviceInfo.deviceName || '';
let iPhoneX = [
  'IPHONE X',
  'IPHONE XS',
  'IPHONE XS MAX',
  'IPHONE XR',
  'IPHONE 11',
  'IPHONE 11 PRO',
  'IPHONE 11 PRO MAX',
  'IPHONE 12',
  'IPHONE 12 PRO',
  'IPHONE 12 PRO MAX',
  'IPHONE 12 MINI',
];
export const isIphoneX =
  platform === 'ios' && iPhoneX.indexOf(deviceName.toUpperCase()) > -1;

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const screenAvg = (Width + Height) / 2;

export const parseSize = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const percent = elemSize / screenAvg;
  return screenAvg * percent;
};

export const STATUS_BAR_HEIGHT =
  platform === 'ios' ? (isIphoneX ? 80 : 40) : StatusBar.currentHeight;

export const Colors = {
  default: '#2b96d2',
  background: '#F5F6F7',
  content: '#FFFFFF',
  red: '#FF0000',
  darkGrey: '#595959',
  green: '#15753C',
  black: '#000000',
  lightDefault: '#54abdc',
  purple: '#BA00FF',
  price: '#B14234',
  white: '#FFFFFF',
  lightWhite: '#F5F6F7',
  dark: '#414141',
  lightDark: '#999999',
  border: '#EFEFEF',
  info: '#3399ff',
  lightInfo: '#00ccff',
  warning: '#DB7C34',
  lightWarning: '#FEF1E8',
  danger: '#E55752',
  lightDanger: '#fd8389',
  success: '#08B938',
  link: '#0095f6',
  yellow: '#F2CA00',
  lightYellow: '#F2CA00',
  headerBar: '#D9D9D9',
  primary: '#D39A4B',
  black: '#000000',
};

export const Sizes = {
  tab: parseSize(30),
  icon: parseSize(34),
  logo: parseSize(120),
  input: parseSize(54),
  text: parseSize(12),
  title: parseSize(16),
  inputHeight: parseSize(40),
  button: parseSize(40),
  item: parseSize(72.8),
  slideMedium: parseSize(140),
  slideLarge: parseSize(230),
  imageMedium: parseSize(58),
  imageLarge: parseSize(100),
  tiny: parseSize(10),
  lesser: parseSize(11.4),
  small: parseSize(13.52),
  normal: parseSize(15.6),
  medium: parseSize(18.72),
  large: parseSize(21.97),
  master: parseSize(36.4),
  padding: parseSize(10),
  margin: parseSize(10),
  shadow: parseSize(5),
  radius: parseSize(10),
  border: parseSize(1),
  headerHeight: parseSize(104),
  bottomHeight: parseSize(80),
};
export const FontStyles = {
  HahmletBold: 'Hahmlet-Bold',
  HahmletRegular: platform === 'ios' ? 'Hahmlet-Regular' : 'Hahmlet-Medium',
};
