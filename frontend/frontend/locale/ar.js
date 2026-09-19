export default {
  brand: {
    name: "Qualitify",
    node: "عقدة الجزائر"
  },
  nav: {
    docs: "المستندات",
    pricing: "الأسعار",
    contact: "اتصل بنا",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج"
  },
  footer: {
    copy: "© 2026 Qualitify. جميع الحقوق محفوظة."
  },
  contact: {
    badge: "تواصل معنا",
    title: "دعنا نجهز لك كل شيء",
    subtitle: "هل لديك سؤال قبل الاشتراك؟ نرد في غضون بضع ساعات.",
    channels: {
      title: "القنوات المباشرة",
      email: "البريد الإلكتروني",
      whatsapp: "واتساب",
      preferred: "مفضل",
      responseTimeTitle: "وقت الاستجابة",
      responseTimeValue: "أقل من 6 ساعات في أيام العمل"
    },
    tips: {
      title: "قبل أن تكتب",
      setup: {
        bold: "أسئلة حول الإعداد؟",
        muted1: "تحقق من",
        link: "المستندات",
        muted2: "أولاً."
      },
      billing: {
        bold: "مشاكل في الفواتير؟",
        muted: "قم بتضمين اسم متجرك والبريد الإلكتروني المستخدم."
      }
    },
    trust: {
      local: "دعم محلي من الجزائر",
      speed: "نرد في أقل من 6 ساعات",
      human: "لا يوجد روبوتات. ردود حقيقية."
    }
  },
  global: {
    brandName: "Qualitify",
    copyrightString: "© 2026 Qualitify Systems Inc. جميع الحقوق محفوظة."
  },
  mainNav: {
    overview: "الرئيسية",
    config: "الإعدادات",
    loginBtn: "تسجيل الدخول",
    logoutBtn: "تسجيل الخروج",
    userAvatarAlt: "صورة المستخدم"
  },
  overviewPage: {
    headerTitle: "لوحة القيادة",
    timeSinceRefresh: "تم التحديث منذ {time} ثانية",
    refreshDataBtn: "تحديث البيانات",
    metrics: {
      total: "الإجمالي",
      sent: "المرسلة",
      failed: "الفاشلة",
      pending: "قيد الانتظار"
    },
    errorList: {
      title: "الأحداث الفاشلة",
      badgeCount: "{count} أخطاء نشطة",
      retryAllBtn: "إعادة المحاولة للكل",
      colOrder: "الطلب",
      colPhone: "الهاتف",
      colError: "الخطأ",
      colAction: "الإجراء",
      statusAcknowledged: "تم التأكيد"
    },
    tableActions: {
      retry: "إعادة المحاولة",
      sending: "جارٍ الإرسال",
      dispatched: "تم الإرسال"
    },
    footer: {
      showingText: "عرض أحدث الرفوضات",
      nextRetryTimer: "إعادة المحاولة التلقائية بعد {time}"
    }
  },
  docsPage: {
    header: {
      brandName: "Qualitify",
      brandBadge: "Docs",
      edgeLive: "Algeria Edge Ingest Live",
      apiRef: "API Reference",
      btnDashboard: "Dashboard"
    },
    mobileNav: {
      overview: "Overview",
      quickStart: "Quick Start",
      metaPixel: "Meta Pixel Setup",
      apiKey: "API Key",
      endpointOrder: "POST /api/order",
      endpointTrack: "POST /api/orders/.../trk",
      cheatsheet: "Cheatsheet",
      toDashboard: "Dashboard →"
    },
    sidebar: {
      groupStart: "Getting Started",
      itemOverview: "Overview",
      itemQuickStart: "Quick Start",
      groupCreds: "Credentials",
      itemMeta: "Meta Pixel Setup",
      itemApi: "API Key",
      itemWebhook: "Carrier Webhook",
      groupEndpoints: "Endpoints",
      badgeBuy: "BUY",
      badgeTrk: "TRK",
      badgeManual: "MANUAL",
      footerStatus: "API v1.0.0 Online",
      footerMeta: "Meta Graph API Latest"
    },
    content: {
      overview: {
        eyebrow: "DOCUMENTATION",
        title: "Qualitify API",
        subtitle: "Server-to-server pixel tracking with carrier webhook automation. Send accurate purchase and delivery events to Meta without client-side limitations.",
        tagVer: "v1.0",
        tagRest: "REST API",
        tagCapi: "Direct Meta CAPI"
      },
      quickStart: {
        header: "How Qualitify Works",
        body: "Instead of executing untrusted Facebook tracking scripts inside user browsers, your ecommerce backend dispatches orders directly to our Algeria edge cluster via HTTP. We compute SHA-256 parameter hashing, enrich device client-headers, and push guaranteed payloads to Meta Graph API.",
        statMatch: "event match rate",
        statSetup: "Setup in under 5 minutes",
        statLocal: "Built for Algerian merchants"
      },
      credentials: {
        sectionNum: "01 / CREDENTIALS",
        title: "Credentials & Authorization",
        meta: {
          title: "Meta Pixel Configuration",
          desc1: "Before using the API, configure your Meta credentials inside your dashboard under",
          descStrong: "Settings → Meta Configuration",
          step1a: "Navigate to",
          step1Strong: "Settings",
          step1b: "in your dashboard sidebar",
          step2a: "Enter your",
          step2Strong: "Meta Pixel ID",
          step2b: "found in Meta Events Manager",
          step3a: "Enter your",
          step3Strong: "Meta Access Token",
          step3b: "generated from your Meta Business Suite System User",
          step4a: "Click",
          step4Strong: "Save Configuration",
          step4b: "to activate cluster caching",
          callout: "Your Access Token is stored encrypted and never exposed client-side. Rotate it anytime from Settings without downtime."
        },
        api: {
          title: "API Key",
          desc1: "All endpoint requests require an",
          desc2: "header. Generate your key from",
          descStrong: "Settings → API Key",
          warningTitle: "Warning:",
          warningBody: "Never expose your API key in client-side JavaScript. Always call endpoints from your server (Node.js, PHP, Laravel, Shopify webhook, WooCommerce hook)."
        },
        carrier: {
          title: "Carrier Webhook Secret",
          desc: "To automate delivery status sync, generate a Webhook token from Settings. This creates a unique webhook URL to paste into your carrier dashboard.",
          step1a: "Go to",
          step1Strong: "Settings → Express Integration",
          step2a: "Select your carrier",
          step3a: "Click",
          step3bStrong: "Add your carrier webhook secret from your carrier",
          step3cStrong: "Save Integration",
          step4a: "Copy the generated Webhook URL:",
          step5: "Paste it into your carrier's webhook configuration panel",
          callout: "Once configured, your carrier will automatically POST delivery status updates to your webhook URL — no manual tracking pushes needed."
        }
      },
      endpoints: {
        sectionNum: "02 / ENDPOINTS",
        title: "Core Tracking Pipeline",
        subtitle1: "Three endpoints form the core of the tracking pipeline. Each requires the",
        subtitle2: "header.",
        order: {
          tag: "PURCHASE EVENT",
          desc1: "Fires a",
          descStrong: "Purchase",
          desc2: "event to Meta via Conversions API. Call this endpoint server-side immediately after order confirmation."
        },
        tracking: {
          tag: "TRACKING UPDATE",
          desc: "Attach a carrier tracking number to an existing order. when your fulfillment system assigns tracking numbers."
        },
        manual: {
          tag: "MANUAL",
          desc: "Manually trigger a Meta Conversions API (CAPI) purchase event for a delivered order."
        }
      }
    },
    table: {
      thHeader: "Header",
      thType: "Type",
      thReq: "Required",
      thDesc: "Description",
      thField: "Field",
      thReqBody: "Request Body",
      reqYes: "✅ Yes",
      reqOpt: "⬜ Optional"
    },
    tableRows: {
      apiKey: "Your platform API key from Settings",
      contentType: "Must be",
      fname: "Customer first name",
      lname: "Customer last name",
      addr: "Delivery street address",
      wilaya: "Algerian state (e.g. Alger, Oran)",
      commune: "City / commune",
      orderNum: "Unique order identifier (e.g. ORD-00421)",
      amount: "Order total in Algerian Dinars (DZD)",
      phone: "E.164 format preferred (e.g. +213555000111)",
      ip: "Customer IP captured from HTTP request",
      ua: "Browser user agent string for CAPI matching",
      fbp: "Meta",
      fbpEnd: "browser cookie value",
      fbc: "The fully formatted Facebook Click ID (usually extracted from the _fbc cookie).",
      prodList: "Array of product objects with id, name, qty, price",
      trkNum: "Carrier-assigned parcel ID (e.g. YAL-789456)",
      carrier: "Carrier identifier"
    },
    codePanel: {
      panelTitle: "Live Code Sandbox",
      panelLang: "Node / cURL",
      copyBtn: "Copy",
      headerReq: "HTTP Header",
      resOk: "Response (200 OK)",
      manPush: "Manual Tracking Push",
      qsLine1: "Quick Start",
      qsLine2: "1. Configure credentials in Settings",
      qsLine3: "2. Call /api/order on checkout",
      qsLine4: "3. Push tracking or enable Auto mode",
      qsLine5: "4. Carrier webhook fires events automatically"
    }
  },
  docsPage: {
    header: {
      brandName: "Qualitify",
      brandBadge: "المستندات",
      edgeLive: "عقدة الإدخال في الجزائر (مباشر)",
      apiRef: "مرجع API",
      btnDashboard: "لوحة التحكم"
    },
    mobileNav: {
      overview: "نظرة عامة",
      quickStart: "البدء السريع",
      metaPixel: "إعداد ميتا بيكسل",
      apiKey: "مفتاح API",
      endpointOrder: "POST /api/order",
      endpointTrack: "POST /api/orders/.../trk",
      cheatsheet: "ورقة الغش",
      toDashboard: "لوحة التحكم ←"
    },
    sidebar: {
      groupStart: "البداية",
      itemOverview: "نظرة عامة",
      itemQuickStart: "البدء السريع",
      groupCreds: "بيانات الاعتماد",
      itemMeta: "إعداد ميتا بيكسل",
      itemApi: "مفتاح API",
      itemWebhook: "الويب هوك لشركة التوصيل",
      groupEndpoints: "نقاط النهاية",
      badgeBuy: "شراء",
      badgeTrk: "تتبع",
      badgeManual: "يدوي",
      footerStatus: "API v1.0.0 متصل",
      footerMeta: "أحدث إصدار من Meta Graph API"
    },
    content: {
      overview: {
        eyebrow: "التوثيق",
        title: "Qualitify API",
        subtitle: "تتبع البيكسل من خادم إلى خادم مع أتمتة الويب هوك لشركات التوصيل. أرسل أحداث الشراء والتوصيل الدقيقة إلى Meta بدون قيود متصفح العميل.",
        tagVer: "v1.0",
        tagRest: "REST API",
        tagCapi: "Meta CAPI المباشر"
      },
      quickStart: {
        header: "كيف تعمل Qualitify",
        body: "بدلاً من تنفيذ نصوص تتبع Facebook غير الموثوقة داخل متصفحات المستخدمين، تقوم الواجهة الخلفية لمتجرك بإرسال الطلبات مباشرة إلى خوادمنا في الجزائر عبر HTTP. نقوم بحساب تجزئة SHA-256، وإثراء بيانات العميل، ودفع البيانات المضمونة إلى Meta Graph API.",
        statMatch: "معدل تطابق الأحداث",
        statSetup: "إعداد في أقل من 5 دقائق",
        statLocal: "مصمم للتجار الجزائريين"
      },
      credentials: {
        sectionNum: "01 / بيانات الاعتماد",
        title: "بيانات الاعتماد والتفويض",
        meta: {
          title: "تكوين ميتا بيكسل",
          desc1: "قبل استخدام API، قم بتكوين بيانات اعتماد Meta الخاصة بك داخل لوحة التحكم تحت",
          descStrong: "الإعدادات ← تكوين ميتا",
          step1a: "انتقل إلى",
          step1Strong: "الإعدادات",
          step1b: "في القائمة الجانبية للوحة التحكم",
          step2a: "أدخل",
          step2Strong: "معرف ميتا بيكسل",
          step2b: "الموجود في مدير أحداث ميتا",
          step3a: "أدخل",
          step3Strong: "رمز وصول ميتا",
          step3b: "الذي تم إنشاؤه من مستخدم النظام في Meta Business Suite",
          step4a: "انقر على",
          step4Strong: "حفظ التكوين",
          step4b: "لتنشيط التخزين المؤقت للخادم",
          callout: "يتم تخزين رمز الوصول الخاص بك مشفراً ولا يتم كشفه أبداً من جهة العميل. يمكنك تغييره في أي وقت من الإعدادات بدون توقف."
        },
        api: {
          title: "مفتاح API",
          desc1: "تتطلب جميع طلبات نقاط النهاية ترويسة",
          desc2: ". قم بإنشاء مفتاحك من",
          descStrong: "الإعدادات ← مفتاح API",
          warningTitle: "تحذير:",
          warningBody: "لا تعرض أبداً مفتاح API الخاص بك في جافا سكريبت على جهة العميل. قم دائماً باستدعاء نقاط النهاية من الخادم الخاص بك (Node.js، PHP، Laravel، Shopify، WooCommerce)."
        },
        carrier: {
          title: "السر الخاص بالويب هوك لشركة التوصيل",
          desc: "لأتمتة مزامنة حالة التوصيل، قم بإنشاء رمز Webhook من الإعدادات. سيؤدي هذا إلى إنشاء رابط webhook فريد للصقه في لوحة تحكم شركة التوصيل الخاصة بك.",
          step1a: "اذهب إلى",
          step1Strong: "الإعدادات ← دمج التوصيل السريع",
          step2a: "اختر شركة التوصيل الخاصة بك",
          step3a: "انقر على",
          step3bStrong: "إضافة سر الويب هوك الخاص بشركة التوصيل من منصتهم",
          step3cStrong: "حفظ الدمج",
          step4a: "انسخ رابط الويب هوك الذي تم إنشاؤه:",
          step5: "الصقه في لوحة تكوين الويب هوك لشركة التوصيل",
          callout: "بمجرد التكوين، ستقوم شركة التوصيل تلقائياً بإرسال تحديثات حالة التوصيل إلى رابط الويب هوك الخاص بك — لا حاجة لإرسال التتبع يدوياً."
        }
      },
      endpoints: {
        sectionNum: "02 / نقاط النهاية",
        title: "مسار التتبع الأساسي",
        subtitle1: "تشكل ثلاث نقاط نهاية جوهر مسار التتبع. تتطلب كل منها ترويسة",
        subtitle2: ".",
        order: {
          tag: "حدث الشراء",
          desc1: "يطلق حدث",
          descStrong: "الشراء",
          desc2: "إلى Meta عبر Conversions API. استدعِ نقطة النهاية هذه من جهة الخادم فور تأكيد الطلب."
        },
        tracking: {
          tag: "تحديث التتبع",
          desc: "قم بإرفاق رقم تتبع شركة التوصيل بطلب موجود، عندما يعين نظام التلبية الخاص بك أرقام التتبع."
        },
        manual: {
          tag: "يدوي",
          desc: "إطلاق حدث شراء Meta CAPI يدوياً لطلب تم توصيله."
        }
      }
    },
    table: {
      thHeader: "الترويسة",
      thType: "النوع",
      thReq: "مطلوب",
      thDesc: "الوصف",
      thField: "الحقل",
      thReqBody: "جسم الطلب",
      reqYes: "✅ نعم",
      reqOpt: "⬜ اختياري"
    },
    tableRows: {
      apiKey: "مفتاح API لمنصتك من الإعدادات",
      contentType: "يجب أن يكون",
      fname: "الاسم الأول للعميل",
      lname: "الاسم الأخير للعميل",
      addr: "عنوان شارع التوصيل",
      wilaya: "الولاية (مثل الجزائر، وهران)",
      commune: "البلدية / المدينة",
      orderNum: "معرف طلب فريد (مثل ORD-00421)",
      amount: "إجمالي الطلب بالدينار الجزائري (DZD)",
      phone: "يفضل صيغة E.164 (مثل +213555000111)",
      ip: "عنوان IP للعميل المأخوذ من طلب HTTP",
      ua: "سلسلة وكيل مستخدم المتصفح لمطابقة CAPI",
      fbp: "قيمة ملف تعريف الارتباط",
      fbpEnd: "الخاص بـ Meta",
      fbc: "معرف نقرة فيسبوك المنسق بالكامل (مستخرج عادة من ملف _fbc).",
      prodList: "مصفوفة من كائنات المنتج تحتوي على المعرف والاسم والكمية والسعر",
      trkNum: "معرف الطرد المعين من قبل شركة التوصيل (مثل YAL-789456)",
      carrier: "معرف شركة التوصيل"
    },
    codePanel: {
      panelTitle: "صندوق اختبار الأكواد المباشر",
      panelLang: "Node / cURL",
      copyBtn: "نسخ",
      headerReq: "ترويسة HTTP",
      resOk: "الاستجابة (200 OK)",
      manPush: "إرسال التتبع يدوياً",
      qsLine1: "البدء السريع",
      qsLine2: "1. تكوين بيانات الاعتماد في الإعدادات",
      qsLine3: "2. استدعاء /api/order عند الدفع",
      qsLine4: "3. دفع التتبع",
      qsLine5: "4. تطلق الويب هوك لشركة التوصيل الأحداث تلقائياً"
    }
  },
  landingPage: {
    header: {
      brand: "Qualitify",
      node: "عقدة الجزائر"
    },
    nav: {
      howItWorks: "كيف تعمل",
      features: "المميزات",
      performance: "الأداء",
      pricing: "الأسعار",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج"
    },
    hero: {
      pill: "بوابة Meta Conversions API (CAPI)",
      headline: "توقف عن خسارة المبيعات بسبب حظر البيكسل",
      sub: "تقوم Qualitify بإرسال أحداث Meta الخاصة بك من جهة الخادم — وداعاً لحظر الإعلانات، وقيود iOS، والتحويلات المفقودة.",
      mockupUrl: "qualitify.app/dashboard",
      mockupLive: "نقل مباشر S2S"
    },
    specs: {
      compatible: { label: "متوافق مع", value: "Shopify و WooCommerce" },
      region: { label: "المنطقة", value: "الجزائر" },
      protocol: { label: "البروتوكول", value: "أحدث إصدار لـ Meta CAPI" }
    },
    stats: {
      total: "الإجمالي",
      sent: "المرسلة",
      failed: "الفاشلة",
      pending: "قيد الانتظار"
    },
    stream: {
      title: "مسار استيعاب البيانات في الوقت الفعلي",
      node: "عقدة الجزائر (14ms)",
      statusOk: "200 OK",
      statusRetry: "إعادة المحاولة التلقائية..."
    },
    problems: [
      "طلبات مؤكدة لا تراها Meta أبداً كمشتريات",
      "إهدار ميزانية الإعلانات بالتحسين على بيانات غير مكتملة",
      "توسيع الحملات بشكل أعمى بدون إشارات تحويل حقيقية"
    ],
    howItWorks: {
      headline: "كيف تعمل",
      sub: "بوابة نظيفة من ثلاث خطوات تتجاوز حظر المتصفحات بالكامل."
    },
    steps: [
      {
        title: "اربط متجرك",
        body: "قم بتثبيت السكربت الخفيف الخاص بنا أو انسخ مفتاح API لمتجرك. جاهز للعمل فوراً مع Shopify و WooCommerce ومسارات الدفع المخصصة.",
        metaLabel: "نقطة النهاية",
        meta: "POST /v1/telemetry"
      },
      {
        title: "نرسل الأحداث من جهة الخادم",
        body: "تلتقط خوادمنا السحابية بيانات الدفع الخام، وتثري ترويسات العميل (fbp, fbc, IP, user-agent)، وترسلها مباشرة عبر Meta CAPI.",
        metaLabel: "وقت الاستجابة",
        meta: "~14ms اتصال مباشر بالعقدة"
      },
      {
        title: "Meta ترى 100% من التحويلات",
        body: "تتلقى مجموعات الإعلانات أحداث شراء دقيقة، وتتحسن الخوارزميات بشكل أسرع، وتنخفض تكلفة اكتساب العملاء باستمرار.",
        metaLabel: "النتيجة",
        meta: "0% فقدان لبيانات الشراء"
      }
    ],
    metrics: [
      {
        label: "معدل تطابق الأحداث",
        desc: "يحقق نظام التجزئة المتقدم SHA-256 أعلى درجات جودة الأحداث في Meta."
      },
      {
        label: "إعداد في أقل من 5 دقائق",
        desc: "أدخل معرف Meta Pixel ورمز الوصول مرة واحدة فقط. لا حاجة لخبرة في البنية التحتية السحابية."
      },
      {
        label: "مصمم للتجار الجزائريين",
        desc: "محسن لنماذج طلبات الدفع عند الاستلام (COD) وشركات الاتصالات المحلية."
      }
    ],
    featuresSection: {
      headline: "مصمم لموثوقية عالية مع الحجم الكبير",
      sub: "نظام قياس خادم عالي الأهمية مصمم لضمان عدم فقدان أي معاملة تجارية إلكترونية أبداً."
    },
    features: [
      {
        tag: "نشط",
        title: "أحداث الشراء من جهة الخادم",
        body: "أرسل إيرادات الشراء الخام وعملات الطلب (DZD/EUR/USD) وبيانات العملاء الوصفية مباشرة من خوادم الواجهة الخلفية إلى Facebook Conversions API دون الاعتماد على تنفيذ متصفح العميل."
      },
      {
        tag: "مقاوم للأخطاء",
        title: "إعادة محاولة الأحداث الفاشلة في الوقت الفعلي",
        body: "إذا واجهت Graph API الخاصة بـ Meta حدوداً للسرعة أو انقطاعات مؤقتة (504)، تدخل الأحداث في قائمة انتظار آلية مع تأخير تصاعدي وإمكانية إعادة المحاولة بنقرة واحدة من لوحة التحكم."
      },
      {
        tag: "متاجر متعددة",
        title: "مفتاح API لكل متجر",
        body: "إدارة علامات تجارية متعددة للتجارة الإلكترونية ببيانات اعتماد معزولة. يتلقى كل متجر رمز استيعاب مخصص، وربط بيكسل خاص، وتصفية دقيقة للأحداث."
      },
      {
        tag: "عالمي",
        title: "يعمل مع Shopify و WooCommerce والمتاجر المخصصة",
        body: "دعم مدمج للويب هوك لمنصات CMS القياسية بالإضافة إلى نقاط النهاية المخصصة (PHP، Node.js، Python) المستخدمة بشكل شائع في صفحات الهبوط الجزائرية ونماذج الدفع عند الاستلام."
      }
    ],
    cta: {
      pill: "إعداد فوري متاح",
      headline: "منافسوك يتبعون أسلوباً أذكى بالفعل.",
      sub: "استرجع بيانات التحويل المفقودة اليوم وامنح خوارزمية إعلانات Facebook الإشارة النظيفة التي تحتاجها للتوسع بربحية."
    },
    footer: {
      brand: "Qualitify",
      docs: "المستندات",
      pricing: "الأسعار",
      contact: "اتصل بنا",
      copy: "© 2026 Qualitify Systems Inc."
    }
  },
  loginPage: {
    logoAlt: "شعار Qualitify",
    title: "Qualitify",
    continueGoogle: "المتابعة باستخدام Google"
  },
  landingPage: {
    header: {
      brand: "Qualitify",
      node: "عقدة الجزائر"
    },
    nav: {
      howItWorks: "كيف تعمل",
      features: "المميزات",
      performance: "الأداء",
      pricing: "الأسعار",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج"
    },
    hero: {
      pill: "بوابة Meta Conversions API (CAPI)",
      headline: "توقف عن خسارة المبيعات بسبب حظر البيكسل",
      sub: "تقوم Qualitify بإرسال أحداث Meta الخاصة بك من جهة الخادم — وداعاً لحظر الإعلانات، وقيود iOS، والتحويلات المفقودة.",
      mockupUrl: "qualitify.app/dashboard",
      mockupLive: "نقل مباشر S2S"
    },
    specs: {
      compatible: { label: "متوافق مع", value: "Shopify و WooCommerce" },
      region: { label: "المنطقة", value: "الجزائر" },
      protocol: { label: "البروتوكول", value: "أحدث إصدار لـ Meta CAPI" }
    },
    stats: {
      total: "الإجمالي",
      sent: "المرسلة",
      failed: "الفاشلة",
      pending: "قيد الانتظار"
    },
    stream: {
      title: "مسار استيعاب البيانات في الوقت الفعلي",
      node: "عقدة الجزائر (14ms)",
      statusOk: "200 OK",
      statusRetry: "إعادة المحاولة التلقائية..."
    },
    problems: [
      "طلبات مؤكدة لا تراها Meta أبداً كمشتريات",
      "إهدار ميزانية الإعلانات بالتحسين على بيانات غير مكتملة",
      "توسيع الحملات بشكل أعمى بدون إشارات تحويل حقيقية"
    ],
    howItWorks: {
      headline: "كيف تعمل",
      sub: "بوابة نظيفة من ثلاث خطوات تتجاوز حظر المتصفحات بالكامل."
    },
    steps: [
      {
        title: "اربط متجرك",
        body: "قم بتثبيت السكربت الخفيف الخاص بنا أو انسخ مفتاح API لمتجرك. جاهز للعمل فوراً مع Shopify و WooCommerce ومسارات الدفع المخصصة.",
        metaLabel: "نقطة النهاية",
        meta: "POST /v1/telemetry"
      },
      {
        title: "نرسل الأحداث من جهة الخادم",
        body: "تلتقط خوادمنا السحابية بيانات الدفع الخام، وتثري ترويسات العميل (fbp, fbc, IP, user-agent)، وترسلها مباشرة عبر Meta CAPI.",
        metaLabel: "وقت الاستجابة",
        meta: "~14ms اتصال مباشر بالعقدة"
      },
      {
        title: "Meta ترى 100% من التحويلات",
        body: "تتلقى مجموعات الإعلانات أحداث شراء دقيقة، وتتحسن الخوارزميات بشكل أسرع، وتنخفض تكلفة اكتساب العملاء باستمرار.",
        metaLabel: "النتيجة",
        meta: "0% فقدان لبيانات الشراء"
      }
    ],
    metrics: [
      {
        label: "معدل تطابق الأحداث",
        desc: "يحقق نظام التجزئة المتقدم SHA-256 أعلى درجات جودة الأحداث في Meta."
      },
      {
        label: "إعداد في أقل من 5 دقائق",
        desc: "أدخل معرف Meta Pixel ورمز الوصول مرة واحدة فقط. لا حاجة لخبرة في البنية التحتية السحابية."
      },
      {
        label: "مصمم للتجار الجزائريين",
        desc: "محسن لنماذج طلبات الدفع عند الاستلام (COD) وشركات الاتصالات المحلية."
      }
    ],
    featuresSection: {
      headline: "مصمم لموثوقية عالية مع الحجم الكبير",
      sub: "نظام قياس خادم عالي الأهمية مصمم لضمان عدم فقدان أي معاملة تجارية إلكترونية أبداً."
    },
    features: [
      {
        tag: "نشط",
        title: "أحداث الشراء من جهة الخادم",
        body: "أرسل إيرادات الشراء الخام وعملات الطلب (DZD/EUR/USD) وبيانات العملاء الوصفية مباشرة من خوادم الواجهة الخلفية إلى Facebook Conversions API دون الاعتماد على تنفيذ متصفح العميل."
      },
      {
        tag: "مقاوم للأخطاء",
        title: "إعادة محاولة الأحداث الفاشلة في الوقت الفعلي",
        body: "إذا واجهت Graph API الخاصة بـ Meta حدوداً للسرعة أو انقطاعات مؤقتة (504)، تدخل الأحداث في قائمة انتظار آلية مع تأخير تصاعدي وإمكانية إعادة المحاولة بنقرة واحدة من لوحة التحكم."
      },
      {
        tag: "متاجر متعددة",
        title: "مفتاح API لكل متجر",
        body: "إدارة علامات تجارية متعددة للتجارة الإلكترونية ببيانات اعتماد معزولة. يتلقى كل متجر رمز استيعاب مخصص، وربط بيكسل خاص، وتصفية دقيقة للأحداث."
      },
      {
        tag: "عالمي",
        title: "يعمل مع Shopify و WooCommerce والمتاجر المخصصة",
        body: "دعم مدمج للويب هوك لمنصات CMS القياسية بالإضافة إلى نقاط النهاية المخصصة (PHP، Node.js، Python) المستخدمة بشكل شائع في صفحات الهبوط الجزائرية ونماذج الدفع عند الاستلام."
      }
    ],
    cta: {
      pill: "إعداد فوري متاح",
      headline: "منافسوك يتبعون أسلوباً أذكى بالفعل.",
      sub: "استرجع بيانات التحويل المفقودة اليوم وامنح خوارزمية إعلانات Facebook الإشارة النظيفة التي تحتاجها للتوسع بربحية."
    },
    footer: {
      brand: "Qualitify",
      docs: "المستندات",
      pricing: "الأسعار",
      contact: "اتصل بنا",
      copy: "© 2026 Qualitify Systems Inc."
    }
  },
  settingsPage: {
    header: {
      brand: "Qualitify",
      navDashboard: "لوحة التحكم",
      navSettings: "الإعدادات",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج",
      profileAlt: "الملف الشخصي"
    },
    pageHeader: {
      eyebrowSystem: "النظام",
      eyebrowConfig: "التكوين",
      title: "الإعدادات",
      subtitle: "قم بتكوين مسارات تتبع التحويل، وبيانات الاستيعاب، وسكربتات القياس عن بعد."
    },
    metaCard: {
      title: "تكوين ميتا (Meta)",
      subtitle: "توجيه بيانات الاعتماد المباشرة لـ Conversions API (CAPI)",
      badge: "جاهز",
      pixelIdLabel: "معرف بيكسل (Pixel ID)",
      pixelIdPlaceholder: "مثال: 849204918204912",
      suffixId: "معرف",
      tokenLabel: "رمز الوصول (Access Token)",
      hide: "إخفاء",
      reveal: "إظهار",
      tokenHint1: "رمز وصول مستخدم النظام بصلاحيات",
      tokenHint2: ".",
      saved: "تم الحفظ",
      saveBtn: "حفظ التكوين"
    },
    apiCard: {
      title: "مفتاح API",
      subtitle: "بيانات اعتماد حامل (Bearer) لاستيعاب القياس عن بُعد عبر POST من الخادم",
      badge: "الإنتاج",
      copied: "تم النسخ",
      copyBtn: "نسخ",
      regenerateBtn: "إعادة إنشاء",
      warning: "إعادة الإنشاء ستبطل روابط الويب هوك الحالية للإنتاج فوراً. استخدمه بحذر."
    },
    expressCard: {
      title: "دمج التوصيل السريع",
      subtitle: "اربط شركة التوصيل الخاصة بك لمزامنة حالة الطرود مع الطلبات",
      badge: "متصل",
      carrierLabel: "شركة التوصيل",
      webhookSecretLabel: "السر الخاص بالويب هوك (Webhook Secret)",
      hide: "إخفاء",
      reveal: "إظهار",
      webhookUrlLabel: "رابط الويب هوك (Webhook URL)",
      urlHint: "الصق هذا الرابط في لوحة تحكم شركة التوصيل تحت قسم Webhooks",
      saved: "تم الحفظ",
      saveBtn: "حفظ الدمج"
    },
    pluginsCard: {
      title: "الإضافات (Plugins)",
      subtitle: "محلل جلسات العميل وجسر ملفات تعريف الارتباط من الطرف الأول",
      copied: "تم النسخ",
      copyBtn: "نسخ",
      shopifyLabel: "Shopify",
      hint: "استخدم هذا في موقعك الإلكتروني"
    },
    footer: {
      copy: "© 2026 Qualitify Systems Inc. جميع الحقوق محفوظة."
    }
  },
   pricingPage: {
    header: {
      brand: "Qualitify",
      node: "عقدة الجزائر"
    },
    nav: {
      docs: "المستندات",
      pricing: "الأسعار",
      contact: "اتصل بنا",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج"
    },
    hero: {
      pill: "تسعير شفاف",
      title: "أسعار بسيطة",
      subtitle: "خطة واحدة. كل شيء متضمن. بدون مفاجآت."
    },
    card: {
      tier: "الفئة",
      planName: "احترافي (Pro)",
      badge: "جميع الميزات متضمنة",
      price: "2500",
      currency: "د.ج",
      period: "/ شهر",
      tagline: "كل ما تحتاجه لتتبع كل مبيعة من جهة الخادم.",
      btnLabel: "ابدأ الآن",
      note: "قم بتنشيط حسابك خلال 24 ساعة من الدفع."
    },
    features: {
      livreOnly: "يطلق أحداث الشراء في Meta فقط عند حالة 'تم التوصيل (Livré)'",
      serverSide: "أحداث الشراء من جهة الخادم",
      realTimeRetry: "إعادة محاولة الأحداث الفاشلة في الوقت الفعلي",
      platforms: "يعمل مع Shopify و WooCommerce والمتاجر المخصصة",
      dashboard: "لوحة تحكم مع بث مباشر للأحداث",
      prioritySupport: "دعم ذو أولوية"
    },
    faq: {
      heading: "الأسئلة الشائعة"
    },
    faqs: {
      pay: {
        q: "كيف أدفع؟",
        a: "بالبطاقة البنكية (CIB) أو الذهبية (eDahabia)"
      },
      trial: {
        q: "هل توجد فترة تجريبية مجانية؟",
        a: "لا توجد فترة تجريبية — يستغرق الإعداد أقل من 5 دقائق وتظهر النتائج مع أول طلب."
      },
      duration: {
        q: "ما هي مدة الاشتراك؟",
        a: "شهرياً. قم بالتجديد كل شهر للحفاظ على تنشيط حسابك."
      }
    },
    footer: {
      brand: "Qualitify",
      docs: "المستندات",
      pricing: "الأسعار",
      contact: "اتصل بنا",
      copy: "© 2026 Qualitify Systems Inc. جميع الحقوق محفوظة."
    }
  }




}