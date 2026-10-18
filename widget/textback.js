/*! Never Miss a Lead "Text us" widget + ad tracking, Big Bark Media.
 * <script src="https://nevermiss.bigbark.media/widget/textback.js" data-key="WIDGET_KEY"
 *   data-api="https://api.bigbark.media" data-color="#E6007E" data-position="right" async></script>
 * Optional (docs/ad-tracking.md):
 *   data-swap-numbers="01945 123456, 07700 900123"  show the Google Ads / Meta ads tracking number to visitors who
 *                                                   came from those ads (also any element marked data-nmal-phone)
 *   data-wa-ref           tag wa.me links to the business WhatsApp with "(ref G)" / "(ref M)" / "(ref W)"
 *   data-textus="off"     tracking only, no "Text us" button
 * Visitors from Google Ads (gclid/gbraid/wbraid, or utm_source=google + cpc/paid) or Meta ads (fbclid, or
 * utm_source=facebook/instagram + paid) are remembered for 90 days in this site's localStorage ("nmal_attr").
 * data-key="demo" never touches the network. */
(function () {
  'use strict';
  if (window.__nmalWidget) return;
  window.__nmalWidget = 1;

  var s = document.currentScript || document.querySelector('script[src*="textback"][data-key]');
  if (!s) return;
  var key = s.getAttribute('data-key') || '';
  var api = (s.getAttribute('data-api') || 'https://api.bigbark.media').replace(/\/$/, '');
  var color = s.getAttribute('data-color') || '#E6007E';
  var left = s.getAttribute('data-position') === 'left';
  var demo = key === 'demo';
  if (!/^#[0-9a-f]{3,8}$|^[a-z]+$|^rgb/i.test(color)) color = '#E6007E';

  function mobile(v) {
    var d = (v || '').replace(/[\s\-().]/g, '');
    if (/^07\d{9}$/.test(d)) d = '+44' + d.slice(1);
    else if (/^0?0?447\d{9}$/.test(d)) d = '+' + d.replace(/^0+/, '');
    return /^\+447[1-57-9]\d{8}$/.test(d) ? d : ''; // same rule as the API (no 070/076)
  }

  // ---- Ad attribution (first-party, 90 days) ------------------------------------------------------------------
  var AK = 'nmal_attr', DAYS90 = 7776000000, KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  function classify(a) {
    var src = (a.utm_source || '').toLowerCase(), med = (a.utm_medium || '').toLowerCase(), camp = (a.utm_campaign || '').toLowerCase();
    var paid = /^(cpc|ppc|paid|paid[_-]?social|paidsocial|cpm|ads?|paid[_-]?search)$/.test(med);
    if (a.gclid || a.gbraid || a.wbraid || (src === 'google' && paid)) return 'google';
    if (a.fbclid && !src) return 'meta';
    if (/^(facebook|fb|instagram|ig|meta)$/.test(src) && (paid || a.fbclid)) return 'meta';
    if (/^(gbp|gmb|google[_-]?business[_-]?profile)$/.test(src) || (src === 'google' && /(^|[^a-z])(gbp|gmb)([^a-z]|$)/.test(camp))) return 'gbp';
    return '';
  }
  var attr = null;
  try { attr = JSON.parse(localStorage.getItem(AK) || 'null'); } catch (e) { attr = null; }
  if (attr && !(attr.t > Date.now() - DAYS90 && attr.source)) attr = null;
  (function () {
    var q = {}, n = 0;
    try { new URLSearchParams(location.search).forEach(function (v, k) { k = k.toLowerCase(); if (KEYS.indexOf(k) > -1 && v && v.length <= 200) { q[k] = v; n++; } }); } catch (e) { return; }
    if (!n || attr) return; // first touch wins for 90 days
    var src = classify(q);
    if (!src) return;
    q.source = src; q.t = Date.now(); q.first_seen_at = new Date().toISOString(); q.landing_path = location.pathname.slice(0, 300);
    attr = q;
    try { localStorage.setItem(AK, JSON.stringify(q)); } catch (e) { /* storage blocked: this page view only */ }
  })();

  // ---- Number swapping + wa.me tagging --------------------------------------------------------------------------
  var swapAttr = s.getAttribute('data-swap-numbers'), waRef = s.hasAttribute('data-wa-ref') && s.getAttribute('data-wa-ref') !== 'off';
  function digits(v) {
    var d = (v || '').replace(/[^\d+]/g, '');
    if (d.indexOf('+') === 0) d = d.slice(1).replace(/^44/, '0'); else d = d.replace(/^0044/, '0');
    return d.replace(/\D/g, '');
  }
  var PH = /\+?\(?\d[\d\s().-]{8,17}\d/g;
  function track(cfg) {
    var src = attr && attr.source, to = src && cfg.numbers && cfg.numbers[src];
    var targets = {}, mark = '[data-nmal-phone]';
    (swapAttr && !/^(true|auto|on)$/i.test(swapAttr) ? swapAttr.split(/[,;]/) : []).forEach(function (x) { x = digits(x); if (x.length > 9) targets[x] = 1; });
    function text(node, any) {
      var t = node.nodeValue, hit = 0;
      var r = t.replace(PH, function (m) { var d = digits(m); if (d.length > 9 && d.length < 13 && (any || targets[d])) { hit = 1; return to.display; } return m; });
      if (hit) node.nodeValue = r;
    }
    function walk(el, any) {
      var w = document.createTreeWalker(el, 4, null), n, list = [];
      while ((n = w.nextNode())) if (!/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|OPTION)$/.test(n.parentNode.nodeName)) list.push(n);
      list.forEach(function (x) { text(x, any); });
    }
    function run() {
      if (swapAttr != null && to) {
        [].forEach.call(document.querySelectorAll('a[href^="tel:"],a[href^="sms:"]'), function (a) {
          var h = a.getAttribute('href'), p = h.indexOf(':') + 1, end = h.search(/[?;]/), d = digits(h.slice(p, end > 0 ? end : undefined));
          if (d !== digits(to.e164) && (targets[d] || a.closest(mark))) a.setAttribute('href', h.slice(0, p) + to.e164 + (end > 0 ? h.slice(end) : ''));
        });
        [].forEach.call(document.querySelectorAll(mark), function (el) { walk(el, true); });
        if (Object.keys(targets).length) walk(document.body, false);
      }
      if (waRef && cfg.whatsapp) {
        var code = { google: 'G', meta: 'M', gbp: 'GBP' }[src] || 'W';
        [].forEach.call(document.querySelectorAll('a[href*="wa.me/"],a[href*="whatsapp.com/send"]'), function (a) {
          var u; try { u = new URL(a.href); } catch (e) { return; }
          var num = u.hostname === 'wa.me' ? u.pathname.slice(1) : u.searchParams.get('phone');
          if ((num || '').replace(/\D/g, '') !== cfg.whatsapp) return;
          var msg = (u.searchParams.get('text') || 'Hi ' + cfg.business_name + '!').replace(/\s*\(\s*ref[^)]*\)\s*$/i, '');
          u.searchParams.delete('text');
          var qs = u.searchParams.toString();
          a.setAttribute('href', u.origin + u.pathname + '?' + (qs ? qs + '&' : '') + 'text=' + encodeURIComponent(msg + ' (ref ' + code + ')'));
        });
      }
    }
    run();
    // Page builders often render the header/footer late: re-run on changes for 15 seconds.
    if (window.MutationObserver) {
      var tm, mo = new MutationObserver(function () { clearTimeout(tm); tm = setTimeout(function () { mo.disconnect(); run(); mo.observe(document.body, { childList: true, subtree: true }); }, 250); });
      mo.observe(document.body, { childList: true, subtree: true });
      setTimeout(function () { mo.disconnect(); }, 15000);
    }
  }

  function start(name) {
    var host = document.createElement('div');
    host.setAttribute('data-nmal', '');
    var root = host.attachShadow({ mode: 'open' });
    var side = left ? 'left' : 'right';
    root.innerHTML =
      '<style>' +
      ':host{all:initial}*{box-sizing:border-box;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '.l{position:fixed;bottom:20px;' + side + ':20px;z-index:2147483000;display:flex;align-items:center;gap:8px;' +
      'background:' + color + ';color:#fff;border:0;border-radius:999px;padding:14px 20px;font-size:16px;font-weight:700;cursor:pointer;' +
      'box-shadow:0 6px 20px rgba(0,0,0,.25)}' +
      '.l:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid #ffbf00;outline-offset:2px}' +
      '.p{position:fixed;bottom:84px;' + side + ':20px;z-index:2147483001;width:340px;max-width:calc(100vw - 32px);' +
      'max-height:calc(100vh - 104px);overflow:auto;background:#fff;color:#1a1a2e;border-radius:18px;' +
      'box-shadow:0 18px 50px rgba(0,0,0,.3);padding:20px;font-size:15px;line-height:1.45}' +
      '.p[hidden],.l[hidden]{display:none}' +
      'h2{font-size:19px;margin:0 32px 4px 0;line-height:1.2}' +
      '.sub{margin:0 0 14px;color:#4a4a63;font-size:14px}' +
      'label{display:block;font-weight:600;font-size:14px;margin:10px 0 4px}' +
      'input[type=text],input[type=tel],textarea{width:100%;font-size:16px;padding:10px 12px;border:2px solid #cfd2e0;border-radius:10px;color:#1a1a2e;background:#fff}' +
      'textarea{min-height:76px;resize:vertical}' +
      '[aria-invalid=true]{border-color:#c8323a}' +
      '.c{display:flex;gap:10px;align-items:flex-start;font-weight:400;font-size:14px;margin:12px 0}' +
      '.c input{width:20px;height:20px;margin:1px 0 0;flex:none;accent-color:' + color + '}' +
      '.e{color:#c8323a;font-size:13.5px;font-weight:600;margin:4px 0 0}.e:empty{display:none}' +
      '.go{width:100%;background:' + color + ';color:#fff;border:0;border-radius:999px;padding:13px;font-size:16px;font-weight:700;cursor:pointer}' +
      '.go[disabled]{opacity:.6;cursor:wait}' +
      '.x{position:absolute;top:12px;right:12px;width:36px;height:36px;border:0;background:#f0f1f6;border-radius:50%;font-size:20px;line-height:1;cursor:pointer;color:#1a1a2e}' +
      '.f{font-size:12px;color:#6a6a80;margin:10px 0 0}' +
      '.ok{text-align:center;padding:12px 0}.ok b{display:block;font-size:18px;margin-bottom:6px}.ok small{display:block;margin-top:12px;font-size:13px;opacity:.75;line-height:1.4}' +
      '.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}' +
      '@media(max-width:480px){.p{left:16px;right:16px;width:auto;bottom:80px}.l{bottom:16px;' + side + ':16px}}' +
      '@media(prefers-reduced-motion:no-preference){.p{animation:u .18s ease-out}@keyframes u{from{opacity:0;transform:translateY(8px)}}}' +
      '</style>' +
      '<button class="l" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="p">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Text us</button>' +
      '<div class="p" id="p" role="dialog" aria-modal="true" aria-labelledby="t" hidden>' +
      '<button class="x" type="button" aria-label="Close">&times;</button>' +
      '<div class="b"><h2 id="t"></h2><p class="sub">Leave your number and we\'ll text you back.</p>' +
      '<form novalidate><label for="n">Your name</label><input id="n" type="text" autocomplete="name" maxlength="80">' +
      '<p class="e" id="ne"></p>' +
      '<label for="m">Mobile number</label><input id="m" type="tel" inputmode="tel" autocomplete="tel" placeholder="07123 456789">' +
      '<p class="e" id="me"></p>' +
      '<label for="q">How can we help?</label><textarea id="q" maxlength="500"></textarea>' +
      '<p class="e" id="qe"></p>' +
      '<div class="hp" aria-hidden="true"><label for="w">Website</label><input id="w" type="text" tabindex="-1" autocomplete="off"></div>' +
      '<label class="c"><input id="k" type="checkbox"><span>I agree to receive text replies about my enquiry.</span></label>' +
      '<p class="e" id="ke"></p><p class="e" id="fe" role="alert"></p>' +
      '<button class="go" type="submit">Send</button>' +
      '<p class="f">UK mobiles only. Reply STOP to any text to opt out.</p></form></div></div>';

    var $ = function (q) { return root.querySelector(q); };
    var btn = $('.l'), panel = $('.p'), form = $('form'), body = $('.b');
    $('#t').textContent = 'Text ' + name;

    function open() {
      panel.hidden = false; btn.setAttribute('aria-expanded', 'true');
      setTimeout(function () { var f = $('#n'); (f || $('.x')).focus(); }, 30);
    }
    function close() {
      panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus();
    }
    btn.addEventListener('click', function () { panel.hidden ? open() : close(); });
    $('.x').addEventListener('click', close);
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = [].filter.call(panel.querySelectorAll('button,input,textarea'), function (el) {
        return el.tabIndex >= 0 && !el.disabled && el.offsetParent !== null;
      });
      var first = f[0], last = f[f.length - 1], a = root.activeElement;
      if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    });

    function err(id, msg, field) {
      $('#' + id).textContent = msg;
      if (field) {
        field.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (msg) field.setAttribute('aria-describedby', id); else field.removeAttribute('aria-describedby');
      }
      return !msg;
    }

    function done() {
      body.innerHTML = '<div class="ok" role="status" tabindex="-1"><b>Thanks, message sent</b>' +
        'We\'ve sent you a text. ' + '<span></span> will reply by text as soon as they can.' +
        '<small>Not had a text in a few minutes? If you\'ve ever replied STOP to our texts, reply START to that number to ' +
        'switch them back on, or we\'ll give you a call.</small></div>';
      body.querySelector('span').textContent = name;
      body.firstChild.focus();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = $('#n'), m = $('#m'), q = $('#q'), k = $('#k'), go = $('.go');
      var num = mobile(m.value), ok = true;
      ok = err('ne', n.value.trim() ? '' : 'Please enter your name.', n) && ok;
      ok = err('me', num ? '' : 'Please enter a UK mobile number starting 07.', m) && ok;
      ok = err('qe', q.value.trim() ? '' : 'Please add a short message.', q) && ok;
      ok = err('ke', k.checked ? '' : 'Please tick the box so we can text you.', k) && ok;
      err('fe', '');
      if (!ok) { var bad = form.querySelector('[aria-invalid=true]'); if (bad) bad.focus(); return; }
      if ($('#w').value) { done(); return; }
      go.disabled = true; go.textContent = 'Sending…';
      if (demo) { setTimeout(done, 700); return; }
      fetch(api + '/api/widget/textback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widget_key: key, name: n.value.trim(), mobile: num, message: q.value.trim(), consent: true, website: $('#w').value, attribution: attr || { landing_path: location.pathname.slice(0, 300) } })
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return [r.status, j]; }); })
        .then(function (x) {
          if (x[1] && x[1].ok) return done();
          go.disabled = false; go.textContent = 'Send';
          err('fe', x[0] === 429 ? 'Too many messages just now. Please try again later or give us a call.' :
            (x[1] && x[1].message) || 'That didn\'t send. Please check your details and try again.');
        })
        .catch(function () {
          go.disabled = false; go.textContent = 'Send';
          err('fe', 'That didn\'t send. Please check your connection and try again, or give us a call.');
        });
    });

    document.body.appendChild(host);
  }

  var button = s.getAttribute('data-textus') !== 'off';
  function boot() {
    if (demo) {
      var dn = s.getAttribute('data-name') || 'Paws & Progress';
      track({ business_name: dn, whatsapp: '447700900100', numbers: { google: { e164: '+447700900111', display: '07700 900111' }, meta: { e164: '+447700900222', display: '07700 900222' } } });
      return button && start(dn);
    }
    if (!key) return;
    fetch(api + '/api/widget/config?key=' + encodeURIComponent(key))
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j) return;
        if (j.numbers) track(j);
        if (j.ok && j.business_name && button) start(j.business_name);
      })
      .catch(function () { /* stay hidden: a form that can't send is worse than none */ });
  }
  if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
