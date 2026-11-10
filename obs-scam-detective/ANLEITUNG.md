# Scam-Detektiv HUD · Piet van Dijk

Ein Regie-Overlay für OBS, mit dem du ein Kleinanzeigen-Video **live in einem Durchgang** aufnimmst, ohne Schnitt.
Du klickst auf dem zweiten Monitor, und OBS zeigt Banner, Fallakte, Scam-o-Meter, Stempel, Pfeile, Mini-Piet und Alarme.

```
Monitor links  ── Kleinanzeigen im Browser ──►  OBS: Bildschirmaufnahme
Monitor rechts ── regie.html (das Pult)    ──►  OBS-WebSocket ──► overlay.html (Browserquelle)
Kamera                                       ──►  OBS: Videoaufnahmegerät
```

## Die Dateien

| Datei | Wofür |
|---|---|
| `overlay.html` | Browserquelle in OBS, 1920 × 1080, durchsichtig |
| `regie.html` | Dein Regiepult. Öffnest du im Chrome auf dem rechten Monitor |
| `config.js` | OBS-Passwort, Szenennamen, Kameraposition, eigene Mini-Piet-Bilder |
| `katalog.js` | Roter Faden, Einblendungen, Mini-Piet-Sprüche, Stempel. Frei umschreibbar |
| `piet-link.js`, `minipiet.js` | Technik (Verbindung, gezeichneter Mini-Piet) |
| `minipiets/` | Hier kommen deine eigenen Mini-Piet-Bilder rein |

Alle Dateien müssen **im selben Ordner** liegen.

---

## Einrichten (einmalig, ca. 15 Minuten)

### 1. OBS-WebSocket einschalten
OBS → **Werkzeuge → WebSocket-Server-Einstellungen**
- „WebSocket-Server aktivieren“ anhaken
- Port `4455` lassen
- „Authentifizierung aktivieren“ an, Passwort anzeigen und kopieren

Dann das Passwort in **`config.js`** bei `password: ""` eintragen.

### 2. Szenen anlegen
Die Namen müssen **genau** so heißen wie in `config.js` (oder du änderst sie dort):

**Szene „PIET · Cam Vollbild“**
1. Videoaufnahmegerät (deine Kamera), auf ganze Leinwand ziehen
2. Browserquelle „PIET HUD“ (siehe Schritt 3) **darüber**

**Szene „PIET · Screen + Cam“**
1. Bildschirmaufnahme vom linken Monitor, Name: **`Bildschirm links`**
2. Browserquelle „PIET HUD“: **Bestehende hinzufügen**, nicht neu anlegen. So bleibt der Zustand beim Szenenwechsel erhalten
3. Kamera **ganz oben**, unten rechts bei
   `X 1452 · Y 776 · Breite 432 · Höhe 243`
   (Rechtsklick → Transformieren → Transformation bearbeiten). Passt die Position nicht, ändere `camPip` in `config.js`, damit der rote Rahmen sitzt.

Reihenfolge von unten nach oben: **Bildschirm → HUD → Kamera.** Die Kamera liegt über dem HUD, damit dich das Milchglas nie verdeckt.

### 3. Browserquelle „PIET HUD“
- **Lokale Datei** anhaken → `overlay.html` auswählen
- Breite `1920`, Höhe `1080`
- „Audio über OBS steuern“ anhaken (dann hörst du die Sounds in der Aufnahme und kannst sie im Mixer regeln)
- „Quelle herunterfahren, wenn nicht sichtbar“ **aus**
- „Browser aktualisieren, wenn Szene aktiv wird“ **aus**

### 4. Milchglas-Filter (Bildschirm wird wirklich unscharf)
Das HUD legt im Privatmodus eine Glasfläche über den Bildschirm. Echte Unschärfe holst du dir mit Bordmitteln von OBS:

1. Rechtsklick auf **„Bildschirm links“** → **Transformieren → Transformation bearbeiten**
   → Begrenzungsrahmentyp **„Auf innere Grenzen skalieren“**, Größe `1920 × 1080`
2. Rechtsklick → **Filter** → **+** → **„Skalierung/Seitenverhältnis“**, Name **`Milchglas`**
   → Auflösung `96x54`, Skalierungsfilter **„Bilinear“**
3. Den Filter mit dem Auge-Symbol **ausschalten**. Das Pult schaltet ihn bei „Milchglas“ selbst an und wieder aus.

Ergebnis: Der Monitor wird auf 96 × 54 Pixel verkleinert und wieder hochgezogen. Das ergibt ein verschwommenes Milchglas, nichts mehr lesbar, du bleibst unten rechts zu sehen.

