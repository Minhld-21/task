import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize} from '~theme';

export default styles = StyleSheet.create({
  containerHeaderStyle: {
    height: parseSize(40),
    flexDirection: 'row',
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
    color: '#918D9E',
  },
  textTitleHeader: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-SemiBold',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});
