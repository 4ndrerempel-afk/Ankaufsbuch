/* ==========================================================================
   minipiet.js — die Mini-Petes. Noir-Figuren im Graphic-Novel-Stil:
   braune Haare, schwarzer Hoodie mit Logo, dunkle Jeans. Licht von rechts,
   kühles Kantenlicht. Aussehen in config.js unter "miniPiet".
   ========================================================================== */
(function () {
  "use strict";
  const CFG = (window.PIET_CONFIG && window.PIET_CONFIG.miniPiet) || {};
  const C = Object.assign({
    hairLight: "#7a4e2d", hair: "#5a3820", hairDark: "#2e1c10",
    skinLight: "#e8c3a2", skin: "#d2a07c", skinDark: "#a8734f",
    hoodLight: "#2a2d33", hood: "#15171b", hoodDark: "#08090b",
    jeansLight: "#34405a", jeansDark: "#151b27",
    shoe: "#121316", sole: "#d9d9d4", rim: "#9cc4d6",
    logo: "", initials: "PvD", logoColor: "#c8102e"
  }, CFG);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  let uid = 0;

  /* Gesicht: zurückhaltend, kein Comic */
  function face(expr) {
    const br = C.hairDark, ey = "#16130f", mo = "#7c4a3a";
    const L = {
      browN: `<path d="M42.6 21.6 q2.5 -1 5 -.3 M52.4 21.3 q2.5 -.7 5 .3" stroke="${br}" stroke-width="1.15" fill="none" stroke-linecap="round"/>`,
      browUp:`<path d="M42.6 20.2 q2.5 -1.6 5 -.6 M52.4 19.6 q2.5 -1 5 .6" stroke="${br}" stroke-width="1.15" fill="none" stroke-linecap="round"/>`,
      browA: `<path d="M42.6 21 l5 1.3 M57.4 21 l-5 1.3" stroke="${br}" stroke-width="1.25" stroke-linecap="round"/>`,
      browT: `<path d="M42.6 21.8 q2.5 -.6 5 0 M52.4 20 q2.5 -1.4 5 .4" stroke="${br}" stroke-width="1.15" fill="none" stroke-linecap="round"/>`,
      eyeN:  `<g class="mp-pupils"><ellipse cx="45.2" cy="24.6" rx="1.35" ry=".95" fill="${ey}"/><ellipse cx="54.8" cy="24.6" rx="1.35" ry=".95" fill="${ey}"/></g>`,
      eyeW:  `<ellipse cx="45.2" cy="24.4" rx="1.9" ry="1.5" fill="#f2efe8"/><ellipse cx="54.8" cy="24.4" rx="1.9" ry="1.5" fill="#f2efe8"/><g class="mp-pupils"><circle cx="45.2" cy="24.5" r=".9" fill="${ey}"/><circle cx="54.8" cy="24.5" r=".9" fill="${ey}"/></g>`,
      eyeC:  `<path d="M43.8 24.8 q1.4 .8 2.8 0 M53.4 24.8 q1.4 .8 2.8 0" stroke="${ey}" stroke-width=".9" fill="none" stroke-linecap="round"/>`,
      eyeH:  `<path d="M43.8 25 q1.4 -1 2.8 0 M53.4 25 q1.4 -1 2.8 0" stroke="${ey}" stroke-width=".9" fill="none" stroke-linecap="round"/>`,
      eyeF:  `<g class="mp-pupils"><path d="M43.9 24.6 h2.7 M53.4 24.6 h2.7" stroke="${ey}" stroke-width="1.2" stroke-linecap="round"/></g>`,
      mN: `<path d="M47.6 32.4 q2.4 .9 4.8 0" stroke="${mo}" stroke-width=".95" fill="none" stroke-linecap="round"/>`,
      mS: `<path d="M46.8 31.8 q3.2 2.4 6.4 0" stroke="${mo}" stroke-width="1" fill="none" stroke-linecap="round"/>`,
      mO: `<ellipse cx="50" cy="32.6" rx="1.4" ry="1.8" fill="#4a2a22"/>`,
      mF: `<path d="M47.8 32.6 h4.4" stroke="${mo}" stroke-width="1" stroke-linecap="round"/>`,
      mT: `<path d="M47.8 32.8 q2.4 -.8 4.6 .5" stroke="${mo}" stroke-width=".95" fill="none" stroke-linecap="round"/>`,
      mY: `<ellipse cx="50" cy="33" rx="1.9" ry="2.4" fill="#4a2a22"/>`
    };
    const set = {
      neutral: ["browN","eyeN","mN"], shock: ["browUp","eyeW","mO"], happy: ["browUp","eyeH","mS"],
      think: ["browT","eyeN","mT"], angry: ["browA","eyeF","mF"], sleep: ["browN","eyeC","mF"],
      yawn: ["browUp","eyeC","mY"], focus: ["browA","eyeF","mN"]
    }[expr] || ["browN","eyeN","mN"];
    return set.map(k => L[k]).join("");
  }

  function logo(id) {
    if (C.logo) return `<clipPath id="lg${id}"><circle cx="50" cy="66" r="6.2"/></clipPath><image href="${esc(C.logo)}" x="43.8" y="59.8" width="12.4" height="12.4" clip-path="url(#lg${id})" preserveAspectRatio="xMidYMid slice"/>`;
    return `<circle cx="50" cy="66" r="6.3" fill="none" stroke="${C.logoColor}" stroke-width=".9"/>
      <text x="50" y="68.1" text-anchor="middle" font-family="IBM Plex Sans Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="5.4" letter-spacing=".2" fill="#e9eaec">${esc(C.initials)}</text>`;
  }

  function svg(expr) {
    const id = "mp" + (++uid);
    return `<svg class="mp-svg" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs>
        <linearGradient id="${id}h" x1="0" x2="1"><stop offset="0" stop-color="${C.hoodLight}"/><stop offset=".55" stop-color="${C.hood}"/><stop offset="1" stop-color="${C.hoodDark}"/></linearGradient>
        <linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="${C.hoodLight}"/><stop offset="1" stop-color="${C.hoodDark}"/></linearGradient>
        <linearGradient id="${id}j" x1="0" x2="1"><stop offset="0" stop-color="${C.jeansLight}"/><stop offset="1" stop-color="${C.jeansDark}"/></linearGradient>
        <linearGradient id="${id}k" x1="0" x2="1"><stop offset="0" stop-color="${C.skinLight}"/><stop offset=".6" stop-color="${C.skin}"/><stop offset="1" stop-color="${C.skinDark}"/></linearGradient>
        <linearGradient id="${id}r" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stop-color="${C.hairLight}"/><stop offset=".5" stop-color="${C.hair}"/><stop offset="1" stop-color="${C.hairDark}"/></linearGradient>
        <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient>
        <radialGradient id="${id}p" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#bfe2ff" stop-opacity=".55"/><stop offset="1" stop-color="#bfe2ff" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse class="mp-shadow" cx="50" cy="194" rx="23" ry="3.6" fill="#000" opacity=".5"/>
      <g class="mp-body">
        <g class="mp-legL"><path d="M37.5 106 h12 l-1.2 76 h-9.4z" fill="url(#${id}j)"/><path d="M45 110 l-.6 70" stroke="#0e131c" stroke-width=".7" opacity=".6"/>
          <path d="M36 180 h12.6 q3.4 .4 4.4 5 v3.4 h-18.4 q-.8 -6 1.4 -8.4z" fill="${C.shoe}"/><rect x="34.4" y="187.6" width="18.8" height="2.6" rx="1" fill="${C.sole}"/></g>
        <g class="mp-legR"><path d="M50.5 106 h12 l-1.2 76 h-9.4z" fill="url(#${id}j)"/><path d="M58.6 110 l-.4 70" stroke="#0e131c" stroke-width=".7" opacity=".6"/>
          <path d="M51 180 h12.6 q2.2 2.4 1.4 8.4 v0 h-18.4 v-3.4 q1 -4.6 4.4 -5z" fill="${C.shoe}"/><rect x="46.8" y="187.6" width="18.8" height="2.6" rx="1" fill="${C.sole}"/></g>
        <g class="mp-armL">
          <path d="M33.5 47 q-7.5 2 -8.6 11.5 l-2.2 39 q4.6 3 9.6 .8 l3.2 -37z" fill="url(#${id}s)"/>
          <rect x="22.4" y="95" width="10" height="4.6" rx="1.6" fill="${C.hoodDark}"/>
          <ellipse cx="27.4" cy="103.4" rx="4" ry="5" fill="url(#${id}k)"/>
          <g class="mp-pad"><rect x="13" y="92" width="14" height="19" rx="1" fill="#e4dfd2"/><rect x="13" y="92" width="14" height="3" fill="#7d1220"/><path d="M15.5 98.5 h9 M15.5 102 h9 M15.5 105.5 h6" stroke="#6b7480" stroke-width=".8"/></g>
        </g>
        <path d="M33 46 q17 -7.5 34 0 q5.2 2.2 6.2 10.4 l2 48.6 q-.8 5 -6.2 6 h-38 q-5.4 -1 -6.2 -6 l2 -48.6 q1 -8.2 6.2 -10.4z" fill="url(#${id}h)"/>
        <path d="M67.6 47.4 q5 2.4 5.6 10 l2 48" stroke="${C.rim}" stroke-width="1.1" fill="none" opacity=".5"/>
        <path d="M37.5 85 h25 l2.6 15 h-30.2z" fill="none" stroke="${C.hoodDark}" stroke-width="1.4"/>
        <path d="M26.5 103.5 h47 v6.5 q0 3 -3 3 h-41 q-3 0 -3 -3z" fill="${C.hoodDark}"/>
        <path d="M37.6 44.6 q12.4 10.6 24.8 0 q-2 -6.4 -5.4 -7.4 q-7 5.4 -14 0 q-3.4 1 -5.4 7.4z" fill="${C.hoodDark}"/>
        <path d="M45.6 49.5 l-1.2 15.5 M54.4 49.5 l1.2 15.5" stroke="#b8bec4" stroke-width=".85" stroke-linecap="round"/>
        <rect x="43.6" y="64.6" width="1.6" height="3" rx=".6" fill="#8a9097"/><rect x="54.8" y="64.6" width="1.6" height="3" rx=".6" fill="#8a9097"/>
        ${logo(id)}
        <g class="mp-head">
          <path d="M45.4 34 h9.2 v12 h-9.2z" fill="${C.skinDark}"/>
          <ellipse cx="38.6" cy="26.4" rx="2.1" ry="3.3" fill="${C.skin}"/><ellipse cx="61.4" cy="26.4" rx="2.1" ry="3.3" fill="${C.skinDark}"/>
          <path d="M38.6 22 q0 -12.6 11.4 -12.6 q11.4 0 11.4 12.6 q0 9 -4 13.4 q-3 3.6 -7.4 3.6 q-4.4 0 -7.4 -3.6 q-4 -4.4 -4 -13.4z" fill="url(#${id}k)"/>
          <path d="M61.2 21 q0 9.6 -4.2 14 q-3 3.4 -7 3.6 q5.2 -2.4 7.4 -8 q2 -5 1.8 -9.6z" fill="${C.skinDark}" opacity=".45"/>
          <path d="M61 18 q.8 6 -.6 11" stroke="${C.rim}" stroke-width=".8" fill="none" opacity=".55"/>
          <path d="M50 25.4 l-1.3 4.6 q.8 .9 2.3 .5" stroke="${C.skinDark}" stroke-width=".75" fill="none" stroke-linecap="round"/>
          <g class="mp-face">${face(expr || "neutral")}</g>
          <path d="M38.2 23.5 q-1.6 -14.4 11.8 -15.2 q13.6 -.4 12.2 15 q-1.2 -4.8 -3.4 -6.8 q-3.2 2.6 -9.6 2.2 q-5.6 -.4 -8.4 1.8 q-1.8 1.4 -2.6 3z" fill="url(#${id}r)"/>
          <path d="M41.2 12.4 q7 -6.8 17.6 -2.4 q-7.4 -.6 -11 3.4 q-3.2 -1.6 -6.6 -1z" fill="${C.hairLight}"/>
          <path d="M44 13.6 q5 -3 11 -1.4 M47 11.4 q4 -1.4 8 -.2" stroke="#9a6a42" stroke-width=".6" fill="none" opacity=".7"/>
        </g>
        <g class="mp-armR">
          <path d="M66.5 47 q7.5 2 8.6 11.5 l2.2 39 q-4.6 3 -9.6 .8 l-3.2 -37z" fill="url(#${id}s)"/>
          <path d="M71 50 q4.4 3 4.6 9 l2 38" stroke="${C.rim}" stroke-width=".9" fill="none" opacity=".5"/>
          <rect x="67.6" y="95" width="10" height="4.6" rx="1.6" fill="${C.hoodDark}"/>
          <ellipse cx="72.6" cy="103.4" rx="4" ry="5" fill="url(#${id}k)"/>
          <g class="mp-thumb"><rect x="70.2" y="93.6" width="4.2" height="8.4" rx="2.1" fill="${C.skin}"/></g>
          <g class="mp-pen"><path d="M72.6 104 l-6.4 -9" stroke="#1b1c1f" stroke-width="1.5" stroke-linecap="round"/></g>
          <g class="mp-lens"><path d="M72.6 105 l0 9" stroke="#1b1c1f" stroke-width="2.6" stroke-linecap="round"/><circle cx="72.6" cy="121" r="7.2" fill="#a9d4e0" fill-opacity=".22" stroke="#9aa3ab" stroke-width="1.8"/><path d="M69 118.6 a4.4 4.4 0 0 1 3.4 -2.6" stroke="#fff" stroke-width=".9" fill="none" opacity=".8"/></g>
          <g class="mp-torch"><path d="M68 166 L72.6 112 L77.2 166 Z" fill="none"/><path class="mp-beam" d="M70.6 112 L36 300 L109 300 L74.6 112 Z" fill="url(#${id}b)"/>
            <rect x="69.8" y="100" width="5.6" height="12" rx="1" fill="#1b1c1f"/><rect x="69.2" y="110.4" width="6.8" height="2.6" fill="#c9c9c2"/></g>
        </g>
        <g class="mp-props">
          <g class="mp-cup"><path d="M54.6 27.6 h9 l-1.3 11 h-6.4z" fill="#ece8de"/><rect x="55.1" y="31" width="8" height="3.4" fill="#3b2a20"/><rect x="54" y="26.2" width="10.2" height="2" rx=".8" fill="#1d1d1f"/>
            <path class="mp-steam" d="M57.5 24.5 q-1.6 -2.6 0 -5.2 M60.8 24.5 q-1.6 -2.6 0 -5.2" stroke="#d8dde2" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".7"/></g>
          <g class="mp-phone"><circle cx="58" cy="27" r="14" fill="url(#${id}p)"/><rect x="59.4" y="19.6" width="6.4" height="12.4" rx="1.4" fill="#0d0e10" stroke="#5c6670" stroke-width=".5"/></g>
        </g>
      </g>
    </svg>`;
  }

  /* Gags, die das Pult auslöst. lines = mögliche Sätze (seriös-trocken) */
  const GAGS = {
    lupe:          { label: "Lupe",               lines: ["Hm.", "Das sehe ich mir genauer an.", "Interessant."] },
    taschenlampe:  { label: "Taschenlampe",       lines: ["Irgendwo hier ist er.", "Licht ins Dunkel."] },
    kaffee:        { label: "Kaffee",             lines: ["Lange Nacht.", "Ermittlungen brauchen Koffein."] },
    notiz:         { label: "Notiz",              lines: ["Kommt in die Akte.", "Notiert."] },
    telefon:       { label: "Anruf",              lines: ["Nein. Ich klicke keinen Link.", "„Sicher bezahlen“? Sicher nicht.", "Paket? Ich habe nichts bestellt."] },
    eineSache:     { label: "Eine Sache noch",    lines: ["Ach … eine Sache noch."] },
    stolpern:      { label: "Stolpert",           lines: ["Nichts gesehen.", "Gehört zum Plan."] },
    winken:        { label: "Nicken",             lines: ["Abo nicht vergessen."] },
    nickerchen:    { label: "Nickerchen",         lines: [""] },
    kopfschuetteln:{ label: "Kopfschütteln",      lines: ["Nein. Nein. Nein.", "Das glaube ich nicht."] },
    spaehen:       { label: "Späht rein",         lines: [""] },
    kratzen:       { label: "Grübelt",            lines: ["Moment mal …", "Irgendwas stimmt hier nicht."] },
    highfive:      { label: "High five (2)",      lines: ["Saubere Arbeit."] },
    jubel:         { label: "Fall gelöst",        lines: ["Fall gelöst."] }
  };

  window.MiniPiet = { svg, face, GAGS, colors: C };
})();
