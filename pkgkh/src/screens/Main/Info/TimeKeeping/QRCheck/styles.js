import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
  },
  cameraStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
  markerContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerStyle: {
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 20,
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  animatedLine: {
    width: '100%',
    height: 5,
    backgroundColor: '#84C7E3',
  },
  overlay: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.info,
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
    color: Colors.white,
  },
  txtHeader: {
    color: Colors.white,
    fontSize: Sizes.large,
    fontWeight: '600',
  },
  overlayText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: Sizes.medium,
    color: 'white',
    marginVertical: 10,
  },
  wrapCammera:{
    flex: 1,
    joustifyContent: 'center',
    alignItems: 'center',
  },
  btnCamera: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  iconCamera: {
    fontSize: 80,
    color: Colors.white,
  },
});
