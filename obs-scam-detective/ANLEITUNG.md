# Scam-Detektiv HUD · Pete van Dijk

Ein Regie-Overlay für OBS, mit dem du ein Kleinanzeigen-Video **in einer Aufnahme** drehst, ohne Schnitt.
Du klickst auf dem zweiten Monitor, und OBS zeigt Hinweisleiste, Ermittlungsakte, Verdachtsgrad, Stempel, Beweismarker, Warnhinweise und die Mini-Petes.

Der Look: Ermittlungsakte im Noir-Stil. Rot für Warnungen wie bei Aktenzeichen XY, Schreibmaschinen-Einblendungen mit Ort und Uhrzeit wie bei Akte X, nummerierte Beweismarker wie bei CSI, dazu Nebel am Boden, Filmkorn und auf Wunsch Regen.

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
| `config.js` | OBS-Passwort, Szenennamen, Kameraposition, Logo und Haarfarbe der Mini-Petes |
| `katalog.js` | Roter Faden, Einblendungen, Mini-Pete-Sätze, Stempel. Frei umschreibbar |
| `piet-link.js`, `minipiet.js` | Technik (Verbindung, die Mini-Pete-Figur) |
| `minipiets/` | Hier kommt dein Logo für den Hoodie rein |

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

**Szene „SCAM · Cam Vollbild“**
1. Videoaufnahmegerät (deine Kamera), auf ganze Leinwand ziehen
2. Browserquelle „SCAM HUD“ (siehe Schritt 3) **darüber**

**Szene „SCAM · Screen + Cam“**
1. Bildschirmaufnahme vom linken Monitor, Name: **`Bildschirm links`**
2. Browserquelle „SCAM HUD“: **Bestehende hinzufügen**, nicht neu anlegen. So bleibt der Zustand beim Szenenwechsel erhalten
3. Kamera **ganz oben**, unten rechts bei
   `X 1452 · Y 776 · Breite 432 · Höhe 243`
   (Rechtsklick → Transformieren → Transformation bearbeiten). Passt die Position nicht, ändere `camPip` in `config.js`, damit der rote Rahmen sitzt.

Reihenfolge von unten nach oben: **Bildschirm → HUD → Kamera.** Die Kamera liegt über dem HUD, damit dich das Milchglas nie verdeckt.

### 3. Browserquelle „SCAM HUD“
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
| `S` / `V` / `G` | Befund Betrugsverdacht / Fraglich / Unauffällig: Stempel + Bilanz |
| `A` `K` `R` `M` `Z` `L` `T` | Pfeil, Kreis, Rahmen, Marker, Schwärzung, Spotlight, Stempel. Kreise und Rahmen bekommen automatisch nummerierte Beweismarker |
| `⌫` / `Entf` | Letzte Zeichnung weg / alles wegwischen |
| `N` | Neuer Fall: Aktenzeichen +1, Checkliste und Zeichnungen leer, Schreibmaschinen-Einblendung |
| `I` | Akte einblenden: „FALL 04 · ARTIKEL / KLEINANZEIGEN, Datum, Uhrzeit“ |
| `→` / `←` | Nächste / vorige Phase in der Statusleiste |
| `P` | Ein Mini-Pete sagt einen der Sätze aus dem Katalog |
| `Esc` | Alle Einblendungen ausblenden |

Tasten wirken nur, wenn der Cursor nicht in einem Textfeld steht.
**Aufnahme starten** im Pult startet die Aufnahme in OBS. Der Timecode oben rechts im Video läuft mit.

---

## Drehbuch für das One-Cut-Video

Die Phasen stehen oben in der Statusleiste, damit Zuschauer immer wissen, wo ihr gerade seid.

1. **Intro** (`1`, Vollbild)
   „Leute, das hier ist eine Aufnahme, kein Schnitt. Ich zeig euch heute, worauf ich bei Anzeigen achte.“
   → Einblendung *Format · Eine Aufnahme · kein Schnitt*
2. **Auftrag** (`→`)
   Welcher Artikel, warum der (teuer, beliebt bei Betrügern). → Einblendung *Format · Datenschutz*
3. **Sichtung** (`2`, `→`)
   Suche eingeben, Preis sortieren, auffällig billige Treffer zeigen. Mit **Kreis** die verdächtigen Preise markieren.
4. **Prüfung** (`→`) – pro Anzeige:
   - `N` neuer Fall, Artikel + Preis + Marktwert ins Pult tippen, dann `I` für die Schreibmaschinen-Einblendung
   - **Schwärzung** (`Z`) über Namen und Profilbild ziehen
   - Roter Faden von oben nach unten: Name anklicken = Frage erscheint, dann ✓ oder !
   - Pfeile und Beweismarker auf Details. Die Mini-Petes reagieren von selbst auf Indizien und Stempel
   - Spannung: *Zuschauer · Ihre Einschätzung?* (Countdown) **bevor** du den Befund sprichst
   - Befund: `S`, `V` oder `G`
5. **Befund** (`→`)
   Bilanz vorlesen, die 3 wichtigsten Regeln als *Tipp*-Bauchbinden.
6. **Abschluss** (`1`, `→`)
   *Zuschauer · Welcher Artikel als Nächstes?* „Schreibt mir, was ich als Nächstes prüfen soll.“

**Privatmodus**: Wenn du privat etwas nachschauen musst, drück `3`. Der Bildschirm wird zu Milchglas, du redest weiter. Die Mini-Petes machen solange Pause (Kaffee, Nickerchen). Danach wieder `2`.

---

## Roter Faden: was du bei jeder Anzeige prüfst

Steht auch im Pult, mit Gewicht (●) für den Verdachtsgrad.

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

