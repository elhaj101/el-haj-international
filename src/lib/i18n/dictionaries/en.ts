import type { Dictionary } from "../dictionary";

const en: Dictionary = {
  meta: {
    title: "El Haj International — Shipping & Trading",
    description:
      "Shipping and trading between Europe and the Middle East. Consolidated container freight and sourcing.",
  },

  nav: {
    howItWorks: "How it works",
    pricing: "Pricing",
    calculator: "Calculator",
    signUp: "Sign up",
    languageSwitcher: "Change language",
  },

  hero: {
    headlineLine1: "Send anything",
    headlineLine2: "from Europe",
    headlineLine3Lead: "to",
    destinationName: "Lebanon",
    subtitle: [
      { text: "Consolidated container shipping and trading between " },
      {
        text: "Europe",
        strong: true,
        rotateThrough: [
          "Germany",
          "France",
          "the Netherlands",
          "Belgium",
          "Italy",
          "Spain",
          "Sweden",
          "Denmark",
          "Austria",
          "Poland",
        ],
      },
      { text: " and " },
      { text: "the Middle East", strong: true },
      { text: "." },
    ],
    chatWithUs: "Chat with us",
    chatWhatsappMessage:
      "Hi, I found El Haj International and I'd like to ask about shipping.",
    estimateShipment: "Estimate a shipment",
  },

  statement: {
    eyebrow: "What we do",
    headline: "We send both personal parcels and business cargo",
  },

  marquee: {
    words: [
      "Sea freight",
      "Consolidation",
      "Customs clearance",
      "Door to door",
      "Sourcing",
      "Groupage",
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    steps: [
      {
        title: "Use the calculator",
        body: "Pick your destination and shipment type. Instant price — no forms, no account.",
      },
      {
        title: "Send us your order",
        body: "Tap the inquiry button and send your details on WhatsApp. We confirm the final cost.",
      },
      {
        title: "Wait for our driver",
        body: "We handle pickup, shipping and customs clearance. Your parcel arrives at the door.",
      },
    ],
    scrubberLabel: "Drag to revisit the steps",
    prevStep: "Previous step",
    nextStep: "Next step",
  },

  calculatorPromo: {
    eyebrow: "Pricing",
    headline: "Know the price before you ship.",
    subtitle: "Freight, duty and fees — one estimate, no commitment.",
    openCalculator: "Open the calculator",
    personalTag: "Shipping",
    personalTitle: "Personal parcel",
    personalBlurb: "Boxes to family — one flat price",
    businessTag: "Trading",
    businessTitle: "Business shipment",
    businessBlurb: "Commercial stock — freight, clearance and duty",
    startEstimate: "Start estimate",
  },

  closingCTA: {
    eyebrow: "Get started",
    headline: "Customer service and consultation — free",
    subtitle:
      "No forms and no account needed to ask. Message us and we will tell you what it costs and what is involved.",
    personalParcelsLabel: "Personal parcels",
    personalParcelsMessage:
      "Hi, I'd like to ship something from Europe to the Middle East.",
    businessInquiryLabel: "Business inquiry",
    businessInquiryMessage:
      "Hi, I'm a business looking to source and trade products. Can we talk?",
  },

  footer: {
    tagline:
      "Consolidated container shipping and trading between Europe and the Middle East. Based in Hamburg, Germany.",
    calculator: "Calculator",
    signUp: "Sign up",
    devNotice:
      "Site in development. El Haj International is not yet registered as a licensed freight forwarder — quotes shown are indicative and no bookings are being taken.",
  },

  preloader: {
    percentSign: "%",
  },

  redirect: {
    message: "Taking you to the English site…",
    linkText: "Continue",
  },

  calculatorPage: {
    backToHome: "← Back to home",
    shippingEstimateEyebrow: "Shipping estimate",
    whereHeadline: "Where is it going?",
    whereBody:
      "Every country taxes imports differently, so the estimate starts with the destination.",
    startEstimate: "Start estimate",
    onlyDestinationNotice:
      "Lebanon is the only destination here for now — it is the only corridor we have full customs data for. Adding a country means researching its duty tables properly, not just adding it to a list.",
    shippingToEyebrow: "Shipping to",
    change: "Change",
    profileTabsLabel: "What kind of shipment",
    personalTitle: "Personal parcel",
    personalBlurb: "Boxes to family — one flat price",
    businessTitle: "Business shipment",
    businessBlurb: "Commercial stock — freight, clearance and duty",
  },

  destinations: {
    LB: { name: "Lebanon", gateway: "Port of Beirut" },
  },

  cargoCategories: {
    "used-household": {
      label: "Used household goods",
      blurb: "Furniture, kitchenware, personal effects",
      caveat:
        "Carries a 3-year no-resale undertaking in Lebanon. Not suitable for anyone restocking a shop.",
    },
    "used-clothing": {
      label: "Used clothing",
      blurb: "Worn garments and textiles (HS 6309.00)",
      caveat:
        'This line carries an "EC" government control we could not fully identify — confirm with a broker before shipping at volume.',
    },
    "used-appliances": {
      label: "Appliances (used)",
      blurb: "Duty free with the correct documents",
      caveat:
        "FIDI's own prohibited-items list contradicts this row for battery and domestic appliances. Needs a direct answer from a broker.",
    },
    computers: {
      label: "Computers & laptops",
      blurb: "Duty free — VAT and security fee only",
    },
    apparel: {
      label: "Clothing & apparel (new)",
      blurb: "New garments",
    },
    phones: {
      label: "Mobile phones",
      blurb: "Handsets and tablets",
    },
    watches: {
      label: "Watches",
      blurb: "Wristwatches and clocks",
    },
    shoes: {
      label: "Shoes",
      blurb: "Footwear, new",
      caveat:
        "A floor of 7,500 LL per pair applies, which can exceed the percentage duty on cheap footwear.",
    },
    bags: {
      label: "Handbags & luggage",
      blurb: "Bags and cases",
      caveat: "A floor of 4,500 LL per piece applies.",
    },
    "appliances-new": {
      label: "Appliances (new)",
      blurb: "White goods and small appliances",
    },
    perfume: {
      label: "Perfume",
      blurb: "Perfumes and toilet waters",
    },
    cosmetics: {
      label: "Cosmetics & makeup",
      blurb: "A common diaspora request from German drugstores",
    },
    linens: {
      label: "Linens & towels",
      blurb: "Bedsheets, towels, household textiles",
      caveat: "A floor of 3,375 LL applies.",
    },
    "furniture-new": {
      label: "Furniture (new)",
      blurb: "New furniture and household articles",
    },
    commercial: {
      label: "Commercial stock",
      blurb: "Goods imported to be resold",
      caveat:
        "Declared commercially. Requires a legalised commercial invoice and a certificate of origin, which personal-effects shipments do not.",
    },
  },

  pricingSentences: {
    personalDutyFree: ({ categoryLabel, securityFeePct, deemedEurPerKg, weightKg }) =>
      `${categoryLabel} come in duty free — this is the ${securityFeePct} security fee only, on a deemed value of ${deemedEurPerKg} EUR/kg for ~${weightKg} kg.`,
    personalDutyCharged: ({
      weightKg,
      deemedEurPerKg,
      dutyPct,
      categoryLabel,
      securityFeePct,
    }) =>
      `~${weightKg} kg at a deemed value of ${deemedEurPerKg} EUR/kg, charged at ${dutyPct} for ${categoryLabel.toLowerCase()} plus a ${securityFeePct} security fee.`,
    personalDutyUnspecified: ({
      securityFeePct,
      deemedEurPerKg,
      weightKg,
      unspecifiedDutyPct,
    }) =>
      `You haven't told us what's inside yet, so this uses a standard placeholder rate of ${unspecifiedDutyPct} on a deemed value of ${deemedEurPerKg} EUR/kg for ~${weightKg} kg, plus the ${securityFeePct} security fee. Pick what you're sending above for a closer estimate.`,
    personalBasisOneBox: ({ boxLabel, priceEur }) =>
      `One ${boxLabel} box at a flat ${priceEur}. The price is the same whatever it weighs.`,
    personalBasisManyBoxes: ({ numBoxes, boxLabel, priceEur }) =>
      `${numBoxes} × ${boxLabel} boxes at a flat ${priceEur} each. The price is the same whatever it weighs.`,
    personalBasisMixedSizes: ({ breakdown }) =>
      `${breakdown} — each size at its own flat price, whatever it weighs.`,
    personalBasisPerKg: ({ weightKg, perKgEur }) =>
      `${weightKg} kg at a flat ${perKgEur} per kilo.`,
    personalAlternativeFromBoxes: ({
      boxLabel,
      typicalKg,
      numBoxes,
      weightKg,
      altEur,
      perKgEur,
    }) =>
      `A normally packed ${boxLabel} box holds about ${typicalKg} kg, so ${
        numBoxes === 1 ? "this" : "these"
      } would be roughly ${weightKg} kg — ${altEur} at ${perKgEur}/kg.`,
    personalAlternativeFromWeight: ({ boxesNeeded, boxLabel, altEur }) =>
      `That weight normally fills about ${boxesNeeded} ${boxLabel} box${
        boxesNeeded === 1 ? "" : "es"
      } — ${altEur} at the flat box price.`,
    personalAlternativeFromMixedBoxes: ({ totalBoxes, weightKg, altEur, perKgEur }) =>
      `Those ${totalBoxes} boxes come to roughly ${weightKg} kg — ${altEur} at ${perKgEur}/kg.`,
    businessDutyByWeight: ({ deemedEurPerKg, chargeableKg, dutyPct, securityFeePct }) =>
      `Assessed on a deemed value of ${deemedEurPerKg} EUR/kg (${chargeableKg} kg), at ${dutyPct} duty + ${securityFeePct} security fee. What the goods are actually worth does not change this figure.`,
    businessDutyByValue: ({
      valueEur,
      dutyPct,
      vatPct,
      securityFeePct,
      categoryLabel,
    }) =>
      `Assessed on declared value (${valueEur}) at ${dutyPct} duty + ${vatPct} VAT + ${securityFeePct} security fee for ${categoryLabel.toLowerCase()}.`,
  },

  personalCalculator: {
    howToPay: "How do you want to pay?",
    howToPayBody:
      "A flat price per box whatever it weighs, or a flat price per kilo. Pick whichever suits what you are sending — the estimate below shows what the other one would cost.",
    byTheBox: "By the box",
    byTheKilo: (perKg) => `By the kilo · ${perKg}/kg`,
    boxSize: "Box size",
    holdsAbout: (kg) => `holds ~${kg} kg`,
    drawnToScale:
      "drawn to scale — the three sizes are shown in real proportion to each other",
    scaleModelLabel: (boxLabel, w, d, h) =>
      `Scale model of the ${boxLabel} box, ${w} by ${d} by ${h} centimetres`,
    howManyBoxes: "How many boxes",
    oneBox: "1 box",
    nBoxes: (n) => `${n} boxes`,
    sendingMoreThan: (max) =>
      `Sending more than ${max}? Message us — at that size it is worth pricing properly rather than by the box.`,
    decrementBoxLabel: (boxLabel) => `One fewer ${boxLabel} box`,
    incrementBoxLabel: (boxLabel) => `One more ${boxLabel} box`,
    totalWeight: "Total weight",
    kgUnit: (n) => `${n} kg`,
    chargedOnActualWeight: (perKg) =>
      `Charged on actual weight at a flat ${perKg} per kilo, whatever the boxes are.`,
    whatsInIt: "What are you sending?",
    whatsInItBody:
      "This does not change the shipping price. It sets the rate Lebanese customs may charge on arrival. Pick as many as apply — leave it blank and we'll assume a standard placeholder rate.",
    chooseWhatsInside: "Choose what's inside",
    itemsChosenEdit: (n) => `${n} item${n === 1 ? "" : "s"} chosen — edit`,
    doneChoosing: "Done",
    removeItem: (label) => `Remove ${label}`,
    contentsNotSpecified: "contents not specified",
    summaryOneBox: (boxLabel) => `1 × ${boxLabel} box`,
    summaryManyBoxes: (n, boxLabel) => `${n} × ${boxLabel} boxes`,
    summaryMixedBoxes: (breakdown) => `${breakdown} boxes`,
    summaryWeight: (kg) => `${kg} kg`,
    checkThisWithUs: "Check this with us",
    check: "Check",
    estimatedAllIn: "estimated all-in",
    shippingYouPayUs: "Shipping — you pay us",
    dutyMayCharge: "Duty — customs may charge on arrival",
    customsFinalAssessment: "Customs make the final assessment, not us.",
    cheaperByAmount: (amount) => `This is the cheaper way to ship it, by ${amount}.`,
    otherOptionSaves: (amount) =>
      `The other option would save you about ${amount} — worth a look.`,
    bothOptionsSame: "Both options come out about the same here.",
    footnote: (destination, dataAsOf) =>
      `The shipping price covers what we handle — Berlin to ${destination}, on our own consolidated container. The duty figure is separate: it is charged by Lebanese customs on arrival, not by us, and we have estimated it from the parcel's weight at the deemed value customs applies to personal effects. Customs rates here date from ${dataAsOf} and need re-confirmation, and customs make the final assessment on the day. This is an estimate, not a quote, and we are not taking bookings yet.`,
    whatsappMessage: ({ destination, summary, categoryLabel, shipping, duty }) =>
      `Hi, I used the calculator on your site. Personal parcel to ${destination}, ${summary}, ${categoryLabel.toLowerCase()}. Shipping ${shipping}, estimated duty ${duty}. Can you confirm?`,
  },

  businessCalculator: {
    readThisFirst: "Read this first — two rules decide your cost",
    usedGoodsTag: "Used goods",
    usedGoodsBody: [
      { text: "Taxed " },
      { text: "by weight", strong: true },
      {
        text: ". Customs applies a deemed value per kilo, so what the contents are actually worth changes nothing. Declared value is ignored.",
      },
    ],
    newGoodsTag: "New goods",
    newGoodsBody: [
      { text: "Taxed " },
      { text: "by value", strong: true },
      {
        text: ", at a rate set by the commodity — laptops come in duty free, perfume and cosmetics are among the heaviest.",
      },
    ],
    footnote: (dataAsOf) =>
      `Freight is charged on weight in both cases, and clearance is a flat fee per consignment. This is an estimate, not a quote — rates here date from ${dataAsOf} and need re-confirmation. Final duty is assessed by Lebanese customs, not by us, and we are not taking bookings yet.`,
    whatAreYouSending: "What are you sending?",
    whatAreYouSendingBody:
      "Lebanese customs charges a different rate for every commodity. Pick the closest match — the percentage shown is its duty rate.",
    taxedByWeight: "Taxed by weight",
    taxedByValue: "Taxed by value",
    sets: "Sets",
    freight: "Freight",
    duty: "Duty",
    clearance: "Clearance",
    weight: "Weight",
    kgUnit: (n) => `${n} kg`,
    minimumChargeable: (minKg) =>
      `Minimum chargeable weight is ${minKg} kg, so this is priced as ${minKg} kg.`,
    declaredValue: "Declared value",
    notUsed: "Not used",
    dutyFollowsValue: (categoryLabel, dutyPct, vatPct, securityPct) =>
      `Duty on ${categoryLabel.toLowerCase()} follows what the goods are worth, at ${dutyPct} plus ${vatPct} VAT and ${securityPct} security fee.`,
    switchedOffBecause: (categoryLabel) =>
      `Switched off because ${categoryLabel.toLowerCase()} are assessed on a deemed value per kilo. Changing this figure could not change the duty, so it does not apply here.`,
    checkThisWithUs: "Check this with us",
    check: "Check",
    estimatedTotal: "Estimated total",
    whatsappMessage: ({ destination, categoryLabel, weight, declaredValue, rangeLow, rangeHigh }) =>
      `Hi, I used the business calculator on your site. ${destination}, ${categoryLabel.toLowerCase()}, ~${weight} kg${
        declaredValue ? `, declared ${declaredValue}` : ""
      }. Estimated ${rangeLow}–${rangeHigh}. Can you confirm?`,
  },

  signup: {
    backToHome: "← Back to home",
    createAccountEyebrow: "Create an account",
    whatSigningUpFor: "What are you signing up for?",
    whatSigningUpForBody:
      "Sending a shipment and sourcing products need completely different things from you, so the two routes ask different questions.",
    privateTag: "Shipping",
    privateTitle: "Private",
    privateBody: "Sending personal or household goods to family.",
    businessTag: "Trading",
    businessTitle: "Business",
    businessBody: "Sourcing products or placing a trade order.",
    start: "Start",
    stepOf: (step, total) => `Step ${step} of ${total}`,
    optional: "optional",
    chooseFile: "Choose a file",
    fileTypesHint: "JPG, PNG or PDF.",
    notUploadedNotice:
      "This document is not uploaded. We have no account system yet, so nothing leaves your device — you will send it in the chat at the last step.",
    lastStep: "Last step",
    checkAndSend: "Check and send",
    checkAndSendBody: (withId) =>
      `Copy the summary below and send it to us on WhatsApp${
        withId ? ", along with your ID document" : ""
      }. We reply with what it costs and what happens next.`,
    copySummary: "Copy summary",
    copied: "Copied ✓",
    copyFailed: "Could not copy — select the text and copy manually.",
    openWhatsapp: "Open WhatsApp",
    back: "Back",
    next: "Next",
    review: "Review",
    footerNotice:
      "Nothing you type here is stored or sent anywhere until you choose to message us. El Haj International is not yet a licensed freight forwarder and is not taking bookings — this sign-up starts a conversation, it does not open an account.",
    validation: {
      required: "Required.",
      invalidEmail: "That does not look like an email address.",
      invalidPhone: "That does not look like a phone number.",
      chooseFileError: "Please choose a file.",
    },
    privateSteps: [
      {
        title: "Your details",
        blurb: "The person sending the shipment.",
        fields: [
          { id: "senderName", label: "Full name" },
          { id: "senderEmail", label: "Email" },
          { id: "senderPhone", label: "Phone / WhatsApp" },
          { id: "senderAddress", label: "Street and number" },
          { id: "senderCity", label: "City and postcode" },
        ],
      },
      {
        title: "Who is receiving it",
        blurb:
          "Customs treats each recipient as the importer of their own consignment, so this has to be the actual person taking delivery.",
        fields: [
          { id: "consigneeName", label: "Recipient's full name" },
          {
            id: "consigneeId",
            label: "Recipient's ID number",
            hint: "Required by Lebanese customs for the declaration.",
          },
          { id: "consigneePhone", label: "Recipient's phone" },
          { id: "consigneeAddress", label: "Delivery address" },
          { id: "consigneeCity", label: "City / region" },
        ],
      },
      {
        title: "Identity document",
        blurb: "A passport or ID card page for the sender.",
        fields: [
          { id: "idDocument", label: "Choose a file", hint: "JPG, PNG or PDF." },
        ],
      },
    ],
    businessSteps: [
      {
        title: "Company details",
        fields: [
          { id: "companyName", label: "Company name" },
          { id: "contactPerson", label: "Contact person" },
          { id: "companyRole", label: "Role" },
          { id: "companyEmail", label: "Email" },
          { id: "companyPhone", label: "Phone / WhatsApp" },
        ],
      },
      {
        title: "Verification",
        blurb: "Any one of these is enough — we just need to see that the business is real.",
        fields: [
          {
            id: "verification",
            label: "Website, company email domain, or VAT / trade register number",
            hint: "One is enough. You do not need to provide all three.",
          },
        ],
      },
      {
        title: "What you are looking for",
        blurb: "The more specific you are, the faster we can quote.",
        fields: [
          { id: "product", label: "Product or commodity" },
          { id: "quantity", label: "Quantity or order volume" },
          { id: "preferences", label: "Quality and packaging preferences" },
          {
            id: "shelfLife",
            label: "Best-before / shelf-life requirements",
            hint: "Leave blank if it does not apply.",
          },
          { id: "notes", label: "Anything else" },
        ],
      },
    ],
    privateWhatsappMessage: "Hi, I've filled in the sign-up form on your site. Sending my details now.",
    businessWhatsappMessage:
      "Hi, I've filled in the business sign-up form on your site. Sending my details now.",
    summaryHeaderPrivate: "EL HAJ INTERNATIONAL — PRIVATE / SHIPPING SIGN-UP",
    summaryHeaderBusiness: "EL HAJ INTERNATIONAL — BUSINESS / TRADING SIGN-UP",
  },
};

export default en;
