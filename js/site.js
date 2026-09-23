/* Samara Health Care — language toggle, mobile menu, enquiry form */
(function(){
  'use strict';
  var I18N = window.SAMARA_I18N || {en:{},ta:{}};
  var CFG = window.SAMARA_SITE_CONFIG || {};
  var KEY = 'samara-site-lang';
  var lang = 'en';

  function store(get, value){
    try{ if(get) return localStorage.getItem(KEY); localStorage.setItem(KEY, value); }catch(_){}
    return null;
  }
  function tr(key){ return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || ''; }

  function applyLang(next){
    lang = next === 'ta' ? 'ta' : 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var v = tr(el.getAttribute('data-i18n'));
      if(v) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
      var v = tr(el.getAttribute('data-i18n-aria'));
      if(v) el.setAttribute('aria-label', v);
    });
    var tk = document.body.getAttribute('data-title');
    if(tk && tr(tk)) document.title = tr(tk);
  }

  // language: ?lang=ta in the link wins, then the saved choice, else English
  var fromUrl = null;
  try{ fromUrl = new URLSearchParams(location.search).get('lang'); }catch(_){}
  applyLang(fromUrl || store(true) || 'en');
  var langBtn = document.getElementById('lang-btn');
  if(langBtn) langBtn.addEventListener('click', function(){
    var next = lang === 'en' ? 'ta' : 'en';
    applyLang(next); store(false, next);
  });

  // mobile menu
  var menuBtn = document.getElementById('menu-btn'), nav = document.getElementById('main-nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && nav.classList.contains('open')){ nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.focus(); }
    });
  }
  var year = document.getElementById('year');
  if(year) year.textContent = String(new Date().getFullYear());

  // enquiry form
  var form = document.getElementById('enquiry');
  if(!form) return;
  var msg = document.getElementById('form-msg'), send = document.getElementById('f-send');
  var f = function(id){ return document.getElementById(id); };

  function mobileDigits(v){
    var d = String(v || '').replace(/\D/g, '');
    if(d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    if(d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
    return d;
  }
  function show(kind, text, link){
    msg.className = 'form-msg ' + kind;
    msg.textContent = text;
    if(link){
      var a = document.createElement('a');
      a.className = 'btn btn-outline btn-sm'; a.href = link; a.rel = 'noopener'; a.target = '_blank';
      a.textContent = tr('f.fail.cta');
      msg.appendChild(document.createElement('br')); msg.appendChild(a);
    }
  }
  function mark(el, bad){ el.classList.toggle('invalid', !!bad); if(bad) el.setAttribute('aria-invalid','true'); else el.removeAttribute('aria-invalid'); }

  function values(){
    return {
      resident: f('f-resident').value.trim(),
      contact: f('f-contact').value.trim(),
      age: f('f-age').value.trim(),
      mobile: mobileDigits(f('f-mobile').value),
      care: f('f-care').value,
      message: f('f-msg').value.trim(),
      consent: f('f-consent').checked
    };
  }
  function whatsappLink(v){
    var lines = ['Care enquiry (samarahealth.in)',
      'Person needing care: ' + v.resident + (v.age ? ' (' + v.age + ' yrs)' : ''),
      'Contact: ' + v.contact + ', +91 ' + v.mobile,
      'Care needed: ' + v.care];
    if(v.message) lines.push('Details: ' + v.message);
    return 'https://wa.me/' + (CFG.whatsapp || '917395961616') + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = values(), first = null, err = '';
    function need(ok, el, key){ mark(el, !ok); if(!ok && !first){ first = el; err = tr(key); } }
    need(v.resident.length >= 2, f('f-resident'), 'f.err.name');
    need(v.contact.length >= 2, f('f-contact'), 'f.err.name');
    need(/^[6-9]\d{9}$/.test(v.mobile), f('f-mobile'), 'f.err.mobile');
    need(!!v.care, f('f-care'), 'f.err.care');
    need(v.consent, f('f-consent'), 'f.err.consent');
    if(first){ show('err', err); first.focus(); return; }
    if(f('f-website').value){ show('ok', tr('f.ok')); form.reset(); return; } // bot trap

    send.disabled = true; send.textContent = tr('f.sending'); show('', '');
    var body = {
      p_resident_name: v.resident, p_contact_name: v.contact, p_mobile: v.mobile,
      p_age: v.age ? parseInt(v.age, 10) : null, p_care_type: v.care,
      p_message: v.message || null, p_consent: true, p_language: lang
    };
    var done = function(){ send.disabled = false; send.textContent = tr('f.send'); };
    fetch(CFG.supabaseUrl + '/rest/v1/rpc/website_submit_enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': CFG.supabaseKey },
      body: JSON.stringify(body)
    }).then(function(res){
      return res.json().catch(function(){ return {}; }).then(function(data){ return {ok: res.ok, data: data}; });
    }).then(function(r){
      done();
      if(r.ok && r.data && r.data.ok){ show('ok', tr('f.ok')); form.reset(); return; }
      var text = String((r.data && (r.data.message || r.data.error)) || '');
      if(/too many/i.test(text)) { show('err', tr('f.err.many')); return; }
      show('err', tr('f.fail'), whatsappLink(v));
    }).catch(function(){
      done(); show('err', tr('f.fail'), whatsappLink(v));
    });
  });
})();
