# -*- coding: utf-8 -*-
"""Generates the static samarahealth.in website into ../site (run: python3 build.py)."""
import json, os, html
from content import T

OUT = __import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), '..')
VERSION = '2.0.0'
SITE = 'https://samarahealth.in'
PHONE1, PHONE1_T = '+91 99767 35577', '+919976735577'
PHONE2, PHONE2_T = '+91 73959 61616', '+917395961616'
WA = '917395961616'
SAL = 'https://samaraassistedliving.com/'
LINKS = {
    'careers': SAL + 'careers.html', 'rooms': SAL + 'rooms.html', 'packages': SAL + 'packages.html',
    'family': 'https://family.samaraassistedliving.com', 'staff': 'https://app.samaraassistedliving.com/',
    'maps': 'https://www.google.com/maps/search/?api=1&query=Samara+Assisted+Living+Mogappair+Chennai',
}

def t(key, tag='span', cls='', extra=''):
    c = f' class="{cls}"' if cls else ''
    return f'<{tag}{c} data-i18n="{key}"{extra}>{html.escape(T[key][0])}</{tag}>'

ICON = {
 'heart': '<path d="M12 21s-7.5-4.6-9.5-9.2C1.1 8.4 3.3 5 6.8 5c2 0 3.5 1.1 5.2 3 1.7-1.9 3.2-3 5.2-3 3.5 0 5.7 3.4 4.3 6.8C19.5 16.4 12 21 12 21z"/>',
 'shield': '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
 'eye': '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z"/>',
 'chat': '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z"/>',
 'pin': '<path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
 'check': '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 'arrow': '<path d="M5 12h14M13 6l6 6-6 6"/>',
 'nurse': '<path d="M12 3v6M9 6h6"/><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/>',
 'bed': '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/>',
 'pill': '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="m9.5 8.4 5 7.2"/>',
 'steth': '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M10 12v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="11" r="2"/>',
 'walk': '<circle cx="13" cy="4" r="2"/><path d="m10 21 2-6 3 3v3M9 12l2-4 4 2 3 3M11 8l-3 4"/>',
 'leaf': '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19 14 10"/>',
 'home': '<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 'activity': '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
 'doc': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
 'receipt': '<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
 'lock': '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 'hospital': '<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M12 7v6M9 10h6"/><path d="M10 21v-4h4v4"/>',
 'repeat': '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'alert': '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17.5v.5"/>',
 'calendar': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
}
def icon(name, cls='ic'):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{ICON[name]}</svg>'

ARROW = lambda: icon("arrow", "ic ic-arrow")
FEATHER = '<img src="assets/samara-feather.png" alt="" width="85" height="120" aria-hidden="true"'

def pic(name, alt, cls='', eager=False, w=1280, h=720):
    load = 'fetchpriority="high"' if eager else 'loading="lazy"'
    c = f' class="{cls}"' if cls else ''
    return (f'<picture{c}><source srcset="assets/photos/{name}.webp" type="image/webp">'
            f'<img src="assets/photos/{name}.jpg" alt="{html.escape(alt)}" width="{w}" height="{h}" {load} decoding="async"></picture>')

def feather(cls=''):
    c = f' class="{cls}"' if cls else ''
    return FEATHER + c + '>'

def ornament():
    return f'<div class="ornament" aria-hidden="true">{feather()}</div>'

NAV = [('index.html', 'nav.home'), ('about.html', 'nav.about'), ('services.html', 'nav.services'),
       ('careers.html', 'nav.careers'), ('contact.html', 'nav.contact')]

