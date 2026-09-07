const { createClient } = supabase;
const sb = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

// ==========================================================
// ভাষা / Language (i18n)
// ==========================================================
const TRANSLATIONS = {
  bn: {
    appName: 'হিসাব খাতা',
    tagline: 'গ্রাহক, বিক্রি ও বাকির হিসাব — এক জায়গায়',
    tabLogin: 'লগইন করুন',
    tabActivate: 'নতুন? কোড দিয়ে শুরু করুন',
    phoneLabel: 'মোবাইল নম্বর (দেশের কোডসহ)',
    phonePlaceholder: '+8801XXXXXXXXX',
    passwordLabel: 'পাসওয়ার্ড',
    passwordPlaceholder: 'পাসওয়ার্ড',
    loginBtn: 'প্রবেশ করুন',
    activateCodeLabel: 'অ্যাক্টিভেশন কোড',
    activateCodePlaceholder: 'যেমন: HK-7X92K',
    activatePhoneLabel: 'আপনার মোবাইল নম্বর (দেশের কোডসহ)',
    activatePassLabel: 'একটা পাসওয়ার্ড সেট করুন',
    activatePassPlaceholder: 'ন্যূনতম ৬ অক্ষর',
    activateBtn: 'অ্যাক্টিভেট করুন',
    busy: 'অপেক্ষা করুন…',
    errFillLogin: 'মোবাইল নম্বর ও পাসওয়ার্ড দিন।',
    errWrongLogin: 'মোবাইল নম্বর বা পাসওয়ার্ড সঠিক নয়।',
    errFillAll: 'সব ঘর পূরণ করুন।',
    errShortPass: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।',
    errBadCode: 'কোডটি সঠিক নয় অথবা ইতিমধ্যে ব্যবহার হয়ে গেছে।',
    genericErr: 'একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।',
    navDashboard: 'ড্যাশবোর্ড',
    navCustomers: 'গ্রাহক তালিকা',
    navProducts: 'পণ্য',
    navOrders: 'অর্ডার',
    statCustomers: 'মোট গ্রাহক',
    statSales: 'মোট বিক্রি',
    statDue: 'মোট বাকি',
    recentTx: 'সাম্প্রতিক লেনদেন',
    noTx: 'এখনো কোনো লেনদেন নেই।',
    unknownCustomer: 'অজানা গ্রাহক',
    typeSale: 'বিক্রি',
    typePayment: 'পরিশোধ',
    customerListTitle: 'গ্রাহক তালিকা',
    addCustomerBtn: '+ নতুন গ্রাহক',
    noCustomersYet: 'এখনো কোনো গ্রাহক যোগ করা হয়নি। নতুন গ্রাহক যোগ করে শুরু করুন।',
    dueSuffix: 'বাকি',
    paidLabel: 'পরিশোধিত',
    backToList: '← গ্রাহক তালিকায় ফিরুন',
    noPhone: 'ফোন নম্বর নেই',
    totalSaleLabel: 'মোট বিক্রি',
    totalPaidLabel: 'মোট পরিশোধ',
    currentDueLabel: 'বর্তমান বাকি',
    sendWhatsapp: 'হোয়াটসঅ্যাপে বার্তা পাঠান',
    sendSms: 'এসএমএস পাঠান',
    addSaleBtn: '+ নতুন বিক্রি',
    addPaymentBtn: '+ পরিশোধ যোগ করুন',
    ledgerTitle: 'লেনদেনের হিসাব',
    noCustomerTx: 'এই গ্রাহকের কোনো লেনদেন নেই।',
    addCustomerTitle: 'নতুন গ্রাহক',
    nameLabel: 'নাম',
    namePlaceholder: 'যেমন: রহিম উদ্দিন',
    custPhoneLabel: 'মোবাইল নম্বর (দেশের কোডসহ দিলে ভালো হয়)',
    custPhonePlaceholder: '+8801XXXXXXXXX',
    addressLabel: 'ঠিকানা (ঐচ্ছিক)',
    addressPlaceholder: 'যেমন: মিরপুর, ঢাকা',
    cancel: 'বাতিল',
    save: 'সংরক্ষণ করুন',
    addTxSaleTitle: 'নতুন বিক্রি যোগ করুন',
    addTxPaymentTitle: 'পরিশোধ যোগ করুন',
    txTypeLabel: 'ধরন',
    txTypeSale: 'বিক্রি (বাকি বাড়বে)',
    txTypePayment: 'পরিশোধ (বাকি কমবে)',
    amountLabel: 'টাকার পরিমাণ',
    noteLabel: 'বিবরণ (ঐচ্ছিক)',
    notePlaceholder: 'যেমন: ৫ কেজি চাল',
    settingsTitle: 'সেটিংস',
    languageLabel: 'ভাষা',
    logoLabel: 'লোগো',
    bizNameLabel: 'ব্যবসার নাম',
    changeLoginPhone: 'লগইন মোবাইল নম্বর পরিবর্তন',
    changeLoginPhonePh: 'নতুন মোবাইল নম্বর (না বদলালে খালি রাখুন)',
    newPasswordLabel: 'নতুন পাসওয়ার্ড (না বদলালে খালি রাখুন)',
    currentPasswordLabel: 'বর্তমান পাসওয়ার্ড (যেকোনো পরিবর্তন নিশ্চিত করতে আবশ্যক)',
    resetInfo: 'এই বাটনে চাপলে শুধু আপনার নিজের ব্যবসার গ্রাহক ও লেনদেন মুছে যাবে — অন্য কোনো গ্রাহকের ডেটার সাথে এর কোনো সম্পর্ক নেই।',
    resetBtn: 'আমার সব গ্রাহক ও লেনদেন মুছে ফেলুন',
    logoutBtn: 'লগআউট করুন',
    resetConfirmTitle: 'নিশ্চিত করুন',
    resetConfirmBody: 'এই কাজটি ফেরানো যাবে না। শুধু আপনার নিজের অ্যাকাউন্টের গ্রাহক ও লেনদেন মুছে যাবে। আপনি কি নিশ্চিত?',
    noCancel: 'না, বাতিল করুন',
    yesDelete: 'হ্যাঁ, মুছে ফেলুন',
    loading: 'লোড হচ্ছে…',
    saving: 'সংরক্ষণ হচ্ছে…',
    toastCustomerAdded: 'নতুন গ্রাহক যোগ করা হয়েছে',
    toastSaleAdded: 'বিক্রি যোগ করা হয়েছে',
    toastPaymentAdded: 'পরিশোধ যোগ করা হয়েছে',
    toastSettingsSaved: 'সেটিংস সংরক্ষণ করা হয়েছে',
    toastDataDeleted: 'আপনার সব ডেটা মুছে ফেলা হয়েছে',
    currencySuffix: '৳',
    needCurrentPass: 'যেকোনো পরিবর্তনের জন্য বর্তমান পাসওয়ার্ড দিন।',
    wrongCurrentPass: 'বর্তমান পাসওয়ার্ড সঠিক নয়।',
    whatsappMsg: (name,biz,amt)=> `প্রিয় ${name}, আপনার কাছে ${biz} এর ${amt} বাকি আছে। সুবিধামতো পরিশোধ করলে কৃতজ্ঞ থাকব। ধন্যবাদ।`,
    smsMsg: (name,biz,amt)=> `প্রিয় ${name}, আপনার কাছে ${biz} এর ${amt} বাকি আছে। ধন্যবাদ।`,
    autoSaleMsg: (name,biz,note,amt,due)=> `প্রিয় ${name}, ${biz} থেকে আপনি ${note ? note+' ' : ''}${amt} এর কেনাকাটা করেছেন। বর্তমানে আপনার মোট বাকি ${due}। ধন্যবাদ।`,
    autoPaymentMsg: (name,biz,amt,due)=> `প্রিয় ${name}, ${biz}-কে আপনি ${amt} পরিশোধ করেছেন। বর্তমানে আপনার বাকি ${due}। ধন্যবাদ।`,
    channelPickerTitle: 'গ্রাহককে জানাবেন কীভাবে?',
    channelPickerBody: 'লেনদেন সংরক্ষণ হয়ে গেছে। এখন গ্রাহককে জানাতে চাইলে একটা মাধ্যম বেছে নিন।',
    channelWhatsapp: 'WhatsApp (অটোমেটিক পাঠানো হবে)',
    channelImo: 'imo (বার্তা কপি হবে, নিজে পাঠাতে হবে)',
    channelSkip: 'এখন না, বাদ দিন',
    toastWaSent: 'WhatsApp-এ বার্তা পাঠানো হয়েছে',
    toastWaFailed: 'WhatsApp পাঠাতে সমস্যা হয়েছে — Twilio সেটআপ চেক করুন',
    toastImoCopied: 'বার্তা কপি হয়েছে — এখন imo খুলে এই নম্বরে পেস্ট করে পাঠান',
    productsTitle: 'পণ্যের তালিকা',
    addProductBtn: '+ নতুন পণ্য',
    noProductsYet: 'এখনো কোনো পণ্য যোগ করা হয়নি।',
    productNameLabel: 'পণ্যের নাম',
    productNamePlaceholder: 'যেমন: চাল (৫ কেজি)',
    productPriceLabel: 'দাম',
    addProductTitle: 'নতুন পণ্য',
    ordersTitle: 'নতুন অর্ডার',
    noOrdersYet: 'এখনো কোনো অর্ডার আসেনি।',
    confirmOrderBtn: 'কনফার্ম করুন',
    rejectOrderBtn: 'বাতিল করুন',
    orderTotalLabel: 'মোট',
    shareLinkLabel: 'গ্রাহকের অর্ডার লিংক (এটা শেয়ার করুন)',
    copyLink: 'কপি করুন',
    linkCopied: 'লিংক কপি হয়েছে',
    storefrontTagline: 'পণ্য বেছে অর্ডার করুন',
    yourNameLabel: 'আপনার নাম',
    yourPhoneLabel: 'আপনার মোবাইল নম্বর',
    placeOrderBtn: 'অর্ডার করুন',
    orderPlacedTitle: 'ধন্যবাদ!',
    orderPlacedBody: 'আপনার অর্ডারটি জমা হয়েছে, দোকান থেকে শীঘ্রই যোগাযোগ করা হবে।',
    emptyCartError: 'অন্তত একটা পণ্য বেছে নিন।',
    storefrontNotFound: 'দোকান খুঁজে পাওয়া যায়নি অথবা এখনো সক্রিয় হয়নি।',
    orderErrFillName: 'নাম ও মোবাইল নম্বর দিন।',
    pendingLabel: 'নতুন',
    confirmedLabel: 'কনফার্ম হয়েছে',
    rejectedLabel: 'বাতিল হয়েছে',
    toastProductAdded: 'পণ্য যোগ করা হয়েছে',
    toastProductDeleted: 'পণ্য মুছে ফেলা হয়েছে',
    toastOrderConfirmed: 'অর্ডার কনফার্ম করা হয়েছে ও বিক্রি হিসেবে যোগ হয়েছে',
    toastOrderRejected: 'অর্ডার বাতিল করা হয়েছে',
    orderFromLabel: 'গ্রাহক',
    cartTotalLabel: 'মোট',
  },
  ar: {
    appName: 'دفتر الحسابات',
    tagline: 'حسابات العملاء والمبيعات والمستحقات — في مكان واحد',
    tabLogin: 'تسجيل الدخول',
    tabActivate: 'جديد؟ ابدأ برمز التفعيل',
    phoneLabel: 'رقم الهاتف (مع رمز الدولة)',
    phonePlaceholder: '+964XXXXXXXXXX',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'كلمة المرور',
    loginBtn: 'دخول',
    activateCodeLabel: 'رمز التفعيل',
    activateCodePlaceholder: 'مثال: HK-7X92K',
    activatePhoneLabel: 'رقم هاتفك (مع رمز الدولة)',
    activatePassLabel: 'عيّن كلمة مرور',
    activatePassPlaceholder: '٦ أحرف على الأقل',
    activateBtn: 'تفعيل',
    busy: 'الرجاء الانتظار…',
    errFillLogin: 'أدخل رقم الهاتف وكلمة المرور.',
    errWrongLogin: 'رقم الهاتف أو كلمة المرور غير صحيحة.',
    errFillAll: 'يرجى تعبئة جميع الحقول.',
    errShortPass: 'يجب أن تكون كلمة المرور ٦ أحرف على الأقل.',
    errBadCode: 'الرمز غير صحيح أو تم استخدامه من قبل.',
    genericErr: 'حدث خطأ، حاول مرة أخرى.',
    navDashboard: 'الرئيسية',
    navCustomers: 'قائمة العملاء',
    navProducts: 'المنتجات',
    navOrders: 'الطلبات',
    statCustomers: 'إجمالي العملاء',
    statSales: 'إجمالي المبيعات',
    statDue: 'إجمالي المستحقات',
    recentTx: 'أحدث المعاملات',
    noTx: 'لا توجد معاملات بعد.',
    unknownCustomer: 'عميل غير معروف',
    typeSale: 'بيع',
    typePayment: 'دفعة',
    customerListTitle: 'قائمة العملاء',
    addCustomerBtn: '+ عميل جديد',
    noCustomersYet: 'لم تتم إضافة أي عميل بعد. أضف عميلاً جديداً للبدء.',
    dueSuffix: 'مستحق',
    paidLabel: 'مسدد',
    backToList: '→ العودة إلى قائمة العملاء',
    noPhone: 'لا يوجد رقم هاتف',
    totalSaleLabel: 'إجمالي المبيعات',
    totalPaidLabel: 'إجمالي المدفوع',
    currentDueLabel: 'المستحق الحالي',
    sendWhatsapp: 'إرسال رسالة واتساب',
    sendSms: 'إرسال رسالة نصية',
    addSaleBtn: '+ بيع جديد',
    addPaymentBtn: '+ إضافة دفعة',
    ledgerTitle: 'سجل المعاملات',
    noCustomerTx: 'لا توجد معاملات لهذا العميل.',
    addCustomerTitle: 'عميل جديد',
    nameLabel: 'الاسم',
    namePlaceholder: 'مثال: أحمد محمد',
    custPhoneLabel: 'رقم الهاتف (يفضل مع رمز الدولة)',
    custPhonePlaceholder: '+964XXXXXXXXXX',
    addressLabel: 'العنوان (اختياري)',
    addressPlaceholder: 'مثال: بغداد، الكرادة',
    cancel: 'إلغاء',
    save: 'حفظ',
    addTxSaleTitle: 'إضافة عملية بيع جديدة',
    addTxPaymentTitle: 'إضافة دفعة',
    txTypeLabel: 'النوع',
    txTypeSale: 'بيع (سيزيد المستحق)',
    txTypePayment: 'دفعة (سينقص المستحق)',
    amountLabel: 'المبلغ',
    noteLabel: 'ملاحظة (اختياري)',
    notePlaceholder: 'مثال: ٥ كيلو أرز',
    settingsTitle: 'الإعدادات',
    languageLabel: 'اللغة',
    logoLabel: 'الشعار',
    bizNameLabel: 'اسم النشاط التجاري',
    changeLoginPhone: 'تغيير رقم هاتف الدخول',
    changeLoginPhonePh: 'رقم هاتف جديد (اتركه فارغاً إذا لم تُرد التغيير)',
    newPasswordLabel: 'كلمة مرور جديدة (اتركها فارغة إذا لم تُرد التغيير)',
    currentPasswordLabel: 'كلمة المرور الحالية (مطلوبة لتأكيد أي تغيير)',
    resetInfo: 'هذا الزر يحذف فقط عملاء ومعاملات نشاطك التجاري الخاص — لا علاقة له ببيانات أي عميل آخر.',
    resetBtn: 'حذف جميع عملائي ومعاملاتي',
    logoutBtn: 'تسجيل الخروج',
    resetConfirmTitle: 'تأكيد',
    resetConfirmBody: 'لا يمكن التراجع عن هذا الإجراء. سيتم حذف عملاء ومعاملات حسابك فقط. هل أنت متأكد؟',
    noCancel: 'لا، إلغاء',
    yesDelete: 'نعم، احذف',
    loading: 'جارٍ التحميل…',
    saving: 'جارٍ الحفظ…',
    toastCustomerAdded: 'تمت إضافة عميل جديد',
    toastSaleAdded: 'تمت إضافة عملية البيع',
    toastPaymentAdded: 'تمت إضافة الدفعة',
    toastSettingsSaved: 'تم حفظ الإعدادات',
    toastDataDeleted: 'تم حذف جميع بياناتك',
    currencySuffix: '',
    needCurrentPass: 'أدخل كلمة المرور الحالية لتأكيد أي تغيير.',
    wrongCurrentPass: 'كلمة المرور الحالية غير صحيحة.',
    whatsappMsg: (name,biz,amt)=> `عزيزي ${name}، يوجد لدى ${biz} مبلغ مستحق عليك قدره ${amt}. نكون شاكرين لو تم السداد في أقرب وقت مناسب. شكراً لك.`,
    smsMsg: (name,biz,amt)=> `عزيزي ${name}، يوجد لدى ${biz} مبلغ مستحق عليك قدره ${amt}. شكراً لك.`,
    autoSaleMsg: (name,biz,note,amt,due)=> `عزيزي ${name}، لقد اشتريت ${note ? note+' ' : ''}بمبلغ ${amt} من ${biz}. إجمالي المستحق عليك حالياً ${due}. شكراً لك.`,
    autoPaymentMsg: (name,biz,amt,due)=> `عزيزي ${name}، لقد قمت بدفع ${amt} إلى ${biz}. المستحق عليك حالياً ${due}. شكراً لك.`,
    channelPickerTitle: 'كيف تريد إبلاغ العميل؟',
    channelPickerBody: 'تم حفظ المعاملة. اختر وسيلة لإبلاغ العميل الآن إذا أردت.',
    channelWhatsapp: 'واتساب (سيُرسل تلقائياً)',
    channelImo: 'imo (سيتم نسخ الرسالة، أرسلها بنفسك)',
    channelSkip: 'ليس الآن',
    toastWaSent: 'تم إرسال الرسالة عبر واتساب',
    toastWaFailed: 'فشل الإرسال عبر واتساب — تحقق من إعداد Twilio',
    toastImoCopied: 'تم نسخ الرسالة — افتح imo والصقها لهذا الرقم',
    productsTitle: 'قائمة المنتجات',
    addProductBtn: '+ منتج جديد',
    noProductsYet: 'لم تتم إضافة أي منتج بعد.',
    productNameLabel: 'اسم المنتج',
    productNamePlaceholder: 'مثال: أرز (٥ كيلو)',
    productPriceLabel: 'السعر',
    addProductTitle: 'منتج جديد',
    ordersTitle: 'الطلبات الجديدة',
    noOrdersYet: 'لا توجد طلبات بعد.',
    confirmOrderBtn: 'تأكيد',
    rejectOrderBtn: 'رفض',
    orderTotalLabel: 'الإجمالي',
    shareLinkLabel: 'رابط الطلب للعملاء (شارك هذا الرابط)',
    copyLink: 'نسخ',
    linkCopied: 'تم نسخ الرابط',
    storefrontTagline: 'اختر المنتجات واطلب',
    yourNameLabel: 'اسمك',
    yourPhoneLabel: 'رقم هاتفك',
    placeOrderBtn: 'إرسال الطلب',
    orderPlacedTitle: 'شكراً لك!',
    orderPlacedBody: 'تم استلام طلبك، سيتم التواصل معك قريباً.',
    emptyCartError: 'اختر منتجاً واحداً على الأقل.',
    storefrontNotFound: 'لم يتم العثور على المتجر أو لم يتم تفعيله بعد.',
    orderErrFillName: 'أدخل الاسم ورقم الهاتف.',
    pendingLabel: 'جديد',
    confirmedLabel: 'تم التأكيد',
    rejectedLabel: 'مرفوض',
    toastProductAdded: 'تمت إضافة المنتج',
    toastProductDeleted: 'تم حذف المنتج',
    toastOrderConfirmed: 'تم تأكيد الطلب وإضافته كعملية بيع',
    toastOrderRejected: 'تم رفض الطلب',
    orderFromLabel: 'العميل',
    cartTotalLabel: 'الإجمالي',
  }
};
function t(key){ return TRANSLATIONS[state.lang][key]; }

