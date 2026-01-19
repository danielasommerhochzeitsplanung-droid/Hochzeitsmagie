import { TaskTemplate } from '../utils/taskAutomation';

export const taskTemplateData: TaskTemplate[] = [
  {
    id: 'planung-1',
    category: 'Planung',
    task_name: 'Namenswahl besprechen',
    description: 'Entscheiden, welche(n) Namen Sie nach der Hochzeit führen möchten: Behalten beide Partner ihren Namen? Nimmt ein Partner den Namen des anderen an? Wird ein Doppelname gewählt? Diese Entscheidung muss vor der Anmeldung beim Standesamt getroffen werden.',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '12_months': true, '18_months': true }
  },
  {
    id: 'planung-2',
    category: 'Planung',
    task_name: 'Trauzeugen auswählen',
    description: 'Überlegen Sie, wen Sie als Trauzeugen haben möchten. Trauzeugen sind in Deutschland nicht mehr gesetzlich vorgeschrieben, aber viele Paare möchten trotzdem welche haben. Sie können die Namen später beim Standesamt angeben.',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '9_months': true, '12_months': true, '18_months': true }
  },
  {
    id: 'location-1',
    category: 'Location',
    task_name: 'Locations recherchieren und besichtigen',
    description: 'Verschiedene Locations anschauen und vergleichen',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '12_months': true, '18_months': true }
  },
  {
    id: 'location-2',
    category: 'Location',
    task_name: 'Location buchen',
    description: 'Vertrag abschließen und Anzahlung leisten',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '9_months': true, '12_months': true, '18_months': true }
  },
  {
    id: 'location-3',
    category: 'Location',
    task_name: 'Detailplanung mit Location',
    description: 'Raumaufteilung, Zeitplan, technische Details klären',
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'location-4',
    category: 'Location',
    task_name: 'Final Walk-Through',
    description: 'Letzte Absprachen vor Ort',
    priority: 'high',
    default_duration: 3,
    timing_rules: { 'immediate': true }
  },
  {
    id: 'catering-1',
    category: 'Catering',
    task_name: 'Catering-Anbieter recherchieren',
    description: 'Verschiedene Caterer vergleichen und Angebote einholen',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '9_months': true, '12_months': true, '18_months': true }
  },
  {
    id: 'catering-2',
    category: 'Catering',
    task_name: 'Menü-Verkostung',
    description: 'Probemenü mit Caterer durchführen',
    priority: 'medium',
    default_duration: 7,
    timing_rules: { '6_months': true, '9_months': true }
  },
  {
    id: 'catering-3',
    category: 'Catering',
    task_name: 'Catering buchen',
    description: 'Vertrag abschließen und Menü festlegen',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '6_months': true, '9_months': true, '12_months': true }
  },
  {
    id: 'catering-4',
    category: 'Catering',
    task_name: 'Finale Gästezahl mitteilen',
    description: 'Endgültige Anzahl und Sonderwünsche bestätigen',
    priority: 'high',
    default_duration: 3,
    timing_rules: { 'immediate': true }
  },
  {
    id: 'fotograf-1',
    category: 'Fotograf',
    task_name: 'Fotografen recherchieren',
    description: 'Portfolio verschiedener Fotografen anschauen',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '9_months': true, '12_months': true, '18_months': true }
  },
  {
    id: 'fotograf-2',
    category: 'Fotograf',
    task_name: 'Fotografen buchen',
    description: 'Vertrag abschließen und Zeitplan besprechen',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '6_months': true, '9_months': true, '12_months': true }
  },
  {
    id: 'fotograf-3',
    category: 'Fotograf',
    task_name: 'Engagement Shooting',
    description: 'Vorab-Fotoshooting zur Vorbereitung',
    priority: 'low',
    default_duration: 7,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'fotograf-4',
    category: 'Fotograf',
    task_name: 'Shot List erstellen',
    description: 'Wunschfotos und wichtige Momente festhalten',
    priority: 'medium',
    default_duration: 7,
    timing_rules: { 'immediate': true, '3_months': true }
  },
  {
    id: 'deko-1',
    category: 'Dekoration',
    task_name: 'Deko-Konzept entwickeln',
    description: 'Farbschema und Stil festlegen',
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '6_months': true, '9_months': true, '12_months': true }
  },
  {
    id: 'deko-2',
    category: 'Dekoration',
    task_name: 'Florist recherchieren und buchen',
    description: 'Blumenschmuck planen und bestellen',
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '6_months': true, '9_months': true }
  },
  {
    id: 'deko-3',
    category: 'Dekoration',
    task_name: 'Deko-Material besorgen',
    description: 'DIY-Material und zusätzliche Deko kaufen',
    priority: 'low',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'deko-4',
    category: 'Dekoration',
    task_name: 'Finale Deko-Details',
    description: 'Letzte Abstimmung mit Florist und Location',
    priority: 'medium',
    default_duration: 3,
    timing_rules: { 'immediate': true }
  },
  {
    id: 'musik-1',
    category: 'Musik',
    task_name: 'DJ/Band recherchieren',
    description: 'Verschiedene Musiker vergleichen',
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '9_months': true, '12_months': true, '18_months': true }
  },
  {
    id: 'musik-2',
    category: 'Musik',
    task_name: 'DJ/Band buchen',
    description: 'Vertrag abschließen',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '6_months': true, '9_months': true, '12_months': true }
  },
  {
    id: 'musik-3',
    category: 'Musik',
    task_name: 'Playlist besprechen',
    description: 'Musikwünsche und No-Gos festlegen',
    priority: 'medium',
    default_duration: 7,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'musik-4',
    category: 'Musik',
    task_name: 'Ablaufplan für Musik erstellen',
    description: 'Zeitplan für erste Tanz, Einzug, etc.',
    priority: 'medium',
    default_duration: 3,
    timing_rules: { 'immediate': true, '3_months': true }
  },
  {
    id: 'einladungen-1',
    category: 'Einladungen',
    task_name: 'Design festlegen',
    description: 'Stil und Layout der Einladungen wählen',
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '6_months': true, '9_months': true }
  },
  {
    id: 'einladungen-2',
    category: 'Einladungen',
    task_name: 'Save-the-Dates versenden',
    description: 'Vorab-Information an Gäste',
    priority: 'medium',
    default_duration: 7,
    timing_rules: { '9_months': true, '12_months': true, '18_months': true }
  },
  {
    id: 'einladungen-3',
    category: 'Einladungen',
    task_name: 'Einladungen drucken',
    description: 'Finale Version drucken lassen',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'einladungen-4',
    category: 'Einladungen',
    task_name: 'Einladungen versenden',
    description: 'An alle Gäste verschicken',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'kleidung-1',
    category: 'Kleidung',
    task_name: 'Brautkleid-Termine vereinbaren',
    description: 'Verschiedene Geschäfte besuchen',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '9_months': true, '12_months': true, '18_months': true }
  },
  {
    id: 'kleidung-2',
    category: 'Kleidung',
    task_name: 'Brautkleid kaufen',
    description: 'Kleid bestellen',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '6_months': true, '9_months': true, '12_months': true }
  },
  {
    id: 'kleidung-3',
    category: 'Kleidung',
    task_name: 'Anzug/Smoking besorgen',
    description: 'Outfit für Bräutigam',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true, '9_months': true }
  },
  {
    id: 'kleidung-4',
    category: 'Kleidung',
    task_name: 'Anproben Brautkleid',
    description: 'Finale Anpassungen',
    priority: 'high',
    default_duration: 7,
    timing_rules: { 'immediate': true, '3_months': true }
  },
  {
    id: 'standesamt-1',
    category: 'Standesamt',
    task_name: 'Erforderliche Dokumente prüfen und beantragen',
    description: `Folgende Dokumente werden für die Anmeldung zur Eheschließung benötigt:

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

**Hinweis:** Erkundigen Sie sich bei Ihrem Standesamt, ob weitere Dokumente erforderlich sind (z.B. bei ausländischer Staatsangehörigkeit).`,
    priority: 'high',
    default_duration: 21,
    timing_rules: { '6_months': true, '9_months': true }
  },
  {
    id: 'standesamt-2',
    category: 'Standesamt',
    task_name: 'Anmeldung zur Eheschließung beim Standesamt',
    description: `Vereinbaren Sie einen Termin beim Standesamt zur Anmeldung Ihrer Eheschließung. Beide Partner müssen persönlich erscheinen.

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
Manchmal können die Dokumente (erweiterte Geburtsurkunde, Meldebescheinigung) direkt beim Standesamt beantragt werden, manchmal müssen Sie diese separat beim Einwohnermeldeamt bzw. Geburtsstandesamt besorgen. Fragen Sie bei Ihrem Standesamt nach!`,
    priority: 'high',
    default_duration: 14,
    timing_rules: { '6_months': true, '9_months': true }
  },
  {
    id: 'ringe-1',
    category: 'Ringe',
    task_name: 'Ringe anschauen',
    description: 'Verschiedene Juweliere besuchen',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '6_months': true, '9_months': true, '12_months': true }
  },
  {
    id: 'ringe-2',
    category: 'Ringe',
    task_name: 'Ringe bestellen',
    description: 'Auswahl treffen und bestellen',
    priority: 'high',
    default_duration: 7,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'ringe-3',
    category: 'Ringe',
    task_name: 'Gravur festlegen',
    description: 'Text für Ringinnenseite wählen',
    priority: 'low',
    default_duration: 7,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'transport-1',
    category: 'Transport',
    task_name: 'Hochzeitsauto organisieren',
    description: 'Fahrzeug für Brautpaar buchen',
    priority: 'low',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'transport-2',
    category: 'Transport',
    task_name: 'Gäste-Transport planen',
    description: 'Shuttle oder Fahrgemeinschaften organisieren',
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'unterhaltung-1',
    category: 'Unterhaltung',
    task_name: 'Zusätzliche Unterhaltung planen',
    description: 'Photobooth, Spiele, Animation',
    priority: 'low',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'unterhaltung-2',
    category: 'Unterhaltung',
    task_name: 'Kinderprogramm organisieren',
    description: 'Betreuung und Aktivitäten für Kinder',
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'flitterwochen-1',
    category: 'Flitterwochen',
    task_name: 'Reiseziel festlegen',
    description: 'Honeymoon planen',
    priority: 'low',
    default_duration: 14,
    timing_rules: { '6_months': true, '9_months': true, '12_months': true }
  },
  {
    id: 'flitterwochen-2',
    category: 'Flitterwochen',
    task_name: 'Flitterwochen buchen',
    description: 'Flüge und Unterkunft reservieren',
    priority: 'medium',
    default_duration: 7,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'papeterie-1',
    category: 'Papeterie',
    task_name: 'Menükarten gestalten',
    description: 'Design und Druck',
    priority: 'low',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'papeterie-2',
    category: 'Papeterie',
    task_name: 'Tischkarten erstellen',
    description: 'Namen und Sitzplätze',
    priority: 'medium',
    default_duration: 7,
    timing_rules: { 'immediate': true, '3_months': true }
  },
  {
    id: 'papeterie-3',
    category: 'Papeterie',
    task_name: 'Programmheft erstellen',
    description: 'Ablauf für Gäste',
    priority: 'low',
    default_duration: 7,
    timing_rules: { 'immediate': true, '3_months': true }
  },
  {
    id: 'wichtige-themen-1',
    category: 'Wichtige Themen',
    task_name: 'Ehevertrag und Güterstand besprechen',
    description: `Nehmen Sie sich Zeit, um über rechtliche und finanzielle Regelungen zu sprechen:

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

Diese Aufgabe dient zunächst als Reminder, sich über diese Themen zu informieren und zu entscheiden, ob Sie einen Ehevertrag möchten.`,
    priority: 'medium',
    default_duration: 14,
    timing_rules: { '9_months': true, '12_months': true }
  },
  {
    id: 'rechtliche-vorsorge-1',
    category: 'Rechtliche Vorsorge',
    task_name: 'Vollmachten und Testament aktualisieren',
    description: `Nach der Heirat sollten Sie wichtige Vorsorgedokumente überprüfen und ggf. aktualisieren:

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

Bei Bedarf können Sie einen Notar, Rechtsanwalt oder Beratungsstelle konsultieren.`,
    priority: 'low',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'kirchliche-trauung-1',
    category: 'Kirchliche Trauung',
    task_name: 'Gespräch mit Pfarrer/Gemeinde vereinbaren',
    description: 'Erstes Kennenlerngespräch und Terminvereinbarung für kirchliche Trauung',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '9_months': true, '12_months': true }
  },
  {
    id: 'kirchliche-trauung-2',
    category: 'Kirchliche Trauung',
    task_name: 'Traugespräche und Vorbereitung',
    description: 'Teilnahme an Traugesprächen, Auswahl von Texten, Liedern und Ablauf der Zeremonie',
    priority: 'high',
    default_duration: 14,
    timing_rules: { '3_months': true, '6_months': true }
  },
  {
    id: 'kirchliche-trauung-3',
    category: 'Kirchliche Trauung',
    task_name: 'Details für kirchliche Trauung finalisieren',
    description: 'Finale Absprachen zu Dekoration, Musik, Programm und organisatorischen Details',
    priority: 'medium',
    default_duration: 7,
    timing_rules: { 'immediate': true, '3_months': true }
  },
  {
    id: 'nach-trauung-1',
    category: 'Nach der Trauung',
    task_name: 'Dokumente und Verträge aktualisieren',
    description: `Nach der Eheschließung sollten verschiedene Dokumente und Verträge aktualisiert werden:

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

**Hinweis:** Diese Aufgabe ist als Checkliste für NACH der Hochzeit gedacht.`,
    priority: 'high',
    default_duration: 30,
    timing_rules: { 'immediate': true }
  }
];
