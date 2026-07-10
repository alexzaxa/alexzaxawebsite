# Alex Zaxa — Website Creation Portfolio

Static personal business website for **Alex Zaxa**, focused on creating and redesigning modern websites for local Greek businesses.

The project is Greek-first, mobile-first, fast, animated, static-hosting friendly, and ready to upload without a build step.


## New business/conversion features

This version includes extra conversion tools for real website sales:

- **Ξεκίνα project quiz** that suggests Starter, Business, Premium, Digital Menu, Landing Page, or “not sure” based on the visitor's business type, existing website, goal, budget, and available material
- **Before / After redesign section** explaining the value of redesigning an old or weak online presence
- **Who this is for** section for cafés, restaurants, shops, barbers, service businesses, freelancers, and personal brands
- **What you need to send me** checklist for business name, logo, photos, menu/services, social links, and Google Maps link
- **Delivery timeline** section with usual time ranges for Starter, Business, and Premium/Redesign projects
- **Monthly support** option as an extra for small changes after publishing
- **Terms page** (`terms.html`) explaining deposit, payment flow, revisions, referrals, separate referral page, domain/hosting, and delivery basics
- **Quick contact buttons** for email, Instagram, and website request
- **No fake testimonials**; portfolio proof stays honest until real client projects can be added with permission

## Project structure

```text
index.html
styles.css
script.js
thanks.html
404.html
privacy.html
terms.html
README.md
.htaccess
_headers
robots.txt
sitemap.xml
open-local.bat
assets/og-preview.svg
MAIL_SETUP.md
demos/index.html
demos/demo-styles.css
demos/demo-script.js
demos/menu-filter.js
demos/cafe/index.html
demos/restaurant/index.html
demos/digital-menu/index.html
demos/shop/index.html
demos/service/index.html
demos/personal/index.html
```

## How to open locally

Open `index.html` directly in a browser, or double-click `open-local.bat` on Windows.

All preview links use explicit `index.html` paths, for example:

```text
demos/cafe/index.html
demos/restaurant/index.html
demos/digital-menu/index.html
```

This avoids local directory listings such as `Index of .../demos/digital-menu/` when testing with:

- `file://`
- VS Code Live Server
- Python `http.server`
- GitHub Pages
- Cloudflare Pages
- Netlify

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload all files from this folder.
3. Make sure `index.html` is in the root of the repository, not inside another folder.
4. Go to **Settings → Pages**.
5. Choose **Deploy from branch**.
6. Select the `main` branch and `/root`.
7. Save and wait for GitHub Pages to publish.

If you see an “Index of...” page, the host is pointing to the wrong folder or `index.html` is not in the published root.

## Publish on Cloudflare Pages

1. Create a new Cloudflare Pages project.
2. Connect the GitHub repository or upload the folder.
3. Build command: leave empty.
4. Output directory: `/` or leave empty when uploading the folder directly.
5. Deploy.

Cloudflare Pages reads `_headers` and applies the static security headers.

## Publish on Netlify

1. Drag and drop the project folder into Netlify, or connect the GitHub repository.
2. Build command: leave empty.
3. Publish directory: `/`.
4. Deploy.

Netlify also supports the `_headers` file.

## Φόρμα επικοινωνίας setup

The form posts to:

```text
https://formsubmit.co/projects@alexzaxa.com
```

FormSubmit may send a first-time confirmation email to `projects@alexzaxa.com`. Open that email and confirm the form. After confirmation, future website requests should arrive normally.

The form includes:

- FormSubmit captcha enabled
- Honeypot field
- Required consent checkbox
- Maxlength limits
- Email validation
- Phone pattern validation
- Loading state on submit
- Double-submit protection
- Dynamic redirect to `thanks.html`
- Privacy note linking to `privacy.html`
- Selected package, selected extras, extras total, final estimated total, monthly support total, preferred payment method, and quiz answers/suggested package are sent with the main request. Referrals are sent through the separate `referral.html` form.
- Extras can be selected directly inside the contact/checkout form, not only from the package preview section
- Payment is not taken on the website. The visitor chooses PayPal, bank transfer, or “we will discuss it”, and you send payment instructions manually after confirming the final price

Local testing shows the form design and validation. The real email flow should be tested after publishing to GitHub Pages, Cloudflare Pages, or Netlify.


## Payment setup: PayPal or bank transfer

This site does **not** collect money automatically. It collects a website request and asks the visitor which payment method they prefer. This is safer because the price calculator is frontend-only and should not be treated as a real checkout.

Recommended workflow:

1. Visitor chooses package + extras.
2. Visitor chooses preferred payment method: PayPal, bank transfer, or discuss first.
3. Visitor submits the form.
4. You receive the request by email.
5. You confirm the final price manually.
6. You send either a PayPal payment link or your bank transfer details.
7. Start the project after the agreed deposit/payment.

Suggested payment rule to use with clients:

```text
50% προκαταβολή για να ξεκινήσει το project.
50% όταν η ιστοσελίδα είναι έτοιμη για παράδοση.
```

Do not put your IBAN or PayPal link publicly on the website unless you are sure you want everyone to see it. The current version only asks for the visitor's preference and sends it to you through the form.

## Terms page

`terms.html` is a simple Greek terms/cooperation page. It explains that payment is manual, a deposit may be requested, changes/revisions should be agreed, domain/hosting can be separate, and final delivery happens after payment completion.

Keep it simple and update it before using the website with real clients. For repeated paid work, ask an accountant in Greece about receipts/invoices and VAT/παραστατικό.

## Change contact details

Search and replace these values:

```text
projects@alexzaxa.com
@___zaxoss
https://www.instagram.com/___zaxoss/
```