let state = {
  loaded:false,
  lang: localStorage.getItem('hk_lang') || 'bn',
  session:null,
  workspace:null,
  customers:[],
  transactions:[],
  products:[],
  orders:[],
  view:'dashboard',
  selectedId:null,
  gateTab:'login',
  showAddCustomer:false,
  showAddTx:false,
  showSettings:false,
  showResetConfirm:false,
  showAddProduct:false,
  showChannelPicker:false,
  pendingReminder:null,
  txType:'sale',
  toastMsg:null,
  gateError:'',
  gateBusy:false,
  settingsError:'',
  settingsBusy:false,
  publicMode:false,
  publicWorkspaceId:null,
  storefront:null,
  cart:{},
  storefrontError:'',
  storefrontBusy:false,
  storefrontDone:false,
};

function setLang(l){
  state.lang = l;
  localStorage.setItem('hk_lang', l);
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = l;
  render();
}

function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function bn(n){ return Number(n||0).toLocaleString(state.lang==='ar' ? 'en-US' : 'bn-BD'); }
function bnDate(d){ return new Date(d).toLocaleDateString(state.lang==='ar' ? 'ar-IQ' : 'bn-BD',{day:'numeric',month:'short',year:'numeric'}); }
function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function phoneToEmail(phone){ return phone.replace(/[^0-9]/g,'') + '@hisabkhata.app'; }
function currencySuffix(){ return t('currencySuffix') || ''; }

