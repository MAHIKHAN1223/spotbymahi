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
  const segments = window.location.pathname.split('/').filter(Boolean);
  const isRoot = segments.length <= 1 || segments[segments.length - 1].replace('.html', '') === 'index';
  const currentBase = isRoot ? '' : segments[segments.length - 1].replace(/\.html$/, '');
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    const page = href.replace(/^(\.\.\/)?/, '').replace(/\/$/, '').replace(/\.html$/, '').replace(/^\.$/, '');
    const linkIsHome = !page;
    if ((linkIsHome && isRoot) || (!linkIsHome && page === currentBase)) {
      link.classList.add('active');
    }
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
