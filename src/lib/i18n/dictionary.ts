/**
 * The shape every locale dictionary must satisfy. One file per locale
 * (en.ts / ar.ts / de.ts) implements this in full — TypeScript's structural
 * checking means a missing or mistyped key fails `tsc`, not a silent blank
 * spot on the page.
 *
 * A handful of English sentences wrap one phrase in <strong> mid-sentence
 * (Hero's "between **Europe** and **the Middle East**", BusinessCalculator's
 * "Taxed **by weight**" / "**by value**"). Word order isn't guaranteed to
 * survive translation, so those specific fields are arrays of segments
 * instead of one string — each locale supplies its own segments, in
 * whatever order that language actually reads in. Everything else is a
 * plain string.
 */

/** A run of text, optionally emphasised — renders as <strong> when `strong`
    is true. Concatenating `text` across all segments must reproduce the
    plain-text sentence (used for anywhere a plain string is required, like
    an aria-label). */
export interface RichSegment {
  text: string;
  strong?: boolean;
  /**
   * Turns this segment into a word that cycles. `text` is the resting word
   * shown first; the page then rotates through these in turn, each in its
   * own colour, and loops back to `text`.
   *
   * Per-locale rather than one shared list of country codes, because the
   * substitution is grammatical, not lexical. German "zwischen" governs the
   * dative, so "die Niederlande" has to appear as "den Niederlanden" in this
   * sentence and nowhere else; English wants the article on "the
   * Netherlands" but not on "Germany". A shared list would force every
   * locale to accept whatever case and article the first one happened to
   * need.
   */
  rotateThrough?: string[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };

  nav: {
    howItWorks: string;
    pricing: string;
    calculator: string;
    signUp: string;
    /** Announces the language switcher to screen readers. */
    languageSwitcher: string;
  };

  hero: {
    /** Three short lines, matching the three `.line-mask` wrappers in
        Hero.tsx — kept short deliberately (see that file's own comment on
        why long lines risk an unplanned wrap at this display size). */
    headlineLine1: string;
    headlineLine2: string;
    /** The word immediately before "Lebanon" + the flag, e.g. English "to".
        Rendered directly before the destination name, so keep it a single
        short connector word/phrase with a trailing space if the language
        needs one before the country name. */
    headlineLine3Lead: string;
    destinationName: string;
    subtitle: RichSegment[];
    chatWithUs: string;
    chatWhatsappMessage: string;
    estimateShipment: string;
  };

  statement: {
    eyebrow: string;
    headline: string;
  };

  marquee: {
    words: string[];
  };

  howItWorks: {
    eyebrow: string;
    steps: {
      title: string;
      body: string;
    }[];
    /** Accessible name for the container mark once it becomes a slider —
        after the scroll-jack retires, it is the control for revisiting
        steps, so it needs a name a screen reader can announce. */
    scrubberLabel: string;
    /** aria-labels for the mobile-only prev/next buttons that flank the
        rail — the visible control is an unlabelled chevron, so these carry
        the whole accessible name. */
    prevStep: string;
    nextStep: string;
  };

