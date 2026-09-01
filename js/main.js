/**
 * NORTH & KEY — Premium Editorial Experience
 * Modern Javascript Engine: Lenis, GSAP, Custom Cursor, Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCustomCursor();
  initHeaderScroll();
  initMenuOverlay();
  initHeroAnimations();
  initScrollReveals();
  initTestimonialSlider();
  initCounters();
  initFirstScrollAnimation();
  initStatementReveal();
  initHorizontalPropertyScroll();
  initPinnedStorySection();
  initNewsletter();
});

/* --- 1. Lenis Smooth Scrolling --- */
let lenis;
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize Lenis with GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }
}

/* --- 2. Custom Magnetic / View Cursor --- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      cursor.classList.add('active');
      isMoving = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    isMoving = false;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Dynamic Cursor States
  const interactiveTargets = document.querySelectorAll('[data-cursor]');
  interactiveTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const mode = el.getAttribute('data-cursor');
      if (mode === 'view') {
        cursor.classList.add('cursor-view-mode');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-view-mode');
    });
  });
}

/* --- 3. Sticky Header Scroll Transition --- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- 4. Fullscreen Menu Overlay --- */
function initMenuOverlay() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menuOverlay = document.querySelector('.menu-overlay');
  const overlayLinks = document.querySelectorAll('.menu-overlay-link');

  if (!toggleBtn || !menuOverlay) return;

  function toggleMenu() {
    const isOpen = menuOverlay.classList.contains('active');
    if (isOpen) {
      menuOverlay.classList.remove('active');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    } else {
      menuOverlay.classList.add('active');
      toggleBtn.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  overlayLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (menuOverlay.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
      toggleMenu();
    }
  });
}

