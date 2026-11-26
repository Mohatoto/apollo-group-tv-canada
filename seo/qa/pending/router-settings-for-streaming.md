# Pending QC: Best Router Settings for Streaming TV at Home

- Date written: 2026-11-26 (catch-up for the missed Wednesday article run)
- Branch: seo/article-2026-11-26
- Planned live URL: https://www.apollogrouptv.ca/guides/router-settings-for-streaming/
- Source: content/guides/router-settings-for-streaming.md (built with `GUIDES_DATE=2026-11-23 node content/build-guides.js` so existing guides keep their 2026-11-23 date; the new guide carries its own `published`/`updated` front matter = 2026-11-26)
- Brief: seo/briefs/router-settings-for-streaming.md
- Images: 3 original WebP diagrams in guides/router-settings-for-streaming/ (credits in seo/images.md and in each figcaption)
- Article body: about 2,870 words (text inside <article> before "More guides"), 5 visible FAQ questions, 11 dated sources
- Regression suite: 1004/1004 checks passed locally (tests/regression.js)
- GA4 inline snippet G-QBG708E9DH present in the new page (and unchanged in all others)

## What QC should check first

1. The DNS paragraph ("Settings that rarely help" and the last FAQ) has no citation: add a source or trim it.
2. The 5 GHz width suggestion ("Auto or 80 MHz; try 40 MHz if unsteady") is editorial advice derived from TP-Link's general width trade-off, not a quoted vendor recommendation.
3. Existing pages changed only by links: fix-buffering and wifi-vs-ethernet (one contextual sentence each), and the auto-generated "More guides" lists of five-devices-one-account, internet-speed-for-streaming and wifi-vs-ethernet (the build rotates related guides by ORDER; the new guide was placed after wifi-vs-ethernet so only these three lists change). guides/index.html lists the new guide.
4. seo/ is NOT excluded in `_config.yml` (the writer left that file untouched under the freeze), so GitHub Pages will publish the seo/*.md notes as plain files. Decide whether to exclude `seo` (one line) or move the notes.
5. Independent sub-agent review was not run by the writer (no Agent tool in this session): QC's own two-reviewer pass is the first independent review.
6. Live verification must go through the Cloudflare request tracer with geoloc CA (AGENTS.md).
