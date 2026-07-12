// Background parallax on scroll
const glowWrap1 = document.getElementById('glowWrap1');
const glowWrap2 = document.getElementById('glowWrap2');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (glowWrap1 && glowWrap2 && !prefersReducedMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      glowWrap1.style.transform = `translateY(${y * 0.15}px)`;
      glowWrap2.style.transform = `translateY(${y * -0.1}px)`;
      ticking = false;
    });
  }, { passive: true });
}

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('is-hidden');
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
  }, 400);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
  menuToggle.classList.toggle('is-active');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
  });
});

// Scroll-spy active nav link
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('[data-nav]');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
);
sections.forEach((section) => spyObserver.observe(section));

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Contact form -> opens WhatsApp with prefilled message
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const text = `Olá, Rikelme! Meu nome é ${name} (${email}).\nAssunto: ${subject}\n\n${message}`;
  const whatsappLink = `https://wa.me/5517997188851?text=${encodeURIComponent(text)}`;
  window.open(whatsappLink, '_blank', 'noopener');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
