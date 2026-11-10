/* ==========================================================================
   minipiet.js — der eingebaute, gezeichnete Mini-Piet (SVG, 6 Posen)
   Eigene Bilder trägst du in config.js unter miniPiets ein.
   ========================================================================== */
(function () {
  "use strict";
  const C = { ink: "#141a26", hat: "#232a38", band: "#ff2b3a", coat: "#c79a5b", coatDark: "#9c7440",
              skin: "#f3c9a1", skinDark: "#d9a57c", lens: "#bfe9ff", white: "#ffffff", mint: "#22e39b", amber: "#ffc21a" };

  const POSES = {
    detektiv: { label: "Detektiv",  eyes: "normal", brows: "flat",  mouth: "smirk", arm: "lens" },
    denkt:    { label: "Grübelt",   eyes: "side",   brows: "raise", mouth: "hmm",   arm: "chin" },
    schock:   { label: "Schock",    eyes: "wide",   brows: "high",  mouth: "o",     arm: "cheeks" },
    warnt:    { label: "Warnt",     eyes: "narrow", brows: "angry", mouth: "flat",  arm: "finger" },
    daumen:   { label: "Daumen",    eyes: "happy",  brows: "flat",  mouth: "grin",  arm: "thumb" },
    lacht:    { label: "Lacht",     eyes: "closed", brows: "raise", mouth: "laugh", arm: "lens" }
  };

  function eyes(t) {
    const L = 82, R = 118, Y = 100;
    switch (t) {
      case "wide":   return `<circle cx="${L}" cy="${Y}" r="7" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/><circle cx="${R}" cy="${Y}" r="7" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/><circle cx="${L}" cy="${Y}" r="2.6" fill="${C.ink}"/><circle cx="${R}" cy="${Y}" r="2.6" fill="${C.ink}"/>`;
      case "side":   return `<circle cx="${L+3}" cy="${Y-1}" r="4" fill="${C.ink}"/><circle cx="${R+3}" cy="${Y-1}" r="4" fill="${C.ink}"/>`;
      case "narrow": return `<path d="M${L-7} ${Y} h14" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/><path d="M${R-7} ${Y} h14" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`;
      case "happy":  return `<path d="M${L-6} ${Y+2} q6 -8 12 0" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/><path d="M${R-6} ${Y+2} q6 -8 12 0" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>`;
      case "closed": return `<path d="M${L-6} ${Y-2} q6 7 12 0" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/><path d="M${R-6} ${Y-2} q6 7 12 0" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>`;
      default:       return `<circle cx="${L}" cy="${Y}" r="4.2" fill="${C.ink}"/><circle cx="${R}" cy="${Y}" r="4.2" fill="${C.ink}"/><circle cx="${L+1.5}" cy="${Y-1.5}" r="1.3" fill="${C.white}"/><circle cx="${R+1.5}" cy="${Y-1.5}" r="1.3" fill="${C.white}"/>`;
    }
  }
  function brows(t) {
    const s = `stroke="${C.ink}" stroke-width="4" stroke-linecap="round" fill="none"`;
    switch (t) {
      case "raise": return `<path d="M72 86 q10 -6 18 -2" ${s}/><path d="M110 82 q10 -8 18 0" ${s}/>`;
      case "high":  return `<path d="M72 80 q10 -8 18 -2" ${s}/><path d="M110 78 q10 -6 18 2" ${s}/>`;
      case "angry": return `<path d="M72 84 l18 6" ${s}/><path d="M128 84 l-18 6" ${s}/>`;
      default:      return `<path d="M73 88 h16" ${s}/><path d="M111 88 h16" ${s}/>`;
    }
  }
  function mouth(t) {
    const s = `stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round" fill="none"`;
    switch (t) {
      case "o":     return `<ellipse cx="100" cy="128" rx="7" ry="9" fill="${C.ink}"/><ellipse cx="100" cy="131" rx="4" ry="4" fill="#ff6b6b"/>`;
      case "hmm":   return `<path d="M92 128 q8 -3 16 1" ${s}/>`;
      case "flat":  return `<path d="M90 128 h20" ${s}/>`;
      case "grin":  return `<path d="M86 122 q14 16 28 0 z" fill="${C.ink}"/><path d="M90 123 h20" stroke="${C.white}" stroke-width="3"/>`;
      case "laugh": return `<path d="M84 120 q16 22 32 0 z" fill="${C.ink}"/><path d="M92 130 q8 6 16 0" fill="#ff6b6b"/>`;
      default:      return `<path d="M90 126 q10 6 20 -2" ${s}/>`;
    }
  }
  function lens(x, y, r) {
    return `<g><path d="M${x + r*0.7} ${y + r*0.7} l${r*0.9} ${r*0.9}" stroke="${C.hat}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${C.lens}" fill-opacity=".55" stroke="${C.amber}" stroke-width="6"/>
      <path d="M${x - r*0.5} ${y - r*0.2} a${r*0.55} ${r*0.55} 0 0 1 ${r*0.45} -${r*0.35}" stroke="${C.white}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
  }
  function hand(x, y) { return `<circle cx="${x}" cy="${y}" r="11" fill="${C.skin}" stroke="${C.ink}" stroke-width="2.5"/>`; }
  function arm(t) {
    const sleeve = (d) => `<path d="${d}" stroke="${C.coat}" stroke-width="20" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${C.ink}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".25"/>`;
    switch (t) {
      case "chin":   return sleeve("M140 190 q22 -20 -22 -50") + hand(114, 140);
      case "cheeks": return sleeve("M58 190 q-22 -26 2 -66") + hand(60, 120) + sleeve("M142 190 q22 -26 -2 -66") + hand(140, 120);
      case "finger": return sleeve("M146 190 q30 -30 16 -76") + `<rect x="152" y="70" width="10" height="34" rx="5" fill="${C.skin}" stroke="${C.ink}" stroke-width="2.5"/>` + hand(160, 112);
      case "thumb":  return sleeve("M146 192 q34 -20 22 -60") + `<rect x="160" y="96" width="11" height="28" rx="5.5" fill="${C.skin}" stroke="${C.ink}" stroke-width="2.5"/>` + `<rect x="152" y="118" width="30" height="24" rx="8" fill="${C.skin}" stroke="${C.ink}" stroke-width="2.5"/>`;
      default:       return sleeve("M146 192 q30 -14 26 -48") + hand(170, 142) + lens(168, 116, 22);
    }
  }

  function svg(pose) {
    const p = POSES[pose] || POSES.detektiv;
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mini-Piet ${p.label}">
      <ellipse cx="100" cy="234" rx="64" ry="6" fill="#000" opacity=".25"/>
      <path d="M44 236 q4 -66 56 -72 q52 6 56 72 z" fill="${C.coat}" stroke="${C.ink}" stroke-width="3"/>
      <path d="M100 166 l-26 22 l10 48 M100 166 l26 22 l-10 48" fill="none" stroke="${C.coatDark}" stroke-width="4"/>
      <path d="M86 166 l14 22 l14 -22 z" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/>
      <path d="M96 184 l4 30 l4 -30 z" fill="${C.band}"/>
      <circle cx="100" cy="206" r="2.6" fill="${C.ink}"/><circle cx="100" cy="222" r="2.6" fill="${C.ink}"/>
      <ellipse cx="54" cy="104" rx="8" ry="11" fill="${C.skinDark}" stroke="${C.ink}" stroke-width="2.5"/>
      <ellipse cx="146" cy="104" rx="8" ry="11" fill="${C.skinDark}" stroke="${C.ink}" stroke-width="2.5"/>
      <ellipse cx="100" cy="106" rx="47" ry="50" fill="${C.skin}" stroke="${C.ink}" stroke-width="3"/>
      <ellipse cx="74" cy="118" rx="8" ry="5" fill="#ff8f8f" opacity=".45"/><ellipse cx="126" cy="118" rx="8" ry="5" fill="#ff8f8f" opacity=".45"/>
      ${brows(p.brows)}
      <circle cx="82" cy="100" r="14" fill="${C.white}" fill-opacity=".35" stroke="${C.ink}" stroke-width="3"/>
      <circle cx="118" cy="100" r="14" fill="${C.white}" fill-opacity=".35" stroke="${C.ink}" stroke-width="3"/>
      <path d="M96 100 h8" stroke="${C.ink}" stroke-width="3"/>
      ${eyes(p.eyes)}
      <path d="M100 104 q-4 10 2 12" fill="none" stroke="${C.skinDark}" stroke-width="3" stroke-linecap="round"/>
      ${mouth(p.mouth)}
      <ellipse cx="100" cy="66" rx="70" ry="13" fill="${C.hat}" stroke="${C.ink}" stroke-width="3"/>
      <path d="M58 64 q-2 -40 42 -44 q44 4 42 44 z" fill="${C.hat}" stroke="${C.ink}" stroke-width="3"/>
      <path d="M86 24 q14 10 28 0" fill="none" stroke="#3a4458" stroke-width="4"/>
      <path d="M59 54 q41 10 82 0 l1 10 q-42 10 -84 0 z" fill="${C.band}"/>
      ${arm(p.arm)}
    </svg>`;
  }

  window.MiniPiet = { svg, POSES };
})();