// ==========================================================
// শুরু / রাউটিং — সাধারণ অ্যাপ vs পাবলিক অর্ডার পেজ
// ==========================================================
async function boot(){
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = state.lang;

  const params = new URLSearchParams(location.search);
  const orderWs = params.get('order');
  if(orderWs){
    state.publicMode = true;
    state.publicWorkspaceId = orderWs;
    state.loaded = true;
    await loadStorefront();
    return;
  }

  const { data:{ session } } = await sb.auth.getSession();
  state.session = session;
  if(session){ await loadWorkspaceAndData(); }
  state.loaded = true;
  render();
}

async function loadStorefront(){
  const { data, error } = await sb.rpc('get_storefront', { p_workspace_id: state.publicWorkspaceId });
  if(error || !data || data.length===0){ state.storefrontError = t('storefrontNotFound'); render(); return; }
  state.storefront = data[0];
  render();
}

async function loadWorkspaceAndData(){
  const { data: ws, error: wsErr } = await sb.from('workspaces').select('*').single();
  if(wsErr || !ws){ await sb.auth.signOut(); state.session=null; state.workspace=null; return; }
  state.workspace = ws;
  const { data: custs } = await sb.from('customers').select('*').order('created_at', {ascending:true});
  state.customers = custs || [];
  const { data: txs } = await sb.from('transactions').select('*').order('tx_date', {ascending:false});
  state.transactions = txs || [];
  const { data: prods } = await sb.from('products').select('*').order('created_at', {ascending:true});
  state.products = prods || [];
  const { data: ords } = await sb.from('orders').select('*, order_items(*)').order('created_at', {ascending:false});
  state.orders = ords || [];
}

function custDue(id){ return state.transactions.filter(t=>t.customer_id===id).reduce((s,t)=> s+(t.type==='sale'?Number(t.amount):-Number(t.amount)),0); }
function totals(){
  const totalSale = state.transactions.filter(t=>t.type==='sale').reduce((s,t)=>s+Number(t.amount),0);
  const totalPaid = state.transactions.filter(t=>t.type==='payment').reduce((s,t)=>s+Number(t.amount),0);
  return { totalSale, totalPaid, totalDue: totalSale-totalPaid, custCount: state.customers.length };
}
function showToast(msg){ state.toastMsg = msg; render(); setTimeout(()=>{ state.toastMsg=null; render(); }, 2600); }
function setView(v){ state.view=v; state.selectedId=null; render(); }
function openDetail(id){ state.view='detail'; state.selectedId=id; render(); }

