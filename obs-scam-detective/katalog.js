/* ==========================================================================
   katalog.js — Inhalte fürs Regiepult: roter Faden, Einblendungen, Ablauf.
   Alles hier darfst du frei umschreiben. Gewicht = wie stark ein Warnsignal
   in den Scam-o-Meter eingeht (1 = leicht, 3 = schwer).
   ========================================================================== */
window.PIET_KATALOG = {

  /* Ablauf des One-Cut-Videos. Wird oben in der Statusleiste angezeigt. */
  phases: [
    { id: "intro",   label: "Intro",            hint: "Vollbild-Cam. Wer bin ich, was passiert heute, 1:1 ohne Schnitt." },
    { id: "mission", label: "Die Mission",      hint: "Welcher Artikel? Warum gerade der? Worauf achte ich gleich?" },
    { id: "suche",   label: "Live-Suche",       hint: "Suche eingeben, Filter zeigen, die ersten Treffer überfliegen." },
    { id: "check",   label: "Fall-Check",       hint: "Eine Anzeige nach rotem Faden durchgehen. Urteil sprechen." },
    { id: "fazit",   label: "Fazit",            hint: "Wie viele Fälle, wie viele faul? Die 3 wichtigsten Regeln." },
    { id: "outro",   label: "Outro",            hint: "Vollbild-Cam. Abo, Kommentar: Welchen Artikel als nächstes?" }
  ],

  /* Roter Faden für jede Anzeige. Status pro Punkt: offen → ok → Warnsignal */
  checks: [
    { id: "alter",     group: "Profil",   w: 3, label: "Accountalter",            q: "„Aktiv seit“ — erst seit Tagen oder Wochen dabei?",            flag: "Konto ganz frisch angelegt" },
    { id: "bewert",    group: "Profil",   w: 2, label: "Bewertungen",             q: "Zufriedenheit, Freundlichkeit, Zuverlässigkeit — gibt es überhaupt welche?", flag: "Keine oder auffällige Bewertungen" },
    { id: "profil",    group: "Profil",   w: 2, label: "Andere Anzeigen",         q: "Was verkauft das Profil noch? Querbeet teure Ware, immer gleiche Masche?", flag: "Viele teure Artikel quer durch alle Kategorien" },
    { id: "name",      group: "Profil",   w: 1, label: "Name & Typ",              q: "Privat oder gewerblich? Wirkt der Name echt?",                   flag: "Fantasiename oder unpassend" },
    { id: "preis",     group: "Anzeige",  w: 3, label: "Preis vs. Marktwert",     q: "Wie weit unter dem üblichen Preis? Zu gut, um wahr zu sein?",    flag: "Deutlich unter Marktwert" },
    { id: "fotos",     group: "Anzeige",  w: 2, label: "Fotos",                   q: "Eigene Fotos oder Herstellerbilder? Bildrückwärtssuche!",        flag: "Stock- oder geklaute Fotos" },
    { id: "text",      group: "Anzeige",  w: 2, label: "Beschreibung",            q: "Details, Mängel, Kaufdatum? Oder Copy-Paste und holprige Sprache?", flag: "Kopiert, vage oder maschinell übersetzt" },
    { id: "ort",       group: "Anzeige",  w: 1, label: "Standort",                q: "Passt der Ort? „Bin gerade im Ausland / auf Montage“?",         flag: "Ort passt nicht oder Ausrede" },
    { id: "versand",   group: "Anzeige",  w: 2, label: "Nur Versand",             q: "Abholung ausgeschlossen? Bei teuren Sachen besonders schräg.",   flag: "Abholung wird abgelehnt" },
    { id: "zahlung",   group: "Kontakt",  w: 3, label: "Zahlungsweg",             q: "Sofort Überweisung, PayPal „Freunde“, Gutscheinkarten?",         flag: "Vorkasse ohne Käuferschutz" },
    { id: "wechsel",   group: "Kontakt",  w: 3, label: "Raus aus der Plattform",  q: "Will er gleich auf WhatsApp oder E-Mail wechseln?",               flag: "Drängt auf WhatsApp / Mail" },
    { id: "link",      group: "Kontakt",  w: 3, label: "Fremde Links",            q: "Link zu „Sicher bezahlen“, Versandlabel oder Paketdienst geschickt?", flag: "Phishing-Link" },
    { id: "druck",     group: "Kontakt",  w: 2, label: "Zeitdruck",               q: "„Heute noch“, „viele Interessenten“, „sonst ist es weg“?",       flag: "Künstlicher Druck" },
    { id: "daten",     group: "Kontakt",  w: 3, label: "Daten & Codes",           q: "Fragt nach Ausweisfoto, Kartendaten oder SMS-Code?",            flag: "Will Ausweis, Karte oder Code" },
    { id: "bauch",     group: "Bauch",    w: 2, label: "Bauchgefühl",             q: "Würde ich hier mein eigenes Geld hinlegen?",                    flag: "Bauch sagt nein" }
  ],

  /* Einblendungs-Katalog. kind: alert (groß, Mitte) · lower (Bauchbinde unten links)
     · toast (kleiner Hinweis oben rechts) · poll (Zuschauerfrage mit Countdown) */
  inserts: [
    { group: "Zuschauer", kind: "lower", tone: "red",   title: "Abo da lassen",          text: "Jeder Fall hier ist echt. Abonnieren, damit du den nächsten nicht verpasst.", sound: "bling" },
    { group: "Zuschauer", kind: "lower", tone: "red",   title: "Daumen hoch",            text: "Ein Like zeigt YouTube, dass Betrugs-Aufklärung gebraucht wird.",              sound: "bling" },
    { group: "Zuschauer", kind: "lower", tone: "amber", title: "Dein Artikel?",          text: "Schreib in die Kommentare, welchen Artikel ich als nächstes prüfen soll.",    sound: "ding" },
    { group: "Zuschauer", kind: "poll",  tone: "amber", title: "Was meinst du?",         text: "Scam oder echt? Tipp jetzt in die Kommentare, bevor ich auflöse.",          sound: "tick", seconds: 10 },
    { group: "Zuschauer", kind: "toast", tone: "mint",  title: "Selbst erlebt?",         text: "Erzähl deine Kleinanzeigen-Geschichte in den Kommentaren.",                 sound: "ding" },

    { group: "Warnung",   kind: "alert", tone: "red",   title: "ACHTUNG",                text: "Niemals auf Links klicken, die dir der Verkäufer schickt.",                  sound: "alarm" },
    { group: "Warnung",   kind: "alert", tone: "red",   title: "VORKASSE",               text: "Überweisung an Fremde = Geld weg, wenn nichts kommt.",                       sound: "alarm" },
    { group: "Warnung",   kind: "alert", tone: "red",   title: "WHATSAPP?",              text: "Wer dich von der Plattform wegholen will, will dich ohne Schutz.",           sound: "alarm" },
    { group: "Warnung",   kind: "alert", tone: "amber", title: "ZU GÜNSTIG",             text: "Neuware zum halben Preis gibt es nicht geschenkt.",                          sound: "buzzer" },
    { group: "Warnung",   kind: "alert", tone: "red",   title: "KEINE CODES",            text: "Ausweisfoto, Kartendaten, SMS-Codes gibst du niemals raus.",                  sound: "alarm" },

    { group: "Tipp",      kind: "lower", tone: "mint",  title: "Detektiv-Tipp",          text: "Bild in die Rückwärtssuche: Taucht es woanders auf, ist es geklaut.",        sound: "ding" },
    { group: "Tipp",      kind: "lower", tone: "mint",  title: "Detektiv-Tipp",          text: "„Aktiv seit“ im Profil checken. Frische Konten sind das erste Warnsignal.",  sound: "ding" },
    { group: "Tipp",      kind: "lower", tone: "mint",  title: "Sicherste Variante",     text: "Abholen, anschauen, testen, bar bezahlen.",                                   sound: "ding" },
    { group: "Tipp",      kind: "lower", tone: "mint",  title: "Bauchgefühl",            text: "Wenn sich etwas falsch anfühlt: lass es. Es gibt immer eine nächste Anzeige.", sound: "ding" },

    { group: "Format",    kind: "toast", tone: "red",   title: "1:1 · ohne Schnitt",     text: "Alles live durchgeklickt. Nichts vorbereitet.",                              sound: "whoosh" },
    { group: "Format",    kind: "toast", tone: "steel", title: "Datenschutz",            text: "Namen und Profilbilder sind unkenntlich gemacht.",                           sound: "whoosh" },
    { group: "Format",    kind: "toast", tone: "steel", title: "Meine Einschätzung",     text: "Ich zeige Warnsignale. Ob es Betrug ist, entscheidet am Ende die Polizei.",  sound: "whoosh" },
    { group: "Format",    kind: "toast", tone: "amber", title: "Nur Analyse",            text: "Ich kaufe hier nichts und schreibe niemanden an.",                           sound: "whoosh" }
  ],

  /* Sprechblasen für Mini-Piet (Schnellauswahl) */
  pietLines: [
    { pose: "schock",   text: "Moment mal … DAS ist der Preis?!" },
    { pose: "denkt",    text: "Hmm. Das Profil ist erst drei Tage alt …" },
    { pose: "warnt",    text: "Finger weg von diesem Link!" },
    { pose: "daumen",   text: "Das sieht sauber aus. Gefällt mir." },
    { pose: "detektiv", text: "Lass uns genauer hinschauen …" },
    { pose: "lacht",    text: "Netter Versuch, Betrüger!" }
  ],

  /* Stempel. verdict = zählt in die Strichliste */
  stamps: [
    { id: "scam",   label: "SCAM",          sub: "Finger weg",          tone: "red",   verdict: "scam",  sound: "stamp" },
    { id: "sus",    label: "VERDÄCHTIG",    sub: "Mit Vorsicht",        tone: "amber", verdict: "sus",   sound: "stamp" },
    { id: "legit",  label: "SAUBER",        sub: "Wirkt ehrlich",       tone: "mint",  verdict: "legit", sound: "stamp" },
    { id: "check",  label: "GEPRÜFT",       sub: "Piet van Dijk",       tone: "steel", verdict: null,    sound: "stamp" },
    { id: "fake",   label: "FAKE-FOTO",     sub: "Bild geklaut",        tone: "red",   verdict: null,    sound: "stamp" },
    { id: "phish",  label: "PHISHING",      sub: "Link nicht klicken",  tone: "red",   verdict: null,    sound: "stamp" }
  ]
};
