import type { IconName } from "@/lib/icons";
import type { NamespacedText, University } from "@/data/universities";

/* ------------------------------------------------------------------ *
 * Shared shapes                                                       *
 * ------------------------------------------------------------------ */

/**
 * Accent of a chip, badge or button. Stored as a semantic name so the data
 * stays free of Tailwind classes — the components own the mapping.
 */
export type AdmissionsTone = "blue" | "green" | "red" | "purple" | "amber";

/**
 * Head of every admissions card: an optional eyebrow line (with the right
 * slot holding `meta`, the icon and an action), the title and an optional
 * subtitle. `title` is written in Khmer with its English gloss in
 * parentheses, the way the school prints it.
 */
export interface AdmissionsCardHeader {
  /** Small uppercase label above the title, e.g. "Checklist". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Right aligned note of the eyebrow line, e.g. "Updated 2025". */
  meta?: string;
  icon?: IconName;
  /** Accent of the eyebrow label. */
  tone?: AdmissionsTone;
}

/* ------------------------------------------------------------------ *
 * Requirements — real data, every school                              *
 * ------------------------------------------------------------------ */

/** Requirements of one program, straight from `Department.requirements`. */
export interface RequirementGroup {
  /** The program the lines belong to — what the school calls the unit. */
  unit: NamespacedText;
  lines: NamespacedText[];
}

export interface RequirementsCardData {
  header: { title: string; subtitle: string; badge?: string };
  /** Every program of the school; an empty `lines` array means unpublished. */
  groups: RequirementGroup[];
  /** Rendered when the school publishes no requirements at all. */
  empty: NamespacedText;
  /** Shown under a program whose requirements are not published yet. */
  pending: NamespacedText;
}

/* ------------------------------------------------------------------ *
 * Sample sections — written for ITC only                              *
 * ------------------------------------------------------------------ */

export interface EligibilityCellData {
  /** Label lines; each entry renders on its own line. */
  label: string[];
  badge: string[];
  tone: AdmissionsTone;
  /** Note lines; each entry renders on its own line. */
  note: string[];
}

/** One bar of the "minimum subject competency" list. */
export interface CompetencyGaugeData {
  label: string;
  /** Requirement printed at the right of the label, e.g. "≥ C". */
  requirement: string;
  /** Fill of the bar, 0–100. */
  value: number;
}

export interface EligibilityMatrixData {
  header: AdmissionsCardHeader;
  /** The three entry criteria shown side by side. */
  cells: EligibilityCellData[];
  gauges: {
    title: string;
    note?: string;
    items: CompetencyGaugeData[];
  };
  /** Amber caveat under the gauges. */
  notice?: { icon: IconName; text: string };
}

export interface RoadmapStepData {
  number: number;
  title: string;
  date: string;
  dateTone: AdmissionsTone;
  description: string;
  note?: string;
}

export interface AdmissionRoadmapData {
  header: AdmissionsCardHeader;
  steps: RoadmapStepData[];
}

export interface ApplicationDocumentData {
  /** Display index — the school numbers its checklist in Khmer numerals. */
  index: string;
  title: string;
  subtitle?: string;
  description: string;
}

export interface RequiredDocumentsData {
  header: AdmissionsCardHeader;
  /** Header action, e.g. the "download as PDF" link. */
  action?: { icon: IconName; label: string };
  items: ApplicationDocumentData[];
}

export interface ExamResourceData {
  icon: IconName;
  title: string;
  /** Duration line under the title, e.g. "ពេលវេលា: 150min". */
  meta?: string;
  description: string;
  /** File chip: size, language, format… */
  file: string;
  downloadLabel: string;
  tone: AdmissionsTone;
}

export interface ResourceHubData {
  header: AdmissionsCardHeader;
  items: ExamResourceData[];
  /** Amber rule note under the papers. */
  note?: { icon: IconName; title: string; text: string; action?: string };
}

export interface FaqItemData {
  question: string;
  answer: string;
}

export interface AdmissionsFaqData {
  header: AdmissionsCardHeader;
  items: FaqItemData[];
}

export interface DateItemData {
  icon: IconName;
  tone: AdmissionsTone;
  title: string;
  value: string;
  note?: string;
}

/** Static countdown banner — values come from the school's calendar. */
export interface CountdownData {
  label: string;
  badge?: string;
  value: string;
  note?: string;
  remainingLabel?: string;
  units: { value: string; label: string; sub: string }[];
}

export interface ImportantDatesData {
  header: AdmissionsCardHeader;
  countdown?: CountdownData;
  items: DateItemData[];
  action?: { icon: IconName; label: string };
}

