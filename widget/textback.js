/*! Never Miss a Lead "Text us" widget, Big Bark Media.
 * <script src="https://nevermiss.bigbark.media/widget/textback.js" data-key="WIDGET_KEY"
 *   data-api="https://api.bigbark.media" data-color="#E6007E" data-position="right" async></script>
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
      '.ok{text-align:center;padding:12px 0}.ok b{display:block;font-size:18px;margin-bottom:6px}' +
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
        'We\'ve sent you a text. ' + '<span></span> will reply by text as soon as they can.</div>';
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
        body: JSON.stringify({ widget_key: key, name: n.value.trim(), mobile: num, message: q.value.trim(), consent: true, website: $('#w').value })
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

  function boot() {
    if (demo) return start(s.getAttribute('data-name') || 'Paws & Progress');
    if (!key) return;
    fetch(api + '/api/widget/config?key=' + encodeURIComponent(key))
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j && j.ok && j.business_name) start(j.business_name); })
      .catch(function () { /* stay hidden: a form that can't send is worse than none */ });
  }
  if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
