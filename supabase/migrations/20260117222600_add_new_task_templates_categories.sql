/*
  # Neue Task-Templates hinzufügen

  ## Änderungen
  
  1. **Neue Kategorie "Planung"**
     - Namenswahl besprechen
     - Trauzeugen auswählen
  
  2. **Standesamt-Kategorie aktualisieren**
     - Alte Tasks entfernen
     - "Erforderliche Dokumente prüfen und beantragen" (mit detaillierter Beschreibung)
     - "Anmeldung zur Eheschließung beim Standesamt" (mit ausführlichen Hinweisen)
  
  3. **Neue Kategorie "Wichtige Themen"**
     - Ehevertrag und Güterstand besprechen
  
  4. **Neue Kategorie "Rechtliche Vorsorge"**
     - Vollmachten und Testament aktualisieren
  
  5. **Neue Kategorie "Kirchliche Trauung"**
     - Gespräch mit Pfarrer/Gemeinde vereinbaren
     - Traugespräche und Vorbereitung
     - Details für kirchliche Trauung finalisieren
  
  6. **Neue Kategorie "Nach der Trauung"**
     - Dokumente und Verträge aktualisieren
*/

-- Alte Standesamt-Tasks löschen
DELETE FROM task_templates WHERE category = 'Standesamt';

-- Neue Planung-Kategorie
INSERT INTO task_templates (category, task_name, description, priority, default_duration, timing_rules, weeks_before_wedding)
VALUES
  (
    'Planung',
    'Namenswahl besprechen',
    'Entscheiden, welche(n) Namen Sie nach der Hochzeit führen möchten: Behalten beide Partner ihren Namen? Nimmt ein Partner den Namen des anderen an? Wird ein Doppelname gewählt? Diese Entscheidung muss vor der Anmeldung beim Standesamt getroffen werden.',
    'high',
    14,
    '{"12_months": true, "18_months": true}'::jsonb,
    52
  ),
  (
    'Planung',
    'Trauzeugen auswählen',
    'Überlegen Sie, wen Sie als Trauzeugen haben möchten. Trauzeugen sind in Deutschland nicht mehr gesetzlich vorgeschrieben, aber viele Paare möchten trotzdem welche haben. Sie können die Namen später beim Standesamt angeben.',
    'high',
    7,
    '{"9_months": true, "12_months": true, "18_months": true}'::jsonb,
    39
  );

