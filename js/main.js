/**
 * ====================================================================
 * MAIN WEDDING APPLICATION LOGIC (LOGIC CHÍNH CỦA TRANG WEB THIỆP CƯỚI)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.WEDDING_CONFIG;
  if (!config) {
    console.error("Không tìm thấy cấu hình WEDDING_CONFIG!");
    return;
  }

  // 0. ĐỒNG BỘ DỮ LIỆU TỪ CONFIG VÀO GIAO DIỆN
  function applyConfigToUI() {
    if (!config) return;

    // Document Title
    if (config.groom && config.bride) {
      document.title = `Thiệp Cưới ${config.groom.shortName || config.groom.name} & ${config.bride.shortName || config.bride.name} | Save The Date`;
    }

    // Envelope
    const envelopeNames = document.getElementById('envelopeNames');
    if (envelopeNames && config.groom && config.bride) {
      envelopeNames.textContent = `${config.groom.shortName || config.groom.name} & ${config.bride.shortName || config.bride.name}`;
    }

    const envelopeDate = document.getElementById('envelopeDate');
    if (envelopeDate && config.weddingDate) {
      const d = new Date(config.weddingDate);
      envelopeDate.textContent = `${String(d.getDate()).padStart(2, '0')} . ${String(d.getMonth() + 1).padStart(2, '0')} . ${d.getFullYear()}`;
    }

    const waxSealMonogram = document.getElementById('waxSealMonogram');
    if (waxSealMonogram && config.groom && config.bride) {
      waxSealMonogram.textContent = "B&T";
    }

    // Hero Section
    const heroGroom = document.getElementById('heroGroom');
    if (heroGroom) heroGroom.textContent = config.groom.shortName || config.groom.name;
    const heroBride = document.getElementById('heroBride');
    if (heroBride) heroBride.textContent = config.bride.shortName || config.bride.name;

    const heroDate = document.getElementById('heroDate');
    if (heroDate && config.weddingDate) {
      const d = new Date(config.weddingDate);
      heroDate.textContent = `${String(d.getDate()).padStart(2, '0')} . ${String(d.getMonth() + 1).padStart(2, '0')} . ${d.getFullYear()}`;
    }

    const heroImage = document.getElementById('heroImage');
    if (heroImage && config.heroImage) {
      const fullHero = config.getImageUrl ? config.getImageUrl(config.heroImage) : config.heroImage;
      const thumbHero = config.getThumbnailUrl ? config.getThumbnailUrl(config.heroImage, 1200, 85) : fullHero;
      heroImage.decoding = 'async';
      heroImage.src = thumbHero;
      heroImage.onerror = function() { if (this.src !== fullHero) this.src = fullHero; };
      heroImage.alt = `Ảnh cưới ${config.groom.name} & ${config.bride.name}`;
    }

    // Countdown Subtitle
    const countdownSubtitle = document.getElementById('countdownSubtitle');
    if (countdownSubtitle) {
      countdownSubtitle.textContent = `${config.weddingDateDisplay || ''} ${config.lunarDateDisplay || ''}`;
    }

    // Couple Profiles
    // Groom
    const groomAvatar = document.getElementById('groomAvatar');
    if (groomAvatar && config.groom.avatar) {
      const fullGroom = config.getImageUrl ? config.getImageUrl(config.groom.avatar) : config.groom.avatar;
      const thumbGroom = config.getThumbnailUrl ? config.getThumbnailUrl(config.groom.avatar, 400, 85) : fullGroom;
      groomAvatar.decoding = 'async';
      groomAvatar.src = thumbGroom;
      groomAvatar.onerror = function() { if (this.src !== fullGroom) this.src = fullGroom; };
    }
    const groomName = document.getElementById('groomName');
    if (groomName) groomName.textContent = config.groom.name;
    const groomParents = document.getElementById('groomParents');
    if (groomParents) {
      groomParents.innerHTML = `
        <div>Cha: <strong>${escapeHTML(config.groom.father)}</strong></div>
        <div>Mẹ: <strong>${escapeHTML(config.groom.mother)}</strong></div>
        <div style="font-size: 0.85rem; color: #8C8276; margin-top: 0.25rem;">${escapeHTML(config.groom.address)}</div>
      `;
    }
    const groomBio = document.getElementById('groomBio');
    if (groomBio && config.groom.bio) groomBio.textContent = `“${config.groom.bio}”`;

    // Bride
    const brideAvatar = document.getElementById('brideAvatar');
    if (brideAvatar && config.bride.avatar) {
      const fullBride = config.getImageUrl ? config.getImageUrl(config.bride.avatar) : config.bride.avatar;
      const thumbBride = config.getThumbnailUrl ? config.getThumbnailUrl(config.bride.avatar, 400, 85) : fullBride;
      brideAvatar.decoding = 'async';
      brideAvatar.src = thumbBride;
      brideAvatar.onerror = function() { if (this.src !== fullBride) this.src = fullBride; };
    }
    const brideName = document.getElementById('brideName');
    if (brideName) brideName.textContent = config.bride.name;
    const brideParents = document.getElementById('brideParents');
    if (brideParents) {
      brideParents.innerHTML = `
        <div>Cha: <strong>${escapeHTML(config.bride.father)}</strong></div>
        <div>Mẹ: <strong>${escapeHTML(config.bride.mother)}</strong></div>
        <div style="font-size: 0.85rem; color: #8C8276; margin-top: 0.25rem;">${escapeHTML(config.bride.address)}</div>
      `;
    }
    const brideBio = document.getElementById('brideBio');
    if (brideBio && config.bride.bio) brideBio.textContent = `“${config.bride.bio}”`;

    // RSVP Labels
    const rsvpGroomSideText = document.getElementById('rsvpGroomSideText');
    if (rsvpGroomSideText) {
      rsvpGroomSideText.textContent = `Nhà Trai (${config.groom.shortName || config.groom.name})`;
    }
    const rsvpBrideSideText = document.getElementById('rsvpBrideSideText');
    if (rsvpBrideSideText) {
      rsvpBrideSideText.textContent = `Nhà Gái (${config.bride.shortName || config.bride.name})`;
    }

    // Footer
    const footerNames = document.getElementById('footerNames');
    if (footerNames) {
      footerNames.textContent = `${config.groom.shortName || config.groom.name} & ${config.bride.shortName || config.bride.name}`;
    }
    const footerCredit = document.getElementById('footerCredit');
    if (footerCredit && config.weddingDate) {
      const d = new Date(config.weddingDate);
      footerCredit.textContent = `Save The Date • ${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()} • Forever in Love`;
    }
  }

  // Khởi chạy đồng bộ giao diện
  applyConfigToUI();

  // 1. KHỞI TẠO CÁC MODULE CON
  if (window.initPetalsAnimation) window.initPetalsAnimation();
  if (window.WeddingMusic) window.WeddingMusic.init();
  if (window.WeddingGallery) window.WeddingGallery.init();

  // 2. XỬ LÝ MỞ PHONG BÌ (ENVELOPE INTERACTION)
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const envelopeBox = document.getElementById('envelopeBox');
  const waxSeal = document.getElementById('waxSeal');
  const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');

  function triggerOpenEnvelope() {
    if (!envelopeBox || envelopeBox.classList.contains('opened')) return;

    envelopeBox.classList.add('opened');

    // Nổ cánh hoa rực rỡ
    if (window.burstPetals) window.burstPetals();

    // Phát nhạc cưới du dương
    if (window.WeddingMusic) window.WeddingMusic.play();

    // Ẩn lớp phủ phong bì sau 1.6s để hiển thị trang web chính
    setTimeout(() => {
      if (envelopeOverlay) {
        envelopeOverlay.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }, 1600);
  }

  if (waxSeal) waxSeal.addEventListener('click', triggerOpenEnvelope);
  if (openEnvelopeBtn) openEnvelopeBtn.addEventListener('click', triggerOpenEnvelope);
  if (envelopeBox) envelopeBox.addEventListener('click', triggerOpenEnvelope);

  // 3. ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER)
  function initCountdown() {
    const targetTime = new Date(config.weddingDate).getTime();
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minutesEl = document.getElementById('countdownMinutes');
    const secondsEl = document.getElementById('countdownSeconds');

    function updateTimer() {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }
  initCountdown();


  // 5. RENDER SỰ KIỆN & LỊCH TRÌNH (EVENTS)
  function renderEvents() {
    const eventsContainer = document.getElementById('eventsGrid');
    if (!eventsContainer || !config.events) return;

    // SVG Icon Lễ Vu Quy (Nhẫn cưới uyên ương & kim cương tình yêu)
    const vuQuyIconSvg = `
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6L23 11H15L19 6Z" fill="url(#eventGold)" />
        <path d="M15 11L19 17L23 11H15Z" fill="url(#eventGold)" opacity="0.85" />
        <path d="M19 1L19.8 4L22 4.8L19.8 5.6L19 8L18.2 5.6L16 4.8L18.2 4L19 1Z" fill="#DFBA73" />
        <path d="M37 14L37.6 16.2L40 16.8L37.6 17.4L37 20L36.4 17.4L34 16.8L36.4 16.2L37 14Z" fill="#DFBA73" />
        <circle cx="19" cy="27" r="12" stroke="url(#eventGold)" stroke-width="3.5" />
        <circle cx="29" cy="27" r="12" stroke="url(#eventGold)" stroke-width="3.5" />
        <path d="M24 25.5C22.8 24 21 24.5 21 26C21 27.6 24 30 24 30C24 30 27 27.6 27 26C27 24.5 25.2 24 24 25.5Z" fill="url(#eventGold)" />
        <defs>
          <linearGradient id="eventGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#DFBA73" />
            <stop offset="50%" stop-color="#C5A059" />
            <stop offset="100%" stop-color="#9A7633" />
          </linearGradient>
        </defs>
      </svg>
    `;

    // SVG Icon Lễ Tân Hôn (Cặp ly rượu champagne giao bôi & trái tim sủi bọt)
    const tanHonIconSvg = `
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10L19 22C19 25 17 27 14 27H13C10 27 8 25 8 22L11 10H16Z" stroke="url(#eventGold2)" stroke-width="2.8" stroke-linejoin="round" />
        <line x1="13.5" y1="27" x2="13.5" y2="39" stroke="url(#eventGold2)" stroke-width="2.8" stroke-linecap="round" />
        <line x1="9" y1="39" x2="18" y2="39" stroke="url(#eventGold2)" stroke-width="2.8" stroke-linecap="round" />
        <path d="M32 10L29 22C29 25 31 27 34 27H35C38 27 40 25 40 22L37 10H32Z" stroke="url(#eventGold2)" stroke-width="2.8" stroke-linejoin="round" />
        <line x1="34.5" y1="27" x2="34.5" y2="39" stroke="url(#eventGold2)" stroke-width="2.8" stroke-linecap="round" />
        <line x1="30" y1="39" x2="39" y2="39" stroke="url(#eventGold2)" stroke-width="2.8" stroke-linecap="round" />
        <path d="M24 13C22.8 11.4 21 11.8 21 13.2C21 14.6 24 17 24 17C24 17 27 14.6 27 13.2C27 11.8 25.2 11.4 24 13Z" fill="url(#eventGold2)" />
        <circle cx="24" cy="7" r="2.2" fill="url(#eventGold2)" />
        <circle cx="20.5" cy="19" r="1.5" fill="url(#eventGold2)" />
        <circle cx="27.5" cy="19" r="1.5" fill="url(#eventGold2)" />
        <defs>
          <linearGradient id="eventGold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#DFBA73" />
            <stop offset="50%" stop-color="#C5A059" />
            <stop offset="100%" stop-color="#9A7633" />
          </linearGradient>
        </defs>
      </svg>
    `;

    eventsContainer.innerHTML = '';
    config.events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      const isVuQuy = event.id === 'ceremony' || (event.title && event.title.toLowerCase().includes('vu quy'));
      const iconSvg = isVuQuy ? vuQuyIconSvg : tanHonIconSvg;
      const tagText = event.tag || (isVuQuy ? 'Nhà Gái' : 'Nhà Trai');

      card.innerHTML = `
        <div class="event-card-header">
          <div class="event-icon-badge" title="${event.title}">
            ${iconSvg}
          </div>
          <span class="event-tag">${tagText}</span>
        </div>
        <div class="event-card-body">
          <h3 class="event-title">${event.title}</h3>
          <div class="event-time">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${event.time}
          </div>
          <div class="event-location">${event.locationName}</div>
          <div class="event-address">${event.address}</div>
          <div class="event-actions">
            <a href="${event.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Chỉ Đường Google Maps
            </a>
          </div>
        </div>
      `;
      eventsContainer.appendChild(card);
    });
  }
  renderEvents();

  // 6. XỬ LÝ SỔ LƯU BÚT & RSVP (GUESTBOOK)
  const rsvpForm = document.getElementById('rsvpForm');
  const wishesList = document.getElementById('wishesList');

  // Khởi tạo Firebase
  let rtdb = null;
  let firestoreDb = null;
  const fbConfig = config.firebaseConfig;
  const isFirebaseConfigured = fbConfig && fbConfig.apiKey && fbConfig.apiKey !== 'YOUR_API_KEY';

  if (typeof firebase !== 'undefined' && isFirebaseConfigured) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(fbConfig);
      }
      if (typeof firebase.database === 'function' && fbConfig.databaseURL) {
        rtdb = firebase.database();
      }
      if (typeof firebase.firestore === 'function' && fbConfig.projectId) {
        firestoreDb = firebase.firestore();
      }
    } catch (err) {
      console.warn("Lỗi khởi tạo Firebase:", err);
    }
  }

  function formatWishTime(timestamp) {
    if (!timestamp) return 'Vừa xong';
    let date;
    if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else if (typeof timestamp === 'string') {
      return timestamp;
    } else {
      return 'Vừa xong';
    }

    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay < 30) return `${diffDay} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  }

  function getLocalWishes() {
    try {
      const localData = localStorage.getItem('wedding_wishes');
      if (localData) {
        return JSON.parse(localData);
      }
    } catch (e) {
      console.warn("Không đọc được localStorage:", e);
    }
    return config.initialWishes || [];
  }

  function saveLocalWish(newWish) {
    const wishes = getLocalWishes();
    wishes.unshift(newWish);
    try {
      localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    } catch (err) {
      console.warn("Không lưu được vào localStorage:", err);
    }
    renderWishes(wishes);
  }

  function renderWishes(wishes) {
    if (!wishesList) return;
    wishesList.innerHTML = '';

    if (!wishes || wishes.length === 0) {
      wishesList.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 2rem;">Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!</div>';
      return;
    }

    wishes.forEach(wish => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      const timeText = wish.timeDisplay || (wish.createdAt ? formatWishTime(wish.createdAt) : (wish.time || 'Vừa xong'));
      card.innerHTML = `
        <div class="wish-header">
          <span class="wish-author">${escapeHTML(wish.name)}</span>
          <span class="wish-badge">${escapeHTML(wish.relation || 'Khách quý')}</span>
        </div>
        <p class="wish-text">${escapeHTML(wish.message)}</p>
        <div class="wish-time">${escapeHTML(timeText)}</div>
      `;
      wishesList.appendChild(card);
    });
  }

  // Khởi động đồng bộ lời chúc: Tự động kết nối Realtime Database hoặc Firestore
  function initWishesSync() {
    if (rtdb) {
      rtdb.ref('wedding_wishes').limitToLast(100).on('value', (snapshot) => {
        const remoteWishes = [];
        snapshot.forEach(child => {
          const val = child.val();
          remoteWishes.unshift({
            id: child.key,
            name: val.name || '',
            relation: val.relation || 'Khách quý',
            message: val.message || '',
            createdAt: val.createdAt,
            timeDisplay: formatWishTime(val.createdAt)
          });
        });

        if (remoteWishes.length === 0 && config.initialWishes && config.initialWishes.length > 0) {
          renderWishes(config.initialWishes);
        } else {
          renderWishes(remoteWishes);
        }
      }, (error) => {
        console.warn("Lỗi đọc Realtime Database (kiểm tra Rules):", error);
        syncWithFirestore();
      });
    } else if (firestoreDb) {
      syncWithFirestore();
    } else {
      renderWishes(getLocalWishes());
    }
  }

  function syncWithFirestore() {
    if (!firestoreDb) {
      renderWishes(getLocalWishes());
      return;
    }
    firestoreDb.collection('wedding_wishes')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .onSnapshot((snapshot) => {
        const remoteWishes = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          remoteWishes.push({
            id: doc.id,
            name: data.name || '',
            relation: data.relation || 'Khách quý',
            message: data.message || '',
            createdAt: data.createdAt,
            timeDisplay: formatWishTime(data.createdAt)
          });
        });

        if (remoteWishes.length === 0 && config.initialWishes && config.initialWishes.length > 0) {
          renderWishes(config.initialWishes);
        } else {
          renderWishes(remoteWishes);
        }
      }, (error) => {
        console.warn("Lỗi đọc Firestore (kiểm tra Rules):", error);
        renderWishes(getLocalWishes());
      });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('guestName');
      const phoneInput = document.getElementById('guestPhone');
      const relationInput = document.querySelector('input[name="guestSide"]:checked');
      const messageInput = document.getElementById('guestMessage');
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const relation = relationInput ? relationInput.value : 'Khách quý';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !message) {
        showToast('Vui lòng nhập tên và lời chúc của bạn nhé!');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      const newWish = {
        name: name,
        phone: phone,
        relation: relation,
        message: message,
        timeDisplay: 'Vừa xong'
      };

      let submitted = false;

      // 1. Thử gửi qua Realtime Database trước
      if (rtdb) {
        try {
          await rtdb.ref('wedding_wishes').push({
            name: name,
            phone: phone,
            relation: relation,
            message: message,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          });
          submitted = true;
        } catch (rtdbErr) {
          console.warn("Không gửi được qua Realtime Database:", rtdbErr);
        }
      }

      // 2. Nếu Realtime Database chưa được, thử qua Firestore
      if (!submitted && firestoreDb) {
        try {
          await firestoreDb.collection('wedding_wishes').add({
            name: name,
            phone: phone,
            relation: relation,
            message: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          submitted = true;
        } catch (fsErr) {
          console.warn("Không gửi được qua Firestore:", fsErr);
        }
      }

      if (submitted) {
        rsvpForm.reset();
        showToast('Cảm ơn bạn đã gửi lời chúc mừng hạnh phúc!');
      } else {
        saveLocalWish(newWish);
        rsvpForm.reset();
        showToast('Cảm ơn bạn! Đã ghi nhận lời chúc của bạn.');
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    });
  }

  initWishesSync();


  // 8. TOAST NOTIFICATION
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
