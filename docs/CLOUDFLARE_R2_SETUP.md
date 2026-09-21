# Hướng Dẫn Tải Ảnh Lên Cloudflare R2 & Cấu Hình CDN Cho Website Thiệp Cưới

Tài liệu này hướng dẫn chi tiết cách tải 32 ảnh cưới (~300MB) từ thư mục `img/` lên **Cloudflare R2 Storage**, giữ nguyên 100% tên file (`TUABxxxx.JPG`) và định dạng gốc, giúp trang web tải nhanh vượt trội nhờ mạng lưới CDN toàn cầu của Cloudflare.

---

## 1. Tổng quan cách hoạt động

- **Trước khi cấu hình R2**: Website tải ảnh trực tiếp từ thư mục `img/` cục bộ trên máy chủ/hosting.
- **Sau khi cấu hình R2**: Ảnh được tải từ mạng lưới CDN biên tốc độ cao của Cloudflare (miễn phí băng thông tải về Egress Bandwidth với R2).
- Website có sẵn cơ chế thông minh trong [`js/config.js`](file:///c:/Users/BAO/Desktop/ac/js/config.js):
  - Khi `r2PublicUrl` được điền link: Hệ thống tự động trỏ toàn bộ ảnh về Cloudflare R2.
  - Khi `r2PublicUrl` để trống `""`: Hệ thống tự động fallback về thư mục nội bộ `img/`.

---

## 2. Cách 1: Tải ảnh bằng giao diện Web Cloudflare Dashboard (Khuyên dùng - Nhanh nhất)

> **Ưu điểm**: Không cần cài đặt bất kỳ phần mềm hay Node.js/Python nào, thao tác trực quan chỉ mất 1-2 phút.

### Bước 1: Tạo Bucket R2
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Ở thanh menu bên trái, chọn **R2 Object Storage**.
3. Bấm nút **Create bucket**.
4. Đặt tên bucket (ví dụ: `wedding-photos`).
5. Ở mục **Location Hint**, khuyến nghị chọn **Asia-Pacific (APAC)** để tối ưu tốc độ cho khách mời tại Việt Nam.
6. Bấm **Create bucket**.

### Bước 2: Tải 32 ảnh lên Bucket
1. Tại trang quản lý bucket vừa tạo, bấm nút **Upload** (hoặc kéo thả).
2. Chọn tất cả 32 file trong thư mục `img/` (`TUAB5232.JPG` đến `TUAB6962.JPG`).
3. Bấm **Upload**. Cloudflare sẽ tải đồng thời 32 ảnh lên và giữ nguyên tên file và đuôi `.JPG`.

### Bước 3: Bật Public URL cho Bucket
1. Trong bucket của bạn, chuyển sang tab **Settings**.
2. Cuộn xuống phần **Public access** > tìm mục **R2.dev subdomain**.
3. Bấm **Allow** (hoặc **Connect Custom Domain** nếu bạn có tên miền riêng).
4. Bạn sẽ nhận được một đường link công khai dạng:
   ```
   https://pub-xxxxxxxxxxxxxxxxxxxxxxxx.r2.dev
   ```

---

## 3. Cách 2: Tải ảnh tự động bằng PowerShell Script

> Dành cho bạn nếu muốn upload bằng dòng lệnh có sẵn trên Windows mà không cần cài Node.js.

### Bước 1: Lấy thông tin API Token từ Cloudflare
1. Vào Cloudflare Dashboard > **R2 Object Storage** > bấm **Manage R2 API Tokens** ở menu bên phải.
2. Bấm **Create API Token**.
3. Chọn quyền: **Object Read & Write**.
4. Bấm **Create API Token**. Lưu lại các thông tin:
   - **Account ID**
   - **Access Key ID**
   - **Secret Access Key**

### Bước 2: Chạy Script Upload
1. Mở PowerShell tại thư mục dự án và chạy:
   ```powershell
   .\scripts\upload-r2.ps1
   ```
2. Nhập các thông tin Cloudflare khi được hỏi (script sẽ tự lưu vào file `scripts/r2_config.json` để bạn không phải nhập lại ở các lần sau).
3. Script sẽ tự động tính mã xác thực AWS SigV4 và tải toàn bộ 32 ảnh lên Cloudflare R2 với thanh tiến trình trực quan.

---

## 4. Kích hoạt CDN vào Website Thiệp Cưới

Sau khi đã có link Public từ Bước 3 (ví dụ: `https://pub-abc123xyz.r2.dev`), bạn chỉ cần làm 1 thao tác duy nhất:

1. Mở file [`js/config.js`](file:///c:/Users/BAO/Desktop/ac/js/config.js).
2. Tìm dòng `r2PublicUrl` ở đầu file và dán link của bạn vào:
   ```javascript
   // js/config.js
   window.WEDDING_CONFIG = {
     // Điền link R2 public của bạn tại đây:
     r2PublicUrl: "https://pub-xxxxxxxxxxxxxxxxxxxxxxxx.r2.dev",
     ...
   ```
3. Lưu file lại.
4. Mở website lên kiểm tra: Toàn bộ ảnh Hero banner, ảnh đại diện cô dâu & chú rể, ảnh lịch trình sự kiện và 32 ảnh trong Album cưới Lightbox sẽ lập tức được tải từ Cloudflare R2 với tốc độ cao!
