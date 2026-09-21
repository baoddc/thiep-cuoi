# Kế hoạch Triển khai: Thiệp Cưới Tương Tác Cao Cấp (Luxury Wedding Invitation)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng trang web thiệp cưới tương tác sang trọng, hiện đại, tối ưu Mobile-first, sử dụng 32 ảnh cưới chất lượng cao từ `img/`, có hiệu ứng mở phong bì 3D, đếm ngược, nhạc nền lãng mạn, album ảnh Lightbox, RSVP và hộp mừng cưới VietQR.

**Architecture:** Single-Page Web Application thuần HTML5, Modern CSS3 và Vanilla JavaScript modular. Không phụ thuộc thư viện cồng kềnh, tải nhanh tức thì trên mạng 4G/5G di động.

**Tech Stack:** HTML5 Semantic, Modern CSS3 (Grid, Flexbox, 3D Transforms, Canvas 2D), Vanilla JavaScript ES6+, Web Audio API, VietQR API, Google Fonts.

**Spec:** [`docs/superpowers/specs/2026-09-20-wedding-invitation-design.md`](file:///c:/Users/BAO/Desktop/ac/docs/superpowers/specs/2026-09-20-wedding-invitation-design.md)

## Global Constraints
- Hệ màu chủ đạo: Champagne Gold (`#C5A059`, `#DFBA73`) & Luxury Cream (`#FDFBF7`, `#F7F3EB`).
- Typography: `Playfair Display`, `Cormorant Garamond`, `Great Vibes` kết hợp `Montserrat`.
- Sử dụng đầy đủ 32 bức ảnh từ thư mục `img/` (`TUAB5232.JPG` đến `TUAB6962.JPG`).
- Tách riêng toàn bộ dữ liệu cấu hình vào `js/config.js` để người dùng dễ dàng chỉnh sửa.
- Tương thích tốt trên trình duyệt di động (iOS Safari, Android Chrome).

---

### Task 1: Cấu trúc dự án & File Cấu hình Dữ liệu (`js/config.js`)

**Files:**
- Create: `js/config.js`
- Create: `audio/wedding-song.mp3` (hoặc module nhạc nền Web Audio API)

**Interfaces:**
- Produces: `window.WEDDING_CONFIG` chứa toàn bộ thông tin ngày cưới, tên CD-CR, địa điểm, timeline, danh sách 32 ảnh cưới theo danh mục và thông tin STK ngân hàng.

- [ ] **Step 1: Viết file cấu hình `js/config.js`**
  Khởi tạo `window.WEDDING_CONFIG` với thông tin chi tiết:
  - Thông tin Chú rể & Cô dâu (Tên, gia đình, giới thiệu, ảnh đại diện từ `img/`).
  - Ngày cưới đích cho đếm ngược (ví dụ: `2026-11-20T10:30:00`).
  - Lịch trình sự kiện (Lễ Thành Hôn & Tiệc Cưới Mừng, địa chỉ, toạ độ Google Maps).
  - 4 cột mốc Love Story kèm ảnh tương ứng.
  - Danh sách phân loại cho 32 bức ảnh từ `img/`.
  - Thông tin tài khoản ngân hàng và cấu hình mã VietQR.

- [ ] **Step 2: Tạo file nhạc nền audio/wedding-song.mp3**
  Đảm bảo tài nguyên âm thanh sẵn sàng trong thư mục `audio/`.

- [ ] **Step 3: Kiểm tra tính hợp lệ của `js/config.js`**
  Đảm bảo file syntax chuẩn ES6, không có lỗi runtime.

---

### Task 2: Hệ thống Giao diện & CSS (`css/style.css`, `css/envelope.css`)

**Files:**
- Create: `css/style.css`
- Create: `css/envelope.css`

**Interfaces:**
- Consumes: Google Fonts (`Playfair Display`, `Great Vibes`, `Montserrat`).
- Produces: Các biến CSS tokens (`--bg-primary`, `--accent-gold`, etc.), layout responsive, style cho các section, hiệu ứng 3D mở phong bì sáp vàng và hiệu ứng cánh hoa.

- [ ] **Step 1: Viết `css/style.css`**
  - Khai báo CSS Reset, CSS Variables (màu sắc, bóng đổ, bo góc, font chữ).
  - Định dạng Typography, tiêu đề nghệ thuật, đường viền hoa văn vàng kim.
  - Layout các section: Hero, Countdown, Couple, Story, Events, Gallery, RSVP, Gift Box, Music Player.
  - Media queries tối ưu cho màn hình Mobile (<= 480px, 768px, 1024px).

- [ ] **Step 2: Viết `css/envelope.css`**
  - Thiết kế phong bì 3D với nắp gập (`transform-origin: top`, `transform: rotateX(...)`).
  - Con dấu sáp vàng hoàng gia dập nổi (Wax Seal) kèm hiệu ứng phát sáng nhẹ (pulse).
  - Hiệu ứng trượt thiệp mời lên (`transform: translateY(...)`).
  - Canvas toàn màn hình cho cánh hoa rơi.

- [ ] **Step 3: Kiểm tra CSS**
  Đảm bảo không có lỗi cú pháp, hỗ trợ `-webkit-` prefix cho iOS Safari.

---

### Task 3: Hiệu ứng Cánh hoa rơi Canvas & Mở phong bì (`js/petals.js`, `js/main.js`)

**Files:**
- Create: `js/petals.js`
- Create: `js/main.js` (Phần xử lý phong bì & khởi động)

**Interfaces:**
- Consumes: Canvas element `#petalsCanvas`, `window.WEDDING_CONFIG`.
- Produces: `window.initPetalsAnimation()`, `window.openEnvelope()`.

- [ ] **Step 1: Viết `js/petals.js`**
  - Tạo hệ thống hạt Canvas (Particle System) mô phỏng cánh hoa hồng rơi mềm mại.
  - Mỗi cánh hoa có kích thước, độ nghiêng (tilt), tốc độ rơi và quỹ đạo lượn sóng tự nhiên.
  - Tự động điều chỉnh kích thước Canvas khi đổi hướng màn hình (`resize`).

- [ ] **Step 2: Viết logic mở phong bì trong `js/main.js`**
  - Lắng nghe sự kiện click/tap vào con dấu sáp hoặc nút "Mở thiệp".
  - Thêm class `.opened` kích hoạt hoạt ảnh 3D mở nắp phong bì.
  - Kích hoạt trình phát nhạc tự động và giải phóng màn hình phong bì để hiển thị nội dung chính.

---

### Task 4: Trình phát nhạc đĩa than (`js/music.js`)

**Files:**
- Create: `js/music.js`

**Interfaces:**
- Consumes: Thẻ `<audio>` hoặc Web Audio API generator, nút điều khiển `#musicToggle`.
- Produces: `window.WeddingMusic` với các phương thức `play()`, `pause()`, `toggle()`.

- [ ] **Step 1: Viết `js/music.js`**
  - Quản lý trạng thái phát nhạc (đang phát / tạm dừng).
  - Tích hợp Web Audio API dự phòng (Synthesized Romantic Melody) nếu file âm thanh chưa được tải.
  - Hiệu ứng đĩa than xoay tròn và các nốt nhạc bay khi nhạc đang phát.
  - Lưu trạng thái bật/tắt vào `sessionStorage` để duy trì trải nghiệm.

---

### Task 5: Nội dung chính, Đồng hồ đếm ngược & Lịch trình (`index.html`, `js/main.js`)

**Files:**
- Create: `index.html`
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `window.WEDDING_CONFIG`.
- Produces: Giao diện đầy đủ từ Hero, Countdown, Couple, Love Story, Schedule, Maps link.

- [ ] **Step 1: Xây dựng khung giao diện `index.html`**
  - Thẻ `<head>` với đầy đủ meta tags SEO, Open Graph (hiển thị ảnh đại diện khi gửi link qua Zalo/Facebook), liên kết Google Fonts.
  - Bìa phong bì tương tác (`#envelopeOverlay`).
  - Section Hero với ảnh bìa chất lượng cao.
  - Section Countdown với 4 ô: Ngày, Giờ, Phút, Giây.
  - Section Couple Profiles (Chú rể & Cô dâu).
  - Section Love Story Timeline.
  - Section Wedding Events (Lễ Thành Hôn, Tiệc Cưới) kèm nút Google Maps & Google Calendar.

- [ ] **Step 2: Viết hàm đếm ngược trong `js/main.js`**
  - Tính toán khoảng cách thời gian giữa thời điểm hiện tại và ngày cưới trong `config.js`.
  - Cập nhật giá trị Ngày, Giờ, Phút, Giây mỗi giây một lần.
  - Xử lý trạng thái khi đã đến hoặc qua ngày cưới.

---

### Task 6: Album Ảnh Cưới 32 Tấm & Lightbox Toàn màn hình (`js/gallery.js`)

**Files:**
- Create: `js/gallery.js`
- Modify: `index.html` (Thêm Section Gallery & Lightbox modal)

**Interfaces:**
- Consumes: `window.WEDDING_CONFIG.gallery` (danh sách 32 ảnh).
- Produces: `window.WeddingGallery` quản lý hiển thị lưới ảnh, bộ lọc danh mục và Lightbox modal xem toàn màn hình.

- [ ] **Step 1: Viết `js/gallery.js`**
  - Render danh sách ảnh dưới dạng Masonry Grid linh hoạt.
  - Tích hợp bộ lọc danh mục (Tất cả, Lễ phục, Hiện đại, Khoảnh khắc).
  - Áp dụng `loading="lazy"` cho từng ảnh.
  - Mở Lightbox xem toàn màn hình khi nhấp vào ảnh.
  - Hỗ trợ chuyển ảnh trước/sau (Next/Prev), phím mũi tên bàn phím và thao tác vuốt (touch swipe) trên điện thoại.
  - Hiển thị bộ đếm số ảnh (ví dụ: `12 / 32`).

---

### Task 7: Sổ lưu bút RSVP & Hộp mừng cưới Online VietQR (`index.html`, `js/main.js`)

**Files:**
- Modify: `index.html`
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `window.WEDDING_CONFIG.bankAccounts`.
- Produces: Form xác nhận tham dự RSVP, Sổ lưu bút `localStorage`, Thẻ thông tin chuyển khoản VietQR, Nút sao chép STK.

- [ ] **Step 1: Xây dựng Form RSVP & Bảng lưu bút**
  - Form thu thập: Tên, SĐT, Khách nhà trai/gái, Số người đi cùng, Lời chúc.
  - Lưu và đọc lời chúc từ `localStorage`.
  - Hiển thị danh sách lời chúc sinh động với hiệu ứng thiệp nhỏ.

- [ ] **Step 2: Xây dựng Hộp mừng cưới Online**
  - Tự động tạo ảnh mã QR VietQR theo định dạng chuẩn: `https://img.vietqr.io/image/{bank}-{account}-compact2.png`.
  - Hiển thị thông tin tài khoản Chú Rể và Cô Dâu.
  - Nút "Sao chép số tài khoản" chỉ với 1 chạm, hiển thị thông báo Toast xác nhận *"Đã sao chép số tài khoản"*.

---

### Task 8: Kiểm thử Toàn diện & Tối ưu Hoàn thiện

**Files:**
- Toàn bộ các file trong dự án.

- [ ] **Step 1: Kiểm tra trên trình duyệt di động (Responsive 375px - 430px)**
  - Kiểm tra mở phong bì 3D.
  - Kiểm tra nhạc nền tự phát sau khi chạm.
  - Kiểm tra cuộn trang mượt mà, không bị tràn ngang (overflow-x).

- [ ] **Step 2: Kiểm tra chức năng Album & Lightbox**
  - Mở từng ảnh, chuyển ảnh kế tiếp, kiểm tra hiển thị 32 bức ảnh.

- [ ] **Step 3: Kiểm tra Form RSVP & Sao chép STK**
  - Gửi lời chúc thử nghiệm, xác nhận lời chúc xuất hiện ngay.
  - Nhấp sao chép STK, kiểm tra clipboard và toast.