/* --- 5. Hero Cinematic Reveal Animation --- */
function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const heroContainer = document.querySelector('.hero-bg-container');
  const heroImage = document.querySelector('.hero-bg-image');
  const headingLines = document.querySelectorAll('.hero-line-inner');
  const subText = document.querySelector('.hero-sub-text');
  const heroActions = document.querySelector('.hero-actions');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const header = document.querySelector('.site-header');

  // Accessibility: respect user preference for reduced motion
  if (prefersReducedMotion) {
    if (header) gsap.set(header, { opacity: 1, y: 0 });
    if (heroContainer) gsap.set(heroContainer, { clipPath: 'inset(0% 0% 0% 0%)' });
    if (heroImage) gsap.set(heroImage, { scale: 1 });
    if (headingLines.length) gsap.set(headingLines, { y: 0, opacity: 1 });
    if (subText) gsap.set(subText, { y: 0, opacity: 1 });
    if (heroActions) gsap.set(heroActions, { y: 0, opacity: 1 });
    if (scrollIndicator) gsap.set(scrollIndicator, { y: 0, opacity: 1 });
    return;
  }

  // 1. Initial State: Keep hero image slightly zoomed (scale: 1.08) and masked
  if (header) gsap.set(header, { opacity: 0, y: -15 });
  if (heroContainer) gsap.set(heroContainer, { clipPath: 'inset(10% 8% 8% 8%)' });
  if (heroImage) gsap.set(heroImage, { scale: 1.08 });
  if (headingLines.length) gsap.set(headingLines, { y: 60, opacity: 0 });
  if (subText) gsap.set(subText, { y: 35, opacity: 0 });
  if (heroActions) gsap.set(heroActions, { y: 20, opacity: 0 });
  if (scrollIndicator) gsap.set(scrollIndicator, { opacity: 0, y: 15 });

  // Video Hero Elements
  const heroCinematicTitle = document.querySelector('.hero-cinematic-title');
  const heroEmailForm = document.querySelector('.hero-email-form');
  const heroGlassCards = document.querySelectorAll('.hero-glass-card');

  if (heroCinematicTitle) gsap.set(heroCinematicTitle, { y: 40, opacity: 0 });
  if (heroEmailForm) gsap.set(heroEmailForm, { y: 24, opacity: 0 });
  if (heroGlassCards.length) gsap.set(heroGlassCards, { y: 32, opacity: 0 });

  const heroTl = gsap.timeline({
    delay: 0.15
  });

  // Soft navigation header fade in
  if (header) {
    heroTl.to(header, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out'
    });
  }

  // 1 & 2. Reveal hero image using smooth clip-path and animate scale from 1.08 to 1.0 over ~1.4s
  if (heroContainer) {
    heroTl.to(heroContainer, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.4,
      ease: 'power3.inOut'
    }, '-=0.8');
  }

  if (heroImage) {
    heroTl.to(heroImage, {
      scale: 1.0,
      duration: 1.4,
      ease: 'power2.out'
    }, '<');
  }

  // 3, 4 & 5. Animate each heading line from y: 60px, opacity: 0 to y: 0, opacity: 1, staggered by 0.1s
  if (headingLines.length) {
    heroTl.to(headingLines, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.8');
  }

  // 6. Fade/slide the supporting paragraph upward after the heading
  if (subText) {
    heroTl.to(subText, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
  }

  // 7. Reveal the CTA last with a subtle upward movement
  if (heroActions) {
    heroTl.to(heroActions, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.4');
  }

  // Video Hero Elements Sequence
  if (heroCinematicTitle) {
    heroTl.to(heroCinematicTitle, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'power3.out'
    }, '-=0.6');
  }

  if (heroEmailForm) {
    heroTl.to(heroEmailForm, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
  }

  if (heroGlassCards.length) {
    heroTl.to(heroGlassCards, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.14,
      ease: 'power3.out'
    }, '-=0.6');
  }

  // 8. Add a small delayed fade-in for the scroll indicator
  if (scrollIndicator) {
    heroTl.to(scrollIndicator, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.2');
  }
}

/* --- 6. ScrollTrigger Reveals for Elements --- */
function initScrollReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Fade Up Elements
  const revealElements = document.querySelectorAll('.editorial-reveal');
  revealElements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Staggered Property Blocks
  const propertyBlocks = document.querySelectorAll('.property-block');
  propertyBlocks.forEach((block) => {
    gsap.fromTo(
      block,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* --- 7. First Scroll Continuous Cinematic Animation & Section 2 Reveal --- */
function initFirstScrollAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Scroll Behavior (Parallax, Content Drift & Fade connected directly via scrub)
  const heroSection = document.querySelector('.hero-section');
  const heroMedia = document.querySelector('.hero-bg-video') || document.querySelector('.hero-bg-image');
  const heroContent = document.querySelector('.hero-content');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (heroSection) {
    // Subtle parallax on hero background video/image (yPercent: -8)
    if (heroMedia) {
      gsap.to(heroMedia, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    // Hero content slowly moves upward and slightly fades out (smooth & continuous)
    if (heroContent) {
      gsap.to(heroContent, {
        y: -90,
        opacity: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Scroll indicator gracefully fades out early
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '35% top',
          scrub: 0.8,
        },
      });
    }
  }

  // 2. Next Section (Introduction) Continuous Scrubbed Reveal
  const introSection = document.querySelector('#introduction');
  if (!introSection) return;

  const introHeading = introSection.querySelector('.intro-heading');
  const introEyebrow = introSection.querySelector('.intro-eyebrow');
  const introImageContainer = introSection.querySelector('.intro-image-container');
  const introImage = introSection.querySelector('.intro-image');
  const introTexts = introSection.querySelectorAll('.intro-text');
  const introCta = introSection.querySelector('.intro-cta');

  // Set initial states for Section 2 elements
  if (introHeading) gsap.set(introHeading, { opacity: 0, y: 60 });
  if (introEyebrow) gsap.set(introEyebrow, { opacity: 0, y: 35 });
  if (introImageContainer) gsap.set(introImageContainer, { clipPath: 'inset(18% 0% 18% 0%)' });
  if (introImage) gsap.set(introImage, { scale: 1.05 });
  if (introTexts.length) gsap.set(introTexts, { opacity: 0, y: 45 });
  if (introCta) gsap.set(introCta, { opacity: 0, y: 25 });

  // Coordinated timeline scrubbed to scroll
  const introTl = gsap.timeline({
    scrollTrigger: {
      trigger: introSection,
      start: 'top 88%',
      end: 'top 28%',
      scrub: 1.2, // Connects directly to user scroll position
    },
  });

  // Staggered text movement & heading: opacity: 0 -> 1, y: 60px -> 0
  if (introEyebrow) {
    introTl.to(introEyebrow, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
    }, 0);
  }

  if (introHeading) {
    introTl.to(introHeading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.08);
  }

  // Reveal the section image using smooth clip-path mask animation
  if (introImageContainer) {
    introTl.to(introImageContainer, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.0,
      ease: 'power2.inOut',
    }, 0.12);
  }

  // Subtle image scale: scale(1.05) -> scale(1)
  if (introImage) {
    introTl.to(introImage, {
      scale: 1.0,
      duration: 1.0,
      ease: 'power2.out',
    }, 0.12);
  }

  // Staggered animation for multiple text elements
  if (introTexts.length) {
    introTl.to(introTexts, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
    }, 0.22);
  }

  if (introCta) {
    introTl.to(introCta, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.42);
  }

  // Final CTA Parallax
  const ctaImg = document.querySelector('.final-cta-img');
  if (ctaImg) {
    gsap.to(ctaImg, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.final-cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

/* --- 8. Statement Section Word Opacity Scroll Reveal --- */
function initStatementReveal() {
  const statementTitle = document.querySelector('.statement-title');
  if (!statementTitle) return;

  const words = statementTitle.querySelectorAll('.statement-word');
  if (words.length === 0) return;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.to(words, {
      opacity: 1,
      color: '#151515',
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.statement-section',
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 0.6,
      },
    });
  } else {
    // Fallback Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((w, i) => {
              setTimeout(() => {
                w.classList.add('in-view');
              }, i * 70);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(statementTitle);
  }
}

/* --- 9. Testimonial Slider --- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slides.length <= 1) return;

  let currentIdx = 0;
  let timer;

  function showSlide(index) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === index);
    });
    currentIdx = index;
  }

  function nextSlide() {
    let next = (currentIdx + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentIdx - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 7500);
  }

  resetTimer();
}

/* --- 10. Animated Statistics Counters --- */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length === 0) return;

  let animated = false;

  function animateCounters() {
    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current + suffix;
      }, 35);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.4 }
  );

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);
}

