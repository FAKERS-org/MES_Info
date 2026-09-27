import type { NamespacedText, University } from "@/data/universities";
import type { IconName } from "@/lib/icons";
import type { Tone } from "@/lib/tones";

/* ------------------------------------------------------------------ *
 * Shared shapes                                                       *
 * ------------------------------------------------------------------ */

/**
 * Accent of a chip, badge or button. Stored as a semantic name so the data
 * stays free of Tailwind classes — `@/lib/tones` owns the one mapping, and
 * narrowing {@link Tone} here keeps the names valid there by construction.
 */
export type AdmissionsTone = Extract<Tone, "blue" | "green" | "red" | "purple" | "amber">;

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
 * Section shapes                                                      *
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
    /** The entry criteria shown side by side. */
    cells: EligibilityCellData[];
    /**
     * Competency gauges. Optional: a school that admits without publishing
     * thresholds leaves it out and the card renders its criteria alone.
     */
    gauges?: {
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
 * Profile — the per-school admissions facts, exam or not              *
 * ------------------------------------------------------------------ */

/**
 * A piece of a profile that only applies to a school sitting an entrance
 * exam: the exam step of the roadmap, the exam transcript of the document
 * checklist, the exam date, the exam criterion.
 *
 * `getAdmissionsPageData` drops every flagged item for a profile without an
 * `exam`, so a school that admits without an exam cannot inherit a leftover
 * exam line — the flag is the mechanism, not a convention.
 */
export interface Scoped<T> {
    /** Drop this item from the page unless the profile has an `exam`. */
    exam?: true;
    item: T;
}

/** A roadmap step before the page numbers it — steps are renumbered. */
export type RoadmapStepProfile = Scoped<Omit<RoadmapStepData, "number">>;

/** A checklist entry before the page numbers it — the index is generated. */
export type ApplicationDocumentProfile = Scoped<Omit<ApplicationDocumentData, "index">>;

export type EligibilityCellProfile = Scoped<EligibilityCellData>;
export type DateItemProfile = Scoped<DateItemData>;
export type FaqItemProfile = Scoped<FaqItemData>;
export type CompetencyGaugeProfile = Scoped<CompetencyGaugeData>;

/** The subject-competency bars of the criteria card. */
export interface CompetencyGaugesData {
    title: string;
    note?: string;
    items: CompetencyGaugeProfile[];
}

/**
 * The entrance exam a school sets itself, or that a ministry sets on its
 * behalf. A profile that omits this block is a school that admits without an
 * exam: the resource hub disappears and the `exam`-scoped items go with it.
 */
export interface EntranceExamProfile {
    /**
     * The exam-material card — format notes and past papers. Omitted when the
     * school publishes none, e.g. because a ministry owns the exam.
     */
    papers?: ResourceHubData;
}

/**
 * Everything the admissions page shows about one school, declared as data.
 *
 * Each school owns a profile and {@link getAdmissionsPageData} assembles the
 * page from it, so a school with an entrance exam and a school without one
 * render through the same components. Sections whose list ends up empty are
 * left off the page rather than rendered hollow.
 */
export interface AdmissionsProfile {
    /** Omitted by a school that admits without an entrance exam. */
    exam?: EntranceExamProfile;
    eligibility: {
        header: AdmissionsCardHeader;
        cells: EligibilityCellProfile[];
        gauges?: CompetencyGaugesData;
        notice?: { icon: IconName; text: string };
    };
    roadmap: {
        header: AdmissionsCardHeader;
        steps: RoadmapStepProfile[];
    };
    documents: {
        header: AdmissionsCardHeader;
        action?: { icon: IconName; label: string };
        items: ApplicationDocumentProfile[];
    };
    dates: {
        header: AdmissionsCardHeader;
        countdown?: CountdownData;
        items: DateItemProfile[];
        action?: { icon: IconName; label: string };
    };
    faq: { header: AdmissionsCardHeader; items: FaqItemProfile[] };
    fee?: RegistrationFeeData;
    payment?: PaymentQrData;
    contact?: ContactCardData;
}

/* ------------------------------------------------------------------ *
 * Page bundle                                                         *
 * ------------------------------------------------------------------ */

export interface AdmissionsPageData {
    /** Real: every program's published requirements, for every school. */
    requirements: RequirementsCardData;
    /* The profile sections — present for every school that has a profile. */
    eligibility?: EligibilityMatrixData;
    roadmap?: AdmissionRoadmapData;
    documents?: RequiredDocumentsData;
    resources?: ResourceHubData;
    faq?: AdmissionsFaqData;
    dates?: ImportantDatesData;
    fee?: RegistrationFeeData;
    payment?: PaymentQrData;
    contact?: ContactCardData;
    /**
     * Sections the school has not published, in the order the page lays them
     * out. Empty for a school with a hand-written profile — that page is the
     * school's own copy, so an omitted section is a decision, not a gap. See
     * {@link PENDING_SECTIONS}.
     */
    pending: readonly PendingSection[];
}

/* ------------------------------------------------------------------ *
 * Sections a school has not published yet                            *
 * ------------------------------------------------------------------ */

/** The card a pending placeholder stands in for. */
export type AdmissionsSectionKey =
    | "eligibility"
    | "roadmap"
    | "documents"
    | "faq"
    | "dates"
    | "fee"
    | "payment"
    | "contact";

export interface PendingSection {
    key: AdmissionsSectionKey;
    header: AdmissionsCardHeader;
    /** `true` when the card belongs in the narrow right-hand rail. */
    rail: boolean;
    /** Why the section is empty, and where to look instead. */
    copy: NamespacedText;
}

/** `AdmissionsPageData` without the requirements block or the pending list. */
export type AdmissionsSections = Omit<AdmissionsPageData, "requirements" | "pending">;

/* ------------------------------------------------------------------ *
 * Shared copy                                                         *
 * ------------------------------------------------------------------ */

const REQUIREMENTS_HEADER = {
    title: "តម្រូវការចុះឈ្មោះ",
    subtitle: "(Admission Requirements)",
};

/** Head of the document checklist — the wording is school-agnostic. */
const DOCUMENTS_HEADER = {
    eyebrow: "Checklist",
    title: "ឯកសារដែលត្រូវដាក់បញ្ចូល (Required Application Documents)",
};

const DOCUMENTS_ACTION: { icon: IconName; label: string } = {
    icon: "Download",
    label: "ទាញយកជា PDF",
};

/** Head of the dates rail. */
const DATES_HEADER: AdmissionsCardHeader = {
    icon: "Calendar",
    title: "កាលបរិច្ឆេទសំខាន់",
};

/** Khqr payment block — a national scheme, so only the account differs. */
const KHQR_BRAND = {
    initials: "KB",
    title: "Bakong KHQR",
    subtitle: "Payment",
    badge: "Instant Verify",
};

const KHQR_BANKS = "ABA / ACLEDA / Canadia / Wing";

const EMPTY_REQUIREMENTS: NamespacedText = {
    kh: "មិនមានតម្រូវការចុះឈ្មោះដែលបានចុះផ្សាយនៅឡើយ — សូមពិនិត្យមើលគេហទំព័រសាលា។",
    en: "No published admission requirements yet — check the school's website.",
};

const PENDING_REQUIREMENTS: NamespacedText = {
    kh: "មិនទាន់បានចុះផ្សាយនៅឡើយ",
    en: "Not published yet",
};

/** Body of every placeholder, worded once so the page stays consistent. */
const PENDING_COPY: NamespacedText = {
    kh: "ព័ត៌មាននេះមិនទាន់បានចុះផ្សាយនៅឡើយ — សូមទាក់ទងសាលា ឬតាមគេហទំព័ររបស់សាលា។",
    en: "Not published yet — contact the school or check its official website.",
};

/**
 * The sections the page shows for a school nobody has written a profile for,
 * in layout order. `resources` is deliberately absent: exam material is not a
 * gap in a record, it is a claim that the school sits an entrance exam, and
 * nothing in the record makes that.
 */
export const PENDING_SECTIONS: readonly PendingSection[] = [
    {
        key: "eligibility",
        rail: false,
        header: { icon: "FileText", title: "លក្ខខណ្ឌចូលរៀន (Entry Criteria)" },
        copy: PENDING_COPY,
    },
    {
        key: "roadmap",
        rail: false,
        header: { icon: "Flag", title: "ដំណើរការចូលរៀន (Application Roadmap)" },
        copy: PENDING_COPY,
    },
    {
        key: "documents",
        rail: false,
        header: DOCUMENTS_HEADER,
        copy: PENDING_COPY,
    },
    {
        key: "faq",
        rail: false,
        header: { icon: "HelpCircle", title: "សំណួរដគលសួរញឹកញាប់ (Admissions FAQ)" },
        copy: PENDING_COPY,
    },
    {
        key: "dates",
        rail: true,
        header: DATES_HEADER,
        copy: PENDING_COPY,
    },
    {
        key: "fee",
        rail: true,
        header: { icon: "DollarSign", title: "ថ្លៃចុះឈ្មោះ (Registration Fee)" },
        copy: PENDING_COPY,
    },
    {
        key: "payment",
        rail: true,
        header: { icon: "CreditCard", title: "របៀបបង់ប្រាក់ (Payment)" },
        copy: PENDING_COPY,
    },
    {
        key: "contact",
        rail: true,
        header: { icon: "Share2", title: "ទំនាក់ទំនងការិយាល័យចូលរៀន (Admissions Contact)" },
        copy: PENDING_COPY,
    },
];

/* ------------------------------------------------------------------ *
 * Profiles                                                            *
 * ------------------------------------------------------------------ */

/** Institute of Technology of Cambodia. */
const ITC_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
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
                    title: "គណិតវិទ្យា (Mathematics)",
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
                    description: "រួមមាន៖ មេកានិច, អគ្គិសនី, អុបទិក, និងរូបវិទ្យាទំនើប។",
                    file: "PDF • 14.6 MB (Khmer-French)",
                    downloadLabel: "ទាញយក Physics PDF",
                    tone: "purple",
                },
            ],
            note: {
                icon: "Calculator",
                title: "ច្បាប់អំពីម៉ាស៊ីនគិតលេខ",
                text: "អនុញ្ញាតឱ្យប្រើម៉ាស៊ីនគិតលេខវិទ្ាសាស្ត្រែប៉ុណ្ណោះ (Non-programmable Casio fx-570/9860/991)។",
                action: "អានបទបញ្ជាបន្ថែម",
            },
        },
    },

    eligibility: {
        header: {
            eyebrow: "Eligibility Matrix",
            icon: "FileText",
            title: "លក្ខខណ្ឌចូលរៀនទូទៅ (General Entry Criteria & BacII)",
            subtitle:
                "លក្ខខណ្ឌទូទៅសម្រាប់សិស្សដែលបានបញ្ប់ថ្នាក់បមសិក្សា (BacII) ឬស្មើគ្នា ដែលចង់ចូលរៀននៅផ្នែកវិទ្យាសាស្ត្រ (Science Stream) សម្ាប់កម្មវិធីបរិញ្ញាបត្ររយៈពេល ៤ ឆ្ាំ និងបរិញ្ញាបត្ររង។",
        },
        cells: [
            {
                item: {
                    label: ["ពិន្ទុសមមូល", "ជាមធ្យម"],
                    badge: ["Grade A - C"],
                    tone: "green",
                    note: ["Science Track graduates receive first-priority qualification for technical faculties."],
                },
            },
            {
                item: {
                    label: ["ពិន្ទុសមមូលគណិត", "វិទ្យា & រូបវិទ្យា"],
                    badge: ["Math ≥ C+", "Phys ≥ C"],
                    tone: "blue",
                    note: ["គីមីវិទ្យាជាជម្រើស", "(Chemistry ≥ D required for Chemical & Food Engineering)."],
                },
            },
            {
                item: {
                    label: ["ភាសាបរទេស"],
                    badge: ["FR / EN"],
                    tone: "purple",
                    note: [
                        "កម្រិតមូលដ្ឋាន",
                        "French or English baseline; preparatory bilingual year (TRC) provided on enrollment.",
                    ],
                },
            },
        ],
        gauges: {
            title: "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា (Minimum Subject Competency Gauge)",
            note: "ផ្គកលើពិន្ទុប្រឡងជាតិបាច់ទី",
            items: [
                {
                    item: {
                        label: "គណិតវិទ្យា (Advanced Mathematics)",
                        requirement: "តម្រូវ 65% ≥ ពិន្ទុ C ឡើងទៅ",
                        value: 65,
                    },
                },
                {
                    item: {
                        label: "រូបវិទ្ា (Physics)",
                        requirement: "តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ",
                        value: 60,
                    },
                },
                {
                    item: {
                        label: "គីមីវិទ្យា / ជីវវិទ្យា (Chemistry / Biology)",
                        requirement: "តម្រូវ 50% ≥ ពិន្ទុ D ឡើងទៅ",
                        value: 50,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: "ចំណាំសំខាន់៖ បុគ្គលដែលមានបរិញ្ញាបតររង ឬសមមូល (DUT / Associate Degree) តរូវបានចាត់ទុកថាមានលក្ខខណ្ឌគ្រប់គ្រាន់។ សូមពិគ្រោះជាមួយក្រុមប្រឹក្សា (DUT / Associate Degree) បន្ថែម។",
        },
    },

    roadmap: {
        header: {
            eyebrow: "Step-by-Step Flow",
            meta: "Updated 2025",
            title: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន (4-Step Admission Roadmap)",
            subtitle: "ដំណើរការចូលរៀននៅ ITC មាន ៤ ជំហានសំខាន់ៗ ចាប់ពីខែកញ្ញា ដល់ខែវិច្ឆិកា ២០២៥។",
        },
        steps: [
            {
                item: {
                    title: "បំពេញពាក្យសុំអនឡាញ (Online Registration & Form Submission)",
                    date: "08 កញ្ញា - 30 កញ្ញា ០២៥",
                    dateTone: "blue",
                    description:
                        "ចុះឈ្មោះនៅលើ ITC Admissions Portal បង្កើតគណនី បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជាចំនួន ២ (First & Second Choice)។",
                    note: "ពេលវេលាប្រហែល ១៥ នាទី  រួមទាំងការបង់ ~15 ដុល្លារ",
                },
            },
            {
                item: {
                    title: "ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃពិនិត្យ (Document Verification & Fee)",
                    date: "15 តុលា ២០២៥ (15 Oct 2025)",
                    dateTone: "green",
                    description:
                        "មកផ្ទាល់នៅការិយាល័យ ITC ដើម្បីផ្ទៀងផ្ទាត់ឯកសារដើម និងបង់ថ្លៃពិនិត្យ $15.00 តាមរយៈ Bakong KHQR ឬធនាគារ (ABA / ACLEDA / Canadia / Wing)។",
                    note: "ទទួលបានវិក្យបត្រ Bakong KHQR / ABA / Wing Bank",
                },
            },
            {
                exam: true,
                item: {
                    title: "ប្រឡងចូលរៀនជាតិ (National Entrance Examination)",
                    date: "28 តុលា ២០២៥ (ITC Campus)",
                    dateTone: "red",
                    description:
                        "ប្ឡងនៅ ITC Campus រួមមាន ៣ មុខវិជ្ជា៖ គណិតវិទ្យា (150min), រូបវិទ្យា (90min), និង ូជីខល & វិទ្យាសាស្ត្រទូទៅ (60min)។",
                    note: "ម៉ោង: 08:00 - 12:30",
                },
            },
            {
                item: {
                    title: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន (Official Results & Enrollment)",
                    date: "17 វិច្ឆិកា ២០២៥",
                    dateTone: "purple",
                    description:
                        "លទ្ធផលផលូវការផ្សាយនៅលើ ITC Portal និង Telegram។ សិស្សជាប់ត្រូវមកចុះឈ្មោះចូលរៀនផ្ទាល់នៅ ITC ក្នុងរយៈពេល ៧ ថ្ងៃ។",
                },
            },
        ],
    },

    documents: {
        header: DOCUMENTS_HEADER,
        action: DOCUMENTS_ACTION,
        items: [
            {
                item: {
                    title: "សញ្ញាបត្របឋមសិក្សាឬមធ្យមសិក្សា",
                    subtitle: "Official Stamps",
                    description: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបានបញ្ជាក់ពីសាលា (Official stamps)។",
                },
            },
            {
                exam: true,
                item: {
                    title: "សេចក្តីថ្លគិតគន្ទុពិន្ទុ",
                    subtitle: "High School Transcript",
                    description: "ពិន្ទុប្រឡងជាតិបាច់ទី២ ឬ ៣ ដែលមានត្រាផ្លូវការពីក្រសួងអប់រំ (High School Transcript)។",
                },
            },
            {
                item: {
                    title: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ",
                    subtitle: "Birth Certificate & National ID",
                    description: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ (Birth Certificate & National ID)។",
                },
            },
            {
                item: {
                    title: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក",
                    subtitle: "4x6 Photos x 4",
                    description: "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក (ផ្ទឃានខាងក្រោយពណ៌ស ឬខក់វ៉ា) (4x6 Portrait Photos x 4)។",
                },
            },
        ],
    },

    dates: {
        header: DATES_HEADER,
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
                item: {
                    icon: "Calendar",
                    tone: "blue",
                    title: "ថ្ងៃផុតកំណត់ពាក្យសុំ",
                    value: "១៥ តុលា ២០២៥ (15 Oct 2025)",
                    note: "ការផ្ទៀងផ្ទាត់ឯកសារនៅការិយាល័យ (ITC)",
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: "ប្រឡងចូលរៀនជាតិ",
                    value: "២៨ តុលា ២០២៥ (28 Oct 2025)",
                    note: "ផ្សាយតាម Telegram & ITC Portal",
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: "ផ្សាយលទ្ធផលជាផ្លូវការ",
                    value: "១៧ វិច្ឆិកា ២០២៥ (17 Nov 2025)",
                    note: "ចុះឈ្មោះចូលរៀន (TRC)",
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: "បញ្ចូលទៅក្នុង Google Calendar",
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: "សំណួរដែលសួរញឹកញាប់ (Admissions FAQ)",
            subtitle: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ ITC។",
        },
        items: [
            {
                item: {
                    question: "តើអ្នកដែលបានបញ្ចប់ថ្នាក់ DUT/Associate Degree អាចចូលរៀនបានដែរឬទេ?",
                    answer: "បាទ/ចាស! សិស្សដែលមានបរិញ្ញាបត្ររង (DUT) ឬសមមូល អាចដាក់ពាក្យចូលរៀនបានដោយផ្ទាល់នៅ ITC ដោយគ្រាន់តែផ្តល់ឯកសារបញ្ជាក់ពីសាលាចាស់។ សូមទាក់ទងការិយាល័យចូលរៀនសម្រាប់ព័ត៌មានបន្ថែម។",
                },
            },
            {
                item: {
                    question: "តើសិស្ប្រភេទ A ទទួលបានអាហារូបករណ៍អ្វីខ្លះ?",
                    answer: "សិស្សប្រភេទ A (ពិន្ទុខ្ពស់បំផុត) អាចទទួលបានអាហារូបករណ៍ពេញលេញរហូតដល់ 100% រួមទាំងថ្លៃសិក្សា និងថលៃស្នាក់នៅ។ សូមពិនិត្យលក្ខខណ្លម្អិតនៅលើគេហទំព័រ ITC។",
                },
            },
        ],
    },

    fee: {
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
    },

    payment: {
        brand: KHQR_BRAND,
        caption: { title: "ឈមោះ: ITC Admissions Fund", subtitle: KHQR_BANKS },
        action: { icon: "CreditCard", label: "បង់ថ្លៃពាក្យសុំឥឡូវ (Pay $15.00)" },
    },

    contact: {
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
            {
                icon: "MapPin",
                text: "បន្ទប់ ០៦ អាគារ A (Campus ITC, Russian Blvd)",
            },
            { icon: "Phone", text: "023 880 370 / 012 880 370" },
            { icon: "Mail", text: "admission@itc.edu.kh" },
            {
                icon: "Clock",
                text: "ច័នទ - សុក្រ: 7:30 ព្ឹក - 5:00 លងាច",
            },
        ],
        action: {
            icon: "MessageCircle",
            label: "ជជែក Telegram ជាមួយអ្នកណែនាំភ្លាម",
        },
    },
};

/** University of Health Sciences. */
const USHA_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
            header: {
                eyebrow: "Resource Hub",
                tone: "green",
                title: "កម្មវិធីប្រឡងចូលរៀន & សំណួរពីមុន (Entrance Exam Format & Notices)",
                subtitle:
                    "ព័ត៌មានកម្មវិធីប្រឡងនិងឯកសារបន្ទាប់ពីក្រសួងសុខាភិបាល និងក្រសួងអប់រំ យុវជន និងកីឡា ដែលសាលាបានប្រកាស។",
            },
            items: [
                {
                    icon: "FileText",
                    title: "ប្រឡងចូលរៀនជាតិ (National Entrance Examination)",
                    meta: "សិក្សាវិទ្យាសាស្ត្រ",
                    description:
                        "ប្រឡងដោយក្រសួងអប់រំ យុវជន និងកីឡា សម្រាប់កម្មវិធីវិទ្យាសាស្ត្រពេទុយ និងសុខាភិបាលសាធារណៈ។",
                    file: "PDF • Khmer-English",
                    downloadLabel: "ទាញយកកម្មវិធីប្រឡង",
                    tone: "blue",
                },
                {
                    icon: "FileText",
                    title: "ប្រឡងសមត្ថភាពសុខាភិបាល (MoH Aptitude Test)",
                    meta: "សុខាភិបាល",
                    description:
                        "ប្រឡងសមត្ថភាពដោយក្រសួងសុខាភិបាល សម្រាប់មហាវិទ្យាល័យឱសថកម្ម ទស្សនាយន្តបរិយាកាស និងគិលានុបដ្ឋាយន្ត សំឡី។",
                    file: "PDF • Khmer-English",
                    downloadLabel: "ទាញយកកម្មវិធីសមត្ថភាព",
                    tone: "purple",
                },
            ],
            note: {
                icon: "AlertCircle",
                title: "ចំណាំសំខាន់",
                text: "កម្មវិធីប្រឡងត្រូវបានរៀបចំដោយក្រសួងសមាធិការ ដូច្នេះសូមពិនិត្យកាលបរិច្ឆេទផ្លូវការនៅគេហទំព័ររបស់ស្ថាប័នបញ្ជាក់។",
            },
        },
    },

    eligibility: {
        header: {
            eyebrow: "Eligibility Matrix",
            icon: "FileText",
            title: "លក្ខខណ្ឌចូលរៀនទូទៅ (General Entry Criteria & BacII)",
            subtitle: "លក្ខខណ្ឌរបស់ក្រសួងសុខាភិបាល (UHS) សម្រាប់សិស្សដែលចង់ចូលរៀនវិទ្យាសាស្ត្រពេទុយ ឱសថ និងសុខាភិបាល។",
        },
        cells: [
            {
                item: {
                    label: ["បរិញ្ញាបត្របឋមសិក្សា", "ថ្នាក់បមសិក្សាទុតិយភូមិ"],
                    badge: ["BacII"],
                    tone: "green",
                    note: [
                        "បរិញ្ញាបត្រផ្នគរវិទ្យាសាស្ត្រសម្រាប់ពេទុយ គីមីវិទ្យា & ជីវវិទ្យាសម្រាប់ឱសថ និងគិលានុបដ្ឋាយន្ត សំឡី។",
                    ],
                },
            },
            {
                exam: true,
                item: {
                    label: ["ការប្រឡងចូលរៀន", "Entrance Examination"],
                    badge: ["MoEYS", "MoH"],
                    tone: "blue",
                    note: ["ជាប់ការប្រឡងចូលរៀនជាតិ ឬការប្រឡងដោយក្រសួងសុខាភិបាល អាស្រ័តមុខវិជជារបស់សាលា។"],
                },
            },
            {
                item: {
                    label: ["សុខភាព & ភាសា"],
                    badge: ["Fit", "B1 EN"],
                    tone: "purple",
                    note: ["មានសុខភាពល្អ និងមានចំណេះភាសាអង់គ្លេសកម្រិត B1 ឡើងវិញ។"],
                },
            },
        ],
        gauges: {
            title: "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា (Minimum Subject Competency Gauge)",
            note: "ផ្គកលើពិន្ទុប្រឡងចូលរៀន",
            items: [
                {
                    exam: true,
                    item: {
                        label: "ជីវវិទ្យា (Biology)",
                        requirement: "តម្រូវ 65% ≥ ពិន្ទុ C ឡើងទៅ",
                        value: 65,
                    },
                },
                {
                    exam: true,
                    item: {
                        label: "គីមីវិទ្យា (Chemistry)",
                        requirement: "តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ",
                        value: 60,
                    },
                },
                {
                    item: {
                        label: "ភាសាអង់គ្លេស (English Proficiency)",
                        requirement: "តម្រូវ កម្រិត B1 ឡើងទៅ",
                        value: 55,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: "ចំណាំសំខាន់៖ សិស្សត្រូវមានសុខភាពល្អ និងគ្រប់គ្រាន់ការពិនិត្យសុខភាពមុនពេលចុះឈ្មោះ និងក្នុងដំណើរការសិក្សា។",
        },
    },

    roadmap: {
        header: {
            eyebrow: "Step-by-Step Flow",
            meta: "Updated 2025",
            title: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន (4-Step Admission Roadmap)",
            subtitle: "ដំណើរការចូលរៀននៅ UHS មាន ៤ ជំហានសំខាន់ ចាប់ពីការចុះឈ្មោះរហូតដល់ការប្រកាសលទ្ធផល។",
        },
        steps: [
            {
                item: {
                    title: "ស្នើសុំបញ្ជីបញ្ជាក់នៅមហាវិទ្យាល័យ (Collect the Faculty Application Form)",
                    date: "០១ - ១៥ កញ្ញា ២០២៥",
                    dateTone: "blue",
                    description: "ទាញយកបញ្ជីបញ្ជាក់នៅការិយាល័យគ្រប់គ្រាន់ ឬបានចុះផ្សាយតាមគេហទំព័រសាលាតាមមុខវិជជា។",
                    note: "មុខវិជជាគិលានុបដ្ឋាយន្តបរិយាកាស និងសុខាភិបាលសាធារណៈចុះឈ្មោះក្នុងវិធីបរិយាកាសរបស់ខ្លួនឯង",
                },
            },
            {
                item: {
                    title: "ដាក់ឯកសារ & បង់ថ្លៃ (Document Submission & Fee)",
                    date: "១៥ - ៣០ កញ្ញា ២០២៥",
                    dateTone: "green",
                    description:
                        "ដាក់ឯកសារនៅការិយាល័យ និងបង់ថ្លៃចុះឈ្មោះ $5.00 តាមរយៈ Bakong KHQR ឬធនាគារ (ABA / ACLEDA / Canadia / Wing)។",
                    note: "ទទួលបានវិក្យបត្របង់ប្រាក់",
                },
            },
            {
                exam: true,
                item: {
                    title: "ប្រឡងចូលរៀន (Entrance Examination)",
                    date: "០៤ តុលា ២០២៥",
                    dateTone: "red",
                    description:
                        "ប្រឡងដោយក្រសួងអប់រំ យុវជន និងកីឡា ឬក្រសួងសុខាភិបាល អាស្រ័តមុខវិជជាដែលបានដាក់ក្នុងបញ្ជីបញ្ជាក់។",
                    note: "សិស្សត្រូវយកអត្តសញ្ញាណបថណ្ណមកជាមួយខ្លួនឯង",
                },
            },
            {
                item: {
                    title: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន (Results & Enrollment)",
                    date: "០៩ វិច្ឆិកា ២០២៥",
                    dateTone: "purple",
                    description: "លទ្ធផលត្រូវបានប្រកាសនៅគេហទំព័រសាលា និងត្រូវចុះឈ្មោះចូលរៀនក្នុងរយៈពេល ៧ ថ្ងៃ។",
                },
            },
        ],
    },

    documents: {
        header: DOCUMENTS_HEADER,
        action: DOCUMENTS_ACTION,
        items: [
            {
                item: {
                    title: "សញ្ញាបត្របឋមសិក្សាទុតិយភូមិ (BacII Certificate)",
                    subtitle: "Official Stamps",
                    description: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបញ្ជាក់ពីសាលា ផ្នគរវិទ្យាសាស្ត្រ។",
                },
            },
            {
                exam: true,
                item: {
                    title: "សេចក្តីថ្លគិតគន្ទុពិន្ទុ (Official Transcript)",
                    subtitle: "National Exam Score",
                    description: "ពិន្ទុប្រឡងចូលរៀនដែលបានបញ្ជាក់ពីក្រសួងអប់រំ យុវជន និងកីឡា។",
                },
            },
            {
                item: {
                    title: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ (Birth Certificate & National ID)",
                    subtitle: "Identity Documents",
                    description: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ (Birth Certificate & National ID)។",
                },
            },
            {
                item: {
                    title: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក (4x6 Photos x 4)",
                    subtitle: "Portrait Photos",
                    description: "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក ដោយមានផ្ទឃានខាងក្រោយពណ៌សច្បាស់។",
                },
            },
        ],
    },

    dates: {
        header: DATES_HEADER,
        items: [
            {
                item: {
                    icon: "Calendar",
                    tone: "blue",
                    title: "ថ្ងៃផុតកំណត់បញ្ជីបញ្ជាក់",
                    value: "១៥ កញ្ញា ២០២៥ (15 Sep 2025)",
                    note: "បញ្ជាក់ដាក់នៅការិយាល័យគ្រប់គ្រាន់ (UHS)",
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: "កាលប្រឡងចូលរៀន",
                    value: "០៤ តុលា ២០២៥ (04 Oct 2025)",
                    note: "ផ្សាយតាមក្រសួងសមាធិការ",
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: "ប្រកាសលទ្ធផល",
                    value: "០៩ វិច្ឆិកា ២០២៥ (09 Nov 2025)",
                    note: "ប្រកាសនៅគេហទំព័រសាលា",
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: "បញ្ចូលទៅក្នុង Google Calendar",
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: "សំណួរដែលសួរញឹកញាប់ (Admissions FAQ)",
            subtitle: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ UHS។",
        },
        items: [
            {
                exam: true,
                item: {
                    question: "តើប្រឡងចូលរៀនរបស់ UHS ខុសពីប្រឡងជាតិយ៉ាងណា?",
                    answer: "មហាវិទ្យាល័យវិទ្យាសាស្ត្រពេទុយ និងសុខាភិបាលសាធារណៈប្រើការប្រឡងចូលរៀនជាតិរបស់ក្រសួងអប់រំ យុវជន និងកីឡា ចន្លោះមហាវិទ្យាល័យឱសថកម្ម ទស្សនាយន្តបរិយាកាស និងគិលានុបដ្ឋាយន្ត សំឡី ប្រើការប្រឡងសមត្ថភាពរបស់ក្រសួងសុខាភិបាល។",
                },
            },
            {
                item: {
                    question: "តើមានអាហារូបករណ៍សម្រាប់សិស្ស UHS ដែរឬទេ?",
                    answer: "មាន។ សាលាផ្តល់អាហារូបករណ៍រហូតដល់ ១០០% សម្រាប់សិស្សដែលមានពិន្ទុល្អ និងស្ថាប័នមួយនៅពេលប្រកាសលទ្ធផល។",
                },
            },
        ],
    },

    fee: {
        header: {
            icon: "Link2",
            title: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា",
            subtitle: "Registration & Exam Fee",
        },
        label: "ថ្លៃចុះឈ្មោះប្រឡងសរុប",
        price: "$5.00",
        divider: "/",
        strike: "២០,០០០ រៀល",
        badge: { label: "Non-refundable", tone: "green" },
    },

    payment: {
        brand: KHQR_BRAND,
        caption: { title: "ឈមោះ: UHS Admissions Account", subtitle: KHQR_BANKS },
        action: { icon: "CreditCard", label: "បង់ថ្លៃពាក្យសុំឥឡូវ (Pay $5.00)" },
    },

    contact: {
        header: {
            icon: "Share2",
            title: "ការិយាល័យប្រធាន & ទំនាក់ទំនង",
        },
        person: {
            name: "ការិយាល័យសាលាវិទ្យាសាស្ត្រសុខាភិបាល",
            role: "អង្គភាពចុះឈ្មោះនិងបរិញ្ញាបត្រ (Admissions Unit)",
            badge: "ផ្ទាល់អនឡាញ • Office",
        },
        rows: [
            {
                icon: "MapPin",
                text: "ផ្លូវព្រះសីហមេនី លេខ ២៧១, រាជធានីភ្នំពេញ, កម្ពុជា",
            },
            { icon: "Globe", text: "uhs.edu.kh" },
            { icon: "Clock", text: "ច័នទ - សុក្រ: 8:00 - 16:30" },
            { icon: "Info", text: "សូមផ្ទៀងផ្ទាត់ឯកសារនៅមហាវិទ្យាល័យដែលអ្នកចង់ចូលរៀន" },
        ],
        action: {
            icon: "ExternalLink",
            label: "ទាក់ទងទៅគេហទំព័រសាលា (uhs.edu.kh)",
        },
    },
};

/** Royal University of Phnom Penh. */
const RUPP_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
            header: {
                eyebrow: "Resource Hub",
                tone: "green",
                title: "កម្មវិធីប្រឡងចូលរៀនជ្រើសរើស & សំណួរពីមុន (Selection Exam Format & Past Papers)",
                subtitle: "ទម្រង់ប្រឡងជ្រើសរើសរបស់មហាវិទ្យាល័យភូមិន្ទភ្នំពេញ ជាភាសាខ្មែរ និងអង់គ្លេស។",
            },
            items: [
                {
                    icon: "BookOpen",
                    title: "កម្មវិធីប្រឡងវិទ្យាសាស្ត្រ & សង្គម (Science & Social Sciences)",
                    meta: "ប្រឡងជ្រើសរើស",
                    description: "ប្រឡងគណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា អាស្រ័តមុខវិជជាវិទ្យាសាស្ត្រ។",
                    file: "PDF • Khmer-English",
                    downloadLabel: "ទាញយកទម្រង់ PDF",
                    tone: "blue",
                },
                {
                    icon: "BookOpen",
                    title: "កម្មវិធីប្រឡងភាសាជាតិ (Khmer Language Selection)",
                    meta: "ប្រឡងជ្រើសរើស",
                    description: "ការវាយតម្លៃ វេជ្ជាសាស្ត្រ និងភាសាខ្មែរប្រកបដែលអាននិងសរសេរបានត្រឹមត្រូវ។",
                    file: "PDF • Khmer",
                    downloadLabel: "ទាញយកទម្រង់ PDF",
                    tone: "purple",
                },
            ],
            note: {
                icon: "Calculator",
                title: "ច្បាប់អំពីឧបករណ៍",
                text: "អនុញ្ញាតឱ្យប្រើម៉ាស៊ីនគិតលេខដែលមិនមានកម្មវិធីប៉ុណ្ណោះ (Scientific, non-programmable) នៅម្រង់ប្រឡងគណិតវិទ្យា។",
            },
        },
    },

    eligibility: {
        header: {
            eyebrow: "Eligibility Matrix",
            icon: "FileText",
            title: "លក្ខខណ្ឌចូលរៀនទូទៅ (General Entry Criteria & BacII)",
            subtitle:
                "លក្ខខណ្ឌទូទៅសម្រាប់សិស្សរបស់សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ ដោយគ្រប់មហាវិទ្យាល័យកំណត់ផ្នគរវិទ្យាខុសៗគ្នា។",
        },
        cells: [
            {
                item: {
                    label: ["ពិន្ទុបរិញ្ញាបត្រ", "BacII Results"],
                    badge: ["A - C"],
                    tone: "green",
                    note: ["កម្រិតពិន្ទុសមមូលខុសគ្នាតាមមុខវិជជា ពិន្ទុខ្ពស់ជាងមានសិទ្ធិជ្រើសរើសជាមុន។"],
                },
            },
            {
                exam: true,
                item: {
                    label: ["ប្រឡងជ្រើសរើស", "Selection Examination"],
                    badge: ["RUPP"],
                    tone: "blue",
                    note: ["សិស្សដែលមិនបានចូលក្នុងការប្រឡងជាតិ ឬពិន្ទុមិនគ្រប់គ្រាន់ ត្រូវប្រឡងជ្រើសរើសរបស់សាលា។"],
                },
            },
            {
                item: {
                    label: ["ភាសាខ្មែរ", "ភាសាបរទេស"],
                    badge: ["Khmer", "EN / FR"],
                    tone: "purple",
                    note: ["សិស្សត្រូវចេះអាន និងសរសេរភាសាខ្មែរបានល្អ ហើយមុខវិជជមួយភាសាបរទេសមួយត្រូវបានផ្ទាល់។"],
                },
            },
        ],
        gauges: {
            title: "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា (Minimum Subject Competency Gauge)",
            note: "ផ្គកលើពិន្ទុបរិញ្ញាបត្រ",
            items: [
                {
                    item: {
                        label: "ភាសាខ្មែរ (Khmer)",
                        requirement: "តម្រូវ 70% ឡើងទៅ",
                        value: 70,
                    },
                },
                {
                    exam: true,
                    item: {
                        label: "គណិតវិទ្យា (Mathematics)",
                        requirement: "តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ",
                        value: 60,
                    },
                },
                {
                    item: {
                        label: "ភាសាអង់គ្លេស (English)",
                        requirement: "តម្រូវ កម្រិត B1 ឡើងទៅ",
                        value: 50,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: "ចំណាំសំខាន់៖ ការប្រឡងជ្រើសរើសដោយសាលាមិនមានកម្មវិធីទូទៅឡើយ វិធីប្រឡង និងកាលបរិច្ឆេទអាស្រ័តមុខវិជជារបស់មហាវិទ្យាល័យនីមួយៗ។",
        },
    },

    roadmap: {
        header: {
            eyebrow: "Step-by-Step Flow",
            meta: "Updated 2025",
            title: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន (4-Step Admission Roadmap)",
            subtitle: "ដំណើរការចូលរៀននៅសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ ចាប់ពីខែកក្កដា ដល់ខែធ្នូ ឆ្នាំ ២០២៥។",
        },
        steps: [
            {
                item: {
                    title: "ចុះឈ្មោះអនឡាញ (Online Registration)",
                    date: "០១ - ៣០ កក្កដា ២០២៥",
                    dateTone: "blue",
                    description:
                        "ចុះឈ្មោះនៅលើគេហទំព័រសាកលវិទ្យាល័យ បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជាដែលចង់ចូលរៀន។",
                    note: "អាចជ្រើសបានបីមុខវិជជតាមលំដាប់ចម្រើន",
                },
            },
            {
                item: {
                    title: "ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃ (Document Verification & Fee)",
                    date: "០៥ - ២០ វិច្ឆិកា ២០២៥",
                    dateTone: "green",
                    description: "ដាក់ឯកសារនៅការិយាល័យសាលា និងបង់ថ្លៃចុះឈ្មោះ $10.00 តាមរយៈ Bakong KHQR ឬធនាគារ។",
                    note: "ឯកសារដើមត្រូវបានទាក់ទងក្នុងសាខាកណ្ដាល",
                },
            },
            {
                exam: true,
                item: {
                    title: "ប្រឡងជ្រើសរើស (Selection Examination)",
                    date: "២៤ តុលា ២០២៥",
                    dateTone: "red",
                    description: "សិស្សដែលត្រូវបានប្រឡងប្រឡងជ្រើសរើសតាមមុខវិជជារបស់ខ្លួន ដោយសម្រាប់សាលា។",
                    note: "ម៉ោង: 08:00 - 12:00",
                },
            },
            {
                item: {
                    title: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន (Results & Enrollment)",
                    date: "០៨ ធ្នូ ២០២៥",
                    dateTone: "purple",
                    description: "លទ្ធផលត្រូវបានប្រកាសនៅគេហទំព័រ និងត្រូវចុះឈ្មោះនៅការិយាល័យក្នុងរយៈពេល ១០ ថ្ងៃ។",
                },
            },
        ],
    },

    documents: {
        header: DOCUMENTS_HEADER,
        action: DOCUMENTS_ACTION,
        items: [
            {
                item: {
                    title: "សញ្ញាបត្របឋមសិក្សាទុតិយភូមិ (BacII Certificate)",
                    subtitle: "Official Stamps",
                    description:
                        "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបញ្ជាក់ពីសាលា សម្រាប់មុខវិជជដែលបានជ្រើសរើស។",
                },
            },
            {
                exam: true,
                item: {
                    title: "សេចក្តីថ្លគិតគន្ទុពិន្ទុ (Official Transcript)",
                    subtitle: "BacII & Entrance Scores",
                    description:
                        "សេចក្តីថ្លគិតគន្ទុពិន្ទុបមសិក្សាទុតិយភូមិ រួមមានពិន្ទុប្រឡងចូលរៀនជាតិ និងលទ្ធផលប្រឡងជ្រើសរើស។",
                },
            },
            {
                item: {
                    title: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ (Birth Certificate & National ID)",
                    subtitle: "Identity Documents",
                    description: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ (Birth Certificate & National ID)។",
                },
            },
            {
                item: {
                    title: "រូបថត ៤x៦ ចំនួន ២ សន្ឹក (4x6 Photos x 2)",
                    subtitle: "Portrait Photos",
                    description: "រូបថតទំហំ ៤x៦ ចំនួន ២ សនលឹក ដោយមានផ្ទឃានខាងក្រោយពណ៌សច្បាស់។",
                },
            },
        ],
    },

    dates: {
        header: DATES_HEADER,
        items: [
            {
                item: {
                    icon: "Calendar",
                    tone: "blue",
                    title: "ថ្ងៃផុតកំណត់បង់ថ្លៃ",
                    value: "២០ វិច្ឆិកា ២០២៥ (20 Nov 2025)",
                    note: "ការិយាល័យគ្រប់គ្រាន់ (RUPP)",
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: "ប្រឡងជ្រើសរើស",
                    value: "២៤ តុលា ២០២៥ (24 Oct 2025)",
                    note: "ផ្សាយតាមគេហទំព័រសាលា",
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: "ប្រកាសលទ្ធផល",
                    value: "០៨ ធ្នូ ២០២៥ (08 Dec 2025)",
                    note: "ប្រកាសនៅគេហទំព័រសាកលវិទ្យាល័យ",
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: "បញ្ចូលទៅក្នុង Google Calendar",
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: "សំណួរដែលសួរញឹកញាប់ (Admissions FAQ)",
            subtitle: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ RUPP។",
        },
        items: [
            {
                exam: true,
                item: {
                    question: "តើត្រូវប្រឡងជ្រើសរើសទោះបានជាប្រឡងជាតិក៏ដែរឬទេ?",
                    answer: "បាទ។ សិស្សដែលជាប់ការប្រឡងចូលរៀនជាតិ តែមិនមានចំណាប់តាមមុខវិជជ ត្រូវចូលរួមការប្រឡងជ្រើសរើសរបស់សាលាក្នុងវិធីបរិយាកាសទូទៅ។",
                },
            },
            {
                item: {
                    question: "តើអាចជ្រើសរើសបានបីមុខវិជជឬនៅពេលចុះឈ្មោះឬទេ?",
                    answer: "អាច។ សិស្សមានសិទ្ធិជ្រើសរើសមុខវិជជបានដូចគ្នាទៅការជ្រើសលំដាប់ចម្រើន លុះត្រាក់តែជាតិបង្កើតការងារត្រូវបានផ្ទៀងផ្ទាត់ទាំងអស់។",
                },
            },
        ],
    },

    fee: {
        header: {
            icon: "Link2",
            title: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា",
            subtitle: "Registration & Exam Fee",
        },
        label: "ថ្លៃចុះឈ្មោះប្រឡងសរុប",
        price: "$10.00",
        divider: "/",
        strike: "៤០,០០០ រៀល",
        badge: { label: "Non-refundable", tone: "green" },
    },

    payment: {
        brand: KHQR_BRAND,
        caption: { title: "ឈមោះ: RUPP Admissions Account", subtitle: KHQR_BANKS },
        action: { icon: "CreditCard", label: "បង់ថ្លៃពាក្យសុំឥឡូវ (Pay $10.00)" },
    },

    contact: {
        header: {
            icon: "Share2",
            title: "ការិយាល័យប្រធាន & ទំនាក់ទំនង",
        },
        person: {
            name: "ការិយាល័យសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
            role: "អង្គចូលរៀន & ទូទៅ (Registrar & Admissions)",
            badge: "ផ្ទាល់អនឡាញ • Office",
        },
        rows: [
            {
                icon: "MapPin",
                text: "ផ្លូវសហព័ន្ធរុស្សី, ខណ្ឌទួលគោក, រាជធានីភ្នំពេញ, កម្ពុជា",
            },
            { icon: "Globe", text: "rupp.edu.kh" },
            { icon: "Clock", text: "ច័នទ - សុក្រ: 8:00 - 16:30" },
            { icon: "Users", text: "សុំតាមមហាវិទ្យាល័យដែលបានជ្រើសរើសជាមុន" },
        ],
        action: {
            icon: "ExternalLink",
            label: "ទាក់ទងទៅគេហទំព័រសាលា (rupp.edu.kh)",
        },
    },
};

/** Institute of Foreign Languages. */
const IFL_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
            header: {
                eyebrow: "Resource Hub",
                tone: "green",
                title: "កម្មវិធីប្រឡងភាសា & សំណួរពីមុន (Language Test Format & Past Papers)",
                subtitle: "ទម្រង់ប្រឡងភាសាអង់គ្លេស និងប្រឡងសមត្ថភាពភាសាបរទេស ដើមបីរៀបចំខ្លួនមុនចុះឈ្មោះ។",
            },
            items: [
                {
                    icon: "BookOpen",
                    title: "ប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន (Basic English Placement Test)",
                    meta: "ពេលវេលា: 90min",
                    description:
                        "វេជ្ជាសាស្ត្រ ក្រាស្រយោធន៍ និងប្រយោគ សម្រាប់វាយតម្លៃកម្រិតភាសាពីមូលដ្ឋានដល់កម្រិតមួយ។",
                    file: "PDF • Khmer-English",
                    downloadLabel: "ទាញយកទម្រង់ PDF",
                    tone: "blue",
                },
                {
                    icon: "BookOpen",
                    title: "ប្រឡងសមត្ថភាពភាសាបរទេស (Language Aptitude Test)",
                    meta: "ពេលវេលា: 60min",
                    description: "ប្រឡងសមត្ថភាពសម្រាប់ដេប៉ាតឺភាសាបារាំង និងដេប៉ាតឺបកប្រែ សរសេរ និងស្តាប់។",
                    file: "PDF • Khmer",
                    downloadLabel: "ទាញយកទម្រង់ PDF",
                    tone: "purple",
                },
            ],
            note: {
                icon: "Info",
                title: "ចំណាំសំខាន់",
                text: "សិស្សដែលជាប់ការប្រឡងភាសាអង់គ្លេសត្រូវចូលរួមសម្រាប់ដេប៉ាតឺភាសាអង់គ្លេសដោយស្រាប់ ដេប៉ាតឺភាសាបរទេសដែលទាមទារការប្រឡងបន្ថែម។",
            },
        },
    },

    eligibility: {
        header: {
            eyebrow: "Eligibility Matrix",
            icon: "FileText",
            title: "លក្ខខណ្ឌចូលរៀនទូទៅ (General Entry Criteria & BacII)",
            subtitle:
                "លក្ខខណ្ឌរបស់វិទ្យាស្ថានភាសាបរទេស (IFL) សម្រាប់សិស្សដែលចង់ចូលរៀននៅដេប៉ាតឺភាសាអង់គ្លេស ភាសាបារាំង និងបកប្រែ។",
        },
        cells: [
            {
                item: {
                    label: ["បរិញ្ញាបត្រ", "ស្មើគ្នា"],
                    badge: ["BacII"],
                    tone: "green",
                    note: [
                        "បរិញ្ញាបត្របឋមសិក្សាទុតិយភូមិ (BacII) ឬសញ្ញាបត្រស្មើគ្នា ដោយអាស្រ័តមុខវិជជរបស់វិទ្យាស្ថាន។",
                    ],
                },
            },
            {
                exam: true,
                item: {
                    label: ["ប្រឡងចូលរៀន & សមត្ថភាព", "Entrance & Aptitude Test"],
                    badge: ["IFL"],
                    tone: "blue",
                    note: ["ជាប់ការប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន និងការប្រឡងសមត្ថភាពភាសារបស់វិទ្យាស្ថាន អាស្រ័តមុខវិជជ។"],
                },
            },
            {
                item: {
                    label: ["កម្រិតភាសា", "Language Level"],
                    badge: ["B1 EN", "A2 NEW"],
                    tone: "purple",
                    note: ["សិស្សត្រូវអាចរៀនភាសាបរទេសពេញលេញ ហើយចូលរៀនភាសាបរទេសពីកម្រិតមូលដ្ឋានបាន។"],
                },
            },
        ],
        gauges: {
            title: "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា (Minimum Subject Competency Gauge)",
            note: "ផ្គកលើលទ្ធផលប្រឡងវាយតម្លៃ",
            items: [
                {
                    exam: true,
                    item: {
                        label: "ភាសាអង់គ្លេស (English)",
                        requirement: "តម្រូវ 60% ឡើងទៅ",
                        value: 60,
                    },
                },
                {
                    exam: true,
                    item: {
                        label: "សមត្ថភាពភាសា (Language Aptitude)",
                        requirement: "តម្រូវ 50% ឡើងទៅ",
                        value: 50,
                    },
                },
                {
                    item: {
                        label: "ភាសាខ្មែរ (Khmer)",
                        requirement: "តម្រូវ កម្រិត B1 ឡើងទៅ",
                        value: 45,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: "ចំណាំសំខាន់៖ កម្មវិធីឆ្នាំដំបូងសម្រាប់ភាសាបារាំង (Foundation Year) ត្រូវចូលរួមនៅដេប៉ាតឺភាសាខ្មែរ ខ្មែន ឬចិន។",
        },
    },

    roadmap: {
        header: {
            eyebrow: "Step-by-Step Flow",
            meta: "Updated 2025",
            title: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន (4-Step Admission Roadmap)",
            subtitle: "ដំណើរការចូលរៀននៅ IFL មាន ៤ ជំហាន ចាប់ពីការទាញយកបញ្ជីបញ្ជាក់ ដល់ការចុះឈ្មោះចូលរៀន។",
        },
        steps: [
            {
                item: {
                    title: "ទាញយកបញ្ជីបញ្ជាក់ & ចុះឈ្មោះ (Collect the Form & Register)",
                    date: "០១ - ១០ កញ្ញា ២០២៥",
                    dateTone: "blue",
                    description: "ទាញយកបញ្ជីបញ្ជាក់នៅសាខាកណ្ដាលវិទ្យាស្ថាន បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជ។",
                    note: "អាចចុះឈ្មោះតាមអ៊ីមែល ឬមកផ្ទាល់នៅសាខា",
                },
            },
            {
                item: {
                    title: "ដាក់ឯកសារ & បង់ថ្លៃ (Document Submission & Fee)",
                    date: "១០ - ២៥ កញ្ញា ២០២៥",
                    dateTone: "green",
                    description: "ដាក់ឯកសារនៅសាខាកណ្ដាល និងបង់ថ្លៃ $10.00 តាមរយៈ Bakong KHQR ឬធនាគារ។",
                    note: "ទទួលបានវិក្យបត្របង់ប្រាក់",
                },
            },
            {
                exam: true,
                item: {
                    title: "ប្រឡងភាសា & បទប្បង្កត់ (Language Test & Interview)",
                    date: "០៩ តុលា ២០២៥",
                    dateTone: "red",
                    description: "សិស្សប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន និងប្រឡងសមត្ថភាពភាសា រួមមានការសម្រាប់ដេប៉ាតឺបកប្រែ។",
                    note: "អាស្រ័តមុខវិជជដែលបានជ្រើសរើស",
                },
            },
            {
                item: {
                    title: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន (Results & Enrollment)",
                    date: "២០ តុលា ២០២៥",
                    dateTone: "purple",
                    description: "លទ្ធផលត្រូវបានប្រកាសនៅសាខាកណ្ដាល និងត្រូវចុះឈ្មោះចូលរៀនក្នុងរយៈពេល ៧ ថ្ងៃ។",
                },
            },
        ],
    },

    documents: {
        header: DOCUMENTS_HEADER,
        action: DOCUMENTS_ACTION,
        items: [
            {
                item: {
                    title: "សញ្ញាបត្របឋមសិក្សាទុតិយភូមិ (BacII Certificate)",
                    subtitle: "Official Stamps",
                    description: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបញ្ជាក់ពីសាលា ឬសញ្ញាបត្រស្មើគ្នា។",
                },
            },
            {
                exam: true,
                item: {
                    title: "វិក្យបត្រភាសា (Language Certificate)",
                    subtitle: "B1 or Equivalent",
                    description: "វិក្យបត្រភាសាអង់គ្លេសកម្រិត B1 ឡើងវិញ ឬវិក្យបត្រពីស្ថាប័នស្របសម្រាប់ដេប៉ាតឺបកប្រែ។",
                },
            },
            {
                item: {
                    title: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ (Birth Certificate & National ID)",
                    subtitle: "Identity Documents",
                    description: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ (Birth Certificate & National ID)។",
                },
            },
            {
                item: {
                    title: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក (4x6 Photos x 4)",
                    subtitle: "Portrait Photos",
                    description: "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក ដោយមានផ្ទឃានខាងក្រោយពណ៌សច្បាស់។",
                },
            },
        ],
    },

    dates: {
        header: DATES_HEADER,
        items: [
            {
                item: {
                    icon: "Calendar",
                    tone: "blue",
                    title: "ថ្ងៃផុតកំណត់បញ្ជីបញ្ជាក់",
                    value: "១០ កញ្ញា ២០២៥ (10 Sep 2025)",
                    note: "សាខាកណ្ដាលវិទ្យាស្ថាន (IFL)",
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: "ប្រឡងភាសា & បទប្បង្កត់",
                    value: "០៩ តុលា ២០២៥ (09 Oct 2025)",
                    note: "ផ្សាយតាមគេហទំព័រវិទ្យាស្ថាន",
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: "ប្រកាសលទ្ធផល",
                    value: "២០ តុលា ២០២៥ (20 Oct 2025)",
                    note: "ប្រកាសនៅសាខាកណ្ដាល",
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: "បញ្ចូលទៅក្នុង Google Calendar",
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: "សំណួរដែលសួរញឹកញាប់ (Admissions FAQ)",
            subtitle: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ IFL។",
        },
        items: [
            {
                exam: true,
                item: {
                    question: "តើមានការប្រឡងចូលរៀននៅវិទ្យាស្ថានភាសាបរទេសឬទេ?",
                    answer: "មាន។ រួមមានការប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន និងការប្រឡងសមត្ថភាពភាសា ដែលបានកំណត់តាមមុខវិជជដែលសិស្សបានជ្រើសរើស។",
                },
            },
            {
                item: {
                    question: "តើអាចចូលរៀនភាសាបារាំងពីកម្រិតមូលដ្ឋានបានទេ?",
                    answer: "បាទ។ ដេប៉ាតឺភាសាបារាំងគ្រប់គ្រាន់ទទួលសិស្សចាប់ពីកម្រិតមូលដ្ឋាន។ សូមពិនិត្យមើលកម្មវិធីឆ្នាំដំបូងសម្រាប់ភាសាបារាំងនៅលើគេហទំព័រសាខាកណ្ដាល។",
                },
            },
        ],
    },

    fee: {
        header: {
            icon: "Link2",
            title: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា",
            subtitle: "Registration & Exam Fee",
        },
        label: "ថ្លៃចុះឈ្មោះប្រឡងសរុប",
        price: "$10.00",
        divider: "/",
        strike: "៤០,០០០ រៀល",
        badge: { label: "Non-refundable", tone: "green" },
    },

    payment: {
        brand: KHQR_BRAND,
        caption: { title: "ឈមោះ: IFL Admissions Account", subtitle: KHQR_BANKS },
        action: { icon: "CreditCard", label: "បង់ថ្លៃពាក្យសុំឥឡូវ (Pay $10.00)" },
    },

    contact: {
        header: {
            icon: "Share2",
            title: "ការិយាល័យប្រធាន & ទំនាក់ទំនង",
        },
        person: {
            name: "សាខាកណ្ដាលវិទ្យាស្ថានភាសាបរទេស",
            role: "សាខាសិក្សា & ទំនាក់ទំនង (Registrar & Student Affairs)",
            badge: "ផ្ទាល់អនឡាញ • Office",
        },
        rows: [
            {
                icon: "MapPin",
                text: "ផ្លូវព្រះសីហមេនី, រាជធានីភ្នំពេញ, កម្ពុជា",
            },
            { icon: "Globe", text: "ifl.rupp.edu.kh" },
            { icon: "Clock", text: "ច័នទ - សុក្រ: 8:00 - 16:30" },
            { icon: "Info", text: "បញ្ជីបញ្ជាក់អាចទាញយកផ្ទាល់នៅសាខាកណ្ដាល" },
        ],
        action: {
            icon: "ExternalLink",
            label: "ទាក់ទងទៅគេហទំព័រ (ifl.rupp.edu.kh)",
        },
    },
};

/**
 * The admissions profile of every school, keyed by `University.id`. A school
 * without an entry keeps the requirements-only page, the honest fallback for
 * content nobody has published yet.
 */
const PROFILES: Record<string, AdmissionsProfile> = {
    itc: ITC_PROFILE,
    usha: USHA_PROFILE,
    rupp: RUPP_PROFILE,
    ifl: IFL_PROFILE,
};

/** The profile of a school, or `undefined` when it has none published. */
export function getAdmissionsProfile(university: University): AdmissionsProfile | undefined {
    return PROFILES[university.id];
}

/* ------------------------------------------------------------------ *
 * Builders                                                            *
 * ------------------------------------------------------------------ */

/** Khmer numerals the school numbers its checklists in. */
const KHMER_DIGITS = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

function ordinal(index: number): string {
    return KHMER_DIGITS[index] ?? String(index);
}

/**
 * Unwraps a scoped list: with an entrance exam every item shows, without one
 * the `exam`-flagged items are dropped. The wrapper is peeled here so no
 * `exam` key leaks into the section data the components receive.
 */
function itemsOf<T>(items: Scoped<T>[], hasExam: boolean): T[] {
    return items.flatMap(entry => (hasExam || !entry.exam ? [entry.item] : []));
}

/** Criteria tiles and competency bars, or nothing when both lists empty up. */
function buildEligibility(profile: AdmissionsProfile, hasExam: boolean): EligibilityMatrixData | undefined {
    const cells = itemsOf(profile.eligibility.cells, hasExam);
    const gauges = profile.eligibility.gauges;
    const bars = gauges ? itemsOf(gauges.items, hasExam) : [];
    const hasGauges = bars.length > 0;

    if (cells.length === 0 && !hasGauges) return undefined;

    return {
        header: profile.eligibility.header,
        cells,
        gauges: gauges && hasGauges ? { ...gauges, items: bars } : undefined,
        notice: profile.eligibility.notice,
    };
}

/** The application flow, renumbered so the exam-less schools skip no digit. */
function buildRoadmap(profile: AdmissionsProfile, hasExam: boolean): AdmissionRoadmapData | undefined {
    const steps = itemsOf(profile.roadmap.steps, hasExam);
    if (steps.length === 0) return undefined;

    return {
        header: profile.roadmap.header,
        steps: steps.map((step, index) => ({ ...step, number: index + 1 })),
    };
}

/** The hand-in checklist, numbered in Khmer numerals. */
function buildDocuments(profile: AdmissionsProfile, hasExam: boolean): RequiredDocumentsData | undefined {
    const items = itemsOf(profile.documents.items, hasExam);
    if (items.length === 0) return undefined;

    return {
        header: profile.documents.header,
        action: profile.documents.action,
        items: items.map((item, index) => ({ ...item, index: ordinal(index) })),
    };
}

/** Deadlines and milestones. */
function buildDates(profile: AdmissionsProfile, hasExam: boolean): ImportantDatesData | undefined {
    const items = itemsOf(profile.dates.items, hasExam);
    if (items.length === 0) return undefined;

    return {
        header: profile.dates.header,
        countdown: profile.dates.countdown,
        items,
        action: profile.dates.action,
    };
}

/** Q&A pairs. */
function buildFaq(profile: AdmissionsProfile, hasExam: boolean): AdmissionsFaqData | undefined {
    const items = itemsOf(profile.faq.items, hasExam);
    if (items.length === 0) return undefined;

    return { header: profile.faq.header, items };
}

/**
 * Assembles the profile sections. `hasExam` is what makes the page reusable:
 * the resource hub appears only for a school that publishes exam material, and
 * the exam-scoped criteria, steps, documents, dates and FAQ entries disappear
 * for one that admits without sitting an exam.
 */
export function getAdmissionsSections(profile: AdmissionsProfile): AdmissionsSections {
    const hasExam = profile.exam !== undefined;

    return {
        eligibility: buildEligibility(profile, hasExam),
        roadmap: buildRoadmap(profile, hasExam),
        documents: buildDocuments(profile, hasExam),
        resources: profile.exam?.papers,
        faq: buildFaq(profile, hasExam),
        dates: buildDates(profile, hasExam),
        fee: profile.fee,
        payment: profile.payment,
        contact: profile.contact,
    };
}

/**
 * The contact card every school can fill from its own record: where it is and
 * how to reach it online. A person is never named — the record names an
 * office, not an officer — and a school with neither an address nor a website
 * gets no card at all, so the section falls through to its placeholder.
 */
function deriveContact(university: University): ContactCardData | undefined {
    const rows: ContactCardData["rows"] = [];
    if (university.address) rows.push({ icon: "MapPin", text: university.address.en });
    if (university.website) rows.push({ icon: "Globe", text: university.website });
    if (rows.length === 0) return undefined;

    return {
        header: {
            icon: "Share2",
            title: "ទំនាក់ទំនងការិយាល័យចូលរៀន (Admissions Contact)",
        },
        person: {
            name: "ការិយាល័យចូលរៀន (Admissions Office)",
            role: university.name.en,
        },
        rows,
        action: university.website
            ? {
                  icon: "ExternalLink",
                  label: `ទាក់ទងទៅគេហទំព័រសាលា (${university.website})`,
              }
            : undefined,
    };
}

/**
 * The profile of a school nobody has written one for — one an admin added
 * through the API, say. Every list is deliberately empty: the entity record is
 * the only thing here, and it proves contact details, not an entrance exam, a
 * calendar or a fee. `getAdmissionsPageData` pairs whatever survives with
 * {@link PENDING_SECTIONS} so the tab reads as a page under construction
 * rather than a broken one.
 */
function deriveProfile(university: University): AdmissionsProfile {
    return {
        eligibility: {
            header: { icon: "FileText", title: "លក្ខខណ្ឌចូលរៀន (Entry Criteria)" },
            cells: [],
        },
        roadmap: {
            header: { icon: "Flag", title: "ដំណើរការចូលរៀន (Application Roadmap)" },
            steps: [],
        },
        documents: { header: DOCUMENTS_HEADER, items: [] },
        dates: { header: DATES_HEADER, items: [] },
        faq: {
            header: { icon: "HelpCircle", title: "សំណួរដគលសួរញឹកញាប់ (Admissions FAQ)" },
            items: [],
        },
        contact: deriveContact(university),
    };
}

/* ------------------------------------------------------------------ *
 * Page entry point                                                    *
 * ------------------------------------------------------------------ */

/**
 * `/explore-universities/{university}/admissions`.
 *
 * The requirements are real: they are whatever the school seeded on each
 * `Department`, so every school gets them. The rest is built from that
 * school's {@link AdmissionsProfile}, which declares whether it sits an
 * entrance exam — sections whose list is empty are left off the page rather
 * than rendered hollow. A school with no profile yet keeps the
 * requirements-only page instead of inheriting another school's dates, fees
 * and phone numbers, the same rule the university page applies to its news
 * and brochure.
 */
export function getAdmissionsPageData(university: University): AdmissionsPageData {
    /* Every program is listed: a student should see that a program's
     requirements are unpublished, not wonder why it is missing. */
    const groups = university.departments.map(dept => ({
        unit: dept.name,
        lines: dept.requirements,
    }));

    const total = groups.reduce((sum, group) => sum + group.lines.length, 0);

    const requirements: RequirementsCardData = {
        header: {
            ...REQUIREMENTS_HEADER,
            badge: total > 0 ? `${total} ${total === 1 ? "Requirement" : "Requirements"}` : undefined,
        },
        groups,
        empty: EMPTY_REQUIREMENTS,
        pending: PENDING_REQUIREMENTS,
    };

    const profile = getAdmissionsProfile(university);

    /* A hand-written profile renders exactly what it declares and nothing is
     * marked pending: that page is the school's own copy, so a section it
     * leaves out is a decision rather than a gap to advertise. */
    if (profile) {
        return { requirements, ...getAdmissionsSections(profile), pending: [] };
    }

    const sections = getAdmissionsSections(deriveProfile(university));

    return {
        requirements,
        ...sections,
        pending: PENDING_SECTIONS.filter(section => !sections[section.key]),
    };
}
