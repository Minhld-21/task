import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

export default styles = StyleSheet.create({
  txtTitle: {
    color: '#223263',
    fontWeight: '700',
    fontSize: 16,
  },
  boxInput: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
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
  btn: {
    backgroundColor: '#4E41D9',
    width: '80%',
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 25,
    flex: 1,
    marginHorizontal: 10,
  },
  bottom: {
    flexDirection: 'row',
    width: '80%',
    gap: 10,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
