import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  svgBottomBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  svgTopBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dotLight: {
    width: 48,
    height: 6,
    borderRadius: 100,
    backgroundColor: '#198B4D',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#DDDDE3',
    borderRadius: 5,
  },

  txtContent: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#7E808A',
  },
  headLine: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#1C2024',
  },
  contentSaleOff: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  txtTitleSaleOff: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#1C2024',
  },
  Notifi: {
    borderRadius: 24,
    backgroundColor: '#F9F9FB',
    borderWidth: 1,
    borderColor: 'rgba(221, 221, 227, 1.0)',
    marginTop: 24,
    paddingHorizontal: 27,
    paddingVertical: 11,
    gap: 8,
  },
  txtButtonPressed: {
    color: '#0A8040',
  },
  buttonPressed: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#198B4D',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  txtButton: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#7E808A',
    textAlign: 'center',
  },
  button: {
    width: 97,
    height: 98,
    borderRadius: 16,
    backgroundColor: '#F9F9FB',
    borderWidth: 1,
    borderColor: 'rgba(221, 221, 227, 1.0)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 6,
    paddingVertical: 15,
  },
  txtResult: {
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#F9F9FB',
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#F9F9FB',
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  txtResulOrderOfday: {
    fontSize: 32,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: '#F9F9FB',
    zIndex: 1,
  },
  txtOrdorOfday: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#F9F9FB',
    zIndex: 1,
  },

  quantityOrder: {
    borderRadius: 24,
    paddingHorizontal: 33,
    paddingVertical: 27,
    gap: 24,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonRight: {
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  buttonUnder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  InforOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottom: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  body: {
    flex: 0.6,
  },
  header: {
    flex: 0.1,
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
});