-- Neue Standesamt-Tasks
INSERT INTO task_templates (category, task_name, description, priority, default_duration, timing_rules, weeks_before_wedding)
VALUES
  (
    'Standesamt',
    'Erforderliche Dokumente prüfen und beantragen',
    'Folgende Dokumente werden für die Anmeldung zur Eheschließung benötigt:

1. **Gültiger Personalausweis oder Reisepass**
   - Überprüfen Sie die Gültigkeit beider Dokumente
   - Bei abgelaufenem Ausweis: rechtzeitig neu beantragen

2. **Beglaubigte Abschrift aus dem Geburtenregister (erweiterte Geburtsurkunde)**
   - Beim Standesamt Ihres Geburtsortes beantragen
   - Nicht älter als 6 Monate
   - Zeigt u.a. Ihre Eltern und evtl. frühere Ehen

3. **Erweiterte Meldebescheinigung (Aufenthaltsbescheinigung)**
   - Bei Ihrem aktuellen Einwohnermeldeamt erhältlich
   - Zeigt Ihren aktuellen Wohnsitz und Familienstand

4. **Bei Geschiedenen: Rechtskräftiges Scheidungsurteil mit Rechtskraftvermerk**
   - Original oder beglaubigte Kopie

5. **Bei Verwitweten: Sterbeurkunde des verstorbenen Ehepartners**

**Hinweis:** Erkundigen Sie sich bei Ihrem Standesamt, ob weitere Dokumente erforderlich sind (z.B. bei ausländischer Staatsangehörigkeit).',
    'high',
    21,
    '{"6_months": true, "9_months": true}'::jsonb,
    26
  ),
  (
    'Standesamt',
    'Anmeldung zur Eheschließung beim Standesamt',
    'Vereinbaren Sie einen Termin beim Standesamt zur Anmeldung Ihrer Eheschließung. Beide Partner müssen persönlich erscheinen.

**Wichtig:**
- Die Anmeldung muss ca. 6 Monate vor der geplanten Trauung erfolgen
- Bringen Sie alle erforderlichen Dokumente mit (siehe Task "Erforderliche Dokumente")
- Das Standesamt prüft Ihre Unterlagen und erstellt die Eheunterlagen
- Sie können bei diesem Termin auch die Trauzeugen benennen (falls gewünscht)

**Themen, die beim Standesamt geklärt werden:**
- Namenswahl nach der Eheschließung (Beibehaltung, Annahme oder Doppelname)
- Termine für die Trauung
- Kosten für die Trauung
- Ort der Trauung (Standesamt oder externe Location)

**Hinweis zu Ausweisdokumenten:** Wenn Sie planen, nach der Trauung einen neuen Personalausweis mit dem geänderten Namen zu beantragen und dieser am Tag der Hochzeit übergeben wird, achten Sie darauf bei der Buchung der Flitterwochen! Buchen Sie Flüge mit dem Namen, der im zum Reisezeitpunkt gültigen Ausweis steht.

**Zusätzliche Info:**
Manchmal können die Dokumente (erweiterte Geburtsurkunde, Meldebescheinigung) direkt beim Standesamt beantragt werden, manchmal müssen Sie diese separat beim Einwohnermeldeamt bzw. Geburtsstandesamt besorgen. Fragen Sie bei Ihrem Standesamt nach!',
    'high',
    14,
    '{"6_months": true, "9_months": true}'::jsonb,
    26
  );

-- Neue Kategorie: Wichtige Themen
INSERT INTO task_templates (category, task_name, description, priority, default_duration, timing_rules, weeks_before_wedding)
VALUES
  (
    'Wichtige Themen',
    'Ehevertrag und Güterstand besprechen',
    'Nehmen Sie sich Zeit, um über rechtliche und finanzielle Regelungen zu sprechen:

**Güterstand:**
- In Deutschland gilt automatisch die "Zugewinngemeinschaft" (jeder behält sein Vermögen, Zugewinn wird bei Scheidung geteilt)
- Alternative: Gütertrennung oder Gütergemeinschaft
- Ein Ehevertrag ist NICHT automatisch negativ - er kann beide Partner schützen

**Wann ist ein Ehevertrag sinnvoll?**
- Bei Selbstständigen oder Unternehmern
- Bei großen Vermögensunterschieden
- Bei Immobilienbesitz
- Bei unterschiedlichen finanziellen Verpflichtungen (z.B. Kredite)
- Wenn individuelle Regelungen gewünscht sind

**Hinweis:** Ein Ehevertrag muss notariell beurkundet werden. Bei Bedarf können Sie einen Termin mit einem Notar oder Fachanwalt für Familienrecht vereinbaren.

Diese Aufgabe dient zunächst als Reminder, sich über diese Themen zu informieren und zu entscheiden, ob Sie einen Ehevertrag möchten.',
    'medium',
    14,
    '{"9_months": true, "12_months": true}'::jsonb,
    39
  );

