# Thiết kế Kỹ thuật: Thiệp Cưới Tương Tác Cao Cấp (Luxury Wedding Invitation Web App)

- **Ngày tạo**: 2026-09-20
- **Trạng thái**: Đã phê duyệt qua Brainstorming
- **Loại hình**: Single-Page Interactive Web Application (Mobile-First)

---

## 1. Mục tiêu & Bối cảnh

Xây dựng một trang web thiệp cưới tương tác sang trọng, hiện đại, tối ưu hoá hoàn hảo cho trải nghiệm trên thiết bị di động (nơi mà hơn 95% khách mời sẽ mở và xem thiệp từ các ứng dụng mạng xã hội như Zalo, Messenger, SMS).

Trang web sử dụng bộ sưu tập 32 bức ảnh cưới có độ phân giải cao sẵn có trong thư mục `img/`, kết hợp hiệu ứng mở phong bì 3D chân thực, nhạc nền lãng mạn, đồng hồ đếm ngược, dòng thời gian câu chuyện tình yêu, album ảnh có lightbox toàn màn hình, sổ lưu bút RSVP và hộp mừng cưới online với mã VietQR.

---

## 2. Kiến trúc & Công nghệ

### 2.1 Cấu trúc file & thư mục
```text
c:/Users/BAO/Desktop/ac/
├── index.html                   # Giao diện HTML5 chính
├── css/
│   ├── style.css                # Hệ thống biến màu, typography, layout responsive, components
│   └── envelope.css             # Hiệu ứng phong bì 3D Wax Seal và cánh hoa Canvas
├── js/
│   ├── config.js                # Toàn bộ dữ liệu mẫu (tên, ngày cưới, địa điểm, STK, timeline...)
│   ├── main.js                  # Điều khiển đếm ngược, mở thiệp, RSVP, cuộn trang mượt
│   ├── gallery.js               # Quản lý 32 ảnh cưới, danh mục lọc và Lightbox toàn màn hình
│   ├── music.js                 # Trình phát nhạc đĩa than nổi, xử lý autoplay sau tương tác
│   └── petals.js                # Hiệu ứng cánh hoa hồng rơi mềm mại bằng Canvas 2D
├── audio/
│   └── wedding-song.mp3         # Nhạc nền đám cưới lãng mạn du dương
└── img/                         # 32 ảnh cưới gốc (TUAB5232.JPG ... TUAB6962.JPG)
```

### 2.2 Hệ thống nhận diện thị giác (Design System)
- **Phong cách**: Champagne & Luxury Cream (Sang trọng, ấm áp, quý phái).
- **Màu sắc**:
  - `--bg-primary`: `#FDFBF7` (Trắng kem ngọc trai ấm áp).
  - `--bg-secondary`: `#F7F3EB` (Champagne sữa nhạt, phân tách các khối nội dung).
  - `--accent-gold`: `#C5A059` & `#DFBA73` (Vàng kim Champagne ánh kim loại).
  - `--accent-rose`: `#E2B4B8` (Hồng pastel lãng mạn cho cánh hoa, nốt nhạc).
  - `--text-primary`: `#2C2724` (Nâu than đậm, tương phản cao, dễ đọc).
  - `--text-muted`: `#7A7269` (Nâu xám ấm áp cho phụ đề, chú thích).
  - `--border-color`: `rgba(197, 160, 89, 0.25)` (Viền mạ vàng tinh xảo).
- **Typography**:
  - Tiêu đề nghệ thuật: `Playfair Display`, `Cormorant Garamond`, `Great Vibes` (Google Fonts).
  - Văn bản nội dung: `Montserrat` (chuẩn hiển thị tiếng Việt mượt mà).

---

## 3. Chi tiết các thành phần giao diện & Tương tác

### 3.1 Bìa phong bì tương tác (Interactive Wax-Sealed Envelope)
- Xuất hiện dạng toàn màn hình khi người dùng mở link lần đầu.
- Gồm phong bì giả lập chất liệu giấy cao cấp, nếp gấp sắc nét và con dấu sáp vàng hoàng gia (Monogram dập nổi) kèm dòng chữ nhấp nháy *"Chạm để mở thiệp"*.
- Khi chạm: Nắp phong bì bung mở 3D (`transform: rotateX(180deg)`), thiệp cưới trượt ra, hiệu ứng cánh hoa Canvas kích hoạt, và nhạc nền tự động phát.

### 3.2 Hero Banner (Lời chào & Chân dung)
- Tiêu đề nghệ thuật: *"Lễ Thành Hôn"*, *"Save The Date"*.
- Tên Cô Dâu & Chú Rể dạng thư pháp thanh lịch.
- Khung ảnh đại diện nghệ thuật lớn được chọn từ ảnh cưới đẹp nhất trong `img/`.

### 3.3 Đồng hồ đếm ngược (Live Countdown Timer)
- 4 ô đếm ngược: Ngày - Giờ - Phút - Giây, viền kim loại vàng champagne, cập nhật thời gian thực từng giây đến thời khắc diễn ra hôn lễ.

