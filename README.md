# Alex Zaxa — Website Creation Portfolio

Static personal business website for **Alex Zaxa**, focused on creating and redesigning modern websites for local Greek businesses.

The project is Greek-first, mobile-first, fast, animated, static-hosting friendly, and ready to upload without a build step.

## Project structure

```text
index.html
styles.css
script.js
thanks.html
404.html
privacy.html
README.md
.htaccess
_headers
robots.txt
sitemap.xml
open-local.bat
assets/og-preview.svg
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

## Contact form setup

The form posts to:

```text
https://formsubmit.co/alexzaxa70@gmail.com
```

FormSubmit may send a first-time confirmation email to `alexzaxa70@gmail.com`. Open that email and confirm the form. After confirmation, future website requests should arrive normally.

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

Local testing shows the form design and validation. The real email flow should be tested after publishing to GitHub Pages, Cloudflare Pages, or Netlify.

## Change contact details

Search and replace these values:

```text
alexzaxa70@gmail.com
@___zaxoss
https://www.instagram.com/___zaxoss/
```

They appear in `index.html`, `privacy.html`, and this README.

## Change domain / SEO placeholders

Before publishing with a real domain, update:

- `https://your-domain.example/` in `index.html`
- `https://your-domain.example/privacy.html` in `privacy.html`
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


## Prefilled request links

Demo and package buttons use query parameters such as `?style=cafe#contact` or `?package=business#contact`.
When a visitor clicks a “Request this style” button, the contact form automatically fills the business type, website type, message, hidden request context, and email subject. This helps the visitor understand what to write and helps Alex know which preview/package they selected.

Available style values:

- `style=cafe`
- `style=restaurant`
- `style=digital-menu`
- `style=shop`
- `style=service-business`
- `style=personal-brand`

Available package values:

- `package=starter`
- `package=business`
- `package=premium-redesign`



## Security / privacy notes

This project is static, so there is no server-side login area or database in the files. The main risks are broken links, spam through the contact form, unsafe third-party links, and weak hosting headers.

Included hardening:

- `_headers` for Cloudflare Pages and Netlify with frame protection, nosniff, referrer policy, permissions policy, and CSP.
- `.htaccess` fallback headers for Apache hosting, plus `Options -Indexes` to reduce directory listing risk on Apache.
- External links that open in a new tab use `rel="noopener noreferrer"`.
- The contact form keeps FormSubmit captcha enabled, uses a honeypot, maxlength limits, browser validation, consent checkbox, and double-submit protection.
- The success redirect is set by JavaScript on hosted pages so it works with GitHub Pages project paths, Cloudflare Pages, and Netlify.

After connecting a real domain, update these placeholder values:

- canonical URLs in `index.html` and `privacy.html`
- `og:url` / `og:image` in `index.html`
- `robots.txt`
- `sitemap.xml`

No static header can fully stop spam or guarantee email delivery. Test the form after publishing and keep the first FormSubmit confirmation email.

This project is private and for Alex Zaxa’s use only. It is not open-source, not a public template, and not intended for normal use by anyone other than Alex Zaxa, the creator.
No one may copy, host, publish, resell, redistribute, modify, or use this project or its files without written permission from Alex Zaxa. Unauthorized use is not allowed. If unauthorized use is found, Alex Zaxa reserves the right to seek legal advice and take appropriate legal action.
