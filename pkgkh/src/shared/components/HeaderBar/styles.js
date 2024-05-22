import {StyleSheet} from 'react-native';
import {Colors, Sizes, Width} from '~theme';

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
    height: 26,
    width: 60,
    resizeMode: 'contain',
  },
  icon: {
    color: Colors.white,
    fontSize: Sizes.icon,
    marginHorizontal: Sizes.padding,
  },
  wrapEnv: {
    position: 'relative',
    right: Width / 2 - 28,
  },
  textEnv: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
  },
});
