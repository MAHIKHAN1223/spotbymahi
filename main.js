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

  /* ── Tap-to-load videos ── */
  // Each video has data-src but NO src — completely frozen.
  // A transparent overlay sits on top and catches the first tap.
  // On tap: set src, remove overlay, play. Native controls take over from there.
  document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    if (!video || !video.dataset.src) return;

    const tap = document.createElement('div');
    tap.className = 'video-tap';
    wrapper.appendChild(tap);

    tap.addEventListener('click', () => {
      video.src = video.dataset.src;
      video.removeAttribute('data-src');
      tap.remove();          // native controls now fully accessible
      video.play().catch(() => {});
    });
  });

});