-- Neue Kategorie: Rechtliche Vorsorge
INSERT INTO task_templates (category, task_name, description, priority, default_duration, timing_rules, weeks_before_wedding)
VALUES
  (
    'Rechtliche Vorsorge',
    'Vollmachten und Testament aktualisieren',
    'Nach der Heirat sollten Sie wichtige Vorsorgedokumente überprüfen und ggf. aktualisieren:

**Vollmachten:**
- **Vorsorgevollmacht:** Bevollmächtigung des Ehepartners für Gesundheits- und Vermögensangelegenheiten im Notfall
- **Patientenverfügung:** Festlegung medizinischer Behandlungswünsche
- **Bankvollmacht:** Zugriff auf Konten im Notfall

**Testament:**
- Ohne Testament gilt die gesetzliche Erbfolge
- Mit Testament können Sie individuelle Regelungen treffen
- Bei Ehepaaren oft: "Berliner Testament" (gegenseitige Erbeinsetzung)
- Kann handschriftlich verfasst oder notariell beurkundet werden

**Hinweis:** Diese Dokumente sind optional, aber empfohlen. Überlegen Sie, ob Sie diese VOR der Hochzeit aktualisieren möchten, da sie häufig den Ehepartner einbeziehen.

Bei Bedarf können Sie einen Notar, Rechtsanwalt oder Beratungsstelle konsultieren.',
    'low',
    14,
    '{"3_months": true, "6_months": true}'::jsonb,
    13
  );

-- Neue Kategorie: Kirchliche Trauung
INSERT INTO task_templates (category, task_name, description, priority, default_duration, timing_rules, weeks_before_wedding)
VALUES
  (
    'Kirchliche Trauung',
    'Gespräch mit Pfarrer/Gemeinde vereinbaren',
    'Erstes Kennenlerngespräch und Terminvereinbarung für kirchliche Trauung',
    'high',
    14,
    '{"9_months": true, "12_months": true}'::jsonb,
    39
  ),
  (
    'Kirchliche Trauung',
    'Traugespräche und Vorbereitung',
    'Teilnahme an Traugesprächen, Auswahl von Texten, Liedern und Ablauf der Zeremonie',
    'high',
    14,
    '{"3_months": true, "6_months": true}'::jsonb,
    13
  ),
  (
    'Kirchliche Trauung',
    'Details für kirchliche Trauung finalisieren',
    'Finale Absprachen zu Dekoration, Musik, Programm und organisatorischen Details',
    'medium',
    7,
    '{"immediate": true, "3_months": true}'::jsonb,
    1
  );

-- Neue Kategorie: Nach der Trauung
INSERT INTO task_templates (category, task_name, description, priority, default_duration, timing_rules, weeks_before_wedding)
VALUES
  (
    'Nach der Trauung',
    'Dokumente und Verträge aktualisieren',
    'Nach der Eheschließung sollten verschiedene Dokumente und Verträge aktualisiert werden:

**Personalausweise und Reisepässe:**
- Bei Namensänderung: Neuen Ausweis/Pass beantragen
- Alte Dokumente verlieren ihre Gültigkeit

**Steuerklasse ändern:**
- Beim Finanzamt die Steuerklassen-Kombination wählen (z.B. III/V oder IV/IV)
- Führt oft zu steuerlichen Vorteilen

**Versicherungen informieren:**
- Krankenversicherung
- Haftpflichtversicherung (oft günstiger als Familienversicherung)
- Lebensversicherung
- Berufsunfähigkeitsversicherung
- KFZ-Versicherung

**Bankkonten und Verträge:**
- Namensänderung bei Banken mitteilen
- Ggf. Gemeinschaftskonto einrichten
- Kreditkarten aktualisieren
- Versorgungsunternehmen (Strom, Gas, Telefon)
- Mitgliedschaften und Abonnements

**Arbeitgeber informieren:**
- Namensänderung und Steuerklassen-Wechsel mitteilen
- Ggf. Ansprüche auf Zuschüsse oder Sozialleistungen prüfen

**Führerschein:**
- Bei Namensänderung beim Straßenverkehrsamt aktualisieren lassen

**Hinweis:** Diese Aufgabe ist als Checkliste für NACH der Hochzeit gedacht.',
    'high',
    30,
    '{"immediate": true}'::jsonb,
    1
  );
