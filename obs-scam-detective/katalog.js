/* ==========================================================================
   katalog.js — Inhalte fürs Regiepult: roter Faden, Einblendungen, Ablauf.
   Alles hier darfst du frei umschreiben. Gewicht = wie stark ein Warnsignal
   in den Verdachtsgrad eingeht (1 = leicht, 3 = schwer).
   ========================================================================== */
window.PIET_KATALOG = {

  /* Ablauf des One-Take-Videos. Steht oben in der Statusleiste. */
  phases: [
    { id: "intro",   label: "Intro",       hint: "Vollbild-Cam. Wer ich bin, was heute passiert: eine Aufnahme, kein Schnitt." },
    { id: "auftrag", label: "Auftrag",     hint: "Welcher Artikel wird untersucht und warum gerade der?" },
    { id: "suche",   label: "Sichtung",    hint: "Suche eingeben, Treffer sichten, auffällige Angebote markieren." },
    { id: "pruefung",label: "Prüfung",     hint: "Eine Anzeige Punkt für Punkt nach dem roten Faden prüfen." },
    { id: "befund",  label: "Befund",      hint: "Bilanz: wie viele Fälle, wie viele mit Verdacht, die wichtigsten Regeln." },
    { id: "abschluss", label: "Abschluss", hint: "Vollbild-Cam. Abo, Kommentar: Welcher Artikel kommt als Nächstes?" }
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

  /* Einblendungs-Katalog. kind: alert (Warnhinweis, Mitte) · lower (Bauchbinde)
     · toast (Hinweis oben links) · poll (Zuschauerfrage mit Countdown)
     sound: hit · alarm · chime · whoosh · low · tick · reveal · type */
  inserts: [
    { group: "Zuschauer", kind: "lower", tone: "red",   eyebrow: "In eigener Sache", title: "Kanal abonnieren",      text: "Jeder Fall ist echt und ungeschnitten. Abonniere, um den nächsten nicht zu verpassen.", sound: "chime" },
    { group: "Zuschauer", kind: "lower", tone: "red",   eyebrow: "In eigener Sache", title: "Daumen hoch",           text: "Ein Like hilft, dass mehr Menschen diese Maschen kennen.",                         sound: "chime" },
    { group: "Zuschauer", kind: "lower", tone: "amber", eyebrow: "Ihre Hinweise",    title: "Welcher Artikel als Nächstes?", text: "Schreib es in die Kommentare. Ich prüfe die meistgenannten live.",          sound: "chime" },
    { group: "Zuschauer", kind: "poll",  tone: "amber", title: "Ihre Einschätzung?",  text: "Betrug oder echt? Schreib es in die Kommentare, bevor ich auflöse.",               sound: "tick", seconds: 10 },
    { group: "Zuschauer", kind: "toast", tone: "cyan",  title: "Selbst erlebt?",      text: "Deine Erfahrung mit Kleinanzeigen in die Kommentare. Sie hilft anderen.",          sound: "chime" },

    { group: "Warnung",   kind: "alert", tone: "red",   title: "Keine Links",         text: "Klicke nie auf Links, die dir ein Verkäufer schickt.",                     sound: "alarm" },
    { group: "Warnung",   kind: "alert", tone: "red",   title: "Vorkasse",            text: "Überweisung an Unbekannte: Kommt nichts an, ist das Geld meist weg.",      sound: "alarm" },
    { group: "Warnung",   kind: "alert", tone: "red",   title: "Plattformwechsel",    text: "Wer auf WhatsApp oder E-Mail wechseln will, holt dich aus dem Käuferschutz.", sound: "alarm" },
    { group: "Warnung",   kind: "alert", tone: "amber", title: "Zu günstig",          text: "Neuware weit unter Marktwert ist das häufigste Lockmittel.",               sound: "low" },
    { group: "Warnung",   kind: "alert", tone: "red",   title: "Daten & Codes",       text: "Ausweisfoto, Kartendaten, SMS-Codes: niemals herausgeben.",                sound: "alarm" },

    { group: "Tipp",      kind: "lower", tone: "cyan",  eyebrow: "Ermittlungstipp", title: "Bildrückwärtssuche",  text: "Taucht das Foto woanders auf, stammt es nicht vom Verkäufer.",     sound: "chime" },
    { group: "Tipp",      kind: "lower", tone: "cyan",  eyebrow: "Ermittlungstipp", title: "„Aktiv seit“ prüfen",  text: "Ein Konto, das erst Tage alt ist, ist das erste Warnsignal.",      sound: "chime" },
    { group: "Tipp",      kind: "lower", tone: "cyan",  eyebrow: "Ermittlungstipp", title: "Sicherster Weg",      text: "Abholen, ansehen, testen, bar bezahlen.",                          sound: "chime" },
    { group: "Tipp",      kind: "lower", tone: "cyan",  eyebrow: "Ermittlungstipp", title: "Bauchgefühl",         text: "Fühlt sich etwas falsch an, lass es. Es gibt immer eine nächste Anzeige.", sound: "chime" },

    { group: "Format",    kind: "toast", tone: "red",   title: "Eine Aufnahme · kein Schnitt", text: "Alles live durchgeklickt. Nichts vorbereitet.",                    sound: "whoosh" },
    { group: "Format",    kind: "toast", tone: "steel", title: "Datenschutz",         text: "Namen und Profilbilder sind geschwärzt.",                                   sound: "whoosh" },
    { group: "Format",    kind: "toast", tone: "steel", title: "Meine Einschätzung",  text: "Ich zeige Warnsignale. Ob Betrug vorliegt, klären Plattform und Polizei.",  sound: "whoosh" },
    { group: "Format",    kind: "toast", tone: "amber", title: "Nur Analyse",         text: "Ich kaufe nichts und schreibe niemanden an.",                               sound: "whoosh" }
  ],

  /* Sprüche, die ein Mini-Pete auf Knopfdruck sagt (gag = was er dabei tut) */
  pietLines: [
    { gag: "kratzen",   text: "Moment mal … dieser Preis?" },
    { gag: "lupe",      text: "Das Profil ist erst drei Tage alt." },
    { gag: "kopfschuetteln", text: "Finger weg von diesem Link." },
    { gag: "jubel",     text: "Das sieht sauber aus." },
    { gag: "eineSache", text: "Ach … eine Sache noch." },
    { gag: "notiz",     text: "Kommt in die Akte." }
  ],

  /* Stempel. verdict = zählt in die Bilanz */
  stamps: [
    { id: "scam",   label: "Betrugsverdacht", sub: "Befund",          tone: "red",   verdict: "scam" },
    { id: "sus",    label: "Fraglich",        sub: "Befund",          tone: "amber", verdict: "sus" },
    { id: "legit",  label: "Unauffällig",     sub: "Befund",          tone: "green", verdict: "legit" },
    { id: "check",  label: "Geprüft",         sub: "P. van Dijk",     tone: "steel", verdict: null },
    { id: "fake",   label: "Foto nicht echt", sub: "Indiz",           tone: "red",   verdict: null },
    { id: "phish",  label: "Phishing-Link",   sub: "Indiz",           tone: "red",   verdict: null }
  ]
};
