import type { Dictionary } from "../dictionary";

const ar: Dictionary = {
  meta: {
    title: "إل حاج إنترناشونال — شحن وتجارة",
    description:
      "شحن وتجارة بين أوروبا والشرق الأوسط. شحن حاويات مجمّعة وتوريد بضائع.",
  },

  nav: {
    howItWorks: "كيف تعمل الخدمة",
    pricing: "الأسعار",
    calculator: "حاسبة التكلفة",
    signUp: "إنشاء حساب",
    languageSwitcher: "تغيير اللغة",
  },

  hero: {
    eyebrowCity: "هامبورغ",
    eyebrowRoute: "من أوروبا إلى الشرق الأوسط",
    headlineLine1: "أرسل أي شيء",
    headlineLine2: "من أوروبا",
    headlineLine3Lead: "إلى",
    destinationName: "لبنان",
    subtitle: [
      { text: "شحن حاويات مجمّعة وتجارة بين " },
      { text: "أوروبا", strong: true },
      { text: " و" },
      { text: "الشرق الأوسط", strong: true },
      { text: "." },
    ],
    chatWithUs: "تحدّث معنا",
    chatWhatsappMessage:
      "مرحبًا، وجدت موقع El Haj International وأودّ الاستفسار عن الشحن.",
    estimateShipment: "احسب تكلفة شحنة",
  },

  statement: {
    eyebrow: "ماذا نفعل",
    headline: "نرسل الطرود الشخصية وبضائع الشركات على حدّ سواء",
  },

  marquee: {
    words: [
      "شحن بحري",
      "تجميع الشحنات",
      "تخليص جمركي",
      "توصيل من الباب إلى الباب",
      "توريد البضائع",
      "شحن جماعي",
    ],
  },

  howItWorks: {
    eyebrow: "كيف تعمل الخدمة",
    steps: [
      {
        title: "احسب تكلفة شحنة",
        body: 'اضغط على "احسب تكلفة شحنة"، اختر الوجهة، ثم حدّد إن كانت طردًا شخصيًا أو شحنة تجارية. تحصل على نطاق سعري فورًا — من دون استمارة أو حساب.',
      },
      {
        title: "إنشاء حساب",
        body: 'اضغط على "إنشاء حساب"، اختر شخصي أو تجاري، وأجب عن بضعة أسئلة قصيرة عن المرسل والمستلم. لا يُرفع أو يُحفظ أي شيء — إذ لا توجد قاعدة بيانات بعد — فهذه الخطوة تجهّز بياناتك فقط، ولا تفتح حسابًا فعليًا.',
      },
      {
        title: "تأكيد الطلب",
        body: "في الشاشة الأخيرة، انسخ ملخّص طلبك وأرسله إلينا عبر WhatsApp. هذه الرسالة هي ما يؤكّد الشحنة فعليًا — نرد عليك بالتكلفة النهائية والخطوات التالية.",
      },
    ],
  },

  calculatorPromo: {
    eyebrow: "الأسعار",
    headline: "اعرف السعر قبل أن تشحن.",
    subtitle: "الشحن والرسوم الجمركية والرسوم الإضافية — تقدير واحد، من دون التزام.",
    openCalculator: "افتح حاسبة التكلفة",
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
      "لا استمارات ولا حساب مطلوب لمجرد السؤال. راسلنا وسنخبرك بالتكلفة وبكل ما يتعلق بالأمر.",
    personalParcelsLabel: "طرود شخصية",
    personalParcelsMessage:
      "مرحبًا، أودّ شحن شيء من أوروبا إلى الشرق الأوسط.",
    businessInquiryLabel: "استفسار تجاري",
    businessInquiryMessage:
      "مرحبًا، أنا صاحب عمل وأبحث عن توريد بضائع والتجارة بها. هل يمكننا التحدث؟",
  },

  footer: {
    tagline:
      "شحن حاويات مجمّعة وتجارة بين أوروبا والشرق الأوسط. مقرّنا في هامبورغ، ألمانيا.",
    calculator: "حاسبة التكلفة",
    signUp: "إنشاء حساب",
    devNotice:
      "الموقع قيد التطوير. لم تُسجَّل El Haj International بعد كشركة شحن مرخّصة — الأسعار المعروضة استرشادية، ولا تُقبل أي حجوزات حاليًا.",
  },

  preloader: {
    percentSign: "%",
  },

  redirect: {
    message: "يتم تحويلك إلى النسخة العربية من الموقع…",
    linkText: "متابعة",
  },

  calculatorPage: {
    backToHome: "→ العودة إلى الصفحة الرئيسية",
    shippingEstimateEyebrow: "تقدير تكلفة الشحن",
    whereHeadline: "إلى أين تذهب الشحنة؟",
    whereBody:
      "كل دولة تفرض رسومًا جمركية مختلفة على الواردات، لذا يبدأ التقدير بتحديد الوجهة.",
    startEstimate: "ابدأ التقدير",
    onlyDestinationNotice:
      "لبنان هو الوجهة الوحيدة المتاحة حاليًا — فهو الممرّ الوحيد الذي لدينا بيانات جمركية كاملة عنه. إضافة دولة جديدة تعني دراسة جداول رسومها الجمركية بدقة، وليس مجرد إضافتها إلى قائمة.",
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
        'يخضع هذا البند لضابطة حكومية لم نتمكّن من تحديدها بدقة — يُرجى التأكد من مخلّص جمركي قبل الشحن بكميات كبيرة.',
    },
    "used-appliances": {
      label: "أجهزة كهربائية (مستعملة)",
      blurb: "معفاة من الرسوم مع المستندات الصحيحة",
      caveat:
        "قائمة FIDI الخاصة بالمواد الممنوعة تتعارض مع هذا البند بالنسبة للأجهزة التي تعمل بالبطارية والأجهزة المنزلية. يتطلب إجابة مباشرة من مخلّص جمركي.",
    },
    computers: {
      label: "حواسيب وأجهزة لابتوب",
      blurb: "معفاة من الرسوم الجمركية — فقط ضريبة القيمة المضافة ورسم الأمان",
    },
    apparel: {
      label: "ملابس جديدة",
      blurb: "ملابس جديدة",
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
        "يُطبَّق حدّ أدنى قدره 7,500 ليرة لبنانية للزوج الواحد، وقد يتجاوز هذا نسبة الرسم على الأحذية الرخيصة.",
    },
    bags: {
      label: "حقائب يد وأمتعة",
      blurb: "حقائب وشنط سفر",
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
      blurb: "طلب شائع من الجالية من الصيدليات الألمانية",
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
    personalDutyFree: ({ categoryLabel, securityFeePct, deemedUsdPerKg, weightKg }) =>
      `${categoryLabel} معفاة من الرسوم الجمركية — يُفرض فقط رسم الأمان بنسبة ${securityFeePct}، على قيمة مفترضة قدرها ${deemedUsdPerKg} دولار أمريكي/كغ لنحو ${weightKg} كغ.`,
    personalDutyCharged: ({
      weightKg,
      deemedUsdPerKg,
      dutyPct,
      categoryLabel,
      securityFeePct,
    }) =>
      `نحو ${weightKg} كغ بقيمة مفترضة قدرها ${deemedUsdPerKg} دولار أمريكي/كغ، برسم جمركي ${dutyPct} على ${categoryLabel} بالإضافة إلى رسم أمان ${securityFeePct}.`,
    personalBasisOneBox: ({ boxLabel, priceEur }) =>
      `كرتونة واحدة بمقاس ${boxLabel} بسعر ثابت ${priceEur}. يبقى السعر نفسه أيًا كان وزنها.`,
    personalBasisManyBoxes: ({ numBoxes, boxLabel, priceEur }) =>
      `${numBoxes} × كراتين بمقاس ${boxLabel} بسعر ثابت ${priceEur} لكل واحدة. يبقى السعر نفسه أيًا كان وزنها.`,
    personalBasisPerKg: ({ weightKg, perKgEur }) =>
      `${weightKg} كغ بسعر ثابت ${perKgEur} لكل كيلوغرام.`,
    personalAlternativeFromBoxes: ({
      boxLabel,
      typicalKg,
      numBoxes,
      weightKg,
      altEur,
      perKgEur,
    }) =>
      `تتّسع كرتونة ${boxLabel} المعبّأة عادةً لنحو ${typicalKg} كغ، لذا ${
        numBoxes === 1 ? "ستزن هذه الكرتونة" : "ستزن هذه الكراتين"
      } نحو ${weightKg} كغ — أي ${altEur} بسعر ${perKgEur}/كغ.`,
    personalAlternativeFromWeight: ({ boxesNeeded, boxLabel, altEur }) =>
      `هذا الوزن يملأ عادةً نحو ${boxesNeeded} كرتونة بمقاس ${boxLabel} — أي ${altEur} بسعر الكرتونة الثابت.`,
    businessDutyByWeight: ({ deemedUsdPerKg, chargeableKg, dutyPct, securityFeePct }) =>
      `يُحتسب على أساس قيمة مفترضة قدرها ${deemedUsdPerKg} دولار أمريكي/كغ (${chargeableKg} كغ)، برسم جمركي ${dutyPct} بالإضافة إلى رسم أمان ${securityFeePct}. القيمة الفعلية للبضاعة لا تغيّر هذا الرقم.`,
    businessDutyByValue: ({
      valueEur,
      dutyPct,
      vatPct,
      securityFeePct,
      categoryLabel,
    }) =>
      `يُحتسب على أساس القيمة المصرَّح بها (${valueEur}) برسم جمركي ${dutyPct} بالإضافة إلى ضريبة قيمة مضافة ${vatPct} ورسم أمان ${securityFeePct} على ${categoryLabel}.`,
  },

  personalCalculator: {
    howToPay: "كيف تريد الدفع؟",
    howToPayBody:
      "سعر ثابت لكل كرتونة أيًا كان وزنها، أو سعر ثابت لكل كيلوغرام. اختر ما يناسب شحنتك — يُظهر التقدير أدناه تكلفة الخيار الآخر.",
    byTheBox: "بالكرتونة",
    byTheKilo: (perKg) => `بالكيلوغرام · ${perKg}/كغ`,
    boxSize: "مقاس الكرتونة",
    holdsAbout: (kg) => `تتّسع لنحو ${kg} كغ`,
    drawnToScale: "مرسومة بمقياس رسم دقيق — الأحجام الثلاثة مُمثَّلة بنسبها الحقيقية إلى بعضها",
    scaleModelLabel: (boxLabel, w, d, h) =>
      `نموذج بمقياس رسم لكرتونة ${boxLabel}، ${w} في ${d} في ${h} سنتيمتر`,
    howManyBoxes: "كم عدد الكراتين",
    oneBox: "كرتونة واحدة",
    nBoxes: (n) => `${n} كراتين`,
    sendingMoreThan: (max) =>
      `هل ترسل أكثر من ${max}؟ راسلنا — في هذا الحجم يستحق الأمر تسعيرًا دقيقًا بدلًا من الاحتساب بالكرتونة.`,
    totalWeight: "الوزن الإجمالي",
    kgUnit: (n) => `${n} كغ`,
    chargedOnActualWeight: (perKg) =>
      `يُحتسب على الوزن الفعلي بسعر ثابت ${perKg} لكل كيلوغرام، بصرف النظر عن الكراتين.`,
    whatsInIt: "ما محتوى الشحنة؟",
    whatsInItBody:
      "هذا لا يغيّر سعر الشحن. إنه يحدّد النسبة التي قد يفرضها الجمرك اللبناني عند الوصول — النسبة المئوية الظاهرة على كل بطاقة.",
    summaryOneBox: (boxLabel) => `كرتونة واحدة × ${boxLabel}`,
    summaryManyBoxes: (n, boxLabel) => `${n} × كراتين ${boxLabel}`,
    summaryWeight: (kg) => `${kg} كغ`,
    checkThisWithUs: "تأكّد من هذا معنا",
    check: "تأكيد",
    estimatedAllIn: "تقدير شامل لكل التكاليف",
    shippingYouPayUs: "الشحن — تدفعه لنا",
    dutyMayCharge: "الرسوم الجمركية — قد يفرضها الجمرك عند الوصول",
    customsFinalAssessment: "الجمرك هو من يحدّد التقييم النهائي، وليس نحن.",
    cheaperByAmount: (amount) => `هذه هي الطريقة الأرخص للشحن، بفارق ${amount}.`,
    otherOptionSaves: (amount) =>
      `الخيار الآخر قد يوفّر لك نحو ${amount} — يستحق النظر.`,
    bothOptionsSame: "يتقارب الخياران هنا في التكلفة تقريبًا.",
    footnote: (destination, dataAsOf) =>
      `يغطّي سعر الشحن ما نتولّاه نحن — من برلين إلى ${destination}، عبر حاويتنا المجمّعة الخاصة. أما الرسم الجمركي فمنفصل: يفرضه الجمرك اللبناني عند الوصول، وليس نحن، وقد قدّرناه من وزن الطرد وفق القيمة المفترضة التي يطبّقها الجمرك على الأغراض الشخصية. تعود بيانات الجمارك هنا إلى ${dataAsOf} وتحتاج إلى تأكيد جديد، والجمرك هو من يحدّد التقييم النهائي يوم الوصول. هذا تقدير وليس عرض سعر نهائي، ولا نستقبل حجوزات بعد.`,
    whatsappMessage: ({ destination, summary, categoryLabel, shipping, duty }) =>
      `مرحبًا، استخدمت الحاسبة على موقعكم. طرد شخصي إلى ${destination}، ${summary}، ${categoryLabel}. الشحن ${shipping}، الرسوم الجمركية المقدَّرة ${duty}. هل يمكنكم تأكيد ذلك؟`,
  },

  businessCalculator: {
    readThisFirst: "اقرأ هذا أولًا — قاعدتان تحدّدان تكلفتك",
    usedGoodsTag: "بضائع مستعملة",
    usedGoodsBody: [
      { text: "تُفرَض الرسوم " },
      { text: "على أساس الوزن", strong: true },
      {
        text: ". يطبّق الجمرك قيمة مفترضة لكل كيلوغرام، فلا يغيّر القيمة الفعلية للمحتويات شيئًا. القيمة المصرَّح بها لا تُؤخذ بالاعتبار.",
      },
    ],
    newGoodsTag: "بضائع جديدة",
    newGoodsBody: [
      { text: "تُفرَض الرسوم " },
      { text: "على أساس القيمة", strong: true },
      {
        text: "، بنسبة تحدَّد بحسب نوع البضاعة — أجهزة اللابتوب معفاة من الرسوم، بينما العطور ومستحضرات التجميل من بين الأعلى رسمًا.",
      },
    ],
    footnote: (dataAsOf) =>
      `يُحتسب الشحن على أساس الوزن في الحالتين، والتخليص رسم ثابت لكل شحنة. هذا تقدير وليس عرض سعر نهائي — تعود البيانات هنا إلى ${dataAsOf} وتحتاج إلى تأكيد جديد. التقييم النهائي للرسوم يحدّده الجمرك اللبناني، وليس نحن، ولا نستقبل حجوزات بعد.`,
    whatAreYouSending: "ماذا ترسل؟",
    whatAreYouSendingBody:
      "يفرض الجمرك اللبناني نسبة مختلفة لكل نوع بضاعة. اختر الأقرب لشحنتك — النسبة المئوية الظاهرة هي نسبة الرسم الجمركي.",
    taxedByWeight: "تُفرَض الرسوم على أساس الوزن",
    taxedByValue: "تُفرَض الرسوم على أساس القيمة",
    sets: "يحدّد",
    freight: "الشحن",
    duty: "الرسوم الجمركية",
    clearance: "التخليص",
    weight: "الوزن",
    kgUnit: (n) => `${n} كغ`,
    minimumChargeable: (minKg) =>
      `الحدّ الأدنى للوزن المحتسَب هو ${minKg} كغ، لذا يُحتسب هذا على أساس ${minKg} كغ.`,
    declaredValue: "القيمة المصرَّح بها",
    notUsed: "غير مستخدمة",
    dutyFollowsValue: (categoryLabel, dutyPct, vatPct, securityPct) =>
      `يعتمد الرسم الجمركي على ${categoryLabel} على القيمة الفعلية للبضاعة، بنسبة ${dutyPct} بالإضافة إلى ${vatPct} ضريبة قيمة مضافة و${securityPct} رسم أمان.`,
    switchedOffBecause: (categoryLabel) =>
      `مُعطَّلة لأن ${categoryLabel} تُقيَّم على أساس قيمة مفترضة لكل كيلوغرام. تغيير هذا الرقم لن يغيّر الرسم الجمركي، لذا لا ينطبق هنا.`,
    checkThisWithUs: "تأكّد من هذا معنا",
    check: "تأكيد",
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
      "إرسال شحنة وتوريد منتجات يتطلّبان منك معلومات مختلفة تمامًا، لذا يطرح كل مسار أسئلة مختلفة.",
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
      "هذا المستند لا يُرفع. ليس لدينا نظام حسابات بعد، فلا يغادر جهازك — سترسله في المحادثة في الخطوة الأخيرة.",
    lastStep: "الخطوة الأخيرة",
    checkAndSend: "راجع وأرسل",
    checkAndSendBody: (withId) =>
      `انسخ الملخّص أدناه وأرسله إلينا عبر WhatsApp${
        withId ? "، مع مستند إثبات الهوية" : ""
      }. سنرد عليك بالتكلفة وبالخطوات التالية.`,
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
          "يعتبر الجمرك كل مستلم مستوردًا لشحنته الخاصة، لذا يجب أن يكون الشخص الفعلي الذي سيستلم التسليم.",
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
        blurb: "يكفي أي واحد من هذه — نريد فقط التأكّد من أن الشركة حقيقية.",
        fields: [
          {
            id: "verification",
            label: "الموقع الإلكتروني، أو نطاق البريد الإلكتروني للشركة، أو رقم ضريبة القيمة المضافة / السجل التجاري",
            hint: "يكفي واحد منها فقط. لست بحاجة لتقديم الثلاثة.",
          },
        ],
      },
      {
        title: "ما الذي تبحث عنه",
        blurb: "كلما كانت تفاصيلك أدق، كلما تمكّنّا من تقديم عرض سعر أسرع.",
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
    summaryHeaderPrivate: "إل حاج إنترناشونال — تسجيل شخصي / شحن",
    summaryHeaderBusiness: "إل حاج إنترناشونال — تسجيل تجاري",
  },
};

export default ar;
