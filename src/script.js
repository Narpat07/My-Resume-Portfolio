document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  const progressText = document.getElementById('progress');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.querySelector('.navbar');
  const canvas = document.getElementById('animatedBg');
  const ctx = canvas.getContext('2d');
  let progress = 0;

  function updateProgress() {
    progress += Math.random() * 30;
    if (progress > 90) progress = 90;
    progressText.textContent = Math.floor(progress);
  }

  const progressInterval = setInterval(updateProgress, 100);

  setTimeout(() => {
    clearInterval(progressInterval);
    progress = 100;
    progressText.textContent = '100';
    loader.classList.add('hidden');
  }, 2000);

  // Animated Background Setup
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 5;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 150 + 50;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.color = ['#10b981', '#059669', '#1f2937'][Math.floor(Math.random() * 3)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x - this.size / 2 > canvas.width) this.x = -this.size / 2;
      if (this.x + this.size / 2 < 0) this.x = canvas.width + this.size / 2;
      if (this.y - this.size / 2 > canvas.height) this.y = -this.size / 2;
      if (this.y + this.size / 2 < 0) this.y = canvas.height + this.size / 2;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
