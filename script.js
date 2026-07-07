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
  const formSubject = document.querySelector('#form-subject');
  const requestContext = document.querySelector('#request-context');
  const selectedRequest = document.querySelector('#selected-request');
  const selectedRequestTitle = document.querySelector('#selected-request-title');
  const selectedRequestText = document.querySelector('#selected-request-text');

  const requestPresets = {
    styles: {
      'cafe': {
        title: 'Café website preview style',
        websiteType: 'Νέα ιστοσελίδα',
        businessType: 'Καφέ / snack / delivery',
        message: 'Γεια σου Alex, είδα το Café website preview style και ενδιαφέρομαι για παρόμοιο website για την επιχείρησή μου.\n\nΘέλω κάτι ζεστό, καθαρό και mobile-friendly, με ενότητες για προϊόντα, ωράριο, Instagram / Google Maps και εύκολη επικοινωνία.\n\nΣημειώσεις για την επιχείρηση:'
      },
      'restaurant': {
        title: 'Restaurant website preview style',
        websiteType: 'Νέα ιστοσελίδα',
        businessType: 'Εστιατόριο / restobar / food business',
        message: 'Γεια σου Alex, είδα το Restaurant website preview style και ενδιαφέρομαι για παρόμοιο website.\n\nΘέλω premium παρουσίαση με menu sections, φωτογραφίες, πληροφορίες κράτησης / επικοινωνίας, social links και location.\n\nΣημειώσεις για την επιχείρηση:'
      },
      'digital-menu': {
        title: 'Digital menu preview style',
        websiteType: 'Digital menu',
        businessType: 'Καφέ / εστιατόριο / restobar',
        message: 'Γεια σου Alex, είδα το Digital Menu preview style και ενδιαφέρομαι για ένα καθαρό mobile menu.\n\nΘέλω κατηγορίες, εύκολη πλοήγηση από κινητό και δυνατότητα να μπει σε QR, Instagram bio ή Google Maps.\n\nΣημειώσεις για το μενού:'
      },
      'shop': {
        title: 'Local shop website preview style',
        websiteType: 'Νέα ιστοσελίδα',
        businessType: 'Τοπικό κατάστημα / προϊόντα',
        message: 'Γεια σου Alex, είδα το Local Shop preview style και ενδιαφέρομαι για μια μοντέρνα online βιτρίνα.\n\nΘέλω να παρουσιάζονται κατηγορίες προϊόντων, φωτογραφίες, social links και ξεκάθαρο κουμπί επικοινωνίας / παραγγελίας.\n\nΣημειώσεις για το κατάστημα:'
      },
      'service-business': {
        title: 'Service business preview style',
        websiteType: 'Νέα ιστοσελίδα',
        businessType: 'Τοπική υπηρεσία / τεχνικός / barber / κλειδαράς',
        message: 'Γεια σου Alex, είδα το Service Business preview style και ενδιαφέρομαι για παρόμοια σελίδα υπηρεσιών.\n\nΘέλω να φαίνονται καθαρά οι υπηρεσίες, οι περιοχές εξυπηρέτησης, η εμπιστοσύνη και η γρήγορη επικοινωνία.\n\nΣημειώσεις για την υπηρεσία:'
      },
      'personal-brand': {
        title: 'Personal brand preview style',
        websiteType: 'Landing page',
        businessType: 'Freelancer / creator / personal brand',
        message: 'Γεια σου Alex, είδα το Personal Brand preview style και ενδιαφέρομαι για μια καθαρή προσωπική σελίδα.\n\nΘέλω να παρουσιάζει ποιος είμαι, τι προσφέρω, δουλειές / projects και τρόπο επικοινωνίας.\n\nΣημειώσεις για το brand:'
      }
    },
    packages: {
      'starter': {
        title: 'Starter Website package',
        websiteType: 'Νέα ιστοσελίδα',
        businessType: '',
        message: 'Γεια σου Alex, ενδιαφέρομαι για το Starter Website.\n\nΘέλω μια απλή, καθαρή παρουσίαση της επιχείρησής μου με βασικές πληροφορίες, mobile-first layout και εύκολη επικοινωνία.\n\nΣημειώσεις:'
      },
      'business': {
        title: 'Business Website package',
        websiteType: 'Νέα ιστοσελίδα',
        businessType: '',
        message: 'Γεια σου Alex, ενδιαφέρομαι για το Business Website.\n\nΘέλω πιο ολοκληρωμένη εικόνα για την επιχείρησή μου, με υπηρεσίες / προϊόντα, gallery, Google Maps, social links και contact form.\n\nΣημειώσεις:'
      },
      'premium-redesign': {
        title: 'Premium Redesign package',
        websiteType: 'Website redesign',
        businessType: '',
        message: 'Γεια σου Alex, ενδιαφέρομαι για Premium Redesign.\n\nΈχω ήδη παρουσία / website και θέλω να γίνει πιο μοντέρνο, premium, mobile-friendly και πιο εύκολο για τους πελάτες.\n\nΥπάρχον website ή links:'
      }
    },
    source: {
      'preview-hub': {
        title: 'Website preview styles',
        websiteType: '',
        businessType: '',
        message: 'Γεια σου Alex, είδα τα preview styles και θέλω βοήθεια για να διαλέξουμε το κατάλληλο στυλ για την επιχείρησή μου.\n\nΤύπος επιχείρησης / ιδέα:'
      }
    }
  };

  function setSelectValue(select, value) {
    if (!(select instanceof HTMLSelectElement) || !value) return;
    const option = Array.from(select.options).find((item) => item.value === value || item.textContent.trim() === value);
    if (option) select.value = option.value;
  }

  function applyRequestPreset() {
    if (!(form instanceof HTMLFormElement)) return;

    const params = new URLSearchParams(window.location.search);
    const styleKey = params.get('style');
    const packageKey = params.get('package');
    const sourceKey = params.get('source');

    const preset =
      (styleKey && requestPresets.styles[styleKey]) ||
      (packageKey && requestPresets.packages[packageKey]) ||
      (sourceKey && requestPresets.source[sourceKey]);

    if (!preset) return;

    const businessType = form.elements.namedItem('business_type');
    const websiteType = form.elements.namedItem('website_type');
    const message = form.elements.namedItem('message');

    if (businessType instanceof HTMLInputElement && !businessType.value && preset.businessType) {
      businessType.value = preset.businessType;
    }
    setSelectValue(websiteType, preset.websiteType);
    if (message instanceof HTMLTextAreaElement && !message.value) {
      message.value = preset.message;
    }

    if (requestContext instanceof HTMLInputElement) requestContext.value = preset.title;
    if (formSubject instanceof HTMLInputElement) formSubject.value = `New website request for Alex Zaxa - ${preset.title}`;
    if (selectedRequest instanceof HTMLElement) selectedRequest.hidden = false;
    if (selectedRequestTitle instanceof HTMLElement) selectedRequestTitle.textContent = preset.title;
    if (selectedRequestText instanceof HTMLElement) {
      selectedRequestText.textContent = 'Η φόρμα συμπληρώθηκε αυτόματα με βάση το preview ή πακέτο που επέλεξες. Μπορείς να αλλάξεις ό,τι θέλεις πριν το στείλεις.';
    }
  }

  if (form instanceof HTMLFormElement) {
    const submitButton = form.querySelector('.form-submit');

    if (formNext instanceof HTMLInputElement) {
      try {
        const nextUrl = new URL('thanks.html', window.location.href);
        formNext.value = nextUrl.protocol === 'http:' || nextUrl.protocol === 'https:' ? nextUrl.href : 'thanks.html';
      } catch (error) {
        formNext.value = 'thanks.html';
      }
    }

    applyRequestPreset();

    function cleanFieldValue(value, allowLineBreaks) {
      const pattern = allowLineBreaks ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
      return value.replace(pattern, '').trim();
    }

    function sanitizeFormFields() {
      Array.from(form.elements).forEach((field) => {
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
          const type = field.type.toLowerCase();
          if (type === 'checkbox' || type === 'radio' || type === 'hidden' || field.name === '_honey') return;
          field.value = cleanFieldValue(field.value, field instanceof HTMLTextAreaElement);
          if (type === 'email') field.value = field.value.toLowerCase();
        }
      });
    }

    form.addEventListener('submit', (event) => {
      sanitizeFormFields();
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
