/**
 * ====================================================================
 * WEDDING INVITATION CONFIGURATION (CẤU HÌNH THIỆP CƯỚI)
 * ====================================================================
 * Bạn có thể dễ dàng tùy chỉnh toàn bộ thông tin ngày cưới, tên cô dâu
 * chú rể, địa điểm, số tài khoản mừng cưới, lời chúc mẫu tại đây!
 */

window.WEDDING_CONFIG = {
  // 0. CẤU HÌNH CLOUDFLARE R2 / CDN (TỐI ƯU TỐC ĐỘ TẢI TRANG)
  // Điền Public URL của R2 (ví dụ: "https://pub-xxxxxxxx.r2.dev" hoặc "https://cdn.domain.com")
  // Bỏ trống "" nếu muốn sử dụng ảnh nội bộ trong thư mục "img/".
  r2PublicUrl: "https://pub-bf77e033a1fd47f6a82d4b3b70dd90db.r2.dev",

  /**
   * Hàm chuyển đổi đường dẫn ảnh sang CDN Cloudflare R2
   * Giữ nguyên 100% tên file và định dạng gốc (ví dụ: TUAB5232.JPG)
   * @param {string} path - Đường dẫn ảnh (ví dụ: "img/TUAB5232.JPG")
   * @returns {string} - Đường dẫn ảnh CDN hoặc nội bộ
   */
  getImageUrl: function (path) {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
      return path;
    }
    if (this.r2PublicUrl && this.r2PublicUrl.trim() !== "") {
      const cleanBase = this.r2PublicUrl.trim().replace(/\/+$/, '');
      const filename = path.split(/[/\\]/).pop();
      return `${cleanBase}/${filename}`;
    }
    return path;
  },

  /**
   * Hàm tạo đường dẫn ảnh WebP thumbnail tối ưu qua CDN (giảm 99.8% dung lượng, từ 8MB xuống ~12KB)
   * Phù hợp cho hiển thị dạng lưới (grid), avatar, thẻ sự kiện để cuộn mượt mà
   * @param {string} path - Đường dẫn ảnh gốc (URL hoặc "img/...")
   * @param {number} width - Chiều rộng mong muốn (mặc định 600px)
   * @param {number} quality - Chất lượng ảnh nén 1-100 (mặc định 80)
   * @returns {string} - Đường dẫn ảnh WebP đã tối ưu
   */
  getThumbnailUrl: function (path, width = 600, quality = 80) {
    const fullUrl = this.getImageUrl(path);
    if (!fullUrl) return "";
    if (fullUrl.startsWith("http://") || fullUrl.startsWith("https://")) {
      return `https://wsrv.nl/?url=${encodeURIComponent(fullUrl)}&w=${width}&q=${quality}&output=webp`;
    }
    return fullUrl;
  },

  // 1. THÔNG TIN CẶP ĐÔI
  groom: {
    name: "Lê Thái Bão",
    shortName: "Thái Bão",
    title: "Chú Rể",
    father: "Lê Văn Lực",
    mother: "Phạm Thị Khen",
    address: "Ấp Tân Long A, xã Tân Bình, TP.Cần Thơ",
    bio: "Là một chàng trai đam mê công nghệ và yêu sự chân thành. Hạnh phúc lớn nhất của anh là tìm thấy một nửa dịu dàng, luôn đồng hành và sẻ chia mọi khoảnh khắc trong cuộc sống.",
    avatar: "img/TUAB6748.JPG"
  },
  bride: {
    name: "Trần Thị Bảo Trân",
    shortName: "Bảo Trân",
    title: "Cô Dâu",
    father: "Trần Văn Chẳng",
    mother: "Đặng Thị Loan",
    address: "Ấp Tân Long, xã Phụng Hiệp, TP.Cần Thơ",
    bio: "Một cô gái thích làm bánh, thích những giai điệu ngọt ngào và những chuyến đi. Cảm ơn anh đã đến, nắm lấy tay em và cùng em viết nên một câu chuyện tình yêu trọn vẹn nhất.",
    avatar: "img/TUAB6045.JPG"
  },

  // 2. THỜI GIAN & ĐẾM NGƯỢC
  // Định dạng ISO: YYYY-MM-DDTHH:mm:ss
  weddingDate: "2026-09-29T10:30:00",
  weddingDateDisplay: "Thứ Ba, ngày 29 tháng 9 năm 2026",
  lunarDateDisplay: "(Tức ngày 19 tháng 8 năm Bính Ngọ)",

  // 3. ẢNH ĐẠI DIỆN CHÍNH (HERO BANNER)
  heroImage: "img/TUAB6234.JPG",
  invitationCoverImage: "img/TUAB5232.JPG",

  // 4. LỊCH TRÌNH SỰ KIỆN CHI TIẾT
  events: [
    {
      id: "ceremony",
      title: "Lễ Vu Quy",
      tag: "Nhà Gái",
      time: "09:00 - 16.09.2026",
      locationName: "Nhà Cô Dâu",
      address: "Ấp Tân Long, xã Phụng Hiệp, TP.Cần Thơ",
      mapUrl: "https://maps.app.goo.gl/QAoknFvUVFvgncYX6"
    },
    {
      id: "reception",
      title: "Lễ Tân Hôn",
      tag: "Nhà Trai",
      time: "10:00 - 29.09.2026",
      locationName: "Nhà Trai",
      address: "Ấp Tân Long A, xã Tân Bình, TP.Cần Thơ",
      mapUrl: "https://maps.app.goo.gl/Nr7htkVxctRabPBE6"
    }
  ],


  // 6. DANH SÁCH 32 ẢNH CƯỚI & DANH MỤC (PHOTO GALLERY)
  gallery: [
    // --- CONCEPT 1: VÁY CƯỚI ĐUÔI CÁ REN & VEST ĐEN ---
    { src: "img/TUAB5232.JPG", category: "modern", title: "Váy cưới đuôi cá kiêu sa" },
    { src: "img/TUAB5287.JPG", category: "romantic", title: "Ánh nhìn yêu thương" },
    { src: "img/TUAB5298.JPG", category: "romantic", title: "Khoảnh khắc trao nhẫn" },
    { src: "img/TUAB5302.JPG", category: "romantic", title: "Nụ cười hạnh phúc" },
    { src: "img/TUAB5366.JPG", category: "romantic", title: "Chạm khẽ yêu thương" },
    { src: "img/TUAB5565.JPG", category: "modern", title: "Sánh bước bên chàng" },
    { src: "img/TUAB5636.JPG", category: "modern", title: "Nàng thơ bên khung cửa" },
    { src: "img/TUAB5677.JPG", category: "modern", title: "Phong thái kiêu kỳ" },
    { src: "img/TUAB5689.JPG", category: "romantic", title: "Nắm tay em đi qua năm tháng" },
    { src: "img/TUAB5775.JPG", category: "romantic", title: "Tựa vào vai anh" },
    { src: "img/TUAB5878.JPG", category: "romantic", title: "Chúng mình đã về chung một nhà" },
    { src: "img/TUAB5961.JPG", category: "romantic", title: "Dưới làn voan mỏng" },

    // --- CONCEPT 2: VÁY CƯỚI CÔNG CHÚA SATIN & VEST TRẮNG ---
    { src: "img/TUAB6045.JPG", category: "modern", title: "Vẻ đẹp tinh khôi" },
    { src: "img/TUAB6153.JPG", category: "modern", title: "Cặp đôi đồng điệu" },
    { src: "img/TUAB6159.JPG", category: "romantic", title: "Tình yêu thuần khiết" },
    { src: "img/TUAB6234.JPG", category: "modern", title: "Lộng lẫy ngày chung đôi" },
    { src: "img/TUAB6243.JPG", category: "romantic", title: "Ánh nhìn đắm say" },
    { src: "img/TUAB6318.JPG", category: "romantic", title: "Khiêu vũ dưới mưa hoa" },
    { src: "img/TUAB6383.JPG", category: "romantic", title: "Bất ngờ dành cho em" },
    { src: "img/TUAB6465.JPG", category: "romantic", title: "Nụ hôn ngọt ngào" },
    { src: "img/TUAB6479.JPG", category: "romantic", title: "Vũ điệu tình yêu" },
    { src: "img/TUAB6534.JPG", category: "romantic", title: "Bình yên bên nhau" },
    { src: "img/TUAB6542.JPG", category: "romantic", title: "Theo em về nhà" },
    { src: "img/TUAB6583.JPG", category: "romantic", title: "Lời chào hạnh phúc" },
    { src: "img/TUAB6675.JPG", category: "romantic", title: "Vén màn hạnh phúc" },
    { src: "img/TUAB6686.JPG", category: "romantic", title: "Say đắm nụ cười em" },
    { src: "img/TUAB6748.JPG", category: "modern", title: "Chân dung chú rể lịch lãm" },

    // --- CONCEPT 3: LỄ PHỤC TRUYỀN THỐNG (CỔ PHỤC ÁO TẤC ĐỎ & LAM) ---
    { src: "img/TUAB6829.JPG", category: "traditional", title: "Nét duyên cổ phục" },
    { src: "img/TUAB6857.JPG", category: "traditional", title: "Trăm năm duyên thắm" },
    { src: "img/TUAB6879.JPG", category: "traditional", title: "Nguyện ước trăm năm" },
    { src: "img/TUAB6916.JPG", category: "traditional", title: "Duyên dáng nón quai thao" },
    { src: "img/TUAB6962.JPG", category: "traditional", title: "Trầu cau kết mối lương duyên" }
  ],


  // 8. LỜI CHÚC MẪU BAN ĐẦU CHO SỔ LƯU BÚT
  initialWishes: [
    {
      name: "Gia đình Bác Hai",
      relation: "Nhà Trai",
      message: "Chúc hai cháu trăm năm tình viên mãn, bạc đầu nghĩa phu thê! Luôn yêu thương và sẻ chia mọi niềm vui trong cuộc sống!",
      time: "Vừa xong"
    },
    {
      name: "Minh Trang (Bạn thân cô dâu)",
      relation: "Nhà Gái",
      message: "Cuối cùng ngày này cũng tới! Chúc Bảo Trân xinh đẹp của tao mãi hạnh phúc bên anh Thái Bảo, sớm có thiên thần nhỏ nha!",
      time: "10 phút trước"
    },
    {
      name: "Tuấn Anh & Nhóm bạn",
      relation: "Nhà Trai",
      message: "Chúc mừng người anh em Thái Bảo đã chính thức rước nàng về dinh! Chúc hai bạn hạnh phúc viên mãn trăm năm!",
      time: "30 phút trước"
    }
  ],

  // 9. CẤU HÌNH FIREBASE (ĐỒNG BỘ LỜI CHÚC TRỰC TUYẾN CHO MỌI NGƯỜI)
  firebaseConfig: {
    apiKey: "AIzaSyCZYs_0imtwKh2wLnV_Wx645HQpi65-IzA",
    authDomain: "wedding-bao-tran.firebaseapp.com",
    databaseURL: "https://wedding-bao-tran-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedding-bao-tran",
    storageBucket: "wedding-bao-tran.firebasestorage.app",
    messagingSenderId: "351507006783",
    appId: "1:351507006783:web:b29e97f55b9ee3309bbf8a",
    measurementId: "G-NYF9L2T86T"
  }
};
