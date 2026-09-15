import type { Dictionary } from "../dictionary";

const de: Dictionary = {
  meta: {
    title: "El Haj International — Versand & Handel",
    description:
      "Versand und Handel zwischen Europa und dem Nahen Osten. Fracht per Sammelcontainer und Beschaffung.",
  },

  nav: {
    howItWorks: "So funktioniert's",
    pricing: "Preise",
    calculator: "Versandrechner",
    signUp: "Registrieren",
    languageSwitcher: "Sprache wechseln",
  },

  hero: {
    headlineLine1: "Alles versenden",
    headlineLine2: "von Europa",
    headlineLine3Lead: "in den",
    destinationName: "Libanon",
    subtitle: [
      { text: "Sammelcontainer-Versand und Handel zwischen " },
      {
        text: "Europa",
        strong: true,
        // Dative — "zwischen" governs it, so these are the forms the
        // sentence needs, not the dictionary forms. Only "die Niederlande"
        // actually changes shape (plural, and it carries its article);
        // the rest are neuter country names used bare, which look identical
        // in the dative.
        rotateThrough: [
          "Deutschland",
          "Frankreich",
          "den Niederlanden",
          "Belgien",
          "Italien",
          "Spanien",
          "Schweden",
          "Dänemark",
          "Österreich",
          "Polen",
        ],
      },
      { text: " und " },
      { text: "dem Nahen Osten", strong: true },
      { text: "." },
    ],
    chatWithUs: "Schreiben Sie uns",
    chatWhatsappMessage:
      "Hallo, ich bin auf El Haj International gestoßen und habe eine Frage zum Versand.",
    estimateShipment: "Sendung schätzen",
  },

  statement: {
    eyebrow: "Was wir tun",
    headline: "Wir versenden sowohl private Pakete als auch Geschäftsfracht",
  },

  marquee: {
    words: [
      "Seefracht",
      "Konsolidierung",
      "Zollabfertigung",
      "Tür zu Tür",
      "Beschaffung",
      "Sammelladung",
    ],
  },

  howItWorks: {
    eyebrow: "So funktioniert's",
    steps: [
      {
        title: "Rechner nutzen",
        body: "Ziel und Sendungsart wählen. Sofortpreis — ohne Formular, ohne Konto.",
      },
      {
        title: "Auftrag senden",
        body: "Anfrage-Button antippen und Ihre Angaben per WhatsApp schicken. Wir bestätigen den Endpreis.",
      },
      {
        title: "Auf unseren Fahrer warten",
        body: "Wir übernehmen Abholung, Versand und Zollabfertigung. Ihr Paket kommt bis vor die Haustür.",
      },
    ],
    scrubberLabel: "Ziehen, um die Schritte erneut anzusehen",
    prevStep: "Vorheriger Schritt",
    nextStep: "Nächster Schritt",
  },

  calculatorPromo: {
    eyebrow: "Preise",
    headline: "Erfahren Sie den Preis, bevor Sie versenden.",
    subtitle: "Fracht, Zoll und Gebühren — eine Schätzung, keine Verpflichtung.",
    openCalculator: "Rechner öffnen",
    personalTag: "Versand",
    personalTitle: "Privates Paket",
    personalBlurb: "Kartons an die Familie — ein Festpreis",
    businessTag: "Handel",
    businessTitle: "Geschäftssendung",
    businessBlurb: "Handelsware — Fracht, Abfertigung und Zoll",
    startEstimate: "Schätzung starten",
  },

  closingCTA: {
    eyebrow: "Loslegen",
    headline: "Kundenservice und Beratung — kostenlos",
    subtitle:
      "Für eine Anfrage brauchen Sie weder Formular noch Konto. Schreiben Sie uns, und wir sagen Ihnen, was es kostet und was dazugehört.",
    personalParcelsLabel: "Private Pakete",
    personalParcelsMessage:
      "Hallo, ich möchte etwas von Europa in den Nahen Osten versenden.",
    businessInquiryLabel: "Geschäftsanfrage",
    businessInquiryMessage:
      "Hallo, ich suche als Unternehmen Produkte zur Beschaffung und zum Handel. Können wir sprechen?",
  },

  footer: {
    tagline:
      "Sammelcontainer-Versand und Handel zwischen Europa und dem Nahen Osten. Sitz in Hamburg.",
    calculator: "Versandrechner",
    signUp: "Registrieren",
    devNotice:
      "Die Website befindet sich im Aufbau. El Haj International ist noch nicht als lizenziertes Speditionsunternehmen registriert — die gezeigten Preise sind unverbindlich, und es werden noch keine Buchungen angenommen.",
  },

  preloader: {
    percentSign: "%",
  },

  redirect: {
    message: "Sie werden zur deutschen Seite weitergeleitet …",
    linkText: "Weiter",
  },

  calculatorPage: {
    backToHome: "← Zur Startseite",
    shippingEstimateEyebrow: "Versandschätzung",
    whereHeadline: "Wohin geht die Sendung?",
    whereBody:
      "Jedes Land besteuert Importe unterschiedlich, daher beginnt die Schätzung mit dem Zielland.",
    startEstimate: "Schätzung starten",
    onlyDestinationNotice:
      "Libanon ist derzeit das einzige Ziel — nur für diese Route liegen uns vollständige Zolldaten vor. Ein weiteres Land hinzuzufügen bedeutet, dessen Zolltabellen sorgfältig zu recherchieren — nicht einfach nur, es einer Liste hinzuzufügen.",
    shippingToEyebrow: "Versand in den",
    change: "Ändern",
    profileTabsLabel: "Art der Sendung",
    personalTitle: "Privates Paket",
    personalBlurb: "Kartons an die Familie — ein Festpreis",
    businessTitle: "Geschäftssendung",
    businessBlurb: "Handelsware — Fracht, Abfertigung und Zoll",
  },

  destinations: {
    LB: { name: "Libanon", gateway: "Hafen von Beirut" },
  },

  cargoCategories: {
    "used-household": {
      label: "Hausrat (gebraucht)",
      blurb: "Möbel, Küchenutensilien, persönliche Gegenstände",
      caveat:
        "Unterliegt im Libanon einer dreijährigen Weiterverkaufssperre. Nicht geeignet, um ein Ladengeschäft mit Ware aufzufüllen.",
    },
    "used-clothing": {
      label: "Gebrauchte Kleidung",
      blurb: "Getragene Kleidungsstücke und Textilien (HS 6309.00)",
      caveat:
        "Für diese Position gilt eine „EC”-Behördenkontrolle, die wir nicht vollständig klären konnten — vor Versand größerer Mengen bei einem Zollagenten nachfragen.",
    },
    "used-appliances": {
      label: "Haushaltsgeräte (gebraucht)",
      blurb: "Zollfrei mit den richtigen Unterlagen",
      caveat:
        "FIDIs eigene Liste verbotener Gegenstände widerspricht dieser Angabe bei batteriebetriebenen Geräten und Haushaltsgeräten. Erfordert eine direkte Auskunft von einem Zollagenten.",
    },
    computers: {
      label: "Computer & Laptops",
      blurb: "Zollfrei — nur MwSt. und Sicherheitsgebühr",
    },
    apparel: {
      label: "Bekleidung (neu)",
      blurb: "Neue Kleidungsstücke",
    },
    phones: {
      label: "Mobiltelefone",
      blurb: "Handys und Tablets",
    },
    watches: {
      label: "Uhren",
      blurb: "Armbanduhren und Wanduhren",
    },
    shoes: {
      label: "Schuhe",
      blurb: "Neue Schuhe",
      caveat:
        "Es gilt ein Mindestbetrag von 7.500 LL pro Paar, der bei günstigen Schuhen über dem prozentualen Zoll liegen kann.",
    },
    bags: {
      label: "Handtaschen & Gepäck",
      blurb: "Taschen und Koffer",
      caveat: "Es gilt ein Mindestbetrag von 4.500 LL pro Stück.",
    },
    "appliances-new": {
      label: "Haushaltsgeräte (neu)",
      blurb: "Weiße Ware und Elektrokleingeräte",
    },
    perfume: {
      label: "Parfüm",
      blurb: "Parfüms und Eau de Toilette",
    },
    cosmetics: {
      label: "Kosmetik & Make-up",
      blurb: "Wird oft in deutschen Drogerien gekauft",
    },
    linens: {
      label: "Bettwäsche & Handtücher",
      blurb: "Bettlaken, Handtücher, Haushaltstextilien",
      caveat: "Es gilt ein Mindestbetrag von 3.375 LL.",
    },
    "furniture-new": {
      label: "Möbel (neu)",
      blurb: "Neue Möbel und Haushaltsgegenstände",
    },
    commercial: {
      label: "Handelsware",
      blurb: "Zum Weiterverkauf importierte Waren",
      caveat:
        "Wird als Handelsware deklariert. Erfordert eine legalisierte Handelsrechnung und ein Ursprungszeugnis, die bei Sendungen persönlicher Gegenstände nicht nötig sind.",
    },
  },

  pricingSentences: {
    personalDutyFree: ({ categoryLabel, securityFeePct, deemedEurPerKg, weightKg }) =>
      `${categoryLabel} sind zollfrei — hier fällt nur die Sicherheitsgebühr von ${securityFeePct} an, auf einen angenommenen Wert von ${deemedEurPerKg} EUR/kg für ~${weightKg} kg.`,
    personalDutyCharged: ({
      weightKg,
      deemedEurPerKg,
      dutyPct,
      categoryLabel,
      securityFeePct,
    }) =>
      `~${weightKg} kg zu einem angenommenen Wert von ${deemedEurPerKg} EUR/kg, verzollt mit ${dutyPct} für ${categoryLabel} zuzüglich ${securityFeePct} Sicherheitsgebühr.`,
    personalDutyUnspecified: ({
      securityFeePct,
      deemedEurPerKg,
      weightKg,
      unspecifiedDutyPct,
    }) =>
      `Sie haben noch nicht angegeben, was Sie versenden, daher wird ein pauschaler Satz von ${unspecifiedDutyPct} auf einen angenommenen Wert von ${deemedEurPerKg} EUR/kg für ~${weightKg} kg angenommen, zuzüglich ${securityFeePct} Sicherheitsgebühr. Wählen Sie oben aus, was Sie versenden, um eine genauere Schätzung zu erhalten.`,
    personalBasisOneBox: ({ boxLabel, priceEur }) =>
      `Ein Karton der Größe ${boxLabel} zum Festpreis von ${priceEur}. Der Preis bleibt gleich, egal wie schwer er ist.`,
    personalBasisManyBoxes: ({ numBoxes, boxLabel, priceEur }) =>
      `${numBoxes} × Karton der Größe ${boxLabel} zum Festpreis von je ${priceEur}. Der Preis bleibt gleich, egal wie schwer sie sind.`,
    personalBasisMixedSizes: ({ breakdown }) =>
      `${breakdown} — jede Größe zu ihrem eigenen Festpreis, unabhängig vom Gewicht.`,
    personalBasisPerKg: ({ weightKg, perKgEur }) =>
      `${weightKg} kg zum Festpreis von ${perKgEur} pro Kilo.`,
    personalAlternativeFromBoxes: ({
      boxLabel,
      typicalKg,
      numBoxes,
      weightKg,
      altEur,
      perKgEur,
    }) =>
      `Ein normal gepackter ${boxLabel}-Karton fasst etwa ${typicalKg} kg, also würde${
        numBoxes === 1 ? " dieser" : "n diese"
      } auf rund ${weightKg} kg kommen — ${altEur} bei ${perKgEur}/kg.`,
    personalAlternativeFromWeight: ({ boxesNeeded, boxLabel, altEur }) =>
      `Dieses Gewicht füllt normalerweise etwa ${boxesNeeded} Kartons der Größe ${boxLabel} — ${altEur} zum Festpreis pro Karton.`,
    personalAlternativeFromMixedBoxes: ({ totalBoxes, weightKg, altEur, perKgEur }) =>
      `Diese ${totalBoxes} Kartons kommen auf rund ${weightKg} kg — ${altEur} bei ${perKgEur}/kg.`,
    businessDutyByWeight: ({ deemedEurPerKg, chargeableKg, dutyPct, securityFeePct }) =>
      `Berechnet auf Basis eines angenommenen Werts von ${deemedEurPerKg} EUR/kg (${chargeableKg} kg), mit ${dutyPct} Zoll zuzüglich ${securityFeePct} Sicherheitsgebühr. Der tatsächliche Warenwert ändert an dieser Zahl nichts.`,
    businessDutyByValue: ({
      valueEur,
      dutyPct,
      vatPct,
      securityFeePct,
      categoryLabel,
    }) =>
      `Berechnet auf Basis des deklarierten Werts (${valueEur}) mit ${dutyPct} Zoll zuzüglich ${vatPct} MwSt. und ${securityFeePct} Sicherheitsgebühr für ${categoryLabel}.`,
  },

  personalCalculator: {
    howToPay: "Wie möchten Sie abrechnen?",
    howToPayBody:
      "Ein Festpreis pro Karton, egal wie schwer er ist, oder ein Festpreis pro Kilo. Wählen Sie, was zu Ihrer Sendung passt — die Schätzung unten zeigt, was die andere Variante kosten würde.",
    byTheBox: "Pro Karton",
    byTheKilo: (perKg) => `Pro Kilo · ${perKg}/kg`,
    shippingFrom: "Von wo aus versenden Sie?",
    euCountryNames: {
      AT: "Österreich",
      BE: "Belgien",
      BG: "Bulgarien",
      HR: "Kroatien",
      CY: "Zypern",
      CZ: "Tschechien",
      DK: "Dänemark",
      EE: "Estland",
      FI: "Finnland",
      FR: "Frankreich",
      DE: "Deutschland",
      GR: "Griechenland",
      HU: "Ungarn",
      IE: "Irland",
      IT: "Italien",
      LV: "Lettland",
      LT: "Litauen",
      LU: "Luxemburg",
      MT: "Malta",
      NL: "Niederlande",
      PL: "Polen",
      PT: "Portugal",
      RO: "Rumänien",
      SK: "Slowakei",
      SI: "Slowenien",
      ES: "Spanien",
      SE: "Schweden",
    },
    state: "Region",
    selectState: "Region auswählen",
    pickupZoneNote:
      "Das ist Berlin/Brandenburg — wir holen es selbst ab, kein DHL-Versand nötig.",
    dhlZoneNote:
      "Außerhalb von Berlin/Brandenburg — Sie versenden dies per DHL an uns; die Kosten dafür sind bereits im Gesamtpreis unten enthalten.",
    euDhlApproximationNote:
      "Die DHL-Kosten im Preis unten sind der eigene Tarif der Deutschen Post für die umgekehrte Richtung (Deutschland zu Ihrem Land) — eine nahe Annäherung, kein Tarif für genau diese Strecke.",
    xxlPickupOnly:
      "Nur bei Abholung in Berlin/Brandenburg verfügbar — zu schwer für DHL-Standardpakete.",
    boxSize: "Kartongröße",
    holdsAbout: (kg) => `fasst ~${kg} kg`,
    drawnToScale:
      "maßstabsgetreu — die drei Größen sind im richtigen Verhältnis zueinander dargestellt",
    scaleModelLabel: (boxLabel, w, d, h) =>
      `Maßstabsgetreues Modell des Kartons ${boxLabel}, ${w} mal ${d} mal ${h} Zentimeter`,
    howManyBoxes: "Wie viele Kartons",
    oneBox: "1 Karton",
    nBoxes: (n) => `${n} Kartons`,
    sendingMoreThan: (max) =>
      `Mehr als ${max}? Schreiben Sie uns — bei dieser Menge lohnt es sich, richtig zu kalkulieren, statt pro Karton zu rechnen.`,
    decrementBoxLabel: (boxLabel) => `Einen Karton ${boxLabel} weniger`,
    incrementBoxLabel: (boxLabel) => `Einen Karton ${boxLabel} mehr`,
    totalWeight: "Gesamtgewicht",
    kgUnit: (n) => `${n} kg`,
    chargedOnActualWeight: (perKg) =>
      `Berechnet nach tatsächlichem Gewicht, zum Festpreis von ${perKg} pro Kilo, unabhängig von den Kartons.`,
    whatsInIt: "Was versenden Sie?",
    whatsInItBody:
      "Das ändert nichts am Versandpreis. Es legt den Satz fest, den der libanesische Zoll bei Ankunft möglicherweise berechnet. Wählen Sie alles aus, was zutrifft — bleibt es leer, nehmen wir einen pauschalen Satz an.",
    chooseWhatsInside: "Inhalt auswählen",
    itemsChosenEdit: (n) => `${n} Artikel ausgewählt — bearbeiten`,
    doneChoosing: "Fertig",
    removeItem: (label) => `${label} entfernen`,
    contentsNotSpecified: "Inhalt nicht angegeben",
    summaryOneBox: (boxLabel) => `1 × Karton ${boxLabel}`,
    summaryManyBoxes: (n, boxLabel) => `${n} × Karton ${boxLabel}`,
    summaryMixedBoxes: (breakdown) => `${breakdown} Kartons`,
    summaryWeight: (kg) => `${kg} kg`,
    checkThisWithUs: "Bei uns nachfragen",
    check: "Nachfragen",
    estimatedAllIn: "geschätzt, alles inklusive",
    basePriceLabel: "Grundpreis",
    dhlLabel: "DHL-Versand",
    shippingYouPayUs: "Versandkosten — Sie zahlen sie an uns",
    dutyMayCharge: "Zollgebühr — bei Ankunft möglicherweise vom Zoll erhoben",
    customsFinalAssessment: "Die endgültige Festsetzung erfolgt durch den Zoll, nicht durch uns.",
    cheaperByAmount: (amount) => `Das ist die günstigere Variante, um ${amount}.`,
    otherOptionSaves: (amount) =>
      `Die andere Option würde etwa ${amount} sparen — einen Blick wert.`,
    bothOptionsSame: "Beide Optionen kosten hier ungefähr gleich viel.",
    footnote: (destination, dataAsOf) =>
      `Der Versandpreis deckt ab, was wir übernehmen — von Berlin in den ${destination}, in unserem eigenen Sammelcontainer. Die Zollgebühr ist gesondert: Sie wird vom libanesischen Zoll bei Ankunft erhoben, nicht von uns, und wir haben sie anhand des Sendungsgewichts zu dem angenommenen Wert geschätzt, den der Zoll auf persönliche Gegenstände anwendet. Die Zollsätze stammen aus ${dataAsOf} und müssen erneut bestätigt werden, und der Zoll trifft die endgültige Festsetzung am Tag der Ankunft. Dies ist eine Schätzung, kein Angebot, und wir nehmen noch keine Buchungen an.`,
    whatsappMessage: ({ destination, summary, categoryLabel, shipping, duty }) =>
      `Hallo, ich habe den Rechner auf Ihrer Website benutzt. Private Sendung in den ${destination}, ${summary}, ${categoryLabel}. Versand ${shipping}, geschätzter Zoll ${duty}. Können Sie das bestätigen?`,
  },

  businessCalculator: {
    readThisFirst: "Zuerst lesen — zwei Regeln entscheiden über Ihre Kosten",
    usedGoodsTag: "Gebrauchte Waren",
    usedGoodsBody: [
      { text: "Besteuert " },
      { text: "nach Gewicht", strong: true },
      {
        text: ". Der Zoll setzt einen angenommenen Wert pro Kilo an, der tatsächliche Warenwert ändert also nichts. Der deklarierte Wert wird nicht berücksichtigt.",
      },
    ],
    newGoodsTag: "Neue Waren",
    newGoodsBody: [
      { text: "Besteuert " },
      { text: "nach Wert", strong: true },
      {
        text: ", zu einem von der Warenart festgelegten Satz — Laptops sind zollfrei, Parfüm und Kosmetik gehören zu den am höchsten besteuerten.",
      },
    ],
    footnote: (dataAsOf) =>
      `Die Fracht wird in beiden Fällen nach Gewicht berechnet, und die Abfertigung ist eine Pauschalgebühr pro Sendung. Dies ist eine Schätzung, kein Angebot — die Sätze stammen aus ${dataAsOf} und müssen erneut bestätigt werden. Die endgültige Zollfestsetzung erfolgt durch den libanesischen Zoll, nicht durch uns, und wir nehmen noch keine Buchungen an.`,
    whatAreYouSending: "Was versenden Sie?",
    whatAreYouSendingBody:
      "Der libanesische Zoll erhebt für jede Warenart einen anderen Satz. Wählen Sie die passendste Kategorie — der angezeigte Prozentsatz ist der Zollsatz.",
    taxedByWeight: "Besteuert nach Gewicht",
    taxedByValue: "Besteuert nach Wert",
    sets: "Beeinflusst",
    freight: "Fracht",
    duty: "Zoll",
    clearance: "Abfertigung",
    weight: "Gewicht",
    kgUnit: (n) => `${n} kg`,
    minimumChargeable: (minKg) =>
      `Das Mindestgewicht für die Berechnung beträgt ${minKg} kg, daher wird mit ${minKg} kg kalkuliert.`,
    declaredValue: "Deklarierter Wert",
    notUsed: "Nicht verwendet",
    dutyFollowsValue: (categoryLabel, dutyPct, vatPct, securityPct) =>
      `Der Zoll auf ${categoryLabel} richtet sich nach dem Warenwert, mit ${dutyPct} zuzüglich ${vatPct} MwSt. und ${securityPct} Sicherheitsgebühr.`,
    switchedOffBecause: (categoryLabel) =>
      `Deaktiviert: Bei ${categoryLabel} gilt ein angenommener Wert pro Kilo, unabhängig vom deklarierten Wert. Eine Änderung dieser Zahl würde den Zoll nicht beeinflussen, daher ist sie hier ohne Wirkung.`,
    shippingFromNote:
      "Das dient nur als Kontext für die Anfrage und ist nicht Teil der Schätzung unten — Abholung und Fracht für Geschäftssendungen werden direkt nach unserer Antwort vereinbart, nicht automatisch nach Zone berechnet wie bei privaten Kartons.",
    checkThisWithUs: "Bei uns nachfragen",
    check: "Nachfragen",
    estimatedTotal: "Geschätzter Gesamtbetrag",
    whatsappMessage: ({ destination, shipFrom, categoryLabel, weight, declaredValue, rangeLow, rangeHigh }) =>
      `Hallo, ich habe den Geschäftsrechner auf Ihrer Website benutzt. Versand von ${shipFrom} in den ${destination}, ${categoryLabel}, ~${weight} kg${
        declaredValue ? `, deklariert ${declaredValue}` : ""
      }. Geschätzt ${rangeLow}–${rangeHigh}. Können Sie das bestätigen?`,
  },

  signup: {
    backToHome: "← Zur Startseite",
    createAccountEyebrow: "Konto erstellen",
    whatSigningUpFor: "Wofür möchten Sie sich registrieren?",
    whatSigningUpForBody:
      "Eine Sendung aufzugeben und Produkte zu beschaffen erfordert völlig unterschiedliche Angaben, daher stellen die beiden Wege unterschiedliche Fragen.",
    privateTag: "Versand",
    privateTitle: "Privat",
    privateBody: "Versand von persönlichen Gegenständen oder Hausrat an die Familie.",
    businessTag: "Handel",
    businessTitle: "Geschäftlich",
    businessBody: "Beschaffung von Produkten oder Aufgabe einer Handelsbestellung.",
    start: "Start",
    stepOf: (step, total) => `Schritt ${step} von ${total}`,
    optional: "optional",
    chooseFile: "Datei auswählen",
    fileTypesHint: "JPG, PNG oder PDF.",
    notUploadedNotice:
      "Dieses Dokument wird nicht hochgeladen. Wir haben noch kein Kontosystem, es verlässt also Ihr Gerät nicht — Sie senden es im letzten Schritt im Chat.",
    lastStep: "Letzter Schritt",
    checkAndSend: "Prüfen und senden",
    checkAndSendBody: (withId) =>
      `Kopieren Sie die Zusammenfassung unten und senden Sie sie uns per WhatsApp${
        withId ? ", zusammen mit Ihrem Ausweisdokument" : ""
      }. Wir antworten mit den Kosten und den nächsten Schritten.`,
    copySummary: "Zusammenfassung kopieren",
    copied: "Kopiert ✓",
    copyFailed: "Kopieren fehlgeschlagen — Text bitte manuell markieren und kopieren.",
    openWhatsapp: "WhatsApp öffnen",
    back: "Zurück",
    next: "Weiter",
    review: "Prüfen",
    footerNotice:
      "Nichts, was Sie hier eingeben, wird gespeichert oder verschickt, bis Sie uns aktiv eine Nachricht senden. El Haj International ist noch kein lizenziertes Speditionsunternehmen und nimmt keine Buchungen an — diese Registrierung beginnt ein Gespräch, sie eröffnet kein Konto.",
    validation: {
      required: "Pflichtfeld.",
      invalidEmail: "Das sieht nicht wie eine E-Mail-Adresse aus.",
      invalidPhone: "Das sieht nicht wie eine Telefonnummer aus.",
      chooseFileError: "Bitte wählen Sie eine Datei aus.",
    },
    privateSteps: [
      {
        title: "Ihre Angaben",
        blurb: "Die Person, die die Sendung aufgibt.",
        fields: [
          { id: "senderName", label: "Vollständiger Name" },
          { id: "senderEmail", label: "E-Mail" },
          { id: "senderPhone", label: "Telefon / WhatsApp" },
          { id: "senderAddress", label: "Straße und Hausnummer" },
          { id: "senderCity", label: "Postleitzahl und Ort" },
        ],
      },
      {
        title: "Wer die Sendung empfängt",
        blurb:
          "Der Zoll behandelt jeden Empfänger als Importeur seiner eigenen Sendung, es muss also die tatsächliche Person sein, die die Lieferung entgegennimmt.",
        fields: [
          { id: "consigneeName", label: "Vollständiger Name des Empfängers" },
          {
            id: "consigneeId",
            label: "Ausweisnummer des Empfängers",
            hint: "Vom libanesischen Zoll für die Zollanmeldung erforderlich.",
          },
          { id: "consigneePhone", label: "Telefon des Empfängers" },
          { id: "consigneeAddress", label: "Lieferadresse" },
          { id: "consigneeCity", label: "Stadt / Region" },
        ],
      },
      {
        title: "Ausweisdokument",
        blurb: "Eine Reisepass- oder Ausweisseite des Absenders.",
        fields: [
          { id: "idDocument", label: "Datei auswählen", hint: "JPG, PNG oder PDF." },
        ],
      },
    ],
    businessSteps: [
      {
        title: "Firmendaten",
        fields: [
          { id: "companyName", label: "Firmenname" },
          { id: "contactPerson", label: "Ansprechpartner" },
          { id: "companyRole", label: "Funktion" },
          { id: "companyEmail", label: "E-Mail" },
          { id: "companyPhone", label: "Telefon / WhatsApp" },
        ],
      },
      {
        title: "Verifizierung",
        blurb: "Eine dieser Angaben reicht — wir möchten nur sehen, dass das Unternehmen real ist.",
        fields: [
          {
            id: "verification",
            label: "Website, Firmen-E-Mail-Domain oder USt-IdNr. / Handelsregisternummer",
            hint: "Eine Angabe reicht. Sie müssen nicht alle drei angeben.",
          },
        ],
      },
      {
        title: "Was Sie suchen",
        blurb: "Je genauer Ihre Angaben, desto schneller können wir ein Angebot erstellen.",
        fields: [
          { id: "product", label: "Produkt oder Warenart" },
          { id: "quantity", label: "Menge oder Bestellvolumen" },
          { id: "preferences", label: "Qualitäts- und Verpackungswünsche" },
          {
            id: "shelfLife",
            label: "Mindesthaltbarkeits- / Lagerfähigkeitsanforderungen",
            hint: "Leer lassen, falls nicht zutreffend.",
          },
          { id: "notes", label: "Sonstiges" },
        ],
      },
    ],
    privateWhatsappMessage:
      "Hallo, ich habe das Anmeldeformular auf Ihrer Website ausgefüllt. Ich sende jetzt meine Daten.",
    businessWhatsappMessage:
      "Hallo, ich habe das Geschäfts-Anmeldeformular auf Ihrer Website ausgefüllt. Ich sende jetzt meine Daten.",
    summaryHeaderPrivate: "EL HAJ INTERNATIONAL — PRIVAT / VERSAND-ANMELDUNG",
    summaryHeaderBusiness: "EL HAJ INTERNATIONAL — GESCHÄFT / HANDELS-ANMELDUNG",
  },
};

export default de;
