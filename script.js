// Smooth scrolling
const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 1.2,
  lerp: 0.08,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Current nav link
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
});

gsap.registerPlugin(ScrollTrigger);

// Shared helpers
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 26 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      }
    );
  });

  gsap.utils.toArray('.reveal-up').forEach((el, i) => {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 38 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.05,
        delay: i * 0.03,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 86%' }
      }
    );
  });

  gsap.utils.toArray('.reveal-blur').forEach(el => {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 18, filter: 'blur(12px)' },
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      }
    );
  });

  gsap.utils.toArray('.reveal-card').forEach((el, i) => {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 24, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  gsap.utils.toArray('.scale-in').forEach(el => {
    gsap.fromTo(el,
      { autoAlpha: 0, scale: 1.08 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      }
    );
  });

  gsap.utils.toArray('.parallax').forEach(el => {
    gsap.to(el, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: 1.2,
        start: 'top bottom',
        end: 'bottom top'
      }
    });
  });

  const heroTl = gsap.timeline();
  heroTl
    .from('.hero-title', { y: 36, autoAlpha: 0, duration: 1.1, ease: 'power4.out' })
    .from('.hero-copy', { y: 24, autoAlpha: 0, duration: 0.95, ease: 'power3.out' }, '-=0.75')
    .from('.hero-actions > *', { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.85, ease: 'power3.out' }, '-=0.62')
    .from('.hero-visual', { scale: 0.97, autoAlpha: 0, duration: 1.2, ease: 'power3.out' }, '-=1');

  gsap.to('.hero-title', {
    scale: 0.96,
    yPercent: -8,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
  });
  gsap.to('.hero-visual', {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
  });

  // Sticky process storytelling
  document.querySelectorAll('.process-copy').forEach(copy => {
    const steps = copy.querySelectorAll('.process-step');
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        { autoAlpha: 0.4, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            end: 'bottom 55%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    });
  });

  // Timeline draw feel
  document.querySelectorAll('.timeline').forEach(tl => {
    gsap.fromTo(tl, { autoAlpha: 0 }, {
      autoAlpha: 1,
      duration: 0.8,
      scrollTrigger: { trigger: tl, start: 'top 80%' }
    });
  });

  // Count-up metrics
  document.querySelectorAll('[data-count]').forEach(el => {
    const endValue = Number(el.dataset.count);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: () => { el.textContent = Math.round(obj.val); }
    });
  });
}

// Tiny form handler demo
const form = document.querySelector('form[data-demo-form]');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.textContent = 'Message queued';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      form.reset();
    }, 1800);
  });
}
