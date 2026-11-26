// Builds the static /guides/ section from the Markdown files in content/guides/.
// Usage: node content/build-guides.js   (needs the "marked" package)
const fs = require('fs'), path = require('path');
let marked; for (const p of ['marked', path.join(process.env.NODE_GLOBAL_ROOT || '', 'marked')]) { try { ({ marked } = require(p)); break; } catch (e) {} }
if (!marked) { console.error('marked not found: npm install marked'); process.exit(2); }
const ROOT = path.resolve(__dirname, '..'), SRC = path.join(__dirname, 'guides'), O = 'https://www.apollogrouptv.ca/';
const UPDATED = process.env.GUIDES_DATE || new Date().toISOString().slice(0, 10);
const ORDER = ['what-is-iptv', 'choosing-a-plan', 'ordering-and-interac-payment', 'five-devices-one-account', 'internet-speed-for-streaming', 'wifi-vs-ethernet', 'router-settings-for-streaming', 'fix-buffering', 'streaming-data-usage', 'streaming-while-travelling', 'cutting-cable-checklist'];
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// Google Analytics 4 (inline, loads gtag.js after the page has loaded).
const GA = '<script>(function(){var id="G-QBG708E9DH";window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",id);function l(){var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+id;document.head.appendChild(s)}if(document.readyState==="complete")setTimeout(l,0);else addEventListener("load",function(){setTimeout(l,0)})})()</script>';
const ld = o => '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, '\\u003c') + '</script>';
const home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const fontHead = '    ' + home.match(/<style>@font-face[\s\S]*?<\/style>\n/)[0].replace(/@media \(max-width:640px\)\{#home[^}]*\}\}/, '');
const cssHref = '/assets/index-v4.css';
const org = { '@type': 'Organization', '@id': O + '#organization', name: 'Apollo Group TV Canada', url: O, logo: { '@type': 'ImageObject', url: O + 'logo-512.png', width: 512, height: 512 } };
const site = { '@type': 'WebSite', '@id': O + '#website', url: O, name: 'Apollo Group TV Canada', inLanguage: 'en-CA', publisher: { '@id': O + '#organization' } };
const STYLE = `<style>
.g-wrap{max-width:46rem;margin:0 auto;padding:0 1.25rem}
.g-top{border-bottom:1px solid hsl(var(--border));background:hsl(var(--background))}
.g-top .g-wrap{display:flex;align-items:center;justify-content:space-between;gap:1rem;min-height:4rem;max-width:64rem;flex-wrap:wrap;padding-top:.5rem;padding-bottom:.5rem}
.g-brand{display:flex;align-items:center;gap:.6rem;font-family:Montserrat,"Montserrat Fallback",sans-serif;font-weight:700;color:hsl(var(--foreground));text-decoration:none}
.g-nav{display:flex;gap:1.25rem;flex-wrap:wrap;font-size:.95rem}
.g-nav a,.g-foot a{color:hsl(var(--muted-foreground));text-decoration:underline;text-underline-offset:3px;padding:.5rem 0;display:inline-block}
.g-nav a:hover,.g-foot a:hover{color:hsl(var(--primary))}
.g-crumb{font-size:.875rem;color:hsl(var(--muted-foreground));margin:2rem 0 1rem}
.g-crumb a{color:hsl(var(--primary));text-decoration:underline;text-underline-offset:3px}
.g-art h1{font-family:Montserrat,"Montserrat Fallback",sans-serif;font-weight:800;font-size:clamp(1.9rem,5vw,2.75rem);line-height:1.15;color:hsl(var(--foreground));margin:0 0 .75rem}
.g-meta{color:hsl(var(--muted-foreground));font-size:.9rem;margin-bottom:2rem}
.g-art h2{font-family:Montserrat,"Montserrat Fallback",sans-serif;font-weight:700;font-size:1.5rem;line-height:1.25;color:hsl(var(--foreground));margin:2.5rem 0 .9rem}
.g-art h3{font-weight:600;font-size:1.125rem;color:hsl(var(--foreground));margin:1.75rem 0 .5rem}
.g-art p,.g-art li{color:hsl(0 0% 82%);line-height:1.75;font-size:1.0625rem}
.g-art p{margin:0 0 1.1rem}
.g-art .g-lead{font-size:1.2rem;color:hsl(var(--foreground))}
.g-art ul,.g-art ol{margin:0 0 1.25rem;padding-left:1.4rem}
.g-art ul{list-style:disc}.g-art ol{list-style:decimal}
.g-art li{margin-bottom:.45rem}
.g-art strong{color:hsl(var(--foreground));font-weight:600}
.g-art a{color:hsl(var(--primary));text-decoration:underline;text-underline-offset:3px}
.g-tablewrap{overflow-x:auto;margin:0 0 1.5rem;border:1px solid hsl(var(--border));border-radius:.75rem}
.g-art table{width:100%;border-collapse:collapse;font-size:.975rem;min-width:28rem}
.g-art th,.g-art td{text-align:left;padding:.7rem .9rem;border-bottom:1px solid hsl(var(--border));color:hsl(0 0% 85%);vertical-align:top}
.g-art th{background:hsl(var(--secondary));color:hsl(var(--foreground));font-weight:600}
.g-art tr:last-child td{border-bottom:0}
.g-cta{margin:3rem 0;padding:1.5rem;border:1px solid hsl(var(--border));border-radius:.9rem;background:hsl(var(--card))}
.g-cta p{margin:0 0 1rem}
.g-btn{display:inline-block;background:hsl(var(--primary));color:hsl(var(--primary-foreground))!important;font-weight:700;padding:.85rem 1.5rem;border-radius:.6rem;text-decoration:none!important}
.g-list{list-style:none!important;padding:0!important;display:grid;gap:1rem}
.g-list li{border:1px solid hsl(var(--border));border-radius:.9rem;background:hsl(var(--card));padding:1.1rem 1.25rem;margin:0}
.g-list a{font-weight:600;font-size:1.125rem}
.g-list p{margin:.35rem 0 0;font-size:.975rem;color:hsl(var(--muted-foreground))}
.g-foot{border-top:1px solid hsl(var(--border));margin-top:4rem;padding:2rem 0 3rem;font-size:.9rem;color:hsl(var(--muted-foreground))}
.g-foot nav{display:flex;flex-wrap:wrap;gap:.25rem 1.25rem;margin-bottom:1rem}
</style>`;
const NAV = [['/', 'Home'], ['/#pricing', 'Plans'], ['/guides/', 'Guides'], ['/faq/', 'FAQ'], ['/contact/', 'Contact']];
const FOOT = [['/about-us/', 'About'], ['/guides/', 'Guides'], ['/faq/', 'FAQ'], ['/contact/', 'Contact'], ['/privacy-policy/', 'Privacy Policy'], ['/refund-policy/', 'Refund Policy'], ['/terms-and-conditions/', 'Terms & Conditions']];
function page({ url, title, desc, type, graph, body, image }) {
  const img = image || O + 'og-image.jpg';
  return `<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon-48.png?v=2" type="image/png" sizes="48x48" />
    <link rel="icon" href="/favicon-192.png?v=2" type="image/png" sizes="192x192" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
    <meta name="theme-color" content="#080a0c" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:site_name" content="Apollo Group TV Canada" />
    <meta property="og:locale" content="en_CA" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(desc)}" />
    <meta name="twitter:image" content="${img}" />
${fontHead}    <link rel="stylesheet" href="${cssHref}">
    ${STYLE}
    ${ld({ '@context': 'https://schema.org', '@graph': graph })}
    ${GA}
  </head>
  <body>
    <header class="g-top"><div class="g-wrap"><a class="g-brand" href="/"><img src="/favicon-48.png?v=2" alt="" width="28" height="28">Apollo Group TV Canada</a><nav class="g-nav" aria-label="Main">${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav></div></header>
    <main class="g-wrap g-art">${body}</main>
    <footer class="g-foot"><div class="g-wrap"><nav aria-label="Footer">${FOOT.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav><p>Apollo Group TV Canada. Questions? Write to <a href="mailto:support@apollogrouptv.ca">support@apollogrouptv.ca</a>.</p></div></footer>
  </body>
</html>
`;
}
const guides = ORDER.map(slug => {
  const raw = fs.readFileSync(path.join(SRC, slug + '.md'), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/); const fm = Object.fromEntries(m[1].split('\n').map(l => [l.slice(0, l.indexOf(':')).trim(), l.slice(l.indexOf(':') + 1).trim()]));
  return { slug, title: fm.title, desc: fm.description, published: fm.published || '2026-11-23', updated: fm.updated || UPDATED, image: fm.image ? { url: O + fm.image, width: +fm.imageWidth, height: +fm.imageHeight } : null, md: m[2].trim() };
});
const nice = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
for (const g of guides) {
  const url = O + 'guides/' + g.slug + '/';
  let html = marked.parse(g.md, { mangle: false, headerIds: false });
  html = html.replace(/<table>/g, '<div class="g-tablewrap"><table>').replace(/<\/table>/g, '</table></div>').replace('<p>', '<p class="g-lead">');
  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener"');
  const faqPart = g.md.split(/^## Frequently asked questions$/m)[1] || ''; const faqBody = faqPart.split(/^## /m)[0];
  const faqs = [...faqBody.matchAll(/^### (.+)\n\n([\s\S]*?)(?=\n### |\s*$)/gm)].map(x => ({ q: x[1].trim(), a: x[2].trim().replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '') }));
  const related = guides.filter(o => o.slug !== g.slug); const start = ORDER.indexOf(g.slug); const rel = [1, 2, 3].map(k => guides[(start + k) % guides.length]);
  const body = `<p class="g-crumb"><a href="/">Home</a> › <a href="/guides/">Guides</a> › ${esc(g.title)}</p>
<article><h1>${esc(g.title)}</h1><p class="g-meta">By Apollo Group TV Canada · Last updated <time datetime="${g.updated}">${nice(g.updated)}</time></p>
${html}
<div class="g-cta"><p><strong>Ready to try it?</strong> Plans start at $24.99 for 30 days, with no contract and use on up to 5 devices.</p><a class="g-btn" href="/#pricing">View plans and pricing</a></div>
<h2>More guides</h2><ul class="g-list">${rel.map(o => `<li><a href="/guides/${o.slug}/">${esc(o.title)}</a><p>${esc(o.desc)}</p></li>`).join('')}</ul></article>`;
  const graph = [org, site,
    { '@type': 'Article', '@id': url + '#article', headline: g.title, description: g.desc, datePublished: g.published, dateModified: g.updated, inLanguage: 'en-CA', image: g.image ? { '@type': 'ImageObject', url: g.image.url, width: g.image.width, height: g.image.height } : O + 'og-image.jpg', author: { '@id': O + '#organization' }, publisher: { '@id': O + '#organization' }, mainEntityOfPage: url, isPartOf: { '@id': O + '#website' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: O }, { '@type': 'ListItem', position: 2, name: 'Guides', item: O + 'guides/' }, { '@type': 'ListItem', position: 3, name: g.title, item: url }] }];
  if (faqs.length) graph.push({ '@type': 'FAQPage', '@id': url + '#faq', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  fs.mkdirSync(path.join(ROOT, 'guides', g.slug), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'guides', g.slug, 'index.html'), page({ url, title: (g.title + ' | Apollo Group TV Canada').length <= 60 ? g.title + ' | Apollo Group TV Canada' : g.title, desc: g.desc, type: 'article', graph, body, image: g.image && g.image.url }));
  console.log(g.slug, '| title', (g.title + ' | Apollo Group TV Canada').length, '| desc', g.desc.length, '| faqs', faqs.length);
}
const iurl = O + 'guides/', ititle = 'Streaming Guides | Apollo Group TV Canada', idesc = 'Plain-language guides from Apollo Group TV Canada on IPTV, internet speed, buffering, data use, plans, devices and paying by Interac e-Transfer.';
fs.writeFileSync(path.join(ROOT, 'guides', 'index.html'), page({ url: iurl, title: ititle, desc: idesc, type: 'website', graph: [org, site,
  { '@type': 'CollectionPage', '@id': iurl + '#webpage', url: iurl, name: ititle, description: idesc, isPartOf: { '@id': O + '#website' }, inLanguage: 'en-CA' },
  { '@type': 'ItemList', itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: O + 'guides/' + g.slug + '/', name: g.title })) },
  { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: O }, { '@type': 'ListItem', position: 2, name: 'Guides', item: iurl }] }],
  body: `<p class="g-crumb"><a href="/">Home</a> › Guides</p><h1>Streaming Guides</h1><p class="g-lead">Practical answers about IPTV, your internet connection, devices, plans and payment.</p><ul class="g-list">${guides.map(g => `<li><a href="/guides/${g.slug}/">${esc(g.title)}</a><p>${esc(g.desc)}</p></li>`).join('')}</ul><div class="g-cta"><p><strong>Looking for plans?</strong> Plans start at $24.99 for 30 days, with no contract.</p><a class="g-btn" href="/#pricing">View plans and pricing</a></div>` }));
fs.writeFileSync(path.join(__dirname, 'guides.json'), JSON.stringify(guides.map(g => ({ slug: g.slug, title: g.title, desc: g.desc })), null, 1));
console.log('index | title', ititle.length, '| desc', idesc.length);