// ==========================================================
// গ্রাহক ও লেনদেন
// ==========================================================
async function addCustomer(name, phone, address){
  const { error } = await sb.from('customers').insert({ workspace_id: state.workspace.id, name, phone, address });
  if(error){ showToast('Error: '+error.message); return; }
  const { data } = await sb.from('customers').select('*').order('created_at', {ascending:true});
  state.customers = data || [];
  state.showAddCustomer=false; showToast(t('toastCustomerAdded'));
}

async function addTransaction(customerId, type, amount, note){
  const { error } = await sb.from('transactions').insert({ workspace_id: state.workspace.id, customer_id: customerId, type, amount, note });
  if(error){ showToast('Error: '+error.message); return; }
  const { data } = await sb.from('transactions').select('*').order('tx_date', {ascending:false});
  state.transactions = data || [];
  state.showAddTx=false;
  showToast(type==='sale' ? t('toastSaleAdded') : t('toastPaymentAdded'));
  const cust = state.customers.find(c=>c.id===customerId);
  if(cust && cust.phone){
    state.pendingReminder = { customerId, type, amount, note };
    state.showChannelPicker = true;
  }
  render();
}

function buildReminderMessage(customerId, type, amount, note){
  const cust = state.customers.find(c=>c.id===customerId);
  const due = custDue(customerId);
  const amtStr = bn(amount)+currencySuffix();
  const dueStr = bn(due)+currencySuffix();
  return type==='sale'
    ? t('autoSaleMsg')(cust.name, state.workspace.business_name||'', note||'', amtStr, dueStr)
    : t('autoPaymentMsg')(cust.name, state.workspace.business_name||'', amtStr, dueStr);
}

