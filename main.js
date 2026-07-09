document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });

  // Hero parallax
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.classList.add('loaded');
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }

  // Lazy-load + autoplay portrait videos when in viewport, pause when out
  const videos = document.querySelectorAll('.video-wrapper video[data-src]');

  if (!videos.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // Load source on first sight
          if (video.dataset.src) {
            video.src = video.dataset.src;
            video.removeAttribute('data-src');
          }
          // Attempt autoplay (muted is set in HTML so browsers allow it)
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    videos.forEach(v => observer.observe(v));
  } else {
    // Fallback for older browsers
    videos.forEach(v => {
      if (v.dataset.src) {
        v.src = v.dataset.src;
        v.removeAttribute('data-src');
      }
    });
  }

});