### 3.4 Hồ sơ Cô Dâu & Chú Rể (Couple Profile)
- 2 thẻ giới thiệu song song: Chú Rể & Cô Dâu kèm ảnh chân dung riêng, thông tin gia đình (nhà trai / nhà gái) và những lời nhắn gửi chân thành.

### 3.5 Câu chuyện tình yêu (Love Story Timeline)
- Dòng thời gian cuộn mượt mà với 4 mốc kỷ niệm:
  1. *Lần đầu chạm mắt (First Meeting)*
  2. *Lời tỏ tình ngọt ngào (The Confession)*
  3. *Khoảnh khắc cầu hôn (She Said Yes)*
  4. *Ngày chung đôi (Wedding Day)*
- Mỗi mốc đi kèm hình ảnh trích từ thư mục `img/`.

### 3.6 Lịch trình sự kiện & Chỉ đường Google Maps
- 2 sự kiện chính:
  - **Lễ Thành Hôn / Vu Quy**: Thời gian, địa chỉ tư gia.
  - **Tiệc Cưới Mừng**: Thời gian đón khách, khai tiệc, trung tâm tiệc cưới.
- Tích hợp 2 nút hành động:
  - *"Chỉ đường trên Google Maps"*: Mở trực tiếp ứng dụng Google Maps dẫn đường.
  - *"Thêm vào Google Calendar"*: Mở link tạo sự kiện lịch trên điện thoại.

### 3.7 Album ảnh cưới tương tác (Photo Gallery & Fullscreen Lightbox)
- Trưng bày đầy đủ 32 ảnh cưới từ `img/`.
- Bố cục dạng lưới linh hoạt (Masonry Responsive Grid).
- Bộ lọc danh mục ảnh: *Tất cả*, *Lễ phục truyền thống*, *Váy cưới hiện đại*, *Khoảnh khắc ngọt ngào*.
- **Lightbox toàn màn hình**:
  - Chạm vào ảnh để phóng to toàn màn hình.
  - Hỗ trợ nút Previous / Next và vuốt ngón tay (Touch Swipe) chuyển ảnh trên điện thoại.
  - Hiển thị chỉ số ảnh (ví dụ: `05 / 32`).

### 3.8 Sổ lưu bút & Xác nhận tham dự (RSVP & Guestbook)
- Form xác nhận tham dự:
  - Họ và tên khách mời.
  - Số điện thoại.
  - Khách của: Nhà Trai hay Nhà Gái.
  - Số người tham dự (1, 2, 3...).
  - Lời chúc phúc gửi đến đôi uyên ương.
- Bảng hiển thị lời chúc dạng thiệp mini ngay bên dưới, lưu trữ tức thì bằng `localStorage`.

### 3.9 Hộp mừng cưới Online (Gift Box & QR Transfer)
- Thẻ thông tin tài khoản ngân hàng của Chú Rể và Cô Dâu.
- Tích hợp mã VietQR chuẩn xác, tự động nhận diện ứng dụng ngân hàng khi quét.
- Nút *"Sao chép số tài khoản"* tiện lợi chỉ với 1 chạm kèm thông báo toast xác nhận.

### 3.10 Trình phát nhạc đĩa than nổi (Floating Vinyl Music Player)
- Nút hình đĩa than tròn quay đều ở góc dưới màn hình kèm hiệu ứng nốt nhạc bay.
- Cho phép người dùng bật / tắt âm thanh linh hoạt bất cứ lúc nào.

---

## 4. Xử lý Dữ liệu & Hiệu năng Tải trang

1. **Cấu hình độc lập (`js/config.js`)**:
   - Tách rời toàn bộ dữ liệu cấu hình để người dùng có thể dễ dàng thay đổi thông tin thực tế mà không cần đụng vào code HTML/CSS.
2. **Tối ưu hóa hình ảnh**:
   - Sử dụng thuộc tính `loading="lazy"` cho toàn bộ danh sách ảnh trong gallery.
   - Thêm thuộc tính `fetchpriority="high"` cho ảnh bìa Hero để hiển thị ngay khi trang vừa tải.
   - Sử dụng `content-visibility: auto` trên các section dài để giảm tải render DOM.
3. **Chính sách Autoplay**:
   - Sử dụng sự kiện người dùng bấm *"Chạm để mở thiệp"* làm trigger kích hoạt phát âm thanh audio, tránh việc bị trình duyệt di động chặn phát nhạc tự động.

---

## 5. Kế hoạch xác minh & Kiểm thử (Verification)
- Kiểm tra tính hiển thị và responsive trên cả 2 chế độ: Màn hình điện thoại di động (iPhone / Android) và Màn hình máy tính bàn (Desktop).
- Kiểm tra hoạt ảnh 3D mở phong bì và hiệu ứng cánh hoa bay Canvas.
- Kiểm tra chức năng đếm ngược thời gian thực.
- Kiểm tra tính năng lọc ảnh và mở Lightbox xem toàn màn hình (Next/Prev, phím mũi tên, vuốt).
- Kiểm tra gửi form RSVP và hiển thị lời chúc mới trên Sổ lưu bút.
- Kiểm tra nút sao chép số tài khoản ngân hàng.
- Kiểm tra trình phát nhạc và nút bật/tắt đĩa than.
