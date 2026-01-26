// Small JS for client-side improvements + GSAP animations
document.addEventListener('DOMContentLoaded', function () {
  // Form validation (works with Formspree or any POST target)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill in all fields before sending.');
      }
    });
  }

  // Navbar scroll state (adds class when scrolled)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) navbar.classList.add('show-nav'); else navbar.classList.remove('show-nav');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  // Chapters overlay toggle and navigation
  const chaptersOverlay = document.getElementById('chaptersOverlay');
  const openChapters = document.getElementById('openChapters');
  const closeChapters = document.getElementById('closeChapters');
  function openOverlay() {
    if (!chaptersOverlay) return;
    chaptersOverlay.classList.add('open');
    chaptersOverlay.setAttribute('aria-hidden', 'false');
    // reveal navbar when overlay opens for context
    if (navbar) navbar.classList.add('show-nav');
    // trap focus briefly on close button
    setTimeout(() => closeChapters?.focus(), 80);
  }
  function closeOverlay() {
    if (!chaptersOverlay) return;
    chaptersOverlay.classList.remove('open');
    chaptersOverlay.setAttribute('aria-hidden', 'true');
    // return focus to open button
    setTimeout(() => openChapters?.focus(), 80);
  }
  if (openChapters) openChapters.addEventListener('click', openOverlay);
  if (closeChapters) closeChapters.addEventListener('click', closeOverlay);

  // Chapter links smooth scroll
  document.querySelectorAll('.chapters-list .chapter-link').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      const target = li?.getAttribute('data-target');
      if (target) {
        closeOverlay();
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({behavior:'smooth', block:'start'});
        } else {
          // fallback: navigate to home with hash (index page)
          const base = window.location.pathname.split('/').pop() || 'index.html';
          if (!base || base === '' || base === 'index.html') {
            // nothing to do
          } else {
            window.location.href = '/index.html' + target;
          }
        }
      }
    });
  });

  // Close overlay with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (chaptersOverlay && chaptersOverlay.classList.contains('open')) closeOverlay();
    }
  });

  // Scroll progress indicator: update thumb height/position
  const scrollIndicator = document.getElementById('scrollIndicator');
  function updateScrollIndicator() {
    if (!scrollIndicator) return;
    const doc = document.documentElement;
    const scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
    const track = scrollIndicator.querySelector('.scroll-track');
    const thumb = scrollIndicator.querySelector('.scroll-thumb');
    if (!track || !thumb) return;
    // set thumb height proportional to viewport ratio (min 6%, max 36%)
    const viewRatio = Math.max(0.06, Math.min(0.36, (doc.clientHeight / doc.scrollHeight)));
    const thumbHeight = Math.max(6, Math.round(viewRatio * track.clientHeight));
    thumb.style.height = thumbHeight + 'px';
    const maxTop = track.clientHeight - thumbHeight;
    thumb.style.transform = 'translateY(' + Math.round(pct * maxTop) + 'px)';
  }
  window.addEventListener('scroll', updateScrollIndicator, { passive: true });
  window.addEventListener('resize', updateScrollIndicator);
  // initialize
  updateScrollIndicator();

  // Language buttons: visually toggle active state (no backend language change)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.add('muted'));
      btn.classList.remove('muted');
      // store preference locally
      try { localStorage.setItem('komando_lang', btn.dataset.lang); } catch(e){}
    });
  });
  // restore saved language
  try { const saved = localStorage.getItem('komando_lang'); if (saved) { const b = document.querySelector('.lang-btn[data-lang="'+saved+'"]'); if (b) { document.querySelectorAll('.lang-btn').forEach(x=>x.classList.add('muted')); b.classList.remove('muted'); } } } catch(e){}

  // Define animations in a start function so we can call it after preloader finishes
  function startAnimations() {
    try {
      if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero entrance timeline (play after preloader)
    gsap.from('.hero', { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' });

        // Features stagger (only run if the features container/targets exist)
        if (document.querySelector('#features') && document.querySelector('.feature')) {
          gsap.from('.feature', {
            y: 24,
            opacity: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#features',
              start: 'top 80%'
            }
          });
        }

        // Small reveal for cards on About (only if any .card elements exist)
        const cardEls = gsap.utils.toArray('.card');
        if (cardEls.length) {
          cardEls.forEach((card) => {
            gsap.from(card, {
              y: 16,
              opacity: 0,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%'
              }
            });
          });
        }

        // Simple gallery click handler: open image in modal-like overlay
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length) {
          galleryItems.forEach(a => {
            a.addEventListener('click', (e) => {
              // let default open in new tab if user holds modifier; otherwise show modal
              e.preventDefault();
              const src = a.getAttribute('href') || a.querySelector('img')?.src;
              if (!src) return;
              showImageOverlay(src);
            });
          });
        }

        // Scroll-triggered animations per chapter
        gsap.utils.toArray('.chapter').forEach((section, i) => {
          const content = section.querySelector('.content') || section;
            gsap.from(content, {
              y: 48,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.05,
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                end: 'top 40%',
                toggleActions: 'play none none reverse'
              }
            });

            // subtle parallax: move content slightly with a faster scrub
            gsap.to(content, {
              y: -14,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.4
              }
            });
        });

        // Horizontal gallery on the homepage
        gsap.utils.toArray('.horizontal-gallery').forEach(gallery => {
          const track = gallery.querySelector('.gallery-track');
          if (!track) return;

          // Only apply horizontal scroll on wider screens
          const mm = gsap.matchMedia();
          mm.add("(min-width: 900px)", () => {
            const tween = gsap.to(track, {
              x: () => -(track.scrollWidth - gallery.offsetWidth) + "px",
              ease: "none",
              scrollTrigger: {
                trigger: gallery,
                start: "top top",
                end: () => "+=" + (track.scrollWidth - gallery.offsetWidth),
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
              }
            });
            return () => tween.kill();
          });
        });

        // Full-page horizontal scroller for the Events page
        gsap.utils.toArray('.fullpage-scroller').forEach(gallery => {
          const track = gallery.querySelector('.track');
          if (!track) return;
        
          const mm = gsap.matchMedia();
        
          mm.add('(min-width: 900px)', () => {
            // Animate the track horizontally
            const tween = gsap.to(track, {
              x: () => -(track.scrollWidth - document.documentElement.clientWidth) + "px",
              ease: "none",
              scrollTrigger: {
                trigger: gallery,
                start: "top top",
                end: () => "+=" + (track.scrollWidth - document.documentElement.clientWidth),
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1
              }
            });
        
            return () => {
              if (tween) tween.kill();
            };
          });
        });
      }
    } catch (err) {
      // GSAP not available or error — fail silently
    }
  }

  // When DOM is ready, prepare and run the preloader/animations. Use a short timeout
  // fallback so the preloader doesn't block long waits for large images.
  function onReadyForPreload() {
    const pre = document.querySelector('.preloader');
    const logo = document.querySelector('.preloader .logo');
    // create splash-text element dynamically if not present
    let splash = pre?.querySelector('.splash-text');
    if (pre && !splash) {
      splash = document.createElement('div');
      splash.className = 'splash-text';
      splash.textContent = "KOMANDO'45";
      pre.appendChild(splash);
    }

  // Only show the preloader once per browser session.
    const seen = sessionStorage.getItem('komando45_seen');
  if (!seen && pre && typeof gsap !== 'undefined') {
  const tl = gsap.timeline({defaults:{ease:'power2.out'}});

  // Mark the document as preloading so CSS can lock scrolling and hide underlying content
  try { document.documentElement.classList.add('preload-active'); } catch (e) {}

      // Splash animation: make the splash text appear, scale and move to the right
      try {
        tl.set(splash, {autoAlpha:1, x: '-50%', y: '-50%', scale:1});
        // decorative preload background layer (subtle parallax)
        let preloadBg = pre.querySelector('.preload-bg');
        if (!preloadBg) {
          preloadBg = document.createElement('div');
          preloadBg.className = 'preload-bg';
          pre.appendChild(preloadBg);
        }
        // animate background subtly
        tl.fromTo(preloadBg, {x: '-8%'}, {x: '8%', duration: 2.8, ease: 'sine.inOut'}, 0);
        // animate from slightly left to far right while scaling up to almost fill screen
        const moveX = Math.max(window.innerWidth * 0.28, 300);
        tl.fromTo(splash, {x: '-80%', autoAlpha:0}, {x: moveX, autoAlpha:1, scale:3.2, duration:1.8, ease: 'power3.out'});
        // quick hold then fade logo up while sliding preloader away
        tl.to(logo, { y: -20, opacity: 0, duration: 0.45 }, '+=0.2');
        tl.to(pre, { y: '-100%', duration: 0.75, delay: 0.06 }, '+=0');
        tl.set(pre, { display: 'none' });
      } catch (err) {
        // fallback: simple hide
        tl.to(pre, { opacity: 0, duration: 0.6 }).set(pre, { display: 'none' });
      }

      // allow the user to click the splash to skip the animation early
      try {
        splash.addEventListener('click', function () {
          try { sessionStorage.setItem('komando45_seen', '1'); } catch (e) {}
          if (tl && typeof tl.progress === 'function') {
            tl.progress(1);
          }
          if (pre) pre.style.display = 'none';
          try { document.documentElement.classList.remove('preload-active'); } catch(e){}
          startAnimations();
        });
      } catch (e) {}

      tl.call(() => {
        try { sessionStorage.setItem('komando45_seen', '1'); } catch(e){}
        // hide preloader and re-enable scrolling
        if (pre) pre.style.display = 'none';
        try { document.documentElement.classList.remove('preload-active'); } catch(e){}
        startAnimations();
      });
    } else {
      if (pre) pre.style.display = 'none';
      try { document.documentElement.classList.remove('preload-active'); } catch(e){}
      startAnimations();
    }
  }

  // Run when DOMContentLoaded, but also set a max timeout so site doesn't wait too long
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // small timeout to allow quick paints
    setTimeout(onReadyForPreload, 120);
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(onReadyForPreload, 120));
  }
});

// Image overlay helper
function showImageOverlay(src) {
  let overlay = document.getElementById('image-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'image-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = 0;
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 10000;
    overlay.addEventListener('click', () => overlay.remove());
    const img = document.createElement('img');
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }
  overlay.querySelector('img').src = src;
  overlay.style.display = 'flex';
}