def header(active):
    cur = ' aria-current="page"'
    items = ''.join(
        f'<li><a href="{h}"{cur if h == active else ""}>{t(k)}</a></li>' for h, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<div class="topbar">
  <div class="wrap">
    <div class="tb-left">
      <a class="tb-item" href="tel:{PHONE1_T}">{icon("phone")}{PHONE1}</a>
      <a class="tb-item tb-mail" href="tel:{PHONE2_T}">{icon("phone")}{PHONE2}</a>
      <span class="tb-item tb-addr">{icon("pin")}{t("addr.line")}</span>
    </div>
    <div class="tb-right">
      <span class="tb-item hide-sm">{icon("clock")}{t("top.care")}</span>
      <a class="tb-item" href="https://wa.me/{WA}" rel="noopener">{icon("chat")}WhatsApp</a>
    </div>
  </div>
</div>
<header class="site-header" id="site-header">
  <div class="wrap nav-row">
    <a class="brand" href="index.html" aria-label="Samara Health Care — home">
      <img src="assets/samara-mark.png" alt="Samara" width="720" height="258">
      <span class="brand-sub" data-i18n="brand.sub">{T["brand.sub"][0]}</span>
    </a>
    <nav class="main-nav" id="main-nav" aria-label="Main">
      <ul>{items}</ul>
    </nav>
    <div class="nav-actions">
      <button type="button" class="lang-btn" id="lang-btn" data-i18n-aria="lang.label" aria-label="{T["lang.label"][0]}">{t("lang.switch")}</button>
      <a class="btn btn-primary btn-sm hide-sm" href="contact.html#enquiry">{t("nav.enquire")}</a>
      <button type="button" class="menu-btn" id="menu-btn" aria-controls="main-nav" aria-expanded="false"><span class="bars" aria-hidden="true"></span>{t("menu.open","span","sr")}</button>
    </div>
  </div>
</header>'''

def footer():
    return f'''<footer class="site-footer">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <a class="foot-logo" href="index.html" aria-label="Samara Health Care — home"><img src="assets/samara-mark.png" alt="Samara" width="720" height="258" loading="lazy"></a>
      {t("footer.about","p")}
      {t("tagline","p","foot-tag")}
    </div>
    <div>
      {t("footer.explore","h2")}
      <ul>{''.join(f'<li><a href="{h}">{t(k)}</a></li>' for h, k in NAV)}<li><a href="privacy.html">{t("footer.privacy")}</a></li></ul>
    </div>
    <div>
      {t("footer.centre","h2")}
      <ul>
        <li><a href="{SAL}" rel="noopener">Samara Assisted Living ↗</a></li>
        <li><a href="{LINKS['family']}" rel="noopener">{t("footer.family")} ↗</a></li>
        <li><a href="{LINKS['staff']}" rel="noopener nofollow">{t("footer.staff")} ↗</a></li>
      </ul>
    </div>
    <div>
      {t("footer.reach","h2")}
      <ul class="foot-contact">
        <li><a href="tel:{PHONE1_T}">{icon("phone")}{PHONE1}</a></li>
        <li><a href="tel:{PHONE2_T}">{icon("phone")}{PHONE2}</a></li>
        <li><a href="https://wa.me/{WA}" rel="noopener">{icon("chat")}WhatsApp</a></li>
        <li>{icon("pin")}{t("addr.line")}</li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-base">
    <span>© <span id="year">2026</span> Samara Health Care LLP. {t("footer.rights")}</span>
    {t("footer.emergency")}
  </div>
</footer>
<div class="float-cta" aria-label="Quick contact">
  <a class="fc fc-call" href="tel:{PHONE2_T}" data-i18n-aria="cta.call" aria-label="Call us">{icon("phone")}</a>
  <a class="fc fc-wa" href="https://wa.me/{WA}" rel="noopener" data-i18n-aria="cta.whatsapp" aria-label="WhatsApp">{icon("chat")}</a>
</div>'''

def page(fname, title_key, desc, body, active=None, og_image='assets/photos/centre-signboard.jpg'):
    en_title = T[title_key][0]
    canonical = SITE + '/' + ('' if fname == 'index.html' else fname)
    doc = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(en_title)}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#9c0040">
<meta name="color-scheme" content="light">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Samara Health Care">
<meta property="og:title" content="{html.escape(en_title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE}/{og_image}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css?v={VERSION}">
<script>document.documentElement.classList.add('js')</script>
{LDJSON if fname == 'index.html' else ''}
</head>
<body data-title="{title_key}">
{header(active if active is not None else fname)}
<main id="main">
{body}
</main>
{footer()}
<script src="js/config.js?v={VERSION}"></script>
<script src="js/i18n.js?v={VERSION}"></script>
<script src="js/site.js?v={VERSION}"></script>
</body>
</html>
'''
    with open(os.path.join(OUT, fname), 'w', encoding='utf-8') as f:
        f.write(doc)

LDJSON = '<script type="application/ld+json">' + json.dumps({
    "@context": "https://schema.org", "@type": "MedicalOrganization",
    "name": "Samara Health Care LLP", "url": SITE + "/", "logo": SITE + "/assets/samara-assisted-living-logo.png",
    "telephone": PHONE2_T, "slogan": "Compassion • Comfort • Dignity",
    "address": {"@type": "PostalAddress", "streetAddress": "Samara Assisted Living, Mogappair",
                "addressLocality": "Chennai", "postalCode": "600037", "addressRegion": "Tamil Nadu", "addressCountry": "IN"},
    "sameAs": [SAL]}, ensure_ascii=False) + '</script>'

def cta_band():
    return f'''<section class="band">
  <div class="wrap band-inner">
    <div class="reveal">{feather("band-feather")}{t("home.band.h","h2")}{t("home.band.p","p")}</div>
    <div class="band-actions reveal d1">
      <a class="btn btn-light" href="contact.html#enquiry">{t("cta.enquire")}{ARROW()}</a>
      <a class="btn btn-ghost-light" href="tel:{PHONE2_T}">{icon("phone")}{t("cta.call")}</a>
      <a class="btn btn-ghost-light" href="https://wa.me/{WA}" rel="noopener">{icon("chat")}{t("cta.whatsapp")}</a>
    </div>
  </div>
</section>'''

def page_head(k, h1, lead=None, crumb=None):
    crumbs = f'<p class="crumbs"><a href="index.html">{t("nav.home")}</a> / {t(crumb)}</p>' if crumb else ''
    return f'''<section class="page-head">
  <div class="wrap">
    {feather("ph-feather")}
    <div class="narrow" style="margin-inline:0">
      {crumbs}
      {t(k,"p","kicker")}
      {t(h1,"h1")}
      {t(lead,"p","lead") if lead else ''}
    </div>
  </div>
</section>'''

# ---------------- HOME ----------------
home = f'''<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      {t("home.kicker","p","kicker")}
      <h1>{t("home.h1a")} <em data-i18n="home.h1b">{T["home.h1b"][0]}</em></h1>
      {t("home.lead","p","lead")}
      <div class="hero-actions">
        <a class="btn btn-primary" href="contact.html#enquiry">{t("cta.enquire")}{ARROW()}</a>
        <a class="btn btn-outline" href="services.html">{t("nav.services")}</a>
      </div>
      <p class="hero-note"><span class="dot" aria-hidden="true"></span>{t("home.note")}</p>
    </div>
    <div class="hero-media">
      <div class="arch">{pic("welcome-wall", "The Samara Assisted Living name wall, garlanded on opening day", eager=True)}</div>
      <div class="float-card fc-a">
        <span class="ic-badge">{icon("heart")}</span>
        <div><strong>24×7</strong>{t("home.float.l")}</div>
      </div>
      <figure class="float-card fc-b">
        {pic("centre-building", "Samara Assisted Living building, 23A, Mogappair, Chennai", eager=True, w=720, h=806)}
        <figcaption>{icon("pin")}<span>{t("home.badge")}</span></figcaption>
      </figure>
    </div>
  </div>
</section>
<div class="tag-strip"><p>{feather()}<span data-i18n="tagline">{T["tagline"][0]}</span>{feather()}</p></div>

<section class="glance" aria-label="Care at a glance">
  <div class="wrap">
    <ul class="stats">
      <li class="reveal"><strong data-i18n="home.stat1">24×7</strong>{t("home.stat1l")}</li>
      <li class="reveal d1"><strong data-i18n="home.stat2">3</strong>{t("home.stat2l")}</li>
      <li class="reveal d2"><strong data-i18n="home.stat4">4</strong>{t("home.stat4l")}</li>
      <li class="reveal d3"><strong data-i18n="home.stat3">1</strong>{t("home.stat3l")}</li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <figure class="photo reveal">
      {pic("reception", "Reception and welcome area at Samara Assisted Living")}
      {feather("feather-mark")}
      <figcaption>{t("home.centre.cap")}</figcaption>
    </figure>
    <div class="reveal d1">
      {t("home.centre.k","p","kicker")}
      {t("home.centre.h","h2")}
      {t("home.centre.p","p")}
      <ul class="ticks">
        <li>{icon("check")}{t("home.centre.b1")}</li>
        <li>{icon("check")}{t("home.centre.b2")}</li>
        <li>{icon("check")}{t("home.centre.b3")}</li>
        <li>{icon("check")}{t("home.centre.b4")}</li>
      </ul>
      <div class="row-actions">
        <a class="btn btn-primary" href="services.html">{t("nav.services")}{ARROW()}</a>
        <a class="btn btn-outline" href="{SAL}" rel="noopener">{t("cta.visit_sal")} ↗</a>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="sec-head reveal">{t("home.values.k","p","kicker")}{t("home.values.h","h2")}{t("home.values.p","p")}</div>
    <div class="cards three">
      <article class="card lift reveal"><span class="num" aria-hidden="true">01</span><span class="ic-badge">{icon("heart")}</span>{t("home.v1.h","h3")}{t("home.v1.p","p")}</article>
      <article class="card lift reveal d1"><span class="num" aria-hidden="true">02</span><span class="ic-badge">{icon("shield")}</span>{t("home.v2.h","h3")}{t("home.v2.p","p")}</article>
      <article class="card lift reveal d2"><span class="num" aria-hidden="true">03</span><span class="ic-badge">{icon("eye")}</span>{t("home.v3.h","h3")}{t("home.v3.p","p")}</article>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      {t("home.living.k","p","kicker")}
      {t("home.living.h","h2")}
      {t("home.living.p","p")}
      <ul class="ticks">
        <li>{icon("check")}{t("home.living.b1")}</li>
        <li>{icon("check")}{t("home.living.b2")}</li>
        <li>{icon("check")}{t("home.living.b3")}</li>
      </ul>
      <div class="row-actions">
        <a class="btn btn-outline" href="{LINKS['rooms']}" rel="noopener">{t("svc.rooms.cta")} ↗</a>
      </div>
    </div>
    <figure class="photo alt reveal d1">
      {pic("care-room", "A care room at Samara with adjustable beds and privacy curtains")}
      <figcaption>{t("home.living.cap")}</figcaption>
    </figure>
  </div>
</section>

<section class="section tint">
  <div class="wrap who">
    <blockquote class="quote reveal">
      <p data-i18n="home.who.q">{T["home.who.q"][0]}</p>
      {feather()}
    </blockquote>
    <div class="reveal d1">
      {t("home.who.k","p","kicker")}
      {t("svc.who.h","h2")}
      <ul class="who-list">
        <li>{icon("user")}{t("svc.who1")}</li>
        <li>{icon("hospital")}{t("svc.who2")}</li>
        <li>{icon("walk")}{t("svc.who3")}</li>
        <li>{icon("repeat")}{t("svc.who4")}</li>
      </ul>
    </div>
  </div>
</section>

<section class="section portal">
  <div class="wrap portal-grid">
    <div class="reveal">
      {t("home.digital.k","p","kicker")}
      {t("home.digital.h","h2")}
      {t("home.digital.p","p")}
      <div class="badges">
        <span class="badge">{icon("activity")}{t("home.digital.b1")}</span>
        <span class="badge">{icon("lock")}{t("home.digital.b2")}</span>
      </div>
      <div class="row-actions">
        <a class="btn btn-primary" href="{LINKS['family']}" rel="noopener">{t("footer.family")} ↗</a>
      </div>
    </div>
    <ul class="feature-list reveal d1">
      <li>{icon("calendar")}{t("home.digital.l1")}</li>
      <li>{icon("pill")}{t("home.digital.l2")}</li>
      <li>{icon("activity")}{t("home.digital.l5")}</li>
      <li>{icon("walk")}{t("home.digital.l3")}</li>
      <li>{icon("receipt")}{t("home.digital.l4")}</li>
      <li>{icon("doc")}{t("home.digital.l6")}</li>
    </ul>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="sec-head reveal">{t("home.gal.k","p","kicker")}{t("home.gal.h","h2")}{t("home.gal.p","p")}</div>
    <div class="gallery reveal">
      <figure class="g-video">
        <video controls playsinline preload="none" poster="assets/photos/video-poster.jpg" aria-label="Samara Assisted Living, Mogappair — inauguration video">
          <source src="assets/video/samara-opening.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      </figure>
      <figure>{pic("ribbon-cutting", "Ribbon cutting at the entrance of Samara Assisted Living")}<figcaption>{t("gal.c1")}</figcaption></figure>
      <figure>{pic("lamp-lighting", "Dr. S. Manivannan lighting the traditional lamp")}<figcaption>{t("gal.c2")}</figcaption></figure>
      <figure>{pic("inauguration-dais", "Guests at the inauguration function")}<figcaption>{t("gal.c3")}</figcaption></figure>
      <figure>{pic("honouring-guests", "Honouring guests at the inauguration")}<figcaption>{t("gal.c4")}</figcaption></figure>
    </div>
  </div>
</section>
{cta_band()}'''
page('index.html', 'home.title', 'Samara Health Care LLP — compassionate elder care and post-hospital recovery. Our first centre, Samara Assisted Living, is open in Mogappair, Chennai.', home)

# ---------------- ABOUT ----------------
about = page_head('about.k', 'about.h1', 'about.lead', 'nav.about') + f'''
<section class="section">
  <div class="wrap split">
    <figure class="photo reveal">
      {pic("centre-signboard", "The Samara Assisted Living signboard at our Mogappair centre")}
      {feather("feather-mark")}
      <figcaption>{t("about.photo.cap")}</figcaption>
    </figure>
    <div class="reveal d1">
      {t("about.story.k","p","kicker")}
      {t("about.story.h","h2")}
      {t("about.story.p","p")}
    </div>
  </div>
</section>
<section class="section tint">
  <div class="wrap cards two">
    <article class="card lift reveal"><span class="ic-badge">{icon("leaf")}</span>{t("about.mission.h","h2")}{t("about.mission.p","p")}</article>
    <article class="card lift reveal d1"><span class="ic-badge">{icon("eye")}</span>{t("about.vision.h","h2")}{t("about.vision.p","p")}</article>
  </div>
</section>
<section class="section">
  <div class="wrap narrow">
    <div class="sec-head reveal">{ornament()}{t("about.values.h","h2")}</div>
    <ul class="ticks big reveal">
      <li>{icon("heart")}{t("about.val1")}</li>
      <li>{icon("user")}{t("about.val2")}</li>
      <li>{icon("shield")}{t("about.val3")}</li>
      <li>{icon("eye")}{t("about.val4")}</li>
    </ul>
  </div>
</section>
<section class="section tint">
  <div class="wrap">
    <div class="sec-head reveal">{t("about.lead.h","h2")}{t("about.lead.p","p")}</div>
    <div class="cards two">
      <article class="card person reveal"><span class="avatar" aria-hidden="true">CB</span><div>{t("about.p1","h3")}{t("about.dir","p")}</div></article>
      <article class="card person reveal d1"><span class="avatar" aria-hidden="true">MB</span><div>{t("about.p2","h3")}{t("about.dir","p")}</div></article>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap narrow">
    <div class="reveal">{t("about.time.h","h2")}</div>
    <ol class="timeline reveal">
      <li>{t("about.t1.d","strong")}{t("about.t1.p","p")}</li>
      <li>{t("about.t2.d","strong")}{t("about.t2.p","p")}</li>
      <li>{t("about.t3.d","strong")}{t("about.t3.p","p")}</li>
    </ol>
  </div>
</section>
{cta_band()}'''
page('about.html', 'about.title', 'About Samara Health Care LLP — mission, values and leadership behind Samara Assisted Living, Chennai.', about)

# ---------------- SERVICES ----------------
svc_items = [('nurse', 1), ('hospital', 2), ('pill', 3), ('steth', 4), ('walk', 5), ('leaf', 6), ('heart', 7), ('calendar', 8)]
svc_cards = ''.join(f'<article class="card lift reveal d{(n-1)%4}"><span class="ic-badge">{icon(i)}</span>{t(f"svc.s{n}.h","h3")}{t(f"svc.s{n}.p","p")}</article>' for i, n in svc_items)
faqs = ''.join(f'<details class="reveal"{" open" if n == 1 else ""}><summary>{t(f"faq.q{n}")}</summary>{t(f"faq.a{n}","p")}</details>' for n in range(1, 7))
services = page_head('svc.k', 'svc.h1', 'svc.lead', 'nav.services') + f'''
<section class="section">
  <div class="wrap">
    <div class="sec-head reveal">{t("svc.list.k","p","kicker")}{t("svc.list.h","h2")}</div>
    <div class="cards four">{svc_cards}</div>
  </div>
</section>
<section class="section tint">
  <div class="wrap split">
    <div class="reveal">
      {t("svc.who.h","h2")}
      <ul class="who-list">
        <li>{icon("user")}{t("svc.who1")}</li>
        <li>{icon("hospital")}{t("svc.who2")}</li>
        <li>{icon("walk")}{t("svc.who3")}</li>
        <li>{icon("repeat")}{t("svc.who4")}</li>
      </ul>
    </div>
    <article class="card card-media reveal d1">
      {pic("care-room", "A care room at Samara with adjustable beds")}
      <div class="card-body">
        {t("svc.rooms.h","h2")}
        {t("svc.rooms.p","p")}
        <a class="btn btn-outline" href="{LINKS['rooms']}" rel="noopener">{t("svc.rooms.cta")} ↗</a>
      </div>
    </article>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="sec-head reveal">{t("svc.steps.k","p","kicker")}{t("svc.steps.h","h2")}</div>
    <ol class="steps">
      <li class="reveal">{t("svc.st1.h","h3")}{t("svc.st1.p","p")}</li>
      <li class="reveal d1">{t("svc.st2.h","h3")}{t("svc.st2.p","p")}</li>
      <li class="reveal d2">{t("svc.st3.h","h3")}{t("svc.st3.p","p")}</li>
      <li class="reveal d3">{t("svc.st4.h","h3")}{t("svc.st4.p","p")}</li>
    </ol>
  </div>
</section>
<section class="section tint">
  <div class="wrap narrow">
    <div class="sec-head reveal">{t("svc.faq.k","p","kicker")}{t("svc.faq.h","h2")}</div>
    <div class="faq">{faqs}</div>
    <p class="muted reveal" style="text-align:center;margin-top:28px">{t("faq.more")} <a class="link-arrow" href="contact.html">{t("nav.contact")}{ARROW()}</a></p>
  </div>
</section>
{cta_band()}'''
page('services.html', 'svc.title', 'Our care at Samara Assisted Living: 24x7 nursing, post-hospital recovery, medication safety, physiotherapy, nutrition, daily living support, respite stays, admission steps and FAQs.', services, og_image='assets/photos/care-room.jpg')

# ---------------- CAREERS ----------------
careers = page_head('car.k', 'car.h1', 'car.lead', 'nav.careers') + f'''
<section class="section">
  <div class="wrap split">
    <div class="card card-soft reveal">
      <span class="ic-badge">{icon("nurse")}</span>
      {t("car.roles.h","h2")}
      <ul class="ticks">
        <li>{icon("check")}{t("car.r1")}</li>
        <li>{icon("check")}{t("car.r2")}</li>
        <li>{icon("check")}{t("car.r3")}</li>
        <li>{icon("check")}{t("car.r4")}</li>
      </ul>
    </div>
    <div class="reveal d1">
      {t("car.why.h","h2")}
      <ul class="ticks">
        <li>{icon("check")}{t("car.w1")}</li>
        <li>{icon("check")}{t("car.w2")}</li>
        <li>{icon("check")}{t("car.w3")}</li>
      </ul>
      <div style="margin-top:32px">
      {t("car.apply.h","h3")}
      {t("car.apply.p","p")}
      </div>
      <div class="row-actions">
        <a class="btn btn-primary" href="{LINKS['careers']}" rel="noopener">{t("car.apply.cta")} ↗</a>
        <a class="btn btn-outline" href="https://wa.me/{WA}" rel="noopener">{icon("chat")}{t("cta.whatsapp")}</a>
      </div>
    </div>
  </div>
</section>
<section class="section tint tight">
  <div class="wrap">
    <figure class="photo reveal" style="max-width:980px;margin-inline:auto">
      {pic("reception", "The reception at Samara Assisted Living")}
      <figcaption>{t("home.centre.cap")}</figcaption>
    </figure>
  </div>
</section>'''
page('careers.html', 'car.title', 'Careers at Samara Health Care — nurses, caregivers, physiotherapists and support staff in Chennai.', careers)

# ---------------- CONTACT ----------------
care_opts = ''.join(f'<option value="{T[f"f.care.{i}"][0]}" data-i18n="f.care.{i}">{T[f"f.care.{i}"][0]}</option>' for i in range(1, 7))
contact = page_head('con.k', 'con.h1', 'con.lead', 'nav.contact') + f'''
<section class="section">
  <div class="wrap contact-grid">
    <form class="card form" id="enquiry" novalidate>
      {t("con.form.h","h2")}
      <div class="field">
        <label for="f-resident" data-i18n="f.resident">{T["f.resident"][0]}</label>
        <input id="f-resident" name="resident" autocomplete="off" maxlength="120" required>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-contact" data-i18n="f.contact">{T["f.contact"][0]}</label>
          <input id="f-contact" name="contact" autocomplete="name" maxlength="120" required>
        </div>
        <div class="field field-sm">
          <label for="f-age" data-i18n="f.age">{T["f.age"][0]}</label>
          <input id="f-age" name="age" type="number" inputmode="numeric" min="0" max="120">
        </div>
      </div>
      <div class="field">
        <label for="f-mobile" data-i18n="f.mobile">{T["f.mobile"][0]}</label>
        <div class="phone-input"><span>+91</span><input id="f-mobile" name="mobile" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="14" required aria-describedby="f-mobile-hint"></div>
        <small id="f-mobile-hint" data-i18n="f.mobile.hint">{T["f.mobile.hint"][0]}</small>
      </div>
      <div class="field">
        <label for="f-care" data-i18n="f.care">{T["f.care"][0]}</label>
        <select id="f-care" name="care" required><option value="" data-i18n="f.care.0">{T["f.care.0"][0]}</option>{care_opts}</select>
      </div>
      <div class="field">
        <label for="f-msg" data-i18n="f.msg">{T["f.msg"][0]}</label>
        <textarea id="f-msg" name="message" rows="4" maxlength="1500"></textarea>
      </div>
      <div class="hp" aria-hidden="true"><label for="f-website">Website</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>
      <label class="consent"><input type="checkbox" id="f-consent" name="consent" required> <span><span data-i18n="f.consent">{T["f.consent"][0]}</span> <a href="privacy.html" data-i18n="footer.privacy">{T["footer.privacy"][0]}</a></span></label>
      <p class="form-msg" id="form-msg" role="status" aria-live="polite"></p>
      <button class="btn btn-primary btn-block" type="submit" id="f-send">{t("f.send")}</button>
    </form>
    <aside class="contact-side">
      <div class="card">
        {t("con.info.h","h2")}
        <dl class="info">
          <dt>{icon("phone")}{t("con.phone")}</dt>
          <dd><a href="tel:{PHONE1_T}">{PHONE1}</a><br><a href="tel:{PHONE2_T}">{PHONE2}</a></dd>
          <dt>{icon("chat")}{t("con.wa")}</dt>
          <dd><a href="https://wa.me/{WA}" rel="noopener">{PHONE2}</a></dd>
          <dt>{icon("pin")}{t("con.addr")}</dt>
          <dd>{t("addr.line")}<br><a href="{LINKS['maps']}" rel="noopener">{t("con.map")} ↗</a></dd>
        </dl>
        {t("con.hours","p","muted")}
      </div>
      <figure class="contact-photo" style="margin:0">{pic("centre-signboard", "Samara Assisted Living signboard, Mogappair")}</figure>
      <div class="card emergency">{icon("alert")}{t("footer.emergency","p")}</div>
    </aside>
  </div>
</section>'''
page('contact.html', 'con.title', 'Contact Samara Health Care — send a care enquiry, call or WhatsApp our team at Samara Assisted Living, Mogappair, Chennai.', contact)

# ---------------- PRIVACY ----------------
pv_sections = ''.join(f'{t(f"pv.h.{k}","h2")}{t(f"pv.{k}","p")}' for k in ['what', 'why', 'where', 'keep', 'rights', 'em'])
privacy = page_head('pv.k', 'pv.h1', None, 'footer.privacy') + f'''
<section class="section">
  <div class="wrap narrow prose">{t("pv.p1","p","lead")}{pv_sections}{t("pv.updated","p","muted")}</div>
</section>'''
page('privacy.html', 'pv.title', 'Privacy notice for enquiries made on the Samara Health Care website.', privacy)

# ---------------- 404 ----------------
nf = f'''<section class="page-head nf">
  <div class="wrap narrow">{feather()}{t("nf.h1","h1")}{t("nf.p","p","lead")}<p><a class="btn btn-primary" href="/">{t("nf.cta")}</a></p></div>
</section>'''
page('404.html', 'nf.title', 'Page not found.', nf, active='')

# ---------------- i18n / sitemap ----------------
os.makedirs(os.path.join(OUT, 'js'), exist_ok=True)
dic = {'en': {k: v[0] for k, v in T.items()}, 'ta': {k: v[1] for k, v in T.items()}}
with open(os.path.join(OUT, 'js/i18n.js'), 'w', encoding='utf-8') as f:
    f.write('/* Generated from content.py — English and Tamil text for every page. */\nwindow.SAMARA_I18N=' + json.dumps(dic, ensure_ascii=False, indent=0) + ';\n')
urls = ['', 'about.html', 'services.html', 'careers.html', 'contact.html', 'privacy.html']
with open(os.path.join(OUT, 'sitemap.xml'), 'w') as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            ''.join(f'  <url><loc>{SITE}/{u}</loc></url>\n' for u in urls) + '</urlset>\n')
with open(os.path.join(OUT, 'robots.txt'), 'w') as f:
    f.write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
with open(os.path.join(OUT, 'CNAME'), 'w') as f:
    f.write('samarahealth.in\n')
open(os.path.join(OUT, '.nojekyll'), 'w').close()
print('built', len(T), 'text keys')
