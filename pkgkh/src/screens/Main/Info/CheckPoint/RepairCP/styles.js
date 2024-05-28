import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

export default styles = StyleSheet.create({
  line: {
    borderWidth: 1,
    borderColor: '#EBF0FF',
  },
  btn: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxRight: {
    flex: 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: '#EBF0FF',
    backgroundColor: '#F6F5F2',
  },
  boxLeft: {
    flex: 8,
    marginVertical: 10,
  },
  txtAdress: {
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
  },
  txtLocation: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4E41D9',
  },
  box: {
    flexDirection: 'row',
    flex: 1,
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    gap: 5,
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#9098B1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
