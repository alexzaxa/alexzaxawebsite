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
      baseAmount: 99,
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
      baseAmount: 199,
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
      baseAmount: 349,
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
      baseAmount: null,
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
      baseAmount: null,
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
      baseAmount: null,
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
  const contactBasePrice = document.querySelector('#contact-base-price');
  const contactExtrasTotal = document.querySelector('#contact-extras-total');
  const contactTotalPrice = document.querySelector('#contact-total-price');
  const contactMonthlyNote = document.querySelector('#contact-monthly-note');
  const contactSelectedExtras = document.querySelector('#contact-selected-extras');
  const packageDetails = document.querySelector('#package-details');
  const builderBasePrice = document.querySelector('#builder-base-price');
  const builderExtrasTotal = document.querySelector('#builder-extras-total');
  const builderTotalPrice = document.querySelector('#builder-total-price');
  const builderMonthlyNote = document.querySelector('#builder-monthly-note');
  const clearExtrasButtons = Array.from(document.querySelectorAll('[data-clear-extras]'));
  const extraCheckboxes = Array.from(document.querySelectorAll('input[name="extra_option"]'));
  const selectedExtrasInput = document.querySelector('#selected-extras-input');
  const selectedExtrasTotalInput = document.querySelector('#selected-extras-total-input');
  const selectedTotalEstimateInput = document.querySelector('#selected-total-estimate-input');
  const selectedMonthlyTotalInput = document.querySelector('#selected-monthly-total-input');
  const websiteTypeSelect = form ? form.querySelector('select[name="website_type"]') : null;
  const paymentRadios = form ? Array.from(form.querySelectorAll('input[name="preferred_payment_method"]')) : [];
  const contactPaymentMethod = document.querySelector('#contact-payment-method');
  const quizInputs = Array.from(document.querySelectorAll('[data-project-quiz] input[type="radio"]'));
  const quizResultTitle = document.querySelector('#quiz-result-title');
  const quizResultText = document.querySelector('#quiz-result-text');
  const quizResultTags = document.querySelector('#quiz-result-tags');
  const applyQuizButton = document.querySelector('[data-apply-quiz]');
  const quizBusinessInput = document.querySelector('#quiz-business-type-input');
  const quizHasWebsiteInput = document.querySelector('#quiz-has-website-input');
  const quizGoalInput = document.querySelector('#quiz-goal-input');
  const quizMaterialsInput = document.querySelector('#quiz-materials-input');
  const quizBudgetInput = document.querySelector('#quiz-budget-input');
  const quizSuggestedPackageInput = document.querySelector('#quiz-suggested-package-input');
  let currentQuizSuggestion = 'business';
  let currentPackageKey = 'business';

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

  function formatEuro(amount) {
    return `${amount}€`;
  }

  function getSelectedExtras() {
    const selected = new Map();

    extraCheckboxes.forEach((checkbox) => {
      if (!(checkbox instanceof HTMLInputElement) || !checkbox.checked) return;
      const key = checkbox.value || checkbox.dataset.extraLabel || 'extra';
      if (selected.has(key)) return;
      selected.set(key, {
        label: checkbox.dataset.extraLabel || checkbox.value,
        price: Number(checkbox.dataset.extraPrice || 0),
        monthly: Number(checkbox.dataset.extraMonthly || 0)
      });
    });

    return Array.from(selected.values());
  }

  function updatePaymentPreference() {
    if (!contactPaymentMethod) return;
    const selectedPayment = paymentRadios.find((radio) => radio instanceof HTMLInputElement && radio.checked);
    contactPaymentMethod.textContent = selectedPayment ? selectedPayment.value : 'Θα το συζητήσουμε';
  }

  function syncMatchingExtras(changedCheckbox) {
    if (!(changedCheckbox instanceof HTMLInputElement)) return;
    const key = changedCheckbox.value;
    extraCheckboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement && checkbox !== changedCheckbox && checkbox.value === key) {
        checkbox.checked = changedCheckbox.checked;
      }
    });
  }

  function renderSelectedExtrasList(listElement, extras) {
    if (!listElement) return;
    listElement.innerHTML = '';
    if (!extras.length) {
      const li = document.createElement('li');
      li.textContent = 'Δεν έχει επιλεγεί extra.';
      listElement.appendChild(li);
      return;
    }
    extras.forEach((extra) => {
      const li = document.createElement('li');
      const priceText = extra.monthly > 0 ? `+${formatEuro(extra.monthly)}/μήνα` : extra.price > 0 ? `+${formatEuro(extra.price)}` : 'included';
      li.textContent = `${extra.label} (${priceText})`;
      listElement.appendChild(li);
    });
  }

  function updateTotals() {
    const data = packageData[currentPackageKey];
    if (!data) return;
    const extras = getSelectedExtras();
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
    const monthlyTotal = extras.reduce((sum, extra) => sum + extra.monthly, 0);
    const hasFixedBase = typeof data.baseAmount === 'number';
    const total = hasFixedBase ? data.baseAmount + extrasTotal : null;
    const baseText = hasFixedBase ? formatEuro(data.baseAmount) : data.priceValue;
    const extrasText = formatEuro(extrasTotal);
    const monthlyText = monthlyTotal > 0 ? `+${formatEuro(monthlyTotal)}/μήνα` : 'Χωρίς μηνιαία extras.';
    const totalText = hasFixedBase ? formatEuro(total) : (extrasTotal > 0 ? `Μετά από πρόταση + ${extrasText} extras` : data.priceValue);

    if (builderBasePrice) builderBasePrice.textContent = baseText;
    if (builderExtrasTotal) builderExtrasTotal.textContent = extrasText;
    if (builderTotalPrice) builderTotalPrice.textContent = totalText;
    if (builderMonthlyNote) builderMonthlyNote.textContent = monthlyText;

    if (contactBasePrice) contactBasePrice.textContent = baseText;
    if (contactExtrasTotal) contactExtrasTotal.textContent = extrasText;
    if (contactTotalPrice) contactTotalPrice.textContent = totalText;
    if (contactMonthlyNote) contactMonthlyNote.textContent = monthlyText;
    if (contactSelectedPrice) contactSelectedPrice.textContent = totalText;
    renderSelectedExtrasList(contactSelectedExtras, extras);

    const extrasDescription = extras.length
      ? extras.map((extra) => {
          const priceText = extra.monthly > 0 ? `+${formatEuro(extra.monthly)}/μήνα` : extra.price > 0 ? `+${formatEuro(extra.price)}` : 'included';
          return `${extra.label} (${priceText})`;
        }).join(', ')
      : 'Κανένα extra';

    if (selectedPriceInput instanceof HTMLInputElement) selectedPriceInput.value = baseText;
    if (selectedExtrasInput instanceof HTMLInputElement) selectedExtrasInput.value = extrasDescription;
    if (selectedExtrasTotalInput instanceof HTMLInputElement) selectedExtrasTotalInput.value = extrasText;
    if (selectedTotalEstimateInput instanceof HTMLInputElement) selectedTotalEstimateInput.value = totalText;
    if (selectedMonthlyTotalInput instanceof HTMLInputElement) selectedMonthlyTotalInput.value = monthlyTotal > 0 ? `${formatEuro(monthlyTotal)}/μήνα` : '0€/μήνα';
  }

  function setSelectedPackage(key, options = {}) {
    const data = packageData[key];
    if (!data) return;
    currentPackageKey = key;
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
    if (selectedDeliveryInput instanceof HTMLInputElement) selectedDeliveryInput.value = data.time;
    if (selectedSummaryInput instanceof HTMLInputElement) selectedSummaryInput.value = data.summary;
    if (selectedIncludesInput instanceof HTMLInputElement) selectedIncludesInput.value = data.includes.join(', ');
    if (shouldSyncSelect && websiteTypeSelect instanceof HTMLSelectElement) websiteTypeSelect.value = data.label;
    updateTotals();

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


  function getQuizValue(name) {
    const selected = document.querySelector(`[data-project-quiz] input[name="${name}"]:checked`);
    return selected instanceof HTMLInputElement ? selected.value : '';
  }

  function writeHidden(input, value) {
    if (input instanceof HTMLInputElement) input.value = value || 'Δεν συμπληρώθηκε';
  }

  function renderQuizTags(tags) {
    if (!quizResultTags) return;
    quizResultTags.innerHTML = '';
    tags.forEach((tag) => {
      const span = document.createElement('span');
      span.textContent = tag;
      quizResultTags.appendChild(span);
    });
  }

  function updateQuizSuggestion() {
    if (!quizInputs.length) return;
    const business = getQuizValue('quiz_business_type');
    const hasWebsite = getQuizValue('quiz_has_website');
    const goal = getQuizValue('quiz_goal');
    const materials = getQuizValue('quiz_materials');
    const budget = getQuizValue('quiz_budget');
    const hasAnyAnswer = Boolean(business || hasWebsite || goal || materials || budget);
    if (!hasAnyAnswer) {
      currentQuizSuggestion = 'business';
      if (quizResultTitle) quizResultTitle.textContent = 'Ξεκίνα επιλέγοντας απαντήσεις';
      if (quizResultText) quizResultText.textContent = 'Θα εμφανιστεί μια προτεινόμενη επιλογή και μπορείς να τη στείλεις μαζί με το αίτημα.';
      renderQuizTags(['Mobile-first', 'Στατική σελίδα', 'Χωρίς πληρωμή τώρα']);
      writeHidden(quizBusinessInput, 'Δεν συμπληρώθηκε');
      writeHidden(quizHasWebsiteInput, 'Δεν συμπληρώθηκε');
      writeHidden(quizGoalInput, 'Δεν συμπληρώθηκε');
      writeHidden(quizMaterialsInput, 'Δεν συμπληρώθηκε');
      writeHidden(quizBudgetInput, 'Δεν συμπληρώθηκε');
      writeHidden(quizSuggestedPackageInput, 'Δεν συμπληρώθηκε');
      return;
    }
    let key = 'business';
    let reason = 'Για τις περισσότερες τοπικές επιχειρήσεις, το Business Website είναι η πιο ισορροπημένη επιλογή.';
    let tags = ['Business Website', 'Πλήρης εικόνα', '199€ βάση'];

    if (goal.includes('Digital')) {
      key = 'digital';
      reason = 'Εφόσον ο βασικός στόχος είναι menu, ταιριάζει καλύτερα ένα καθαρό Digital Menu setup με κατηγορίες και mobile-first εμπειρία.';
      tags = ['Digital menu', 'Για κινητά', 'Μετά από πρόταση'];
    } else if (goal.includes('Premium') || hasWebsite.includes('redesign')) {
      key = 'premium';
      reason = 'Αφού υπάρχει υπάρχουσα παρουσία ή στόχος για redesign, το Premium Redesign δίνει πιο δυνατό αποτέλεσμα και καλύτερη δομή.';
      tags = ['Premium Redesign', 'Redesign', '349€ βάση'];
    } else if (goal.includes('Απλή')) {
      key = 'starter';
      reason = 'Για απλή παρουσίαση και γρήγορη online εικόνα, το Starter Website είναι αρκετό για να ξεκινήσεις σωστά.';
      tags = ['Starter Website', 'Απλή παρουσίαση', '99€ βάση'];
    } else if (business.includes('Freelancer')) {
      key = 'landing';
      reason = 'Για freelancer ή personal brand, μια δυνατή landing/personal page μπορεί να παρουσιάσει bio, υπηρεσίες και portfolio καθαρά.';
      tags = ['Landing page', 'Personal brand', 'Μετά από πρόταση'];
    }

    if (budget.includes('Starter')) {
      key = 'starter';
      reason = 'Με απλό αρχικό budget, το Starter Website είναι η πιο καθαρή επιλογή για να βγει γρήγορα online μια σωστή παρουσία.';
      tags = ['Starter Website', 'Απλό ξεκίνημα', '99€ βάση'];
    } else if (budget.includes('Premium')) {
      key = 'premium';
      reason = 'Με premium στόχο, το Premium Redesign ταιριάζει καλύτερα για πιο δυνατή αισθητική, UX και conversion sections.';
      tags = ['Premium Redesign', 'Premium εικόνα', '349€ βάση'];
    } else if (budget.includes('Unsure')) {
      key = 'unsure';
      reason = 'Αφού δεν είσαι σίγουρος ακόμα, η καλύτερη επιλογή είναι να στείλεις τα στοιχεία και να πάρεις καθαρή πρόταση πριν αποφασίσεις.';
      tags = ['Θέλω πρόταση', 'Χωρίς δέσμευση', 'Μετά από συζήτηση'];
    }

    if (materials.includes('Δεν έχω')) {
      reason += ' Επειδή δεν υπάρχει ακόμα υλικό, ίσως χρειαστεί copywriting ή οργάνωση φωτογραφιών ως extra.';
      tags.push('Χρειάζεται υλικό');
    } else if (materials.includes('μερικά')) {
      reason += ' Με λίγο υπάρχον υλικό, μπορούμε να οργανώσουμε ό,τι υπάρχει και να συμπληρώσουμε τα βασικά.';
      tags.push('Οργάνωση υλικού');
    }

    currentQuizSuggestion = key;
    const data = packageData[key] || packageData.business;
    if (quizResultTitle) quizResultTitle.textContent = data.name;
    if (quizResultText) quizResultText.textContent = reason;
    renderQuizTags(tags);

    writeHidden(quizBusinessInput, business);
    writeHidden(quizHasWebsiteInput, hasWebsite);
    writeHidden(quizGoalInput, goal);
    writeHidden(quizMaterialsInput, materials);
    writeHidden(quizBudgetInput, budget);
    writeHidden(quizSuggestedPackageInput, data.label);
  }

  quizInputs.forEach((input) => {
    input.addEventListener('change', updateQuizSuggestion);
  });

  if (applyQuizButton instanceof HTMLButtonElement) {
    applyQuizButton.addEventListener('click', () => {
      updateQuizSuggestion();
      setSelectedPackage(currentQuizSuggestion);
      const contactSection = document.querySelector('#contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  updateQuizSuggestion();

  extraCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      syncMatchingExtras(checkbox);
      updateTotals();
      [packageDetails, contactPackageSummary].forEach((panel) => {
        if (!panel) return;
        panel.classList.remove('is-updating');
        window.requestAnimationFrame(() => panel.classList.add('is-updating'));
      });
    });
  });

  paymentRadios.forEach((radio) => {
    if (!(radio instanceof HTMLInputElement)) return;
    radio.addEventListener('change', updatePaymentPreference);
  });

  clearExtrasButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener('click', () => {
      extraCheckboxes.forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) checkbox.checked = false;
      });
      updateTotals();
      [packageDetails, contactPackageSummary].forEach((panel) => {
        if (!panel) return;
        panel.classList.remove('is-updating');
        window.requestAnimationFrame(() => panel.classList.add('is-updating'));
      });
    });
  });

  if (packageCards.length) setSelectedPackage('business');
  else updateTotals();
  updatePaymentPreference();

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
