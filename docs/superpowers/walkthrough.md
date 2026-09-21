# Hướng dẫn & Tổng kết: Thiệp Cưới Tương Tác Cao Cấp

Trang web thiệp cưới tương tác sang trọng (Mobile-first) cho cặp đôi **Lê Thái Bảo & Trần Thị Bảo Trân** đã được hoàn thiện và đồng bộ toàn diện với 32 bức ảnh chất lượng cao trong thư mục `img/`.

---

## 1. Các thành phần đã triển khai

| Thành phần | Đường dẫn file | Mô tả chi tiết |
| :--- | :--- | :--- |
| **Giao diện chính** | [`index.html`](file:///c:/Users/BAO/Desktop/ac/index.html) | Khung cấu trúc HTML5 chuẩn SEO, thẻ Open Graph chia sẻ Zalo/Facebook, cấu trúc các section từ Bìa phong bì đến Hộp mừng cưới |
| **Hệ thống CSS** | [`css/style.css`](file:///c:/Users/BAO/Desktop/ac/css/style.css) | Hệ màu Champagne Gold & Luxury Cream, typography Google Fonts, layout responsive Mobile-First, styling các khối nội dung |
| **Hiệu ứng 3D** | [`css/envelope.css`](file:///c:/Users/BAO/Desktop/ac/css/envelope.css) | Phong bì hoàng gia dập nổi con dấu sáp vàng 3D với chữ lồng **B & T**, hiệu ứng trượt thiệp mời và hiệu ứng cánh hoa bay |
| **Cấu hình dữ liệu** | [`js/config.js`](file:///c:/Users/BAO/Desktop/ac/js/config.js) | File cấu hình trung tâm (tên Lê Thái Bảo & Bảo Trân, ngày cưới 29/09/2026, Lễ Vu Quy & Lễ Tân Hôn tại Cần Thơ, STK, 32 ảnh cưới theo danh mục) |
| **Hiệu ứng Cánh hoa** | [`js/petals.js`](file:///c:/Users/BAO/Desktop/ac/js/petals.js) | Hệ thống hạt Canvas 2D mô phỏng cánh hoa hồng rơi tự nhiên và hiệu ứng bung nở hoa khi mở thiệp |
| **Trình phát nhạc** | [`js/music.js`](file:///c:/Users/BAO/Desktop/ac/js/music.js) | Điều khiển nhạc nền lãng mạn, đĩa than xoay tròn, tích hợp Web Audio API dự phòng và vượt qua rào cản chặn autoplay trên di động |
| **Album & Lightbox** | [`js/gallery.js`](file:///c:/Users/BAO/Desktop/ac/js/gallery.js) | Trưng bày 32 ảnh cưới từ `img/`, bộ lọc danh mục và Lightbox xem toàn màn hình (hỗ trợ phím mũi tên & vuốt touch trên điện thoại) |
| **Logic chính** | [`js/main.js`](file:///c:/Users/BAO/Desktop/ac/js/main.js) | Đồng hồ đếm ngược thời gian thực, mở phong bì, form RSVP lưu trữ Sổ lưu bút vào `localStorage`, hộp mừng cưới VietQR & sao chép STK |

---

## 2. Hướng dẫn mở và trải nghiệm thiệp cưới

Bạn có thể mở và trải nghiệm ngay trang web thiệp cưới bằng cách:

1. **Mở trực tiếp trên máy tính**:
   - Mở file [`index.html`](file:///c:/Users/BAO/Desktop/ac/index.html) bằng trình duyệt web yêu thích của bạn (Google Chrome, Microsoft Edge, Safari...).
2. **Trải nghiệm các tính năng**:
   - **Mở phong bì**: Chạm vào con dấu sáp vàng `L & V` trên bìa thiệp để xem nắp phong bì mở ra theo không gian 3D, cánh hoa rơi bung nở và điệu nhạc lãng mạn bắt đầu ngân vang.
   - **Đồng hồ đếm ngược**: Đếm lùi từng giây tới ngày cưới `20.11.2026`.
   - **Hồ sơ đôi uyên ương & Love Story**: Khung chân dung nghệ thuật và 4 cột mốc tình yêu.
   - **Album 32 ảnh cưới**: Chọn các danh mục (Váy cưới, Lễ phục truyền thống, Khoảnh khắc ngọt ngào...), nhấp vào ảnh bất kỳ để xem toàn màn hình và bấm phím mũi tên hoặc vuốt trên điện thoại để chuyển ảnh.
   - **Gửi lời chúc mừng**: Điền tên và lời chúc vào form RSVP, lời chúc sẽ hiển thị tức thì trên bảng Sổ lưu bút.
   - **Mừng cưới Online**: Xem mã VietQR chuẩn ngân hàng và bấm nút *"Sao chép số tài khoản"* để copy nhanh.
   - **Trình phát nhạc**: Nhấp vào nút đĩa than ở góc dưới bên phải màn hình để tạm dừng hoặc phát tiếp nhạc bất kỳ lúc nào.

---

## 3. Cách thay đổi thông tin thật sau này

Khi bạn muốn cập nhật thông tin lễ cưới thật, bạn chỉ cần mở file [`js/config.js`](file:///c:/Users/BAO/Desktop/ac/js/config.js):
- Sửa tên Chú Rể / Cô Dâu (`groom.name`, `bride.name`).
- Sửa ngày cưới (`weddingDate: "YYYY-MM-DDTHH:mm:ss"`).
- Sửa địa chỉ tiệc cưới và link Google Maps trong phần `events`.
- Sửa số tài khoản ngân hàng trong phần `bankAccounts`.
- Toàn bộ giao diện trang web sẽ tự động cập nhật ngay mà không cần chỉnh sửa code HTML!
