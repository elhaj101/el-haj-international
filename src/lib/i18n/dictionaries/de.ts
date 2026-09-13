import type { Dictionary } from "../dictionary";

const de: Dictionary = {
  meta: {
    title: "El Haj International — Versand & Handel",
    description:
      "Versand und Handel zwischen Europa und dem Nahen Osten. Konsolidierte Containerfracht und Beschaffung.",
  },

  nav: {
    howItWorks: "So funktioniert's",
    pricing: "Preise",
    calculator: "Rechner",
    signUp: "Registrieren",
    languageSwitcher: "Sprache wechseln",
  },

  hero: {
    eyebrowCity: "Hamburg",
    eyebrowRoute: "Europa in den Nahen Osten",
    headlineLine1: "Alles versenden",
    headlineLine2: "von Europa",
    headlineLine3Lead: "nach",
    destinationName: "Libanon",
    subtitle: [
      { text: "Konsolidierter Containerversand und Handel zwischen " },
      { text: "Europa", strong: true },
      { text: " und " },
      { text: "dem Nahen Osten", strong: true },
      { text: "." },
    ],
    chatWithUs: "Chatten Sie mit uns",
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
        title: "Auf den Fahrer warten",
        body: "Wir übernehmen Abholung, Versand und Zollabfertigung. Ihr Paket kommt an die Tür.",
      },
    ],
  },

  calculatorPromo: {
    eyebrow: "Preise",
    headline: "Kennen Sie den Preis, bevor Sie versenden.",
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
      "Keine Formulare und kein Konto nötig, um zu fragen. Schreiben Sie uns, und wir sagen Ihnen, was es kostet und was dazugehört.",
    personalParcelsLabel: "Private Pakete",
    personalParcelsMessage:
      "Hallo, ich möchte etwas von Europa in den Nahen Osten versenden.",
    businessInquiryLabel: "Geschäftsanfrage",
    businessInquiryMessage:
      "Hallo, ich suche als Unternehmen Produkte zur Beschaffung und zum Handel. Können wir sprechen?",
  },

  footer: {
    tagline:
      "Konsolidierter Containerversand und Handel zwischen Europa und dem Nahen Osten. Sitz in Hamburg, Deutschland.",
    calculator: "Rechner",
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
      "Libanon ist derzeit das einzige Ziel — nur für diese Route liegen uns vollständige Zolldaten vor. Ein weiteres Land hinzuzufügen bedeutet, dessen Zolltabellen sorgfältig zu recherchieren, nicht nur einen Eintrag in einer Liste.",
    shippingToEyebrow: "Versand nach",
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
      label: "Gebrauchte Haushaltswaren",
      blurb: "Möbel, Küchenutensilien, persönliche Gegenstände",
      caveat:
        "Unterliegt in Libanon einer dreijährigen Weiterverkaufssperre. Nicht geeignet für die Wiederauffüllung eines Geschäfts.",
    },
    "used-clothing": {
      label: "Gebrauchte Kleidung",
      blurb: "Getragene Kleidungsstücke und Textilien (HS 6309.00)",
      caveat:
        "Für diese Position gilt eine „EC“-Behördenkontrolle, die wir nicht vollständig klären konnten — vor Versand größerer Mengen bei einem Zollmakler nachfragen.",
    },
    "used-appliances": {
      label: "Haushaltsgeräte (gebraucht)",
      blurb: "Zollfrei mit den richtigen Unterlagen",
      caveat:
        "FIDIs eigene Liste verbotener Gegenstände widerspricht dieser Angabe bei batteriebetriebenen und Haushaltsgeräten. Erfordert eine direkte Auskunft von einem Zollmakler.",
    },
    computers: {
      label: "Computer & Laptops",
      blurb: "Zollfrei — nur MwSt. und Sicherheitsgebühr",
    },
    apparel: {
      label: "Kleidung & Bekleidung (neu)",
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
      blurb: "Neues Schuhwerk",
      caveat:
        "Es gilt ein Mindestbetrag von 7.500 LL pro Paar, der bei günstigem Schuhwerk über dem prozentualen Zoll liegen kann.",
    },
    bags: {
      label: "Handtaschen & Gepäck",
      blurb: "Taschen und Koffer",
      caveat: "Es gilt ein Mindestbetrag von 4.500 LL pro Stück.",
    },
    "appliances-new": {
      label: "Haushaltsgeräte (neu)",
      blurb: "Weiße Ware und kleine Haushaltsgeräte",
    },
    perfume: {
      label: "Parfüm",
      blurb: "Parfüms und Toilettenwasser",
    },
    cosmetics: {
      label: "Kosmetik & Make-up",
      blurb: "Eine häufige Anfrage aus deutschen Drogerien",
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
    personalDutyFree: ({ categoryLabel, securityFeePct, deemedUsdPerKg, weightKg }) =>
      `${categoryLabel} sind zollfrei — hier fällt nur die Sicherheitsgebühr von ${securityFeePct} an, auf einen unterstellten Wert von USD ${deemedUsdPerKg}/kg für ~${weightKg} kg.`,
    personalDutyCharged: ({
      weightKg,
      deemedUsdPerKg,
      dutyPct,
      categoryLabel,
      securityFeePct,
    }) =>
      `~${weightKg} kg zu einem unterstellten Wert von USD ${deemedUsdPerKg}/kg, verzollt mit ${dutyPct} für ${categoryLabel} zuzüglich ${securityFeePct} Sicherheitsgebühr.`,
    personalBasisOneBox: ({ boxLabel, priceEur }) =>
      `Ein Karton der Größe ${boxLabel} zum Festpreis von ${priceEur}. Der Preis bleibt gleich, egal wie schwer er ist.`,
    personalBasisManyBoxes: ({ numBoxes, boxLabel, priceEur }) =>
      `${numBoxes} × Kartons der Größe ${boxLabel} zum Festpreis von je ${priceEur}. Der Preis bleibt gleich, egal wie schwer sie sind.`,
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
    businessDutyByWeight: ({ deemedUsdPerKg, chargeableKg, dutyPct, securityFeePct }) =>
      `Berechnet auf Basis eines unterstellten Werts von USD ${deemedUsdPerKg}/kg (${chargeableKg} kg), mit ${dutyPct} Zoll zuzüglich ${securityFeePct} Sicherheitsgebühr. Der tatsächliche Warenwert ändert an dieser Zahl nichts.`,
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
    howToPay: "Wie möchten Sie bezahlen?",
    howToPayBody:
      "Ein Festpreis pro Karton, egal wie schwer er ist, oder ein Festpreis pro Kilo. Wählen Sie, was zu Ihrer Sendung passt — die Schätzung unten zeigt, was die andere Variante kosten würde.",
    byTheBox: "Pro Karton",
    byTheKilo: (perKg) => `Pro Kilo · ${perKg}/kg`,
    boxSize: "Kartongröße",
    holdsAbout: (kg) => `fasst ~${kg} kg`,
    drawnToScale:
      "maßstabsgetreu dargestellt — die drei Größen sind im echten Verhältnis zueinander gezeigt",
    scaleModelLabel: (boxLabel, w, d, h) =>
      `Maßstabsgetreues Modell des Kartons ${boxLabel}, ${w} mal ${d} mal ${h} Zentimeter`,
    howManyBoxes: "Wie viele Kartons",
    oneBox: "1 Karton",
    nBoxes: (n) => `${n} Kartons`,
    sendingMoreThan: (max) =>
      `Mehr als ${max}? Schreiben Sie uns — bei dieser Menge lohnt es sich, richtig zu kalkulieren, statt pro Karton zu rechnen.`,
    totalWeight: "Gesamtgewicht",
    kgUnit: (n) => `${n} kg`,
    chargedOnActualWeight: (perKg) =>
      `Berechnet nach tatsächlichem Gewicht, zum Festpreis von ${perKg} pro Kilo, unabhängig von den Kartons.`,
    whatsInIt: "Was ist darin?",
    whatsInItBody:
      "Das ändert nichts am Versandpreis. Es legt den Satz fest, den der libanesische Zoll bei Ankunft möglicherweise berechnet — der Prozentsatz auf jeder Karte.",
    summaryOneBox: (boxLabel) => `1 × Karton ${boxLabel}`,
    summaryManyBoxes: (n, boxLabel) => `${n} × Kartons ${boxLabel}`,
    summaryWeight: (kg) => `${kg} kg`,
    checkThisWithUs: "Bei uns nachfragen",
    check: "Nachfragen",
    estimatedAllIn: "geschätzt, alles inklusive",
    shippingYouPayUs: "Versand — Sie zahlen an uns",
    dutyMayCharge: "Zoll — vom Zoll bei Ankunft möglicherweise erhoben",
    customsFinalAssessment: "Die endgültige Festsetzung erfolgt durch den Zoll, nicht durch uns.",
    cheaperByAmount: (amount) => `Das ist der günstigere Versandweg, um ${amount}.`,
    otherOptionSaves: (amount) =>
      `Die andere Option würde etwa ${amount} sparen — ein Blick wert.`,
    bothOptionsSame: "Beide Optionen kommen hier etwa gleich aus.",
    footnote: (destination, dataAsOf) =>
      `Der Versandpreis deckt ab, was wir übernehmen — Berlin nach ${destination}, in unserem eigenen konsolidierten Container. Die Zollgebühr ist gesondert: Sie wird vom libanesischen Zoll bei Ankunft erhoben, nicht von uns, und wir haben sie anhand des Paketgewichts zu dem unterstellten Wert geschätzt, den der Zoll auf persönliche Gegenstände anwendet. Die Zollsätze stammen vom ${dataAsOf} und müssen erneut bestätigt werden, und der Zoll trifft die endgültige Festsetzung am Tag der Ankunft. Dies ist eine Schätzung, kein Angebot, und wir nehmen noch keine Buchungen an.`,
    whatsappMessage: ({ destination, summary, categoryLabel, shipping, duty }) =>
      `Hallo, ich habe den Rechner auf Ihrer Website benutzt. Privates Paket nach ${destination}, ${summary}, ${categoryLabel}. Versand ${shipping}, geschätzter Zoll ${duty}. Können Sie das bestätigen?`,
  },

  businessCalculator: {
    readThisFirst: "Zuerst lesen — zwei Regeln entscheiden über Ihre Kosten",
    usedGoodsTag: "Gebrauchte Waren",
    usedGoodsBody: [
      { text: "Besteuert " },
      { text: "nach Gewicht", strong: true },
      {
        text: ". Der Zoll setzt einen unterstellten Wert pro Kilo an, der tatsächliche Warenwert ändert also nichts. Der deklarierte Wert wird nicht berücksichtigt.",
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
      `Die Fracht wird in beiden Fällen nach Gewicht berechnet, und die Abfertigung ist eine Pauschalgebühr pro Sendung. Dies ist eine Schätzung, kein Angebot — die Sätze stammen vom ${dataAsOf} und müssen erneut bestätigt werden. Die endgültige Zollfestsetzung erfolgt durch den libanesischen Zoll, nicht durch uns, und wir nehmen noch keine Buchungen an.`,
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
      `Deaktiviert, weil ${categoryLabel} zu einem unterstellten Wert pro Kilo veranlagt werden. Eine Änderung dieser Zahl würde den Zoll nicht beeinflussen, daher gilt sie hier nicht.`,
    checkThisWithUs: "Bei uns nachfragen",
    check: "Nachfragen",
    estimatedTotal: "Geschätzter Gesamtbetrag",
    whatsappMessage: ({ destination, categoryLabel, weight, declaredValue, rangeLow, rangeHigh }) =>
      `Hallo, ich habe den Geschäftsrechner auf Ihrer Website benutzt. ${destination}, ${categoryLabel}, ~${weight} kg${
        declaredValue ? `, deklariert ${declaredValue}` : ""
      }. Geschätzt ${rangeLow}–${rangeHigh}. Können Sie das bestätigen?`,
  },

  signup: {
    backToHome: "← Zur Startseite",
    createAccountEyebrow: "Konto erstellen",
    whatSigningUpFor: "Wofür möchten Sie sich registrieren?",
    whatSigningUpForBody:
      "Eine Sendung aufgeben und Produkte beschaffen erfordern völlig unterschiedliche Angaben, daher stellen die beiden Wege unterschiedliche Fragen.",
    privateTag: "Versand",
    privateTitle: "Privat",
    privateBody: "Versand persönlicher oder Haushaltsgegenstände an Familie.",
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
          { id: "senderCity", label: "Ort und Postleitzahl" },
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
