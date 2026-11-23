// Prerenders the main pages (home, about, faq, contact, policies, thank-you, 404) from the
// compiled bundle into static HTML with per-page metadata and JSON-LD.
// Usage (from the repo root): CHROME_PATH=/usr/bin/google-chrome node content/pages/build-pages.js
// Page titles and descriptions: content/pages/pages.json. FAQ structured data: content/pages/faq.json.
const path=require('path'),fs=require('fs'),{execSync,spawn}=require('child_process');
const G=process.env.NODE_GLOBAL_ROOT||'';const req=m=>{try{return require(m)}catch(e){return require(path.join(G,m))}};const {chromium}=req('playwright');
const R=path.resolve(__dirname,'..','..')+'/',O='https://www.apollogrouptv.ca/';
const CSS=fs.readFileSync(R+'assets/index-v4.css','utf8');
const pages=JSON.parse(fs.readFileSync(path.join(__dirname,'pages.json'))),faq=JSON.parse(fs.readFileSync(path.join(__dirname,'faq.json')));
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const un=s=>JSON.parse('"'+s+'"');
// Google Analytics 4 (inline, loads gtag.js after the page has loaded).
const GA = '<script>(function(){var id="G-QBG708E9DH";window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",id);function l(){var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+id;document.head.appendChild(s)}if(document.readyState==="complete")setTimeout(l,0);else addEventListener("load",function(){setTimeout(l,0)})})()</script>';
const ld=o=>'<script type="application/ld+json">'+JSON.stringify(o).replace(/</g,'\\u003c')+'</script>';
const org={"@type":"Organization","@id":O+"#organization","name":"Apollo Group TV Canada","url":O,"logo":{"@type":"ImageObject","url":O+"logo-512.png","width":512,"height":512},"areaServed":{"@type":"Country","name":"Canada"}};
const site={"@type":"WebSite","@id":O+"#website","url":O,"name":"Apollo Group TV Canada","inLanguage":"en-CA","publisher":{"@id":O+"#organization"}};
const plans=[["Starter","24.99","30 Days"],["Growth","51.99","90 Days"],["Elite","89.99","180 Days"],["Professional","159.99","365 Days"]];
function graph(r,p){
  const url=O+r, g=[org,site,{"@type":r==='faq/'?"FAQPage":r==='about-us/'?"AboutPage":r==='contact/'?"ContactPage":"WebPage","@id":url+"#webpage","url":url,"name":p.title,"description":p.desc,"isPartOf":{"@id":O+"#website"},"about":{"@id":O+"#organization"},"inLanguage":"en-CA"}];
  if(r==='') g.push({"@type":"Service","@id":O+"#service","name":"Apollo Group TV Canada IPTV subscription","serviceType":"IPTV streaming subscription","provider":{"@id":O+"#organization"},"areaServed":{"@type":"Country","name":"Canada"},
    "offers":plans.map(([n,pr,d])=>({"@type":"Offer","name":n+" plan ("+d+")","price":pr,"priceCurrency":"CAD","url":O+"#pricing"}))});
  if(r==='faq/') g[2].mainEntity=faq.map(([q,a])=>({"@type":"Question","name":un(q),"acceptedAnswer":{"@type":"Answer","text":un(a)}}));
  if(r!=='') g.push({"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":O},{"@type":"ListItem","position":2,"name":p.name,"item":url}]});
  return {"@context":"https://schema.org","@graph":g};
}
function html(r,p,body){
  const url=O+r, robots=p.noindex?'noindex, follow':'index, follow, max-image-preview:large';
  return `<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(p.title)}</title>
    <meta name="description" content="${esc(p.desc)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon-48.png?v=2" type="image/png" sizes="48x48" />
    <link rel="icon" href="/favicon-192.png?v=2" type="image/png" sizes="192x192" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
    <meta name="theme-color" content="#080a0c" />
    <meta property="og:title" content="${esc(p.title)}" />
    <meta property="og:description" content="${esc(p.desc)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${O}og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Apollo Group TV Canada" />
    <meta property="og:locale" content="en_CA" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.title)}" />
    <meta name="twitter:description" content="${esc(p.desc)}" />
    <meta name="twitter:image" content="${O}og-image.jpg" />
${r===''?'    <link rel="preload" as="image" href="/assets/hero-bg2-828.webp" type="image/webp" media="(max-width: 640px)" fetchpriority="high" />\n    <link rel="preload" as="image" href="/assets/hero-bg2-45zXJL2v.webp" type="image/webp" media="(min-width: 641px)" fetchpriority="high" />\n':''}    <style>@font-face{font-family:Montserrat;font-style:normal;font-weight:100 900;font-display:swap;src:url(/assets/fonts/montserrat-latin-wght-normal.woff2) format("woff2")}@font-face{font-family:Inter;font-style:normal;font-weight:100 900;font-display:swap;src:url(/assets/fonts/inter-latin-wght-normal.woff2) format("woff2")}@font-face{font-family:"Montserrat Fallback";src:local("Arial"),local("Liberation Sans"),local("Helvetica");size-adjust:113%;ascent-override:85.8%;descent-override:22.2%;line-gap-override:0%}@font-face{font-family:"Inter Fallback";src:local("Arial"),local("Liberation Sans"),local("Helvetica");size-adjust:108%;ascent-override:89.7%;descent-override:22.3%;line-gap-override:0%}@media (max-width:640px){#home>div:first-child{background-image:url(/assets/hero-bg2-828.webp)!important}}</style>
    <script type="module" crossorigin src="/assets/index-v5.js"></script>
    <style>${CSS}</style>
    ${ld(graph(r,p))}
    ${GA}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`;}
(async()=>{
  // pass 1: shells
  for(const r in pages) fs.writeFileSync(R+r+'index.html',html(r,pages[r],''));
  const srv=spawn('python3',['-m','http.server','8766','--directory',R],{stdio:'ignore'}); await new Promise(z=>setTimeout(z,1200));
  const b=await chromium.launch({executablePath:process.env.CHROME_PATH||undefined,args:['--no-sandbox']});
  for(const r in pages){
    let body='';
    if(!pages[r].noindex){
      const p=await b.newPage({viewport:{width:1280,height:900}});
      
      await p.goto('http://localhost:8766/'+r,{waitUntil:'load'}); await p.waitForTimeout(1200);
      body=await p.evaluate(()=>document.getElementById('root').innerHTML);
      body=body.split('http://localhost:8766/').join('/');
      await p.close();
    }
    fs.writeFileSync(R+r+'index.html',html(r,pages[r],body));
    console.log(r||'/',pages[r].title.length,pages[r].desc.length,'body',body.length);
  }
  await b.close(); srv.kill();
  // 404 page
  fs.writeFileSync(R+'404.html',html('',{title:'Page not found | Apollo Group TV Canada',desc:'This page could not be found on Apollo Group TV Canada.',name:'404',noindex:true},'').replace(/\s*<link rel="canonical"[^>]*>/,'').replace(/\s*<meta property="og:url"[^>]*>/,'').replace(/\s*<link rel="preload" as="image"[^>]*>/,'').replace(/\s*<script type="application\/ld\+json">.*?<\/script>/s,''));
})();
