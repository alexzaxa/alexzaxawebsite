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
      if (event.target instanceof HTMLAnchorElement) closeNav();
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
  const selectedPackageInput = document.querySelector('#selected-package');
  const selectedRequest = document.querySelector('#selected-request');
  const selectedRequestTitle = document.querySelector('#selected-request-title');
  const selectedRequestText = document.querySelector('#selected-request-text');

  const packageCards = Array.from(document.querySelectorAll('[data-package-card]'));
  const packageButtons = Array.from(document.querySelectorAll('[data-package-button]'));
  const pricingPanel = document.querySelector('#pricing-panel');
  const pricingPlaceholder = document.querySelector('#pricing-placeholder');
  const pricingContent = document.querySelector('#pricing-content');
  const pricingName = document.querySelector('#pricing-name');
  const pricingPrice = document.querySelector('#pricing-price');
  const pricingDescription = document.querySelector('#pricing-description');
  const pricingDelivery = document.querySelector('#pricing-delivery');
  const pricingGoodFor = document.querySelector('#pricing-good-for');
  const pricingIncludes = document.querySelector('#pricing-includes');
  const pricingExtras = document.querySelector('#pricing-extras');
  const pricingCta = document.querySelector('#pricing-cta');

  const pricingPackages = {
    starter: {
      name: 'Starter Website',
      label: 'Starter Website — 99€',
      price: 'Τιμή: 99€',
      selectValue: 'Starter Website — 99€',
      websiteType: 'Νέα ιστοσελίδα',
      description: 'Ιδανικό για επιχείρηση που θέλει γρήγορη, καθαρή και επαγγελματική online παρουσία χωρίς πολλές περίπλοκες ενότητες.',
      includes: [
        'One-page website',
        'Mobile-first σχεδιασμός',
        'Βασικές πληροφορίες επιχείρησης',
        'Υπηρεσίες ή προϊόντα',
        'Email / Instagram / χάρτης',
        'Βασικό SEO setup',
        'Καθαρή και γρήγορη σελίδα',
        'Βασική καθοδήγηση για hosting'
      ],
      delivery: 'Παράδοση: 2–5 ημέρες, ανάλογα με το υλικό',
      goodFor: 'Κατάλληλο για: καφέ, μικρά μαγαζιά, υπηρεσίες, προσωπικές σελίδες, απλή παρουσίαση',
      cta: 'Θέλω Starter Website — 99€',
      message: 'Γεια σου Alex, ενδιαφέρομαι για το Starter Website — 99€.\n\nΘέλω μια απλή, καθαρή παρουσίαση της επιχείρησής μου με βασικές πληροφορίες, mobile-first layout και εύκολη επικοινωνία.\n\nΣημειώσεις:'
    },
    business: {
      name: 'Business Website',
      label: 'Business Website — 199€',
      price: 'Τιμή: 199€',
      selectValue: 'Business Website — 199€',
      websiteType: 'Νέα ιστοσελίδα',
      description: 'Ιδανικό για επιχείρηση που θέλει πιο γεμάτη, σοβαρή και ολοκληρωμένη παρουσίαση με περισσότερες ενότητες.',
      includes: [
        'Πολυσέλιδη ή πιο αναλυτική δομή',
        'Αρχική σελίδα',
        'Υπηρεσίες / προϊόντα / menu',
        'Gallery section',
        'Contact form',
        'Google Maps & social links',
        'CTA sections',
        'Βελτιωμένη mobile εμπειρία',
        'Βασικό SEO setup',
        'Δομή έτοιμη για Google Maps / Instagram traffic',
        'Καθοδήγηση για domain και hosting'
      ],
      delivery: 'Παράδοση: 4–8 ημέρες, ανάλογα με το υλικό',
      goodFor: 'Κατάλληλο για: καφέ, εστιατόρια, καταστήματα, κομμωτήρια, κλειδαράδες, service businesses',
      cta: 'Θέλω Business Website — 199€',
      message: 'Γεια σου Alex, ενδιαφέρομαι για το Business Website — 199€.\n\nΘέλω πιο ολοκληρωμένη εικόνα για την επιχείρησή μου, με υπηρεσίες / προϊόντα, gallery, Google Maps, social links και contact form.\n\nΣημειώσεις:'
    },
    'premium-redesign': {
      name: 'Premium Redesign',
      label: 'Premium Redesign — 349€',
      price: 'Τιμή: 349€',
      selectValue: 'Premium Redesign — 349€',
      websiteType: 'Website redesign',
      description: 'Ιδανικό για επιχείρηση που έχει ήδη website ή θέλει πιο premium αποτέλεσμα με καλύτερη αισθητική, UX και εμπιστοσύνη.',
      includes: [
        'Ανασχεδιασμός υπάρχουσας σελίδας ή premium νέο design',
        'Καλύτερη αρχική σελίδα',
        'Premium αισθητική',
        'Καλύτερη εμπειρία σε κινητά',
        'Πιο δυνατά CTA sections',
        'Βελτίωση δομής και περιεχομένου',
        'Βελτίωση ταχύτητας όπου γίνεται',
        'Βασικό SEO cleanup',
        'Contact form',
        'Social / Google Maps integration',
        'Hosting guidance',
        'Τελικό αποτέλεσμα έτοιμο για παρουσίαση σε πελάτες'
      ],
      delivery: 'Παράδοση: 7–14 ημέρες, ανάλογα με το project',
      goodFor: 'Κατάλληλο για: επιχειρήσεις που θέλουν να φαίνονται πιο σοβαρές, μοντέρνες και αξιόπιστες',
      cta: 'Θέλω Premium Redesign — 349€',
      message: 'Γεια σου Alex, ενδιαφέρομαι για Premium Redesign — 349€.\n\nΈχω ήδη παρουσία / website και θέλω να γίνει πιο μοντέρνο, premium, mobile-friendly και πιο εύκολο για τους πελάτες.\n\nΥπάρχον website ή links:'
    }
  };

  const optionalExtras = [
    'Extra page: +30€ έως +60€',
    'Extra language: +50€ έως +100€',
    'More advanced animations: +40€ έως +100€',
    'Digital menu setup: +50€ έως +150€',
    'Basic logo cleanup / simple visual identity: +30€ έως +80€',
    'Copywriting help: +40€ έως +120€',
    'Image/gallery organization: +30€ έως +80€',
    'Monthly updates/support: από 20€/μήνα',
    'Domain setup guidance: included as guidance, domain cost paid separately by client',
    'Hosting setup guidance: included, hosting may be free depending on platform'
  ];

  const requestPresets = {
    styles: {
      cafe: {
        title: 'Café website preview style',
        websiteType: 'Νέα ιστοσελίδα',
        businessType: 'Καφέ / snack / delivery',
        message: 'Γεια σου Alex, είδα το Café website preview style και ενδιαφέρομαι για παρόμοιο website για την επιχείρησή μου.\n\nΘέλω κάτι ζεστό, καθαρό και mobile-friendly, με ενότητες για προϊόντα, ωράριο, Instagram / Google Maps και εύκολη επικοινωνία.\n\nΣημειώσεις για την επιχείρηση:'
      },
      restaurant: {
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
      shop: {
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
      starter: {
        title: 'Starter Website — 99€',
        websiteType: pricingPackages.starter.websiteType,
        businessType: '',
        packageKey: 'starter',
        message: pricingPackages.starter.message
      },
      business: {
        title: 'Business Website — 199€',
        websiteType: pricingPackages.business.websiteType,
        businessType: '',
        packageKey: 'business',
        message: pricingPackages.business.message
      },
      'premium-redesign': {
        title: 'Premium Redesign — 349€',
        websiteType: pricingPackages['premium-redesign'].websiteType,
        businessType: '',
        packageKey: 'premium-redesign',
        message: pricingPackages['premium-redesign'].message
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

  function getPackageSelect() {
    if (!(form instanceof HTMLFormElement)) return null;
    const field = form.elements.namedItem('package_interest');
    return field instanceof HTMLSelectElement ? field : null;
  }

  function clearElement(element) {
    if (element instanceof HTMLElement) element.textContent = '';
  }

  function fillList(list, items) {
    if (!(list instanceof HTMLElement)) return;
    list.textContent = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  }

  function getPackageKeyFromValue(value) {
    if (!value) return '';
    if (value.includes('Starter Website')) return 'starter';
    if (value.includes('Business Website')) return 'business';
    if (value.includes('Premium Redesign')) return 'premium-redesign';
    return '';
  }

  function updateSelectedRequest(title, text) {
    if (selectedRequest instanceof HTMLElement) selectedRequest.hidden = false;
    if (selectedRequestTitle instanceof HTMLElement) selectedRequestTitle.textContent = title;
    if (selectedRequestText instanceof HTMLElement) selectedRequestText.textContent = text;
  }

  function updatePackageState(packageKey, options) {
    const settings = Object.assign({ scrollPanel: false, scrollContact: false, prefillMessage: false }, options || {});
    const item = pricingPackages[packageKey];
    if (!item) return;

    packageCards.forEach((card) => {
      const selected = card.getAttribute('data-package-card') === packageKey;
      card.classList.toggle('is-selected', selected);
    });

    packageButtons.forEach((button) => {
      const selected = button.getAttribute('data-package-button') === packageKey;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-expanded', selected ? 'true' : 'false');
      button.setAttribute('aria-label', selected ? `${item.name} επιλεγμένο` : button.textContent.trim());
    });

    if (pricingPanel instanceof HTMLElement) pricingPanel.classList.add('is-active');
    if (pricingPlaceholder instanceof HTMLElement) pricingPlaceholder.hidden = true;
    if (pricingContent instanceof HTMLElement) pricingContent.hidden = false;
    if (pricingName instanceof HTMLElement) pricingName.textContent = item.name;
    if (pricingPrice instanceof HTMLElement) pricingPrice.textContent = item.price;
    if (pricingDescription instanceof HTMLElement) pricingDescription.textContent = item.description;
    if (pricingDelivery instanceof HTMLElement) pricingDelivery.textContent = item.delivery;
    if (pricingGoodFor instanceof HTMLElement) pricingGoodFor.textContent = item.goodFor;
    fillList(pricingIncludes, item.includes);
    fillList(pricingExtras, optionalExtras);

    if (pricingCta instanceof HTMLAnchorElement) {
      pricingCta.href = `index.html?package=${encodeURIComponent(packageKey)}#contact`;
      pricingCta.textContent = item.cta;
      pricingCta.setAttribute('aria-label', `${item.cta} και συνέχισε στη φόρμα επικοινωνίας`);
    }

    const packageSelect = getPackageSelect();
    setSelectValue(packageSelect, item.selectValue);
    if (selectedPackageInput instanceof HTMLInputElement) selectedPackageInput.value = item.label;
    if (requestContext instanceof HTMLInputElement) requestContext.value = item.label;
    if (formSubject instanceof HTMLInputElement) formSubject.value = `New website request for Alex Zaxa - ${item.label}`;

    updateSelectedRequest(`Έχεις επιλέξει: ${item.label}`, 'Η φόρμα έχει ενημερωθεί με το πακέτο και την τιμή που επέλεξες. Μπορείς να συμπληρώσεις τα στοιχεία της επιχείρησης και να προσθέσεις λεπτομέρειες στο μήνυμα.');

    if (form instanceof HTMLFormElement) {
      const websiteType = form.elements.namedItem('website_type');
      const message = form.elements.namedItem('message');
      setSelectValue(websiteType, item.websiteType);
      if (settings.prefillMessage && message instanceof HTMLTextAreaElement && !message.value) {
        message.value = item.message;
      }
    }

    const target = settings.scrollContact ? document.querySelector('#contact') : pricingPanel;
    if (target instanceof HTMLElement && (settings.scrollPanel || settings.scrollContact)) {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function updateUnsureSelection() {
    const value = 'Δεν είμαι σίγουρος / θέλω πρόταση';
    if (selectedPackageInput instanceof HTMLInputElement) selectedPackageInput.value = value;
    if (requestContext instanceof HTMLInputElement) requestContext.value = value;
    if (formSubject instanceof HTMLInputElement) formSubject.value = 'New website request for Alex Zaxa - Wants recommendation';
    updateSelectedRequest(`Έχεις επιλέξει: ${value}`, 'Θα μου στείλεις λίγες πληροφορίες για την επιχείρηση και θα σου προτείνω ποιο πακέτο ταιριάζει καλύτερα.');
    packageCards.forEach((card) => card.classList.remove('is-selected'));
    packageButtons.forEach((button) => {
      button.classList.remove('is-selected');
      button.setAttribute('aria-expanded', 'false');
    });
  }

  packageButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const key = button.getAttribute('data-package-button');
      if (!key || !pricingPackages[key]) return;
      event.preventDefault();
      updatePackageState(key, { scrollPanel: true, prefillMessage: true });
    });
  });

  if (pricingCta instanceof HTMLAnchorElement) {
    pricingCta.addEventListener('click', (event) => {
      const key = getPackageKeyFromValue(selectedPackageInput instanceof HTMLInputElement ? selectedPackageInput.value : '');
      if (!key) return;
      event.preventDefault();
      updatePackageState(key, { scrollContact: true, prefillMessage: true });
    });
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

    if (preset.packageKey) {
      updatePackageState(preset.packageKey, { scrollPanel: false, prefillMessage: false });
    } else {
      if (requestContext instanceof HTMLInputElement) requestContext.value = preset.title;
      if (formSubject instanceof HTMLInputElement) formSubject.value = `New website request for Alex Zaxa - ${preset.title}`;
      updateSelectedRequest(preset.title, 'Η φόρμα συμπληρώθηκε αυτόματα με βάση το preview που επέλεξες. Μπορείς να αλλάξεις ό,τι θέλεις πριν το στείλεις.');
    }
  }

  if (form instanceof HTMLFormElement) {
    const submitButton = form.querySelector('.form-submit');
    const packageSelect = getPackageSelect();

    if (formNext instanceof HTMLInputElement) {
      try {
        const nextUrl = new URL('thanks.html', window.location.href);
        formNext.value = nextUrl.protocol === 'http:' || nextUrl.protocol === 'https:' ? nextUrl.href : 'thanks.html';
      } catch (error) {
        formNext.value = 'thanks.html';
      }
    }

    if (packageSelect) {
      packageSelect.addEventListener('change', () => {
        const key = getPackageKeyFromValue(packageSelect.value);
        if (key) {
          updatePackageState(key, { scrollPanel: false, prefillMessage: false });
        } else if (packageSelect.value) {
          updateUnsureSelection();
        } else {
          if (selectedPackageInput instanceof HTMLInputElement) selectedPackageInput.value = '';
          if (selectedRequest instanceof HTMLElement) selectedRequest.hidden = true;
          clearElement(formStatus);
        }
      });
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
  } else {
    const params = new URLSearchParams(window.location.search);
    const packageKey = params.get('package');
    if (packageKey && pricingPackages[packageKey]) updatePackageState(packageKey, { scrollPanel: false });
  }
})();