export interface RegistrationFeeData {
  header: AdmissionsCardHeader;
  label: string;
  price: string;
  /** Slash between the price and the local-currency strike. */
  divider?: string;
  strike?: string;
  badge?: { label: string; tone: AdmissionsTone };
}

export interface PaymentQrData {
  brand: { initials: string; title: string; subtitle?: string; badge?: string };
  caption?: { title: string; subtitle?: string };
  action?: { icon: IconName; label: string };
}

export interface ContactPersonData {
  name: string;
  role?: string;
  badge?: string;
  /** Avatar URL; the card falls back to the person's initials. */
  avatar?: string;
}

export interface ContactCardData {
  header: AdmissionsCardHeader;
  person: ContactPersonData;
  rows: { icon: IconName; text: string }[];
  action?: { icon: IconName; label: string };
}

/* ------------------------------------------------------------------ *
 * Page bundle                                                         *
 * ------------------------------------------------------------------ */

export interface AdmissionsPageData {
  /** Real: every program's published requirements, for every school. */
  requirements: RequirementsCardData;
  /* Sample sections — attached for ITC only, undefined elsewhere. */
  eligibility?: EligibilityMatrixData;
  roadmap?: AdmissionRoadmapData;
  documents?: RequiredDocumentsData;
  resources?: ResourceHubData;
  faq?: AdmissionsFaqData;
  dates?: ImportantDatesData;
  fee?: RegistrationFeeData;
  payment?: PaymentQrData;
  contact?: ContactCardData;
}

/* ------------------------------------------------------------------ *
 * Sample content — only attached where it is known to be true         *
 * ------------------------------------------------------------------ */

const REQUIREMENTS_HEADER = {
  title: "តម្រូវការចុះឈ្មោះ",
  subtitle: "(Admission Requirements)",
};

const ITC_ELIGIBILITY: EligibilityMatrixData = {
  header: {
    eyebrow: "Eligibility Matrix",
    icon: "FileText",
    title: "លក្ខខណ្ឌចូលរៀនទូទៅ (General Entry Criteria & BacII)",
    subtitle:
      "លក្ខខណ្ឌទូទៅសម្រាប់សិស្សដែលបានបញ្ប់ថ្នាក់បមសិក្សា (BacII) ឬស្មើគ្នា ដែលចង់ចូលរៀននៅផ្នែកវិទ្ាសាស្ត្ (Science Stream) សម្ាប់កម្មវិីបរិញ្ញាបត្ររយៈពេល ៤ ឆ្ាំ និងបរិញ្ញាបត្ររង។",
  },
  cells: [
    {
      label: ["ពិន្ទុសមមូល", "ជាមធ្យម"],
      badge: ["Grade A - C"],
      tone: "green",
      note: [
        "Science Track graduates receive first-priority qualification for technical faculties.",
      ],
    },
    {
      label: ["ពិន្ទុសមមូលគណិត", "វិទ្យា & រូបវិទ្យា"],
      badge: ["Math ≥ C+", "Phys ≥ C"],
      tone: "blue",
      note: [
        "គីមីវិទ្យាជាជម្រើស",
        "(Chemistry ≥ D required for Chemical & Food Engineering).",
      ],
    },
    {
      label: ["ភាសាបរទេស"],
      badge: ["FR / EN"],
      tone: "purple",
      note: [
        "កម្រិតមូលដ្ឋាន",
        "French or English baseline; preparatory bilingual year (TRC) provided on enrollment.",
      ],
    },
  ],
  gauges: {
    title:
      "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា (Minimum Subject Competency Gauge)",
    note: "ផ្ែកលើពិន្ទុប្រឡងជាតិបាច់ទី",
    items: [
      {
        label: "គណិតវិទ្យា (Advanced Mathematics)",
        requirement: "តម្រូវ 65% ≥ ពិន្ទុ C ឡើងទៅ",
        value: 65,
      },
      {
        label: "រូបវិទ្ា (Physics)",
        requirement: "តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ",
        value: 60,
      },
      {
        label: "គីមីវិទយា / ជីវវិទយា (Chemistry / Biology)",
        requirement: "តម្រូវ 50% ≥ ពិន្ទុ D ឡើងទៅ",
        value: 50,
      },
    ],
  },
  notice: {
    icon: "AlertCircle",
    text: "ចំណាំសំខាន់៖ បុគ្គលដែលមានបរិញ្ញាបតររង ឬសមមូល (DUT / Associate Degree) តរូវបានចាត់ទុកថាមានលក្ខខណ្ឌគ្រប់គ្រាន់។ សូមពិគ្រោះជាមួយក្រុមប្រឹក្សា (DUT / Associate Degree) បន្ថែម។",
  },
};

