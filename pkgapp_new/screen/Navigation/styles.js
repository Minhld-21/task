import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  Svg: {
    stroke: 'rgba(221, 221, 227, 1.0)',
    strokeWidth: 1,
    fill: '#F9F9FB',
  },
  txtFastAccess: {
    fontWeight: '500',
    x: '150',
    y: '65',
    textAnchor: 'middle',
    fontSize: '12',
    fill: '#0A8040',
  },

  btnAccessGradient: {
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFastAccess: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    width: 66,
    height: 66,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#B9BBC6',
    top: -25,
    backgroundColor: 'white',
  },
  btnLongPress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  btnNavigation: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  Container: {
    paddingVertical: 25,
    paddingHorizontal: 5,
    gap: 160,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 5,
  },
});
