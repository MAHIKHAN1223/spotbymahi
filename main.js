document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
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
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hero background subtle parallax
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.classList.add('loaded');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
    }, { passive: true });
  }

  // Lazy video loading via IntersectionObserver
  const videoCards = document.querySelectorAll('.video-wrapper video[data-src]');
  if ('IntersectionObserver' in window && videoCards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const src = video.dataset.src;
          if (src) {
            video.src = src;
            video.removeAttribute('data-src');
          }
          observer.unobserve(video);
        }
      });
    }, { rootMargin: '200px' });

    videoCards.forEach(video => observer.observe(video));
  } else {
    // Fallback: set src directly
    videoCards.forEach(video => {
      if (video.dataset.src) {
        video.src = video.dataset.src;
        video.removeAttribute('data-src');
      }
    });
  }

  // Pause other videos when one plays
  document.querySelectorAll('.video-wrapper video').forEach(video => {
    video.addEventListener('play', () => {
      document.querySelectorAll('.video-wrapper video').forEach(other => {
        if (other !== video && !other.paused) {
          other.pause();
        }
      });
    });
  });

});