const ITC_ROADMAP: AdmissionRoadmapData = {
  header: {
    eyebrow: "Step-by-Step Flow",
    meta: "Updated 2025",
    title: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន (4-Step Admission Roadmap)",
    subtitle:
      "ដំណើរការចូលរៀននៅ ITC មាន ៤ ជំហានសំខាន់ៗ ចាប់ពីខែកញ្ញា ដល់ខែវិច្ឆិកា ២០២៥។",
  },
  steps: [
    {
      number: 1,
      title: "បំពេញពាក្យសុំអនឡាញ (Online Registration & Form Submission)",
      date: "08 កញ្ញា - 30 កញ្ញា ០២៥",
      dateTone: "blue",
      description:
        "ចុះឈ្មោះនៅលើ ITC Admissions Portal បង្កើតគណនី បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជាចំនួន ២ (First & Second Choice)។",
      note: "ពេលវេលាប្រហែល ១៥ នាទី  រួមទាំងការបង់ ~15 ដុល្លារ",
    },
    {
      number: 2,
      title: "ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃពិនិត្យ (Document Verification & Fee)",
      date: "15 តុលា ២០២៥ (15 Oct 2025)",
      dateTone: "green",
      description:
        "មកផ្ទាល់នៅការិយាល័យ ITC ដើម្បីផ្ទៀងផ្ទាត់ឯកសារដើម និងបង់ថ្លៃពិនិត្យ $15.00 តាមរយៈ Bakong KHQR ឬធនាគារ (ABA / ACLEDA / Canadia / Wing)។",
      note: "ទទួលបានវិក្យបត្រ Bakong KHQR / ABA / Wing Bank",
    },
    {
      number: 3,
      title: "ប្រឡងចូលរៀនជាតិ (National Entrance Examination)",
      date: "28 តុលា ២០២៥ (ITC Campus)",
      dateTone: "red",
      description:
        "ប្ឡងនៅ ITC Campus រួមមាន ៣ មុខវិជ្ជា៖ គណិតវិទ្យា (150min), រូបវិទ្យា (90min), និង ូជីខល & វិទ្យាសាស្ត្រទូទៅ (60min)។",
      note: "ម៉ោង: 08:00 - 12:30",
    },
    {
      number: 4,
      title: "ប្រកាសលទ្ផល & ចុះឈមោះចូលរៀន (Official Results & Enrollment)",
      date: "17 វិច្ឆិកា ២០២៥",
      dateTone: "purple",
      description:
        "លទ្ធផលផលូវការផ្សាយនៅលើ ITC Portal និង Telegram។ សិស្សជាប់ត្រូវមកចុះឈ្មោះចូលរៀនផ្ទាល់នៅ ITC ក្នុងរយៈពេល ៧ ថ្ងៃ។",
    },
  ],
};

const ITC_DOCUMENTS: RequiredDocumentsData = {
  header: {
    eyebrow: "Checklist",
    title: "ឯកសារដែលត្រូវដាក់បញ្ចូល (Required Application Documents)",
  },
  action: { icon: "Download", label: "ទាញយកជា PDF" },
  items: [
    {
      index: "១",
      title: "សញ្ញាបត្របឋមសិក្ាឬមធ្យមសិក្សា",
      subtitle: "Official Stamps",
      description:
        "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបានបញ្ជាក់ពីសាលា (Official stamps).",
    },
    {
      index: "២",
      title: "សេចក្តីថ្លែងការណ៍ពិន្ទុ",
      subtitle: "High School Transcript",
      description:
        "ពិន្ទុប្រឡងជាតិបាច់ទី២ ឬ ៣ ដែលមានតរាផ្លូវការពីក្រសួងអប់រំ (High School Transcript).",
    },
    {
      index: "៣",
      title: "សំបុត្រកំណើត & អតតសញ្ញាណប័ណ្ណ",
      subtitle: "Birth Certificate & National ID",
      description:
        "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ (Birth Certificate & National ID).",
    },
    {
      index: "៤",
      title: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក",
      subtitle: "4x6 Photos x 4",
      description:
        "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក (ផ្ទៃខាងក្រោយពណ៌ស ឬខៀវ) (4x6 Portrait Photos x 4).",
    },
  ],
};

