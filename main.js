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

  /* ── Video grid ── */
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  if (!videoWrappers.length) return;

  // Inject play-button overlay on every card
  videoWrappers.forEach(wrapper => {
    const btn = document.createElement('div');
    btn.className = 'play-overlay';
    btn.innerHTML = `
      <div class="play-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
          <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white"/>
        </svg>
      </div>`;
    wrapper.appendChild(btn);
  });

  /* ── Modal lightbox ── */
  const modal    = document.getElementById('videoModal');
  const modalVid = document.getElementById('modalVideo');
  const closeBtn = document.getElementById('modalClose');
  if (!modal || !modalVid) return;

  function openModal(src) {
    modalVid.src = src;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalVid.play().catch(() => {}), 80);
  }

  function closeModal() {
    modalVid.pause();
    modalVid.removeAttribute('src');
    modalVid.load();
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Tap any video card → open modal
  document.querySelectorAll('.video-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const video = card.querySelector('video');
      const src = video.dataset.src || video.getAttribute('src');
      if (src) openModal(src);
    });
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Tap backdrop to close
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Escape key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Swipe down to close (mobile)
  let touchStartY = 0;
  modalVid.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  modalVid.addEventListener('touchend', e => {
    if (e.changedTouches[0].clientY - touchStartY > 80) closeModal();
  }, { passive: true });

});