### 5. Pult öffnen
`regie.html` per Doppelklick in **Chrome oder Edge** öffnen und auf den rechten Monitor ziehen.
Oben müssen zwei grüne Punkte leuchten: **OBS verbunden** und **Overlay da**.

Bleibt „OBS getrennt“ rot: Läuft OBS? Ist der WebSocket an? Passwort in `config.js` **und** im Pult unter *OBS-Verbindung* gleich?
Bleibt „Overlay ?“ gelb: In OBS die Browserquelle → Eigenschaften → „Cache der aktuellen Seite aktualisieren“.

### 6. Zeichenvorlage einrichten
Im Pult **„Linken Monitor teilen“** klicken und den linken Bildschirm wählen. Jetzt siehst du im Monitor-Feld deine Kleinanzeigen-Seite mit dem HUD darüber und kannst direkt auf der Anzeige zeichnen. Das geteilte Bild bleibt im Pult, es geht nicht an OBS.

---

## Das Pult in 30 Sekunden

| Taste | Wirkung |
|---|---|
| `1` | Cam Vollbild (Intro/Outro, mit großem Namens-Titel) |
| `2` | Screen + Cam (Fallakte, Zeichnungen, Stempel) |
| `3` | Milchglas: Privatmodus, du bleibst sichtbar |
| `0` | Clean: alle Grafiken weg (nur Kamera-Rahmen bleibt) |
| `S` / `V` / `G` | Urteil SCAM / VERDÄCHTIG / SAUBER: Stempel + Strichliste |
| `A` `K` `R` `M` `Z` `L` `T` | Pfeil, Kreis, Rahmen, Marker, Zensur-Balken, Spotlight, Stempel |
| `⌫` / `Entf` | Letzte Zeichnung weg / alles wegwischen |
| `N` | Neuer Fall: Nummer +1, Checkliste und Zeichnungen leer |
| `→` / `←` | Nächste / vorige Phase in der Statusleiste |
| `P` | Mini-Piet zeigen / wegschicken |
| `Esc` | Alle Einblendungen ausblenden |

Tasten wirken nur, wenn der Cursor nicht in einem Textfeld steht.
**Aufnahme starten** im Pult startet die Aufnahme in OBS. Die Uhr oben rechts im Video läuft mit.

---

## Drehbuch für das One-Cut-Video

Die Phasen stehen oben in der Statusleiste, damit Zuschauer immer wissen, wo ihr gerade seid.

1. **Intro** (`1`, Vollbild)
   „Leute, das hier ist live, 1:1, ohne Schnitt. Ich zeig euch heute, worauf ich bei Anzeigen achte.“
   → Einblendung *Format · 1:1 ohne Schnitt*
2. **Die Mission** (`→`)
   Welcher Artikel, warum der (teuer, beliebt bei Betrügern). → Einblendung *Format · Datenschutz*
3. **Live-Suche** (`2`, `→`)
   Suche eingeben, Preis sortieren, auffällig billige Treffer zeigen. Mit **Kreis** die verdächtigen Preise markieren.
4. **Fall-Check** (`→`) – pro Anzeige:
   - `N` neuer Fall, Artikel + Preis + Marktwert ins Pult tippen
   - **Zensur-Balken** über Namen und Profilbild ziehen
   - Roter Faden von oben nach unten: Name anklicken = Frage erscheint, dann ✓ oder !
   - Zwischendurch Mini-Piet reagieren lassen, Pfeile auf Details
   - Spannung: *Zuschauer · Was meinst du?* (Countdown) **bevor** du das Urteil sprichst
   - Urteil: `S`, `V` oder `G`
5. **Fazit** (`→`)
   Strichliste vorlesen, die 3 wichtigsten Regeln als *Tipp*-Bauchbinden.
6. **Outro** (`1`, `→`)
   *Zuschauer · Dein Artikel?* „Schreibt mir, was ich als nächstes prüfen soll.“

**Privatmodus**: Wenn du privat etwas nachschauen musst, drück `3`. Der Bildschirm wird zu Milchglas, du redest weiter. Danach wieder `2`.

---

## Roter Faden: was du bei jeder Anzeige prüfst

Steht auch im Pult, mit Gewicht (●) fürs Scam-o-Meter.

**Profil**
- **Accountalter** ●●● – „Aktiv seit“: frisch angelegt?
- **Bewertungen** ●● – gibt es überhaupt welche?
- **Andere Anzeigen** ●● – querbeet teure Ware, gleiche Masche?
- **Name & Typ** ● – privat/gewerblich, wirkt der Name echt?

