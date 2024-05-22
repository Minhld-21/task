import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize} from '~theme';

export default styles = StyleSheet.create({
  container: {},
  content: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lightInfo,
    paddingHorizontal: Sizes.padding,
    borderRadius: 2,
  },
  wrapRightHeaderBar: {
    flexDirection: 'row',
    paddingLeft: Sizes.padding,
  },
  logoStyle: {
    height: parseSize(26),
    width: parseSize(60),
    resizeMode: 'contain',
  },
  icon: {
    color: Colors.white,
    fontSize: Sizes.icon,
    marginHorizontal: Sizes.padding,
  },
  wrapNumberProduct: {
    position: 'absolute',
    right: 5,
    top: -3,
    borderRadius: Sizes.radius,
    backgroundColor: Colors.red,
  },
  numberProduct: {
    fontSize: 10,
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    color: Colors.white,
    paddingHorizontal: Sizes.padding / 1.5,
    paddingVertical: 2,
  },
  wrapEnv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEnv: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
  },
});
