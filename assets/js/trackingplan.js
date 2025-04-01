(function (t, n, i) {
  var a = Math.min,
    o = Math.floor,
    s = Number.isNaN;
  function d(e) {
    return e && 'object' == typeof e
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
      var t = new URLSearchParams(e.search),
        a = t.get('trackingplan_regression_mode');
      if ('true' === a) {
        var r = {
          mode: !0,
          test_title: t.get('trackingplan_regression_test_title'),
          test_session_name: t.get('trackingplan_regression_test_session_name'),
          environment: t.get('trackingplan_regression_environment'),
        };
        if (((r = d(r)), !r))
          return void le({
            m: 'TP Regression mode init failed - missing required parameters',
          });
        n.setItem('_trackingplan_regression', JSON.stringify(r)),
          i.log('TP Regression mode enabled', r);
      } else
        'false' === a &&
          (i.log('TP Regression mode disabled'),
          n.removeItem('_trackingplan_regression'));
    } catch (t) {
      le({ m: 'TP Regression mode init failed - catch' });
    }
  }
  function p() {
    try {
      var e = n.getItem('_trackingplan_regression');
      return e ? d(JSON.parse(e)) : null;
    } catch (t) {
      return null;
    }
  }
  function c(e) {
    try {
      e = new URL(e);
      var t = new URLSearchParams(e.search),
        i = t.get('trackingplan_live_debug');
      i && ($(i), n.setItem('_trackingplan_live_debug_mode', 'true'));
    } catch (t) {}
  }
  function m(e) {
    var t =
      'https://panel.trackingplan.com/plans/' +
      be +
      '/?open_tracks_explorer=true&te_session_id=' +
      e;
    i.log(
      '%cTrackingplan Live Debug mode is Enabled.%c\nThe session id is %c' +
        e +
        '%c.\nSee the live session at ' +
        t +
        '\nDisable Live Debug Mode by executing %cTrackingplan.disableLiveDebugMode()',
      'font-weight: bold;',
      '',
      'font-weight: bold;',
      '',
      'font-style: italic',
    );
  }
  function g(t) {
    if (!ht) {
      (ht = !0), de({ m: 'unload event', e: t.type }), (we = 'beacon');
      var e = { web_vitals: pt, js_error_count: ct, js_warning_count: mt };
      u({ event_name: 'page_unload', properties: e }, !0),
        gt ||
          (u(
            {
              event_name: 'pixels',
              properties: { pixels: V(), sent_at: t.type },
            },
            !0,
          ),
          (gt = !0)),
        j('beacon');
    }
  }
  function u(e, t) {
    var n = {
      method: 'POST',
      endpoint: 'TRACKINGPLAN',
      payload: JSON.stringify(e),
    };
    M(n, t);
  }
  function h(e) {
    if (De.includes('img'))
      try {
        w(e);
      } catch (t) {
        de(t);
      }
    if (De.includes('xhr'))
      try {
        S(e);
      } catch (t) {
        de(t);
      }
    if (De.includes('beacon'))
      try {
        L(e);
      } catch (t) {
        de(t);
      }
    if (De.includes('form'))
      try {
        A(e);
      } catch (t) {
        de(t);
      }
    if (De.includes('ws'))
      try {
        P(e);
      } catch (t) {
        de(t);
      }
    if (De.includes('fetch'))
      try {
        C(e);
      } catch (t) {
        de(t);
      }
    if (De.includes('performance'))
      try {
        N(e);
      } catch (t) {
        de(t);
      }
    if (De.includes('message'))
      try {
        R();
      } catch (t) {
        de(t);
      }
  }
  function f() {
    return null === n.getItem('_trackingplan_initial') || Me;
  }
  function y(e) {
    var t = _();
    n.setItem('_trackingplan_initial', JSON.stringify(se(t, e)));
  }
  function _() {
    try {
      return null === n.getItem('_trackingplan_initial')
        ? {}
        : JSON.parse(n.getItem('_trackingplan_initial'));
    } catch (t) {
      return {};
    }
  }
  function v() {
    try {
      if ((n.setItem('_tp_t', 'a'), 'a' !== n.getItem('_tp_t'))) return !1;
      if ((n.removeItem('_tp_t'), 'function' != typeof navigator.sendBeacon))
        return !1;
    } catch (t) {
      return !1;
    }
    return !0;
  }
  function k(e) {
    return 'string' == typeof e || e instanceof String;
  }
  function b(e) {
    return JSON.stringify(e, function (e, t) {
      return t instanceof Element ? t.nodeType : t;
    });
  }
  function T(e, t) {
    if (0 === t.length) return !0;
    for (var n = 0; n < t.length; n++) {
      if (
        ye.call(e, 'payload') &&
        'string' == typeof e.payload &&
        0 <= e.payload.indexOf(t[n])
      )
        return !0;
      if (
        ye.call(e, 'endpoint') &&
        'string' == typeof e.endpoint &&
        0 <= e.endpoint.indexOf(t[n])
      )
        return !0;
    }
    return !1;
  }
  function I(e) {
    return !(null !== ze) || 0 <= ze.indexOf(e);
  }
  function w(e) {
    var t = e.Object.getOwnPropertyDescriptor(
      e.HTMLImageElement.prototype,
      'src',
    ).set;
    e.Object.defineProperty(e.HTMLImageElement.prototype, 'src', {
      set: function (e) {
        return !k(e) || 16384 < e.length
          ? t.apply(this, arguments)
          : (M({ method: 'GET', endpoint: e, protocol: 'img' }),
            t.apply(this, arguments));
      },
    });
    var n = e.HTMLImageElement.prototype.setAttribute;
    e.HTMLImageElement.prototype.setAttribute = function (e, t) {
      if ('src' == e.toLowerCase()) {
        if (!k(t) || t.length > 16384) return n.apply(this, arguments);
        M({ method: 'GET', endpoint: t, protocol: 'img' });
      }
      return n.apply(this, arguments);
    };
  }
  function x(e) {
    var t = e;
    try {
      t instanceof FormData && (t = JSON.stringify(Object.fromEntries(t)));
    } catch (t) {}
    return t;
  }
  function S(e) {
    var t = e.XMLHttpRequest.prototype.open,
      n = e.XMLHttpRequest.prototype.send;
    (e.XMLHttpRequest.prototype.open = function (e, n) {
      return (this._tpUrl = n), (this._tpMethod = e), t.apply(this, arguments);
    }),
      (e.XMLHttpRequest.prototype.send = function (e) {
        var t = x(e);
        return (
          E(
            t,
            function (e) {
              M({
                method: this._tpMethod,
                endpoint: this._tpUrl,
                payload: e,
                protocol: 'xhr',
              });
            }.bind(this),
          ),
          n.apply(this, arguments)
        );
      });
  }
  function E(e, t) {
    if (e instanceof Blob) {
      var n = new FileReader();
      (n.onload = function () {
        var e = n.result.split(',')[1];
        t(e);
      }),
        n.readAsDataURL(e);
    } else t(e);
  }
  function L(e) {
    var t = e.navigator.sendBeacon;
    e.navigator.sendBeacon = function (e, n) {
      if (!k(e) || 16384 < e.length) return t.apply(this, arguments);
      var i = x(n);
      return (
        E(i, function (t) {
          M({ method: 'POST', endpoint: e, payload: t, protocol: 'beacon' });
        }),
        t.apply(this, arguments)
      );
    };
  }
  function C(e) {
    var t = e.fetch;
    e.fetch = function (e, n) {
      var i,
        a = 'GET',
        r = null;
      if ('string' == typeof e) i = e;
      else {
        if (!(e instanceof Request)) return t.apply(this, arguments);
        if (((i = e.url), (a = e.method), !e.bodyUsed)) {
          var o = e.clone();
          r = o.body;
        }
      }
      return 'string' != typeof i || 16384 < i.length
        ? t.apply(this, arguments)
        : (void 0 !== n &&
            (n.method && (a = n.method.toUpperCase()), n.body && (r = n.body)),
          M({ method: a, endpoint: i, payload: r, protocol: 'fetch' }),
          t.apply(this, arguments));
    };
  }
  function P(e) {
    var t = e.WebSocket;
    e.WebSocket = function (e, n) {
      return n ? new t(e, n) : new t(e);
    };
    var n = t.prototype.send;
    (t.prototype.send = function (e) {
      return (
        M({ method: 'WS', endpoint: this.url, payload: e, protocol: 'ws' }),
        n.apply(this, arguments)
      );
    }),
      (e.WebSocket.prototype = t.prototype);
  }
  function N(e) {
    function t(e, t) {
      try {
        e.getEntries().forEach(function (e) {
          ('iframe' === e.initiatorType || 'script' === e.initiatorType) &&
            k(e.name) &&
            e.name.length < 16384 &&
            M({ method: 'GET', endpoint: e.name, protocol: 'performance' });
        });
      } catch (t) {
        de(t);
      }
    }
    var n = new PerformanceObserver(t);
    n.observe({ entryTypes: ['resource'] });
  }
  function A(e) {
    function n(n) {
      try {
        var e = n ? n.target : this,
          i = {
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
        M(i);
      } catch (t) {}
    }
    e.addEventListener('submit', n, !0);
  }
  function R() {
    function e(e) {
      try {
        e &&
          e.contentWindow &&
          e.contentWindow.addEventListener('message', function (e) {
            try {
              var t = e.data;
              if (!t || 1 !== t.type) return;
              var n = t.command || {},
                i = n.params || {};
              if (!i.url) return;
              var a = {
                method: i.method || 'GET',
                endpoint: i.url || '',
                payload: i.body || null,
                protocol: 'message',
              };
              M(a);
            } catch (t) {
              de(t);
            }
          });
      } catch (t) {}
    }
    function t() {
      for (
        var t = document.getElementsByTagName('IFRAME'), n = 0;
        n < t.length;
        n++
      )
        e(t[n]);
    }
    function n() {
      var t = new MutationObserver(function (t) {
        t.forEach(function (t) {
          t.addedNodes.forEach(function (t) {
            'IFRAME' == t.tagName && e(t);
          });
        });
      });
      t.observe(document, {
        subtree: !0,
        childList: !0,
        attributes: !1,
        characterData: !1,
      }),
        setTimeout(function () {
          t.disconnect();
        }, 5e3);
    }
    'complete' === document.readyState
      ? (t(), n())
      : (document.onreadystatechange = function () {
          'complete' === document.readyState && (t(), n());
        });
  }
  function D() {
    try {
      Error.stackTraceLimit = 20;
    } catch (t) {}
    try {
      return new Error().stack
        .split('\n')
        .slice(1)
        .map(function (e) {
          return e.trim();
        });
    } catch (t) {
      return null;
    }
  }
  function M(e, t) {
    var n = t || !1,
      i = D(),
      a = function () {
        try {
          var t = oe(e);
          if (('TRACKINGPLAN' == e.endpoint && (t = 'trackingplan'), !t))
            return;
          if (!I(t))
            return void de({
              m: 'Request ignored (' + t + ' not in whitelist)',
              request: e,
            });
          if (!T(e, Ge))
            return void de({
              m: 'Request ignored (content filter)',
              request: e,
            });
          var n = ae();
          if (!1 === n)
            return (
              j(we),
              (it = null),
              tt.push(e),
              de({ m: 'Pre queued, queue length = ' + tt.length }),
              void setTimeout(Z, Le)
            );
          if (((it = n.sampleRate), !U(Ne, n)))
            return void de({
              m: 'Request ignored (sampling)',
              mode: Ne,
              dict: n,
            });
          O(K(e, t, i));
        } catch (t) {
          le({ m: 'Trackingplan process error', error: t, request: e });
        }
      };
    n || Je ? a() : setTimeout(a, 0);
  }
  function O(e) {
    Be(e);
    var t = b(e);
    if (
      (2e5 < t.length && de({ m: 'Track Too big, ignored: ' + t.length }), We)
    )
      return void B(e, we);
    var n = b(X()).length;
    if (t.length + 2 + n > Ae)
      return B(e, we), void de({ m: 'Track > Batch Size: ' + t.length });
    var i = nt.length + t.length + n;
    i > Ae && (de({ m: 'Batch reaching limit: ' + i }), j(we)),
      (i = nt.length + t.length + n),
      de({ m: 'Queue len: ' + i, rawTrack: e }),
      0 !== nt.length && (nt += ','),
      (nt += t);
  }
  function j(e) {
    if (0 != nt.length) {
      var t = { requests: JSON.parse('[' + nt + ']'), common: X() };
      (nt = ''), F(t, e);
    }
  }
  function B(e, t) {
    var n = { requests: [e], common: X() };
    F(n, t);
  }
  function q() {
    var e = Se + be,
      t = [];
    return (
      Fe && t.push('debug=true'),
      null != Ve && t.push('t=' + Ve),
      0 < t.length && (e += '?' + t.join('&')),
      e
    );
  }
  function F(e, t) {
    function n(e) {
      var t = navigator.sendBeacon(q(), e),
        n = t ? 'accepted' : 'discarded';
      'accepted' == n && je(e), de('SendBeacon: ' + n);
    }
    function i(e) {
      var t = new XMLHttpRequest();
      t.open('POST', q(), !0),
        (t.onreadystatechange = function () {
          if (4 === t.readyState)
            try {
              de({ m: 'Parsed', response: JSON.parse(t.response) }),
                je(e, t.response);
            } catch (e) {}
        }),
        t.send(e);
    }
    if (
      ('function' == typeof qe && (e = qe(e)),
      de({ m: 'Sent', payload: e }),
      Oe)
    )
      return void de('Not sending, is dry run');
    var a = b(e);
    'xhr' === t ? i(a) : 'beacon' === t ? n(a) : void 0;
  }
  function U(e, t) {
    switch (e) {
      case 'user':
        return 1 === t.isSampledUser;
      case 'track':
        return Math.random() < 1 / t.sampleRate;
      case 'all':
        return !0;
      case 'none':
      default:
        return !1;
    }
  }
  function H() {
    return G().length;
  }
  function G() {
    if (!Qe) return [];
    try {
      var e = Ke();
      return 'object' == typeof e[0]
        ? e.map(function (e) {
            return 'object' == typeof e && null !== e ? fe(e) : e;
          })
        : [];
    } catch (e) {
      return [];
    }
  }
  function z() {
    var e = {};
    for (var t in Ue)
      try {
        e[t] = 'function' == typeof Ue[t] ? Ue[t]() : Ue[t];
      } catch (n) {
        de({ m: 'Error calculating tag value for key: ' + t, error: n }),
          (e[t] = null);
      }
    return (e = me(e, 100)), e;
  }
  function W() {
    for (
      var e, t = document.cookie, n = {}, a = t.split(';'), r = 0;
      r < a.length;
      r++
    )
      if (((e = a[r].trim()), e)) {
        var o = e.split('='),
          s = o[0].trim(),
          d = o[1] ? o[1].trim() : '';
        n[s] = d;
      }
    return n;
  }
  function K(e, n, i) {
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
      dl_i: H() - 1,
      last_click_path: dt,
      last_click_text: lt,
      tags: z(),
      stack_trace: i,
      cookies: Xe ? me(W(), 50) : null,
    };
  }
  function Q() {
    return se(
      {
        hostname: t.location.hostname,
        user_agent: navigator.userAgent,
        navigator_language: navigator.language || navigator.userLanguage,
        load_url: '',
      },
      _(),
    );
  }
  function X() {
    return {
      context: Q(),
      tp_id: be,
      source_alias: Ie,
      environment: Te,
      sdk: ut.sdk,
      sdk_version: ut.sdkVersion,
      sampling_rate: it,
      debug: xe,
      datalayer: G(),
      session_id: ee(),
      tags: z(),
      init_id: at,
    };
  }
  function V() {
    try {
      for (
        var e = t.performance.getEntriesByType('resource'),
          n = {},
          a = [],
          r = 0;
        r < e.length;
        r++
      ) {
        a.push(e[r].name);
        var o = '',
          s = e[r].name.replace(/(^\w+:|^)\/\//, ''),
          d = s.split('?'),
          l = d[0];
        (d = l.split('/')), (o = 1 < d.length ? d[0] + '/' + d[1] : d[0]);
        var p = o;
        ye.call(n, p) || (n[p] = 0), n[p]++;
      }
      return n;
    } catch (t) {
      return null;
    }
  }
  function J() {
    for (; tt.length; ) {
      var e = tt.shift();
      M(e);
    }
  }
  function Y(e, t) {
    return ye.call(e, 'environment_rates') && ye.call(e.environment_rates, t)
      ? e.environment_rates[t]
      : e.sample_rate;
  }
  function Z() {
    if (!$e && !(new Date().getTime() < Pe)) {
      var e = new XMLHttpRequest(),
        t = Ee + 'config-' + be + '.json';
      (e.onreadystatechange = function () {
        if (4 == this.readyState)
          try {
            var e = Y(JSON.parse(this.responseText), Te);
            if (s(e))
              throw (
                ((Pe = new Date().getTime() + 300000),
                new Error('Invalid sampling rate'))
              );
            (Pe = 0), ie(e), u({ event_name: 'new_dau' }), J();
          } catch (e) {}
        $e = !1;
      }),
        e.open('GET', t, !0),
        ($e = !0),
        e.send();
    }
  }
  function $(e) {
    n.setItem('_trackingplan_session_id', e),
      n.setItem('_trackingplan_session_ts', Date.now().toString());
  }
  function ee() {
    if (!ot) return null;
    var e = n.getItem('_trackingplan_session_id'),
      t = n.getItem('_trackingplan_session_ts');
    if (null === e || null === t)
      return (
        de({ m: 'Session ID: Creating for the first time session ' }), te()
      );
    var i = Date.now(),
      a = parseInt(t, 10),
      r = 1e3 * (60 * rt);
    return isNaN(a) || i > a + r
      ? (de({ m: 'Session ID: Updating because timeout' }), te())
      : (n.setItem('_trackingplan_session_ts', i.toString()), e);
  }
  function te() {
    var e = 'true' === n.getItem('_trackingplan_live_debug_mode'),
      t = ne();
    !0 == e && (t = '55555555' + t.substring(8));
    var i = Date.now();
    return (
      n.setItem('_trackingplan_session_id', t),
      n.setItem('_trackingplan_session_ts', i.toString()),
      y({
        session_landing: document.location.href,
        session_referrer: document.referrer,
      }),
      u({ event_name: 'new_session' }),
      t
    );
  }
  function ne() {
    var e = new Date().getTime(),
      t = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
        var n = 0 | (e + 16 * Math.random()) % 16;
        return (e = o(e / 16)), ('x' === t ? n : 8 | (3 & n)).toString(16);
      });
    return t;
  }
  function ie(e) {
    if (!1 === e)
      return (
        n.removeItem('_trackingplan_sample_rate'),
        n.removeItem('_trackingplan_sample_rate_ts'),
        void n.removeItem('_trackingplan_is_sampled_user')
      );
    var t = Math.random() < 1 / e ? 1 : 0;
    de({ m: 'Trackingplan sample rate = ' + e + '. isSampledUser ' + t }),
      n.setItem('_trackingplan_sample_rate_ts', new Date().getTime()),
      n.setItem('_trackingplan_sample_rate', e),
      n.setItem('_trackingplan_is_sampled_user', t);
  }
  function ae() {
    var e = n.getItem('_trackingplan_sample_rate_ts');
    if (null === e) return !1;
    if (parseInt(e) + 1e3 * Ce < new Date().getTime())
      return de({ m: 'Trackingplan sample rate expired' }), ie(!1), !1;
    var t = parseInt(n.getItem('_trackingplan_sample_rate'));
    return s(t)
      ? (de({ m: 'Trackingplan sample rate expired' }), ie(!1), !1)
      : {
          sampleRate: t,
          isSampledUser: parseInt(n.getItem('_trackingplan_is_sampled_user')),
        };
  }
  function re(e, t) {
    if (null === e || null === t) return !0;
    if (
      ((t = t.toString()),
      '/' === e.charAt(0) && '/' === e.charAt(e.length - 1))
    ) {
      var n = new RegExp(e.slice(1, -1));
      return n.test(t);
    }
    return -1 !== t.indexOf(e);
  }
  function oe(e) {
    var t = e.endpoint,
      n = e.payload,
      a = e.protocol;
    if (k(t)) {
      for (var r in ke)
        if (ke.hasOwnProperty(r)) {
          var o = r.split('@'),
            s = null;
          1 < o.length && (s = o[0]);
          var d = 1 < o.length ? o[1] : o[0],
            l = d.split('%'),
            p = l[0],
            c = 2 === l.length ? l[1] : null,
            m = _e.slice();
          if (s)
            for (var g, u = s.split(','), h = 0; h < u.length; h++)
              if (((g = u[h].trim()), !!g)) {
                var f = g.charAt(0),
                  y = g.substring(1);
                if ('+' === f) {
                  var _ = m.indexOf(y);
                  -1 !== _ && m.splice(_, 1);
                } else '-' === f && -1 === m.indexOf(y) && m.push(y);
              }
          if ('string' == typeof a && -1 !== m.indexOf(a)) continue;
          if (re(p, t) && re(c, n)) return ke[r];
        }
      return !1;
    }
  }
  function se(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function de(e) {
    xe && i.log('TP ' + be, e);
  }
  function le(e) {
    t.console && i.warn && i.warn(e);
  }
  function pe(e) {
    try {
      if (!(e instanceof Element)) return;
      for (
        var t = [];
        e.nodeType === Node.ELEMENT_NODE &&
        'html' !== e.nodeName.toLowerCase() &&
        'body' !== e.nodeName.toLowerCase();

      ) {
        var n = e.nodeName.toLowerCase();
        if (e.id) {
          (n += '#' + e.id), t.unshift(n);
          break;
        } else {
          e.className &&
            (n += '.' + e.className.split(' ').join('.').replace(/\s+/g, '.'));
          for (var i = e, a = 1; (i = i.previousElementSibling); ) {
            var r = i.nodeName.toLowerCase();
            i.className &&
              (r +=
                '.' + i.className.split(' ').join('.').replace(/\s+/g, '.')),
              r === n && a++;
          }
          1 != a && (n += ':nth-of-type(' + a + ')');
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
      var t = null;
      return (
        'input' === e.tagName.toLowerCase() && 'password' !== e.type
          ? (t = e.value.trim())
          : 'input' !== e.tagName.toLowerCase() &&
            'script' !== e.tagName.toLowerCase() &&
            'style' !== e.tagName.toLowerCase() &&
            (t = e.textContent.trim()),
        t ? t.slice(0, 50) : null
      );
    } catch (t) {
      return null;
    }
  }
  function me(e, t) {
    if ('string' == typeof e && e.length > t)
      return e.substring(0, t - 1) + '\u2026';
    if (Array.isArray(e))
      return e.map(function (e) {
        return me(e, t);
      });
    if ('object' == typeof e && null !== e) {
      var n = {};
      return (
        Object.keys(e).forEach(function (i) {
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
      var e = (function (Y) {
        'use strict';
        var $,
          ee,
          te,
          ne,
          ie,
          Z = Math.max,
          ae = -1,
          re = function (t) {
            addEventListener(
              'pageshow',
              function (e) {
                e.persisted && ((ae = e.timeStamp), t(e));
              },
              !0,
            );
          },
          c = function () {
            var t =
              self.performance &&
              performance.getEntriesByType &&
              performance.getEntriesByType('navigation')[0];
            if (t && 0 < t.responseStart && t.responseStart < performance.now())
              return t;
          },
          u = function () {
            var t = c();
            return (t && t.activationStart) || 0;
          },
          oe = function (i, e) {
            var n = c(),
              t = 'navigate';
            return (
              0 <= ae
                ? (t = 'back-forward-cache')
                : n &&
                  (document.prerendering || 0 < u()
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
                id: 'v4-'
                  .concat(Date.now(), '-')
                  .concat(o(8999999999999 * Math.random()) + 1e12),
                navigationType: t,
              }
            );
          },
          f = function (i, a, e) {
            try {
              if (PerformanceObserver.supportedEntryTypes.includes(i)) {
                var t = new PerformanceObserver(function (t) {
                  Promise.resolve().then(function () {
                    a(t.getEntries());
                  });
                });
                return (
                  t.observe(Object.assign({ type: i, buffered: !0 }, e || {})),
                  t
                );
              }
            } catch (t) {}
          },
          d = function (s, e, n, t) {
            var r, d;
            return function (i) {
              0 <= e.value &&
                (i || t) &&
                ((d = e.value - (r || 0)) || void 0 === r) &&
                ((r = e.value),
                (e.delta = d),
                (e.rating = (function (t, e) {
                  return t > e[1]
                    ? 'poor'
                    : t > e[0]
                    ? 'needs-improvement'
                    : 'good';
                })(e.value, n)),
                s(e));
            };
          },
          s = function (t) {
            requestAnimationFrame(function () {
              return requestAnimationFrame(function () {
                return t();
              });
            });
          },
          l = function (t) {
            document.addEventListener('visibilitychange', function () {
              'hidden' === document.visibilityState && t();
            });
          },
          v = function (t) {
            var e = !1;
            return function () {
              e || (t(), (e = !0));
            };
          },
          p = -1,
          e = function () {
            return 'hidden' !== document.visibilityState ||
              document.prerendering
              ? 1 / 0
              : 0;
          },
          m = function (t) {
            'hidden' === document.visibilityState &&
              -1 < p &&
              ((p = 'visibilitychange' === t.type ? t.timeStamp : 0), y());
          },
          g = function () {
            addEventListener('visibilitychange', m, !0),
              addEventListener('prerenderingchange', m, !0);
          },
          y = function () {
            removeEventListener('visibilitychange', m, !0),
              removeEventListener('prerenderingchange', m, !0);
          },
          T = function () {
            return (
              0 > p &&
                ((p = e()),
                g(),
                re(function () {
                  setTimeout(function () {
                    (p = e()), g();
                  }, 0);
                })),
              {
                get firstHiddenTime() {
                  return p;
                },
              }
            );
          },
          E = function (t) {
            document.prerendering
              ? addEventListener(
                  'prerenderingchange',
                  function () {
                    return t();
                  },
                  !0,
                )
              : t();
          },
          L = [1800, 3e3],
          S = function (a, e) {
            (e = e || {}),
              E(function () {
                var n,
                  l = T(),
                  p = oe('FCP'),
                  r = f('paint', function (t) {
                    t.forEach(function (t) {
                      'first-contentful-paint' === t.name &&
                        (r.disconnect(),
                        t.startTime < l.firstHiddenTime &&
                          ((p.value = Z(t.startTime - u(), 0)),
                          p.entries.push(t),
                          n(!0)));
                    });
                  });
                r &&
                  ((n = d(a, p, L, e.reportAllChanges)),
                  re(function (t) {
                    (p = oe('FCP')),
                      (n = d(a, p, L, e.reportAllChanges)),
                      s(function () {
                        (p.value = performance.now() - t.timeStamp), n(!0);
                      });
                  }));
              });
          },
          b = [0.1, 0.25],
          w = 0,
          C = 1 / 0,
          se = 0,
          de = function (t) {
            t.forEach(function (t) {
              t.interactionId &&
                ((C = a(C, t.interactionId)),
                (se = Z(se, t.interactionId)),
                (w = se ? (se - C) / 7 + 1 : 0));
            });
          },
          F = function () {
            return $ ? w : performance.interactionCount || 0;
          },
          M = function () {
            'interactionCount' in performance ||
              $ ||
              ($ = f('event', de, {
                type: 'event',
                buffered: !0,
                durationThreshold: 0,
              }));
          },
          k = [],
          D = new Map(),
          B = 0,
          le = function () {
            var t = a(k.length - 1, o((F() - B) / 50));
            return k[t];
          },
          x = [],
          H = function (i) {
            if (
              (x.forEach(function (e) {
                return e(i);
              }),
              i.interactionId || 'first-input' === i.entryType)
            ) {
              var e = k[k.length - 1],
                n = D.get(i.interactionId);
              if (n || 10 > k.length || i.duration > e.latency) {
                if (n)
                  i.duration > n.latency
                    ? ((n.entries = [i]), (n.latency = i.duration))
                    : i.duration === n.latency &&
                      i.startTime === n.entries[0].startTime &&
                      n.entries.push(i);
                else {
                  var t = {
                    id: i.interactionId,
                    latency: i.duration,
                    entries: [i],
                  };
                  D.set(t.id, t), k.push(t);
                }
                k.sort(function (t, e) {
                  return e.latency - t.latency;
                }),
                  10 < k.length &&
                    k.splice(10).forEach(function (t) {
                      return D.delete(t.id);
                    });
              }
            }
          },
          N = function (i) {
            var a = self.requestIdleCallback || self.setTimeout,
              n = -1;
            return (
              (i = v(i)),
              'hidden' === document.visibilityState ? i() : ((n = a(i)), l(i)),
              n
            );
          },
          q = [200, 500],
          O = [2500, 4e3],
          j = {},
          V = [800, 1800],
          _ = function n(t) {
            document.prerendering
              ? E(function () {
                  return n(t);
                })
              : 'complete' === document.readyState
              ? setTimeout(t, 0)
              : addEventListener(
                  'load',
                  function () {
                    return n(t);
                  },
                  !0,
                );
          },
          z = { passive: !0, capture: !0 },
          G = new Date(),
          J = function (t, e) {
            ee ||
              ((ee = e),
              (te = t),
              (ne = new Date()),
              U(removeEventListener),
              K());
          },
          K = function () {
            if (0 <= te && te < ne - G) {
              var t = {
                entryType: 'first-input',
                name: ee.type,
                target: ee.target,
                cancelable: ee.cancelable,
                startTime: ee.timeStamp,
                processingStart: ee.timeStamp + te,
              };
              ie.forEach(function (e) {
                e(t);
              }),
                (ie = []);
            }
          },
          Q = function (t) {
            if (t.cancelable) {
              var e =
                (1e12 < t.timeStamp ? new Date() : performance.now()) -
                t.timeStamp;
              'pointerdown' == t.type
                ? (function (a, e) {
                    var n = function () {
                        J(a, e), r();
                      },
                      t = function () {
                        r();
                      },
                      r = function () {
                        removeEventListener('pointerup', n, z),
                          removeEventListener('pointercancel', t, z);
                      };
                    addEventListener('pointerup', n, z),
                      addEventListener('pointercancel', t, z);
                  })(e, t)
                : J(e, t);
            }
          },
          U = function (t) {
            ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(
              function (e) {
                return t(e, Q, z);
              },
            );
          },
          W = [100, 300];
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
                v(function () {
                  var n,
                    c = oe('CLS', 0),
                    m = 0,
                    g = [],
                    h = function (t) {
                      t.forEach(function (i) {
                        if (!i.hadRecentInput) {
                          var e = g[0],
                            n = g[g.length - 1];
                          m &&
                          1e3 > i.startTime - n.startTime &&
                          5e3 > i.startTime - e.startTime
                            ? ((m += i.value), g.push(i))
                            : ((m = i.value), (g = [i]));
                        }
                      }),
                        m > c.value && ((c.value = m), (c.entries = g), n());
                    },
                    a = f('layout-shift', h);
                  a &&
                    ((n = d(p, c, b, e.reportAllChanges)),
                    l(function () {
                      h(a.takeRecords()), n(!0);
                    }),
                    re(function () {
                      (m = 0),
                        (c = oe('CLS', 0)),
                        (n = d(p, c, b, e.reportAllChanges)),
                        s(function () {
                          return n();
                        });
                    }),
                    setTimeout(n, 0));
                }),
              );
          }),
          (Y.onFCP = S),
          (Y.onFID = function (t, e) {
            (e = e || {}),
              E(function () {
                var n,
                  r = T(),
                  o = oe('FID'),
                  c = function (t) {
                    t.startTime < r.firstHiddenTime &&
                      ((o.value = t.processingStart - t.startTime),
                      o.entries.push(t),
                      n(!0));
                  },
                  a = function (t) {
                    t.forEach(c);
                  },
                  s = f('first-input', a);
                (n = d(t, o, W, e.reportAllChanges)),
                  s &&
                    (l(
                      v(function () {
                        a(s.takeRecords()), s.disconnect();
                      }),
                    ),
                    re(function () {
                      var i;
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
              E(function () {
                var n;
                M();
                var p,
                  c = oe('INP'),
                  m = function (t) {
                    N(function () {
                      t.forEach(H);
                      var e = le();
                      e &&
                        e.latency !== c.value &&
                        ((c.value = e.latency), (c.entries = e.entries), p());
                    });
                  },
                  o = f('event', m, {
                    durationThreshold:
                      null !== (n = e.durationThreshold) && void 0 !== n
                        ? n
                        : 40,
                  });
                (p = d(s, c, q, e.reportAllChanges)),
                  o &&
                    (o.observe({ type: 'first-input', buffered: !0 }),
                    l(function () {
                      m(o.takeRecords()), p(!0);
                    }),
                    re(function () {
                      (B = F()),
                        (k.length = 0),
                        D.clear(),
                        (c = oe('INP')),
                        (p = d(s, c, q, e.reportAllChanges));
                    }));
              }));
          }),
          (Y.onLCP = function (p, c) {
            (c = c || {}),
              E(function () {
                var n,
                  m = T(),
                  g = oe('LCP'),
                  e = function (t) {
                    c.reportAllChanges || (t = t.slice(-1)),
                      t.forEach(function (t) {
                        t.startTime < m.firstHiddenTime &&
                          ((g.value = Z(t.startTime - u(), 0)),
                          (g.entries = [t]),
                          n());
                      });
                  },
                  r = f('largest-contentful-paint', e);
                if (r) {
                  n = d(p, g, O, c.reportAllChanges);
                  var a = v(function () {
                    j[g.id] ||
                      (e(r.takeRecords()),
                      r.disconnect(),
                      (j[g.id] = !0),
                      n(!0));
                  });
                  ['keydown', 'click'].forEach(function (t) {
                    addEventListener(
                      t,
                      function () {
                        return N(a);
                      },
                      !0,
                    );
                  }),
                    l(a),
                    re(function (e) {
                      (g = oe('LCP')),
                        (n = d(p, g, O, c.reportAllChanges)),
                        s(function () {
                          (g.value = performance.now() - e.timeStamp),
                            (j[g.id] = !0),
                            n(!0);
                        });
                    });
                }
              });
          }),
          (Y.onTTFB = function (i, e) {
            e = e || {};
            var a = oe('TTFB'),
              o = d(i, a, V, e.reportAllChanges);
            _(function () {
              var t = c();
              t &&
                ((a.value = Z(t.responseStart - u(), 0)),
                (a.entries = [t]),
                o(!0),
                re(function () {
                  (a = oe('TTFB', 0)), (o = d(i, a, V, e.reportAllChanges))(!0);
                }));
            });
          }),
          Y
        );
      })({});
      e.onCLS(ge),
        e.onFCP(ge),
        e.onFID(ge),
        e.onINP(ge),
        e.onLCP(ge),
        e.onTTFB(ge);
    } catch (t) {}
  }
  function he() {
    t.addEventListener('error', function (e) {
      ct++;
    });
    var e = i.warn;
    i.warn = function () {
      mt++, e.apply(i, arguments);
    };
  }
  function fe(e) {
    function t(e) {
      return -1 !== Ze.indexOf(e);
    }
    function n(e) {
      return 'string' == typeof e
        ? '*'.repeat(a(e.length, 8))
        : 'number' == typeof e
        ? 0
        : e;
    }
    function i(e) {
      for (var a in e)
        e.hasOwnProperty(a) &&
          ('object' == typeof e[a] && null !== e[a]
            ? i(e[a])
            : t(a) && (e[a] = n(e[a])));
      return e;
    }
    var r = JSON.parse(b(e));
    return i(r);
  }
  var ye = Object.prototype.hasOwnProperty;
  if (t.Trackingplan)
    return void (
      t.Trackingplan.testing || le('Trackingplan snippet included twice.')
    );
  var _e = ['performance'],
    ve = {
      '/g/collect?v=2&tid': 'googleanalytics',
      '/\\/[a-z0-9]{6}\\?tid=[^&]+&v=2/': 'googleanalytics',
      'api.segment.io': 'segment',
      'segmentapi': 'segment',
      'seg-api': 'segment',
      'segment-api': 'segment',
      '/.*api-iam.intercom.io/messenger/web/(ping|events|metrics|open).*/':
        'intercom',
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
      '+performance@/.*/pagead/(viewthroughconversion|conversion)/.*/':
        'google_ads',
      '+performance@/.*(/activity|/fls).*src=/': 'floodlight',
      '+performance@sslwidget.criteo.com/event': 'criteo',
      '+performance@track.adform.net/Serving/TrackPoint': 'adform',
      '/.*edge\\.adobedc\\.net\\/ee\\/.*(collect|interact).*/': 'adobexdm',
    },
    ke = {},
    be = null,
    Te = 'PRODUCTION',
    Ie = null,
    we = 'xhr',
    xe = !1,
    Se = 'https://tracks.trackingplan.com/v1/',
    Ee = 'https://config.trackingplan.com/',
    Le = 0,
    Ce = 86400,
    Pe = 0,
    Ne = 'user',
    Ae = 55e3,
    Re = 20,
    De = ['img', 'xhr', 'beacon', 'fetch', 'performance', 'message'],
    Me = !1,
    Oe = !1,
    je = function () {},
    Be = function () {},
    qe = function (e) {
      return e;
    },
    Fe = !1,
    Ue = {},
    He = null,
    Ge = [],
    ze = null,
    We = !1,
    Ke = function () {
      return t.dataLayer;
    },
    Qe = !0,
    Xe = !1,
    Ve = null,
    Je = !1,
    Ye = [
      'userId',
      'user_id',
      'userid',
      'password',
      'pass',
      'token',
      'userToken',
      'usertoken',
      'user_token',
    ],
    Ze = Ye,
    $e = !1,
    et = '_trackingplan_live_debug_mode',
    tt = [],
    nt = '',
    it = null,
    at = '',
    rt = 30,
    ot = !0,
    st = !0,
    dt = null,
    lt = null,
    pt = {},
    ct = 0,
    mt = 0,
    gt = !1,
    ut = (t.Trackingplan = {
      sdk: 'js',
      sdkVersion: '1.27.0',
      options: null,
      tpId: null,
      testing: !1,
      setOptions: function (e, t) {
        (t = this.options = t || {}),
          (be = this.tpId = e),
          (Te = t.environment || Te),
          (Ie = t.sourceAlias || Ie),
          (we = t.sendMethod || we),
          (ke = se(ve, t.customDomains || {})),
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
          (Ge = t.contentFilters || Ge),
          (ze = t.providersWhitelist || ze),
          (We = 'undefined' == typeof t.realtime ? We : t.realtime),
          (Ke = t.getDataLayer || Ke),
          (rt = t.sessionDurationMinutes || rt),
          (st =
            'undefined' == typeof t.intervalsOnInit ? st : t.intervalsOnInit),
          (Qe = 'undefined' == typeof t.useDataLayer ? Qe : t.useDataLayer),
          (Xe = 'undefined' == typeof t.useCookies ? Xe : t.useCookies),
          (ot = 'undefined' == typeof t.useSessions ? ot : t.useSessions),
          t.datalayerMaskKeys && (Ze = Ye.concat(t.datalayerMaskKeys)),
          (Je = this.testing = t.testing || Je),
          We && ((He = 1), (Ne = 'all'), (Ae = 1)),
          Je && (Ve = Date.now()),
          de({ m: 'TP options updated', options: t });
      },
      init: function (e, a) {
        try {
          if (Je)
            return void le('Trackingplan SDK is running in a test environment');
          if (!v()) throw new Error('TP Not compatible browser');
          if (null !== be) throw new Error('TP Init already happened');
          if ('string' != typeof e || '' === e)
            throw new Error('tpId is not provided');
          var r = null;
          if (t.performance && t.performance.getEntriesByType) {
            var o = t.performance.getEntriesByType('navigation')[0];
            r = o ? o.name : t.location.href;
          } else r = t.location.href;
          l(r);
          var s = p();
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
          var d = 'true' === n.getItem(et);
          d && ((a = a || {}), (a.realtime = !0), (a.samplingMode = 'all')),
            ut.setOptions(e, a),
            null !== He && ie(He),
            (at = ne()),
            h(t),
            document.addEventListener('visibilitychange', function () {
              'hidden' === document.visibilityState &&
                setTimeout(function () {
                  j('beacon'), de({ m: 'visibility beacon' });
                }, 3e3);
            }),
            t.addEventListener('pagehide', g),
            t.addEventListener('beforeunload', g),
            t.document.addEventListener(
              'click',
              function (e) {
                (dt = pe(e.target)), (lt = ce(e.target));
              },
              !1,
            ),
            f() &&
              (de({ m: 'New User' }),
              y({
                landing: document.location.href,
                referrer: document.referrer,
              }),
              u({ event_name: 'new_user' })),
            /[?&]utm_[^=]+/.test(document.location.search) &&
              y({ last_utm_page: document.location.href });
          var _ = ee();
          d && m(_),
            u({ event_name: 'page_load' }),
            !0 === st && ut.initIntervals(),
            ue(),
            he(),
            de({ m: 'TP init finished', options: a });
        } catch (e) {
          le({ m: 'TP init error', error: e });
        }
      },
      flush: function () {
        j(we);
      },
      queueSize: function () {
        return nt.length;
      },
      updateTags: function (e) {
        j(we), (Ue = se(Ue, e));
      },
      initIntervals: function () {
        setTimeout(function () {
          gt ||
            (u({
              event_name: 'pixels',
              properties: { pixels: V(), sent_at: 'timeout' },
            }),
            (gt = !0));
        }, 1e4),
          setInterval(function () {
            j(we);
          }, 1e3 * Re);
      },
      getSessionId: function () {
        return n.getItem('_trackingplan_session_id');
      },
      enableLiveDebugMode: function () {
        n.setItem(et, 'true'), te(), t.location.reload();
      },
      disableLiveDebugMode: function () {
        localStorage.removeItem(et), t.location.reload();
      },
    }),
    ht = !1;
})(window, localStorage, console);
Trackingplan.init('TP3184092', {
  environment: tealiumEnv === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT',
  tracksEndPoint: 'https://eu-tracks.trackingplan.com/v1/',
  // tags: { "app_version": "...", } // See docs to know about optional tags.
});
