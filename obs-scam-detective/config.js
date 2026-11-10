/* ==========================================================================
   Pete van Dijk · Scam-Detektiv HUD — Einstellungen
   Diese Datei liegt neben overlay.html und regie.html. Beide lesen sie ein.
   Nach einer Änderung: in OBS die Browserquelle "Cache leeren & neu laden".
   ========================================================================== */
window.PIET_CONFIG = {
  /* OBS → Werkzeuge → WebSocket-Server-Einstellungen */
  obs: {
    host: "127.0.0.1",
    port: 4455,
    password: ""            // Passwort aus OBS hier eintragen (oder leer, wenn Auth aus)
  },

  /* Namen deiner OBS-Szenen. Leer lassen = Pult wechselt die Szene nicht. */
  scenes: {
    full:    "SCAM · Cam Vollbild",
    pip:     "SCAM · Screen + Cam",
    private: "SCAM · Screen + Cam"     // gleiche Szene, Milchglas kommt per Filter + Overlay
  },

  /* Milchglas: Filter auf deiner Bildschirmaufnahme, der im Privatmodus an geht */
  privacyFilter: {
    source: "Bildschirm links",
    filter: "Milchglas"
  },

  /* Position deiner Kamera im Modus "Screen + Cam" (OBS-Leinwand 1920×1080).
     Muss zu der Kamera-Position in OBS passen, damit der Rahmen sitzt. */
  camPip: { x: 1452, y: 776, w: 432, h: 243 },

  /* Aussehen der Mini-Petes. Logo: PNG/SVG mit transparentem Hintergrund
     in den Ordner minipiets/ legen und hier eintragen, z. B. "minipiets/logo.png".
     Ohne Logo steht ein Monogramm (initials) auf dem Hoodie. */
  miniPiet: {
    logo: "",
    initials: "PvD",
    logoColor: "#c8102e",
    hair: "#5a3820", hairLight: "#7a4e2d", hairDark: "#2e1c10"
  },

  /* Stimme & Look */
  host: { name: "Pete van Dijk", role: "Betrugsermittlung auf Kleinanzeigen · live" }
};
