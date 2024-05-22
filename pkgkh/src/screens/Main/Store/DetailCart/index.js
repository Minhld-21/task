import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {navigate} from '~navigator/navigationUtils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';

import styles from './styles';
import {
  orderActions,
  orderSelectors,
  userSelectors,
  commonActions,
} from '~reduxCore/reducers';
import currencyFormat from '~helper/currencyFormat';
import {Width} from '~theme';
import HeaderBarStore from '~components/HeaderBarStore';
import HeaderTitle from '~components/HeaderTitle';
import ListProduct from './ListProduct';
import NatioPicker from '~shared/components/DropDownPicker/Components/NatioPicker';
import ProvincePicker from '~shared/components/DropDownPicker/Components/ProvincePicker';
import ZipCodePicker from '~shared/components/DropDownPicker/Components/ZipCodePicker';
import MethodPicker from '~shared/components/DropDownPicker/Components/MethodPicker';
import PaymentPicker from '~shared/components/DropDownPicker/Components/PaymentPicker';
import TransporterPicker from '~shared/components/DropDownPicker/Components/TransporterPicker';
import InputLabelValueText from '~shared/components/inputs/InputLabelValueText';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';
import ContactOrder from './ContactOrder';
import Discount from './Discount';
import AlertModal from '~shared/components/Modals/AlertModal';

