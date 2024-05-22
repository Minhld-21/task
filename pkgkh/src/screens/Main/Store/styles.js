import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize} from '~theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingBottom: parseSize(-30),
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.margin,
  },
  textNoProduct: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.danger,
  },
  scrollToTopButtonContainer: {
    position: 'absolute',
    bottom: parseSize(10),
    right: parseSize(10),
    backgroundColor: Colors.default,
    padding: Sizes.padding,
    borderRadius: Sizes.radius * 2,
  },
  iconToTop: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 18,
    color: Colors.white,
  },
  columnWrapperStyleProp: {
    backgroundColor: Colors.lightWhite,
  },
  styleFlatList: {
    marginTop: Sizes.margin,
  },
});
