import Config from 'react-native-config';

const API_URL = Config.API_URL;
//LINK API
const apiCommon = `${API_URL}/api/Common/`;
const apiOrder = `${API_URL}/api/Order/`;
const apiZalo = `${API_URL}/api/ZaloOA/`;
const apiCheck = `${API_URL}/api/Check/`;

const postUrl = {
  getListStore: `${apiCommon}GetThongTinCuaHang`,
  getInformationUser: `${apiCommon}GetThongTinKhachHang`,
  getListCustomer: `${apiCommon}GetThongTinKhachHang`,
  getListProduct: `${apiCommon}GetSanPham`,
  getDetailProduct: `${apiCommon}GetSanPham`,
  getNatio: `${apiCommon}GetThongTinDiaChinh`,
  getListCity: `${apiCommon}GetThongTinDiaChinh`,
  getListZipCode: `${apiCommon}GetThongTinDiaChinh`,
  getTransporter: `${apiCommon}GetThongTinCuaHang`,
  checkDiscountCode: `${apiCommon}GetSanPham`,
  getFeeShip: `${apiCommon}TinhCuocVanChuyen`,
  createOrder: `${apiCommon}ThanhToan`,
  getListOrder: `${apiCommon}GetThongTinDonHang`,
  getDetailOrder: `${apiCommon}GetThongTinDonHang`,
  sendMailBooking: `${apiCommon}GuiEmail`,
  getPaymentMethod: `${apiCommon}GetThongTinCuaHang`,
  getReceivingMethod: `${apiCommon}GetThongTinCuaHang`,
  findOrder: `${apiOrder}TimKiemDonHang`,
  setCart: `${apiCommon}XuLyGioHang`,
  handleLike: `${apiCommon}XuLySanPham`,
  getProductById: `${apiCommon}GetSanPham`,
  registerUser: `${apiCommon}DangKy`,
  getListUser: `${apiCommon}GetThongTinKhachHang`,
  pushNotify: `${apiCommon}GuiThongBao`,
  changePassword: `${apiCommon}GetThongTinKhachHang`,
  checkAccount: `${apiCommon}KiemTraTaiKhoan`,
  viewNumerologies: `${apiCommon}XemTuVi`,
  getNumerologies: `${apiCommon}GetTuVi`,
  getDestiny: `${apiCommon}XemCungMenh`,
  updateNumerologies: `${apiCommon}UpdateTuVi`,
  historyNumerologies: `${apiCommon}LichSuXemTuVi`,
  blockAccount: `${apiCommon}GetThongTinKhachHang`,
  getListTempalteZaloOA: `${apiZalo}GetListTemplateZaloOA`,
  sendMessageZaloOA: `${apiZalo}SendMessageZaloOA`,
  checkQR: `${apiCheck}CheckViTri`,
  confirmCheck: `${apiCheck}CheckInCheckOut`,
  getTimeSheet: `${apiCheck}LichSuCheckInCheckOut`,
};
const urlApp = {
  postUrl,
};

export default urlApp;

//API STATUS
export const SUCCESS = 200;
export const SUCCESS_POST = 201;
export const NO_CONTENT = 204;
export const INVALID_DATA = 202;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;

export const TIME_OUT = 20000;

export const limitSizeImage = 12 * 1024 * 1024; // 12mb
export const limitItems = 20;
// HTTP METHODS
export const POST = 'post';
export const GET = 'get';
export const PUT = 'put';
export const DELETE = 'delete';