They appear in `index.html`, `privacy.html`, and this README.

## Change domain / SEO placeholders

Before publishing with a real domain, search for `https://alexzaxa.com/` and replace it with your final website URL. Update:

- `https://alexzaxa.com/` in `index.html`
- `https://alexzaxa.com/privacy.html` in `privacy.html`
- `https://alexzaxa.com/terms.html` in `terms.html`
- URLs in `sitemap.xml`
- Sitemap URL in `robots.txt`
- `url` in the JSON-LD schema inside `index.html`
- Open Graph image URL in `index.html`

The Open Graph preview image is:

```text
assets/og-preview.svg
```

## Security files

### `_headers`

Used by Netlify and Cloudflare Pages. It adds static-site security headers:

- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Content-Security-Policy`

The CSP allows the static site, CSS, JavaScript, SVG/data images, FormSubmit form submission, mail links, and Instagram navigation.

### `.htaccess`

Apache fallback for similar headers and `DirectoryIndex index.html`. GitHub Pages ignores `.htaccess`; Netlify and Cloudflare Pages use `_headers` instead.

### `robots.txt` and `sitemap.xml`

These help search engines discover the main pages. Replace the placeholder domain before using a real domain.

### `privacy.html`

A simple Greek privacy page explaining what the form collects, why it is used, and that a third-party form service may process the message.

## Demo previews

The demo previews are located in `demos/` and every page can be opened directly:

- `demos/index.html`
- `demos/cafe/index.html`
- `demos/restaurant/index.html`
- `demos/digital-menu/index.html`
- `demos/shop/index.html`
- `demos/service/index.html`
- `demos/personal/index.html`

Back buttons use:

```text
../../index.html
../../index.html#contact
../index.html
```

## Digital menu filters

The digital menu preview uses `demos/menu-filter.js`.

- Category buttons filter items by `data-category`.
- The active button updates `aria-pressed`.
- If JavaScript is disabled, all menu items remain visible.

## Accessibility and performance

The site includes:

- Visible focus states
- Skip links
- Semantic headings
- Form labels and autocomplete
- `aria-expanded` / `aria-controls` for mobile nav
- Escape key to close mobile nav
- `prefers-reduced-motion` support
- Vanilla JavaScript only
- No React, no npm, no heavy libraries

## Notes

This is a static website. No backend, database, build system, or paid hosting is required.

## GitHub Pages layout/visual fix

This version includes a GitHub Pages visual fix for cases where the page looks correct locally but broken online.

What was changed:

- CSS and JavaScript links now use relative paths with a cache-busting version query, for example `./styles.css?v=growth-tools-20260708`.
- A `.nojekyll` file is περιλαμβάνεται so GitHub Pages serves the project as a plain static site.
- Preview/demo links point directly to `index.html` files instead of folders.
- The pricing/package section has a visible HTML fallback, so it still looks correct even if JavaScript loads late or fails.
- The package section and the contact/checkout form include an interactive extras picker. Visitors can choose add-ons themselves before submitting, and the estimated total updates automatically in the request summary and hidden FormSubmit fields.

If GitHub Pages still shows the old broken layout:

1. Make sure **all files** are uploaded to the repository root, not only `index.html`.
2. Wait 1–2 minutes for GitHub Pages to redeploy.
3. Open the page in an incognito window or hard refresh with `Ctrl + F5`.
4. Check that these files open in the browser:
   - `styles.css`
   - `script.js`
   - `demos/demo-styles.css`
   - `demos/demo-script.js`
5. If you changed the repository name or use a custom domain later, update the canonical URL, sitemap URL, and Open Graph URL placeholders.



## Professional email / mail setup

See `MAIL_SETUP.md` for the recommended email setup.

Quick recommendation:

- For receiving only: use Cloudflare Email Routing and forward `hello@yourdomain.gr` to Gmail.
- For sending and receiving from the custom domain: use Zoho Mail free/low-cost plan.
- Do not self-host mail at the start because deliverability, SPF, DKIM, DMARC, PTR/reverse DNS and spam reputation are hard to maintain.

## Latest fixes

- Fixed cramped extras cards so the checkbox, text and price badge do not overlap.
- Cleaned security headers so they only allow the current static site, Instagram links, and FormSubmit.


## Audit improvement pass

This version applies the latest audit recommendations:

- Added a visible `Σχετικά` navigation link to the About section.
- Added clearer pricing notes and a careful VAT / invoice clarification without legal/tax promises.
- Added more FAQ answers about payment, revisions, response time, domain/hosting, Instagram and Google Maps.
- Added an honest trust section without fake testimonials or fake reviews.
- Added a 24-hour response expectation near the contact form.
- Replaced `your-domain.example` with the clearer placeholder `https://alexzaxa.com/`.
- Kept the project static-only with no client account system.
- Added PayPal / bank transfer payment preference to the request form without turning the website into a real checkout.

Before launch, replace `https://alexzaxa.com/` in `index.html`, `privacy.html`, `terms.html`, `robots.txt`, and `sitemap.xml` with the final domain.

## Growth tools update

This version adds the requested sales features:

- Start-project quiz with hidden FormSubmit fields
- Before/after redesign explanation
- Who-this-is-for audience section
- Materials checklist
- Delivery timeline
- Monthly support positioning
- Honest portfolio proof section
- Quick contact buttons
- Not-sure package option
- Terms page with basic cooperation/payment rules

The website still stays static-only and no payment is taken automatically.



## Referral page

`referral.html` is a separate static referral form. Use links such as `referral.html?ref=nikos` to auto-fill the referral code. Referral bonuses/discounts are confirmed manually.
