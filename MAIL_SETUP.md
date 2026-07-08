# Email setup guide for Alex Zaxa

Goal: use a professional address like `hello@yourdomain.gr` or `contact@yourdomain.gr`.

## Best free/simple setup

### Option A — Cloudflare Email Routing
Good for receiving email to a custom address and forwarding it to Gmail.

1. Buy/add your domain in Cloudflare.
2. Go to **Compute > Email Service > Email Routing**.
3. Add your Gmail as a destination address and verify it.
4. Create a route like `hello@yourdomain.gr -> alexzaxa70@gmail.com`.
5. Let Cloudflare add the MX/TXT DNS records.

Important: this is mainly forwarding/receiving. Sending from the custom address may need another SMTP/email provider.

### Option B — Zoho Mail free plan
Good if you want a real inbox that can send and receive from your custom domain.

1. Create a Zoho Mail account.
2. Add your domain.
3. Verify domain ownership with the TXT/CNAME record Zoho gives you.
4. Add Zoho MX records in Cloudflare DNS.
5. Add SPF, DKIM and DMARC records.
6. Create an address like `hello@yourdomain.gr`.

## Do not self-host mail at the start

Self-hosting email usually causes delivery problems unless you configure:

- static public IP
- reverse DNS / PTR
- SPF
- DKIM
- DMARC
- spam reputation
- TLS certificates
- backups
- monitoring

For this website business, use Cloudflare forwarding or Zoho first.

## Contact form email

The website contact form uses FormSubmit and sends quote requests to `alexzaxa70@gmail.com`. After publishing, send one test request and confirm the FormSubmit activation email if it appears.