const ITC_RESOURCES: ResourceHubData = {
  header: {
    eyebrow: "Resource Hub",
    tone: "green",
    title: "ទម្រង់ប្រឡងសិក្សា និងសំណួរពីមុន (Exam Format & Past Papers)",
    subtitle:
      "ទាញយកឯកសារប្រឡងសិស្សចាស់ៗ និងទម្រង់សំណួរប្រឡង ដើមបីរៀបចំខ្លួន។ ឯកសារទាំងអស់មានជាភាសាខ្មែរ និងអង់គ្លេស។",
  },
  items: [
    {
      icon: "BookOpen",
      title: "គណិតវិទយា (Mathematics)",
      meta: "ពេលវេលា: 150min",
      description: "រួមមាន ពិជគណិត, ត្រីកោណមាត្រ, កាល់គុលុស, និងស្ថិតិ។",
      file: "PDF • 15.4 MB (Khmer-French)",
      downloadLabel: "ទាញយក PDF",
      tone: "blue",
    },
    {
      icon: "BookOpen",
      title: "រូបវិទ្ាអនុវត្ត (Applied Physics)",
      meta: "ពេលវេលា: 90min",
      description:
        "រួមមាន៖ មេកានិច, អគ្គិសនី, អុបទិក, និងរូបវិទ្យាទំនើប។",
      file: "PDF • 14.6 MB (Khmer-French)",
      downloadLabel: "ទាញយក Physics PDF",
      tone: "purple",
    },
  ],
  note: {
    icon: "Calculator",
    title: "ច្បាប់អំពីម៉ាស៊ីនគិតលេខ",
    text: "អនុញ្ញាតឱ្យប្រើម៉ាស៊ីនគិតលេខវិទ្ាសាស្ត្តែប៉ុណ្ណោះ (Non-programmable Casio fx-570/9860/991)។",
    action: "អានបទបញ្ជាបន្ថែម",
  },
};

const ITC_FAQ: AdmissionsFaqData = {
  header: {
    icon: "HelpCircle",
    title: "សំណួរដែលសួរញឹកញាប់ (Admissions FAQ)",
    subtitle:
      "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ ITC។",
  },
  items: [
    {
      question:
        "តើអ្នកដែលបានបញ្ចប់ថ្នាក់ DUT/Associate Degree អាចចូលរៀនបានដែរឬទេ?",
      answer:
        "បាទ/ចាស! សិសសដែលមានបរិញ្ញាបត្ររង (DUT) ឬសមមូល អាចដាក់ពាក្យចូលរៀនបានដោយផ្ទាល់នៅ ITC ដោយគ្រាន់តែផ្តល់ឯកសារបញ្ជាក់ពីសាលាចាស់។ សូមទាក់ទងការិយាល័យចូលរៀនសម្រាប់ព័ត៌មានបន្ថែម។",
    },
    {
      question: "តើសិស្ប្រភេទ A ទទួលបានអាហារូបករណ៍អ្វីខ្លះ?",
      answer:
        "សិស្សប្រភេទ A (ពិន្ទុខ្ពស់បំផុត) អាចទទួលបានអាហារូបករណ៍ពេញលេញរហូតដល់ 100% រួមទាំងថ្លៃសិក្សា និងថលៃស្នាក់នៅ។ សូមពិនិត្យលក្ខខណ្លម្អិតនៅលើគេហទំព័រ ITC។",
    },
  ],
};

const ITC_DATES: ImportantDatesData = {
  header: {
    icon: "Calendar",
    title: "កាលបរិច្ឆេទសំខាន់",
  },
  countdown: {
    label: "ថ្ងៃផុតកំណត់ពាក្យសុំ",
    badge: "Urgent",
    value: "30 កក្កដា ២២៥",
    note: "September 30, 2025 • 23:59 PM",
    remainingLabel: "ម៉ោងនៅសល់ (Time Remaining):",
    units: [
      { value: "18", label: "ថ្ងៃ", sub: "Days" },
      { value: "09", label: "ម៉ោង", sub: "Hrs" },
      { value: "42", label: "នាទី", sub: "Min" },
      { value: "15", label: "វិនាទី", sub: "Sec" },
    ],
  },
  items: [
    {
      icon: "Calendar",
      tone: "blue",
      title: "ថ្ងៃផុតកំណត់ពាក្យសុំ",
      value: "១៥ តុលា ២០២៥ (15 Oct 2025)",
      note: "ការផ្ទៀងផ្ទាត់ឯកសារនៅការិយាល័យ (ITC)",
    },
    {
      icon: "MessageSquare",
      tone: "green",
      title: "ប្រឡងចូលរៀនជាតិ",
      value: "២៨ តុលា ២០២៥ (28 Oct 2025)",
      note: "ផ្សាយតាម Telegram & ITC Portal",
    },
    {
      icon: "GraduationCap",
      tone: "purple",
      title: "ផ្សាយលទ្ធផលជាផ្លូវការ",
      value: "១៧ វិច្ឆិកា ២០២៥ (17 Nov 2025)",
      note: "ចុះឈ្មោះចូលរៀន (TRC)",
    },
  ],
  action: {
    icon: "BookOpen",
    label: "បញ្ចូលទៅក្នុង Google Calendar",
  },
};

