import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.margin,
  },
  wrapListImage: {
    height: parseSize(Width),
    borderRadius: Sizes.radius,
  },
  wrapImage: {
    borderRadius: Sizes.radius,
  },
  imageProduct: {
    height: parseSize(Width),
    borderRadius: Sizes.radius,
  },
  containerLike: {
    backgroundColor: Colors.white,
    position: 'absolute',
    padding: 15,
    bottom: -30,
    left: 20,
    borderRadius: Sizes.radius * 10,
  },
  wrapInfo: {
    flex: 0.5,
    marginTop: Sizes.margin * 3,
    paddingHorizontal:Sizes.padding,
  },
  nameProduct: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  wrapPrice: {
    alignItems: 'flex-start',
    marginVertical: Sizes.margin / 2,
  },
  textPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.warning,
  },
  groupPriceCart:{
    marginVertical:Sizes.margin,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'flex-start',
  },
  containerCart:{
    backgroundColor: '#CCC',
    height: parseSize(45),
    width: parseSize(45),
    justifyContent:'center',
    alignItems:'center',
    top:-5,
    left: 20,
    borderRadius: Sizes.radius * 10,
  },
  iconCart:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapDescription:{
    marginVertical:Sizes.margin/2,
  },
  titleDesciption:{
    fontFamily: 'Hahmlet-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  wrapBranch:{
    marginTop:Sizes.margin,
  },
  nameBranch:{
    textAlign:'center',
    fontFamily: 'Hahmlet-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.warning,
  },
  groupDetail:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  groupAddress:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  titleBranch:{
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  valueBranch:{
    flex:1,
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight:'bold',
    color: Colors.dark,
  },
  wrapLogo:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFooter:{
    height:parseSize(80),
    width:parseSize(100),
  }
});