**Anzeige**
- **Preis vs. Marktwert** ●●● – zu gut, um wahr zu sein?
- **Fotos** ●● – eigene Fotos oder Herstellerbilder? Bildrückwärtssuche
- **Beschreibung** ●● – Details und Mängel oder Copy-Paste?
- **Standort** ● – passt der Ort, „bin im Ausland“?
- **Nur Versand** ●● – Abholung abgelehnt?

**Kontakt & Zahlung**
- **Zahlungsweg** ●●● – Vorkasse, PayPal „Freunde“?
- **Raus aus der Plattform** ●●● – WhatsApp, E-Mail?
- **Fremde Links** ●●● – „Sicher bezahlen“-Link, Versandlabel-Link = Phishing
- **Zeitdruck** ●● – „heute noch“, „viele Interessenten“
- **Daten & Codes** ●●● – Ausweisfoto, Kartendaten, SMS-Code

**Bauchgefühl** ●● – würde ich hier mein eigenes Geld hinlegen?

So rechnet das Scam-o-Meter: Jedes „!“ zählt sein Gewicht. 10 Punkte = 100 %.
Ab 25 % Vorsicht, ab 50 % verdächtig, ab 75 % Alarmstufe Rot. Das ist eine Zählhilfe fürs Video, keine Prüfung.

---

## Einblendungs-Katalog

Im Pult unter **Einblendungen**, nach Gruppen sortiert. Eine gute Mischung, die du über das Video verteilst:

| Wann | Was | Gruppe |
|---|---|---|
| Ganz am Anfang | 1:1 · ohne Schnitt | Format |
| Vor dem ersten echten Fall | Datenschutz: Namen unkenntlich | Format |
| Nach dem ersten Warnsignal | Abo da lassen | Zuschauer |
| Vor jedem Urteil | Was meinst du? (Countdown) | Zuschauer |
| Bei Vorkasse, WhatsApp, Links | ACHTUNG / VORKASSE / WHATSAPP? | Warnung |
| Wenn du etwas zeigst, das man nachmachen kann | Detektiv-Tipp | Tipp |
| Ungefähr in der Mitte | Daumen hoch | Zuschauer |
| Bei jedem harten Urteil | Meine Einschätzung | Format |
| Zum Schluss | Dein Artikel? | Zuschauer |

Eigene Texte: unter *Eigene Einblendung* im Pult, oder dauerhaft in `katalog.js`.

---

## Mini-Piets

Ohne eigene Bilder zeigt das HUD einen gezeichneten Mini-Piet in sechs Posen (Detektiv, grübelt, Schock, warnt, Daumen, lacht).
Deine eigenen Mini-Piets als PNG, GIF oder WebP mit durchsichtigem Hintergrund in den Ordner `minipiets/` legen und in `config.js` eintragen:

```js
miniPiets: [
  { name: "Schock",  src: "minipiets/schock.png" },
  { name: "Daumen",  src: "minipiets/daumen.png" },
],
```

Danach Pult neu laden und in OBS die Browserquelle aktualisieren. Sie erscheinen hinter den sechs gezeichneten Posen.

---

## Rechtlich sauber bleiben

Du zeigst echte Anzeigen von echten Menschen. Damit das Video nicht zum Problem wird:

- **Namen, Profilbilder, Telefonnummern, Kennzeichen, Gesichter** immer mit dem **Zensur-Balken** (`Z`) abdecken, bevor du hinzoomst.
- Stempel und Urteile als **Einschätzung** formulieren („für mich ein klarer Scam-Verdacht“). Die Einblendung *Format · Meine Einschätzung* sagt das auch fürs Publikum.
- **Niemanden anschreiben, nichts kaufen, keine Links klicken.** Die Einblendung *Format · Nur Analyse* zeigt, dass du nur schaust.
- Wenn du Betrug siehst: Anzeige über **„Anzeige melden“** bei Kleinanzeigen melden. Das kannst du auch im Video zeigen.

---

## Testen ohne OBS

- `overlay.html?demo` im Browser öffnen: Overlay mit Beispieldaten (Layout Screen + Cam)
- `overlay.html?demo=full` oder `?demo=private`: die anderen Layouts
- `regie.html` allein: die eingebaute Vorschau zeigt alles, auch ohne OBS. Ohne OBS-Verbindung läuft bei „Aufnahme starten“ nur die Uhr.

Die Schriften kommen von Google Fonts. Ohne Internet nimmt das HUD Ersatzschriften (Impact, Consolas). Das sieht etwas anders aus, funktioniert aber.
