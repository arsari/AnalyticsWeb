(function (t, n, a) {
  var i = Math.floor,
    r = Number.isNaN,
    s = Math.min;
  function o(e) {
    return e && "object" == typeof e
      ? !0 === e.mode
        ? e.test_title && e.test_session_name && e.environment
          ? e
          : null
        : null
      : null;
  }
  function d(e) {
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
        if (((r = o(r)), !r))
          return void ue({
            m: "TP Regression mode init failed - missing required parameters",
          });
        n.setItem("_trackingplan_regression", JSON.stringify(r)),
          a.log("TP Regression mode enabled", r);
      } else
        "false" === i &&
          (a.log("TP Regression mode disabled"),
          n.removeItem("_trackingplan_regression"));
    } catch (t) {
      ue({ m: "TP Regression mode init failed - catch" });
    }
  }
  function l() {
    try {
      var e = n.getItem("_trackingplan_regression");
      return e ? o(JSON.parse(e)) : null;
    } catch (t) {
      return null;
    }
  }
  function p(e) {
    try {
      e = new URL(e);
      var t = new URLSearchParams(e.search),
        a = t.get("trackingplan_live_debug");
      a && (ie(a), n.setItem("_trackingplan_live_debug_mode", "true"));
    } catch (t) {}
  }
  function c(e) {
    var t =
      "https://panel.trackingplan.com/plans/" +
      $e +
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
  function g(t) {
    if (!Xt) {
      (Xt = !0), me({ m: "unload event", e: t.type }), (Ke = "beacon");
      var e = { web_vitals: $t, js_error_count: Vt, js_warning_count: Ht };
      m({ event_name: "page_unload", properties: e }, !0),
        Kt ||
          (m(
            {
              event_name: "pixels",
              properties: { pixels: ee(), sent_at: t.type },
            },
            !0
          ),
          (Kt = !0)),
        B("beacon"),
        (ft = !0),
        (Je = 1);
    }
  }
  function m(e, t) {
    var n = {
      method: "POST",
      endpoint: "TRACKINGPLAN",
      payload: JSON.stringify(e),
      protocol: "tp_event",
    };
    j(n, t);
  }
  function u(e) {
    if (tt.includes("img"))
      try {
        x(e);
      } catch (t) {
        me(t);
      }
    if (tt.includes("xhr"))
      try {
        E(e);
      } catch (t) {
        me(t);
      }
    if (tt.includes("beacon"))
      try {
        A(e);
      } catch (t) {
        me(t);
      }
    if (tt.includes("form"))
      try {
        C(e);
      } catch (t) {
        me(t);
      }
    if (tt.includes("ws"))
      try {
        P(e);
      } catch (t) {
        me(t);
      }
    if (tt.includes("fetch"))
      try {
        S(e);
      } catch (t) {
        me(t);
      }
    if (tt.includes("performance"))
      try {
        L(e);
      } catch (t) {
        me(t);
      }
    if (tt.includes("message"))
      try {
        R();
      } catch (t) {
        me(t);
      }
    if (tt.includes("datalayer_push"))
      try {
        N(e);
      } catch (t) {
        me(t);
      }
  }
  function _() {
    return null === n.getItem("_trackingplan_initial") || nt;
  }
  function h(e) {
    var t = y();
    n.setItem("_trackingplan_initial", JSON.stringify(ge(t, e)));
  }
  function y() {
    try {
      return null === n.getItem("_trackingplan_initial")
        ? {}
        : JSON.parse(n.getItem("_trackingplan_initial"));
    } catch (t) {
      return {};
    }
  }
  function f() {
    try {
      if ((n.setItem("_tp_t", "a"), "a" !== n.getItem("_tp_t"))) return !1;
      if ((n.removeItem("_tp_t"), "function" != typeof navigator.sendBeacon))
        return !1;
    } catch (t) {
      return !1;
    }
    return !0;
  }
  function v(e) {
    return "string" == typeof e || e instanceof String;
  }
  function b(e) {
    return JSON.stringify(e, function (e, t) {
      return t instanceof Element ? t.nodeType : t;
    });
  }
  function k(e, t) {
    if (0 === t.length) return !0;
    for (var n = 0; n < t.length; n++) {
      if (
        Jt.call(e, "payload") &&
        "string" == typeof e.payload &&
        0 <= e.payload.indexOf(t[n])
      )
        return !0;
      if (
        Jt.call(e, "endpoint") &&
        "string" == typeof e.endpoint &&
        0 <= e.endpoint.indexOf(t[n])
      )
        return !0;
    }
    return !1;
  }
  function T(e) {
    return !(null !== gt) || 0 <= gt.indexOf(e);
  }
  function x(e) {
    var t = e.Object.getOwnPropertyDescriptor(
      e.HTMLImageElement.prototype,
      "src"
    ).set;
    e.Object.defineProperty(e.HTMLImageElement.prototype, "src", {
      set: function (e) {
        return !v(e) || 16384 < e.length
          ? t.apply(this, arguments)
          : (j(
              { method: "GET", endpoint: e, payload: null, protocol: "img" },
              ft
            ),
            t.apply(this, arguments));
      },
    });
    var n = e.HTMLImageElement.prototype.setAttribute;
    e.HTMLImageElement.prototype.setAttribute = function (e, t) {
      if ("src" == e.toLowerCase()) {
        if (!v(t) || t.length > 16384) return n.apply(this, arguments);
        j({ method: "GET", endpoint: t, payload: null, protocol: "img" }, ft);
      }
      return n.apply(this, arguments);
    };
  }
  function I(e) {
    var t = e;
    try {
      t instanceof FormData && (t = JSON.stringify(Object.fromEntries(t)));
    } catch (t) {}
    return t;
  }
  function E(e) {
    var t = e.XMLHttpRequest.prototype.open,
      n = e.XMLHttpRequest.prototype.send;
    (e.XMLHttpRequest.prototype.open = function (e, n) {
      return (this._tpUrl = n), (this._tpMethod = e), t.apply(this, arguments);
    }),
      (e.XMLHttpRequest.prototype.send = function (e) {
        var t = n.apply(this, arguments),
          a = I(e);
        return (
          w(
            a,
            function (e) {
              j(
                {
                  method: this._tpMethod,
                  endpoint: this._tpUrl,
                  payload: e,
                  protocol: "xhr",
                },
                ft
              );
            }.bind(this)
          ),
          t
        );
      });
  }
  function w(e, n) {
    try {
      if (e instanceof Blob) {
        var a = new FileReader();
        (a.onload = function () {
          var e = a.result.split(",")[1];
          n(e);
        }),
          a.readAsDataURL(e);
      } else if (e instanceof ArrayBuffer) {
        for (
          var r = "", s = new Uint8Array(e), o = s.byteLength, d = 0;
          d < o;
          d++
        )
          r += String.fromCharCode(s[d]);
        n(t.btoa(r));
      } else n(e);
    } catch (e) {}
  }
  function A(e) {
    var t = e.navigator.sendBeacon;
    e.navigator.sendBeacon = function (e, n) {
      var a = t.apply(this, arguments);
      if (!v(e) || 16384 < e.length) return a;
      var i = I(n);
      return (
        w(i, function (t) {
          j(
            { method: "POST", endpoint: e, payload: t, protocol: "beacon" },
            ft
          );
        }),
        a
      );
    };
  }
  function S(e) {
    var t = e.fetch;
    e.fetch = function (e, n) {
      var a,
        i = "GET",
        r = Promise.resolve(null);
      try {
        "string" == typeof e
          ? (a = e)
          : e instanceof Request
          ? ((a = e.url),
            (i = e.method),
            !e.bodyUsed &&
              !e.keepalive &&
              (r = e
                .clone()
                .arrayBuffer()
                .catch(function () {
                  return null;
                })))
          : e instanceof URL && (a = e.href),
          a &&
            n &&
            (n.method && (i = (n.method + "").toUpperCase()),
            n.body && (r = Promise.resolve(n.body)));
      } catch (t) {}
      var s = t.apply(this, arguments);
      return "string" != typeof a || 16384 < a.length
        ? s
        : (r.then(function (e) {
            w(e, function (e) {
              j({ method: i, endpoint: a, payload: e, protocol: "fetch" }, ft);
            });
          }),
          s);
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
        j({ method: "WS", endpoint: this.url, payload: e, protocol: "ws" }, ft),
        n.apply(this, arguments)
      );
    }),
      (e.WebSocket.prototype = t.prototype);
  }
  function L(e) {
    function t(e, t) {
      try {
        e.getEntries().forEach(function (e) {
          function t(e) {
            return (
              e.name.includes("contentsquare.net") && "img" === e.initiatorType
            );
          }
          v(e.name) &&
            e.name.length < 16384 &&
            (t(e) ||
              "iframe" === e.initiatorType ||
              "script" === e.initiatorType) &&
            j(
              {
                method: "GET",
                endpoint: e.name,
                payload: null,
                protocol: "performance",
              },
              ft
            );
        });
      } catch (t) {
        me(t);
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
        j(a, ft);
      } catch (t) {}
    }
    e.addEventListener("submit", n, !0);
  }
  function R() {
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
              j(i, ft);
            } catch (t) {
              me(t);
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
      : document.addEventListener("readystatechange", function () {
          "complete" === document.readyState && (t(), n());
        });
  }
  function N(e) {
    var t = e[ht];
    if ((t || ((e[ht] = []), (t = e[ht])), !!Array.isArray(t))) {
      0 < t.length &&
        t.forEach(function (e) {
          j(
            {
              method: "POST",
              endpoint: "DATALAYER",
              payload: JSON.stringify(e),
              protocol: "datalayer_push",
            },
            ft
          );
        });
      var n = t.push;
      t.push = function () {
        var e = Array.prototype.slice.call(arguments);
        return (
          e.forEach(function (e) {
            j(
              {
                method: "POST",
                endpoint: "DATALAYER",
                payload: JSON.stringify(e),
                protocol: "datalayer_push",
              },
              ft
            );
          }),
          n.apply(this, arguments)
        );
      };
    }
  }
  function O() {
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
  function D(e, t, n, a) {
    if (U(Ze, n)) {
      if (At) {
        var i = Ie(t, e, a);
        return i && 0 < i.sampleRate
          ? {
              rate: s(i.sampleRate, n.sampleRate),
              rule: i.rule,
              mode: "ADAPTIVE/DEFAULT_DICE/EVENT_MATCHED",
            }
          : {
              rate: n.sampleRate,
              rule: null,
              mode: "ADAPTIVE/DEFAULT_DICE/EVENT_NOT_MATCHED",
            };
      }
      return { rate: n.sampleRate, rule: null, mode: "NOT_ADAPTIVE" };
    }
    if (At) {
      var i = Ie(t, e, a);
      return i && 0 < i.sampleRate
        ? Ee(i.sampleRate, n)
          ? {
              rate: i.sampleRate,
              rule: i.rule,
              mode: "ADAPTIVE/EVENT_DICE/EVENT_MATCHED",
            }
          : null
        : null;
    }
    return null;
  }
  function j(e, t) {
    var n = t || !1,
      a = O();
    e.ts = e.ts || new Date().getTime();
    var i = function () {
      try {
        var t = le();
        if (!1 === t)
          return (
            B(Ke),
            (Nt = null),
            Ct.push(e),
            me({ m: "Pre queued, queue length = " + Ct.length, request: e }),
            void setTimeout(ae, Xe)
          );
        Nt = t.sampleRate;
        var n = ce(e);
        if (
          ("TRACKINGPLAN" == e.endpoint && (n = "trackingplan"),
          "DATALAYER" == e.endpoint && (n = "datalayer_push"),
          !n)
        )
          return;
        if (!T(n))
          return void me({
            m: "Request ignored (" + n + " not in whitelist)",
            request: e,
          });
        if (!k(e, ct))
          return void me({ m: "Request ignored (content filter)", request: e });
        var i = D(e, n, t, wt);
        i && F(Q(e, n, a, i));
      } catch (t) {
        ue({ m: "Trackingplan process error", error: t, request: e });
      }
    };
    n || kt ? i() : setTimeout(i, 0);
  }
  function M(e) {
    if (!it || !Ot) return e;
    var t = q(e, Ot);
    return t === void 0 ? {} : t;
  }
  function q(e, t) {
    if (null === e || e === void 0 || null === t || t === void 0)
      return e === t ? void 0 : e;
    if (
      "object" == typeof e &&
      "object" == typeof t &&
      !Array.isArray(e) &&
      !Array.isArray(t) &&
      e.constructor === Object &&
      t.constructor === Object
    ) {
      var n = {},
        a = !1;
      for (var i in e)
        if (e.hasOwnProperty(i)) {
          var r = q(e[i], t[i]);
          void 0 !== r && ((n[i] = r), (a = !0));
        }
      for (var i in t)
        t.hasOwnProperty(i) &&
          !e.hasOwnProperty(i) &&
          ((n[i] = "@TP_DEL"), (a = !0));
      return a ? n : void 0;
    }
    return JSON.stringify(e) === JSON.stringify(t) ? void 0 : e;
  }
  function F(e) {
    st(e);
    var t = b(e);
    if (2e5 < t.length)
      return void me({ m: "Track Too big, ignored: " + t.length + " bytes" });
    if (mt) return void z(e, Ke);
    var n,
      a = b(J()).length;
    if (it) {
      var i = M(JSON.parse(t)),
        r = b(i);
      n = r;
    } else n = t;
    if (n.length + 2 + a > Je)
      return (
        z(e, Ke), void me({ m: "Track > Batch Size: " + n.length + " bytes" })
      );
    var s = Rt.length + n.length + a;
    s > Je &&
      (me({ m: "Batch reaching limit: " + s + " bytes" }),
      B(Ke),
      it && (n = t)),
      (s = Rt.length + n.length + a),
      me({ m: "Queue len: " + s + " bytes", rawTrack: e }),
      0 !== Rt.length && (Rt += ","),
      (Rt += n),
      it && (Ot = JSON.parse(b(e)));
  }
  function B(e) {
    if (0 != Rt.length) {
      var t = { requests: JSON.parse("[" + Rt + "]"), common: J(!0) };
      (Rt = ""), it && (Ot = null), K(t, e);
    }
  }
  function z(e, t) {
    var n = { requests: [e], common: J(!0) },
      a = b(n).length;
    me({ m: "Sending single track (1 request, " + a + " bytes)" }), K(n, t);
  }
  function $() {
    var e = We + $e,
      t = [];
    return (
      dt && t.push("debug=true"),
      null != bt && t.push("t=" + bt),
      0 < t.length && (e += "?" + t.join("&")),
      e
    );
  }
  function V() {
    var e = new XMLHttpRequest();
    return yt && ((e.open = Yt), (e.send = Qt)), e;
  }
  function H(e, n) {
    return yt ? Zt(e, n) : t.navigator.sendBeacon(e, n);
  }
  function K(e, t) {
    function n(e) {
      var t = H($(), e),
        n = t ? "accepted" : "discarded";
      "accepted" == n && rt(e), me("Sent (sendBeacon): " + n);
    }
    function a(e) {
      var t = V();
      t.open("POST", $(), !0),
        (t.onreadystatechange = function () {
          4 === t.readyState && (rt(e, t.response), me("Sent (XHR)"));
        }),
        t.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
        t.send(e);
    }
    if ((me({ m: "Sending", payload: e }), at))
      return void me("Not sending (dry run)");
    "function" == typeof ot &&
      ((e = ot(e)),
      !1 === e && me("Not sending (onBeforeSubmit hook returned false)")),
      kt && (t = "xhr");
    var i = b(e);
    "xhr" === t ? a(i) : "beacon" === t ? n(i) : void 0;
  }
  function U(e, t) {
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
  function W() {
    return G().length;
  }
  function G() {
    if (!_t) return [];
    try {
      var e = ut();
      return "object" == typeof e[0] ? e : [];
    } catch (e) {
      return [];
    }
  }
  function X() {
    var e = {};
    for (var t in lt)
      try {
        var n;
        (n = "function" == typeof lt[t] ? lt[t]() : lt[t]),
          void 0 !== n && (e[t] = n);
      } catch (n) {
        me({ m: "Error calculating tag value for key: " + t, error: n }),
          (e[t] = null);
      }
    return (e = ye(e, 100)), e;
  }
  function Y() {
    for (
      var e, t = document.cookie, n = {}, a = [], r = t.split(";"), s = 0;
      s < r.length;
      s++
    )
      if (((e = r[s].trim()), e)) {
        var o = e.split("="),
          d = o[0].trim(),
          l = 1 < o.length ? o.slice(1).join("=").trim() : "";
        a.push(d);
        for (var p, c = 0; c < vt.length; c++)
          if (
            ((p = vt[c]),
            "string" == typeof p &&
              2 < p.length &&
              "/" === p.charAt(0) &&
              "/" === p.charAt(p.length - 1))
          )
            try {
              var g = new RegExp(p.slice(1, -1));
              if (g.test(d)) {
                n[d] = l;
                break;
              }
            } catch (t) {
              if (d === p) {
                n[d] = l;
                break;
              }
            }
          else if (d === p) {
            n[d] = l;
            break;
          }
      }
    return (
      (a = a.filter(function (e, t) {
        return a.indexOf(e) == t;
      })),
      a.sort(),
      { cookies: n, cookies_list: a }
    );
  }
  function Q(e, n, a, i) {
    var r = e,
      s = Le(e, n),
      o = Y();
    return {
      provider: n,
      request: {
        endpoint: s.endpoint,
        method: s.method,
        post_payload: s.payload || null,
        protocol: s.protocol,
        href: t.location.href,
      },
      ts: r.ts || new Date().getTime(),
      dl_i: W() - 1,
      last_click_path: Bt,
      last_click_text: zt,
      tags: X(),
      stack_trace: a,
      cookies: o.cookies,
      cookies_list: o.cookies_list,
      sampling_rate: i.rate,
      adaptive_sampling_rule: i.rule,
      adaptive_sampling_mode: i.mode,
    };
  }
  function Z() {
    return ge(
      {
        hostname: t.location.hostname,
        user_agent: navigator.userAgent,
        navigator_language: navigator.language || navigator.userLanguage,
        load_url: Dt,
      },
      y()
    );
  }
  function J(e) {
    var t = G(),
      n = t;
    return (
      e && t && (n = Re(t)),
      {
        context: Z(),
        tp_id: $e,
        source_alias: He,
        environment: Ve,
        sdk: Gt.sdk,
        sdk_version: Gt.sdkVersion,
        sampling_rate: Nt,
        debug: Ue,
        datalayer: n,
        session_id: re(),
        tags: X(),
        init_id: jt,
        real_time: mt,
        repeated_values_compression: it,
      }
    );
  }
  function ee() {
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
          d = o.split("?"),
          l = d[0];
        (d = l.split("/")), (s = 1 < d.length ? d[0] + "/" + d[1] : d[0]);
        var p = s;
        Jt.call(n, p) || (n[p] = 0), n[p]++;
      }
      return n;
    } catch (t) {
      return null;
    }
  }
  function te() {
    for (; Ct.length; ) {
      var e = Ct.shift();
      j(e);
    }
  }
  function ne(e, t) {
    return Jt.call(e, "environment_rates") && Jt.call(e.environment_rates, t)
      ? e.environment_rates[t]
      : e.sample_rate;
  }
  function ae() {
    function e(e) {
      var t = ne(e, Ve);
      if (r(t))
        throw (
          ((Qe = new Date().getTime() + 300000),
          new Error("Invalid sampling rate"))
        );
      (Qe = 0),
        de(t),
        e.options && (Te(e.options), Gt.setOptions($e, e.options)),
        m({ event_name: "new_dau" }),
        te();
    }
    if (!St && !(new Date().getTime() < Qe))
      if (((St = !0), Ut))
        e(Ut),
          setTimeout(function () {
            St = !1;
          }, 3e3);
      else {
        me({ m: "Downloading config..." });
        var t = V(),
          n = Ge + "config-" + $e + ".json";
        (t.onreadystatechange = function () {
          if (4 == this.readyState) {
            me({ m: "Config downloaded" });
            try {
              var t = JSON.parse(this.responseText);
              e(t);
            } catch (e) {
              me({ m: "Failed to download config", error: e });
            }
          }
          setTimeout(function () {
            St = !1;
          }, 3e3);
        }),
          t.open("GET", n, !0),
          t.send();
      }
  }
  function ie(e) {
    n.setItem("_trackingplan_session_id", e),
      n.setItem("_trackingplan_session_ts", Date.now().toString());
  }
  function re() {
    if (!qt) return null;
    var e = n.getItem("_trackingplan_session_id"),
      t = n.getItem("_trackingplan_session_ts");
    if (null === e || null === t)
      return (
        me({ m: "Session ID: Creating for the first time session " }), se()
      );
    var a = Date.now(),
      i = parseInt(t, 10),
      r = 1e3 * (60 * Mt);
    return isNaN(i) || a > i + r
      ? (me({ m: "Session ID: Updating because timeout" }), se())
      : (n.setItem("_trackingplan_session_ts", a.toString()), e);
  }
  function se() {
    var e = "true" === n.getItem("_trackingplan_live_debug_mode"),
      t = oe();
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
  function oe() {
    var e = new Date().getTime(),
      t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var n = 0 | (e + 16 * Math.random()) % 16;
        return (e = i(e / 16)), ("x" === t ? n : 8 | (3 & n)).toString(16);
      });
    return t;
  }
  function de(e) {
    if (!1 === e)
      return (
        n.removeItem("_trackingplan_sample_rate"),
        n.removeItem("_trackingplan_sample_rate_ts"),
        n.removeItem("_trackingplan_is_sampled_user"),
        void n.removeItem("_trackingplan_options")
      );
    var t = Math.random() < 1 / e ? 1 : 0;
    me({ m: "Trackingplan sample rate = " + e + ". isSampledUser " + t }),
      n.setItem("_trackingplan_sample_rate_ts", new Date().getTime()),
      n.setItem("_trackingplan_sample_rate", e),
      n.setItem("_trackingplan_is_sampled_user", t);
  }
  function le() {
    var e = n.getItem("_trackingplan_sample_rate_ts");
    if (null === e) return !1;
    if (parseInt(e) + 1e3 * Ye < new Date().getTime())
      return me({ m: "Trackingplan sample rate expired" }), de(!1), !1;
    var t = parseInt(n.getItem("_trackingplan_sample_rate"));
    return r(t)
      ? (me({ m: "Trackingplan sample rate expired" }), de(!1), !1)
      : {
          sampleRate: t,
          isSampledUser: parseInt(n.getItem("_trackingplan_is_sampled_user")),
        };
  }
  function pe(e, t) {
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
  function ce(e) {
    var t = e.endpoint,
      n = e.payload,
      a = e.protocol;
    if (v(t)) {
      if ("data:" === t.substring(0, 5)) return !1;
      for (var r in Be)
        if (Be.hasOwnProperty(r)) {
          var s = r.split("@"),
            o = null;
          1 < s.length && (o = s[0]);
          var d = 1 < s.length ? s[1] : s[0],
            l = d.split("%"),
            p = l[0],
            c = 2 === l.length ? l[1] : null,
            g = Fe.slice();
          if (o)
            for (var m, u = o.split(","), _ = 0; _ < u.length; _++)
              if (((m = u[_].trim()), !!m)) {
                var h = m.charAt(0),
                  y = m.substring(1);
                if ("+" === h) {
                  var f = g.indexOf(y);
                  -1 !== f && g.splice(f, 1);
                } else "-" === h && -1 === g.indexOf(y) && g.push(y);
              }
          if ("string" == typeof a && -1 !== g.indexOf(a)) continue;
          var b = !0;
          if (
            (null !== c &&
              ("string" == typeof n
                ? (b = pe(c, n.substring(0, 65536)))
                : (b = !1)),
            pe(p, t.substring(0, 2048)) && b)
          )
            return Be[r];
        }
      return !1;
    }
  }
  function ge(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function me(e) {
    Ue && a.log("TP " + $e, e);
  }
  function ue(e) {
    t.console && a.warn && a.warn(e);
  }
  function _e(e) {
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
  function he(e) {
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
  function ye(e, t) {
    if ("string" == typeof e && e.length > t)
      return e.substring(0, t - 1) + "\u2026";
    if (Array.isArray(e))
      return e.map(function (e) {
        return ye(e, t);
      });
    if ("object" == typeof e && null !== e) {
      var n = {};
      return (
        Object.keys(e).forEach(function (a) {
          n[a] = ye(e[a], t);
        }),
        n
      );
    }
    return e;
  }
  function fe(e) {
    try {
      $t[e.name] = Math.round(e.value);
    } catch (t) {}
  }
  function ve() {
    try {
      var e = (function ($) {
        "use strict";
        var Z,
          ee,
          te,
          ne,
          ae,
          Y = Math.max,
          ie = -1,
          re = function (t) {
            addEventListener(
              "pageshow",
              function (e) {
                e.persisted && ((ie = e.timeStamp), t(e));
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
          se = function (a, e) {
            var n = c(),
              t = "navigate";
            return (
              0 <= ie
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
            var r, d;
            return function (i) {
              0 <= e.value &&
                (i || t) &&
                ((d = e.value - (r || 0)) || void 0 === r) &&
                ((r = e.value),
                (e.delta = d),
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
          l = function (t) {
            requestAnimationFrame(function () {
              return requestAnimationFrame(function () {
                return t();
              });
            });
          },
          oe = function (t) {
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
          g = function (t) {
            "hidden" === document.visibilityState &&
              -1 < p &&
              ((p = "visibilitychange" === t.type ? t.timeStamp : 0), y());
          },
          m = function () {
            addEventListener("visibilitychange", g, !0),
              addEventListener("prerenderingchange", g, !0);
          },
          y = function () {
            removeEventListener("visibilitychange", g, !0),
              removeEventListener("prerenderingchange", g, !0);
          },
          T = function () {
            return (
              0 > p &&
                ((p = e()),
                m(),
                re(function () {
                  setTimeout(function () {
                    (p = e()), m();
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
                  s = T(),
                  p = se("FCP"),
                  r = f("paint", function (t) {
                    t.forEach(function (t) {
                      "first-contentful-paint" === t.name &&
                        (r.disconnect(),
                        t.startTime < s.firstHiddenTime &&
                          ((p.value = Y(t.startTime - u(), 0)),
                          p.entries.push(t),
                          n(!0)));
                    });
                  });
                r &&
                  ((n = d(a, p, L, e.reportAllChanges)),
                  re(function (t) {
                    (p = se("FCP")),
                      (n = d(a, p, L, e.reportAllChanges)),
                      l(function () {
                        (p.value = performance.now() - t.timeStamp), n(!0);
                      });
                  }));
              });
          },
          b = [0.1, 0.25],
          w = 0,
          C = 1 / 0,
          de = 0,
          le = function (t) {
            t.forEach(function (t) {
              t.interactionId &&
                ((C = s(C, t.interactionId)),
                (de = Y(de, t.interactionId)),
                (w = de ? (de - C) / 7 + 1 : 0));
            });
          },
          F = function () {
            return Z ? w : performance.interactionCount || 0;
          },
          M = function () {
            "interactionCount" in performance ||
              Z ||
              (Z = f("event", le, {
                type: "event",
                buffered: !0,
                durationThreshold: 0,
              }));
          },
          k = [],
          D = new Map(),
          B = 0,
          pe = function () {
            var t = s(k.length - 1, i((F() - B) / 50));
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
              "hidden" === document.visibilityState ? a() : ((n = i(a)), oe(a)),
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
                entryType: "first-input",
                name: ee.type,
                target: ee.target,
                cancelable: ee.cancelable,
                startTime: ee.timeStamp,
                processingStart: ee.timeStamp + te,
              };
              ae.forEach(function (e) {
                e(t);
              }),
                (ae = []);
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
          ($.onCLS = function (s, e) {
            (e = e || {}),
              S(
                v(function () {
                  var n,
                    p = se("CLS", 0),
                    c = 0,
                    g = [],
                    m = function (t) {
                      t.forEach(function (a) {
                        if (!a.hadRecentInput) {
                          var e = g[0],
                            n = g[g.length - 1];
                          c &&
                          1e3 > a.startTime - n.startTime &&
                          5e3 > a.startTime - e.startTime
                            ? ((c += a.value), g.push(a))
                            : ((c = a.value), (g = [a]));
                        }
                      }),
                        c > p.value && ((p.value = c), (p.entries = g), n());
                    },
                    a = f("layout-shift", m);
                  a &&
                    ((n = d(s, p, b, e.reportAllChanges)),
                    oe(function () {
                      m(a.takeRecords()), n(!0);
                    }),
                    re(function () {
                      (c = 0),
                        (p = se("CLS", 0)),
                        (n = d(s, p, b, e.reportAllChanges)),
                        l(function () {
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
                  o = se("FID"),
                  l = function (t) {
                    t.startTime < r.firstHiddenTime &&
                      ((o.value = t.processingStart - t.startTime),
                      o.entries.push(t),
                      n(!0));
                  },
                  a = function (t) {
                    t.forEach(l);
                  },
                  s = f("first-input", a);
                (n = d(t, o, W, e.reportAllChanges)),
                  s &&
                    (oe(
                      v(function () {
                        a(s.takeRecords()), s.disconnect();
                      })
                    ),
                    re(function () {
                      var i;
                      (o = se("FID")),
                        (n = d(t, o, W, e.reportAllChanges)),
                        (ae = []),
                        (te = -1),
                        (ee = null),
                        U(addEventListener),
                        (i = l),
                        ae.push(i),
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
                var l,
                  p = se("INP"),
                  c = function (t) {
                    N(function () {
                      t.forEach(H);
                      var e = pe();
                      e &&
                        e.latency !== p.value &&
                        ((p.value = e.latency), (p.entries = e.entries), l());
                    });
                  },
                  o = f("event", c, {
                    durationThreshold:
                      null !== (n = e.durationThreshold) && void 0 !== n
                        ? n
                        : 40,
                  });
                (l = d(s, p, q, e.reportAllChanges)),
                  o &&
                    (o.observe({ type: "first-input", buffered: !0 }),
                    oe(function () {
                      c(o.takeRecords()), l(!0);
                    }),
                    re(function () {
                      (B = F()),
                        (k.length = 0),
                        D.clear(),
                        (p = se("INP")),
                        (l = d(s, p, q, e.reportAllChanges));
                    }));
              }));
          }),
          ($.onLCP = function (s, p) {
            (p = p || {}),
              E(function () {
                var n,
                  c = T(),
                  g = se("LCP"),
                  e = function (t) {
                    p.reportAllChanges || (t = t.slice(-1)),
                      t.forEach(function (t) {
                        t.startTime < c.firstHiddenTime &&
                          ((g.value = Y(t.startTime - u(), 0)),
                          (g.entries = [t]),
                          n());
                      });
                  },
                  r = f("largest-contentful-paint", e);
                if (r) {
                  n = d(s, g, O, p.reportAllChanges);
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
                    oe(a),
                    re(function (e) {
                      (g = se("LCP")),
                        (n = d(s, g, O, p.reportAllChanges)),
                        l(function () {
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
            var s = se("TTFB"),
              o = d(a, s, V, e.reportAllChanges);
            _(function () {
              var t = c();
              t &&
                ((s.value = Y(t.responseStart - u(), 0)),
                (s.entries = [t]),
                o(!0),
                re(function () {
                  (s = se("TTFB", 0)), (o = d(a, s, V, e.reportAllChanges))(!0);
                }));
            });
          }),
          $
        );
      })({});
      e.onCLS(fe),
        e.onFCP(fe),
        e.onFID(fe),
        e.onINP(fe),
        e.onLCP(fe),
        e.onTTFB(fe);
    } catch (t) {}
  }
  function be() {
    t.addEventListener("error", function (e) {
      Vt++;
    });
    var e = a.warn;
    a.warn = function () {
      Ht++, e.apply(a, arguments);
    };
  }
  function ke() {
    try {
      var e = n.getItem("_trackingplan_options");
      return e ? JSON.parse(e) : null;
    } catch (t) {
      return me({ m: "Error getting stored options", error: t }), null;
    }
  }
  function Te(e) {
    try {
      return n.setItem("_trackingplan_options", JSON.stringify(e)), !0;
    } catch (t) {
      return me({ m: "Error storing options", error: t }), !1;
    }
  }
  function xe(e) {
    if (!e) return {};
    for (var t, n = {}, a = e.split("&"), r = 0; r < a.length; r++)
      (t = a[r].split("=")),
        (n[decodeURIComponent(t[0])] = decodeURIComponent(t[1] || ""));
    return n;
  }
  function Ie(e, t, n) {
    if (!Array.isArray(n) || !n.length) return null;
    var a = n.filter(function (t) {
      return t.provider === e;
    });
    if (!a.length) return null;
    var r = "",
      s = t.endpoint || "",
      o = {};
    try {
      var d = new URL(t.endpoint);
      (r = d.pathname), d.search && (o = xe(d.search.substring(1)));
    } catch (t) {}
    var l = [o],
      p = !1,
      c = null;
    if (t.payload)
      try {
        (c = JSON.parse(t.payload)), (p = !0);
      } catch (t) {}
    !p &&
      t.payload &&
      "string" == typeof t.payload &&
      t.payload.split("\n").forEach(function (e) {
        if (e.trim()) {
          var t = xe(e),
            n = ge({}, o);
          (n = ge(n, t)), 0 < Object.keys(n).length && l.push(n);
        }
      });
    for (
      var g = 65536,
        m = s || "",
        u = t.payload || "",
        _ = {
          path: r || "",
          endpoint: (function () {
            try {
              return m.substring(0, g);
            } catch (t) {
              return "";
            }
          })(),
          payload: (function () {
            try {
              return u.substring(0, g);
            } catch (t) {
              return "";
            }
          })(),
        },
        h = [],
        y = 0;
      y < l.length;
      y++
    )
      h.push(qe(l[y]));
    for (var f, v = c ? qe(c) : null, b = 0; b < a.length; b++) {
      if (((f = a[b]), !f.match)) return { sampleRate: f.sample_rate, rule: f };
      for (var T = 0; T < l.length; T++)
        if (je(f.match, l[T], _, h[T]))
          return { sampleRate: f.sample_rate, rule: f };
      if (c && je(f.match, c, _, v))
        return { sampleRate: f.sample_rate, rule: f };
      if (c) {
        var x = ge({}, o);
        x = ge(x, c);
        var I = qe(x);
        if (je(f.match, x, _, I)) return { sampleRate: f.sample_rate, rule: f };
      }
    }
    return null;
  }
  function Ee(e, t) {
    var n = 1 / t.sampleRate;
    if (1 <= n || 0 > n) return !1;
    if (0 < e) {
      var a = 1 / e;
      if (a <= n) return !1;
      var i = (a - n) / (1 - n);
      return !(0 >= i) && Math.random() < i;
    }
    return !1;
  }
  function we(e) {
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
        t = "n/a";
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
  function Ae(e, t, n, i) {
    var r = we(n),
      s =
        null === n ? -1 : "string" == typeof n ? n.length : n.toString().length,
      o = "*ANON*" + i + "*" + t + "*" + e + "*" + r + "*" + s;
    return (
      It &&
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
  function Se(e, t, n, a, r) {
    function s(e, s, o, d) {
      try {
        d = decodeURIComponent(d);
      } catch (t) {}
      var l, p, c, g, m;
      for (l = 0; l < t.length; l++)
        for (c = t[l], g = a.name_regexes[c] || [], p = 0; p < g.length; p++)
          if (g[p].test(o)) return (m = r(c, o, d, "NAME")), s + o + "=" + m;
      if (1024 > d.length)
        for (l = 0; l < n.length; l++)
          for (c = n[l], g = a.value_regexes[c] || [], p = 0; p < g.length; p++)
            if (g[p].test(d)) return (m = r(c, o, d, "VALUE")), s + o + "=" + m;
      return e;
    }
    var o = /([?&;\s]|^)([^=&;\s?]+)=([^&;\s]+)/g;
    return e.replace(o, s);
  }
  function Pe(e, t, n, a, r) {
    function s(e, o) {
      var d,
        l,
        p,
        c,
        g = o;
      if ("string" == typeof o || "number" == typeof o || "boolean" == typeof o)
        for (d = 0; d < t.length; d++)
          for (p = t[d], c = a.name_regexes[p] || [], l = 0; l < c.length; l++)
            if (c[l].test(e)) return (g = r(p, e, o, "NAME")), g;
      if (null !== o && ("string" == typeof o || "number" == typeof o)) {
        var m = o.toString();
        if (1024 > m.length)
          for (d = 0; d < n.length; d++)
            for (
              p = n[d], c = a.value_regexes[p] || [], l = 0;
              l < c.length;
              l++
            )
              if (c[l].test(m)) return (g = r(p, e, o, "VALUE")), g;
      }
      if (
        "string" == typeof o &&
        1 < o.length &&
        (("{" === o.charAt(0) && "}" === o.charAt(o.length - 1)) ||
          ("[" === o.charAt(0) && "]" === o.charAt(o.length - 1)))
      )
        try {
          var u = JSON.parse(o),
            _ = s(e, u);
          return JSON.stringify(_);
        } catch (t) {}
      if (Array.isArray(o))
        return o.map(function (t, n) {
          return s(e + "[" + n + "]", t);
        });
      if ("object" == typeof o && null !== o) {
        var h,
          y = {};
        for (h in o) o.hasOwnProperty(h) && (y[h] = s(h, o[h]));
        return y;
      }
      return o;
    }
    return s("", e);
  }
  function Le(e, t) {
    var n = JSON.parse(b(e)),
      a = De(t),
      i = a.nameRegexKeys,
      r = a.valueRegexKeys;
    if (
      (n.endpoint &&
        n.endpoint.includes("?") &&
        (n.endpoint = Se(n.endpoint, i, r, ze, Ae)),
      n.payload)
    )
      try {
        var s =
          "string" == typeof n.payload ? n.payload : JSON.stringify(n.payload);
        try {
          var o = JSON.parse(s);
          n.payload = JSON.stringify(Pe(o, i, r, ze, Ae));
        } catch (t) {
          n.payload = Se(s, i, r, ze, Ae);
        }
      } catch (t) {
        ue({ m: "Error masking payload", error: t });
      }
    return n;
  }
  function Ce(e) {
    function t(e) {
      return -1 !== Tt.indexOf(e);
    }
    function n(e) {
      for (var a in e)
        e.hasOwnProperty(a) &&
          ("object" == typeof e[a] && null !== e[a]
            ? n(e[a])
            : t(a) && (e[a] = Ae("legacy", a, e[a], !0)));
      return e;
    }
    if (!Array.isArray(Tt) || 0 == Tt.length) return e;
    var a = JSON.parse(b(e));
    return a.map(function (e) {
      return "object" == typeof e && null !== e ? n(e) : e;
    });
  }
  function Re(e) {
    var t;
    if (xt && Et) {
      var n = De("datalayer"),
        a = n.nameRegexKeys,
        i = n.valueRegexKeys;
      if (!(0 < a.length || 0 < i.length)) t = JSON.parse(b(e));
      else if (Array.isArray(e)) {
        var r = e.slice(Wt.lastProcessedLength),
          s = JSON.parse(b(r)),
          o = s.map(function (e) {
            return "object" == typeof e && null !== e ? Pe(e, a, i, ze, Ae) : e;
          });
        (t = Wt.maskedItems.concat(o)),
          (Wt.lastProcessedLength = e.length),
          (Wt.maskedItems = t);
      } else (t = JSON.parse(b(e))), (t = Pe(t, a, i, ze, Ae));
    } else t = e;
    return (t = Ce(t)), t;
  }
  function Ne(e) {
    return new RegExp(e, "i");
  }
  function Oe() {
    if (Et) {
      var e;
      for (e in Et.name_regexes)
        ze.name_regexes[e] = Et.name_regexes[e].map(Ne);
      for (e in Et.value_regexes)
        ze.value_regexes[e] = Et.value_regexes[e].map(Ne);
    }
  }
  function De(e) {
    var t = [],
      n = [];
    if (
      Et.provider_rules &&
      Et.provider_rules.provider_specific &&
      Et.provider_rules.provider_specific[e]
    ) {
      var a = Et.provider_rules.provider_specific[e];
      a.name_regexes && (t = t.concat(a.name_regexes)),
        a.value_regexes && (n = n.concat(a.value_regexes));
    }
    if (Et.provider_rules && Et.provider_rules.global) {
      var i = Et.provider_rules.global;
      i.name_regexes && (t = t.concat(i.name_regexes)),
        i.value_regexes && (n = n.concat(i.value_regexes));
    }
    return { nameRegexKeys: t, valueRegexKeys: n };
  }
  function je(e, t, n, a) {
    if (!e || "object" != typeof e) return !1;
    if (e.and && Array.isArray(e.and))
      return e.and.every(function (e) {
        return je(e, t, n, a);
      });
    if (e.or && Array.isArray(e.or))
      return e.or.some(function (e) {
        return je(e, t, n, a);
      });
    if (e.not) return !je(e.not, t, n, a);
    var i = Object.keys(e);
    return i.every(function (t) {
      var i = e[t];
      if ("@TP_ENDPOINT_PATH@CONTAINS" === t) {
        if (!n) return !1;
        var r = n.path;
        return Me(function (e) {
          return -1 !== r.indexOf(e);
        }, i);
      }
      if ("@TP_ENDPOINT_OR_PAYLOAD@CONTAINS" === t) {
        if (!n) return !1;
        var s = n.endpoint + " " + n.payload;
        return Me(function (e) {
          return -1 !== s.indexOf(e);
        }, i);
      }
      if ("@TP_ANY_KEY" === t)
        return Me(function (e) {
          for (var t in a)
            if (a.hasOwnProperty(t) && -1 !== a[t].indexOf(e)) return !0;
          return !1;
        }, i);
      if (9 <= t.length && t.indexOf("@CONTAINS") === t.length - 9) {
        var o = t.substring(0, t.length - 9);
        return Me(function (e) {
          return (
            !!a[o] &&
            a[o].some(function (t) {
              return -1 !== t.indexOf(e);
            })
          );
        }, i);
      }
      return Me(function (e) {
        return a[t] && -1 !== a[t].indexOf(e);
      }, i);
    });
  }
  function Me(e, t) {
    return Array.isArray(t)
      ? t.some(function (t) {
          return e(t + "");
        })
      : e(t + "");
  }
  function qe(e, t) {
    if (((t = t || {}), !e)) return t;
    if (Array.isArray(e)) {
      for (var n = 0; n < e.length; n++) qe(e[n], t);
      return t;
    }
    if ("object" == typeof e)
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          "string" == typeof r &&
            (!t[a] && (t[a] = []), -1 === t[a].indexOf(r) && t[a].push(r)),
            null !== r && "object" == typeof r && qe(r, t);
        }
    return t;
  }
  if (t.Trackingplan)
    return void (
      t.Trackingplan.testing || ue("Trackingplan snippet included twice.")
    );
  var Fe = ["performance"],
    Be = {
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
      "/b/ss/": "adobe",
      "/.*AQB=1.*AQE=1/": "adobe",
      "posthog.com/i/": "posthog",
      "posthog.com/e/": "posthog",
      "/.*tealiumiq.com/.*.gif/": "tealium",
      ".connectif.cloud": "connectif",
      "/ppms.php": "piwikpro",
      "plausible.io/api/event": "plausible",
      "ariane.abtasty.com": "abtasty",
      "xiti.com/event": "piano",
      "pa-cd.com/event": "piano",
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
      "+performance@/.*awin1.com/.*.php.*/": "awin",
      "+performance,-beacon,-img,-fetch,-message,-xhr@/^(?=.*/c\\..*contentsquare\\.net/(?!v2)).*$/":
        "contentsquare",
    },
    ze = { name_regexes: {}, value_regexes: {} },
    $e = null,
    Ve = "PRODUCTION",
    He = null,
    Ke = "xhr",
    Ue = !1,
    We = "https://tracks.trackingplan.com/v1/",
    Ge = "https://config.trackingplan.com/",
    Xe = 0,
    Ye = 86400,
    Qe = 0,
    Ze = "user",
    Je = 55e3,
    et = 20,
    tt = ["img", "xhr", "beacon", "fetch", "performance", "message"],
    nt = !1,
    at = !1,
    it = !1,
    rt = function () {},
    st = function () {},
    ot = function (e) {
      return e;
    },
    dt = !1,
    lt = {
      _utag_gdpr_selected_categories: function () {
        return t.utag &&
          t.utag.gdpr &&
          "function" == typeof t.utag.gdpr.getSelectedCategories
          ? t.utag.gdpr.getSelectedCategories()
          : void 0;
      },
    },
    pt = null,
    ct = [],
    gt = null,
    mt = !1,
    ut = function () {
      return t[ht];
    },
    _t = !0,
    ht = "dataLayer",
    yt = !1,
    ft = !1,
    vt = [
      "OptanonConsent",
      "CookieConsent",
      "cmapi_cookie_privacy",
      "euconsent-v2",
      "euconsent",
      "fs-cc",
      "cookieyes-consent",
      "CookieScriptConsent",
      "__hs_cookie_cat_pref",
    ],
    bt = null,
    kt = !1,
    Tt = [
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
    xt = !1,
    It = !1,
    Et = {
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
        dni: ["(^|[_\\.\\-\\s])dni([_\\.\\-\\s]|$)"],
        nie: ["(^|[_\\.\\-\\s])nie([_\\.\\-\\s]|$)"],
        passport: ["(^|[_\\.\\-\\s])(passport|pasaporte)([_\\.\\-\\s]|$)"],
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
          "^(?:(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|::(?:[A-Fa-f0-9]{1,4}:){0,6}[A-Fa-f0-9]{0,4})$",
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
        dni: ["\\b\\d{8}[A-HJ-NP-TV-Z]\\b"],
        nie: ["\\b[XYZ]\\d{7}[A-HJ-NP-TV-Z]\\b"],
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
            "dni",
            "ethnicity",
            "gender",
            "geolocation",
            "health",
            "ip",
            "license",
            "name",
            "nie",
            "passport",
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
            "dni",
            "email",
            "gender",
            "ip",
            "nie",
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
    wt = [],
    At = !1,
    St = !1,
    Pt = "_trackingplan_session_id",
    Lt = "_trackingplan_live_debug_mode",
    Ct = [],
    Rt = "",
    Nt = null,
    Ot = null,
    Dt = "",
    jt = "",
    Mt = 30,
    qt = !0,
    Ft = !0,
    Bt = null,
    zt = null,
    $t = {},
    Vt = 0,
    Ht = 0,
    Kt = !1,
    Ut = null,
    Wt = { lastProcessedLength: 0, maskedItems: [] },
    Gt = (t.Trackingplan = {
      sdk: "js",
      sdkVersion: "1.34.8",
      options: null,
      tpId: null,
      testing: !1,
      setOptions: function (e, t) {
        (t = this.options = t || {}),
          ($e = this.tpId = e),
          (Ve = t.environment || Ve),
          (He = t.sourceAlias || He),
          (xt = "boolean" == typeof t.usePrivacy ? t.usePrivacy : xt),
          (Et = t.privacyConfig || Et),
          (Ke = t.sendMethod || Ke),
          (Be = ge(Be, t.customDomains || {})),
          (Ue = "boolean" == typeof t.debug ? t.debug : Ue),
          (We = t.tracksEndPoint || We),
          (Ge = t.configEndPoint || Ge),
          (Xe = t.delayConfigDownload || Xe),
          (Ye = t.sampleRateTTL || Ye),
          (Ze = t.samplingMode || Ze),
          (pt = t.samplingRate || pt),
          (Je = t.batchSize || Je),
          (et = t.batchInterval || et),
          (nt = typeof t.alwaysSendNewUser ? t.alwaysSendNewUser : nt),
          (at = "boolean" == typeof t.dryRun ? t.dryRun : at),
          (it =
            "boolean" == typeof t.repeated_values_compression
              ? t.repeated_values_compression
              : it),
          (tt = t.intercept || tt),
          (rt = t.onSubmit || rt),
          (dt = t.parse || dt),
          (st = t.onQueue || st),
          (ot = t.onBeforeSubmit || ot),
          (lt = ge(lt, t.tags || {})),
          (ct = t.contentFilters || ct),
          (gt = t.providersWhitelist || gt),
          (mt = "boolean" == typeof t.realtime ? t.realtime : mt),
          (ut = t.getDataLayer || ut),
          (ht = t.datalayerVar || ht),
          (Mt = t.sessionDurationMinutes || Mt),
          (Ft =
            "undefined" == typeof t.intervalsOnInit ? Ft : t.intervalsOnInit),
          (vt = t.cookiesWhitelist || vt),
          (_t = "boolean" == typeof t.useDataLayer ? t.useDataLayer : _t),
          (yt = "boolean" == typeof t.useNativeSend ? t.useNativeSend : yt),
          (ft =
            "boolean" == typeof t.useSyncProcessing ? t.useSyncProcessing : ft),
          (qt = "boolean" == typeof t.useSessions ? t.useSessions : qt),
          (At =
            "boolean" == typeof t.useAdaptiveSampling
              ? t.useAdaptiveSampling
              : At),
          (Ut = t.configFileOverride || Ut),
          (Tt = t.datalayerMaskKeys || Tt),
          (It = "boolean" == typeof t.debugPrivacy ? t.debugPrivacy : It),
          Array.isArray(t.adaptiveSamplingPatterns) &&
            (wt = t.adaptiveSamplingPatterns.concat(wt)),
          (kt = this.testing = t.testing || kt),
          mt && ((pt = 1), (Ze = "all"), (Je = 1)),
          kt && (bt = Date.now()),
          me({ m: "TP options updated", options: t }),
          xt && Et && Oe();
      },
      getAdaptiveSamplingPatterns: function () {
        return wt;
      },
      getPrivacyConfig: function () {
        return Et;
      },
      init: function (e, i) {
        try {
          if (kt)
            return void ue("Trackingplan SDK is running in a test environment");
          if (!f()) throw new Error("TP Not compatible browser");
          if (null !== $e) throw new Error("TP Init already happened");
          if ("string" != typeof e || "" === e)
            throw new Error("tpId is not provided");
          if (((Dt = null), t.performance && t.performance.getEntriesByType)) {
            var r = t.performance.getEntriesByType("navigation")[0];
            Dt = r ? r.name : t.location.href;
          } else Dt = t.location.href;
          d(Dt);
          var s = l();
          s &&
            (a.log("TP Running in regression mode", s),
            (i = i || {}),
            (i.testing = !0),
            (i.realtime = !0),
            (i.samplingMode = "all"),
            (i.tags = i.tags || {}),
            (i.tags.test_session_name = s.test_session_name),
            (i.tags.test_title = s.test_title),
            (i.environment = s.environment)),
            p(Dt);
          var o = "true" === n.getItem(Lt);
          o && ((i = i || {}), (i.realtime = !0), (i.samplingMode = "all")),
            Gt.setOptions(e, i),
            Ue &&
              ((t.Trackingplan.xhr = { open: Yt, send: Qt }),
              (t.Trackingplan.beacon = { sendBeacon: Zt }));
          var y = ke();
          null !== y && Gt.setOptions(e, y),
            null !== pt && de(pt),
            (jt = oe()),
            u(t),
            document.addEventListener("visibilitychange", function () {
              "hidden" === document.visibilityState &&
                setTimeout(function () {
                  B("beacon"), me({ m: "visibility beacon" });
                }, 3e3);
            }),
            t.addEventListener("pagehide", g),
            t.addEventListener("beforeunload", g),
            t.document.addEventListener(
              "click",
              function (e) {
                (Bt = _e(e.target)), (zt = he(e.target));
              },
              !1
            ),
            _() &&
              (me({ m: "New User" }),
              h({
                landing: document.location.href,
                referrer: document.referrer,
              }),
              m({ event_name: "new_user" })),
            /[?&]utm_[^=]+/.test(document.location.search) &&
              h({ last_utm_page: document.location.href });
          var v = re();
          o && c(v),
            m({ event_name: "page_load" }),
            !0 === Ft && Gt.initIntervals(),
            ve(),
            be(),
            me({ m: "TP init finished", options: i });
        } catch (e) {
          ue({ m: "TP init error", error: e });
        }
      },
      flush: function () {
        B(Ke);
      },
      queueSize: function () {
        return Rt.length;
      },
      updateTags: function (e) {
        B(Ke), (lt = ge(lt, e));
      },
      initIntervals: function () {
        kt ||
          setTimeout(function () {
            Kt ||
              (m({
                event_name: "pixels",
                properties: { pixels: ee(), sent_at: "timeout" },
              }),
              (Kt = !0));
          }, 1e4),
          setInterval(function () {
            B(Ke);
          }, 1e3 * et);
      },
      getSessionId: function () {
        return n.getItem(Pt);
      },
      enableLiveDebugMode: function () {
        n.setItem(Lt, "true"), se(), t.location.reload();
      },
      disableLiveDebugMode: function () {
        localStorage.removeItem(Lt), t.location.reload();
      },
      clearStorageAndReload: function () {
        n.removeItem("_trackingplan_sample_rate"),
          n.removeItem("_trackingplan_sample_rate_ts"),
          n.removeItem("_trackingplan_is_sampled_user"),
          n.removeItem("_trackingplan_initial"),
          n.removeItem("_trackingplan_options"),
          n.removeItem(Pt),
          n.removeItem("_trackingplan_session_ts"),
          n.removeItem(Lt),
          n.removeItem("_trackingplan_regression"),
          t.location.reload();
      },
    }),
    Xt = !1,
    Yt = t.XMLHttpRequest.prototype.open,
    Qt = t.XMLHttpRequest.prototype.send,
    Zt = t.navigator.sendBeacon,
    Jt = Object.prototype.hasOwnProperty;
  (Gt.maskQueryStrings = Se),
    (Gt.maskJSONObject = Pe),
    (Gt.matchSamplingRules = Ie),
    (Gt.evaluateMatchCondition = je),
    (Gt._flattenObjectToKeyValues = qe),
    (Gt.processRequest = j),
    (Gt.diffWithPrevious = M),
    (Gt.deepLeftToRightDiff = q),
    (Gt.DELETED_MARKER = "@TP_DEL"),
    (Gt._processBlobData = w),
    "undefined" != typeof module && module.exports && (module.exports = Gt);
})(window, localStorage, console);

/* === Trackingplan Init === */
Trackingplan.init("TP4514803", {
  environment: tealiumEnv === "prod" ? "PRODUCTION" : "DEVELOPMENT",
  tracksEndPoint: "https://eu-tracks.trackingplan.com/v1/",
  // tags: { "app_version": "...", } // See docs to know about optional tags.
});
