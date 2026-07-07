(function () {
  const status = document.querySelector('[data-auth-status]');
  const form = document.querySelector('[data-auth-form]');
  const signOutButton = document.querySelector('[data-sign-out]');
  const accountEmail = document.querySelector('[data-account-email]');
  const config = window.ALEX_AUTH_CONFIG || {};

  function setStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove('is-error', 'is-success');
    if (type) status.classList.add(type === 'error' ? 'is-error' : 'is-success');
  }

  function isConfigured() {
    return Boolean(config.supabaseUrl && config.supabaseAnonKey && config.supabaseUrl.includes('supabase.co'));
  }

  function getClient() {
    if (!isConfigured() || !window.supabase) return null;
    return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  const client = getClient();

  if (!client) {
    setStatus('Το login/signup UI είναι έτοιμο, αλλά δεν έχει συνδεθεί ακόμα Supabase project. Άνοιξε auth/config.js και βάλε Supabase URL + anon key για να δουλέψει πραγματικά.', 'error');
    if (form) {
      const submit = form.querySelector('button[type="submit"]');
      if (submit) submit.disabled = true;
    }
    return;
  }

  async function loadAccount() {
    const { data, error } = await client.auth.getSession();
    if (error) {
      setStatus(error.message, 'error');
      return;
    }
    if (!data.session) {
      window.location.href = config.loginPage || './login.html';
      return;
    }
    if (accountEmail) accountEmail.textContent = data.session.user.email || 'Signed in user';
    setStatus('Είσαι συνδεδεμένος. Από εδώ μπορεί αργότερα να μπει client dashboard, αρχεία, previews και updates.', 'success');
  }

  if (document.body.dataset.authPage === 'account') {
    loadAccount();
  }

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const mode = form.getAttribute('data-auth-form');
      const submit = form.querySelector('button[type="submit"]');
      const email = form.querySelector('input[name="email"]')?.value.trim();
      const password = form.querySelector('input[name="password"]')?.value;
      if (submit) {
        submit.disabled = true;
        submit.textContent = mode === 'signup' ? 'Δημιουργία...' : 'Σύνδεση...';
      }
      setStatus('Γίνεται ασφαλής επικοινωνία με τον πάροχο authentication...', null);
      try {
        if (mode === 'signup') {
          const fullName = form.querySelector('input[name="full_name"]')?.value.trim() || '';
          const businessName = form.querySelector('input[name="business_name"]')?.value.trim() || '';
          const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName, business_name: businessName },
              emailRedirectTo: new URL(config.accountPage || './account.html', window.location.href).href
            }
          });
          if (error) throw error;
          if (data.session) {
            window.location.href = config.accountPage || './account.html';
          } else {
            setStatus('Ο λογαριασμός δημιουργήθηκε. Έλεγξε το email σου για επιβεβαίωση πριν συνδεθείς.', 'success');
          }
        } else {
          const { error } = await client.auth.signInWithPassword({ email, password });
          if (error) throw error;
          window.location.href = config.accountPage || './account.html';
        }
      } catch (error) {
        setStatus(error.message || 'Κάτι πήγε λάθος. Έλεγξε τα στοιχεία και ξαναδοκίμασε.', 'error');
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = submit.dataset.defaultText || (mode === 'signup' ? 'Δημιουργία λογαριασμού' : 'Σύνδεση');
        }
      }
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener('click', async () => {
      signOutButton.disabled = true;
      await client.auth.signOut();
      window.location.href = config.loginPage || './login.html';
    });
  }
})();