So rechnet der Verdachtsgrad: Jedes „!“ zählt sein Gewicht. 10 Punkte = 100 %.
Ab 25 % erhöht, ab 50 % hoch, ab 75 % sehr hoch. Das ist eine Zählhilfe fürs Video, keine Prüfung.

---

## Einblendungs-Katalog

Im Pult unter **Einblendungen**, nach Gruppen sortiert. Eine gute Mischung, die du über das Video verteilst:

| Wann | Was | Gruppe |
|---|---|---|
| Ganz am Anfang | Eine Aufnahme · kein Schnitt | Format |
| Vor dem ersten echten Fall | Datenschutz: Namen geschwärzt | Format |
| Nach dem ersten Indiz | Kanal abonnieren | Zuschauer |
| Vor jedem Befund | Ihre Einschätzung? (Countdown) | Zuschauer |
| Bei Vorkasse, WhatsApp, Links | Warnhinweis: Keine Links / Vorkasse / Plattformwechsel | Warnung |
| Wenn du etwas zeigst, das man nachmachen kann | Ermittlungstipp | Tipp |
| Ungefähr in der Mitte | Daumen hoch | Zuschauer |
| Bei jedem harten Befund | Meine Einschätzung | Format |
| Zum Schluss | Welcher Artikel als Nächstes? | Zuschauer |

Eigene Texte: unter *Eigene Einblendung* im Pult, oder dauerhaft in `katalog.js`.

---

## Mini-Petes

Kleine Ermittler im Noir-Stil, die unten im Nebel durchs Bild laufen: braune Haare, schwarzer Hoodie mit deinem Logo auf der Brust, dunkle Jeans.

**Von selbst** (Schalter „Gags automatisch“):
- Sie schlendern alle 10 bis 25 Sekunden ein Stück.
- Etwa alle 90 Sekunden (einstellbar, mit Zufall) macht einer einen Gag. Das sind in 10 Minuten etwa 6 bis 7 kleine Momente. Oben im Pult steht, wann der nächste kommt.
- Gags: Lupe, Taschenlampe mit Lichtkegel, Kaffee, Notizblock, Anruf („Nein. Ich klicke keinen Link.“), Columbos „Ach … eine Sache noch“, Stolpern, Nicken, Nickerchen, Kopfschütteln, Reinspähen vom Bildrand, Grübeln, High five (bei zwei oder mehr), Fall gelöst.

**Reaktionen** auf das, was du tust:
- Stempel *Betrugsverdacht* oder Warnhinweis: beide schrecken zurück („Wusste ich es doch.“)
- *Fraglich*: sie grübeln. *Unauffällig*: Daumen hoch.
- Ein Prüfpunkt mit „!“: einer zeigt auf den Bildschirm.
- Milchglas: Feierabend. Einer trinkt Kaffee, der andere schläft. Zurück auf `2`: sie schrecken hoch.

**Von Hand**: Jeder Gag hat einen Knopf im Pult. `P` oder die Satz-Knöpfe lassen einen Mini-Pete etwas sagen, eigener Text geht über das Eingabefeld.

**Dein Logo auf dem Hoodie**: Logo als PNG oder SVG mit durchsichtigem Hintergrund in den Ordner `minipiets/` legen und in `config.js` eintragen:

```js
miniPiet: {
  logo: "minipiets/logo.png",
  initials: "PvD",          // wird nur ohne Logo angezeigt
  hair: "#5a3820",          // Haarfarbe anpassen
  ...
},
```

Danach Pult neu laden und in OBS die Browserquelle aktualisieren.

---

## Atmosphäre

Im Pult unter *Ablauf & Leisten → Atmosphäre*:
- **Nebel** (Regler): zieht in zwei Ebenen langsam über den unteren Bildrand. Die Figuren stehen mit den Füßen im Nebel. 0 % schaltet ihn ab.
- **Filmkorn**: ganz feines, laufendes Korn über dem ganzen Bild.
- **Vignette**: dunkelt die Bildränder leicht ab.
- **Regen**: Regen über dem ganzen Bild. Wirkt stark, deshalb standardmäßig aus. Gut fürs Intro im Vollbild.

---

## Rechtlich sauber bleiben

Du zeigst echte Anzeigen von echten Menschen. Damit das Video nicht zum Problem wird:

- **Namen, Profilbilder, Telefonnummern, Kennzeichen, Gesichter** immer mit der **Schwärzung** (`Z`) abdecken, bevor du hinzoomst.
- Befunde als **Einschätzung** formulieren („für mich ein klarer Betrugsverdacht“). Die Stempel heißen deshalb *Betrugsverdacht*, nicht *Betrug*. Die Einblendung *Format · Meine Einschätzung* sagt das auch fürs Publikum.
- **Niemanden anschreiben, nichts kaufen, keine Links klicken.** Die Einblendung *Format · Nur Analyse* zeigt, dass du nur schaust.
- Wenn du Betrug siehst: Anzeige über **„Anzeige melden“** bei Kleinanzeigen melden. Das kannst du auch im Video zeigen.

---

## Testen ohne OBS

- `overlay.html?demo` im Browser öffnen: Overlay mit Beispieldaten (Layout Screen + Cam)
- `overlay.html?demo=full` oder `?demo=private`: die anderen Layouts, `&rain` dazu für Regen
- `regie.html` allein: die eingebaute Vorschau zeigt alles, auch ohne OBS. Ohne OBS-Verbindung läuft bei „Aufnahme starten“ nur die Uhr.

Die Schriften (IBM Plex, Courier Prime) kommen von Google Fonts. Ohne Internet nimmt das HUD Ersatzschriften (Arial Narrow, Consolas, Courier). Das sieht etwas anders aus, funktioniert aber.
