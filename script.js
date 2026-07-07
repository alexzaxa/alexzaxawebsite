document.documentElement.classList.add('js');

(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#nav-menu');
  const year = document.querySelector('#year');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = String(new Date().getFullYear());

  function closeNav() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Άνοιγμα μενού');
    navMenu.classList.remove('is-open');
  }

  function openNav() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Κλείσιμο μενού');
    navMenu.classList.add('is-open');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    navMenu.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) closeNav();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  }

  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

  const form = document.querySelector('#request-form');
  const formNext = document.querySelector('#form-next');
  const formStatus = document.querySelector('#form-status');

  if (form instanceof HTMLFormElement) {
    const submitButton = form.querySelector('.form-submit');

    if (formNext instanceof HTMLInputElement) {
      try {
        formNext.value = new URL('thanks.html', window.location.href).href;
      } catch (error) {
        formNext.value = 'thanks.html';
      }
    }

    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        if (formStatus) formStatus.textContent = 'Συμπλήρωσε τα απαραίτητα πεδία πριν την αποστολή.';
        return;
      }

      if (form.dataset.submitted === 'true') {
        event.preventDefault();
        return;
      }

      form.dataset.submitted = 'true';
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true;
        submitButton.textContent = submitButton.dataset.loadingText || 'Αποστολή...';
      }
      if (formStatus) formStatus.textContent = 'Το αίτημα αποστέλλεται με ασφάλεια μέσω της υπηρεσίας φόρμας.';
    });
  }
})();
