document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav ── */
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

  /* ── Active nav link ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });

  /* ── Hero parallax ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.classList.add('loaded');
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }

  /* ── Video thumbnails — seek to first frame after metadata loads ── */
  document.querySelectorAll('.video-wrapper video').forEach(video => {
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0.5;
    });
  });

});