const ITC_FEE: RegistrationFeeData = {
  header: {
    icon: "Link2",
    title: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា",
    subtitle: "Registration & Exam Fee",
  },
  label: "ថ្លៃចុះឈ្មោះប្រឡងសរុប",
  price: "$15.00",
  divider: "/",
  strike: "៦០,០០០ រៀល",
  badge: { label: "Non-refundable", tone: "green" },
};

const ITC_PAYMENT: PaymentQrData = {
  brand: {
    initials: "KB",
    title: "Bakong KHQR",
    subtitle: "Payment",
    badge: "Instant Verify",
  },
  caption: {
    title: "ឈមោះ: ITC Admissions Fund",
    subtitle: "ABA / ACLEDA / Canadia / Wing",
  },
  action: { icon: "CreditCard", label: "បង់ថ្លៃពាក្យសុំឥឡូវ (Pay $15.00)" },
};

const ITC_CONTACT: ContactCardData = {
  header: {
    icon: "Share2",
    title: "ការិយាល័យប្រធាន & ទំនាក់ទំនង",
  },
  person: {
    name: "លោកគ្រូ សុខ វិបុល",
    role: "បរធានការិយាល័យចូលរៀន & ទំនាក់ទំនង",
    badge: "ផ្ទាល់អនឡាញ • Online",
  },
  rows: [
    { icon: "MapPin", text: "បន្ទប់ ០៦ អាគារ A (Campus ITC, Russian Blvd)" },
    { icon: "Phone", text: "023 880 370 / 012 880 370" },
    { icon: "Mail", text: "admission@itc.edu.kh" },
    { icon: "Clock", text: "ច័នទ - សុក្រ: 7:30 ព្ឹក - 5:00 លងាច" },
  ],
  action: {
    icon: "MessageCircle",
    label: "ជជែក Telegram ជាមួយអ្នកណែនាំភ្លាម",
  },
};

const EMPTY_REQUIREMENTS: NamespacedText = {
  kh: "មិនមានតម្រូវការចុះឈ្មោះដែលបានចុះផ្សាយនៅឡើយ — សូមពិនិត្យមើលគេហទំព័រសាលា។",
  en: "No published admission requirements yet — check the school's website.",
};

const PENDING_REQUIREMENTS: NamespacedText = {
  kh: "មិនទាន់បានចុះផ្សាយនៅឡើយ",
  en: "Not published yet",
};

/* ------------------------------------------------------------------ *
 * Builder                                                             *
 * ------------------------------------------------------------------ */

/**
 * `/explore-universities/{university}/admissions`.
 *
 * The requirements are real: they are whatever the school seeded on each
 * `Department`, so every school gets them. The nine sample sections are the
 * ITC catalogue — eligibility, roadmap, documents, papers, FAQ, dates, fee,
 * QR and contact — and stay `undefined` for every other school instead of
 * inventing dates, fees and phone numbers, the same rule the university
 * page applies to its news and brochure.
 */
export function getAdmissionsPageData(
  university: University
): AdmissionsPageData {
  /* Every program is listed: a student should see that a program's
     requirements are unpublished, not wonder why it is missing. */
  const groups = university.departments.map((dept) => ({
    unit: dept.name,
    lines: dept.requirements,
  }));

  const total = groups.reduce((sum, group) => sum + group.lines.length, 0);

  const requirements: RequirementsCardData = {
    header: {
      ...REQUIREMENTS_HEADER,
      badge:
        total > 0
          ? `${total} ${total === 1 ? "Requirement" : "Requirements"}`
          : undefined,
    },
    groups,
    empty: EMPTY_REQUIREMENTS,
    pending: PENDING_REQUIREMENTS,
  };

  if (university.id !== "itc") return { requirements };

  return {
    requirements,
    eligibility: ITC_ELIGIBILITY,
    roadmap: ITC_ROADMAP,
    documents: ITC_DOCUMENTS,
    resources: ITC_RESOURCES,
    faq: ITC_FAQ,
    dates: ITC_DATES,
    fee: ITC_FEE,
    payment: ITC_PAYMENT,
    contact: ITC_CONTACT,
  };
}
