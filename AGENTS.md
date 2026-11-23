# Apollo Group TV Canada — working notes for agents

Live site: https://www.apollogrouptv.ca (GitHub Pages behind Cloudflare). Every push to `main` deploys.

## Owner rules (do not break)

- Keep the brand name "Apollo Group TV Canada", the design, layout, images, navigation, prices, plans, order links and the thank-you page exactly as they are.
- Never add "official", "authorized", "licensed" or any affiliation claim. Never name channels, networks, teams or leagues as included. Never add statements about legality.
- Payment is by Interac e-Transfer only. Never add card logos, "secure checkout", encryption or other payment-security claims.
- The testimonials section is not rendered and stays that way unless the owner supplies real customer evidence.
- Support address: support@apollogrouptv.ca. Order address: apollogrouptvca@gmail.com.
- Never invent statistics, reviews, customers, channel counts, app names or install steps. Facts about the service come only from the live site; outside facts need a cited, authoritative source.
- Cloudflare: free services only. Never change SSL mode, the country firewall rule, DNS, Email Routing, HSTS or security headers.
- Never delete or overwrite existing files; add new versions instead (e.g. `index-v6.js`).

## Layout

- `index.html`, `about-us/`, `faq/`, `contact/`, `privacy-policy/`, `refund-policy/`, `terms-and-conditions/`, `thank-you/`, `404.html`: prerendered from the compiled bundle in `assets/`.
- `guides/`: static article pages built from Markdown.
- `content/` (not published): sources and build scripts.
  - `content/guides/<slug>.md`: one file per guide (front matter: `title`, `description`).
  - `content/build-guides.js`: builds `guides/` from the Markdown. New guides must also be added to the `ORDER` list in that file.
  - `content/pages/build-pages.js`: rebuilds the main pages; titles and descriptions in `content/pages/pages.json`.
- `sitemap.xml` and `llms.txt` are edited by hand: add every new guide URL to both.
- `tests/` (not published): regression suite.

## Build and test

```
npm install -g marked playwright        # if missing
NODE_GLOBAL_ROOT=$(npm root -g) GUIDES_DATE=YYYY-MM-DD node content/build-guides.js
CHROME_PATH=/usr/bin/google-chrome NODE_GLOBAL_ROOT=$(npm root -g) node content/pages/build-pages.js   # only if main pages changed
cd tests && CHROME_PATH=/usr/bin/google-chrome NODE_GLOBAL_ROOT=$(npm root -g) node regression.js
```

All regression checks must pass before pushing.

## Verifying live

The site only answers visitors from Canada and the US (verified crawlers are exempt), so a sandbox request is usually blocked. Verify through the Cloudflare request tracer (`POST /accounts/{account}/request-tracer/trace` with `context.geoloc.iso_code: "CA"`) and Google Search Console. Purge the Cloudflare cache after each deploy.

Search Console: account `apollogrouptvca@gmail.com` (`/u/6/` in the owner's Chrome), property `sc-domain:apollogrouptv.ca`.

## Google Analytics 4 (installed 2026-11-23)

- Search Console is linked to this GA4 property (2026-11-23, by taoifikagouieze122@gmail.com, who is now a Search Console owner too). Reports > Search Console > Queries / Google organic search traffic show queries next to engagement and key events per landing page: use them in the weekly read. Do not unlink.
- Property `apollogrouptv.ca`, Measurement ID `G-QBG708E9DH`, GA account 291373829, Google account taoifikagouieze122@gmail.com (the one used for the owner's Search Console; this site's Search Console is on apollogrouptvca@gmail.com, GA4 is not).
- Where it lives: an inline snippet before `</head>` in every published HTML page, and the `GA` constant in `content/build-guides.js` and `content/pages/build-pages.js` so rebuilt pages keep it. It is inline on purpose: guides must not load a script file (regression suite).
- Conversions to read: page views of `/thank-you/` (one view = one order form sent). No custom events; do not touch the order links or the thank-you page.
- Every weekly SEO/GEO run and every quality-control run reads GA4 right after the Search Console step, in the owner's browser at https://analytics.google.com (read-only: never change settings, users, data streams, retention or links). Compare the last 28 days with the previous 28 (data starts 2026-11-23; until 28 days exist, compare what exists and say so):
  - Reports > Acquisition > Traffic acquisition: sessions by channel, Organic Search sessions, and AI-assistant referrals (session source containing chatgpt, perplexity, gemini, copilot, claude).
  - Reports > Engagement > Landing page: sessions, engagement rate and key events per landing page.
  - Reports > Engagement > Events: counts of the conversion events above.
- Use it together with Search Console: a page with Search Console clicks but low engagement or no conversions gets its intent match, first screen and call to action fixed (cro, first-screen-check) before more traffic is pushed to it; landing pages that convert well get priority for ranking and internal-link work; pages that receive AI-assistant referrals get priority for ai-seo and citation-gap work.
- Report: add to seo/reports/ and to the owner summary: sessions, organic sessions, AI-assistant sessions and conversions against the previous period, the 5 best and 5 worst landing pages by conversion, and what was changed because of it.
- Rules: never send personal data to GA (names, emails, phone numbers, addresses, anything typed into a form); keep one Google tag only; keep the privacy/cookie text that names Google Analytics accurate when tracking changes; do not add Cloudflare Web Analytics or another analytics script on top. If GA4 cannot be reached, continue without it and say so in the report.
