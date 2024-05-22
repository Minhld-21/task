import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

export default styles = StyleSheet.create({
  wrapListProdut: {
    marginTop: Sizes.margin,
  },
  wrapItemProduct: {
    width: Width * 0.45,
    marginVertical: Sizes.margin / 2,
    marginHorizontal: Sizes.margin / 2,
    backgroundColor: '#FFF7F2',
    borderWidth: Sizes.border,
    borderColor: Colors.border,
    borderRadius: Sizes.radius,
  },
  imgProduct: {
    height: Width * 0.5,
    width: Width * 0.45,
    borderRadius: Sizes.radius,
  },
  wrapDetailProduct: {
    flex: 1,
    marginHorizontal: Sizes.margin,
    marginVertical: Sizes.margin,
  },
  wrapPrice: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: Sizes.margin / 2,
  },
  textNameProduct: {
    fontFamily: 'Hahmlet-Bold',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  textPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.warning,
  },
  textQuality: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  groupIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
