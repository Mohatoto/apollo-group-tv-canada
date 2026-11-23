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