/* --- 11. Newsletter Feedback --- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        input.value = '';
        input.placeholder = 'Thank you for subscribing.';
        setTimeout(() => {
          input.placeholder = 'Enter your email address';
        }, 4000);
      }
    });
  });
}



/* --- 13. Horizontal Property Showcase — Pinned Vertical-to-Horizontal Scroll --- */
function initHorizontalPropertyScroll() {
  const section = document.querySelector('.horizontal-gallery-section');
  const track = document.querySelector('.horizontal-track');
  const counter = document.querySelector('.horizontal-counter-badge');
  if (!section || !track) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || window.innerWidth < 768) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

  const horizontalTween = gsap.to(track, {
    x: getScrollAmount,
    ease: 'none',
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${Math.max(window.innerHeight * 2, track.scrollWidth - window.innerWidth)}`,
    pin: true,
    animation: horizontalTween,
    scrub: 1.2,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      if (counter) {
        const total = 4;
        const current = Math.min(total, Math.max(1, Math.floor(self.progress * total) + 1));
        counter.textContent = `0${current} / 0${total} Collection`;
      }
    }
  });
}

/* --- 14. Pinned Storytelling Section — Ultra-Smooth Scrubbed Cross-fade --- */
function initPinnedStorySection() {
  const section = document.querySelector('.pinned-story-section');
  const slides = document.querySelectorAll('.story-visual-slide');
  const stepBlocks = document.querySelectorAll('.story-step-block');
  if (!section || !slides.length || !stepBlocks.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || window.innerWidth < 1024) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Initial setup: Slide 0 is full opacity, others 0
  gsap.set(slides, { opacity: 0, scale: 1.04 });
  gsap.set(slides[0], { opacity: 1, scale: 1 });

  gsap.set(stepBlocks, { opacity: 0.25 });
  gsap.set(stepBlocks[0], { opacity: 1 });
  stepBlocks[0].classList.add('active');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=2000', // Snappy, comfortable distance without dragging
      pin: true,
      anticipatePin: 1,
      scrub: 0.4, // Instantaneous, buttery smooth scroll response
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        let activeIdx = 0;
        if (p < 0.25) activeIdx = 0;
        else if (p < 0.55) activeIdx = 1;
        else if (p < 0.82) activeIdx = 2;
        else activeIdx = 3;

        stepBlocks.forEach((b, i) => {
          if (i === activeIdx) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      }
    }
  });

  // Step 0 -> Step 1
  tl.to(slides[0], { opacity: 0, scale: 1.03, duration: 1, ease: 'none' }, 't1')
    .to(stepBlocks[0], { opacity: 0.25, duration: 1, ease: 'none' }, 't1')
    .to(slides[1], { opacity: 1, scale: 1, duration: 1, ease: 'none' }, 't1')
    .to(stepBlocks[1], { opacity: 1, duration: 1, ease: 'none' }, 't1')
    .to({}, { duration: 0.4 });

  // Step 1 -> Step 2
  tl.to(slides[1], { opacity: 0, scale: 1.03, duration: 1, ease: 'none' }, 't2')
    .to(stepBlocks[1], { opacity: 0.25, duration: 1, ease: 'none' }, 't2')
    .to(slides[2], { opacity: 1, scale: 1, duration: 1, ease: 'none' }, 't2')
    .to(stepBlocks[2], { opacity: 1, duration: 1, ease: 'none' }, 't2')
    .to({}, { duration: 0.4 });

  // Step 2 -> Step 3
  tl.to(slides[2], { opacity: 0, scale: 1.03, duration: 1, ease: 'none' }, 't3')
    .to(stepBlocks[2], { opacity: 0.25, duration: 1, ease: 'none' }, 't3')
    .to(slides[3], { opacity: 1, scale: 1, duration: 1, ease: 'none' }, 't3')
    .to(stepBlocks[3], { opacity: 1, duration: 1, ease: 'none' }, 't3')
    .to({}, { duration: 0.3 });
}
