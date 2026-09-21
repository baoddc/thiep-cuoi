/**
 * ====================================================================
 * CANVAS PETALS ANIMATION (HIỆU ỨNG CÁNH HOA HỒNG RƠI)
 * ====================================================================
 */

(function() {
  let canvas, ctx;
  let petals = [];
  const isMobile = window.innerWidth < 768;
  const maxPetals = isMobile ? 14 : 22;
  let animationFrameId = null;
  let isScrolling = false;
  let scrollTimeout = null;
  let lastFrameTime = 0;

  // Lắng nghe cuộn trang với passive: true để điều tiết tần suất vẽ, dành trọn GPU cho cuộn mượt
  window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 120);
  }, { passive: true });

  // Tạm dừng khi chuyển tab để tiết kiệm pin và RAM
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      if (!animationFrameId && canvas) {
        animationFrameId = requestAnimationFrame(loop);
      }
    }
  });

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -20;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 1.5 + 0.8;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.tilt = Math.random() * Math.PI;
      this.tiltSpeed = Math.random() * 0.03 + 0.01;
      this.opacity = Math.random() * 0.4 + 0.5;
      
      // Color variations (Blush Rose, Soft Pink, Champagne Gold tint)
      const colors = [
        `rgba(226, 180, 184, ${this.opacity})`,
        `rgba(238, 198, 202, ${this.opacity})`,
        `rgba(247, 222, 225, ${this.opacity})`,
        `rgba(232, 215, 181, ${this.opacity * 0.8})` // Gold tint petal
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.tilt) * 1.2 + this.speedX;
      this.rotation += this.rotationSpeed;
      this.tilt += this.tiltSpeed;

      if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(Math.sin(this.tilt), 1);

      ctx.beginPath();
      // Draw organic petal curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
      
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function loop(timestamp) {
    animationFrameId = requestAnimationFrame(loop);

    // Khi đang cuộn trang nhanh, tiết chế vẽ lại để nhường GPU cho cuộn 60-120Hz mượt mà
    if (isScrolling && timestamp - lastFrameTime < 45) {
      return;
    }
    lastFrameTime = timestamp || performance.now();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const len = petals.length;
    for (let i = 0; i < len; i++) {
      petals[i].update();
      petals[i].draw();
    }
  }

  window.initPetalsAnimation = function() {
    canvas = document.getElementById('petalsCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    petals = [];
    for (let i = 0; i < maxPetals; i++) {
      petals.push(new Petal());
    }

    if (!animationFrameId) {
      loop();
    }
  };

  // Burst effect when envelope is opened (Bung hoa từ vị trí con dấu sáp)
  window.burstPetals = function() {
    if (!canvas) return;
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.42;
    for (let i = 0; i < 28; i++) {
      const extraPetal = new Petal();
      extraPetal.x = originX + (Math.random() - 0.5) * 60;
      extraPetal.y = originY + (Math.random() - 0.5) * 40;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 3;
      extraPetal.speedX = Math.cos(angle) * speed;
      extraPetal.speedY = Math.sin(angle) * speed - 4; // Bay vút lên trên
      extraPetal.spin = (Math.random() - 0.5) * 0.08;
      petals.push(extraPetal);
    }
  };
})();
