import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {navigate} from '~navigator/navigationUtils';
import moment from 'moment';
import {useTranslation} from 'react-i18next';


import {Colors, Sizes, parseSize} from '~theme';
import {commonActions, userSelectors} from '~reduxCore/reducers';
import currencyFormat from '~helper/currencyFormat';
import formatNumber from '~helper/formatNumber';
import AlertModal from '~shared/components/Modals/AlertModal';

const Index = props => {
  const {t} = useTranslation();
  const {orderCode} = props?.route?.params;


  const dispatch = useDispatch();
  const userInfo = useSelector(state => userSelectors.getUserData(state));
  const [dataProduct, setDataProduct] = useState([]);
  const [totalSalesOff, setTotalSalesOff] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [visbleAlertModal, setVisibleAlertModal] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [listDVCT, setListDVCT] = useState([
    {
      ID: 1,
      Title: 'Gói bọc',
      DonGia: 0,
      SoLuong: 0,
      ChiTiet: '',
      isCheck: false,
    },
    {
      ID: 2,
      Title: 'Gói quà',
      DonGia: 0,
      SoLuong: 0,
      ChiTiet: '',
      isCheck: false,
    },
    {
      ID: 3,
      Title: 'Hologram',
      DonGia: 100000,
      SoLuong: 0,
      ChiTiet: '',
      ischeck: false,
    },
    {
      ID: 4,
      Title: 'Sản phẩm gieo duyên',
      DonGia: 0,
      SoLuong: 0,
      ChiTiet: '',
      ischeck: false,
    },
  ]);

  // get data detail order
  useEffect(() => {
    getDetailOrder();
  }, []);
  // handle get detail order
  const getDetailOrder = async () => {
    const payload = await {
      params: {
        loai: 12,
        madonhang: orderCode,
        idcuahang: 0,
      },
      onSuccess: data => {
        // Lọc sản phẩm ra khỏi dvct
        setDataOrder(data?.DonHang[0]);
        let SanPham = JSON.parse(data?.DonHang[0].SanPham);
        const filteredProducts = SanPham.filter(product =>
          product.MaSanPham.startsWith('PPK'),
        );
        setDataProduct(filteredProducts);
        //Tính tổng tiền sản phẩm
        const totalAmount = filteredProducts.reduce(
          (total, product) => total + product.ThanhTien * product.SoLuong,
          0,
        );
        setTotalAmount(totalAmount);
        // Tổng tiền giảm trên sản phẩm
        const totalSalesOff = filteredProducts.reduce(
          (total, product) => total + (product.TongDonGia - product.ThanhTien),
          0,
        );
        setTotalSalesOff(totalSalesOff);
        // Tách dịch vụ cộng thêm
        const mergedData = listDVCT.map(item => {
          const findData = SanPham.find(item2 => item2.IDSanPham == item?.ID);
          if (findData) {
            return {
              ...item,
              SoLuong: findData.SoLuong,
              ChiTiet: findData.ChiTiet,
              isCheck: true,
            };
          }
          return item;
        });
        setListDVCT(mergedData);
      },
      onError: () => {},
    };
    await dispatch(commonActions.getDetailOrder(payload));
  };
  const KhuyenMaiJson =
    dataOrder?.MaGiamGia && dataOrder?.MaGiamGia.length > 0
      ? JSON.parse(dataOrder?.MaGiamGia)
      : [];

  // Cancel Order
  const cancelOrder = async () => {
    const payload = await {
      params: {
        loai: 3,
        iddonhang: dataOrder?.IDDonHang,
        IDNguoiThucHien: userInfo?.IDNguoiDung,
      },
      onSuccess: async mes => {
        await setVisibleAlertModal(false);
        await showMessage({
          duration: 3000,
          message: mes,
          type: 'success',
        });
        navigation.goBack();
      },
      onError: async err => {
        await setVisibleAlertModal(false);
        await showMessage({
          duration: 3000,
          message: err,
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.cancelOrder(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle="Chi tiết đơn hàng" />
      <ScrollView style={styles.content}>
        <View style={styles.wrapOrder}>
          <View style={styles.wrapTotalPrice}>
            <Text style={styles.textTitleTotalPrice}>
              Đơn hàng {dataOrder?.MaDonHang}
            </Text>
            <Text style={styles.textValueTotalPrice}>
              {currencyFormat(dataOrder?.TongSoTienThanhToan)}
            </Text>
            <Text style={styles.textStatus}>{dataOrder?.TinhTrangDonHang}</Text>
          </View>
          <View style={styles.wrapAllDetailOrder}>
            <View style={styles.wrapDetailOrder}>
              <Text style={styles.textTitleDetail}>VAT: </Text>
              <Text style={styles.textValueDetail}>
                {currencyFormat(dataOrder?.VAT)}
              </Text>
            </View>
            <View style={styles.wrapDetailOrder}>
              <Text style={styles.textTitleDetail}>Giá giảm: </Text>
              <Text style={styles.textValueDetail}>
                {currencyFormat(dataOrder?.SoTienGiam)}
              </Text>
            </View>
            <View style={styles.wrapDetailOrder}>
              <Text style={styles.textTitleDetail}>Phí ship: </Text>
              <Text style={styles.textValueDetail}>
                {currencyFormat(dataOrder?.PhiShip)}
              </Text>
            </View>
            <View style={styles.wrapAllDiscount}>
              <Text style={styles.textTitleDetail}>Khuyến mãi: </Text>
              <View style={styles.wrapDiscount}>
                {KhuyenMaiJson &&
                  KhuyenMaiJson.length > 0 &&
                  KhuyenMaiJson.map((item, index) => {
                    return (
                      <View style={styles.wrapDetailDiscount} key={index}>
                        <Text style={styles.textValueDiscount}>
                          {item?.LoaiGiamGia}
                        </Text>
                        <Text style={styles.textValueDiscount}>
                          {item?.MaGiamGia}
                        </Text>
                        <Text style={styles.textValueDiscount}>
                          {currencyFormat(item?.SoTienGiam)}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
            <View style={styles.wrapDetailOrder}>
              <Text style={styles.textTitleDetail}>DVCT: </Text>
              <View style={styles.wrapValueDVCT}>
                {listDVCT.map(item =>
                  item?.SoLuong > 0 ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.textValueDetail}>
                        {item.Title}(
                        {item?.ID === 4 ? item?.ChiTiet : item?.SoLuong})
                      </Text>
                    </View>
                  ) : null,
                )}
              </View>
            </View>
            <View style={styles.wrapDetailOrder}>
              <Text style={styles.textTitleDetail}>Nhận hàng: </Text>
              <Text style={styles.textValueDetail}>
                {dataOrder?.HinhThucNhanHang == 1
                  ? 'Giao hàng'
                  : dataOrder?.HinhThucNhanHang == 2
                  ? 'Nhận tại shop'
                  : 'Bán hàng trực tiếp'}
              </Text>
            </View>
            <View style={styles.wrapDetailOrder}>
              <Text style={styles.textTitleDetail}>Thanh toán: </Text>
              <Text style={styles.textValueDetail}>
                {dataOrder?.HinhThucThanhToan == 1
                  ? 'Giao hàng thu tiền'
                  : dataOrder?.HinhThucThanhToan == 2
                  ? 'Chuyển khoản'
                  : 'Ghi nợ'}
              </Text>
            </View>
            <View style={styles.wrapDetailOrder}>
              <Text style={styles.textTitleDetail}>Ngày đặt hàng: </Text>
              <Text style={styles.textValueDetail}>
                {moment(dataOrder?.NgayDatHang).format('DD/MM/YYYY HH:mm:ss')}
              </Text>
            </View>
          </View>
          <View style={styles.wrapInfoCutomer}>
            <View style={styles.wrapDetailCustomer}>
              <Text style={styles.textTitleDetail}>Tên Khách hàng: </Text>
              <Text style={styles.textValueDetail}>{dataOrder?.NguoiNhan}</Text>
            </View>
            <View style={styles.wrapDetailCustomer}>
              <Text style={styles.textTitleDetail}>Sinh nhật: </Text>
              <Text style={styles.textValueDetail}>
                {dataOrder?.NgaySinhNhat != null
                  ? moment(dataOrder?.NgaySinhNhat).format('DD/MM/YYYY')
                  : ''}
              </Text>
            </View>
            <View style={styles.wrapDetailCustomer}>
              <Text style={styles.textTitleDetail}>Điện thoại: </Text>
              <Text style={styles.textValueDetail}>
                {dataOrder?.DienThoaiKhachHang}
              </Text>
            </View>
            <View style={styles.wrapDetailCustomer}>
              <Text style={styles.textTitleDetail}>Email: </Text>
              <Text style={styles.textValueDetail}>{dataOrder?.Email}</Text>
            </View>
            <View style={styles.wrapDetailCustomer}>
              <Text style={styles.textTitleDetail}>Địa chỉ: </Text>
              <Text style={styles.textValueDetail}>
                {dataOrder?.DiaChiNhan},{dataOrder?.ThanhPhoNhan}
              </Text>
            </View>
            <View style={styles.wrapDetailCustomer}>
              <Text style={styles.textTitleDetail}>Ghi Chú: </Text>
              <Text style={styles.textValueDetail}>{dataOrder?.GhiChu}</Text>
            </View>
          </View>
        </View>
        <View style={styles.wapProduct}>
          <Text style={styles.titleProduct}>Danh sác sản phẩm</Text>
          <View style={styles.wrapAllProduct}>
            {dataProduct &&
              dataProduct.length > 0 &&
              dataProduct.map((item, index) => {
                return (
                  <View style={styles.wrapProduct} key={index}>
                    <View style={styles.wrapNameProduct}>
                      <Text style={styles.textNameProduct}>
                        {item?.TenSanPham}
                      </Text>
                    </View>
                    <View style={styles.wrapDetailProduct}>
                      <View style={styles.wrapPrice}>
                        <Text style={styles.textPriceOrigin}>
                          {item?.TongDonGia > 0
                            ? formatNumber(item?.TongDonGia)
                            : t('contactPrice')}
                        </Text>
                        <Text style={styles.textPriceSalesOff}>
                          {item?.TongDonGia - item?.ThanhTien > 0
                            ? formatNumber(item?.TongDonGia - item?.ThanhTien)
                            : ''}
                        </Text>
                      </View>
                      <View style={styles.wrapQuality}>
                        <Text style={styles.textQuality}>x{item?.SoLuong}</Text>
                      </View>
                      <View style={styles.wrapFinalAmount}>
                        <Text style={styles.textFinalAmount}>
                          {currencyFormat(item?.ThanhTien)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={styles.wrapAllTotal}>
            <View style={styles.wrapItemTotal}>
              <Text style={styles.textLabelTotal}>Đã giảm: </Text>
              <Text style={styles.textTotalSalesOff}>
                {currencyFormat(totalSalesOff)}
              </Text>
            </View>
            <View style={styles.wrapItemTotal}>
              <Text style={styles.textLabelTotal}>Thành tiền: </Text>
              <Text style={styles.textTotalPayment}>
                {currencyFormat(totalAmount)}
              </Text>
            </View>
          </View>
        </View>
        <AlertModal
          visible={visbleAlertModal}
          title={'Thông báo'}
          content={'Bạn có chắc chắn muốn huỷ đơn hàng trên không?'}
          onConfirm={() => cancelOrder()}
          onCancel={() => setVisibleAlertModal(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.margin,
  },
  wrapOrder: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding,
    borderRadius: Sizes.radius,
  },
  wrapTotalPrice: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitleTotalPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.dark,
  },
  textValueTotalPrice: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.warning,
  },
  textStatus: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.success,
  },
  wrapAllDetailOrder: {
    paddingVertical: Sizes.padding,
    borderBottomColor: Colors.border,
    borderBottomWidth: Sizes.border * 2,
    borderStyle: 'dotted',
  },
  wrapDetailOrder: {
    paddingVertical: Sizes.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleDetail: {
    flex: 0.3,
    textAlign: 'left',
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  wrapValueDVCT: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textValueDetail: {
    flex: 0.7,
    textAlign: 'right',
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  wrapInfoCutomer: {},
  wrapDetailCustomer: {
    paddingVertical: Sizes.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wrapAllDiscount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapDetailDiscount: {
    width: parseSize(150),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textValueDiscount: {
    paddingLeft: parseSize(10),
    textAlign: 'left',
    fontFamily: 'Hahmlet-Regular',
    fontSize: 10,
    color: Colors.dark,
  },
  wapProduct: {
    marginVertical: Sizes.margin,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding / 2,
    borderRadius: Sizes.radius,
  },
  titleProduct: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.dark,
  },
  wrapAllProduct: {
    borderTopColor: Colors.darkGrey,
    borderTopWidth: Sizes.border,
    marginVertical: Sizes.margin,
    paddingVertical: Sizes.padding / 2,
  },
  textNameProduct: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.warning,
  },
  wrapDetailProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Sizes.margin,
    paddingVertical: Sizes.padding / 2,
  },
  wrapPrice: {
    flexDirection: 'row',
  },
  textPriceOrigin: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.lightDark,
  },
  textPriceSalesOff: {
    marginLeft: Sizes.margin,
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.lightDark,
    textDecorationLine: 'line-through',
  },
  wrapQuality: {},
  textQuality: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.lightDark,
  },
  wrapFinalAmount: {},
  textFinalAmount: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.darkGrey,
  },
  wrapItemTotal: {
    paddingVertical: Sizes.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapAllTotal: {
    borderTopColor: Colors.darkGrey,
    borderTopWidth: Sizes.border,
  },
  textLabelTotal: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  textTotalSalesOff: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  textTotalPayment: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.danger,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding,
  },
  buttonUpdate: {
    height: parseSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.default,
    marginVertical: Sizes.margin / 2,
  },
  textButton: {
    fontFamily: 'Hahmlet-Bold',
    fontSize: 12,
    color: Colors.white,
  },
  buttonCancel: {
    height: parseSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.danger,
    marginVertical: Sizes.margin / 2,
  },
  buttonComfirm: {
    height: parseSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.success,
    marginVertical: Sizes.margin / 2,
  },
});
