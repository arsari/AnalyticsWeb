(function (t, n, i) {
  const a = Math.min;
  const o = Math.floor;
  const s = Number.isNaN;
  function d(e) {
    return e && typeof e === 'object'
      ? !0 === e.mode
        ? e.test_title && e.test_session_name && e.environment
          ? e
          : null
        : null
      : null;
  }
  function l(e) {
    try {
      e = new URL(e);
      const t = new URLSearchParams(e.search);
      const a = t.get('trackingplan_regression_mode');
      if (a === 'true') {
        let r = {
          mode: !0,
          test_title: t.get('trackingplan_regression_test_title'),
          test_session_name: t.get('trackingplan_regression_test_session_name'),
          environment: t.get('trackingplan_regression_environment'),
        };
        if (((r = d(r)), !r)) return void de({ m: 'TP Regression mode init failed - missing required parameters' });
        n.setItem('_trackingplan_regression', JSON.stringify(r)), i.log('TP Regression mode enabled', r);
      } else a === 'false' && (i.log('TP Regression mode disabled'), n.removeItem('_trackingplan_regression'));
    } catch (t) {
      de({ m: 'TP Regression mode init failed - catch' });
    }
  }
  function p() {
    try {
      const e = n.getItem('_trackingplan_regression');
      return e ? d(JSON.parse(e)) : null;
    } catch (t) {
      return null;
    }
  }
  function c(e) {
    try {
      e = new URL(e);
      const t = new URLSearchParams(e.search);
      const i = t.get('trackingplan_live_debug');
      i && (Z(i), n.setItem('_trackingplan_live_debug_mode', 'true'));
    } catch (t) {}
  }
  function m(e) {
    const t = `https://panel.trackingplan.com/plans/${be}/?open_tracks_explorer=true&te_session_id=${e}`;
    i.log(
      `%cTrackingplan Live Debug mode is Enabled.%c\nThe session id is %c${e}%c.\nSee the live session at ${t}\nDisable Live Debug Mode by executing %cTrackingplan.disableLiveDebugMode()`,
      'font-weight: bold;',
      '',
      'font-weight: bold;',
      '',
      'font-style: italic',
    );
  }
  function g(t) {
    if (!ht) {
      (ht = !0), se({ m: 'unload event', e: t.type }), (we = 'beacon');
      const e = { web_vitals: pt, js_error_count: ct, js_warning_count: mt };
      u({ event_name: 'page_unload', properties: e }, !0),
        gt || (u({ event_name: 'pixels', properties: { pixels: X(), sent_at: t.type } }, !0), (gt = !0)),
        O('beacon');
    }
  }
  function u(e, t) {
    const n = { method: 'POST', endpoint: 'TRACKINGPLAN', payload: JSON.stringify(e) };
    D(n, t);
  }
  function h(e) {
    if (De.includes('img'))
      try {
        w(e);
      } catch (t) {
        se(t);
      }
    if (De.includes('xhr'))
      try {
        S(e);
      } catch (t) {
        se(t);
      }
    if (De.includes('beacon'))
      try {
        L(e);
      } catch (t) {
        se(t);
      }
    if (De.includes('form'))
      try {
        A(e);
      } catch (t) {
        se(t);
      }
    if (De.includes('ws'))
      try {
        P(e);
      } catch (t) {
        se(t);
      }
    if (De.includes('fetch'))
      try {
        C(e);
      } catch (t) {
        se(t);
      }
    if (De.includes('performance'))
      try {
        N(e);
      } catch (t) {
        se(t);
      }
  }
  function f() {
    return n.getItem('_trackingplan_initial') === null || Me;
  }
  function _(e) {
    const t = y();
    n.setItem('_trackingplan_initial', JSON.stringify(oe(t, e)));
  }
  function y() {
    try {
      return n.getItem('_trackingplan_initial') === null ? {} : JSON.parse(n.getItem('_trackingplan_initial'));
    } catch (t) {
      return {};
    }
  }
  function v() {
    try {
      if ((n.setItem('_tp_t', 'a'), n.getItem('_tp_t') !== 'a')) return !1;
      if ((n.removeItem('_tp_t'), typeof navigator.sendBeacon !== 'function')) return !1;
    } catch (t) {
      return !1;
    }
    return !0;
  }
  function k(e) {
    return typeof e === 'string' || e instanceof String;
  }
  function b(e) {
    return JSON.stringify(e, (e, t) => (t instanceof Element ? t.nodeType : t));
  }
  function T(e, t) {
    if (t.length === 0) return !0;
    for (let n = 0; n < t.length; n++) {
      if (_e.call(e, 'payload') && typeof e.payload === 'string' && e.payload.indexOf(t[n]) >= 0) return !0;
      if (_e.call(e, 'endpoint') && typeof e.endpoint === 'string' && e.endpoint.indexOf(t[n]) >= 0) return !0;
    }
    return !1;
  }
  function I(e) {
    return !(Ge !== null) || Ge.indexOf(e) >= 0;
  }
  function w(e) {
    const t = e.Object.getOwnPropertyDescriptor(e.HTMLImageElement.prototype, 'src').set;
    e.Object.defineProperty(e.HTMLImageElement.prototype, 'src', {
      set(e) {
        return !k(e) || e.length > 16384
          ? t.apply(this, arguments)
          : (D({ method: 'GET', endpoint: e, protocol: 'img' }), t.apply(this, arguments));
      },
    });
    const n = e.HTMLImageElement.prototype.setAttribute;
    e.HTMLImageElement.prototype.setAttribute = function (e, t) {
      if (e.toLowerCase() == 'src') {
        if (!k(t) || t.length > 16384) return n.apply(this, arguments);
        D({ method: 'GET', endpoint: t, protocol: 'img' });
      }
      return n.apply(this, arguments);
    };
  }
  function x(e) {
    let t = e;
    try {
      t instanceof FormData && (t = JSON.stringify(Object.fromEntries(t)));
    } catch (t) {}
    return t;
  }
  function S(e) {
    const t = e.XMLHttpRequest.prototype.open;
    const n = e.XMLHttpRequest.prototype.send;
    (e.XMLHttpRequest.prototype.open = function (e, n) {
      return (this._tpUrl = n), (this._tpMethod = e), t.apply(this, arguments);
    }),
      (e.XMLHttpRequest.prototype.send = function (e) {
        const t = x(e);
        return (
          E(t, (e) => {
            D({ method: this._tpMethod, endpoint: this._tpUrl, payload: e, protocol: 'xhr' });
          }),
          n.apply(this, arguments)
        );
      });
  }
  function E(e, t) {
    if (e instanceof Blob) {
      const n = new FileReader();
      (n.onload = function () {
        const e = n.result.split(',')[1];
        t(e);
      }),
        n.readAsDataURL(e);
    } else t(e);
  }
  function L(e) {
    const t = e.navigator.sendBeacon;
    e.navigator.sendBeacon = function (e, n) {
      if (!k(e) || e.length > 16384) return t.apply(this, arguments);
      const i = x(n);
      return (
        E(i, (t) => {
          D({ method: 'POST', endpoint: e, payload: t, protocol: 'beacon' });
        }),
        t.apply(this, arguments)
      );
    };
  }
  function C(e) {
    const t = e.fetch;
    e.fetch = function (e, n) {
      let i;
      let a = 'GET';
      let r = null;
      if (typeof e === 'string') i = e;
      else {
        if (!(e instanceof Request)) return t.apply(this, arguments);
        if (((i = e.url), (a = e.method), !e.bodyUsed)) {
          const o = e.clone();
          r = o.body;
        }
      }
      return typeof i !== 'string' || i.length > 16384
        ? t.apply(this, arguments)
        : (void 0 !== n && (n.method && (a = n.method.toUpperCase()), n.body && (r = n.body)),
          D({ method: a, endpoint: i, payload: r, protocol: 'fetch' }),
          t.apply(this, arguments));
    };
  }
  function P(e) {
    const t = e.WebSocket;
    e.WebSocket = function (e, n) {
      return n ? new t(e, n) : new t(e);
    };
    const n = t.prototype.send;
    (t.prototype.send = function (e) {
      return D({ method: 'WS', endpoint: this.url, payload: e, protocol: 'ws' }), n.apply(this, arguments);
    }),
      (e.WebSocket.prototype = t.prototype);
  }
  function N(e) {
    function t(e, t) {
      try {
        e.getEntries().forEach((e) => {
          (e.initiatorType === 'iframe' || e.initiatorType === 'script') &&
            k(e.name) &&
            e.name.length < 16384 &&
            D({ method: 'GET', endpoint: e.name, protocol: 'performance' });
        });
      } catch (t) {
        se(t);
      }
    }
    const n = new PerformanceObserver(t);
    n.observe({ entryTypes: ['resource'] });
  }
  function A(e) {
    function n(n) {
      try {
        const e = n ? n.target : this;
        const i = {
          method: e.method,
          endpoint: e.action,
          payload: JSON.stringify({
            location: t.location.href,
            form_id: e.id,
            method: e.method,
            form_data: Object.fromEntries(new FormData(e)),
          }),
          protocol: 'form',
        };
        D(i);
      } catch (t) {}
    }
    e.addEventListener('submit', n, !0);
  }
  function R() {
    try {
      Error.stackTraceLimit = 20;
    } catch (t) {}
    try {
      return new Error().stack
        .split('\n')
        .slice(1)
        .map((e) => e.trim());
    } catch (t) {
      return null;
    }
  }
  function D(e, t) {
    const n = t || !1;
    const i = R();
    const a = function () {
      try {
        let t = re(e);
        if ((e.endpoint == 'TRACKINGPLAN' && (t = 'trackingplan'), !t)) return;
        if (!I(t)) return void se({ m: `Request ignored (${t} not in whitelist)`, request: e });
        if (!T(e, ze)) return void se({ m: 'Request ignored (content filter)', request: e });
        const n = ie();
        if (!1 === n)
          return (
            O(we), (it = null), tt.push(e), se({ m: `Pre queued, queue length = ${tt.length}` }), void setTimeout(Y, Le)
          );
        if (((it = n.sampleRate), !F(Ne, n))) return void se({ m: 'Request ignored (sampling)', mode: Ne, dict: n });
        M(W(e, t, i));
      } catch (t) {
        de({ m: 'Trackingplan process error', error: t, request: e });
      }
    };
    n || Je ? a() : setTimeout(a, 0);
  }
  function M(e) {
    Be(e);
    const t = b(e);
    if ((t.length > 2e5 && se({ m: `Track Too big, ignored: ${t.length}` }), We)) return void j(e, we);
    const n = b(Q()).length;
    if (t.length + 2 + n > Ae) return j(e, we), void se({ m: `Track > Batch Size: ${t.length}` });
    let i = nt.length + t.length + n;
    i > Ae && (se({ m: `Batch reaching limit: ${i}` }), O(we)),
      (i = nt.length + t.length + n),
      se({ m: `Queue len: ${i}`, rawTrack: e }),
      nt.length !== 0 && (nt += ','),
      (nt += t);
  }
  function O(e) {
    if (nt.length != 0) {
      const t = { requests: JSON.parse(`[${nt}]`), common: Q() };
      (nt = ''), q(t, e);
    }
  }
  function j(e, t) {
    const n = { requests: [e], common: Q() };
    q(n, t);
  }
  function B() {
    let e = Se + be;
    const t = [];
    return Fe && t.push('debug=true'), Ve != null && t.push(`t=${Ve}`), t.length > 0 && (e += `?${t.join('&')}`), e;
  }
  function q(e, t) {
    function n(e) {
      const t = navigator.sendBeacon(B(), e);
      const n = t ? 'accepted' : 'discarded';
      n == 'accepted' && je(e), se(`SendBeacon: ${n}`);
    }
    function i(e) {
      const t = new XMLHttpRequest();
      t.open('POST', B(), !0),
        (t.onreadystatechange = function () {
          if (t.readyState === 4)
            try {
              se({ m: 'Parsed', response: JSON.parse(t.response) }), je(e, t.response);
            } catch (e) {}
        }),
        t.send(e);
    }
    if ((typeof qe === 'function' && (e = qe(e)), se({ m: 'Sent', payload: e }), Oe))
      return void se('Not sending, is dry run');
    const a = b(e);
    t === 'xhr' ? i(a) : t === 'beacon' ? n(a) : void 0;
  }
  function F(e, t) {
    switch (e) {
      case 'user':
        return t.isSampledUser === 1;
      case 'track':
        return Math.random() < 1 / t.sampleRate;
      case 'all':
        return !0;
      case 'none':
      default:
        return !1;
    }
  }
  function U() {
    return H().length;
  }
  function H() {
    if (!Qe) return [];
    try {
      const e = Ke();
      return typeof e[0] === 'object' ? e.map((e) => (typeof e === 'object' && e !== null ? fe(e) : e)) : [];
    } catch (e) {
      return [];
    }
  }
  function z() {
    let e = {};
    for (const t in Ue)
      try {
        e[t] = typeof Ue[t] === 'function' ? Ue[t]() : Ue[t];
      } catch (n) {
        se({ m: `Error calculating tag value for key: ${t}`, error: n }), (e[t] = null);
      }
    return (e = me(e, 100)), e;
  }
  function G() {
    for (var e, t = document.cookie, n = {}, a = t.split(';'), r = 0; r < a.length; r++)
      if (((e = a[r].trim()), e)) {
        const o = e.split('=');
        const s = o[0].trim();
        const d = o[1] ? o[1].trim() : '';
        n[s] = d;
      }
    return n;
  }
  function W(e, n, i) {
    return {
      provider: n,
      request: {
        endpoint: e.endpoint,
        method: e.method,
        post_payload: e.payload || null,
        protocol: e.protocol,
        href: t.location.href,
      },
      ts: new Date().getTime(),
      dl_i: U() - 1,
      last_click_path: dt,
      last_click_text: lt,
      tags: z(),
      stack_trace: i,
      cookies: Xe ? me(G(), 50) : null,
    };
  }
  function K() {
    return oe(
      {
        hostname: t.location.hostname,
        user_agent: navigator.userAgent,
        navigator_language: navigator.language || navigator.userLanguage,
        load_url: '',
      },
      y(),
    );
  }
  function Q() {
    return {
      context: K(),
      tp_id: be,
      source_alias: Ie,
      environment: Te,
      sdk: ut.sdk,
      sdk_version: ut.sdkVersion,
      sampling_rate: it,
      debug: xe,
      datalayer: H(),
      session_id: $(),
      tags: z(),
      init_id: at,
    };
  }
  function X() {
    try {
      for (var e = t.performance.getEntriesByType('resource'), n = {}, a = [], r = 0; r < e.length; r++) {
        a.push(e[r].name);
        let o = '';
        const s = e[r].name.replace(/(^\w+:|^)\/\//, '');
        let d = s.split('?');
        const l = d[0];
        (d = l.split('/')), (o = d.length > 1 ? `${d[0]}/${d[1]}` : d[0]);
        const p = o;
        _e.call(n, p) || (n[p] = 0), n[p]++;
      }
      return n;
    } catch (t) {
      return null;
    }
  }
  function V() {
    for (; tt.length; ) {
      const e = tt.shift();
      D(e);
    }
  }
  function J(e, t) {
    return _e.call(e, 'environment_rates') && _e.call(e.environment_rates, t) ? e.environment_rates[t] : e.sample_rate;
  }
  function Y() {
    if (!$e && !(new Date().getTime() < Pe)) {
      const e = new XMLHttpRequest();
      const t = `${Ee}config-${be}.json`;
      (e.onreadystatechange = function () {
        if (this.readyState == 4)
          try {
            const e = J(JSON.parse(this.responseText), Te);
            if (s(e)) throw ((Pe = new Date().getTime() + 300000), new Error('Invalid sampling rate'));
            (Pe = 0), ne(e), u({ event_name: 'new_dau' }), V();
          } catch (e) {}
        $e = !1;
      }),
        e.open('GET', t, !0),
        ($e = !0),
        e.send();
    }
  }
  function Z(e) {
    n.setItem('_trackingplan_session_id', e), n.setItem('_trackingplan_session_ts', Date.now().toString());
  }
  function $() {
    if (!ot) return null;
    const e = n.getItem('_trackingplan_session_id');
    const t = n.getItem('_trackingplan_session_ts');
    if (e === null || t === null) return se({ m: 'Session ID: Creating for the first time session ' }), ee();
    const i = Date.now();
    const a = parseInt(t, 10);
    const r = 1e3 * (60 * rt);
    return isNaN(a) || i > a + r
      ? (se({ m: 'Session ID: Updating because timeout' }), ee())
      : (n.setItem('_trackingplan_session_ts', i.toString()), e);
  }
  function ee() {
    const e = n.getItem('_trackingplan_live_debug_mode') === 'true';
    let t = te();
    !0 == e && (t = `55555555${t.substring(8)}`);
    const i = Date.now();
    return (
      n.setItem('_trackingplan_session_id', t),
      n.setItem('_trackingplan_session_ts', i.toString()),
      _({ session_landing: document.location.href, session_referrer: document.referrer }),
      u({ event_name: 'new_session' }),
      t
    );
  }
  function te() {
    let e = new Date().getTime();
    const t = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (t) => {
      const n = 0 | (e + 16 * Math.random()) % 16;
      return (e = o(e / 16)), (t === 'x' ? n : 8 | (3 & n)).toString(16);
    });
    return t;
  }
  function ne(e) {
    if (!1 === e)
      return (
        n.removeItem('_trackingplan_sample_rate'),
        n.removeItem('_trackingplan_sample_rate_ts'),
        void n.removeItem('_trackingplan_is_sampled_user')
      );
    const t = Math.random() < 1 / e ? 1 : 0;
    se({ m: `Trackingplan sample rate = ${e}. isSampledUser ${t}` }),
      n.setItem('_trackingplan_sample_rate_ts', new Date().getTime()),
      n.setItem('_trackingplan_sample_rate', e),
      n.setItem('_trackingplan_is_sampled_user', t);
  }
  function ie() {
    const e = n.getItem('_trackingplan_sample_rate_ts');
    if (e === null) return !1;
    if (parseInt(e) + 1e3 * Ce < new Date().getTime()) return se({ m: 'Trackingplan sample rate expired' }), ne(!1), !1;
    const t = parseInt(n.getItem('_trackingplan_sample_rate'));
    return s(t)
      ? (se({ m: 'Trackingplan sample rate expired' }), ne(!1), !1)
      : { sampleRate: t, isSampledUser: parseInt(n.getItem('_trackingplan_is_sampled_user')) };
  }
  function ae(e, t) {
    if (e === null || t === null) return !0;
    if (((t = t.toString()), e.charAt(0) === '/' && e.charAt(e.length - 1) === '/')) {
      const n = new RegExp(e.slice(1, -1));
      return n.test(t);
    }
    return t.indexOf(e) !== -1;
  }
  function re(e) {
    const t = e.endpoint;
    const n = e.payload;
    const a = e.protocol;
    if (k(t)) {
      for (const r in ke)
        if (ke.hasOwnProperty(r)) {
          const o = r.split('@');
          let s = null;
          o.length > 1 && (s = o[0]);
          const d = o.length > 1 ? o[1] : o[0];
          const l = d.split('%');
          const p = l[0];
          const c = l.length === 2 ? l[1] : null;
          const m = ye.slice();
          if (s)
            for (var g, u = s.split(','), h = 0; h < u.length; h++)
              if (((g = u[h].trim()), !!g)) {
                const f = g.charAt(0);
                const _ = g.substring(1);
                if (f === '+') {
                  const y = m.indexOf(_);
                  y !== -1 && m.splice(y, 1);
                } else f === '-' && m.indexOf(_) === -1 && m.push(_);
              }
          if (typeof a === 'string' && m.indexOf(a) !== -1) continue;
          if (ae(p, t) && ae(c, n)) return ke[r];
        }
      return !1;
    }
  }
  function oe(e, t) {
    for (const n in t) e[n] = t[n];
    return e;
  }
  function se(e) {
    xe && i.log(`TP ${be}`, e);
  }
  function de(e) {
    t.console && i.warn && i.warn(e);
  }
  function le() {
    function e() {
      for (let e = document.getElementsByTagName('IFRAME'), t = 0; t < e.length; t++) n(e[t]);
    }
    function t(e) {
      try {
        return !!e.contentDocument;
      } catch (t) {
        return !1;
      }
    }
    function n(e) {
      try {
        t(e) && (h(e.contentWindow), se(`Intercepted frame ${e.id}`));
      } catch (t) {}
    }
    function i() {
      const e = new MutationObserver((e) => {
        e.forEach((e) => {
          e.addedNodes.forEach((e) => {
            e.tagName == 'IFRAME' && n(e);
          });
        });
      });
      e.observe(document, { subtree: !0, childList: !0, attributes: !1, characterData: !1 }),
        setTimeout(e.disconnect(), 4e3);
    }
    document.readyState === 'complete'
      ? (e(), i())
      : (document.onreadystatechange = function () {
          document.readyState === 'complete' && (e(), i());
        });
  }
  function pe(e) {
    try {
      if (!(e instanceof Element)) return;
      for (
        var t = [];
        e.nodeType === Node.ELEMENT_NODE && e.nodeName.toLowerCase() !== 'html' && e.nodeName.toLowerCase() !== 'body';

      ) {
        let n = e.nodeName.toLowerCase();
        if (e.id) {
          (n += `#${e.id}`), t.unshift(n);
          break;
        } else {
          e.className && (n += `.${e.className.split(' ').join('.').replace(/\s+/g, '.')}`);
          for (var i = e, a = 1; (i = i.previousElementSibling); ) {
            let r = i.nodeName.toLowerCase();
            i.className && (r += `.${i.className.split(' ').join('.').replace(/\s+/g, '.')}`), r === n && a++;
          }
          a != 1 && (n += `:nth-of-type(${a})`);
        }
        t.unshift(n), (e = e.parentNode);
      }
      return t.join(' > ');
    } catch (t) {
      return null;
    }
  }
  function ce(e) {
    try {
      if (!(e instanceof Element)) return null;
      let t = null;
      return (
        e.tagName.toLowerCase() === 'input' && e.type !== 'password'
          ? (t = e.value.trim())
          : e.tagName.toLowerCase() !== 'input' &&
            e.tagName.toLowerCase() !== 'script' &&
            e.tagName.toLowerCase() !== 'style' &&
            (t = e.textContent.trim()),
        t ? t.slice(0, 50) : null
      );
    } catch (t) {
      return null;
    }
  }
  function me(e, t) {
    if (typeof e === 'string' && e.length > t) return `${e.substring(0, t - 1)}\u2026`;
    if (Array.isArray(e)) return e.map((e) => me(e, t));
    if (typeof e === 'object' && e !== null) {
      const n = {};
      return (
        Object.keys(e).forEach((i) => {
          n[i] = me(e[i], t);
        }),
        n
      );
    }
    return e;
  }
  function ge(e) {
    try {
      pt[e.name] = Math.round(e.value);
    } catch (t) {}
  }
  function ue() {
    try {
      const e = (function (Y) {
        let $;
        let ee;
        let te;
        let ne;
        let ie;
        const Z = Math.max;
        let ae = -1;
        const re = function (t) {
          addEventListener(
            'pageshow',
            (e) => {
              e.persisted && ((ae = e.timeStamp), t(e));
            },
            !0,
          );
        };
        const c = function () {
          const t = self.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
          if (t && t.responseStart > 0 && t.responseStart < performance.now()) return t;
        };
        const u = function () {
          const t = c();
          return (t && t.activationStart) || 0;
        };
        const oe = function (i, e) {
          const n = c();
          let t = 'navigate';
          return (
            ae >= 0
              ? (t = 'back-forward-cache')
              : n &&
                (document.prerendering || u() > 0
                  ? (t = 'prerender')
                  : document.wasDiscarded
                  ? (t = 'restore')
                  : n.type && (t = n.type.replace(/_/g, '-'))),
            {
              name: i,
              value: void 0 === e ? -1 : e,
              rating: 'good',
              delta: 0,
              entries: [],
              id: 'v4-'.concat(Date.now(), '-').concat(o(8999999999999 * Math.random()) + 1e12),
              navigationType: t,
            }
          );
        };
        const f = function (i, a, e) {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(i)) {
              const t = new PerformanceObserver((t) => {
                Promise.resolve().then(() => {
                  a(t.getEntries());
                });
              });
              return t.observe({ type: i, buffered: !0, ...(e || {}) }), t;
            }
          } catch (t) {}
        };
        const d = function (s, e, n, t) {
          let r;
          let d;
          return function (i) {
            e.value >= 0 &&
              (i || t) &&
              ((d = e.value - (r || 0)) || void 0 === r) &&
              ((r = e.value),
              (e.delta = d),
              (e.rating = (function (t, e) {
                return t > e[1] ? 'poor' : t > e[0] ? 'needs-improvement' : 'good';
              })(e.value, n)),
              s(e));
          };
        };
        const s = function (t) {
          requestAnimationFrame(() => requestAnimationFrame(() => t()));
        };
        const l = function (t) {
          document.addEventListener('visibilitychange', () => {
            document.visibilityState === 'hidden' && t();
          });
        };
        const v = function (t) {
          let e = !1;
          return function () {
            e || (t(), (e = !0));
          };
        };
        let p = -1;
        const e = function () {
          return document.visibilityState !== 'hidden' || document.prerendering ? 1 / 0 : 0;
        };
        const m = function (t) {
          document.visibilityState === 'hidden' &&
            p > -1 &&
            ((p = t.type === 'visibilitychange' ? t.timeStamp : 0), y());
        };
        const g = function () {
          addEventListener('visibilitychange', m, !0), addEventListener('prerenderingchange', m, !0);
        };
        var y = function () {
          removeEventListener('visibilitychange', m, !0), removeEventListener('prerenderingchange', m, !0);
        };
        const T = function () {
          return (
            p < 0 &&
              ((p = e()),
              g(),
              re(() => {
                setTimeout(() => {
                  (p = e()), g();
                }, 0);
              })),
            {
              get firstHiddenTime() {
                return p;
              },
            }
          );
        };
        const E = function (t) {
          document.prerendering ? addEventListener('prerenderingchange', () => t(), !0) : t();
        };
        const L = [1800, 3e3];
        const S = function (a, e) {
          (e = e || {}),
            E(() => {
              let n;
              const l = T();
              let p = oe('FCP');
              var r = f('paint', (t) => {
                t.forEach((t) => {
                  t.name === 'first-contentful-paint' &&
                    (r.disconnect(),
                    t.startTime < l.firstHiddenTime && ((p.value = Z(t.startTime - u(), 0)), p.entries.push(t), n(!0)));
                });
              });
              r &&
                ((n = d(a, p, L, e.reportAllChanges)),
                re((t) => {
                  (p = oe('FCP')),
                    (n = d(a, p, L, e.reportAllChanges)),
                    s(() => {
                      (p.value = performance.now() - t.timeStamp), n(!0);
                    });
                }));
            });
        };
        const b = [0.1, 0.25];
        let w = 0;
        let C = 1 / 0;
        let se = 0;
        const de = function (t) {
          t.forEach((t) => {
            t.interactionId &&
              ((C = a(C, t.interactionId)), (se = Z(se, t.interactionId)), (w = se ? (se - C) / 7 + 1 : 0));
          });
        };
        const F = function () {
          return $ ? w : performance.interactionCount || 0;
        };
        const M = function () {
          'interactionCount' in performance ||
            $ ||
            ($ = f('event', de, { type: 'event', buffered: !0, durationThreshold: 0 }));
        };
        const k = [];
        const D = new Map();
        let B = 0;
        const le = function () {
          const t = a(k.length - 1, o((F() - B) / 50));
          return k[t];
        };
        const x = [];
        const H = function (i) {
          if ((x.forEach((e) => e(i)), i.interactionId || i.entryType === 'first-input')) {
            const e = k[k.length - 1];
            const n = D.get(i.interactionId);
            if (n || k.length < 10 || i.duration > e.latency) {
              if (n)
                i.duration > n.latency
                  ? ((n.entries = [i]), (n.latency = i.duration))
                  : i.duration === n.latency && i.startTime === n.entries[0].startTime && n.entries.push(i);
              else {
                const t = { id: i.interactionId, latency: i.duration, entries: [i] };
                D.set(t.id, t), k.push(t);
              }
              k.sort((t, e) => e.latency - t.latency), k.length > 10 && k.splice(10).forEach((t) => D.delete(t.id));
            }
          }
        };
        const N = function (i) {
          const a = self.requestIdleCallback || self.setTimeout;
          let n = -1;
          return (i = v(i)), document.visibilityState === 'hidden' ? i() : ((n = a(i)), l(i)), n;
        };
        const q = [200, 500];
        const O = [2500, 4e3];
        const j = {};
        const V = [800, 1800];
        const _ = function n(t) {
          document.prerendering
            ? E(() => n(t))
            : document.readyState === 'complete'
            ? setTimeout(t, 0)
            : addEventListener('load', () => n(t), !0);
        };
        const z = { passive: !0, capture: !0 };
        const G = new Date();
        const J = function (t, e) {
          ee || ((ee = e), (te = t), (ne = new Date()), U(removeEventListener), K());
        };
        var K = function () {
          if (te >= 0 && te < ne - G) {
            const t = {
              entryType: 'first-input',
              name: ee.type,
              target: ee.target,
              cancelable: ee.cancelable,
              startTime: ee.timeStamp,
              processingStart: ee.timeStamp + te,
            };
            ie.forEach((e) => {
              e(t);
            }),
              (ie = []);
          }
        };
        const Q = function (t) {
          if (t.cancelable) {
            const e = (t.timeStamp > 1e12 ? new Date() : performance.now()) - t.timeStamp;
            t.type == 'pointerdown'
              ? (function (a, e) {
                  const n = function () {
                    J(a, e), r();
                  };
                  const t = function () {
                    r();
                  };
                  var r = function () {
                    removeEventListener('pointerup', n, z), removeEventListener('pointercancel', t, z);
                  };
                  addEventListener('pointerup', n, z), addEventListener('pointercancel', t, z);
                })(e, t)
              : J(e, t);
          }
        };
        var U = function (t) {
          ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach((e) => t(e, Q, z));
        };
        const W = [100, 300];
        return (
          (Y.CLSThresholds = b),
          (Y.FCPThresholds = L),
          (Y.FIDThresholds = W),
          (Y.INPThresholds = q),
          (Y.LCPThresholds = O),
          (Y.TTFBThresholds = V),
          (Y.onCLS = function (p, e) {
            (e = e || {}),
              S(
                v(() => {
                  let n;
                  let c = oe('CLS', 0);
                  let m = 0;
                  let g = [];
                  const h = function (t) {
                    t.forEach((i) => {
                      if (!i.hadRecentInput) {
                        const e = g[0];
                        const n = g[g.length - 1];
                        m && i.startTime - n.startTime < 1e3 && i.startTime - e.startTime < 5e3
                          ? ((m += i.value), g.push(i))
                          : ((m = i.value), (g = [i]));
                      }
                    }),
                      m > c.value && ((c.value = m), (c.entries = g), n());
                  };
                  const a = f('layout-shift', h);
                  a &&
                    ((n = d(p, c, b, e.reportAllChanges)),
                    l(() => {
                      h(a.takeRecords()), n(!0);
                    }),
                    re(() => {
                      (m = 0), (c = oe('CLS', 0)), (n = d(p, c, b, e.reportAllChanges)), s(() => n());
                    }),
                    setTimeout(n, 0));
                }),
              );
          }),
          (Y.onFCP = S),
          (Y.onFID = function (t, e) {
            (e = e || {}),
              E(() => {
                let n;
                const r = T();
                let o = oe('FID');
                const c = function (t) {
                  t.startTime < r.firstHiddenTime &&
                    ((o.value = t.processingStart - t.startTime), o.entries.push(t), n(!0));
                };
                const a = function (t) {
                  t.forEach(c);
                };
                const s = f('first-input', a);
                (n = d(t, o, W, e.reportAllChanges)),
                  s &&
                    (l(
                      v(() => {
                        a(s.takeRecords()), s.disconnect();
                      }),
                    ),
                    re(() => {
                      let i;
                      (o = oe('FID')),
                        (n = d(t, o, W, e.reportAllChanges)),
                        (ie = []),
                        (te = -1),
                        (ee = null),
                        U(addEventListener),
                        (i = c),
                        ie.push(i),
                        K();
                    }));
              });
          }),
          (Y.onINP = function (s, e) {
            'PerformanceEventTiming' in self &&
              'interactionId' in PerformanceEventTiming.prototype &&
              ((e = e || {}),
              E(() => {
                let n;
                M();
                let p;
                let c = oe('INP');
                const m = function (t) {
                  N(() => {
                    t.forEach(H);
                    const e = le();
                    e && e.latency !== c.value && ((c.value = e.latency), (c.entries = e.entries), p());
                  });
                };
                const o = f('event', m, {
                  durationThreshold: (n = e.durationThreshold) !== null && void 0 !== n ? n : 40,
                });
                (p = d(s, c, q, e.reportAllChanges)),
                  o &&
                    (o.observe({ type: 'first-input', buffered: !0 }),
                    l(() => {
                      m(o.takeRecords()), p(!0);
                    }),
                    re(() => {
                      (B = F()), (k.length = 0), D.clear(), (c = oe('INP')), (p = d(s, c, q, e.reportAllChanges));
                    }));
              }));
          }),
          (Y.onLCP = function (p, c) {
            (c = c || {}),
              E(() => {
                let n;
                const m = T();
                let g = oe('LCP');
                const e = function (t) {
                  c.reportAllChanges || (t = t.slice(-1)),
                    t.forEach((t) => {
                      t.startTime < m.firstHiddenTime && ((g.value = Z(t.startTime - u(), 0)), (g.entries = [t]), n());
                    });
                };
                const r = f('largest-contentful-paint', e);
                if (r) {
                  n = d(p, g, O, c.reportAllChanges);
                  const a = v(() => {
                    j[g.id] || (e(r.takeRecords()), r.disconnect(), (j[g.id] = !0), n(!0));
                  });
                  ['keydown', 'click'].forEach((t) => {
                    addEventListener(t, () => N(a), !0);
                  }),
                    l(a),
                    re((e) => {
                      (g = oe('LCP')),
                        (n = d(p, g, O, c.reportAllChanges)),
                        s(() => {
                          (g.value = performance.now() - e.timeStamp), (j[g.id] = !0), n(!0);
                        });
                    });
                }
              });
          }),
          (Y.onTTFB = function (i, e) {
            e = e || {};
            let a = oe('TTFB');
            let o = d(i, a, V, e.reportAllChanges);
            _(() => {
              const t = c();
              t &&
                ((a.value = Z(t.responseStart - u(), 0)),
                (a.entries = [t]),
                o(!0),
                re(() => {
                  (a = oe('TTFB', 0)), (o = d(i, a, V, e.reportAllChanges))(!0);
                }));
            });
          }),
          Y
        );
      })({});
      e.onCLS(ge), e.onFCP(ge), e.onFID(ge), e.onINP(ge), e.onLCP(ge), e.onTTFB(ge);
    } catch (t) {}
  }
  function he() {
    t.addEventListener('error', (e) => {
      ct++;
    });
    const e = i.warn;
    i.warn = function () {
      mt++, e.apply(i, arguments);
    };
  }
  function fe(e) {
    function t(e) {
      return Ze.indexOf(e) !== -1;
    }
    function n(e) {
      return typeof e === 'string' ? '*'.repeat(a(e.length, 8)) : typeof e === 'number' ? 0 : e;
    }
    function i(e) {
      for (const a in e)
        e.hasOwnProperty(a) && (typeof e[a] === 'object' && e[a] !== null ? i(e[a]) : t(a) && (e[a] = n(e[a])));
      return e;
    }
    const r = JSON.parse(JSON.stringify(e));
    return i(r);
  }
  var _e = Object.prototype.hasOwnProperty;
  if (t.Trackingplan) return void (t.Trackingplan.testing || de('Trackingplan snippet included twice.'));
  var ye = ['performance'];
  const ve = {
    '/g/collect?v=2&tid': 'googleanalytics',
    '/\\/[a-z0-9]{6}\\?tid=[^&]+&v=2/': 'googleanalytics',
    'api.segment.io': 'segment',
    segmentapi: 'segment',
    'seg-api': 'segment',
    'segment-api': 'segment',
    '/.*api-iam.intercom.io/messenger/web/(ping|events|metrics|open).*/': 'intercom',
    'api.amplitude.com': 'amplitude',
    'amplitude.com/2/httpapi': 'amplitude',
    'ping.chartbeat.net': 'chartbeat',
    '/.*api(-eu)?(-js)?.mixpanel.com.*/': 'mixpanel',
    'trk.kissmetrics.io': 'kissmetrics',
    'ct.pinterest.com': 'pinterest',
    'facebook.com/tr/': 'facebook',
    'track.hubspot.com/__': 'hubspot',
    '/.*.heapanalytics.com/(h|api).*/': 'heap',
    '/.*snowplow.*/': 'snowplow',
    '/.*ws.*.hotjar.com/api/v2/client/ws/%identify_user': 'hotjar',
    '/.*ws.*.hotjar.com/api/v2/client/ws/%tag_recording': 'hotjar',
    'klaviyo.com/api/track': 'klaviyo',
    'app.pendo.io/data': 'pendo',
    'matomo.php': 'matomo',
    'rs.fullstory.com/rec%8137': 'fullstory',
    'rs.fullstory.com/rec%8193': 'fullstory',
    'logx.optimizely.com/v1/events': 'optimizely',
    'track.customer.io/events/': 'customerio',
    'alb.reddit.com/rp.gif': 'reddit',
    'px.ads.linkedin.com': 'linkedin',
    '/i/adsct': 'twitter',
    'bat.bing.com': 'bing',
    'pdst.fm': 'podsights',
    'analytics.tiktok.com/api/v2': 'tiktok',
    '/.*AQB=1.*AQE=1/': 'adobe',
    'posthog.com/i/': 'posthog',
    'posthog.com/e/': 'posthog',
    '/.*tealiumiq.com/.*.gif/': 'tealium',
    '.connectif.cloud': 'connectif',
    '/ppms.php': 'piwikpro',
    'plausible.io/api/event': 'plausible',
    'ariane.abtasty.com': 'abtasty',
    'xiti.com/event': 'piano',
    'rudderstack.com/v1': 'rudderstack',
    '/dev.visualwebsiteoptimizer.com/.*events/': 'vwo',
    'adsmurai.com/v1.0/events': 'adsmurai',
    '+performance@/.*/pagead/(viewthroughconversion|conversion)/.*/': 'google_ads',
    '+performance@/.*(/activity|/fls).*src=/': 'floodlight',
    '+performance@sslwidget.criteo.com/event': 'criteo',
    '+performance@track.adform.net/Serving/TrackPoint': 'adform',
    '/.*edge\\.adobedc\\.net\\/ee\\/.*(collect|interact).*/': 'adobexdm',
  };
  var ke = {};
  var be = null;
  var Te = 'PRODUCTION';
  var Ie = null;
  var we = 'xhr';
  var xe = !1;
  var Se = 'https://tracks.trackingplan.com/v1/';
  var Ee = 'https://config.trackingplan.com/';
  var Le = 0;
  var Ce = 86400;
  var Pe = 0;
  var Ne = 'user';
  var Ae = 55e3;
  let Re = 20;
  var De = ['img', 'xhr', 'beacon', 'fetch', 'performance'];
  var Me = !1;
  var Oe = !1;
  var je = function () {};
  var Be = function () {};
  var qe = function (e) {
    return e;
  };
  var Fe = !1;
  var Ue = {};
  let He = null;
  var ze = [];
  var Ge = null;
  var We = !1;
  var Ke = function () {
    return t.dataLayer;
  };
  var Qe = !0;
  var Xe = !1;
  var Ve = null;
  var Je = !1;
  const Ye = ['userId', 'user_id', 'userid', 'password', 'pass', 'token', 'userToken', 'usertoken', 'user_token'];
  var Ze = Ye;
  var $e = !1;
  const et = '_trackingplan_live_debug_mode';
  var tt = [];
  var nt = '';
  var it = null;
  var at = '';
  var rt = 30;
  var ot = !0;
  let st = !0;
  var dt = null;
  var lt = null;
  var pt = {};
  var ct = 0;
  var mt = 0;
  var gt = !1;
  var ut = (t.Trackingplan = {
    sdk: 'js',
    sdkVersion: '1.26.0',
    options: null,
    tpId: null,
    testing: !1,
    setOptions(e, t) {
      (t = this.options = t || {}),
        (be = this.tpId = e),
        (Te = t.environment || Te),
        (Ie = t.sourceAlias || Ie),
        (we = t.sendMethod || we),
        (ke = oe(ve, t.customDomains || {})),
        (xe = t.debug || xe),
        (Se = t.tracksEndPoint || Se),
        (Ee = t.configEndPoint || Ee),
        (Le = t.delayConfigDownload || Le),
        (Ce = t.sampleRateTTL || Ce),
        (Ne = t.samplingMode || Ne),
        (Ae = t.batchSize || Ae),
        (Re = t.batchInterval || Re),
        (Me = t.alwaysSendNewUser || Me),
        (Oe = t.dryRun || Oe),
        (De = t.intercept || De),
        (je = t.onSubmit || je),
        (Fe = t.parse || Fe),
        (Be = t.onQueue || Be),
        (qe = t.onBeforeSubmit || qe),
        (Ue = t.tags || Ue),
        (He = t.samplingRate || He),
        (ze = t.contentFilters || ze),
        (Ge = t.providersWhitelist || Ge),
        (We = typeof t.realtime === 'undefined' ? We : t.realtime),
        (Ke = t.getDataLayer || Ke),
        (rt = t.sessionDurationMinutes || rt),
        (st = typeof t.intervalsOnInit === 'undefined' ? st : t.intervalsOnInit),
        (Qe = typeof t.useDataLayer === 'undefined' ? Qe : t.useDataLayer),
        (Xe = typeof t.useCookies === 'undefined' ? Xe : t.useCookies),
        (ot = typeof t.useSessions === 'undefined' ? ot : t.useSessions),
        t.datalayerMaskKeys && (Ze = Ye.concat(t.datalayerMaskKeys)),
        (Je = this.testing = t.testing || Je),
        We && ((He = 1), (Ne = 'all'), (Ae = 1)),
        Je && (Ve = Date.now()),
        se({ m: 'TP options updated', options: t });
    },
    init(e, a) {
      try {
        if (Je) return void de('Trackingplan SDK is running in a test environment');
        if (!v()) throw new Error('TP Not compatible browser');
        if (be !== null) throw new Error('TP Init already happened');
        if (typeof e !== 'string' || e === '') throw new Error('tpId is not provided');
        let r = null;
        if (t.performance && t.performance.getEntriesByType) {
          const o = t.performance.getEntriesByType('navigation')[0];
          r = o ? o.name : t.location.href;
        } else r = t.location.href;
        l(r);
        const s = p();
        s &&
          (i.log('TP Running in regression mode', s),
          (a = a || {}),
          (a.testing = !0),
          (a.realtime = !0),
          (a.samplingMode = 'all'),
          (a.tags = a.tags || {}),
          (a.tags.test_session_name = s.test_session_name),
          (a.tags.test_title = s.test_title),
          (a.environment = s.environment)),
          c(r);
        const d = n.getItem(et) === 'true';
        d && ((a = a || {}), (a.realtime = !0), (a.samplingMode = 'all')),
          ut.setOptions(e, a),
          He !== null && ne(He),
          (at = te()),
          h(t),
          De.includes('frame') && le(),
          document.addEventListener('visibilitychange', () => {
            document.visibilityState === 'hidden' &&
              setTimeout(() => {
                O('beacon'), se({ m: 'visibility beacon' });
              }, 3e3);
          }),
          t.addEventListener('pagehide', g),
          t.addEventListener('beforeunload', g),
          t.document.addEventListener(
            'click',
            (e) => {
              (dt = pe(e.target)), (lt = ce(e.target));
            },
            !1,
          ),
          f() &&
            (se({ m: 'New User' }),
            _({ landing: document.location.href, referrer: document.referrer }),
            u({ event_name: 'new_user' })),
          /[?&]utm_[^=]+/.test(document.location.search) && _({ last_utm_page: document.location.href });
        const y = $();
        d && m(y),
          u({ event_name: 'page_load' }),
          !0 === st && ut.initIntervals(),
          ue(),
          he(),
          se({ m: 'TP init finished', options: a });
      } catch (e) {
        de({ m: 'TP init error', error: e });
      }
    },
    flush() {
      O(we);
    },
    queueSize() {
      return nt.length;
    },
    updateTags(e) {
      O(we), (Ue = oe(Ue, e));
    },
    initIntervals() {
      setTimeout(() => {
        gt || (u({ event_name: 'pixels', properties: { pixels: X(), sent_at: 'timeout' } }), (gt = !0));
      }, 1e4),
        setInterval(() => {
          O(we);
        }, 1e3 * Re);
    },
    getSessionId() {
      return n.getItem('_trackingplan_session_id');
    },
    enableLiveDebugMode() {
      n.setItem(et, 'true'), ee(), t.location.reload();
    },
    disableLiveDebugMode() {
      localStorage.removeItem(et), t.location.reload();
    },
  });
  var ht = !1;
})(window, localStorage, console);
Trackingplan.init('TP3184092', {
  environment: tealiumEnv === 'dev' ? 'DEVELOPMENT' : tealiumEnv === 'qa' ? 'QA' : 'PRODUCTION',
  tracksEndPoint: 'https://eu-tracks.trackingplan.com/v1/',
  // tags: { "app_version": "...", } // See docs to know about optional tags.
});
