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


  const packageData = {
    starter: {
      label: 'Starter Website — 99€',
      name: 'Starter Website',
      price: 'Τιμή: 99€',
      priceValue: '99€',
      summary: 'Ιδανικό για επιχείρηση που θέλει γρήγορη, καθαρή και επαγγελματική online παρουσία χωρίς περίπλοκες ενότητες.',
      time: 'Παράδοση: 3–7 ημέρες, ανάλογα με το υλικό',
      best: 'Κατάλληλο για απλή παρουσίαση, βασικές πληροφορίες και άμεση επικοινωνία.',
      includes: [
        'One-page website',
        'Mobile-first σχεδιασμός',
        'Βασικές πληροφορίες επιχείρησης',
        'Email / Instagram / χάρτης',
        'Βασικό SEO setup'
      ]
    },
    business: {
      label: 'Business Website — 199€',
      name: 'Business Website',
      price: 'Τιμή: 199€',
      priceValue: '199€',
      summary: 'Ιδανικό για καφέ, εστιατόριο, κατάστημα ή υπηρεσία που θέλει πλήρη και επαγγελματική παρουσία.',
      time: 'Παράδοση: 5–10 ημέρες, ανάλογα με το project',
      best: 'Κατάλληλο για επιχειρήσεις που θέλουν ολοκληρωμένη εικόνα και περισσότερες ενότητες.',
      includes: [
        'Πολλαπλές ενότητες',
        'Gallery / προϊόντα / υπηρεσίες',
        'Contact form',
        'Google Maps & social links',
        'Δομή για Instagram / Google Maps traffic'
      ]
    },
    premium: {
      label: 'Premium Redesign — 349€',
      name: 'Premium Redesign',
      price: 'Τιμή: 349€',
      priceValue: '349€',
      summary: 'Ιδανικό για επιχείρηση που έχει ήδη website ή θέλει πιο premium αποτέλεσμα με καλύτερη αισθητική, UX και εμπιστοσύνη.',
      time: 'Παράδοση: 7–14 ημέρες, ανάλογα με το project',
      best: 'Κατάλληλο για επιχειρήσεις που θέλουν ανασχεδιασμό, πιο δυνατή παρουσία και premium αίσθηση.',
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
        'Hosting guidance'
      ]
    },
    digital: {
      label: 'Digital menu',
      name: 'Digital Menu',
      price: 'Τιμή: μετά από πρόταση',
      priceValue: 'Μετά από πρόταση',
      summary: 'Ιδανικό για καφέ, εστιατόριο ή take away που θέλει καθαρό menu στο κινητό με κατηγορίες και γρήγορη πλοήγηση.',
      time: 'Παράδοση: ανάλογα με τον αριθμό προϊόντων και το υλικό',
      best: 'Κατάλληλο όταν υπάρχει menu, φωτογραφίες, προϊόντα ή συχνές αλλαγές.',
      includes: [
        'Κατηγορίες menu',
        'Προϊόντα / περιγραφές / φωτογραφίες όπου υπάρχουν',
        'Mobile-first εμπειρία',
        'Γρήγορη πλοήγηση για πελάτες',
        'Σύνδεση με Instagram / Google Maps όπου χρειάζεται'
      ]
    },
    landing: {
      label: 'Landing page',
      name: 'Landing Page',
      price: 'Τιμή: μετά από πρόταση',
      priceValue: 'Μετά από πρόταση',
      summary: 'Ιδανικό για μία συγκεκριμένη υπηρεσία, προσφορά ή καμπάνια που χρειάζεται δυνατή πρώτη εντύπωση και ξεκάθαρο CTA.',
      time: 'Παράδοση: ανάλογα με το περιεχόμενο και τον στόχο της σελίδας',
      best: 'Κατάλληλο για διαφημίσεις, social traffic, προσωπικό brand ή νέα υπηρεσία.',
      includes: [
        'Δυνατό hero section',
        'Καθαρό μήνυμα και CTA',
        'Mobile-first layout',
        'Βασικό SEO setup',
        'Contact / social links'
      ]
    },
    unsure: {
      label: 'Δεν είμαι σίγουρος / θέλω πρόταση',
      name: 'Θέλω πρόταση',
      price: 'Τιμή: μετά από συζήτηση',
      priceValue: 'Μετά από συζήτηση',
      summary: 'Ιδανικό όταν δεν είσαι σίγουρος ποια λύση ταιριάζει καλύτερα στην επιχείρηση και θέλεις καθοδήγηση.',
      time: 'Παράδοση: θα εκτιμηθεί αφού δω τι χρειάζεται το project',
      best: 'Κατάλληλο για επιχειρήσεις που θέλουν απλή, καθαρή πρόταση πριν αποφασίσουν.',
      includes: [
        'Σύντομη συζήτηση για την επιχείρηση',
        'Πρόταση για κατάλληλο πακέτο',
        'Καθοδήγηση για υλικό και hosting',
        'Εκτίμηση χρόνου και τελικής δουλειάς'
      ]
    }
  };

  const packageCards = Array.from(document.querySelectorAll('[data-package-card]'));
  const selectedName = document.querySelector('#selected-package-name');
  const selectedPrice = document.querySelector('#selected-package-price');
  const selectedSummary = document.querySelector('#selected-package-summary');
  const selectedTime = document.querySelector('#selected-package-time');
  const selectedBest = document.querySelector('#selected-package-best');
  const selectedIncludes = document.querySelector('#selected-package-includes');
  const selectedInput = document.querySelector('#selected-package-input');
  const selectedPriceInput = document.querySelector('#selected-package-price-input');
  const selectedDeliveryInput = document.querySelector('#selected-package-delivery-input');
  const selectedSummaryInput = document.querySelector('#selected-package-summary-input');
  const selectedIncludesInput = document.querySelector('#selected-package-includes-input');
  const contactSelectedName = document.querySelector('#contact-selected-name');
  const contactSelectedPrice = document.querySelector('#contact-selected-price');
  const contactSelectedSummary = document.querySelector('#contact-selected-summary');
  const contactSelectedTime = document.querySelector('#contact-selected-time');
  const contactSelectedBest = document.querySelector('#contact-selected-best');
  const contactSelectedIncludes = document.querySelector('#contact-selected-includes');
  const contactPackageSummary = document.querySelector('#contact-package-summary');
  const packageDetails = document.querySelector('#package-details');
  const websiteTypeSelect = form ? form.querySelector('select[name="website_type"]') : null;

  function getPackageKeyFromValue(value) {
    if (!value) return null;
    const normalized = String(value).trim().toLowerCase();
    if (normalized.includes('starter')) return 'starter';
    if (normalized.includes('business')) return 'business';
    if (normalized.includes('premium')) return 'premium';
    if (normalized.includes('digital')) return 'digital';
    if (normalized.includes('landing')) return 'landing';
    if (normalized.includes('δεν είμαι') || normalized.includes('πρόταση')) return 'unsure';
    return null;
  }

  function renderIncludes(listElement, includes) {
    if (!listElement) return;
    listElement.innerHTML = '';
    includes.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      listElement.appendChild(li);
    });
  }

  function setSelectedPackage(key, options = {}) {
    const data = packageData[key];
    if (!data) return;
    const shouldSyncSelect = options.syncSelect !== false;

    packageCards.forEach((card) => {
      const isSelected = card.dataset.package === key;
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-current', isSelected ? 'true' : 'false');
    });

    if (selectedName) selectedName.textContent = data.name;
    if (selectedPrice) selectedPrice.textContent = data.price;
    if (selectedSummary) selectedSummary.textContent = data.summary;
    if (selectedTime) selectedTime.textContent = data.time;
    if (selectedBest) selectedBest.textContent = data.best;
    renderIncludes(selectedIncludes, data.includes);

    if (contactSelectedName) contactSelectedName.textContent = data.name;
    if (contactSelectedPrice) contactSelectedPrice.textContent = data.priceValue;
    if (contactSelectedSummary) contactSelectedSummary.textContent = data.summary;
    if (contactSelectedTime) contactSelectedTime.textContent = data.time;
    if (contactSelectedBest) contactSelectedBest.textContent = data.best;
    renderIncludes(contactSelectedIncludes, data.includes);

    if (selectedInput instanceof HTMLInputElement) selectedInput.value = data.label;
    if (selectedPriceInput instanceof HTMLInputElement) selectedPriceInput.value = data.priceValue;
    if (selectedDeliveryInput instanceof HTMLInputElement) selectedDeliveryInput.value = data.time;
    if (selectedSummaryInput instanceof HTMLInputElement) selectedSummaryInput.value = data.summary;
    if (selectedIncludesInput instanceof HTMLInputElement) selectedIncludesInput.value = data.includes.join(', ');
    if (shouldSyncSelect && websiteTypeSelect instanceof HTMLSelectElement) websiteTypeSelect.value = data.label;

    [packageDetails, contactPackageSummary].forEach((panel) => {
      if (!panel) return;
      panel.classList.remove('is-updating');
      window.requestAnimationFrame(() => panel.classList.add('is-updating'));
    });
  }

  if (packageCards.length) {
    packageCards.forEach((card) => {
      const key = card.dataset.package;
      card.addEventListener('click', (event) => {
        if (event.target instanceof HTMLAnchorElement) {
          setSelectedPackage(key);
          return;
        }
        setSelectedPackage(key);
      });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setSelectedPackage(key);
        }
      });
    });
  }

  document.querySelectorAll('[data-package-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const value = link.getAttribute('data-package-link');
      const key = getPackageKeyFromValue(value);
      if (key) setSelectedPackage(key);
    });
  });

  if (websiteTypeSelect instanceof HTMLSelectElement) {
    websiteTypeSelect.addEventListener('change', () => {
      const key = getPackageKeyFromValue(websiteTypeSelect.value);
      if (key) setSelectedPackage(key, { syncSelect: false });
    });
  }

  if (packageCards.length) setSelectedPackage('business');

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
