import { StyleSheet } from "react-native";
import { Colors, Sizes, parseSize, Width } from '~theme';

export default styles = StyleSheet.create({
  wrapItemProduct: {
    borderWidth: Sizes.border,
    borderColor: Colors.info,
    marginVertical: 5,
    marginHorizontal: Sizes.padding,
    borderRadius: Sizes.radius / 2,
  },
  wrapInfoProduct: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding / 2,
    marginTop: 2,
    backgroundColor: '#FFF7F2',
  },
  wrapIconRemove:{
    position:'absolute',
    right:2,
    top:3,
    zIndex:1,
    elevation:1,
  },
  iconRemove: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 24, 
    fontWeight:'bold',
    color: Colors.darkGrey, 
  },
  imgProduct: {
    height: parseSize(100),
    width: parseSize(90),
  },
  wrapDetailProduct: {
    flex:1,
    alignItems: 'flex-start',
    marginVertical: Sizes.margin / 2,
    paddingHorizontal:Sizes.padding,
  },
  wrapPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Sizes.margin / 2,
  },
  textNameProduct: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.warning,
  },
  textProductCode:{
    fontFamily: 'Hahmlet-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  textPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.red,
  },
  textPriceDiscount: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: Sizes.margin,
    textDecorationLine: 'line-through',
    color: Colors.lightDark,
  },
  wrapQuality: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapChangeQuality: {
    height: parseSize(20),
    width: parseSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Sizes.border,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  textQuality: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  wrapNumberQuality: {
    height: parseSize(24),
    width: parseSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Sizes.border,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
})