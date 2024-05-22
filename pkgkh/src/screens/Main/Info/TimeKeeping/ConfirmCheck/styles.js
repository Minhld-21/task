import {StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize, Height, Width} from '~theme';

export default styles = StyleSheet.create({
  txtCheckin: {
    fontSize: Sizes.normal,
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 16,
  },
  btnCheckin: {
    borderRadius: 100,
    height: 'auto',
    backgroundColor: '#07183B',
    flex: 1,
  },
  txtCheckout: {
    fontSize: Sizes.normal,
    color: '#4E41D9',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 16,
  },
  btnCheckout: {
    borderWidth: 2,
    borderRadius: 100,
    height: 'auto',
    backgroundColor: Colors.white,
    borderColor: '#4E41D9',
    flex: 1,
  },
  boxBtn: {
    height: 'auto',
    backgroundColor: Colors.white,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 10,
    flex: 0.2,
  },
  content2: {
    width: '90%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingRight: 20,
    gap: 8,
    marginTop: 10,
  },
  space: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    width: '90%',
    paddingTop: 20,
  },
  txtBottomContent: {
    fontSize: Sizes.small,
    fontWeight: '500',
    color: '#3D3D3D',
  },
  iconInfo: {
    fontSize: 25,
    color: '#4E41D9',
  },
  txtContent: {
    fontSize: Sizes.normal,
    fontWeight: '500',
    color: '#3D3D3D',
  },
  txtTitle: {
    fontSize: Sizes.normal,
    fontWeight: '600',
    color: '#4E41D9',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  boxContent: {
    gap: 10,
    alignItems: 'left',
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 29,
  },
  txtBirthday: {
    color: '#07183B',
    fontSize: Sizes.normal,
  },
  txtName: {
    color: '#07183B',
    fontWeight: '600',
    fontSize: Sizes.large,
    paddingTop: '15%',
  },
  boxInfo: {
    marginTop: 60,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: '85%',
    alignItems: 'center',
    height: 'auto',
    borderRadius: 24,
  },
  boxInfo2: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: '85%',
    alignItems: 'center',
    height: 'auto',
    borderRadius: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
    position: 'absolute',
    top: -40,
  },
  txtHeader: {
    fontSize: Sizes.large,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },
  iconBack: {
    fontSize: 40,
    color: Colors.white,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: '50',
    minHeight: '50',
    alignItems: 'center',
    backgroundColor: '#4E41D9',
  },
  fontUnder: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    backgroundColor: '#4E41D9',
    borderBottomLeftRadius: 64,
    borderBottomRightRadius: 64,
  },
  body: {
    flex: 1,
    bottom: 5,
  },
  container: {
    flex: 1,
  },
});