function waLink(cust, amount){
  const msg = t('whatsappMsg')(cust.name, state.workspace.business_name || '', bn(amount)+currencySuffix());
  const digits=(cust.phone||'').replace(/[^0-9]/g,'');
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
function smsLink(cust, amount){
  const msg = t('smsMsg')(cust.name, state.workspace.business_name || '', bn(amount)+currencySuffix());
  return `sms:${cust.phone||''}?body=${encodeURIComponent(msg)}`;
}

async function sendViaWhatsapp(customerId, type, amount, note){
  const cust = state.customers.find(c=>c.id===customerId);
  const digits = (cust.phone||'').replace(/[^0-9]/g,'');
  if(!digits) return;
  const msg = buildReminderMessage(customerId, type, amount, note);
  try{
    await sb.functions.invoke('send-reminder', { body: { to: '+'+digits, message: msg } });
    showToast(t('toastWaSent'));
  } catch(e){
    console.error('whatsapp send failed', e);
    showToast(t('toastWaFailed'));
  }
}

async function sendViaImo(customerId, type, amount, note){
  const cust = state.customers.find(c=>c.id===customerId);
  const msg = buildReminderMessage(customerId, type, amount, note);
  try{ await navigator.clipboard.writeText(msg); } catch(e){}
  showToast(t('toastImoCopied') + ' (' + (cust.phone||'') + ')');
}

// ==========================================================
// পণ্য
// ==========================================================
async function addProduct(name, price){
  const { error } = await sb.from('products').insert({ workspace_id: state.workspace.id, name, price });
  if(error){ showToast('Error: '+error.message); return; }
  const { data } = await sb.from('products').select('*').order('created_at', {ascending:true});
  state.products = data || [];
  state.showAddProduct=false; showToast(t('toastProductAdded'));
  render();
}
async function deleteProduct(id){
  await sb.from('products').delete().eq('id', id);
  state.products = state.products.filter(p=>p.id!==id);
  showToast(t('toastProductDeleted'));
  render();
}

// ==========================================================
// অর্ডার (মালিকের ড্যাশবোর্ড থেকে কনফার্ম/বাতিল)
// ==========================================================
async function confirmOrder(order){
  let cust = state.customers.find(c=> (c.phone||'').replace(/[^0-9]/g,'') === (order.customer_phone||'').replace(/[^0-9]/g,'') && (c.phone||'')!=='' );
  if(!cust){
    const { data, error } = await sb.from('customers').insert({ workspace_id: state.workspace.id, name: order.customer_name, phone: order.customer_phone, address:'' }).select().single();
    if(error){ showToast('Error: '+error.message); return; }
    cust = data;
    state.customers.push(cust);
  }
  const total = (order.order_items||[]).reduce((s,it)=> s + Number(it.price)*Number(it.quantity), 0);
  const note = (order.order_items||[]).map(it=> `${it.product_name} x${bn(it.quantity)}`).join(', ');

  await sb.from('orders').update({ status:'confirmed' }).eq('id', order.id);
  state.orders = state.orders.map(o=> o.id===order.id ? {...o, status:'confirmed'} : o);

  await addTransaction(cust.id, 'sale', total, note);
  showToast(t('toastOrderConfirmed'));
}

async function rejectOrder(orderId){
  await sb.from('orders').update({ status:'rejected' }).eq('id', orderId);
  state.orders = state.orders.map(o=> o.id===orderId ? {...o, status:'rejected'} : o);
  showToast(t('toastOrderRejected'));
  render();
}

// ==========================================================
// পাবলিক স্টোরফ্রন্ট (কার্ট + অর্ডার সাবমিট)
// ==========================================================
function cartTotal(){
  if(!state.storefront) return 0;
  return Object.entries(state.cart).reduce((sum,[pid,qty])=>{
    const p = state.storefront.products.find(x=>x.id===pid);
    return sum + (p ? Number(p.price)*qty : 0);
  }, 0);
}
function changeCartQty(productId, delta){
  const cur = state.cart[productId] || 0;
  const next = Math.max(0, cur + delta);
  if(next===0) delete state.cart[productId]; else state.cart[productId] = next;
  render();
}
async function submitOrder(name, phone){
  state.storefrontError='';
  if(!name || !phone){ state.storefrontError = t('orderErrFillName'); render(); return; }
  const items = Object.entries(state.cart).map(([product_id, quantity])=>({ product_id, quantity }));
  if(items.length===0){ state.storefrontError = t('emptyCartError'); render(); return; }
  state.storefrontBusy = true; render();
  try{
    const { error } = await sb.rpc('place_order', {
      p_workspace_id: state.publicWorkspaceId,
      p_customer_name: name,
      p_customer_phone: phone,
      p_items: items
    });
    if(error) throw new Error(error.message);
    state.storefrontDone = true;
    state.storefrontBusy = false;
    render();
  } catch(e){
    state.storefrontBusy = false;
    state.storefrontError = e.message || t('genericErr');
    render();
  }
}

// ==========================================================
// রেন্ডার
// ==========================================================
function render(){
  const root = document.getElementById('root');
  if(!state.loaded){
    root.innerHTML = `<div style="padding:40px;text-align:center;color:var(--ink-soft);">${t('loading')}</div>`;
    return;
  }
  if(state.publicMode){ root.innerHTML = renderStorefront(); attachStorefrontEvents(); return; }
  if(!state.session || !state.workspace){ root.innerHTML = renderGate(); attachGateEvents(); return; }

  const t_ = totals();
  const logoHtml = state.workspace.logo_url
    ? `<img src="${state.workspace.logo_url}" alt="logo" style="width:34px;height:34px;border-radius:6px;object-fit:cover;">`
    : `<div style="width:34px;height:34px;border-radius:6px;background:rgba(244,239,226,.15);"></div>`;

  let html = `
    <header class="cover">
      <div class="cover-top">
        <div class="cover-title-wrap">
          ${logoHtml}
          <div><h1 class="cover-title">${escapeHtml(state.workspace.business_name || t('appName'))}</h1></div>
        </div>
        <button class="gear-btn" id="gearBtn" title="${t('settingsTitle')}">⚙</button>
      </div>
      <p class="cover-sub">${t('tagline')}</p>
    </header>
    <nav class="tabs">
      <button data-tab="dashboard" class="${state.view==='dashboard'?'active':''}">${t('navDashboard')}</button>
      <button data-tab="customers" class="${state.view==='customers'||state.view==='detail'?'active':''}">${t('navCustomers')}</button>
      <button data-tab="products" class="${state.view==='products'?'active':''}">${t('navProducts')}</button>
      <button data-tab="orders" class="${state.view==='orders'?'active':''}">${t('navOrders')}</button>
    </nav>
    <main>
  `;
  if(state.view==='dashboard') html += renderDashboard(t_);
  else if(state.view==='customers') html += renderCustomers();
  else if(state.view==='detail') html += renderDetail();
  else if(state.view==='products') html += renderProducts();
  else if(state.view==='orders') html += renderOrders();
  html += `</main>`;

  if(state.showAddCustomer) html += renderAddCustomerSheet();
  if(state.showAddTx) html += renderAddTxSheet();
  if(state.showAddProduct) html += renderAddProductSheet();
  if(state.showSettings) html += renderSettingsSheet();
  if(state.showResetConfirm) html += renderResetConfirm();
  if(state.showChannelPicker) html += renderChannelPicker();
  if(state.toastMsg) html += `<div class="toast">${escapeHtml(state.toastMsg)}</div>`;

  root.innerHTML = html;
  attachEvents();
}

function langSwitcher(){
  return `
    <div class="lang-switch">
      <button data-setlang="bn" class="${state.lang==='bn'?'on':''}">বাংলা</button>
      <button data-setlang="ar" class="${state.lang==='ar'?'on':''}">العربية</button>
    </div>`;
}

function renderGate(){
  const isLogin = state.gateTab==='login';
  return `
  <div class="gate-screen">
    <div class="gate-card">
      ${langSwitcher()}
      <h2 class="gate-title">${t('appName')}</h2>
      <div class="seg" style="margin-bottom:16px;">
        <button data-gatetab="login" class="${isLogin?'on':''}">${t('tabLogin')}</button>
        <button data-gatetab="activate" class="${!isLogin?'on':''}">${t('tabActivate')}</button>
      </div>
      ${isLogin ? `
        <div class="field"><label>${t('phoneLabel')}</label><input id="loginPhone" placeholder="${t('phonePlaceholder')}"></div>
        <div class="field"><label>${t('passwordLabel')}</label><input id="loginPass" type="password" placeholder="${t('passwordPlaceholder')}"></div>
      ` : `
        <div class="field"><label>${t('activateCodeLabel')}</label><input id="actCode" placeholder="${t('activateCodePlaceholder')}"></div>
        <div class="field"><label>${t('activatePhoneLabel')}</label><input id="actPhone" placeholder="${t('phonePlaceholder')}"></div>
        <div class="field"><label>${t('activatePassLabel')}</label><input id="actPass" type="password" placeholder="${t('activatePassPlaceholder')}"></div>
      `}
      ${state.gateError?`<div class="field err">${escapeHtml(state.gateError)}</div>`:''}
      <button class="primary" id="gateSubmit" style="width:100%; margin-top:8px;" ${state.gateBusy?'disabled':''}>
        ${state.gateBusy ? t('busy') : (isLogin ? t('loginBtn') : t('activateBtn'))}
      </button>
    </div>
  </div>`;
}

function attachGateEvents(){
  document.querySelectorAll('[data-gatetab]').forEach(b=>{
    b.addEventListener('click', ()=>{ state.gateTab=b.dataset.gatetab; state.gateError=''; render(); });
  });
  document.querySelectorAll('[data-setlang]').forEach(b=>{
    b.addEventListener('click', ()=> setLang(b.dataset.setlang));
  });
  const submit = document.getElementById('gateSubmit');
  if(!submit) return;
  submit.addEventListener('click', async ()=>{
    const isLoginTab = state.gateTab==='login';
    let loginPhone='', loginPass='', code='', phone='', pass='';
    if(isLoginTab){
      loginPhone = document.getElementById('loginPhone').value.trim();
      loginPass = document.getElementById('loginPass').value;
    } else {
      code = document.getElementById('actCode').value.trim();
      phone = document.getElementById('actPhone').value.trim();
      pass = document.getElementById('actPass').value;
    }
    state.gateError=''; state.gateBusy=true; render();
    try{
      if(isLoginTab){
        if(!loginPhone || !loginPass) throw new Error(t('errFillLogin'));
        const { data, error } = await sb.auth.signInWithPassword({ email: phoneToEmail(loginPhone), password: loginPass });
        if(error) throw new Error(t('errWrongLogin'));
        state.session = data.session;
        await loadWorkspaceAndData();
      } else {
        if(!code || !phone || !pass) throw new Error(t('errFillAll'));
        if(pass.length<6) throw new Error(t('errShortPass'));
        const { data: valid } = await sb.rpc('check_activation_code', { p_code: code });
        if(!valid) throw new Error(t('errBadCode'));
        const { data: signUpData, error: signUpErr } = await sb.auth.signUp({ email: phoneToEmail(phone), password: pass });
        if(signUpErr) throw new Error(signUpErr.message);
        state.session = signUpData.session;
        const { error: actErr } = await sb.rpc('activate_workspace', { p_code: code, p_phone: phone });
        if(actErr) throw new Error(actErr.message);
        await loadWorkspaceAndData();
      }
      state.gateBusy=false; state.gateError='';
      render();
    } catch(e){
      state.gateBusy=false; state.gateError=e.message || t('genericErr');
      render();
    }
  });
}

function renderDashboard(t_){
  const recent = [...state.transactions].slice(0,6);
  let recentHtml = recent.length===0 ? `<div class="empty"><p>${t('noTx')}</p></div>` :
    recent.map(tx=>{
      const cust = state.customers.find(c=>c.id===tx.customer_id);
      return `<div class="activity-row">
        <div>
          <div class="who">${escapeHtml(cust?cust.name:t('unknownCustomer'))}</div>
          <div class="meta">${tx.type==='sale'?t('typeSale'):t('typePayment')} · ${bnDate(tx.tx_date)}${tx.note?' · '+escapeHtml(tx.note):''}</div>
        </div>
        <div class="amt ${tx.type==='sale'?'plus':'minus'}">${tx.type==='sale'?'+':'-'}${bn(tx.amount)}${currencySuffix()}</div>
      </div>`;
    }).join('');
  return `
    <div class="stats-row">
      <div class="stat"><div class="num">${bn(t_.custCount)}</div><div class="lbl">${t('statCustomers')}</div></div>
      <div class="stat paid"><div class="num">${bn(t_.totalSale)}${currencySuffix()}</div><div class="lbl">${t('statSales')}</div></div>
      <div class="stat due"><div class="num">${bn(t_.totalDue)}${currencySuffix()}</div><div class="lbl">${t('statDue')}</div></div>
    </div>
    <h2 class="section-title">${t('recentTx')}</h2>
    ${recentHtml}
  `;
}

function renderCustomers(){
  let rows;
  if(state.customers.length===0){
    rows = `<div class="empty"><p>${t('noCustomersYet')}</p></div>
      <button class="primary" id="emptyAddCust">${t('addCustomerBtn')}</button>`;
  } else {
    rows = state.customers.map(c=>{
      const due = custDue(c.id);
      return `<div class="cust-row" data-open="${c.id}">
        <div><div class="cust-name">${escapeHtml(c.name)}</div><div class="cust-phone">${escapeHtml(c.phone||'')}</div></div>
        <div class="due-pill ${due>0?'has-due':'clear'}">${due>0? bn(due)+currencySuffix()+' '+t('dueSuffix') : t('paidLabel')}</div>
      </div>`;
    }).join('');
  }
  return `
    <div class="row-between">
      <h2 class="section-title" style="margin:0;">${t('customerListTitle')}</h2>
      ${state.customers.length? `<button class="primary" id="addCustBtn">${t('addCustomerBtn')}</button>` : ''}
    </div>
    <div style="margin-top:12px;">${rows}</div>
  `;
}

function renderDetail(){
  const cust = state.customers.find(c=>c.id===state.selectedId);
  if(!cust) return `<div class="empty"><p>404</p></div>`;
  const due = custDue(cust.id);
  const txs = state.transactions.filter(t=>t.customer_id===cust.id);
  const totalSale = txs.filter(t=>t.type==='sale').reduce((s,t)=>s+Number(t.amount),0);
  const totalPaid = txs.filter(t=>t.type==='payment').reduce((s,t)=>s+Number(t.amount),0);
  let ledgerHtml = txs.length===0 ? `<div class="empty"><p>${t('noCustomerTx')}</p></div>` :
    txs.map(tx=>`
      <div class="activity-row" style="cursor:default;">
        <div><div class="who">${tx.type==='sale'?t('typeSale'):t('typePayment')}</div><div class="meta">${bnDate(tx.tx_date)}${tx.note?' · '+escapeHtml(tx.note):''}</div></div>
        <div class="amt ${tx.type==='sale'?'plus':'minus'}">${tx.type==='sale'?'+':'-'}${bn(tx.amount)}${currencySuffix()}</div>
      </div>`).join('');
  return `
    <button class="link-back" id="backBtn">${t('backToList')}</button>
    <div class="cust-head">
      <div class="name">${escapeHtml(cust.name)}</div>
      <div class="phone">${escapeHtml(cust.phone||t('noPhone'))}</div>
      <div class="stats-row">
        <div class="stat"><div class="num">${bn(totalSale)}${currencySuffix()}</div><div class="lbl">${t('totalSaleLabel')}</div></div>
        <div class="stat paid"><div class="num">${bn(totalPaid)}${currencySuffix()}</div><div class="lbl">${t('totalPaidLabel')}</div></div>
        <div class="stat due"><div class="num">${bn(due)}${currencySuffix()}</div><div class="lbl">${t('currentDueLabel')}</div></div>
      </div>
      <div class="msg-row">
        <a class="msg-btn wa" href="${due>0?waLink(cust,due):'#'}" target="_blank" rel="noopener" ${due<=0?'style="pointer-events:none;opacity:.4;"':''}>${t('sendWhatsapp')}</a>
        <a class="msg-btn sms" href="${due>0?smsLink(cust,due):'#'}" ${due<=0?'style="pointer-events:none;opacity:.4;"':''}>${t('sendSms')}</a>
      </div>
    </div>
    <div class="add-btns">
      <button class="primary" id="addSaleBtn">${t('addSaleBtn')}</button>
      <button class="ghost" id="addPaymentBtn">${t('addPaymentBtn')}</button>
    </div>
    <h2 class="section-title">${t('ledgerTitle')}</h2>
    ${ledgerHtml}
  `;
}

function renderProducts(){
  let rows;
  if(state.products.length===0){
    rows = `<div class="empty"><p>${t('noProductsYet')}</p></div>`;
  } else {
    rows = state.products.map(p=>`
      <div class="cust-row">
        <div><div class="cust-name">${escapeHtml(p.name)}</div></div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="amt plus">${bn(p.price)}${currencySuffix()}</div>
          <button class="ghost" data-delprod="${p.id}" style="padding:5px 10px; font-size:12px;">✕</button>
        </div>
      </div>`).join('');
  }
  return `
    <div class="row-between">
      <h2 class="section-title" style="margin:0;">${t('productsTitle')}</h2>
      <button class="primary" id="addProdBtn">${t('addProductBtn')}</button>
    </div>
    <div style="margin-top:12px;">${rows}</div>
  `;
}

function renderOrders(){
  const pending = state.orders.filter(o=>o.status==='pending');
  const others = state.orders.filter(o=>o.status!=='pending');
  function orderCard(o, showActions){
    const total = (o.order_items||[]).reduce((s,it)=>s+Number(it.price)*Number(it.quantity),0);
    const itemsStr = (o.order_items||[]).map(it=>`${it.product_name} x${bn(it.quantity)}`).join(', ');
    const statusLabel = o.status==='confirmed'?t('confirmedLabel'): o.status==='rejected'?t('rejectedLabel'): t('pendingLabel');
    const statusClass = o.status==='confirmed'?'paid':(o.status==='rejected'?'due':'');
    return `<div class="cust-head" style="margin-bottom:12px;">
      <div class="row-between">
        <div class="name">${escapeHtml(o.customer_name)}</div>
        <div class="due-pill ${statusClass==='paid'?'clear':(statusClass==='due'?'has-due':'')}">${statusLabel}</div>
      </div>
      <div class="phone">${escapeHtml(o.customer_phone)} · ${bnDate(o.created_at)}</div>
      <p style="font-size:13px; margin:10px 0; color:var(--ink);">${escapeHtml(itemsStr)}</p>
      <div class="amt plus" style="font-size:16px;">${t('orderTotalLabel')}: ${bn(total)}${currencySuffix()}</div>
      ${showActions ? `
        <div class="add-btns">
          <button class="primary" data-confirmorder="${o.id}">${t('confirmOrderBtn')}</button>
          <button class="ghost" data-rejectorder="${o.id}">${t('rejectOrderBtn')}</button>
        </div>` : ''}
    </div>`;
  }
  let html = `<h2 class="section-title" style="margin-top:0;">${t('ordersTitle')}</h2>`;
  if(pending.length===0 && others.length===0){
    html += `<div class="empty"><p>${t('noOrdersYet')}</p></div>`;
  } else {
    html += pending.map(o=>orderCard(o,true)).join('');
    if(others.length){
      html += others.map(o=>orderCard(o,false)).join('');
    }
  }
  return html;
}

function renderAddCustomerSheet(){
  return `<div class="overlay" id="custOverlay"><div class="sheet">
    <h3>${t('addCustomerTitle')}</h3>
    <div class="field"><label>${t('nameLabel')}</label><input id="custName" placeholder="${t('namePlaceholder')}"></div>
    <div class="field"><label>${t('custPhoneLabel')}</label><input id="custPhone" placeholder="${t('custPhonePlaceholder')}"></div>
    <div class="field"><label>${t('addressLabel')}</label><input id="custAddr" placeholder="${t('addressPlaceholder')}"></div>
    <div class="sheet-actions"><button class="ghost" id="cancelCust">${t('cancel')}</button><button class="primary" id="saveCust">${t('save')}</button></div>
  </div></div>`;
}

function renderAddTxSheet(){
  return `<div class="overlay" id="txOverlay"><div class="sheet">
    <h3>${state.txType==='sale'?t('addTxSaleTitle'):t('addTxPaymentTitle')}</h3>
    <div class="field"><label>${t('txTypeLabel')}</label>
      <div class="seg">
        <button data-type="sale" class="${state.txType==='sale'?'on':''}">${t('txTypeSale')}</button>
        <button data-type="payment" class="${state.txType==='payment'?'on':''}">${t('txTypePayment')}</button>
      </div>
    </div>
    <div class="field"><label>${t('amountLabel')}</label><input id="txAmount" type="number" inputmode="numeric" placeholder="0"></div>
    <div class="field"><label>${t('noteLabel')}</label><input id="txNote" placeholder="${t('notePlaceholder')}"></div>
    <div class="sheet-actions"><button class="ghost" id="cancelTx">${t('cancel')}</button><button class="primary" id="saveTx">${t('save')}</button></div>
  </div></div>`;
}

function renderAddProductSheet(){
  return `<div class="overlay" id="prodOverlay"><div class="sheet">
    <h3>${t('addProductTitle')}</h3>
    <div class="field"><label>${t('productNameLabel')}</label><input id="prodName" placeholder="${t('productNamePlaceholder')}"></div>
    <div class="field"><label>${t('productPriceLabel')}</label><input id="prodPrice" type="number" inputmode="numeric" placeholder="0"></div>
    <div class="sheet-actions"><button class="ghost" id="cancelProd">${t('cancel')}</button><button class="primary" id="saveProd">${t('save')}</button></div>
  </div></div>`;
}

function renderSettingsSheet(){
  const shareLink = `${location.origin}${location.pathname}?order=${state.workspace.id}`;
  return `<div class="overlay" id="settingsOverlay"><div class="sheet">
    <h3>${t('settingsTitle')}</h3>
    <div class="field"><label>${t('languageLabel')}</label>${langSwitcher()}</div>
    <div class="divider"></div>
    <div class="field">
      <label>${t('shareLinkLabel')}</label>
      <input id="shareLinkInput" readonly value="${escapeHtml(shareLink)}" style="font-size:12px;">
      <button class="ghost" id="copyShareLink" style="margin-top:8px; width:100%;">${t('copyLink')}</button>
    </div>
    <div class="divider"></div>
    <div class="field"><label>${t('logoLabel')}</label><input type="file" id="logoFile" accept="image/*"></div>
    <div class="field"><label>${t('bizNameLabel')}</label><input id="setBizName" value="${escapeHtml(state.workspace.business_name||'')}"></div>
    <div class="divider"></div>
    <div class="field"><label>${t('changeLoginPhone')}</label><input id="setPhone" placeholder="${t('changeLoginPhonePh')}"></div>
    <div class="field"><label>${t('newPasswordLabel')}</label><input id="setNewPass" type="password" placeholder=""></div>
    <div class="field"><label>${t('currentPasswordLabel')}</label><input id="setCurrentPass" type="password" placeholder=""></div>
    ${state.settingsError?`<div class="field err">${escapeHtml(state.settingsError)}</div>`:''}
    <div class="sheet-actions"><button class="ghost" id="cancelSettings">${t('cancel')}</button><button class="primary" id="saveSettings" ${state.settingsBusy?'disabled':''}>${state.settingsBusy?t('saving'):t('save')}</button></div>

    <div class="divider"></div>
    <p style="font-size:12.5px; color:var(--ink-soft); margin:0 0 12px; line-height:1.6;">${t('resetInfo')}</p>
    <button class="danger" id="resetDataBtn" style="width:100%;">${t('resetBtn')}</button>

    <div class="divider"></div>
    <button class="ghost" id="logoutBtn" style="width:100%;">${t('logoutBtn')}</button>
  </div></div>`;
}

function renderResetConfirm(){
  return `<div class="overlay" id="resetConfirmOverlay"><div class="sheet">
    <h3>${t('resetConfirmTitle')}</h3>
    <p style="font-size:13.5px; color:var(--ink-soft); line-height:1.6;">${t('resetConfirmBody')}</p>
    <div class="sheet-actions"><button class="ghost" id="cancelReset">${t('noCancel')}</button><button class="danger" id="confirmReset" style="flex:1;">${t('yesDelete')}</button></div>
  </div></div>`;
}

function renderChannelPicker(){
  return `<div class="overlay" id="channelOverlay"><div class="sheet">
    <h3>${t('channelPickerTitle')}</h3>
    <p style="font-size:13.5px; color:var(--ink-soft); line-height:1.6; margin:0 0 16px;">${t('channelPickerBody')}</p>
    <div style="display:flex; flex-direction:column; gap:10px;">
      <button class="msg-btn wa" id="pickWhatsapp" style="padding:12px;">${t('channelWhatsapp')}</button>
      <button class="msg-btn sms" id="pickImo" style="padding:12px;">${t('channelImo')}</button>
      <button class="ghost" id="pickSkip">${t('channelSkip')}</button>
    </div>
  </div></div>`;
}

// ==========================================================
// পাবলিক স্টোরফ্রন্ট রেন্ডার
// ==========================================================
function renderStorefront(){
  if(state.storefrontError && !state.storefront){
    return `<div class="gate-screen"><div class="gate-card" style="text-align:center;"><p>${escapeHtml(state.storefrontError)}</p></div></div>`;
  }
  if(!state.storefront){
    return `<div style="padding:40px;text-align:center;color:var(--ink-soft);">${t('loading')}</div>`;
  }
  if(state.storefrontDone){
    return `
    <header class="cover"><h1 class="cover-title">${escapeHtml(state.storefront.business_name||t('appName'))}</h1></header>
    <main>
      <div class="empty" style="padding:50px 16px;">
        <h2 class="section-title" style="margin-top:0;">${t('orderPlacedTitle')}</h2>
        <p>${t('orderPlacedBody')}</p>
      </div>
    </main>`;
  }
  const logoHtml = state.storefront.logo_url
    ? `<img src="${state.storefront.logo_url}" alt="logo" style="width:34px;height:34px;border-radius:6px;object-fit:cover;">`
    : '';
  const products = state.storefront.products || [];
  const prodRows = products.length===0 ? `<div class="empty"><p>${t('noProductsYet')}</p></div>` :
    products.map(p=>{
      const qty = state.cart[p.id] || 0;
      return `<div class="cust-row">
        <div><div class="cust-name">${escapeHtml(p.name)}</div><div class="cust-phone">${bn(p.price)}${currencySuffix()}</div></div>
        <div style="display:flex; align-items:center; gap:10px;">
          <button class="ghost" data-qtyminus="${p.id}" style="padding:4px 12px;">−</button>
          <span style="min-width:20px; text-align:center;">${bn(qty)}</span>
          <button class="ghost" data-qtyplus="${p.id}" style="padding:4px 12px;">+</button>
        </div>
      </div>`;
    }).join('');
  const total = cartTotal();
  return `
    <header class="cover">
      <div class="cover-title-wrap">${logoHtml}<h1 class="cover-title">${escapeHtml(state.storefront.business_name||t('appName'))}</h1></div>
      <p class="cover-sub">${t('storefrontTagline')}</p>
    </header>
    <main style="padding-bottom:100px;">
      ${prodRows}
      <h2 class="section-title">${t('orderTotalLabel')}: ${bn(total)}${currencySuffix()}</h2>
      <div class="field"><label>${t('yourNameLabel')}</label><input id="ofName" placeholder="${t('namePlaceholder')}"></div>
      <div class="field"><label>${t('yourPhoneLabel')}</label><input id="ofPhone" placeholder="${t('phonePlaceholder')}"></div>
      ${state.storefrontError?`<div class="field err">${escapeHtml(state.storefrontError)}</div>`:''}
      <button class="primary" id="placeOrderBtn" style="width:100%;" ${state.storefrontBusy?'disabled':''}>${state.storefrontBusy?t('busy'):t('placeOrderBtn')}</button>
    </main>
  `;
}

function attachStorefrontEvents(){
  document.querySelectorAll('[data-qtyplus]').forEach(b=> b.addEventListener('click', ()=> changeCartQty(b.dataset.qtyplus, 1)));
  document.querySelectorAll('[data-qtyminus]').forEach(b=> b.addEventListener('click', ()=> changeCartQty(b.dataset.qtyminus, -1)));
  const placeBtn = document.getElementById('placeOrderBtn');
  if(placeBtn) placeBtn.addEventListener('click', ()=>{
    const name = document.getElementById('ofName').value.trim();
    const phone = document.getElementById('ofPhone').value.trim();
    submitOrder(name, phone);
  });
}

// ==========================================================
// ইভেন্ট হ্যান্ডলার (মূল অ্যাপ)
// ==========================================================
function attachEvents(){
  const root = document.getElementById('root');

  const gearBtn = document.getElementById('gearBtn');
  if(gearBtn) gearBtn.addEventListener('click', ()=>{ state.showSettings=true; state.settingsError=''; render(); });

  root.querySelectorAll('nav.tabs button').forEach(b=> b.addEventListener('click', ()=> setView(b.dataset.tab)));
  root.querySelectorAll('[data-open]').forEach(el=> el.addEventListener('click', ()=> openDetail(el.dataset.open)));
  root.querySelectorAll('[data-setlang]').forEach(b=> b.addEventListener('click', ()=> setLang(b.dataset.setlang)));

  const addCustBtn = document.getElementById('addCustBtn') || document.getElementById('emptyAddCust');
  if(addCustBtn) addCustBtn.addEventListener('click', ()=>{ state.showAddCustomer=true; render(); });
  const cancelCust = document.getElementById('cancelCust');
  if(cancelCust) cancelCust.addEventListener('click', ()=>{ state.showAddCustomer=false; render(); });
  const custOverlay = document.getElementById('custOverlay');
  if(custOverlay) custOverlay.addEventListener('click', (e)=>{ if(e.target.id==='custOverlay'){ state.showAddCustomer=false; render(); } });
  const saveCustBtn = document.getElementById('saveCust');
  if(saveCustBtn) saveCustBtn.addEventListener('click', async ()=>{
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const addr = document.getElementById('custAddr').value.trim();
    if(!name){ document.getElementById('custName').style.borderColor='var(--due)'; return; }
    await addCustomer(name, phone, addr); render();
  });

  const backBtn = document.getElementById('backBtn');
  if(backBtn) backBtn.addEventListener('click', ()=>{ state.view='customers'; state.selectedId=null; render(); });
  const addSaleBtn = document.getElementById('addSaleBtn');
  if(addSaleBtn) addSaleBtn.addEventListener('click', ()=>{ state.txType='sale'; state.showAddTx=true; render(); });
  const addPaymentBtn = document.getElementById('addPaymentBtn');
  if(addPaymentBtn) addPaymentBtn.addEventListener('click', ()=>{ state.txType='payment'; state.showAddTx=true; render(); });
  root.querySelectorAll('.seg button[data-type]').forEach(b=> b.addEventListener('click', ()=>{ state.txType=b.dataset.type; render(); }));
  const cancelTx = document.getElementById('cancelTx');
  if(cancelTx) cancelTx.addEventListener('click', ()=>{ state.showAddTx=false; render(); });
  const txOverlay = document.getElementById('txOverlay');
  if(txOverlay) txOverlay.addEventListener('click', (e)=>{ if(e.target.id==='txOverlay'){ state.showAddTx=false; render(); } });
  const saveTxBtn = document.getElementById('saveTx');
  if(saveTxBtn) saveTxBtn.addEventListener('click', async ()=>{
    const amtEl = document.getElementById('txAmount');
    const amount = parseFloat(amtEl.value);
    const note = document.getElementById('txNote').value.trim();
    if(!amount || amount<=0){ amtEl.style.borderColor='var(--due)'; return; }
    await addTransaction(state.selectedId, state.txType, amount, note);
  });

  const addProdBtn = document.getElementById('addProdBtn');
  if(addProdBtn) addProdBtn.addEventListener('click', ()=>{ state.showAddProduct=true; render(); });
  const cancelProd = document.getElementById('cancelProd');
  if(cancelProd) cancelProd.addEventListener('click', ()=>{ state.showAddProduct=false; render(); });
  const prodOverlay = document.getElementById('prodOverlay');
  if(prodOverlay) prodOverlay.addEventListener('click', (e)=>{ if(e.target.id==='prodOverlay'){ state.showAddProduct=false; render(); } });
  const saveProdBtn = document.getElementById('saveProd');
  if(saveProdBtn) saveProdBtn.addEventListener('click', async ()=>{
    const name = document.getElementById('prodName').value.trim();
    const price = parseFloat(document.getElementById('prodPrice').value);
    if(!name || !price || price<0){ return; }
    await addProduct(name, price);
  });
  root.querySelectorAll('[data-delprod]').forEach(b=> b.addEventListener('click', ()=> deleteProduct(b.dataset.delprod)));

  root.querySelectorAll('[data-confirmorder]').forEach(b=> b.addEventListener('click', async ()=>{
    const order = state.orders.find(o=>o.id===b.dataset.confirmorder);
    if(order) await confirmOrder(order);
  }));
  root.querySelectorAll('[data-rejectorder]').forEach(b=> b.addEventListener('click', ()=> rejectOrder(b.dataset.rejectorder)));

  const cancelSettings = document.getElementById('cancelSettings');
  if(cancelSettings) cancelSettings.addEventListener('click', ()=>{ state.showSettings=false; state.settingsError=''; render(); });
  const settingsOverlay = document.getElementById('settingsOverlay');
  if(settingsOverlay) settingsOverlay.addEventListener('click', (e)=>{ if(e.target.id==='settingsOverlay'){ state.showSettings=false; state.settingsError=''; render(); } });
  const copyShareLink = document.getElementById('copyShareLink');
  if(copyShareLink) copyShareLink.addEventListener('click', async ()=>{
    const input = document.getElementById('shareLinkInput');
    try{ await navigator.clipboard.writeText(input.value); }catch(e){ input.select(); document.execCommand('copy'); }
    showToast(t('linkCopied'));
  });

  const saveSettingsBtn = document.getElementById('saveSettings');
  if(saveSettingsBtn) saveSettingsBtn.addEventListener('click', async ()=>{
    const newBiz = document.getElementById('setBizName').value.trim();
    const newPhone = document.getElementById('setPhone').value.trim();
    const newPass = document.getElementById('setNewPass').value;
    const currentPass = document.getElementById('setCurrentPass').value;
    const logoFile = document.getElementById('logoFile').files[0];

    if(!currentPass){ state.settingsError=t('needCurrentPass'); render(); return; }

    state.settingsBusy=true; state.settingsError=''; render();
    try{
      const { error: verifyErr } = await sb.auth.signInWithPassword({ email: state.session.user.email, password: currentPass });
      if(verifyErr) throw new Error(t('wrongCurrentPass'));

      if(logoFile){
        const path = `${state.workspace.id}/logo.png`;
        const { error: upErr } = await sb.storage.from('logos').upload(path, logoFile, { upsert:true });
        if(upErr) throw new Error(upErr.message);
        const { data: pub } = sb.storage.from('logos').getPublicUrl(path);
        await sb.from('workspaces').update({ logo_url: pub.publicUrl + '?t=' + Date.now() }).eq('id', state.workspace.id);
      }
      if(newBiz && newBiz !== state.workspace.business_name){
        await sb.from('workspaces').update({ business_name: newBiz }).eq('id', state.workspace.id);
      }
      if(newPhone){
        const { error: emailErr } = await sb.auth.updateUser({ email: phoneToEmail(newPhone) });
        if(emailErr) throw new Error(emailErr.message);
        await sb.from('profiles').update({ phone: newPhone }).eq('id', state.session.user.id);
      }
      if(newPass){
        if(newPass.length<6) throw new Error(t('errShortPass'));
        const { error: passErr } = await sb.auth.updateUser({ password: newPass });
        if(passErr) throw new Error(passErr.message);
      }

      await loadWorkspaceAndData();
      state.settingsBusy=false; state.showSettings=false; state.settingsError='';
      showToast(t('toastSettingsSaved'));
    } catch(e){
      state.settingsBusy=false; state.settingsError = e.message || t('genericErr');
      render();
    }
  });

  const resetDataBtn = document.getElementById('resetDataBtn');
  if(resetDataBtn) resetDataBtn.addEventListener('click', ()=>{ state.showResetConfirm=true; render(); });
  const cancelReset = document.getElementById('cancelReset');
  if(cancelReset) cancelReset.addEventListener('click', ()=>{ state.showResetConfirm=false; render(); });
  const resetOverlay = document.getElementById('resetConfirmOverlay');
  if(resetOverlay) resetOverlay.addEventListener('click', (e)=>{ if(e.target.id==='resetConfirmOverlay'){ state.showResetConfirm=false; render(); } });
  const confirmReset = document.getElementById('confirmReset');
  if(confirmReset) confirmReset.addEventListener('click', async ()=>{
    await sb.from('transactions').delete().eq('workspace_id', state.workspace.id);
    await sb.from('customers').delete().eq('workspace_id', state.workspace.id);
    state.customers=[]; state.transactions=[];
    state.showResetConfirm=false; state.showSettings=false;
    showToast(t('toastDataDeleted'));
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.addEventListener('click', async ()=>{
    await sb.auth.signOut();
    state.session=null; state.workspace=null; state.showSettings=false;
    render();
  });

  const channelOverlay = document.getElementById('channelOverlay');
  const closeChannelPicker = ()=>{ state.showChannelPicker=false; state.pendingReminder=null; render(); };
  if(channelOverlay) channelOverlay.addEventListener('click', (e)=>{ if(e.target.id==='channelOverlay') closeChannelPicker(); });
  const pickSkip = document.getElementById('pickSkip');
  if(pickSkip) pickSkip.addEventListener('click', closeChannelPicker);
  const pickWhatsapp = document.getElementById('pickWhatsapp');
  if(pickWhatsapp) pickWhatsapp.addEventListener('click', async ()=>{
    const r = state.pendingReminder;
    closeChannelPicker();
    if(r) await sendViaWhatsapp(r.customerId, r.type, r.amount, r.note);
  });
  const pickImo = document.getElementById('pickImo');
  if(pickImo) pickImo.addEventListener('click', async ()=>{
    const r = state.pendingReminder;
    closeChannelPicker();
    if(r) await sendViaImo(r.customerId, r.type, r.amount, r.note);
  });
}

boot();
