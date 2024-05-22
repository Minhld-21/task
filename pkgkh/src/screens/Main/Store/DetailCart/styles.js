import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.margin,
  },
  wrapTotal: {
    paddingHorizontal: Sizes.margin,
    marginVertical: Sizes.margin,
  },
  groupTotal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingVertical: Sizes.padding,
  },
  labelTotal: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark,
  },
  valueTotal: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark,
  },
  valueTotalPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  textNote: {
    height: parseSize(50),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 12,
    color: Colors.dark,
  },
});
