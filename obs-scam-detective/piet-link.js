/* ==========================================================================
   piet-link.js — Verbindung zwischen Regiepult und Overlay
   Wege (alle gleichzeitig, Nachrichten werden entdoppelt):
     1. OBS-WebSocket v5 (BroadcastCustomEvent) — der Hauptweg, funktioniert
        zwischen Chrome (Pult) und OBS (Browserquelle).
     2. window.postMessage — Pult ⇄ eingebettete Vorschau im Pult.
     3. BroadcastChannel — falls beide Seiten im selben Browser laufen.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- SHA-256 (rein in JS; OBS-Browserquellen haben oft kein crypto.subtle) ---------- */
  function sha256Bytes(bytes) {
    const K = new Uint32Array([
      0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2]);
    const H = new Uint32Array([0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]);
    const l = bytes.length, bitLen = l * 8;
    const n = (((l + 9) >> 6) + 1) << 6;
    const m = new Uint8Array(n); m.set(bytes); m[l] = 0x80;
    const dv = new DataView(m.buffer);
    dv.setUint32(n - 4, bitLen >>> 0); dv.setUint32(n - 8, Math.floor(bitLen / 0x100000000));
    const w = new Uint32Array(64);
    const r = (x, s) => (x >>> s) | (x << (32 - s));
    for (let o = 0; o < n; o += 64) {
      for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = r(w[i-15],7) ^ r(w[i-15],18) ^ (w[i-15] >>> 3);
        const s1 = r(w[i-2],17) ^ r(w[i-2],19) ^ (w[i-2] >>> 10);
        w[i] = (w[i-16] + s0 + w[i-7] + s1) | 0;
      }
      let [a,b,c,d,e,f,g,h] = H;
      for (let i = 0; i < 64; i++) {
        const t1 = (h + (r(e,6) ^ r(e,11) ^ r(e,25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
        const t2 = ((r(a,2) ^ r(a,13) ^ r(a,22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      H[0]+=a; H[1]+=b; H[2]+=c; H[3]+=d; H[4]+=e; H[5]+=f; H[6]+=g; H[7]+=h;
    }
    const out = new Uint8Array(32);
    for (let i = 0; i < 8; i++) { out[i*4]=H[i]>>>24; out[i*4+1]=H[i]>>>16; out[i*4+2]=H[i]>>>8; out[i*4+3]=H[i]; }
    return out;
  }
  const utf8 = s => new TextEncoder().encode(s);
  const b64 = bytes => { let s = ""; bytes.forEach(b => s += String.fromCharCode(b)); return btoa(s); };
  function obsAuth(password, salt, challenge) {
    const secret = b64(sha256Bytes(utf8(password + salt)));
    return b64(sha256Bytes(utf8(secret + challenge)));
  }

  const rid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

  /* ---------- Link ---------- */
  function PietLink(role, opts) {
    opts = opts || {};
    const self = this;
    this.role = role;
    this.id = role + "-" + rid();
    this.handlers = [];
    this.statusHandlers = [];
    this.obsEventHandlers = [];
    this.seen = [];
    this.pending = {};
    this.obsState = "aus";      // aus | verbinde | verbunden | fehler
    this.obsError = "";
    this.targets = [];          // extra windows for postMessage (preview iframes)
    this.wsOpts = opts.obs || null;
    this.eventMask = opts.eventMask || 1;

    try {
      this.bc = new BroadcastChannel("piet-scam-hud");
      this.bc.onmessage = e => self._in(e.data);
    } catch (e) { this.bc = null; }

    window.addEventListener("message", e => {
      if (e.data && e.data.__piet) self._in(e.data);
    });

    if (this.wsOpts && this.wsOpts.port) this._connect(0);
  }

  PietLink.prototype.on = function (fn) { this.handlers.push(fn); };
  PietLink.prototype.onStatus = function (fn) { this.statusHandlers.push(fn); fn(this.obsState, this.obsError); };
  PietLink.prototype.onObsEvent = function (fn) { this.obsEventHandlers.push(fn); };
  PietLink.prototype.addTarget = function (win) { this.targets.push(win); };
  PietLink.prototype._status = function (s, err) {
    this.obsState = s; this.obsError = err || "";
    this.statusHandlers.forEach(fn => fn(s, this.obsError));
  };

  PietLink.prototype._in = function (msg) {
    if (!msg || !msg.__piet || msg.src === this.id) return;
    if (this.seen.indexOf(msg.mid) !== -1) return;
    this.seen.push(msg.mid); if (this.seen.length > 300) this.seen.shift();
    this.handlers.forEach(fn => { try { fn(msg.type, msg.data, msg); } catch (e) { console.error(e); } });
  };

  PietLink.prototype.send = function (type, data) {
    const msg = { __piet: 1, src: this.id, role: this.role, mid: rid(), type: type, data: data };
    if (this.bc) try { this.bc.postMessage(msg); } catch (e) {}
    this.targets.forEach(w => { try { w.postMessage(msg, "*"); } catch (e) {} });
    if (window.parent && window.parent !== window) try { window.parent.postMessage(msg, "*"); } catch (e) {}
    if (this.obsState === "verbunden") this.request("BroadcastCustomEvent", { eventData: msg }).catch(() => {});
    return msg;
  };

  PietLink.prototype.request = function (requestType, requestData) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (!self.ws || self.obsState !== "verbunden") return reject(new Error("OBS nicht verbunden"));
      const requestId = rid();
      self.pending[requestId] = { resolve, reject };
      self.ws.send(JSON.stringify({ op: 6, d: { requestType, requestId, requestData: requestData || {} } }));
      setTimeout(() => {
        if (self.pending[requestId]) { delete self.pending[requestId]; reject(new Error("Zeitüberschreitung: " + requestType)); }
      }, 5000);
    });
  };

  PietLink.prototype.reconfigure = function (obs) {
    this.wsOpts = obs;
    if (this.ws) { this.ws.onclose = null; try { this.ws.close(); } catch (e) {} }
    clearTimeout(this.retryT);
    this._status("aus");
    if (obs && obs.port) this._connect(0);
  };

  PietLink.prototype._connect = function (attempt) {
    const self = this, o = this.wsOpts;
    let ws;
    this._status("verbinde");
    try { ws = new WebSocket("ws://" + (o.host || "127.0.0.1") + ":" + o.port); }
    catch (e) { this._status("fehler", e.message); return this._retry(attempt); }
    this.ws = ws;
    ws.onmessage = ev => {
      let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (m.op === 0) {
        const d = { rpcVersion: 1, eventSubscriptions: self.eventMask };
        if (m.d.authentication) {
          if (!o.password) { self._status("fehler", "OBS verlangt ein Passwort (config.js oder Einstellungen)"); return; }
          d.authentication = obsAuth(o.password, m.d.authentication.salt, m.d.authentication.challenge);
        }
        ws.send(JSON.stringify({ op: 1, d }));
      } else if (m.op === 2) {
        attempt = 0; self._status("verbunden");
      } else if (m.op === 5) {
        if (m.d.eventType === "CustomEvent") self._in(m.d.eventData);
        else self.obsEventHandlers.forEach(fn => fn(m.d.eventType, m.d.eventData || {}));
      } else if (m.op === 7) {
        const p = self.pending[m.d.requestId];
        if (p) {
          delete self.pending[m.d.requestId];
          if (m.d.requestStatus && m.d.requestStatus.result) p.resolve(m.d.responseData || {});
          else p.reject(new Error((m.d.requestStatus && m.d.requestStatus.comment) || "OBS-Fehler"));
        }
      }
    };
    ws.onclose = ev => {
      if (ev.code === 4009) self._status("fehler", "OBS-Passwort falsch");
      else if (self.obsState !== "fehler") self._status("fehler", "OBS nicht erreichbar (läuft OBS? WebSocket an?)");
      self._retry(attempt);
    };
    ws.onerror = () => {};
  };

  PietLink.prototype._retry = function (attempt) {
    const self = this;
    clearTimeout(this.retryT);
    this.retryT = setTimeout(() => self._connect(attempt + 1), Math.min(10000, 1500 * (attempt + 1)));
  };

  window.PietLink = PietLink;
  window.PietLink.obsAuth = obsAuth;
  window.PietLink.sha256Hex = s => Array.from(sha256Bytes(utf8(s))).map(b => b.toString(16).padStart(2, "0")).join("");
})();
