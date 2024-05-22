import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize} from '~theme';

export default styles = StyleSheet.create({
  container: {
    marginTop: Sizes.margin / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
  },
  selectStoreBox: {
    minHeight: parseSize(40),
    borderColor: Colors.dark,
    borderWidth: Sizes.border,
    borderRadius: Sizes.radius,
    paddingHorizontal: Sizes.padding * 2,
    paddingVertical: Sizes.margin,
  },
  textStyleSelect: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
    paddingVertical: Sizes.margin * 0.8,
  },
  labelStyleSelect: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.info,
  },
  searchTextInputStyle: {
    height: 40,
  },
  textTitleStyle: {
    marginLeft: Sizes.margin,
    marginBottom: Sizes.margin / 2,
    fontFamily: 'Hahmlet-Regular',
    color: '#5B5353',
    fontSize: 10,
  },
});
