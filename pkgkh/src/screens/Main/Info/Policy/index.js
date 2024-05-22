import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';

import HeaderBar from '~components/HeaderBar';
import { Colors, Sizes, parseSize, Width } from '~theme';
import HeaderTitle from '~components/HeaderTitle';

export default Index = props => {
  const { t } = useTranslation();
  const policyHtml = ` <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print Page - PhucKhanggems_NetCore</title>
  </head>
  <body cz-shortcut-listen="true">
    <div id="dvHoaDon">
    <style>
    :root {
        /* light - lv1 */
        --color1: #f6821f;
    }
    .dvHoaDon2 {
      font-size: 1rem;
    }

    #dvHoaDon table {
        width: 90%;
        min-width: 90%;
    }

    #dvHoaDon table tr.trtitle td {
        font-weight: bold;
        color: var(--color1);
        padding-top: 12px;
    }

    #dvHoaDon img.backgroundLogo {
        -webkit-filter: grayscale(70%);
        filter: grayscale(100%);
        width: 80%;
        height: auto;
        display: block;
        margin: auto;
        opacity: 0.10;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        position: absolute;
    }

    #txtPhieuMuaHang {
        font-size: 30px;
        font-weight: bold;
    }

    .txtpan {
        font-size: 12px;
        font-weight: bold;
    }
    .page-break {
        break-after: page;
        margin: 0 auto;
      }

    @media only screen and (max-device-width: 844px) and (min-device-height: 390px) and (-webkit-device-pixel-ratio: 3) {
        #txtPhieuMuaHang {
            font-size: 20px;
            font-weight: bold;
        }

        #dvHoaDon img.backgroundLogo {
            -webkit-filter: grayscale(100%);
            filter: grayscale(100%);
            width: 70%;
            height: auto;
            display: block;
            margin: auto;
            opacity: 0.10;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            position: absolute;
        }

        .txtpan {
            font-size: 12px;
            font-weight: bold;
        }
    }
</style>
      <div class="dvHoaDon2">
        <table cellpadding="0" style="font-size: 14px;position: relative; top: 10px;">
          <tbody>
            <tr class="trtitle">
              <td style="padding: 0px">1. KHÁCH HÀNG KHI MANG SẢN PHẨM ĐẾN BẢO HÀNH</td>
            </tr>
            <tr>
              <td> - Đọc chính xác Số điện thoại/Mã thẻ khách hàng thân thiết/Mã phiếu thanh toán để nhân viên kiểm tra bảo hành. </td>
            </tr>
            <tr>
              <td>- Yêu cầu nhân viên chụp ảnh lại tình trạng sản phẩm của mình khi mang đến bảo hành.</td>
            </tr>
            <tr class="trtitle">
              <td>2. CÁC TRƯỜNG HỢP ĐƯỢC BẢO HÀNH MIỄN PHÍ</td>
            </tr>
            <tr>
              <td>- Đối với sản phẩm sẽ được bảo hành miễn phí trong trường hợp bị lỗi do sản xuất.</td>
            </tr>
            <tr>
              <td>- Làm mới, đánh bóng.</td>
            </tr>
            <tr>
              <td> - Gắn lại đá tấm khi bị rơi (trừ trường hợp kim cướng tấm, kim cương viên rời, đá quý tấm đều không được bảo hành). </td>
            </tr>
            <tr>
              <td>- Lên/Xuống, chỉnh sửa size (miễn phí 2 size đầu)</td>
            </tr>
            <tr>
              <td> - Hàn nối dây, hàn điểm (những trường hợp cần nối thêm vàng phải mất tiền nguyên liệu vàng để hàn). </td>
            </tr>
            <tr class="trtitle">
              <td>3. CÁC TRƯỜNG HỢP BẢO HÀNH MẤT PHÍ</td>
            </tr>
            <tr>
              <td>- Thay các loại đá chủ bị rơi, các loại đá tấm theo yêu cầu.</td>
            </tr>
            <tr>
              <td>- Xi lại - Hàn phải thêm nguyên liệu vàng - Thay móc - Khắc Laze.</td>
            </tr>
            <tr>
              <td>- Các sản phẩm bị hỏng trong quá trình khách hàng sử dụng.</td>
            </tr>
            <tr>
              <td> - Các sản phẩm bị hỏng móc - Biến dạng - Gãy - Rơi đá chủ...sẽ tính phí theo biểu phí và được hỗ trợ từ 10% - 50% (tùy thời điểm). </td>
            </tr>
            <tr>
              <td>- Các sản phẩm thay đá các loại sẽ tính phí theo biểu giá phí.</td>
            </tr>
            <tr class="trtitle">
              <td>4. THỜI GIAN BẢO HÀNH</td>
            </tr>
            <tr>
              <td>- Sản phẩm được bảo hành trọn thời gian bảo hành của sản phẩm.</td>
            </tr>
            <tr>
              <td>- Sản phẩm làm mới, đánh bóng, xi mạ sẽ nhận lại sản phẩm sau 03 ngày trở lên.</td>
            </tr>
            <tr>
              <td>- Sản phẩm hàn lại, chỉnh size, gắn đá, làm thêm móc,... sẽ nhận lại sản phẩm sau 07 ngày.</td>
            </tr>
            <tr class="trtitle">
              <td>5. THÔNG TIN BẢO HÀNH</td>
            </tr>
            <tr>
              <td>- Khách hàng có thể đến bất kỳ showroom nào của Phúc Khang để bảo hành sản phẩm.</td>
            </tr>
            <tr>
              <td> - Truy cập website: <b style="color: var(--color1)">http://www.phuckhanggem.com</b> để xem thêm thông tin bảo hành/cửa hàng. </td>
            </tr>
            <tr>
              <td>- Hotline: <b style="color: var(--color1)">0938178938</b>. </td>
            </tr>
          </tbody>
        </table>
        <img class="logoHoaDon backgroundLogo" src="https://uat.phuckhanggem.com/_imageslibrary/stores/0.png">
      </div>
    </div>
  </body>
</html> `;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('policy')} />
      <View style={styles.content}>
        <WebView
          originWhitelist={['*']}
          source={{ html: policyHtml }}
          style={{ flex: 1, width: Width }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.margin,
  },
});