  calculatorPromo: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    openCalculator: string;
    personalTag: string;
    personalTitle: string;
    personalBlurb: string;
    businessTag: string;
    businessTitle: string;
    businessBlurb: string;
    startEstimate: string;
  };

  closingCTA: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    personalParcelsLabel: string;
    personalParcelsMessage: string;
    businessInquiryLabel: string;
    businessInquiryMessage: string;
  };

  footer: {
    tagline: string;
    calculator: string;
    signUp: string;
    devNotice: string;
  };

  preloader: {
    /** Percent sign shown after the counting number — usually just "%", but
        kept translatable since some locales place it differently. */
    percentSign: string;
  };

  /** The redirect shell at the unprefixed root routes (/, /calculator,
      /signup) — seen for a fraction of a second at most, so kept minimal.
      English only in practice (this page redirects before anyone reads it),
      but every locale's own phrase is here for the no-JS fallback link. */
  redirect: {
    message: string;
    linkText: string;
  };

  calculatorPage: {
    backToHome: string;
    shippingEstimateEyebrow: string;
    whereHeadline: string;
    whereBody: string;
    startEstimate: string;
    onlyDestinationNotice: string;
    shippingToEyebrow: string;
    change: string;
    profileTabsLabel: string;
    personalTitle: string;
    personalBlurb: string;
    businessTitle: string;
    businessBlurb: string;
  };

  /** Destination names, keyed by the id in pricing.ts's DESTINATIONS. */
  destinations: Record<string, { name: string; gateway: string }>;

  /** Display strings for pricing.ts's CARGO_CATEGORIES, keyed by category
      id. Kept separate from the numeric data (id/basis/duty) in pricing.ts
      itself, which stays 100% language-independent. */
  cargoCategories: Record<
    string,
    { label: string; blurb: string; caveat?: string }
  >;

  /** Sentence templates for the numbers pricing.ts computes. pricing.ts
      never hardcodes language — every function that builds a user-facing
      explanation takes one of these as a parameter and calls it with the
      already-computed numbers. Pre-formatted number/percent/currency
      strings are passed in already localized (via format.ts's eur()/pct()),
      so these only handle word order and connecting words. */
  pricingSentences: {
    /** category.duty === 0 branch of personalDuty(). */
    personalDutyFree: (p: {
      categoryLabel: string;
      securityFeePct: string;
      deemedEurPerKg: string;
      weightKg: number;
    }) => string;
    /** category.duty > 0 branch of personalDuty(). */
    personalDutyCharged: (p: {
      weightKg: number;
      deemedEurPerKg: string;
      dutyPct: string;
      /** Raw label, not pre-lowercased — German capitalizes nouns anywhere
          in a sentence, so "lowercase mid-sentence" is an English-specific
          styling choice each locale's own template applies (or doesn't). */
      categoryLabel: string;
      securityFeePct: string;
    }) => string;
    /** categoryId === undefined branch of personalDuty() — sender left the
        "what are you sending" list empty. */
    personalDutyUnspecified: (p: {
      securityFeePct: string;
      deemedEurPerKg: string;
      weightKg: number;
      unspecifiedDutyPct: string;
    }) => string;
    /** calculatePersonalQuote(), boxes mode, exactly one box. */
    personalBasisOneBox: (p: { boxLabel: string; priceEur: string }) => string;
    /** calculatePersonalQuote(), boxes mode, more than one box. */
    personalBasisManyBoxes: (p: {
      numBoxes: number;
      boxLabel: string;
      priceEur: string;
    }) => string;
    /** calculatePersonalQuote(), boxes mode, more than one size selected.
        `breakdown` is a pre-joined "N × size" list (box labels are size
        codes like M/L/XXL, not words, so no per-locale plural agreement
        is needed on it). */
    personalBasisMixedSizes: (p: { breakdown: string }) => string;
    /** calculatePersonalQuote(), per-kilo mode. */
    personalBasisPerKg: (p: { weightKg: number; perKgEur: string }) => string;
    /** "what the same parcel would cost the other way" — from boxes mode,
        exactly one size selected. */
    personalAlternativeFromBoxes: (p: {
      boxLabel: string;
      typicalKg: number;
      numBoxes: number;
      weightKg: number;
      altEur: string;
      perKgEur: string;
    }) => string;
    /** Same comparison, boxes mode with more than one size selected —
        no single "typical box" to anchor the sentence to. */
    personalAlternativeFromMixedBoxes: (p: {
      totalBoxes: number;
      weightKg: number;
      altEur: string;
      perKgEur: string;
    }) => string;
    /** Same comparison, from per-kilo mode. */
    personalAlternativeFromWeight: (p: {
      boxesNeeded: number;
      boxLabel: string;
      altEur: string;
    }) => string;
    /** calculateQuote(), weight-basis category. */
    businessDutyByWeight: (p: {
      deemedEurPerKg: string;
      chargeableKg: number;
      dutyPct: string;
      securityFeePct: string;
    }) => string;
    /** calculateQuote(), value-basis category. */
    businessDutyByValue: (p: {
      valueEur: string;
      dutyPct: string;
      vatPct: string;
      securityFeePct: string;
      /** Raw label — see personalDutyCharged's note on why this isn't
          pre-lowercased. */
      categoryLabel: string;
    }) => string;
  };

  personalCalculator: {
    howToPay: string;
    howToPayBody: string;
    byTheBox: string;
    byTheKilo: (perKg: string) => string;
    /** "Where are you shipping from?" — label for the country dropdown,
        decides the shipping zone together with state below. */
    shippingFrom: string;
    /** Display names for euCountries.ts's EU_COUNTRIES list, keyed by
        country id (ISO 3166-1 alpha-2) — every id in that file must have
        an entry here, in every locale. */
    euCountryNames: Record<string, string>;
    /** State dropdown, repopulated from the selected country's own state
        list (euCountries.ts) — for Germany this decides pickup vs
        domestic-DHL pricing (see isBerlinBrandenburgState in pricing.ts).
        State names themselves are not localized — see the comment atop
        euCountries.ts for why. */
    state: string;
    /** Disabled placeholder option shown before a state is picked. */
    selectState: string;
    /** Status line under the state field once it resolves to the pickup
        zone (Berlin/Brandenburg). */
    pickupZoneNote: string;
    /** Same, for a German state outside Berlin/Brandenburg. */
    dhlZoneNote: string;
    /** Shown in place of the state dropdown for every non-Germany country —
        discloses that the EU-DHL rate folded into the box price is Deutsche
        Post's own outbound-from-Germany price, used as a stand-in for the
        reverse direction, not a rate sourced for this specific corridor. */
    euDhlApproximationNote: string;
    /** Shown next to the XXL box row outside the pickup zone — it cannot
        ship there at all, see BOX_SIZES in pricing.ts. */
    xxlPickupOnly: string;
    boxSize: string;
    holdsAbout: (kg: number) => string;
    drawnToScale: string;
    /** aria-label for the 3D box model. */
    scaleModelLabel: (boxLabel: string, w: number, d: number, h: number) => string;
    howManyBoxes: string;
    oneBox: string;
    nBoxes: (n: number) => string;
    sendingMoreThan: (max: number) => string;
    /** Aria-labels for the per-size quantity stepper's − / + buttons. */
    decrementBoxLabel: (boxLabel: string) => string;
    incrementBoxLabel: (boxLabel: string) => string;
    totalWeight: string;
    kgUnit: (n: number) => string;
    chargedOnActualWeight: (perKg: string) => string;
    whatsInIt: string;
    whatsInItBody: string;
    /** Trigger label, collapsed, nothing picked yet. */
    chooseWhatsInside: string;
    /** Trigger label, collapsed, n items picked — reopens the list. */
    itemsChosenEdit: (n: number) => string;
    /** Trigger label, expanded — closes the list. */
    doneChoosing: string;
    /** Remove-chip button aria-label. */
    removeItem: (label: string) => string;
    /** Stands in for categoryLabel in the WhatsApp message when the sender
        left the "what are you sending" list empty. */
    contentsNotSpecified: string;
    summaryOneBox: (boxLabel: string) => string;
    summaryManyBoxes: (n: number, boxLabel: string) => string;
    /** More than one box size selected. `breakdown` is a pre-joined
        "N × size" list, see personalBasisMixedSizes. */
    summaryMixedBoxes: (breakdown: string) => string;
    summaryWeight: (kg: number) => string;
    checkThisWithUs: string;
    check: string;
    estimatedAllIn: string;
    /** Sub-line under shippingYouPayUs, shown only when dhlLabel's amount
        is non-zero (i.e. outside the pickup zone) — the flat pickup-zone
        price (box or per-kilo, whichever mode is active) before the DHL
        leg is added. Mode-neutral on purpose — see basePriceLabel's
        rename from the old boxPriceLabel. */
    basePriceLabel: string;
    /** Same breakdown, the DHL amount itself — full cost pass-through in
        boxes mode, an approximation in per-kilo mode (see
        personalPerKgRateForZone in pricing.ts). */
    dhlLabel: string;
    shippingYouPayUs: string;
    dutyMayCharge: string;
    customsFinalAssessment: string;
    cheaperByAmount: (amount: string) => string;
    otherOptionSaves: (amount: string) => string;
    bothOptionsSame: string;
    footnote: (destination: string, dataAsOf: string) => string;
    /** WhatsApp prefill message, params already localized/formatted. */
    whatsappMessage: (p: {
      destination: string;
      summary: string;
      categoryLabel: string;
      shipping: string;
      duty: string;
    }) => string;
  };

  businessCalculator: {
    readThisFirst: string;
    usedGoodsTag: string;
    usedGoodsBody: RichSegment[];
    newGoodsTag: string;
    newGoodsBody: RichSegment[];
    footnote: (dataAsOf: string) => string;
    whatAreYouSending: string;
    whatAreYouSendingBody: string;
    taxedByWeight: string;
    taxedByValue: string;
    sets: string;
    freight: string;
    duty: string;
    clearance: string;
    weight: string;
    kgUnit: (n: number) => string;
    minimumChargeable: (minKg: number) => string;
    declaredValue: string;
    notUsed: string;
    dutyFollowsValue: (
      categoryLabel: string,
      dutyPct: string,
      vatPct: string,
      securityPct: string,
    ) => string;
    switchedOffBecause: (categoryLabel: string) => string;
    /** Shown under the (reused personalCalculator) country/state fields —
        explains that, unlike the personal calculator's DHL passthrough,
        origin here is context for the inquiry only and does not change
        the freight estimate below; business shipments are arranged
        directly once Ali replies, not auto-priced by zone. */
    shippingFromNote: string;
    checkThisWithUs: string;
    check: string;
    estimatedTotal: string;
    /** WhatsApp prefill message, params already localized/formatted.
        `shipFrom` is the chosen country (plus state, if picked). */
    whatsappMessage: (p: {
      destination: string;
      shipFrom: string;
      categoryLabel: string;
      weight: number;
      declaredValue: string | null;
      rangeLow: string;
      rangeHigh: string;
    }) => string;
  };

  signup: {
    backToHome: string;
    createAccountEyebrow: string;
    whatSigningUpFor: string;
    whatSigningUpForBody: string;
    privateTag: string;
    privateTitle: string;
    privateBody: string;
    businessTag: string;
    businessTitle: string;
    businessBody: string;
    start: string;
    stepOf: (step: number, total: number) => string;
    optional: string;
    chooseFile: string;
    fileTypesHint: string;
    notUploadedNotice: string;
    lastStep: string;
    checkAndSend: string;
    checkAndSendBody: (withId: boolean) => string;
    copySummary: string;
    copied: string;
    copyFailed: string;
    openWhatsapp: string;
    back: string;
    next: string;
    review: string;
    footerNotice: string;
    /** Validation messages. */
    validation: {
      required: string;
      invalidEmail: string;
      invalidPhone: string;
      chooseFileError: string;
    };
    /** The two step-arrays, keyed exactly like PRIVATE_STEPS/BUSINESS_STEPS
        in signup/page.tsx — each step's `fields` mirrors that file's
        `Field[]`, matched by `id`. */
    privateSteps: SignupStep[];
    businessSteps: SignupStep[];
    /** WhatsApp prefill message once the wizard is filled in. */
    privateWhatsappMessage: string;
    businessWhatsappMessage: string;
    /** Summary sheet header, e.g. "EL HAJ INTERNATIONAL — PRIVATE / SHIPPING
        SIGN-UP" — kept translatable since it's copy-pasted verbatim by the
        user, and should read naturally in their language. */
    summaryHeaderPrivate: string;
    summaryHeaderBusiness: string;
  };
}

export interface SignupStep {
  title: string;
  blurb?: string;
  fields: {
    id: string;
    label: string;
    /** Shown under the field when present and there's no validation error. */
    hint?: string;
  }[];
}