const link = Config.API_URL_WEB;

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);
  // get data user
  const user = useSelector(state => userSelectors.getUserData(state));
  const [natioCode, setNatioCode] = useState(user?.MaQuocGia || 'VN');
  const [natioName, setNatioName] = useState(user?.TenQuocGia || 'Viet Nam');
  const [provinceCode, setProvinceCode] = useState(user?.MaBang);
  const [provinceName, setProvinceName] = useState(user?.TenBang);
  const [districtName, setDistrictName] = useState(user?.TenQuan);
  const [cityName, setCityName] = useState(user?.ThanhPho);
  const [address, setAddress] = useState(user?.DiaChi);
  const [fullName, setFullName] = useState(user?.TenNguoiDung);
  const [phone, setPhone] = useState(user?.DienThoai);
  const [email, setEmail] = useState(user?.EmailKhachHang);
  const [method, setMethod] = useState();
  const [transportData, setTransportData] = useState();
  const [payment, setPayment] = useState();
  const [feeShip, setFeeShip] = useState(0);
  const [discount, setDiscount] = useState();
  const [note, setNote] = useState('Giao hàng trong giờ hành chính');
  const [productChooses, setProductChooses] = useState([]);
  const [numberProduct, setNumberProduct] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountShip, setDiscountShip] = useState(0);
  const [discountAmout, setDiscountAmout] = useState(0);
  const [sumWeight, setSumWeight] = useState(0);
  const [stringDiscount, setStringDiscount] = useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [contentAlert, setConentAlert] = useState('');

  // handle aplly discount
  useEffect(() => {
    if (discount?.success === '01') {
      switch (discount?.LoaiGiamGia) {
        case 'FREESHIP':
          setDiscountShip(
            discount?.SoTienGiamGia + discount?.TyLeGiamGia * feeShip,
          );
          setStringDiscount(
            `(${discount?.LoaiGiamGia})[${discount?.MaGiamGia}]:${
              discount?.SoTienGiamGia + discount?.TyLeGiamGia * feeShip
            }`,
          );
          break;
        default:
          setDiscountAmout(
            discount?.SoTienGiamGia + discount?.TyLeGiamGia * totalAmount,
          );
          setStringDiscount(
            `(${discount?.LoaiGiamGia})[${discount?.MaGiamGia}]:${
              discount?.SoTienGiamGia + discount?.TyLeGiamGia * totalAmount
            }`,
          );
          break;
      }
    } else {
      setDiscountShip(0);
      setDiscountAmout(0);
      setStringDiscount('');
    }
  }, [discount]);

  // get totalAmout, sum quality and weight of list product
  useEffect(() => {
    var products = listProduct.map(item => {
      return {
        id: item.IDSanPham,
        soluongtrukho: item.SoLuongTrongKho,
        soluongdachon: item.SoLuongMua,
        giaban: item.GiaBan,
        giasaugiam: item.GiaSauGiam,
        tonggiaban: item.GiaSauGiam,
        thoigianbaohanh: item.ThoiGianBaoHanh,
        khoiluong: item.KhoiLuong,
        giamgiatien: item.GiamGia,
      };
    });
    setProductChooses(products);
    const sumQuality = listProduct.reduce(
      (tong, product) => tong + product.SoLuongMua,
      0,
    );
    setNumberProduct(sumQuality);
    const totalPrice = listProduct.reduce(
      (tong, product) => tong + product.GiaSauGiam * product.SoLuongMua,
      0,
    );
    setTotalAmount(totalPrice);
    setNumberProduct(sumQuality);
    const weights = listProduct.reduce(
      (tong, product) => tong + product.KhoiLuong * product.SoLuongMua,
      0,
    );
    setSumWeight(weights);
  }, [listProduct]);

  // get data cart
  const dataCarts = useSelector(state => orderSelectors.getCart(state));
  // set data for list product
  useEffect(() => {
    const updatedListProduct = [];
    dataCarts.map(item => {
      getProductById(item?.IDSanPham, item?.SoLuong, updatedListProduct);
    });
    setListProduct(updatedListProduct);
  }, [dataCarts]);
  // get product by id
  const getProductById = async (idsanphams, soluong, updatedListProduct) => {
    const payload = await {
      params: {
        idsanphams: idsanphams,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        updatedListProduct.push({...data, SoLuongMua: soluong});
        setListProduct([...updatedListProduct]); // Cập nhật listProduct sau khi getProductById
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(orderActions.getProductById(payload));
  };
  // xử lý freeship khi chọn phương thức thanh toán
  const handlePickerMethod = value => {
    if (value != 1) {
      setFeeShip(0);
      setMethod(value);
    } else {
      setMethod(value);
    }
  };
  useEffect(() => {
    if (transportData !== undefined && transportData?.value !== undefined) {
      getFeeShip();
    }
  }, [transportData, method, cityName]);

  const getFeeShip = async () => {
    const payload = await {
      params: {
        matinhgui: listProduct[0]?.MaBang,
        tinhgui: listProduct[0]?.TenBang,
        quangui: listProduct[0]?.TenQuan,
        matinhnhan: listProduct[0]?.MaQuan,
        tinhnhan: provinceCode,
        quannhan: provinceName,
        diachinhan: address,
        trongluong: sumWeight,
        trigia: totalAmount,
        manhavanchuyen: transportData?.MaNhaVanChuyen,
        chuyenphatnhanh: false,
        giatoithieunoitinh: transportData?.GiaToiThieuNoiTinh,
        giatoithieulientinh: transportData?.GiaToiThieuLienTinh,
      },
      onSuccess: async data => {
        await setFeeShip(data);
      },
      onError: async () => {},
    };
    await dispatch(commonActions.getFeeShip(payload));
  };
  const handleClickBook = () => {
    const conditions = [
      {check: provinceCode === undefined, message: t('missingProvince')},
      {check: cityName === undefined, message: t('missingWard')},
      {check: !address, message: t('missingAddress')},
      {check: !fullName, message: t('missingFullname')},
      {check: !phone, message: t('missingPhone')},
      {check: method === undefined, message: t('missingReceving')},
    ];

    if (method === 1) {
      conditions.push({
        check: transportData?.MaNhaVanChuyen === undefined,
        message: t('missingTransporter'),
      });
    } else {
      conditions.push({
        check: payment === undefined,
        message: t('missingPayment'),
      });
    }

    const hasErrors = conditions.some(condition => condition.check);

    if (hasErrors) {
      showMessage({
        duration: 3000,
        message: conditions.find(condition => condition.check).message,
        type: 'error',
      });
    } else {
      createOrder();
    }
  };
  const createOrder = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        loaidonhang: 'App KH',
        dienthoai: phone,
        dienthoainhan: phone,
        tenkhachhang: fullName,
        maquocgia: natioCode,
        tenquocgia: natioName,
        mabang: provinceCode,
        thanhpho: cityName,
        tenbang: provinceName,
        tenquan: districtName,
        diachi: address,
        hinhthucnhanhang: method,
        hinhthucthanhtoan: payment,
        dichvucongthem: [],
        ghichu: note,
        magiamgia: stringDiscount,
        nhantaicuahang: method,
        magiamgias:
          discount?.MaGiamGia === undefined ? '' : discount?.MaGiamGia,
        email: email,
        ho: user?.ho,
        ten: user?.ten,
        ngaysinh:
          user?.NgaySinhNhat === undefined
            ? '01/01/1990'
            : moment(user?.NgaySinhNhat).format('YYYY-MM-DD'),
        sanphamdachon: productChooses,
        phiship: feeShip,
        sotiengiam: discountShip + discountAmout,
        idnguoithuchien: user?.IDNguoiDung,
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        await sendMailBooking(data?.DonHang[0]);
        await getListTempalteZaloOA(data?.DonHang[0]);
        if (payment === 4) {
          await dispatch(orderActions.cleanCart());
          navigate('payment', {data: data});
        } else {
          setConentAlert(
            `${t('notifyCreateSuccess')}${data?.DonHang[0]?.MaDonHang}`,
          );
          setVisibleAlert(true);
        }
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: `${t('notifyCreateFail')}`,
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.createOrder(payload));
  };
  // call api send mail auto
  const sendMailBooking = async data => {
    const payload = await {
      params: {
        to: data?.Email,
        title: `(${data?.MaDonHang}) Xác nhận đơn hàng`,
        body: `<div>
          <div style="border-radius: 10px; text-align: center; font-size: 20px; box-shadow: 3px 0px 5px 2px #999999; padding: 10px; width: 80%; margin: 0 auto; border: 1px solid #ccc">
           <div style="width: 150px; margin: 0 auto; padding-bottom: 20px;">
             <img src="${link}/_imageslibrary/logo.png" style="width: 100%; object-fit: cover" />
           </div>
           <div style="font-weight: bold">Xác nhận đơn hàng ${data?.MaDonHang} thành công.</div>
           <div>Sử dụng mã <b>${data?.MaDonHang}</b> để tra cứu thông tin đơn hàng trên website</div>
           <div style="margin: 20px">
              <a href='${link}/Home/Recruitment?madonhang=${data?.MaDonHang}' style='background: #f6821f; text-decoration: none; padding: 12px; font-size: 15px; font-weight: bold; border-radius: 5px;'>Tra cứu đơn hàng</a>
            </div>
           <div style="font-style: italic; margin-top: 50px; font-size: 15px">Đây là thư gửi tự động. Vui lòng không trả lời. Cảm ơn./.</div>
           </div>
          </div>`,
      },
      onSuccess: () => {
        // showMessage({
        //   duration: 3000,
        //   message:
        //     'Tạo đơn thành công ! \nKích hoạt gửi mail tự động cho khách hàng',
        //   type: 'success',
        // });
      },
      onError: () => {
        // showMessage({
        //   duration: 3000,
        //   message: 'Gửi mail tự động thất bại',
        //   type: 'warning',
        // });
      },
    };
    await dispatch(commonActions.sendMailBooking(payload));
  };
  const handleContinue = () => {
    setVisibleAlert(false);
    dispatch(orderActions.cleanCart());
    navigate('store');
  };
  // get Template id
  const getListTempalteZaloOA = async param => {
    const payload = await {
      params: {
        loai: 1,
      },
      onSuccess: async data => {
        // Xác định loại dựa trên điều kiện có sản phẩm có giá sau giảm là 0 hay không
        const type = productChooses.some(product => product.giasaugiam === 0)
          ? 'A03'
          : 'A01';
        const template_id = data.find(item => item.id === type)?.template_id;
        sendMessageZaloOA({
          loai: type,
          template_id: template_id,
          phone: param?.DienThoaiKhachHang,
          order_code: param?.MaDonHang,
        });
      },
      onError: () => {},
    };
    await dispatch(commonActions.getListTempalteZaloOA(payload));
  };

  const sendMessageZaloOA = async data => {
    const payload = await {
      params: {
        loai: data?.loai,
        creator_id: 'c',
        template_id: data?.template_id,
        phone: data?.phone,
        order_code: data?.order_code,
        tracking_id: data?.order_code + data?.loai,
      },
      onSuccess: () => {},
      onError: () => {
        showMessage({
          duration: 3000,
          message: 'Gửi tin Zalo OA thất bại',
          type: 'warning',
        });
      },
    };
    await dispatch(commonActions.sendMessageZaloOA(payload));
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBarStore />
      <HeaderTitle nameHeaderTitle={t('detailCart')} />
      <KeyboardAwareScrollView style={styles.content}>
        <ListProduct dataProduct={listProduct} />
        <View style={styles.wrapTotal}>
          <View style={styles.groupTotal}>
            <Text style={styles.labelTotal}>{t('totalProducts')}</Text>
            <Text style={styles.valueTotal}>
              {numberProduct} {t('products')}
            </Text>
          </View>
          <View style={styles.groupTotal}>
            <Text style={styles.labelTotal}>{t('subtotal')}</Text>
            <Text style={styles.valueTotalPrice}>
              {currencyFormat(totalAmount - discountAmout)}
            </Text>
          </View>
          <View style={styles.groupTotal}>
            <Text style={styles.labelTotal}>{t('shippingFee')}</Text>
            <Text style={styles.valueTotalPrice}>
              {currencyFormat(
                feeShip > discountShip ? feeShip - discountShip : 0,
              )}
            </Text>
          </View>
        </View>
        <NatioPicker
          country={natioCode || 'VN'}
          getDataSelect={data => {
            setNatioCode(data?.country);
            setNatioName(data?.countryName);
          }}
        />
        <ProvincePicker
          country={natioCode || 'VN'}
          defaultCity={provinceCode}
          getDataSelect={data => {
            setProvinceCode(data?.cityCode);
            setProvinceName(data?.cityName);
          }}
        />
        <ZipCodePicker
          country={natioCode || 'VN'}
          city={provinceCode}
          defaultZipCode={cityName}
          getDataSelect={data => {
            setDistrictName(data?.districtName);
            setCityName(data?.wardName);
          }}
        />
        <InputLabelValueText
          titleLabel={t('address') + '(*)'}
          value={address}
          maxLength={500}
          changeText={value => setAddress(value)}
        />
        <InputLabelValueText
          titleLabel={t('fullName') + '(*)'}
          value={fullName}
          maxLength={500}
          changeText={value => setFullName(value)}
        />
        <InputLabelValueText
          titleLabel={t('phone') + '(*)'}
          keyboardType={'number-pad'}
          value={phone}
          maxLength={10}
          changeText={value => setPhone(value)}
        />
        <InputLabelValueText
          titleLabel={t('email')}
          value={email}
          maxLength={500}
          changeText={value => setEmail(value)}
        />
        <MethodPicker onChange={value => handlePickerMethod(value)} />
        {method && method == 1 ? (
          <TransporterPicker
            country={natioCode || 'VN'}
            defaultCity={provinceCode}
            onChange={value => setTransportData(value)}
          />
        ) : null}
        <PaymentPicker onChange={value => setPayment(value)} />
        <Discount getDiscount={data => setDiscount(data)} />
        <InputLabelValueText
          titleLabel={t('note')}
          value={note}
          styleText={styles.textNote}
          maxLength={1000}
          numberOfLines={2}
          multiline={true}
          returnKeyType={'done'}
          changeText={value => setNote(value)}
        />

        <ContactOrder listProduct={listProduct} />
        <ButtonWithText
          title={t('booking')}
          onPress={() => handleClickBook()}
        />
      </KeyboardAwareScrollView>
      <AlertModal
        visible={visibleAlert}
        content={contentAlert}
        onConfirm={() => handleContinue()}
      />
    </SafeAreaView>
  );
};
