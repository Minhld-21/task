import {StyleSheet} from 'react-native';
import {Sizes, Colors, parseSize, Height} from '~theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },

  headerLogin_logo: {
    width: parseSize(200),
    height: parseSize(150),
  },
  header: {
    height: Height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    height: Height * 0.5,
    justifyContent: 'flex-start',
  },
  footer: {
    height: Height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#08126A',
  },
  wrapFormLogin: {
    flex: 1,
    paddingHorizontal: Sizes.padding,
    marginTop: 20,
  },
  buttonLogin: {
    backgroundColor: '#EB6920',
    marginTop: 20,
  },
  buttonReister: {
    backgroundColor: Colors.info,
    marginTop: 0,
  },
  copyright: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-regular',
    fontSize: 10,
    color: '#08126A',
  },
  wrapVersion: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Sizes.margin,
  },
  textCopyright: {
    fontFamily: 'Hahmlet-regular',
    fontSize: 10,
    color: '#08126A',
  },
  textVersion: {
    fontFamily: 'Hahmlet-regular',
    textAlign: 'right',
    marginRight: parseSize(10),
    fontSize: 10,
    color: '#08126A',
  },
  wrapFogetPass: {
    marginTop:Sizes.margin/2,
    marginRight: Sizes.margin * 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textForgetPass:{
    fontFamily: 'Hahmlet-regular',
    fontSize: 12,
    color: '#08126A',
    textDecorationLine:'underline',
  }
});
