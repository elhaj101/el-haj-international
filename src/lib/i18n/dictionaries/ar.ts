import type { Dictionary } from "../dictionary";

/**
 * Arabic number-noun agreement: 3-10 takes the plural, 11 and up returns to
 * the singular. "15 كراتين" is as visibly wrong to a reader as "15 boxs"
 * would be in English, and the box slider goes to 15 — so this is applied
 * everywhere a box count is interpolated, not left to a single plural form.
 */
const boxWord = (n: number) => (n >= 3 && n <= 10 ? "كراتين" : "كرتونة");

/** Same Arabic number-noun agreement rule as boxWord, for the "what are you
    sending" multi-select list (up to 15 items). */
const itemWord = (n: number) => (n >= 3 && n <= 10 ? "عناصر" : "عنصر");

const ar: Dictionary = {
  meta: {
    // The company name stays in Latin script, as it is on the logo. "El Haj"
    // is already an Arabic name (الحاج) — transliterating it back from its
    // English spelling ("إل حاج") renders an Arabic word through English
    // phonetics, which reads as a foreign brand rather than the family name
    // it actually is.
    title: "El Haj International — شحن وتجارة",
    description:
      "شحن وتجارة بين أوروبا والشرق الأوسط. شحن حاويات مجمّعة وتوريد بضائع.",
  },

  nav: {
    howItWorks: "كيف نعمل",
    pricing: "الأسعار",
    calculator: "حاسبة الأسعار",
    signUp: "إنشاء حساب",
    languageSwitcher: "تغيير اللغة",
  },

  hero: {
    headlineLine1: "أرسل أي شيء",
    headlineLine2: "من أوروبا",
    headlineLine3Lead: "إلى",
    destinationName: "لبنان",
    subtitle: [
      { text: "شحن حاويات مجمّعة وتجارة بين " },
      {
        text: "أوروبا",
        strong: true,
        // بين takes these directly. السويد والدنمارك والنمسا carry ال as
        // part of the name itself — dropping it would read as a common noun,
        // not a country — while the rest take none.
        rotateThrough: [
          "ألمانيا",
          "فرنسا",
          "هولندا",
          "بلجيكا",
          "إيطاليا",
          "إسبانيا",
          "السويد",
          "الدنمارك",
          "النمسا",
          "بولندا",
        ],
      },
      { text: " و" },
      { text: "الشرق الأوسط", strong: true },
      { text: "." },
    ],
    chatWithUs: "راسلنا",
    chatWhatsappMessage:
      "مرحبًا، وجدت موقع El Haj International وأودّ الاستفسار عن الشحن.",
    estimateShipment: "احسب كلفة شحنتك",
  },

  statement: {
    eyebrow: "ماذا نفعل",
    headline: "نشحن الطرود الشخصية والبضائع التجارية",
  },

  marquee: {
    words: [
      "شحن بحري",
      "تجميع الشحنات",
      "تخليص جمركي",
      "من الباب إلى الباب",
      "توريد البضائع",
      "شحن جزئي",
    ],
  },

  howItWorks: {
    eyebrow: "كيف نعمل",
    steps: [
      {
        title: "استخدم الحاسبة",
        body: "اختر الوجهة ونوع الشحنة. سعر فوري — بلا استمارات وبلا حساب.",
      },
      {
        title: "أرسل طلبك",
        body: "اضغط زر الاستفسار وأرسل تفاصيلك عبر WhatsApp. نؤكّد لك الكلفة النهائية.",
      },
      {
        title: "انتظر سائقنا",
        body: "نتولّى الاستلام والشحن والتخليص الجمركي. طردك يصل إلى الباب.",
      },
    ],
    scrubberLabel: "اسحب للرجوع إلى الخطوات",
    prevStep: "الخطوة السابقة",
    nextStep: "الخطوة التالية",
  },

  calculatorPromo: {
    eyebrow: "الأسعار",
    headline: "اعرف السعر قبل أن تشحن.",
    subtitle: "الشحن والرسوم الجمركية والمصاريف — تقدير واحد، بلا التزام.",
    openCalculator: "افتح الحاسبة",
    personalTag: "شحن",
    personalTitle: "طرد شخصي",
    personalBlurb: "كراتين إلى العائلة — سعر ثابت واحد",
    businessTag: "تجارة",
    businessTitle: "شحنة تجارية",
    businessBlurb: "بضائع تجارية — شحن وتخليص ورسوم جمركية",
    startEstimate: "ابدأ التقدير",
  },

  closingCTA: {
    eyebrow: "ابدأ الآن",
    headline: "خدمة العملاء والاستشارة — مجانًا",
    subtitle:
      "لا استمارات ولا حساب — راسلنا وسنخبرك بالكلفة وبكل التفاصيل.",
    personalParcelsLabel: "طرود شخصية",
    personalParcelsMessage: "مرحبًا، أودّ شحن شيء من أوروبا إلى الشرق الأوسط.",
    businessInquiryLabel: "استفسار تجاري",
    businessInquiryMessage:
      "مرحبًا، أنا صاحب عمل وأبحث عن توريد بضائع والتجارة بها. هل يمكننا التحدث؟",
  },

  footer: {
    tagline:
      "شحن حاويات مجمّعة وتجارة بين أوروبا والشرق الأوسط. مقرّنا في هامبورغ، ألمانيا.",
    calculator: "حاسبة الأسعار",
    signUp: "إنشاء حساب",
    devNotice:
      "الموقع قيد التطوير. لم تُسجَّل El Haj International بعد كشركة شحن مرخّصة — الأسعار المعروضة استرشادية، ولا تُقبل أي حجوزات حاليًا.",
  },

  preloader: {
    percentSign: "%",
  },

  redirect: {
    // This redirect always lands on the English site (the default locale),
    // whichever language the visitor came looking for — so the Arabic copy
    // says that rather than claiming it leads to the Arabic version.
    message: "يتم تحويلك إلى النسخة الإنكليزية من الموقع…",
    linkText: "متابعة",
  },

  calculatorPage: {
    backToHome: "→ العودة إلى الصفحة الرئيسية",
    shippingEstimateEyebrow: "تقدير كلفة الشحن",
    whereHeadline: "إلى أين تذهب الشحنة؟",
    whereBody:
      "كل دولة تفرض رسومًا جمركية مختلفة على الواردات، لذا يبدأ التقدير بتحديد الوجهة.",
    startEstimate: "ابدأ التقدير",
    onlyDestinationNotice:
      "لبنان هو الوجهة الوحيدة المتاحة حاليًا — فهو الممرّ الوحيد الذي لدينا بيانات جمركية كاملة عنه. إضافة دولة جديدة تعني دراسة جداول رسومها الجمركية بدقة، لا مجرد إضافتها إلى قائمة.",
    shippingToEyebrow: "الشحن إلى",
    change: "تغيير",
    profileTabsLabel: "نوع الشحنة",
    personalTitle: "طرد شخصي",
    personalBlurb: "كراتين إلى العائلة — سعر ثابت واحد",
    businessTitle: "شحنة تجارية",
    businessBlurb: "بضائع تجارية — شحن وتخليص ورسوم جمركية",
  },

  destinations: {
    LB: { name: "لبنان", gateway: "مرفأ بيروت" },
  },

  cargoCategories: {
    "used-household": {
      label: "أدوات منزلية مستعملة",
      blurb: "أثاث، أدوات مطبخ، أغراض شخصية",
      caveat:
        "يترتّب عليها تعهّد بعدم إعادة البيع في لبنان لمدة ثلاث سنوات. غير مناسبة لمن يريد تجهيز متجر.",
    },
    "used-clothing": {
      label: "ملابس مستعملة",
      blurb: "ملابس ومنسوجات مستعملة (بند جمركي 6309.00)",
      caveat:
        'يخضع هذا البند لقيد حكومي بإشارة "EC" لم نتمكّن من تحديده بدقة — يُرجى مراجعة مخلّص جمركي قبل الشحن بكميات كبيرة.',
    },
    "used-appliances": {
      label: "أجهزة كهربائية (مستعملة)",
      blurb: "معفاة من الرسوم مع المستندات الصحيحة",
      caveat:
        "قائمة FIDI للمواد الممنوعة تتعارض مع هذا البند في ما يخص الأجهزة التي تعمل بالبطارية والأجهزة المنزلية. يحتاج الأمر إلى جواب مباشر من مخلّص جمركي.",
    },
    computers: {
      label: "حواسيب وأجهزة لابتوب",
      blurb: "معفاة من الرسوم — ضريبة القيمة المضافة ورسم الأمان فقط",
    },
    apparel: {
      label: "ملابس جديدة",
      blurb: "قطع ملابس غير مستعملة",
    },
    phones: {
      label: "هواتف محمولة",
      blurb: "هواتف وأجهزة لوحية",
    },
    watches: {
      label: "ساعات",
      blurb: "ساعات يد وساعات حائط",
    },
    shoes: {
      label: "أحذية",
      blurb: "أحذية جديدة",
      caveat:
        "يُطبَّق حدّ أدنى قدره 7,500 ليرة لبنانية للزوج الواحد، وقد يتجاوز نسبة الرسم على الأحذية الرخيصة.",
    },
    bags: {
      label: "حقائب يد وأمتعة",
      blurb: "حقائب يد وحقائب سفر",
      caveat: "يُطبَّق حدّ أدنى قدره 4,500 ليرة لبنانية للقطعة الواحدة.",
    },
    "appliances-new": {
      label: "أجهزة كهربائية (جديدة)",
      blurb: "أجهزة كهرومنزلية كبيرة وصغيرة",
    },
    perfume: {
      label: "عطور",
      blurb: "عطور ومياه تواليت",
    },
    cosmetics: {
      label: "مستحضرات تجميل",
      blurb: "طلب شائع لدى الجالية من الصيدليات الألمانية",
    },
    linens: {
      label: "مفروشات ومناشف",
      blurb: "ملاءات، مناشف، منسوجات منزلية",
      caveat: "يُطبَّق حدّ أدنى قدره 3,375 ليرة لبنانية.",
    },
    "furniture-new": {
      label: "أثاث (جديد)",
      blurb: "أثاث جديد وأغراض منزلية",
    },
    commercial: {
      label: "بضائع تجارية",
      blurb: "بضائع مستوردة لإعادة بيعها",
      caveat:
        "تُصرَّح كبضائع تجارية. تتطلّب فاتورة تجارية مصدَّقة وشهادة منشأ، وهو ما لا تحتاجه شحنات الأغراض الشخصية.",
    },
  },

  pricingSentences: {
    personalDutyFree: ({ categoryLabel, securityFeePct, deemedEurPerKg, weightKg }) =>
      `${categoryLabel} معفاة من الرسوم الجمركية — يُفرض رسم الأمان فقط بنسبة ${securityFeePct}، على قيمة مفترضة قدرها ${deemedEurPerKg} يورو للكيلوغرام، لنحو ${weightKg} كغ.`,
    personalDutyCharged: ({
      weightKg,
      deemedEurPerKg,
      dutyPct,
      categoryLabel,
      securityFeePct,
    }) =>
      `نحو ${weightKg} كغ بقيمة مفترضة قدرها ${deemedEurPerKg} يورو للكيلوغرام، برسم جمركي ${dutyPct} على ${categoryLabel}، إضافةً إلى رسم أمان ${securityFeePct}.`,
    personalDutyUnspecified: ({
      securityFeePct,
      deemedEurPerKg,
      weightKg,
      unspecifiedDutyPct,
    }) =>
      `لم تحدّد بعد محتوى الشحنة، لذا يُستخدم معدّل افتراضي قدره ${unspecifiedDutyPct} على قيمة مفترضة قدرها ${deemedEurPerKg} يورو للكيلوغرام لنحو ${weightKg} كغ، إضافةً إلى رسم أمان ${securityFeePct}. اختر ما تُرسله أعلاه للحصول على تقدير أدق.`,
    personalBasisOneBox: ({ boxLabel, priceEur }) =>
      `كرتونة واحدة مقاس ${boxLabel} بسعر ثابت ${priceEur}. السعر نفسه مهما كان الوزن.`,
    personalBasisManyBoxes: ({ numBoxes, boxLabel, priceEur }) =>
      `${numBoxes} ${boxWord(numBoxes)} مقاس ${boxLabel} بسعر ثابت ${priceEur} للواحدة. السعر نفسه مهما كان الوزن.`,
    personalBasisMixedSizes: ({ breakdown }) =>
      `${breakdown} — لكل مقاس سعره الثابت الخاص، بصرف النظر عن الوزن.`,
    personalBasisPerKg: ({ weightKg, perKgEur }) =>
      `${weightKg} كغ بسعر ثابت ${perKgEur} للكيلوغرام.`,
    personalAlternativeFromBoxes: ({
      boxLabel,
      typicalKg,
      numBoxes,
      weightKg,
      altEur,
      perKgEur,
    }) =>
      `كرتونة ${boxLabel} المعبّأة عادةً تتّسع لنحو ${typicalKg} كغ، لذا ${
        numBoxes === 1 ? "سيكون وزنها" : "سيكون وزنها الإجمالي"
      } نحو ${weightKg} كغ — أي ${altEur} بسعر ${perKgEur} للكيلوغرام.`,
    personalAlternativeFromWeight: ({ boxesNeeded, boxLabel, altEur }) =>
      `هذا الوزن يملأ عادةً نحو ${boxesNeeded} ${boxWord(boxesNeeded)} مقاس ${boxLabel} — أي ${altEur} بسعر الكرتونة الثابت.`,
    personalAlternativeFromMixedBoxes: ({ totalBoxes, weightKg, altEur, perKgEur }) =>
      `${totalBoxes} ${boxWord(totalBoxes)} تزن نحو ${weightKg} كغ إجمالًا — أي ${altEur} بسعر ${perKgEur} للكيلوغرام.`,
    businessDutyByWeight: ({ deemedEurPerKg, chargeableKg, dutyPct, securityFeePct }) =>
      `يُحتسب على أساس قيمة مفترضة قدرها ${deemedEurPerKg} يورو للكيلوغرام (${chargeableKg} كغ)، برسم جمركي ${dutyPct} إضافةً إلى رسم أمان ${securityFeePct}. القيمة الفعلية للبضاعة لا تغيّر هذا الرقم.`,
    businessDutyByValue: ({
      valueEur,
      dutyPct,
      vatPct,
      securityFeePct,
      categoryLabel,
    }) =>
      `يُحتسب على أساس القيمة المصرَّح بها (${valueEur}) برسم جمركي ${dutyPct}، إضافةً إلى ضريبة قيمة مضافة ${vatPct} ورسم أمان ${securityFeePct}، على ${categoryLabel}.`,
  },

  personalCalculator: {
    howToPay: "كيف تريد الدفع؟",
    howToPayBody:
      "سعر ثابت لكل كرتونة مهما كان وزنها، أو سعر ثابت لكل كيلوغرام. اختر ما يناسب شحنتك — ويُظهر التقدير أدناه كلفة الخيار الآخر.",
    byTheBox: "بالكرتونة",
    byTheKilo: (perKg) => `بالكيلوغرام · ${perKg}/كغ`,
    shippingFrom: "من أين ترسل الشحنة؟",
    euCountryNames: {
      AT: "النمسا",
      BE: "بلجيكا",
      BG: "بلغاريا",
      HR: "كرواتيا",
      CY: "قبرص",
      CZ: "التشيك",
      DK: "الدنمارك",
      EE: "إستونيا",
      FI: "فنلندا",
      FR: "فرنسا",
      DE: "ألمانيا",
      GR: "اليونان",
      HU: "المجر",
      IE: "أيرلندا",
      IT: "إيطاليا",
      LV: "لاتفيا",
      LT: "ليتوانيا",
      LU: "لوكسمبورغ",
      MT: "مالطا",
      NL: "هولندا",
      PL: "بولندا",
      PT: "البرتغال",
      RO: "رومانيا",
      SK: "سلوفاكيا",
      SI: "سلوفينيا",
      ES: "إسبانيا",
      SE: "السويد",
    },
    city: "المدينة",
    cityPlaceholder: "مثلاً برلين",
    pickupZoneNote:
      "هذا ضمن برلين/براندنبورغ — سنستلمها بأنفسنا، دون شحن عبر DHL.",
    dhlZoneNote:
      "خارج برلين/براندنبورغ — سترسلها إلينا عبر DHL، وهذا محتسب مسبقًا في سعر الكرتونة أدناه.",
    xxlPickupOnly:
      "متاحة فقط عند الاستلام من برلين/براندنبورغ — ثقيلة جدًا على طرود DHL القياسية.",
    boxSize: "مقاس الكرتونة",
    holdsAbout: (kg) => `تتّسع لنحو ${kg} كغ`,
    drawnToScale: "مرسومة بمقياس دقيق — الأحجام الثلاثة بنسبها الحقيقية",
    scaleModelLabel: (boxLabel, w, d, h) =>
      `نموذج بمقياس رسم لكرتونة ${boxLabel}، ${w} في ${d} في ${h} سنتيمتر`,
    howManyBoxes: "كم كرتونة؟",
    oneBox: "كرتونة واحدة",
    nBoxes: (n) => `${n} ${boxWord(n)}`,
    sendingMoreThan: (max) =>
      `ترسل أكثر من ${max}؟ راسلنا — عند هذا الحجم يستحق الأمر تسعيرًا دقيقًا بدل الاحتساب بالكرتونة.`,
    decrementBoxLabel: (boxLabel) => `إنقاص كرتونة مقاس ${boxLabel}`,
    incrementBoxLabel: (boxLabel) => `إضافة كرتونة مقاس ${boxLabel}`,
    totalWeight: "الوزن الإجمالي",
    kgUnit: (n) => `${n} كغ`,
    chargedOnActualWeight: (perKg) =>
      `يُحتسب على الوزن الفعلي بسعر ثابت ${perKg} للكيلوغرام، بصرف النظر عن الكراتين.`,
    whatsInIt: "ما الذي تُرسله؟",
    whatsInItBody:
      "هذا لا يغيّر سعر الشحن، بل يحدّد النسبة التي قد يفرضها الجمرك اللبناني عند الوصول. اختر كل ما ينطبق — وإن تركته فارغًا، سنفترض معدّلًا افتراضيًا عامًا.",
    chooseWhatsInside: "اختر محتويات الشحنة",
    itemsChosenEdit: (n) => `${n} ${itemWord(n)} مختار — تعديل`,
    doneChoosing: "تم",
    removeItem: (label) => `إزالة ${label}`,
    contentsNotSpecified: "المحتوى غير محدد",
    summaryOneBox: (boxLabel) => `كرتونة واحدة مقاس ${boxLabel}`,
    summaryManyBoxes: (n, boxLabel) => `${n} ${boxWord(n)} مقاس ${boxLabel}`,
    summaryMixedBoxes: (breakdown) => `${breakdown} من الكراتين`,
    summaryWeight: (kg) => `${kg} كغ`,
    checkThisWithUs: "استفسر عن هذا التقدير",
    check: "استفسر",
    estimatedAllIn: "تقدير شامل كل الكلفة",
    shippingYouPayUs: "الشحن — تدفعه لنا",
    dutyMayCharge: "الرسوم الجمركية — قد يفرضها الجمرك عند الوصول",
    customsFinalAssessment: "الجمرك هو من يحدّد التقييم النهائي، لا نحن.",
    cheaperByAmount: (amount) => `هذه الطريقة الأرخص للشحن، بفارق ${amount}.`,
    otherOptionSaves: (amount) =>
      `الخيار الآخر قد يوفّر عليك نحو ${amount} — يستحق النظر.`,
    bothOptionsSame: "الخياران متقاربان في الكلفة هنا.",
    footnote: (destination, dataAsOf) =>
      `سعر الشحن يغطّي ما نتولّاه نحن — من برلين إلى ${destination}، عبر حاويتنا المجمّعة الخاصة. أما الرسم الجمركي فمنفصل: يفرضه الجمرك اللبناني عند الوصول، لا نحن، وقد قدّرناه من وزن الطرد وفق القيمة المفترضة التي يطبّقها الجمرك على الأغراض الشخصية. بيانات الجمارك هنا تعود إلى ${dataAsOf} وتحتاج إلى تأكيد جديد، والجمرك هو من يحدّد التقييم النهائي يوم الوصول. هذا تقدير لا عرض سعر نهائي، ولا نستقبل حجوزات بعد.`,
    whatsappMessage: ({ destination, summary, categoryLabel, shipping, duty }) =>
      `مرحبًا، استخدمت الحاسبة على موقعكم. طرد شخصي إلى ${destination}، ${summary}، ${categoryLabel}. الشحن ${shipping}، والرسوم الجمركية المقدَّرة ${duty}. هل يمكنكم تأكيد ذلك؟`,
  },

  businessCalculator: {
    readThisFirst: "اقرأ هذا أولًا — قاعدتان تحدّدان كلفتك",
    usedGoodsTag: "بضائع مستعملة",
    usedGoodsBody: [
      { text: "تُفرَض الرسوم " },
      { text: "على أساس الوزن", strong: true },
      {
        text: ". يطبّق الجمرك قيمة مفترضة لكل كيلوغرام، فالقيمة الفعلية للمحتويات لا تغيّر شيئًا، والقيمة المصرَّح بها لا تُؤخذ بالاعتبار.",
      },
    ],
    newGoodsTag: "بضائع جديدة",
    newGoodsBody: [
      { text: "تُفرَض الرسوم " },
      { text: "على أساس القيمة", strong: true },
      {
        text: "، بنسبة تتحدّد بحسب نوع البضاعة — أجهزة اللابتوب معفاة من الرسوم، بينما العطور ومستحضرات التجميل من الأعلى رسمًا.",
      },
    ],
    footnote: (dataAsOf) =>
      `يُحتسب الشحن على أساس الوزن في الحالتين، والتخليص رسم ثابت لكل شحنة. هذا تقدير لا عرض سعر نهائي — البيانات هنا تعود إلى ${dataAsOf} وتحتاج إلى تأكيد جديد. التقييم النهائي للرسوم يحدّده الجمرك اللبناني، لا نحن، ولا نستقبل حجوزات بعد.`,
    whatAreYouSending: "ماذا ترسل؟",
    whatAreYouSendingBody:
      "يفرض الجمرك اللبناني نسبة مختلفة لكل نوع بضاعة. اختر الأقرب إلى شحنتك — والنسبة الظاهرة هي نسبة الرسم الجمركي.",
    taxedByWeight: "الرسوم على أساس الوزن",
    taxedByValue: "الرسوم على أساس القيمة",
    sets: "يحدّد",
    freight: "الشحن",
    duty: "الرسوم الجمركية",
    clearance: "التخليص",
    weight: "الوزن",
    kgUnit: (n) => `${n} كغ`,
    minimumChargeable: (minKg) =>
      `الحدّ الأدنى للوزن المحتسَب هو ${minKg} كغ، لذا تُحتسب هذه الشحنة على أساس ${minKg} كغ.`,
    declaredValue: "القيمة المصرَّح بها",
    notUsed: "غير مستخدمة",
    dutyFollowsValue: (categoryLabel, dutyPct, vatPct, securityPct) =>
      `يُحتسب الرسم الجمركي على ${categoryLabel} وفق القيمة الفعلية للبضاعة، بنسبة ${dutyPct} إضافةً إلى ${vatPct} ضريبة قيمة مضافة و${securityPct} رسم أمان.`,
    switchedOffBecause: (categoryLabel) =>
      `مُعطَّلة لأن ${categoryLabel} تُقيَّم على أساس قيمة مفترضة لكل كيلوغرام. تغيير هذا الرقم لن يغيّر الرسم الجمركي، لذا لا ينطبق هنا.`,
    checkThisWithUs: "استفسر عن هذا التقدير",
    check: "استفسر",
    estimatedTotal: "المجموع المقدَّر",
    whatsappMessage: ({ destination, categoryLabel, weight, declaredValue, rangeLow, rangeHigh }) =>
      `مرحبًا، استخدمت حاسبة الأعمال على موقعكم. ${destination}، ${categoryLabel}، نحو ${weight} كغ${
        declaredValue ? `، القيمة المصرَّح بها ${declaredValue}` : ""
      }. التقدير من ${rangeLow} إلى ${rangeHigh}. هل يمكنكم تأكيد ذلك؟`,
  },

  signup: {
    backToHome: "→ العودة إلى الصفحة الرئيسية",
    createAccountEyebrow: "إنشاء حساب",
    whatSigningUpFor: "لماذا تريد التسجيل؟",
    whatSigningUpForBody:
      "إرسال شحنة وتوريد منتجات يحتاجان منك معلومات مختلفة تمامًا، لذا يطرح كل مسار أسئلة مختلفة.",
    privateTag: "شحن",
    privateTitle: "شخصي",
    privateBody: "إرسال أغراض شخصية أو منزلية إلى العائلة.",
    businessTag: "تجارة",
    businessTitle: "تجاري",
    businessBody: "توريد منتجات أو تقديم طلب تجاري.",
    start: "ابدأ",
    stepOf: (step, total) => `الخطوة ${step} من ${total}`,
    optional: "اختياري",
    chooseFile: "اختر ملفًا",
    fileTypesHint: "JPG أو PNG أو PDF.",
    notUploadedNotice:
      "هذا المستند لا يُرفع. ليس لدينا نظام حسابات بعد، فهو لا يغادر جهازك — سترسله في المحادثة في الخطوة الأخيرة.",
    lastStep: "الخطوة الأخيرة",
    checkAndSend: "راجع وأرسل",
    checkAndSendBody: (withId) =>
      `انسخ الملخّص أدناه وأرسله إلينا عبر WhatsApp${
        withId ? "، مع مستند إثبات الهوية" : ""
      }. سنرد عليك بالكلفة وبالخطوات التالية.`,
    copySummary: "نسخ الملخّص",
    copied: "تم النسخ ✓",
    copyFailed: "تعذّر النسخ — يُرجى تحديد النص ونسخه يدويًا.",
    openWhatsapp: "فتح WhatsApp",
    back: "السابق",
    next: "التالي",
    review: "مراجعة",
    footerNotice:
      "لا شيء تكتبه هنا يُحفَظ أو يُرسَل إلى أي مكان قبل أن تختار مراسلتنا. لم تصبح El Haj International بعد شركة شحن مرخّصة ولا تستقبل حجوزات — هذا التسجيل يبدأ محادثة، ولا يفتح حسابًا.",
    validation: {
      required: "حقل إلزامي.",
      invalidEmail: "هذا لا يبدو بريدًا إلكترونيًا صحيحًا.",
      invalidPhone: "هذا لا يبدو رقم هاتف صحيحًا.",
      chooseFileError: "يُرجى اختيار ملف.",
    },
    privateSteps: [
      {
        title: "بياناتك",
        blurb: "الشخص الذي يرسل الشحنة.",
        fields: [
          { id: "senderName", label: "الاسم الكامل" },
          { id: "senderEmail", label: "البريد الإلكتروني" },
          { id: "senderPhone", label: "الهاتف / WhatsApp" },
          { id: "senderAddress", label: "الشارع ورقم المبنى" },
          { id: "senderCity", label: "المدينة والرمز البريدي" },
        ],
      },
      {
        title: "من يستلم الشحنة",
        blurb:
          "يعتبر الجمرك كل مستلم مستوردًا لشحنته الخاصة، لذا يجب أن يكون الشخص الفعلي الذي سيستلمها.",
        fields: [
          { id: "consigneeName", label: "الاسم الكامل للمستلم" },
          {
            id: "consigneeId",
            label: "رقم هوية المستلم",
            hint: "مطلوب من الجمارك اللبنانية لأغراض التصريح الجمركي.",
          },
          { id: "consigneePhone", label: "هاتف المستلم" },
          { id: "consigneeAddress", label: "عنوان التسليم" },
          { id: "consigneeCity", label: "المدينة / المنطقة" },
        ],
      },
      {
        title: "مستند إثبات الهوية",
        blurb: "صفحة من جواز سفر أو بطاقة هوية المرسل.",
        fields: [
          { id: "idDocument", label: "اختر ملفًا", hint: "JPG أو PNG أو PDF." },
        ],
      },
    ],
    businessSteps: [
      {
        title: "بيانات الشركة",
        fields: [
          { id: "companyName", label: "اسم الشركة" },
          { id: "contactPerson", label: "الشخص المسؤول عن التواصل" },
          { id: "companyRole", label: "المنصب" },
          { id: "companyEmail", label: "البريد الإلكتروني" },
          { id: "companyPhone", label: "الهاتف / WhatsApp" },
        ],
      },
      {
        title: "التحقّق",
        blurb: "يكفي واحد من هذه — نريد فقط التأكّد من أن الشركة حقيقية.",
        fields: [
          {
            id: "verification",
            label:
              "الموقع الإلكتروني، أو نطاق البريد الإلكتروني للشركة، أو رقم ضريبة القيمة المضافة / السجل التجاري",
            hint: "يكفي واحد منها فقط. لست بحاجة إلى تقديم الثلاثة.",
          },
        ],
      },
      {
        title: "ما الذي تبحث عنه",
        blurb: "كلما كانت تفاصيلك أدقّ، أسرعنا في تقديم عرض السعر.",
        fields: [
          { id: "product", label: "المنتج أو نوع البضاعة" },
          { id: "quantity", label: "الكمية أو حجم الطلب" },
          { id: "preferences", label: "تفضيلات الجودة والتغليف" },
          {
            id: "shelfLife",
            label: "متطلبات تاريخ الصلاحية / مدة التخزين",
            hint: "اتركه فارغًا إذا لم ينطبق.",
          },
          { id: "notes", label: "أي شيء آخر" },
        ],
      },
    ],
    privateWhatsappMessage:
      "مرحبًا، لقد ملأت استمارة التسجيل على موقعكم. سأرسل بياناتي الآن.",
    businessWhatsappMessage:
      "مرحبًا، لقد ملأت استمارة التسجيل التجاري على موقعكم. سأرسل بياناتي الآن.",
    summaryHeaderPrivate: "EL HAJ INTERNATIONAL — تسجيل شخصي / شحن",
    summaryHeaderBusiness: "EL HAJ INTERNATIONAL — تسجيل تجاري",
  },
};

export default ar;
