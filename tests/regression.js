// Regression tests for the static site. Usage: see README.md
const fs = require('fs'), path = require('path'), http = require('http');
let chromium;
for (const p of ['playwright', path.join(process.env.NODE_GLOBAL_ROOT || '', 'playwright')]) {
  try { ({ chromium } = require(p)); break; } catch (e) {}
}
if (!chromium) { console.error('playwright not found: run npm install in tests/'); process.exit(2); }

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://www.apollogrouptv.ca';
const ROUTES = ['/', '/about-us/', '/faq/', '/contact/', '/privacy-policy/', '/refund-policy/', '/terms-and-conditions/', '/thank-you/'];
const NOINDEX = new Set(['/thank-you/']);
// Statements that must not come back unless they become true (see commit history).
const FORBIDDEN = [/credit card/i, /verified checkout/i, /256-bit/i, /bank-level/i, /\bofficial\b/i];
const MIME = { '.woff2': 'font/woff2',  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

function serve() {
  return new Promise(res => {
    const s = http.createServer((q, r) => {
      let p = decodeURIComponent(q.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      const f = path.join(ROOT, p);
      if (/^\/(tests\/|README\.md|_config\.yml)/.test(p) || !f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
        r.writeHead(404, { 'content-type': 'text/html' }); return r.end(fs.readFileSync(path.join(ROOT, '404.html')));
      }
      r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(fs.readFileSync(f));
    }).listen(0, () => res(s));
  });
}

const results = []; let failed = 0;
function check(name, ok, detail = '') { results.push({ name, ok }); if (!ok) failed++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '  -> ' + detail}`); }

(async () => {
  let server, base = process.env.BASE_URL;
  if (!base) { server = await serve(); base = 'http://localhost:' + server.address().port; }
  base = base.replace(/\/$/, '');
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
  const get = async u => { const r = await fetch(u, { redirect: 'manual' }); return { status: r.status, text: await r.text() }; };

  // --- static files
  const robots = await get(base + '/robots.txt');
  check('robots.txt returns 200', robots.status === 200, String(robots.status));
  check('robots.txt references the sitemap', /Sitemap:\s*https:\/\/www\.apollogrouptv\.ca\/sitemap\.xml/.test(robots.text));
  check('robots.txt does not block the site', !/^Disallow:\s*\/\s*$/m.test(robots.text.split(/User-agent:\s*\*/i)[1] || ''));
  const sm = await get(base + '/sitemap.xml');
  const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  check('sitemap.xml returns 200 with URLs', sm.status === 200 && locs.length >= 7, `${sm.status} ${locs.length}`);
  check('sitemap lists only indexable canonical URLs', locs.every(l => l.startsWith(ORIGIN + '/') && !NOINDEX.has(l.replace(ORIGIN, ''))), locs.join(','));
  for (const l of locs) { const r = await get(l.replace(ORIGIN, base)); check(`sitemap URL resolves: ${l.replace(ORIGIN, '')}`, r.status === 200, String(r.status)); }
  const llms = await get(base + '/llms.txt');
  check('llms.txt returns 200', llms.status === 200 && llms.text.startsWith('# '), String(llms.status));
  for (const dev of ['/tests/regression.js', '/tests/package.json', '/README.md', '/_config.yml']) { const x = await get(base + dev); check(`development file is not published: ${dev}`, x.status === 404, String(x.status)); }
  const nf = await get(base + '/this-page-does-not-exist/');
  check('unknown URL returns 404', nf.status === 404, String(nf.status));

  // --- raw HTML (what crawlers that do not run JavaScript see)
  const titles = new Set(), descs = new Set();
  for (const r of ROUTES) {
    const { status, text } = await get(base + r);
    check(`${r} returns 200`, status === 200, String(status));
    const title = (text.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    const desc = (text.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    const canon = (text.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
    const robotsMeta = (text.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
    check(`${r} title is 20-60 chars`, title.length >= 20 && title.length <= 60, `${title.length}: ${title}`);
    check(`${r} description is 70-160 chars`, desc.length >= 70 && desc.length <= 160, String(desc.length));
    check(`${r} canonical is self-referencing`, canon === ORIGIN + r, canon);
    check(`${r} robots meta is correct`, NOINDEX.has(r) ? /noindex/.test(robotsMeta) : /^index/.test(robotsMeta), robotsMeta);
    titles.add(title); descs.add(desc);
    const blocks = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
    let ldOk = blocks.length === 1, types = [];
    try { types = JSON.parse(blocks[0])['@graph'].map(n => n['@type']); } catch (e) { ldOk = false; }
    check(`${r} JSON-LD parses and has Organization + WebSite`, ldOk && types.includes('Organization') && types.includes('WebSite'), types.join(','));
    if (!NOINDEX.has(r)) check(`${r} main heading is in the HTML without JavaScript`, /<h1[\s>]/.test(text.split('<div id="root">')[1] || ''));
    for (const f of FORBIDDEN) check(`${r} raw HTML has no "${f.source}" claim`, !f.test(text.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')));
  }
  check('all titles are unique', titles.size === ROUTES.length, String(titles.size));
  check('all descriptions are unique', descs.size === ROUTES.length, String(descs.size));

  // --- rendered pages, desktop and mobile
  const VIEWS = { desktop: { viewport: { width: 1366, height: 900 } }, mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 } };
  for (const [vname, opts] of Object.entries(VIEWS)) {
    const ctx = await browser.newContext(opts);
    for (const r of ROUTES) {
      const page = await ctx.newPage(); const errors = [], bad = [], thirdParty = [];
      page.on('request', q => { const h = new URL(q.url()).host; if (/fonts\.(googleapis|gstatic)\.com/.test(h)) thirdParty.push(h); });
      page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
      page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|Failed to load resource/.test(m.text())) errors.push(m.text().slice(0, 160)); });
      page.on('response', x => { if (x.status() >= 400 && x.url().startsWith(base)) bad.push(x.status() + ' ' + x.url().replace(base, '')); });
      await page.goto(base + r, { waitUntil: 'load' });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(z => setTimeout(z, 60)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(900);
      const d = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length, text: document.body.innerText,
        broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src),
        noAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        unnamed: [...document.querySelectorAll('button,a')].filter(e => !(e.innerText || '').trim() && !e.getAttribute('aria-label') && !e.querySelector('img[alt]:not([alt=""])')).length,
        links: [...new Set([...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')))],
      }));
      const tag = `[${vname}] ${r}`;
      check(`${tag} no JavaScript errors`, errors.length === 0, errors.join(' | '));
      check(`${tag} no failed requests`, bad.length === 0, bad.join(' | '));
      check(`${tag} fonts are served from the site itself`, thirdParty.length === 0, thirdParty.join(','));
      check(`${tag} no broken images`, d.broken.length === 0, d.broken.join(','));
      check(`${tag} every image has alt text`, d.noAlt === 0, String(d.noAlt));
      check(`${tag} no horizontal overflow`, d.overflow <= 1, d.overflow + 'px');
      check(`${tag} buttons and links have accessible names`, d.unnamed === 0, String(d.unnamed));
      if (!NOINDEX.has(r)) check(`${tag} exactly one H1`, d.h1 === 1, String(d.h1));
      for (const f of FORBIDDEN) check(`${tag} no "${f.source}" claim in visible text`, !f.test(d.text));
      if (vname === 'desktop') for (const h of d.links.filter(h => h.startsWith('/') )) { const x = await get(base + h.split('#')[0]); check(`${r} internal link works: ${h}`, x.status === 200, String(x.status)); }
      if (r === '/') {
        check(`${tag} payment section states the real method`, /How Payment Works/.test(d.text) && /Interac e-Transfer/.test(d.text));
        check(`${tag} four plans with prices are shown`, ['24.99', '51.99', '89.99', '159.99'].every(p => d.text.includes(p)));
        check(`${tag} footer links to all main pages`, ['/about-us/', '/faq/', '/contact/', '/privacy-policy/', '/refund-policy/', '/terms-and-conditions/'].every(h => d.links.includes(h)), d.links.join(','));
        if (vname === 'mobile') {
          const btn = page.locator('button[aria-label="Open menu"]');
          check(`${tag} menu button is labelled`, await btn.count() === 1);
          await btn.click(); await page.waitForTimeout(300);
          check(`${tag} menu opens and can be closed`, await page.locator('button[aria-label="Close menu"]').count() === 1);
        }
      }
      if (r === '/faq/') {
        const q = page.getByRole('button', { name: 'How can I pay?' }); await q.click(); await page.waitForTimeout(400);
        check(`${tag} FAQ accordion opens and shows the answer`, /Interac e-Transfer/.test(await page.evaluate(() => document.body.innerText)));
      }
      await page.close();
    }
    await ctx.close();
  }
  // --- layout stability: web fonts arriving late must not move the page
  for (const [vname, vp] of [['desktop', { width: 1350, height: 940 }], ['laptop', { width: 1920, height: 1080 }], ['tablet', { width: 820, height: 1180 }], ['mobile', { width: 412, height: 823 }], ['small', { width: 360, height: 740 }]]) {
    const ctx = await browser.newContext({ viewport: vp }); const page = await ctx.newPage();
    await page.route(/\.woff2(\?|$)/, async r => { await new Promise(z => setTimeout(z, 600)); r.continue(); });
    await page.addInitScript(() => { window.__cls = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(2400);
    const cls = await page.evaluate(() => window.__cls);
    check(`[${vname}] layout shift with late fonts is under 0.1`, cls < 0.1, cls.toFixed(4));
    await ctx.close();
  }
  await browser.close(); if (server) server.close();
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
