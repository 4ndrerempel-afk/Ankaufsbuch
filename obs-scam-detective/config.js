/* ==========================================================================
   Piet van Dijk · Scam-Detektiv HUD — Einstellungen
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
    full:    "PIET · Cam Vollbild",
    pip:     "PIET · Screen + Cam",
    private: "PIET · Screen + Cam"     // gleiche Szene, Milchglas kommt per Filter + Overlay
  },

  /* Milchglas: Filter auf deiner Bildschirmaufnahme, der im Privatmodus an geht */
  privacyFilter: {
    source: "Bildschirm links",
    filter: "Milchglas"
  },

  /* Position deiner Kamera im Modus "Screen + Cam" (OBS-Leinwand 1920×1080).
     Muss zu der Kamera-Position in OBS passen, damit der Rahmen sitzt. */
  camPip: { x: 1452, y: 776, w: 432, h: 243 },

  /* Eigene Mini-Piet-Bilder (PNG/GIF/WebP mit transparentem Hintergrund).
     Dateien in den Ordner minipiets/ legen und hier eintragen.
     Ohne Einträge nimmt das HUD den eingebauten gezeichneten Mini-Piet. */
  miniPiets: [
    // { name: "Schock",    src: "minipiets/schock.png" },
    // { name: "Daumen",    src: "minipiets/daumen.png" },
  ],

  /* Stimme & Look */
  host: { name: "Piet van Dijk", role: "Scam-Detektiv · Kleinanzeigen live geprüft" }
};
