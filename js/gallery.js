/**
 * ====================================================================
 * WEDDING PHOTO GALLERY & LIGHTBOX (ALBUM 32 ẢNH & LIGHTBOX TOÀN MÀN HÌNH)
 * ====================================================================
 */

(function() {
  let currentIndex = 0;
  let activeItems = [];
  let modal, modalImg, modalCaption, modalCounter, closeBtn, prevBtn, nextBtn;
  let touchStartX = 0;
  let touchEndX = 0;

  let visibleCount = 12;
  const INITIAL_BATCH = 12;
  let currentFilter = 'all';

  function renderGallery(filter = 'all', append = false) {
    const grid = document.getElementById('galleryGrid');
    if (!grid || !window.WEDDING_CONFIG || !window.WEDDING_CONFIG.gallery) return;

    const allPhotos = window.WEDDING_CONFIG.gallery;
    currentFilter = filter;
    activeItems = filter === 'all' 
      ? allPhotos 
      : allPhotos.filter(item => item.category === filter);

    if (!append) {
      grid.innerHTML = '';
      visibleCount = INITIAL_BATCH;
    }

    const itemsToRender = activeItems.slice(0, visibleCount);

    grid.innerHTML = '';
    itemsToRender.forEach((photo, idx) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-index', idx);
      
      const fullSrc = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.getImageUrl)
        ? window.WEDDING_CONFIG.getImageUrl(photo.src)
        : photo.src;
      const thumbSrc = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.getThumbnailUrl)
        ? window.WEDDING_CONFIG.getThumbnailUrl(photo.src, 600, 80)
        : fullSrc;

      item.innerHTML = `
        <img 
          src="${thumbSrc}" 
          alt="${photo.title || 'Ảnh cưới'}" 
          loading="lazy" 
          decoding="async"
          onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${fullSrc}';}" 
        />
        <div class="gallery-overlay">
          <span class="gallery-item-title">${photo.title || 'Khoảnh khắc ngọt ngào'}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        openLightbox(idx);
      });

      grid.appendChild(item);
    });

    updateLoadMoreButton();
  }

  function updateLoadMoreButton() {
    let loadMoreContainer = document.getElementById('galleryLoadMoreContainer');
    const gallerySection = document.getElementById('gallery');
    const container = gallerySection ? gallerySection.querySelector('.container') : null;

    if (!loadMoreContainer && container) {
      loadMoreContainer = document.createElement('div');
      loadMoreContainer.id = 'galleryLoadMoreContainer';
      loadMoreContainer.className = 'gallery-load-more';
      container.appendChild(loadMoreContainer);
    }

    if (!loadMoreContainer) return;

    const remaining = activeItems.length - visibleCount;
    if (remaining > 0) {
      loadMoreContainer.style.display = 'flex';
      loadMoreContainer.innerHTML = `
        <button class="btn btn-outline btn-load-more" id="btnLoadMoreGallery">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <span>Xem Thêm Ảnh Cưới (Còn ${remaining} ảnh)</span>
        </button>
      `;

      const btn = document.getElementById('btnLoadMoreGallery');
      if (btn) {
        btn.addEventListener('click', () => {
          visibleCount += INITIAL_BATCH;
          renderGallery(currentFilter, true);
        });
      }
    } else {
      loadMoreContainer.style.display = 'none';
    }
  }

  function openLightbox(index) {
    if (!activeItems || activeItems.length === 0) return;
    currentIndex = index;
    updateLightboxContent();

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scroll
    }
  }

  function closeLightbox() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateLightboxContent() {
    if (!activeItems[currentIndex]) return;
    const photo = activeItems[currentIndex];
    const photoSrc = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.getImageUrl)
      ? window.WEDDING_CONFIG.getImageUrl(photo.src)
      : photo.src;
    if (modalImg) {
      modalImg.decoding = 'async';
      modalImg.src = photoSrc;
    }
    if (modalCaption) modalCaption.textContent = photo.title || 'Khoảnh khắc hạnh phúc';
    if (modalCounter) modalCounter.textContent = `${currentIndex + 1} / ${activeItems.length}`;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % activeItems.length;
    updateLightboxContent();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    updateLightboxContent();
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextImage(); // Swipe left -> next
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevImage(); // Swipe right -> prev
    }
  }

  window.WeddingGallery = {
    init: function() {
      modal = document.getElementById('lightboxModal');
      modalImg = document.getElementById('lightboxImg');
      modalCaption = document.getElementById('lightboxCaption');
      modalCounter = document.getElementById('lightboxCounter');
      closeBtn = document.getElementById('lightboxClose');
      prevBtn = document.getElementById('lightboxPrev');
      nextBtn = document.getElementById('lightboxNext');

      // Initialize Grid
      renderGallery('all');

      // Filter Buttons
      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter') || 'all';
          renderGallery(filter);
        });
      });

      // Controls
      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (prevBtn) prevBtn.addEventListener('click', prevImage);
      if (nextBtn) nextBtn.addEventListener('click', nextImage);

      // Close on clicking backdrop
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
          }
        });

        // Touch gestures for mobile
        modal.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        }, { passive: true });
      }

      // Keyboard navigation
      window.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      });
    }
  };
})();
