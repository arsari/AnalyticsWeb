(function (t, n, a) {
  var i = Math.floor,
    r = Number.isNaN;
  function s(e) {
    return e && "object" == typeof e
      ? !0 === e.mode
        ? e.test_title && e.test_session_name && e.environment
          ? e
          : null
        : null
      : null;
  }
  function o(e) {
    try {
      e = new URL(e);
      var t = new URLSearchParams(e.search),
        i = t.get("trackingplan_regression_mode");
      if ("true" === i) {
        var r = {
          mode: !0,
          test_title: t.get("trackingplan_regression_test_title"),
          test_session_name: t.get("trackingplan_regression_test_session_name"),
          environment: t.get("trackingplan_regression_environment"),
        };
        if (((r = s(r)), !r))
          return void oe({
            m: "TP Regression mode init failed - missing required parameters",
          });
        n.setItem("_trackingplan_regression", JSON.stringify(r)),
          a.log("TP Regression mode enabled", r);
      } else
        "false" === i &&
          (a.log("TP Regression mode disabled"),
          n.removeItem("_trackingplan_regression"));
    } catch (t) {
      oe({ m: "TP Regression mode init failed - catch" });
    }
  }
  function l() {
    try {
      var e = n.getItem("_trackingplan_regression");
      return e ? s(JSON.parse(e)) : null;
    } catch (t) {
      return null;
    }
  }
  function d(e) {
    try {
      e = new URL(e);
      var t = new URLSearchParams(e.search),
        a = t.get("trackingplan_live_debug");
      a && (J(a), n.setItem("_trackingplan_live_debug_mode", "true"));
    } catch (t) {}
  }
  function p(e) {
    var t =
      "https://panel.trackingplan.com/plans/" +
      Ne +
      "/?open_tracks_explorer=true&te_session_id=" +
      e;
    a.log(
      "%cTrackingplan Live Debug mode is Enabled.%c\nThe session id is %c" +
        e +
        "%c.\nSee the live session at " +
        t +
        "\nDisable Live Debug Mode by executing %cTrackingplan.disableLiveDebugMode()",
      "font-weight: bold;",
      "",
      "font-weight: bold;",
      "",
      "font-style: italic"
    );
  }
  function c(t) {
    if (!Nt) {
      (Nt = !0), se({ m: "unload event", e: t.type }), (De = "beacon");
      var e = { web_vitals: It, js_error_count: St, js_warning_count: Et };
      m({ event_name: "page_unload", properties: e }, !0),
        Lt ||
          (m(
            {
              event_name: "pixels",
              properties: { pixels: W(), sent_at: t.type },
            },
            !0
          ),
          (Lt = !0)),
        O("beacon");
    }
  }
  function m(e, t) {
    var n = {
      method: "POST",
      endpoint: "TRACKINGPLAN",
      payload: JSON.stringify(e),
    };
    N(n, t);
  }
  function g(e) {
    if (Ge.includes("img"))
      try {
        x(e);
      } catch (t) {
        se(t);
      }
    if (Ge.includes("xhr"))
      try {
        w(e);
      } catch (t) {
        se(t);
      }
    if (Ge.includes("beacon"))
      try {
        S(e);
      } catch (t) {
        se(t);
      }
    if (Ge.includes("form"))
      try {
        C(e);
      } catch (t) {
        se(t);
      }
    if (Ge.includes("ws"))
      try {
        L(e);
      } catch (t) {
        se(t);
      }
    if (Ge.includes("fetch"))
      try {
        E(e);
      } catch (t) {
        se(t);
      }
    if (Ge.includes("performance"))
      try {
        P(e);
      } catch (t) {
        se(t);
      }
    if (Ge.includes("message"))
      try {
        A();
      } catch (t) {
        se(t);
      }
  }
  function u() {
    return null === n.getItem("_trackingplan_initial") || We;
  }
  function h(e) {
    var t = _();
    n.setItem("_trackingplan_initial", JSON.stringify(re(t, e)));
  }
  function _() {
    try {
      return null === n.getItem("_trackingplan_initial")
        ? {}
        : JSON.parse(n.getItem("_trackingplan_initial"));
    } catch (t) {
      return {};
    }
  }
  function y() {
    try {
      if ((n.setItem("_tp_t", "a"), "a" !== n.getItem("_tp_t"))) return !1;
      if ((n.removeItem("_tp_t"), "function" != typeof navigator.sendBeacon))
        return !1;
    } catch (t) {
      return !1;
    }
    return !0;
  }
  function f(e) {
    return "string" == typeof e || e instanceof String;
  }
  function v(e) {
    return JSON.stringify(e, function (e, t) {
      return t instanceof Element ? t.nodeType : t;
    });
  }
  function k(e, t) {
    if (0 === t.length) return !0;
    for (var n = 0; n < t.length; n++) {
      if (
        jt.call(e, "payload") &&
        "string" == typeof e.payload &&
        0 <= e.payload.indexOf(t[n])
      )
        return !0;
      if (
        jt.call(e, "endpoint") &&
        "string" == typeof e.endpoint &&
        0 <= e.endpoint.indexOf(t[n])
      )
        return !0;
    }
    return !1;
  }
  function b(e) {
    return !(null !== nt) || 0 <= nt.indexOf(e);
  }
  function x(e) {
    var t = e.Object.getOwnPropertyDescriptor(
      e.HTMLImageElement.prototype,
      "src"
    ).set;
    e.Object.defineProperty(e.HTMLImageElement.prototype, "src", {
      set: function (e) {
        return !f(e) || 16384 < e.length
          ? t.apply(this, arguments)
          : (N({ method: "GET", endpoint: e, protocol: "img" }),
            t.apply(this, arguments));
      },
    });
    var n = e.HTMLImageElement.prototype.setAttribute;
    e.HTMLImageElement.prototype.setAttribute = function (e, t) {
      if ("src" == e.toLowerCase()) {
        if (!f(t) || t.length > 16384) return n.apply(this, arguments);
        N({ method: "GET", endpoint: t, protocol: "img" });
      }
      return n.apply(this, arguments);
    };
  }
  function T(e) {
    var t = e;
    try {
      t instanceof FormData && (t = JSON.stringify(Object.fromEntries(t)));
    } catch (t) {}
    return t;
  }
  function w(e) {
    var t = e.XMLHttpRequest.prototype.open,
      n = e.XMLHttpRequest.prototype.send;
    (e.XMLHttpRequest.prototype.open = function (e, n) {
      return (this._tpUrl = n), (this._tpMethod = e), t.apply(this, arguments);
    }),
      (e.XMLHttpRequest.prototype.send = function (e) {
        var t = T(e);
        return (
          I(
            t,
            function (e) {
              N({
                method: this._tpMethod,
                endpoint: this._tpUrl,
                payload: e,
                protocol: "xhr",
              });
            }.bind(this)
          ),
          n.apply(this, arguments)
        );
      });
  }
  function I(e, t) {
    if (e instanceof Blob) {
      var n = new FileReader();
      (n.onload = function () {
        var e = n.result.split(",")[1];
        t(e);
      }),
        n.readAsDataURL(e);
    } else t(e);
  }
  function S(e) {
    var t = e.navigator.sendBeacon;
    e.navigator.sendBeacon = function (e, n) {
      if (!f(e) || 16384 < e.length) return t.apply(this, arguments);
      var a = T(n);
      return (
        I(a, function (t) {
          N({ method: "POST", endpoint: e, payload: t, protocol: "beacon" });
        }),
        t.apply(this, arguments)
      );
    };
  }
  function E(e) {
    var t = e.fetch;
    e.fetch = function (e, n) {
      var a,
        i = "GET",
        r = null;
      if ("string" == typeof e) a = e;
      else {
        if (!(e instanceof Request)) return t.apply(this, arguments);
        if (((a = e.url), (i = e.method), !e.bodyUsed)) {
          var s = e.clone();
          r = s.body;
        }
      }
      return "string" != typeof a || 16384 < a.length
        ? t.apply(this, arguments)
        : (void 0 !== n &&
            (n.method && (i = n.method.toUpperCase()), n.body && (r = n.body)),
          N({ method: i, endpoint: a, payload: r, protocol: "fetch" }),
          t.apply(this, arguments));
    };
  }
  function L(e) {
    var t = e.WebSocket;
    e.WebSocket = function (e, n) {
      return n ? new t(e, n) : new t(e);
    };
    var n = t.prototype.send;
    (t.prototype.send = function (e) {
      return (
        N({ method: "WS", endpoint: this.url, payload: e, protocol: "ws" }),
        n.apply(this, arguments)
      );
    }),
      (e.WebSocket.prototype = t.prototype);
  }
  function P(e) {
    function t(e, t) {
      try {
        e.getEntries().forEach(function (e) {
          ("iframe" === e.initiatorType || "script" === e.initiatorType) &&
            f(e.name) &&
            e.name.length < 16384 &&
            N({ method: "GET", endpoint: e.name, protocol: "performance" });
        });
      } catch (t) {
        se(t);
      }
    }
    var n = new PerformanceObserver(t);
    n.observe({ entryTypes: ["resource"] });
  }
  function C(e) {
    function n(n) {
      try {
        var e = n ? n.target : this,
          a = {
            method: e.method,
            endpoint: e.action,
            payload: JSON.stringify({
              location: t.location.href,
              form_id: e.id,
              method: e.method,
              form_data: Object.fromEntries(new FormData(e)),
            }),
            protocol: "form",
          };
        N(a);
      } catch (t) {}
    }
    e.addEventListener("submit", n, !0);
  }
  function A() {
    function e(e) {
      try {
        e &&
          e.contentWindow &&
          e.contentWindow.addEventListener("message", function (e) {
            try {
              var t = e.data;
              if (!t || 1 !== t.type) return;
              var n = t.command || {},
                a = n.params || {};
              if (!a.url) return;
              var i = {
                method: a.method || "GET",
                endpoint: a.url || "",
                payload: a.body || null,
                protocol: "message",
              };
              N(i);
            } catch (t) {
              se(t);
            }
          });
      } catch (t) {}
    }
    function t() {
      for (
        var t = document.getElementsByTagName("IFRAME"), n = 0;
        n < t.length;
        n++
      )
        e(t[n]);
    }
    function n() {
      var t = new MutationObserver(function (t) {
        t.forEach(function (t) {
          t.addedNodes.forEach(function (t) {
            "IFRAME" == t.tagName && e(t);
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
    "complete" === document.readyState
      ? (t(), n())
      : (document.onreadystatechange = function () {
          "complete" === document.readyState && (t(), n());
        });
  }
  function R() {
    try {
      Error.stackTraceLimit = 20;
    } catch (t) {}
    try {
      return new Error().stack
        .split("\n")
        .slice(1)
        .map(function (e) {
          return e.trim();
        });
    } catch (t) {
      return null;
    }
  }
  function N(e, t) {
    var n = t || !1,
      a = R();
    e.ts = e.ts || new Date().getTime();
    var i = function () {
      try {
        var t = ne();
        if (!1 === t)
          return (
            O(De),
            (ft = null),
            _t.push(e),
            se({ m: "Pre queued, queue length = " + _t.length, request: e }),
            void setTimeout(X, Be)
          );
        ft = t.sampleRate;
        var n = ie(e);
        if (("TRACKINGPLAN" == e.endpoint && (n = "trackingplan"), !n)) return;
        if (!b(n))
          return void se({
            m: "Request ignored (" + n + " not in whitelist)",
            request: e,
          });
        if (!k(e, tt))
          return void se({ m: "Request ignored (content filter)", request: e });
        if (!z(Ke, t)) {
          if (
            (se({
              m: "Request ignored by general sampling",
              mode: Ke,
              sampleRateDict: t,
              request: e,
            }),
            Pt)
          ) {
            var i = ve(e, n);
            if (i.useCustomSampling)
              return (
                se({
                  m: "But request has passed custom sampling",
                  mode: Ke,
                  sampleRateDict: t,
                  customSampling: i,
                  request: e,
                }),
                (e.unsampled = !0),
                (e.custom_sample_rate = i.sampleRate),
                (e.custom_sample_rule = i.rule),
                void j(U(e, n, a))
              );
          }
          return;
        }
        j(U(e, n, a));
      } catch (t) {
        oe({ m: "Trackingplan process error", error: t, request: e });
      }
    };
    n || lt ? i() : setTimeout(i, 0);
  }
  function j(e) {
    Xe(e);
    var t = v(e);
    if (
      (2e5 < t.length && se({ m: "Track Too big, ignored: " + t.length }), at)
    )
      return void D(e, De);
    var n = v(G()).length;
    if (t.length + 2 + n > Ue)
      return D(e, De), void se({ m: "Track > Batch Size: " + t.length });
    var a = yt.length + t.length + n;
    a > Ue && (se({ m: "Batch reaching limit: " + a }), O(De)),
      (a = yt.length + t.length + n),
      se({ m: "Queue len: " + a, rawTrack: e }),
      0 !== yt.length && (yt += ","),
      (yt += t);
  }
  function O(e) {
    if (0 != yt.length) {
      var t = { requests: JSON.parse("[" + yt + "]"), common: G(!0) };
      (yt = ""), M(t, e);
    }
  }
  function D(e, t) {
    var n = { requests: [e], common: G(!0) };
    M(n, t);
  }
  function q() {
    var e = Me + Ne,
      t = [];
    return (
      Ze && t.push("debug=true"),
      null != ot && t.push("t=" + ot),
      0 < t.length && (e += "?" + t.join("&")),
      e
    );
  }
  function M(e, t) {
    function n(e) {
      var t = navigator.sendBeacon(q(), e),
        n = t ? "accepted" : "discarded";
      "accepted" == n && Qe(e), se("SendBeacon: " + n);
    }
    function a(e) {
      var t = new XMLHttpRequest();
      t.open("POST", q(), !0),
        (t.onreadystatechange = function () {
          if (4 === t.readyState)
            try {
              se({ m: "Parsed", response: JSON.parse(t.response) }),
                Qe(e, t.response);
            } catch (e) {}
        }),
        t.send(e);
    }
    if (
      ("function" == typeof Je && (e = Je(e)),
      se({ m: "Sent", payload: e }),
      Ve)
    )
      return void se("Not sending, is dry run");
    var i = v(e);
    "xhr" === t ? a(i) : "beacon" === t ? n(i) : void 0;
  }
  function z(e, t) {
    switch (e) {
      case "user":
        return 0 !== t.sampleRate && 1 === t.isSampledUser;
      case "track":
        return 0 !== t.sampleRate && Math.random() < 1 / t.sampleRate;
      case "all":
        return !0;
      case "none":
      default:
        return !1;
    }
  }
  function B() {
    return F().length;
  }
  function F() {
    if (!rt) return [];
    try {
      var e = it();
      return "object" == typeof e[0] ? e : [];
    } catch (e) {
      return [];
    }
  }
  function $() {
    var e = {};
    for (var t in Ye)
      try {
        e[t] = "function" == typeof Ye[t] ? Ye[t]() : Ye[t];
      } catch (n) {
        se({ m: "Error calculating tag value for key: " + t, error: n }),
          (e[t] = null);
      }
    return (e = pe(e, 100)), e;
  }
  function K() {
    for (
      var e, t = document.cookie, n = {}, a = t.split(";"), r = 0;
      r < a.length;
      r++
    )
      if (((e = a[r].trim()), e)) {
        var s = e.split("="),
          o = s[0].trim(),
          l = s[1] ? s[1].trim() : "";
        n[o] = l;
      }
    return n;
  }
  function U(e, n, a) {
    return (
      (e = we(e, n)),
      {
        provider: n,
        request: {
          endpoint: e.endpoint,
          method: e.method,
          post_payload: e.payload || null,
          protocol: e.protocol,
          href: t.location.href,
        },
        ts: e.ts || new Date().getTime(),
        dl_i: B() - 1,
        last_click_path: Tt,
        last_click_text: wt,
        tags: $(),
        stack_trace: a,
        cookies: st ? pe(K(), 50) : null,
        sampling_rate: e.custom_sample_rate || ft,
        unsampled: e.unsampled || !1,
        custom_sample_rule: e.custom_sample_rule || null,
      }
    );
  }
  function H() {
    return re(
      {
        hostname: t.location.hostname,
        user_agent: navigator.userAgent,
        navigator_language: navigator.language || navigator.userLanguage,
        load_url: "",
      },
      _()
    );
  }
  function G(e) {
    var t = F(),
      n = t;
    return (
      e && t && (n = Se(t)),
      {
        context: H(),
        tp_id: Ne,
        source_alias: Oe,
        environment: je,
        sdk: Rt.sdk,
        sdk_version: Rt.sdkVersion,
        sampling_rate: ft,
        debug: qe,
        datalayer: n,
        session_id: Z(),
        tags: $(),
        init_id: vt,
      }
    );
  }
  function W() {
    try {
      for (
        var e = t.performance.getEntriesByType("resource"),
          n = {},
          a = [],
          r = 0;
        r < e.length;
        r++
      ) {
        a.push(e[r].name);
        var s = "",
          o = e[r].name.replace(/(^\w+:|^)\/\//, ""),
          l = o.split("?"),
          d = l[0];
        (l = d.split("/")), (s = 1 < l.length ? l[0] + "/" + l[1] : l[0]);
        var p = s;
        jt.call(n, p) || (n[p] = 0), n[p]++;
      }
      return n;
    } catch (t) {
      return null;
    }
  }
  function V() {
    for (; _t.length; ) {
      var e = _t.shift();
      N(e);
    }
  }
  function Q(e, t) {
    return jt.call(e, "environment_rates") && jt.call(e.environment_rates, t)
      ? e.environment_rates[t]
      : e.sample_rate;
  }
  function X() {
    function e(e) {
      var t = Q(e, je);
      if (r(t))
        throw (
          (($e = new Date().getTime() + 300000),
          new Error("Invalid sampling rate"))
        );
      ($e = 0),
        te(t),
        e.options && (he(e.options), Rt.setOptions(Ne, e.options)),
        m({ event_name: "new_dau" }),
        V();
    }
    if (!ut && !(new Date().getTime() < $e))
      if (((ut = !0), Ct))
        e(Ct),
          setTimeout(function () {
            ut = !1;
          }, 3e3);
      else {
        var t = new XMLHttpRequest(),
          n = ze + "config-" + Ne + ".json";
        (t.onreadystatechange = function () {
          if (4 == this.readyState)
            try {
              var t = JSON.parse(this.responseText);
              e(t);
            } catch (e) {}
          setTimeout(function () {
            ut = !1;
          }, 3e3);
        }),
          t.open("GET", n, !0),
          t.send();
      }
  }
  function J(e) {
    n.setItem("_trackingplan_session_id", e),
      n.setItem("_trackingplan_session_ts", Date.now().toString());
  }
  function Z() {
    if (!bt) return null;
    var e = n.getItem("_trackingplan_session_id"),
      t = n.getItem("_trackingplan_session_ts");
    if (null === e || null === t)
      return se({ m: "Session ID: Creating for the first time session " }), Y();
    var a = Date.now(),
      i = parseInt(t, 10),
      r = 1e3 * (60 * kt);
    return isNaN(i) || a > i + r
      ? (se({ m: "Session ID: Updating because timeout" }), Y())
      : (n.setItem("_trackingplan_session_ts", a.toString()), e);
  }
  function Y() {
    var e = "true" === n.getItem("_trackingplan_live_debug_mode"),
      t = ee();
    !0 == e && (t = "55555555" + t.substring(8));
    var a = Date.now();
    return (
      n.setItem("_trackingplan_session_id", t),
      n.setItem("_trackingplan_session_ts", a.toString()),
      h({
        session_landing: document.location.href,
        session_referrer: document.referrer,
      }),
      m({ event_name: "new_session" }),
      t
    );
  }
  function ee() {
    var e = new Date().getTime(),
      t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var n = 0 | (e + 16 * Math.random()) % 16;
        return (e = i(e / 16)), ("x" === t ? n : 8 | (3 & n)).toString(16);
      });
    return t;
  }
  function te(e) {
    if (!1 === e)
      return (
        n.removeItem("_trackingplan_sample_rate"),
        n.removeItem("_trackingplan_sample_rate_ts"),
        n.removeItem("_trackingplan_is_sampled_user"),
        void n.removeItem("_trackingplan_options")
      );
    var t = Math.random() < 1 / e ? 1 : 0;
    se({ m: "Trackingplan sample rate = " + e + ". isSampledUser " + t }),
      n.setItem("_trackingplan_sample_rate_ts", new Date().getTime()),
      n.setItem("_trackingplan_sample_rate", e),
      n.setItem("_trackingplan_is_sampled_user", t);
  }
  function ne() {
    var e = n.getItem("_trackingplan_sample_rate_ts");
    if (null === e) return !1;
    if (parseInt(e) + 1e3 * Fe < new Date().getTime())
      return se({ m: "Trackingplan sample rate expired" }), te(!1), !1;
    var t = parseInt(n.getItem("_trackingplan_sample_rate"));
    return r(t)
      ? (se({ m: "Trackingplan sample rate expired" }), te(!1), !1)
      : {
          sampleRate: t,
          isSampledUser: parseInt(n.getItem("_trackingplan_is_sampled_user")),
        };
  }
  function ae(e, t) {
    if (null === e || null === t) return !0;
    if (
      ((t = t.toString()),
      "/" === e.charAt(0) && "/" === e.charAt(e.length - 1))
    ) {
      var n = new RegExp(e.slice(1, -1));
      return n.test(t);
    }
    return -1 !== t.indexOf(e);
  }
  function ie(e) {
    var t = e.endpoint,
      n = e.payload,
      a = e.protocol;
    if (f(t)) {
      for (var r in Ae)
        if (Ae.hasOwnProperty(r)) {
          var s = r.split("@"),
            o = null;
          1 < s.length && (o = s[0]);
          var l = 1 < s.length ? s[1] : s[0],
            d = l.split("%"),
            p = d[0],
            c = 2 === d.length ? d[1] : null,
            m = Ce.slice();
          if (o)
            for (var g, u = o.split(","), h = 0; h < u.length; h++)
              if (((g = u[h].trim()), !!g)) {
                var _ = g.charAt(0),
                  y = g.substring(1);
                if ("+" === _) {
                  var v = m.indexOf(y);
                  -1 !== v && m.splice(v, 1);
                } else "-" === _ && -1 === m.indexOf(y) && m.push(y);
              }
          if ("string" == typeof a && -1 !== m.indexOf(a)) continue;
          if (ae(p, t) && ae(c, n)) return Ae[r];
        }
      return !1;
    }
  }
  function re(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function se(e) {
    qe && a.log("TP " + Ne, e);
  }
  function oe(e) {
    t.console && a.warn && a.warn(e);
  }
  function le(e) {
    try {
      if (!(e instanceof Element)) return;
      for (
        var t = [];
        e.nodeType === Node.ELEMENT_NODE &&
        "html" !== e.nodeName.toLowerCase() &&
        "body" !== e.nodeName.toLowerCase();

      ) {
        var n = e.nodeName.toLowerCase();
        if (e.id) {
          (n += "#" + e.id), t.unshift(n);
          break;
        } else {
          e.className &&
            (n += "." + e.className.split(" ").join(".").replace(/\s+/g, "."));
          for (var a = e, i = 1; (a = a.previousElementSibling); ) {
            var r = a.nodeName.toLowerCase();
            a.className &&
              (r +=
                "." + a.className.split(" ").join(".").replace(/\s+/g, ".")),
              r === n && i++;
          }
          1 != i && (n += ":nth-of-type(" + i + ")");
        }
        t.unshift(n), (e = e.parentNode);
      }
      return t.join(" > ");
    } catch (t) {
      return null;
    }
  }
  function de(e) {
    try {
      if (!(e instanceof Element)) return null;
      var t = null;
      return (
        "input" === e.tagName.toLowerCase() && "password" !== e.type
          ? (t = e.value.trim())
          : "input" !== e.tagName.toLowerCase() &&
            "script" !== e.tagName.toLowerCase() &&
            "style" !== e.tagName.toLowerCase() &&
            (t = e.textContent.trim()),
        t ? t.slice(0, 50) : null
      );
    } catch (t) {
      return null;
    }
  }
  function pe(e, t) {
    if ("string" == typeof e && e.length > t)
      return e.substring(0, t - 1) + "\u2026";
    if (Array.isArray(e))
      return e.map(function (e) {
        return pe(e, t);
      });
    if ("object" == typeof e && null !== e) {
      var n = {};
      return (
        Object.keys(e).forEach(function (a) {
          n[a] = pe(e[a], t);
        }),
        n
      );
    }
    return e;
  }
  function ce(e) {
    try {
      It[e.name] = Math.round(e.value);
    } catch (t) {}
  }
  function me() {
    try {
      var e = (function ($) {
        "use strict";
        var ee,
          te,
          ne,
          ae,
          ie,
          Z = Math.min,
          Y = Math.max,
          re = -1,
          se = function (t) {
            addEventListener(
              "pageshow",
              function (e) {
                e.persisted && ((re = e.timeStamp), t(e));
              },
              !0
            );
          },
          c = function () {
            var t =
              self.performance &&
              performance.getEntriesByType &&
              performance.getEntriesByType("navigation")[0];
            if (t && 0 < t.responseStart && t.responseStart < performance.now())
              return t;
          },
          u = function () {
            var t = c();
            return (t && t.activationStart) || 0;
          },
          oe = function (a, e) {
            var n = c(),
              t = "navigate";
            return (
              0 <= re
                ? (t = "back-forward-cache")
                : n &&
                  (document.prerendering || 0 < u()
                    ? (t = "prerender")
                    : document.wasDiscarded
                    ? (t = "restore")
                    : n.type && (t = n.type.replace(/_/g, "-"))),
              {
                name: a,
                value: void 0 === e ? -1 : e,
                rating: "good",
                delta: 0,
                entries: [],
                id: "v4-"
                  .concat(Date.now(), "-")
                  .concat(i(8999999999999 * Math.random()) + 1e12),
                navigationType: t,
              }
            );
          },
          f = function (a, i, e) {
            try {
              if (PerformanceObserver.supportedEntryTypes.includes(a)) {
                var t = new PerformanceObserver(function (t) {
                  Promise.resolve().then(function () {
                    i(t.getEntries());
                  });
                });
                return (
                  t.observe(Object.assign({ type: a, buffered: !0 }, e || {})),
                  t
                );
              }
            } catch (t) {}
          },
          d = function (s, e, n, t) {
            var r, l;
            return function (i) {
              0 <= e.value &&
                (i || t) &&
                ((l = e.value - (r || 0)) || void 0 === r) &&
                ((r = e.value),
                (e.delta = l),
                (e.rating = (function (t, e) {
                  return t > e[1]
                    ? "poor"
                    : t > e[0]
                    ? "needs-improvement"
                    : "good";
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
            document.addEventListener("visibilitychange", function () {
              "hidden" === document.visibilityState && t();
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
            return "hidden" !== document.visibilityState ||
              document.prerendering
              ? 1 / 0
              : 0;
          },
          m = function (t) {
            "hidden" === document.visibilityState &&
              -1 < p &&
              ((p = "visibilitychange" === t.type ? t.timeStamp : 0), y());
          },
          g = function () {
            addEventListener("visibilitychange", m, !0),
              addEventListener("prerenderingchange", m, !0);
          },
          y = function () {
            removeEventListener("visibilitychange", m, !0),
              removeEventListener("prerenderingchange", m, !0);
          },
          T = function () {
            return (
              0 > p &&
                ((p = e()),
                g(),
                se(function () {
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
                  "prerenderingchange",
                  function () {
                    return t();
                  },
                  !0
                )
              : t();
          },
          L = [1800, 3e3],
          S = function (a, e) {
            (e = e || {}),
              E(function () {
                var n,
                  l = T(),
                  p = oe("FCP"),
                  r = f("paint", function (t) {
                    t.forEach(function (t) {
                      "first-contentful-paint" === t.name &&
                        (r.disconnect(),
                        t.startTime < l.firstHiddenTime &&
                          ((p.value = Y(t.startTime - u(), 0)),
                          p.entries.push(t),
                          n(!0)));
                    });
                  });
                r &&
                  ((n = d(a, p, L, e.reportAllChanges)),
                  se(function (t) {
                    (p = oe("FCP")),
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
          le = 0,
          de = function (t) {
            t.forEach(function (t) {
              t.interactionId &&
                ((C = Z(C, t.interactionId)),
                (le = Y(le, t.interactionId)),
                (w = le ? (le - C) / 7 + 1 : 0));
            });
          },
          F = function () {
            return ee ? w : performance.interactionCount || 0;
          },
          M = function () {
            "interactionCount" in performance ||
              ee ||
              (ee = f("event", de, {
                type: "event",
                buffered: !0,
                durationThreshold: 0,
              }));
          },
          k = [],
          D = new Map(),
          B = 0,
          pe = function () {
            var t = Z(k.length - 1, i((F() - B) / 50));
            return k[t];
          },
          x = [],
          H = function (a) {
            if (
              (x.forEach(function (e) {
                return e(a);
              }),
              a.interactionId || "first-input" === a.entryType)
            ) {
              var e = k[k.length - 1],
                n = D.get(a.interactionId);
              if (n || 10 > k.length || a.duration > e.latency) {
                if (n)
                  a.duration > n.latency
                    ? ((n.entries = [a]), (n.latency = a.duration))
                    : a.duration === n.latency &&
                      a.startTime === n.entries[0].startTime &&
                      n.entries.push(a);
                else {
                  var t = {
                    id: a.interactionId,
                    latency: a.duration,
                    entries: [a],
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
          N = function (a) {
            var i = self.requestIdleCallback || self.setTimeout,
              n = -1;
            return (
              (a = v(a)),
              "hidden" === document.visibilityState ? a() : ((n = i(a)), l(a)),
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
              : "complete" === document.readyState
              ? setTimeout(t, 0)
              : addEventListener(
                  "load",
                  function () {
                    return n(t);
                  },
                  !0
                );
          },
          z = { passive: !0, capture: !0 },
          G = new Date(),
          J = function (t, e) {
            te ||
              ((te = e),
              (ne = t),
              (ae = new Date()),
              U(removeEventListener),
              K());
          },
          K = function () {
            if (0 <= ne && ne < ae - G) {
              var t = {
                entryType: "first-input",
                name: te.type,
                target: te.target,
                cancelable: te.cancelable,
                startTime: te.timeStamp,
                processingStart: te.timeStamp + ne,
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
              "pointerdown" == t.type
                ? (function (a, e) {
                    var n = function () {
                        J(a, e), r();
                      },
                      t = function () {
                        r();
                      },
                      r = function () {
                        removeEventListener("pointerup", n, z),
                          removeEventListener("pointercancel", t, z);
                      };
                    addEventListener("pointerup", n, z),
                      addEventListener("pointercancel", t, z);
                  })(e, t)
                : J(e, t);
            }
          },
          U = function (t) {
            ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(
              function (e) {
                return t(e, Q, z);
              }
            );
          },
          W = [100, 300];
        return (
          ($.CLSThresholds = b),
          ($.FCPThresholds = L),
          ($.FIDThresholds = W),
          ($.INPThresholds = q),
          ($.LCPThresholds = O),
          ($.TTFBThresholds = V),
          ($.onCLS = function (p, e) {
            (e = e || {}),
              S(
                v(function () {
                  var n,
                    c = oe("CLS", 0),
                    m = 0,
                    g = [],
                    h = function (t) {
                      t.forEach(function (a) {
                        if (!a.hadRecentInput) {
                          var e = g[0],
                            n = g[g.length - 1];
                          m &&
                          1e3 > a.startTime - n.startTime &&
                          5e3 > a.startTime - e.startTime
                            ? ((m += a.value), g.push(a))
                            : ((m = a.value), (g = [a]));
                        }
                      }),
                        m > c.value && ((c.value = m), (c.entries = g), n());
                    },
                    a = f("layout-shift", h);
                  a &&
                    ((n = d(p, c, b, e.reportAllChanges)),
                    l(function () {
                      h(a.takeRecords()), n(!0);
                    }),
                    se(function () {
                      (m = 0),
                        (c = oe("CLS", 0)),
                        (n = d(p, c, b, e.reportAllChanges)),
                        s(function () {
                          return n();
                        });
                    }),
                    setTimeout(n, 0));
                })
              );
          }),
          ($.onFCP = S),
          ($.onFID = function (t, e) {
            (e = e || {}),
              E(function () {
                var n,
                  r = T(),
                  o = oe("FID"),
                  c = function (t) {
                    t.startTime < r.firstHiddenTime &&
                      ((o.value = t.processingStart - t.startTime),
                      o.entries.push(t),
                      n(!0));
                  },
                  a = function (t) {
                    t.forEach(c);
                  },
                  s = f("first-input", a);
                (n = d(t, o, W, e.reportAllChanges)),
                  s &&
                    (l(
                      v(function () {
                        a(s.takeRecords()), s.disconnect();
                      })
                    ),
                    se(function () {
                      var i;
                      (o = oe("FID")),
                        (n = d(t, o, W, e.reportAllChanges)),
                        (ie = []),
                        (ne = -1),
                        (te = null),
                        U(addEventListener),
                        (i = c),
                        ie.push(i),
                        K();
                    }));
              });
          }),
          ($.onINP = function (s, e) {
            "PerformanceEventTiming" in self &&
              "interactionId" in PerformanceEventTiming.prototype &&
              ((e = e || {}),
              E(function () {
                var n;
                M();
                var p,
                  c = oe("INP"),
                  m = function (t) {
                    N(function () {
                      t.forEach(H);
                      var e = pe();
                      e &&
                        e.latency !== c.value &&
                        ((c.value = e.latency), (c.entries = e.entries), p());
                    });
                  },
                  o = f("event", m, {
                    durationThreshold:
                      null !== (n = e.durationThreshold) && void 0 !== n
                        ? n
                        : 40,
                  });
                (p = d(s, c, q, e.reportAllChanges)),
                  o &&
                    (o.observe({ type: "first-input", buffered: !0 }),
                    l(function () {
                      m(o.takeRecords()), p(!0);
                    }),
                    se(function () {
                      (B = F()),
                        (k.length = 0),
                        D.clear(),
                        (c = oe("INP")),
                        (p = d(s, c, q, e.reportAllChanges));
                    }));
              }));
          }),
          ($.onLCP = function (p, c) {
            (c = c || {}),
              E(function () {
                var n,
                  m = T(),
                  g = oe("LCP"),
                  e = function (t) {
                    c.reportAllChanges || (t = t.slice(-1)),
                      t.forEach(function (t) {
                        t.startTime < m.firstHiddenTime &&
                          ((g.value = Y(t.startTime - u(), 0)),
                          (g.entries = [t]),
                          n());
                      });
                  },
                  r = f("largest-contentful-paint", e);
                if (r) {
                  n = d(p, g, O, c.reportAllChanges);
                  var a = v(function () {
                    j[g.id] ||
                      (e(r.takeRecords()),
                      r.disconnect(),
                      (j[g.id] = !0),
                      n(!0));
                  });
                  ["keydown", "click"].forEach(function (t) {
                    addEventListener(
                      t,
                      function () {
                        return N(a);
                      },
                      !0
                    );
                  }),
                    l(a),
                    se(function (e) {
                      (g = oe("LCP")),
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
          ($.onTTFB = function (a, e) {
            e = e || {};
            var s = oe("TTFB"),
              o = d(a, s, V, e.reportAllChanges);
            _(function () {
              var t = c();
              t &&
                ((s.value = Y(t.responseStart - u(), 0)),
                (s.entries = [t]),
                o(!0),
                se(function () {
                  (s = oe("TTFB", 0)), (o = d(a, s, V, e.reportAllChanges))(!0);
                }));
            });
          }),
          $
        );
      })({});
      e.onCLS(ce),
        e.onFCP(ce),
        e.onFID(ce),
        e.onINP(ce),
        e.onLCP(ce),
        e.onTTFB(ce);
    } catch (t) {}
  }
  function ge() {
    t.addEventListener("error", function (e) {
      St++;
    });
    var e = a.warn;
    a.warn = function () {
      Et++, e.apply(a, arguments);
    };
  }
  function ue() {
    try {
      var e = n.getItem("_trackingplan_options");
      return e ? JSON.parse(e) : null;
    } catch (t) {
      return se({ m: "Error getting stored options", error: t }), null;
    }
  }
  function he(e) {
    try {
      return n.setItem("_trackingplan_options", JSON.stringify(e)), !0;
    } catch (t) {
      return se({ m: "Error storing options", error: t }), !1;
    }
  }
  function _e(e) {
    if (!e) return {};
    for (var t, n = {}, a = e.split("&"), r = 0; r < a.length; r++)
      (t = a[r].split("=")),
        (n[decodeURIComponent(t[0])] = decodeURIComponent(t[1] || ""));
    return n;
  }
  function ye(e, t, n) {
    if (!e) return !1;
    if (Array.isArray(e)) {
      for (var a = 0; a < e.length; a++) if (ye(e[a], t, n)) return !0;
      return !1;
    }
    if ("object" == typeof e)
      for (var r in e)
        if (e.hasOwnProperty(r)) {
          if (r === t && "string" == typeof e[r] && e[r] === n) return !0;
          if (null !== e[r] && "object" == typeof e[r] && ye(e[r], t, n))
            return !0;
        }
    return !1;
  }
  function fe(e, t, n) {
    if (!Array.isArray(n) || !n.length) return null;
    var a = [];
    try {
      var r = new URL(t.endpoint);
      r.search && a.push(_e(r.search.substring(1)));
    } catch (t) {}
    t.payload &&
      "string" == typeof t.payload &&
      t.payload.split("\n").forEach(function (e) {
        e.trim() && a.push(_e(e));
      });
    var s = null;
    if (t.payload)
      try {
        s = JSON.parse(t.payload);
      } catch (t) {}
    for (var o, l = 0; l < n.length; l++)
      if (((o = n[l]), o.provider === e)) {
        for (var d = 0; d < a.length; d++)
          if (a[d][o.key] === o.value)
            return { sampleRate: o.sample_rate, rule: o };
        if (s && ye(s, o.key, o.value))
          return { sampleRate: o.sample_rate, rule: o };
      }
    return null;
  }
  function ve(e, t) {
    var n = fe(t, e, gt);
    if (n) {
      var a = Math.random() < 1 / n.sampleRate;
      return a ? ((n.useCustomSampling = !0), n) : { useCustomSampling: !1 };
    }
    return { useCustomSampling: !1 };
  }
  function ke(e) {
    if (null === e) return "null";
    var t,
      n = typeof e;
    switch (n) {
      case "number":
        t = "number";
        break;
      case "boolean":
        t = "boolean";
        break;
      case "string":
        t = "string";
        break;
      case "object":
        t = Array.isArray(e) ? "array" : "object";
        break;
      default:
        (t = "n/a"),
          se("Unsupported JS type [" + n + "] for value [" + e + "]");
    }
    if ("string" === t) {
      var a = parseFloat(e);
      if (!isNaN(a) && isFinite(e)) t = "number";
      else {
        var i = e.toLowerCase();
        if ("true" === i || "false" === i) t = "boolean";
        else
          try {
            var r = JSON.parse(e);
            Array.isArray(r)
              ? (t = "array")
              : "object" == typeof r && null !== r && (t = "object");
          } catch (t) {}
      }
    }
    return t;
  }
  function be(e, t, n, i) {
    var r = ke(n),
      s =
        null === n ? -1 : "string" == typeof n ? n.length : n.toString().length,
      o = "*ANON*" + i + "*" + t + "*" + e + "*" + r + "*" + s;
    return (
      ct &&
        a.log("TP Privacy Masking:", {
          originalKey: t,
          originalValue: n,
          maskedValue: o,
          rule: e,
          matchType: i,
        }),
      o
    );
  }
  function xe(e, t, n, a, i) {
    function r(e, r, s, o) {
      try {
        o = decodeURIComponent(o);
      } catch (t) {}
      var l, d, p, c, m;
      for (l = 0; l < t.length; l++) {
        (p = t[l]), (c = a.name_regexes[p] || []);
        for (var d = 0; d < c.length; d++)
          if (c[d].test(s)) return (m = i(p, s, o, "NAME")), r + s + "=" + m;
      }
      for (l = 0; l < n.length; l++) {
        (p = n[l]), (c = a.value_regexes[p] || []);
        for (var d = 0; d < c.length; d++)
          if (c[d].test(o)) return (m = i(p, s, o, "VALUE")), r + s + "=" + m;
      }
      return e;
    }
    var s = /([?&;\s]|^)([^=&;\s?]+)=([^&;\s]+)/g;
    return e.replace(s, r);
  }
  function Te(e, t, n, a, r) {
    function s(e, o) {
      var l,
        d,
        p,
        c,
        m = o;
      if ("string" == typeof o || "number" == typeof o || "boolean" == typeof o)
        for (l = 0; l < t.length; l++)
          for (p = t[l], c = a.name_regexes[p] || [], d = 0; d < c.length; d++)
            if (c[d].test(e)) return (m = r(p, e, o, "NAME")), m;
      if (null !== o && ("string" == typeof o || "number" == typeof o))
        for (l = 0; l < n.length; l++)
          for (p = n[l], c = a.value_regexes[p] || [], d = 0; d < c.length; d++)
            if (c[d].test(o.toString())) return (m = r(p, e, o, "VALUE")), m;
      if (Array.isArray(o))
        return o.map(function (t, n) {
          return s(e + "[" + n + "]", t);
        });
      if ("object" == typeof o && null !== o) {
        var g,
          u = {};
        for (g in o) o.hasOwnProperty(g) && (u[g] = s(g, o[g]));
        return u;
      }
      return o;
    }
    return s("", e);
  }
  function we(e, t) {
    var n = JSON.parse(v(e)),
      a = Pe(t),
      i = a.nameRegexKeys,
      r = a.valueRegexKeys;
    if (
      (n.endpoint &&
        n.endpoint.includes("?") &&
        (n.endpoint = xe(n.endpoint, i, r, Re, be)),
      n.payload)
    )
      try {
        var s =
          "string" == typeof n.payload ? n.payload : JSON.stringify(n.payload);
        try {
          var o = JSON.parse(s);
          n.payload = JSON.stringify(Te(o, i, r, Re, be));
        } catch (t) {
          n.payload = xe(s, i, r, Re, be);
        }
      } catch (t) {
        oe({ m: "Error masking payload", error: t });
      }
    return n;
  }
  function Ie(e) {
    function t(e) {
      return -1 !== dt.indexOf(e);
    }
    function n(e) {
      for (var a in e)
        e.hasOwnProperty(a) &&
          ("object" == typeof e[a] && null !== e[a]
            ? n(e[a])
            : t(a) && (e[a] = be("legacy", a, e[a], !0)));
      return e;
    }
    if (!Array.isArray(dt) || 0 == dt.length) return e;
    var a = JSON.parse(v(e));
    return a.map(function (e) {
      return "object" == typeof e && null !== e ? n(e) : e;
    });
  }
  function Se(e) {
    var t;
    if (pt && mt) {
      var n = Pe("datalayer"),
        a = n.nameRegexKeys,
        i = n.valueRegexKeys;
      if (!(0 < a.length || 0 < i.length)) t = JSON.parse(v(e));
      else if (Array.isArray(e)) {
        var r = e.slice(At.lastProcessedLength),
          s = JSON.parse(v(r)),
          o = s.map(function (e) {
            return "object" == typeof e && null !== e ? Te(e, a, i, Re, be) : e;
          });
        (t = At.maskedItems.concat(o)),
          (At.lastProcessedLength = e.length),
          (At.maskedItems = t);
      } else (t = JSON.parse(v(e))), (t = Te(t, a, i, Re, be));
    } else t = e;
    return (t = Ie(t)), t;
  }
  function Ee(e) {
    return new RegExp(e, "i");
  }
  function Le() {
    if (mt) {
      var e;
      for (e in mt.name_regexes)
        Re.name_regexes[e] = mt.name_regexes[e].map(Ee);
      for (e in mt.value_regexes)
        Re.value_regexes[e] = mt.value_regexes[e].map(Ee);
    }
  }
  function Pe(e) {
    var t = [],
      n = [];
    if (
      mt.provider_rules &&
      mt.provider_rules.provider_specific &&
      mt.provider_rules.provider_specific[e]
    ) {
      var a = mt.provider_rules.provider_specific[e];
      a.name_regexes && (t = t.concat(a.name_regexes)),
        a.value_regexes && (n = n.concat(a.value_regexes));
    }
    if (mt.provider_rules && mt.provider_rules.global) {
      var i = mt.provider_rules.global;
      i.name_regexes && (t = t.concat(i.name_regexes)),
        i.value_regexes && (n = n.concat(i.value_regexes));
    }
    return { nameRegexKeys: t, valueRegexKeys: n };
  }
  if (t.Trackingplan)
    return void (
      t.Trackingplan.testing || oe("Trackingplan snippet included twice.")
    );
  var Ce = ["performance"],
    Ae = {
      "/g/collect?v=2&tid": "googleanalytics",
      "/\\/[a-z0-9]{6}\\?tid=[^&]+&v=2/": "googleanalytics",
      "api.segment.io": "segment",
      segmentapi: "segment",
      "seg-api": "segment",
      "segment-api": "segment",
      "/.*api-iam.intercom.io/messenger/web/(ping|events|metrics|open).*/":
        "intercom",
      "api.amplitude.com": "amplitude",
      "amplitude.com/2/httpapi": "amplitude",
      "ping.chartbeat.net": "chartbeat",
      "/.*api(-eu)?(-js)?.mixpanel.com.*/": "mixpanel",
      "trk.kissmetrics.io": "kissmetrics",
      "ct.pinterest.com": "pinterest",
      "facebook.com/tr/": "facebook",
      "track.hubspot.com/__": "hubspot",
      "/.*.heapanalytics.com/(h|api).*/": "heap",
      "/.*snowplow.*/": "snowplow",
      "/.*ws.*.hotjar.com/api/v2/client/ws/%identify_user": "hotjar",
      "/.*ws.*.hotjar.com/api/v2/client/ws/%tag_recording": "hotjar",
      "klaviyo.com/api/track": "klaviyo",
      "app.pendo.io/data": "pendo",
      "matomo.php": "matomo",
      "rs.fullstory.com/rec%8137": "fullstory",
      "rs.fullstory.com/rec%8193": "fullstory",
      "logx.optimizely.com/v1/events": "optimizely",
      "track.customer.io/events/": "customerio",
      "alb.reddit.com/rp.gif": "reddit",
      "px.ads.linkedin.com": "linkedin",
      "/i/adsct": "twitter",
      "bat.bing.com": "bing",
      "pdst.fm": "podsights",
      "analytics.tiktok.com/api/v2": "tiktok",
      "/.*AQB=1.*AQE=1/": "adobe",
      "posthog.com/i/": "posthog",
      "posthog.com/e/": "posthog",
      "/.*tealiumiq.com/.*.gif/": "tealium",
      ".connectif.cloud": "connectif",
      "/ppms.php": "piwikpro",
      "plausible.io/api/event": "plausible",
      "ariane.abtasty.com": "abtasty",
      "xiti.com/event": "piano",
      "rudderstack.com/v1": "rudderstack",
      "/dev.visualwebsiteoptimizer.com/.*events/": "vwo",
      "adsmurai.com/v1.0/events": "adsmurai",
      "+performance@/.*/pagead/(viewthroughconversion|conversion)/.*/":
        "google_ads",
      "+performance@/.*(/activity|/fls).*src=/": "floodlight",
      "+performance@sslwidget.criteo.com/event": "criteo",
      "+performance@track.adform.net/Serving/TrackPoint": "adform",
      "/.*edge\\.adobedc\\.net\\/ee\\/.*(collect|interact).*/": "adobexdm",
      "hits.getelevar.com": "elevar",
      "a/elevar?source_url": "elevar",
    },
    Re = { name_regexes: {}, value_regexes: {} },
    Ne = null,
    je = "PRODUCTION",
    Oe = null,
    De = "xhr",
    qe = !1,
    Me = "https://tracks.trackingplan.com/v1/",
    ze = "https://config.trackingplan.com/",
    Be = 0,
    Fe = 86400,
    $e = 0,
    Ke = "user",
    Ue = 55e3,
    He = 20,
    Ge = ["img", "xhr", "beacon", "fetch", "performance", "message"],
    We = !1,
    Ve = !1,
    Qe = function () {},
    Xe = function () {},
    Je = function (e) {
      return e;
    },
    Ze = !1,
    Ye = {},
    et = null,
    tt = [],
    nt = null,
    at = !1,
    it = function () {
      return t.dataLayer;
    },
    rt = !0,
    st = !1,
    ot = null,
    lt = !1,
    dt = [
      "userId",
      "user_id",
      "userid",
      "password",
      "pass",
      "token",
      "userToken",
      "usertoken",
      "user_token",
    ],
    pt = !1,
    ct = !1,
    mt = {
      name_regexes: {
        age: ["(user|person|customer)[_\\- ]?age$|^age$"],
        date_of_birth: [
          "birth[_\\- ]?day|birth[_\\- ]?date|date[_\\- ]?of[_\\- ]?birth",
        ],
        certificate: ["certificate$"],
        citizenship: ["nationality|citizenship"],
        city: ["city|town|municipality"],
        country: ["country|(?<!desti)nation(?!al)"],
        credit_card: ["credit[_\\- ]?card|cc[_\\- ]?number|^visa$"],
        ethnicity: [
          "ethnic[_\\- ]?group|ethnic[_\\- ]?minority|ethnicity|^race$",
        ],
        gender: ["gender|^sex$"],
        geolocation: ["geolocation|geolocali[sz]ation|geoposition"],
        health: ["disability|disease|illness|sickness|^infection$"],
        ip: ["ip[_\\- ]?address|^ip$"],
        license: ["license$"],
        link: ["link$|url$"],
        name: ["(first|last|full|person)[_\\- ]?name"],
        password: ["password|pwd"],
        phone: ["phone|fax"],
        po_box: ["p[_\\- ]?o[_\\- ]?box"],
        religion: ["religion|faith|creed"],
        salary: ["salary|wage|compensation|paycheck"],
        sexual_orientation: ["sexual[_\\- ]?orientation"],
        ssn: ["social[_\\- ]?security|ssn"],
        street_address: ["address|street|province|place(?!ment)"],
        user_id: ["user[_\\- ]?name|user[_\\- ]?id|nick[_\\- ]?name|^user$"],
        veteran_status: ["veteran[_\\- ]?status"],
        zip_code: ["zip[_\\- ]?code|postal[_\\- ]?code"],
      },
      value_regexes: {
        credit_card: [
          "(?:\\d{4}[- ]){3}(\\d{4}|\\d{3})|\\d{4}[- ]\\d{6}[- ]\\d{5}",
        ],
        email: [
          "([a-z0-9!#$%&'*+\\/=?^_{|.}~-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)",
        ],
        gender: [
          "^(male|female|man|woman|men|women|masculine|feminine|masc|fem|transgender|transgender male|transgender female)$",
        ],
        ip: [
          "^((?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost)$",
          "\\s*(?!.*::.*::)(?:(?!:)|:(?=:))(?:[0-9a-f]{0,4}(?:(?<=::)|(?<!::):)){6}(?:[0-9a-f]{0,4}(?:(?<=::)|(?<!::):)[0-9a-f]{0,4}(?:(?<=::)|(?<!:)|(?<=:)(?<!::):)|(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})\\s*",
        ],
        phone: [
          "^(?:(?:\\+|00)?\\d{1,3}[-\\. ])?((?:\\(\\d{3}\\)|\\d{3})[-\\. ]\\d{3}[-\\. ]?\\d{4}(?:[-\\. ]?(?:ext|extension)[-\\. ]?\\d+)?)$",
        ],
        po_box: ["P\\.? ?O\\.? Box \\d+"],
        sexual_orientation: [
          "gay|lesbian|homosexual|heterosexual|queer|bisexual|pansexual|asexual",
        ],
        ssn: [
          "(?!000|666|333)0*(?:[0-6][0-9][0-9]|[0-7][0-6][0-9]|[0-7][0-7][0-2])[- ](?!00)[0-9]{2}[- ](?!0000)[0-9]{4}",
        ],
        street_address: [
          "\\d{1,4} [\\w\\s]{1,20}(?:street|st|avenue|ave|road|rd|highway|hwy|square|sq|trail|trl|drive|dr|court|ct|park|parkway|pkwy|circle|cir|boulevard|blvd)\\W?(?=\\s|$)",
        ],
        nif: ["^[A-Za-z][0-9]{8}[A-Za-z]$"],
      },
      provider_rules: {
        global: {
          name_regexes: [
            "age",
            "certificate",
            "citizenship",
            "city",
            "country",
            "credit_card",
            "date_of_birth",
            "ethnicity",
            "gender",
            "geolocation",
            "health",
            "ip",
            "license",
            "name",
            "password",
            "phone",
            "po_box",
            "religion",
            "salary",
            "sexual_orientation",
            "ssn",
            "street_address",
            "user_id",
            "veteran_status",
            "zip_code",
          ],
          value_regexes: [
            "credit_card",
            "email",
            "gender",
            "ip",
            "nif",
            "phone",
            "po_box",
            "sexual_orientation",
            "ssn",
            "street_address",
          ],
        },
      },
    },
    gt = [],
    ut = !1,
    ht = "_trackingplan_live_debug_mode",
    _t = [],
    yt = "",
    ft = null,
    vt = "",
    kt = 30,
    bt = !0,
    xt = !0,
    Tt = null,
    wt = null,
    It = {},
    St = 0,
    Et = 0,
    Lt = !1,
    Pt = !1,
    Ct = null,
    At = { lastProcessedLength: 0, maskedItems: [] },
    Rt = (t.Trackingplan = {
      sdk: "js",
      sdkVersion: "1.30.0",
      options: null,
      tpId: null,
      testing: !1,
      setOptions: function (e, t) {
        (t = this.options = t || {}),
          (Ne = this.tpId = e),
          (je = t.environment || je),
          (Oe = t.sourceAlias || Oe),
          (pt = t.usePrivacy || pt),
          (mt = t.privacyConfig || mt),
          (De = t.sendMethod || De),
          (Ae = re(Ae, t.customDomains || {})),
          (qe = t.debug || qe),
          (Me = t.tracksEndPoint || Me),
          (ze = t.configEndPoint || ze),
          (Be = t.delayConfigDownload || Be),
          (Fe = t.sampleRateTTL || Fe),
          (Ke = t.samplingMode || Ke),
          (Ue = t.batchSize || Ue),
          (He = t.batchInterval || He),
          (We = t.alwaysSendNewUser || We),
          (Ve = t.dryRun || Ve),
          (Ge = t.intercept || Ge),
          (Qe = t.onSubmit || Qe),
          (Ze = t.parse || Ze),
          (Xe = t.onQueue || Xe),
          (Je = t.onBeforeSubmit || Je),
          (Ye = t.tags || Ye),
          (et = t.samplingRate || et),
          (tt = t.contentFilters || tt),
          (nt = t.providersWhitelist || nt),
          (at = "undefined" == typeof t.realtime ? at : t.realtime),
          (it = t.getDataLayer || it),
          (kt = t.sessionDurationMinutes || kt),
          (xt =
            "undefined" == typeof t.intervalsOnInit ? xt : t.intervalsOnInit),
          (rt = "undefined" == typeof t.useDataLayer ? rt : t.useDataLayer),
          (st = "undefined" == typeof t.useCookies ? st : t.useCookies),
          (bt = "undefined" == typeof t.useSessions ? bt : t.useSessions),
          (Pt =
            "undefined" == typeof t.useSmartSampling ? Pt : t.useSmartSampling),
          (Ct = t.configFileOverride || Ct),
          (dt = t.datalayerMaskKeys || dt),
          (ct = t.debugPrivacy || ct),
          Array.isArray(t.smartSamplingPatterns) &&
            (gt = t.smartSamplingPatterns.concat(gt)),
          (lt = this.testing = t.testing || lt),
          at && ((et = 1), (Ke = "all"), (Ue = 1)),
          lt && (ot = Date.now()),
          se({ m: "TP options updated", options: t }),
          pt && mt && Le();
      },
      getSmartSamplingPatterns: function () {
        return gt;
      },
      getPrivacyConfig: function () {
        return mt;
      },
      init: function (e, i) {
        try {
          if (lt)
            return void oe("Trackingplan SDK is running in a test environment");
          if (!y()) throw new Error("TP Not compatible browser");
          if (null !== Ne) throw new Error("TP Init already happened");
          if ("string" != typeof e || "" === e)
            throw new Error("tpId is not provided");
          var r = null;
          if (t.performance && t.performance.getEntriesByType) {
            var s = t.performance.getEntriesByType("navigation")[0];
            r = s ? s.name : t.location.href;
          } else r = t.location.href;
          o(r);
          var _ = l();
          _ &&
            (a.log("TP Running in regression mode", _),
            (i = i || {}),
            (i.testing = !0),
            (i.realtime = !0),
            (i.samplingMode = "all"),
            (i.tags = i.tags || {}),
            (i.tags.test_session_name = _.test_session_name),
            (i.tags.test_title = _.test_title),
            (i.environment = _.environment)),
            d(r);
          var f = "true" === n.getItem(ht);
          f && ((i = i || {}), (i.realtime = !0), (i.samplingMode = "all")),
            Rt.setOptions(e, i);
          var v = ue();
          null !== v && Rt.setOptions(e, v),
            null !== et && te(et),
            (vt = ee()),
            g(t),
            document.addEventListener("visibilitychange", function () {
              "hidden" === document.visibilityState &&
                setTimeout(function () {
                  O("beacon"), se({ m: "visibility beacon" });
                }, 3e3);
            }),
            t.addEventListener("pagehide", c),
            t.addEventListener("beforeunload", c),
            t.document.addEventListener(
              "click",
              function (e) {
                (Tt = le(e.target)), (wt = de(e.target));
              },
              !1
            ),
            u() &&
              (se({ m: "New User" }),
              h({
                landing: document.location.href,
                referrer: document.referrer,
              }),
              m({ event_name: "new_user" })),
            /[?&]utm_[^=]+/.test(document.location.search) &&
              h({ last_utm_page: document.location.href });
          var k = Z();
          f && p(k),
            m({ event_name: "page_load" }),
            !0 === xt && Rt.initIntervals(),
            me(),
            ge(),
            se({ m: "TP init finished", options: i });
        } catch (e) {
          oe({ m: "TP init error", error: e });
        }
      },
      flush: function () {
        O(De);
      },
      queueSize: function () {
        return yt.length;
      },
      updateTags: function (e) {
        O(De), (Ye = re(Ye, e));
      },
      initIntervals: function () {
        setTimeout(function () {
          Lt ||
            (m({
              event_name: "pixels",
              properties: { pixels: W(), sent_at: "timeout" },
            }),
            (Lt = !0));
        }, 1e4),
          setInterval(function () {
            O(De);
          }, 1e3 * He);
      },
      getSessionId: function () {
        return n.getItem("_trackingplan_session_id");
      },
      enableLiveDebugMode: function () {
        n.setItem(ht, "true"), Y(), t.location.reload();
      },
      disableLiveDebugMode: function () {
        localStorage.removeItem(ht), t.location.reload();
      },
    }),
    Nt = !1,
    jt = Object.prototype.hasOwnProperty;
  (Rt.maskQueryStrings = xe), (Rt.maskJSONObject = Te);
})(window, localStorage, console);

/* === Trackingplan Init === */
Trackingplan.init("TP3184092", {
  environment: tealiumEnv === "prod" ? "PRODUCTION" : "DEVELOPMENT",
  tracksEndPoint: "https://eu-tracks.trackingplan.com/v1/",
  // tags: { "app_version": "...", } // See docs to know about optional tags.
});
