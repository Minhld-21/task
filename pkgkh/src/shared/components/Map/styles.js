import {StyleSheet} from 'react-native';
import {Colors, parseSize} from '~theme';

export default styles = StyleSheet.create({
  btnBack: {
    position: 'absolute',
    zIndex: 2,
    marginLeft: 10,
  },
  txtHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  header: {
    backgroundColor: Colors.background,
    height: parseSize(50),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  body: {
    width: '80%',
    height: '50%',
    gap: 20,
    alignSelf: 'center',
    top: '10%',
  },
  chooseAdress: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  boxInput: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 1,
    width: '70%',
    justifyContent: 'center',
  },
  iconClose: {
    position: 'absolute',
    zIndex: 2,
    right: 7,
  },
  iconSerch: {
    position: 'absolute',
    zIndex: 2,
    left: 7,
  },
  input: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    // Text styling
    fontSize: 14,
    fontWeight: '500',
    color: '#9098B1',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  txtBtn: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  btnConfirm: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    backgroundColor: '#4E41D9',
    width: '70%',
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  map: {
    flex: 1,
  },
});
