import { resolveBilingual, resolveCopy, type Bilingual, type PageCopy, type Resolved } from "@/data/text";
import type { NamespacedText, University } from "@/data/universities";
import type { IconName } from "@/lib/icons";
import type { Lang } from "@/lib/language";
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
 * Head of every admissions card, as the components receive it: plain strings,
 * already in the reader's language.
 *
 * The same shape as {@link ProfileHeader} is what a profile *declares*; this is
 * what it *resolves to*. Keeping the two apart is what lets the page be
 * written in one language at a time.
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

/**
 * A card head as a profile declares it: copy per language, with the icon name
 * and tone left as the plain strings they are.
 */
export type ProfileHeader = Bilingual<AdmissionsCardHeader>;

/** An `{ icon, label }` pair — a card action. Only the label is copy. */
export type ProfileAction = Bilingual<{ icon: IconName; label: string }>;

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
    header: { title: string; subtitle?: string; badge?: string };
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

/* ------------------------------------------------------------------ *
 * Profile — declared copy, one language at a time                       *
 * ------------------------------------------------------------------ */

/**
 * The profile types below are the display shapes with their copy turned back
 * into {@link PageCopy} pairs. They exist only so the data can be authored per
 * language; {@link resolveBilingual} turns a profile back into the plain
 * display shapes the components already take, and every builder below works
 * on that resolved form.
 */

/** A roadmap step before the page numbers it — steps are renumbered. */
export type RoadmapStepProfile = Scoped<Bilingual<Omit<RoadmapStepData, "number">>>;

/** A checklist entry before the page numbers it — the index is generated. */
export type ApplicationDocumentProfile = Scoped<Bilingual<Omit<ApplicationDocumentData, "index">>>;

export type EligibilityCellProfile = Scoped<Bilingual<EligibilityCellData>>;
export type DateItemProfile = Scoped<Bilingual<DateItemData>>;
export type FaqItemProfile = Scoped<Bilingual<FaqItemData>>;
export type CompetencyGaugeProfile = Scoped<Bilingual<CompetencyGaugeData>>;

/** The subject-competency bars of the criteria card, as a profile declares them. */
export interface CompetencyGaugesProfile {
    title: PageCopy;
    note?: PageCopy;
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
    papers?: Bilingual<ResourceHubData>;
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
        header: ProfileHeader;
        cells: EligibilityCellProfile[];
        gauges?: CompetencyGaugesProfile;
        notice?: Bilingual<{ icon: IconName; text: string }>;
    };
    roadmap: {
        header: ProfileHeader;
        steps: RoadmapStepProfile[];
    };
    documents: {
        header: ProfileHeader;
        action?: ProfileAction;
        items: ApplicationDocumentProfile[];
    };
    dates: {
        header: ProfileHeader;
        countdown?: Bilingual<CountdownData>;
        items: DateItemProfile[];
        action?: ProfileAction;
    };
    faq: { header: ProfileHeader; items: FaqItemProfile[] };
    fee?: Bilingual<RegistrationFeeData, "divider">;
    payment?: Bilingual<PaymentQrData, "initials">;
    contact?: Bilingual<ContactCardData, "avatar" | "icon">;
}

/**
 * A profile whose copy has been resolved for one language — structurally the
 * display shapes, so the builders need no knowledge of bilingual data.
 */
export type ResolvedProfile = Resolved<AdmissionsProfile>;

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

/**
 * Head of the requirements card. The English used to sit in a subtitle reading
 * "(Admission Requirements)" beside the Khmer title — one string holding both
 * languages, so it showed that way in every language. Now each side is its own
 * title and there is no subtitle.
 */
const REQUIREMENTS_HEADER: Bilingual<{ title: string; subtitle?: string }> = {
    title: { kh: "តម្រូវការចុះឈ្មោះ", en: "Admission Requirements" },
};

/**
 * The card heads, worded once and shared. A hand-written profile spells these
 * out where it overrides them; a school with no profile and the pending list
 * both use these, which is why an unpublished card is titled exactly like the
 * published one it stands in for.
 */
const ELIGIBILITY_HEADER: ProfileHeader = {
    icon: "FileText",
    title: { kh: "លក្ខខណ្ឌចូលរៀន", en: "Entry Criteria" },
};

const ROADMAP_HEADER: ProfileHeader = {
    icon: "Flag",
    title: { kh: "ដំណើរការចូលរៀន", en: "Application Roadmap" },
};

/** Head of the document checklist — the wording is school-agnostic. */
const DOCUMENTS_HEADER: ProfileHeader = {
    icon: "FileText",
    eyebrow: { kh: "បញ្ជីសម្លឹង", en: "Checklist" },
    title: { kh: "ឯកសារដែលត្រូវដាក់បញ្ចូល", en: "Required Application Documents" },
};

const DOCUMENTS_ACTION: ProfileAction = {
    icon: "Download",
    label: { kh: "ទាញយកជា PDF", en: "Download PDF" },
};

const FAQ_HEADER: ProfileHeader = {
    icon: "HelpCircle",
    title: { kh: "សំណួរដគលសួរញឹកញាប់", en: "Admissions FAQ" },
};

/** Head of the dates rail. */
const DATES_HEADER: ProfileHeader = {
    icon: "Calendar",
    title: { kh: "កាលបរិច្ឆេទសំខាន់", en: "Key Dates" },
};

const FEE_HEADER: ProfileHeader = {
    icon: "DollarSign",
    title: { kh: "ថ្លៃចុះឈ្មោះ", en: "Registration Fee" },
};

const PAYMENT_HEADER: ProfileHeader = {
    icon: "CreditCard",
    title: { kh: "របៀបបង់ប្រាក់", en: "Payment" },
};

const CONTACT_HEADER: ProfileHeader = {
    icon: "Share2",
    title: { kh: "ទំនាក់ទំនងការិយាល័យចូលរៀន", en: "Admissions Contact" },
};

/** Khqr payment block — a national scheme, so only the account differs. */
const KHQR_BRAND = {
    initials: "KB",
    title: neutral("Bakong KHQR"),
    subtitle: { kh: "ការទូទាត់", en: "Payment" },
    badge: { kh: "ផ្ទៀងផ្ទាត់ភ្លាម", en: "Instant Verify" },
};

/** The banks the school accepts. Names, so they read the same in both. */
const KHQR_BANKS: PageCopy = neutral("ABA / ACLEDA / Canadia / Wing");

/**
 * Copy that reads identically in every language — a price, a phone number, a
 * grade band, a language code. Written out on both sides rather than left as a
 * bare string so the data never *looks* translated where it is only
 * language-neutral, and so it is obvious when a value is deliberately shared
 * rather than accidentally untranslated.
 */
function neutral(text: string): PageCopy {
    return { kh: text, en: text };
}

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

/** A pending placeholder before its head is resolved for a language. */
type PendingSectionSource = Omit<PendingSection, "header"> & { header: ProfileHeader };

/**
 * The sections the page shows for a school nobody has written a profile for,
 * in layout order. `resources` is deliberately absent: exam material is not a
 * gap in a record, it is a claim that the school sits an entrance exam, and
 * nothing in the record makes that.
 */
const PENDING_SECTIONS: readonly PendingSectionSource[] = [
    { key: "eligibility", rail: false, header: ELIGIBILITY_HEADER, copy: PENDING_COPY },
    { key: "roadmap", rail: false, header: ROADMAP_HEADER, copy: PENDING_COPY },
    { key: "documents", rail: false, header: DOCUMENTS_HEADER, copy: PENDING_COPY },
    { key: "faq", rail: false, header: FAQ_HEADER, copy: PENDING_COPY },
    { key: "dates", rail: true, header: DATES_HEADER, copy: PENDING_COPY },
    { key: "fee", rail: true, header: FEE_HEADER, copy: PENDING_COPY },
    { key: "payment", rail: true, header: PAYMENT_HEADER, copy: PENDING_COPY },
    { key: "contact", rail: true, header: CONTACT_HEADER, copy: PENDING_COPY },
];

/** The pending list, titled in `lang`. */
export function getPendingSections(lang: Lang): PendingSection[] {
    return PENDING_SECTIONS.map(section => ({
        ...section,
        header: resolveBilingual<AdmissionsCardHeader>(section.header, lang),
    }));
}

/* ------------------------------------------------------------------ *
 * Profiles                                                            *
 * ------------------------------------------------------------------ */

/** Institute of Technology of Cambodia. */
const ITC_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
            header: {
                eyebrow: { kh: "មជ្ឈមណ្ឌលធន្គត", en: "Resource Hub" },
                tone: "green",
                title: { kh: "ទម្រង់ប្រឡងសិក្សា និងសំណួរពីមុន", en: "Exam Format & Past Papers" },
                subtitle: {
                    kh: "ទាញយកឯកសារប្រឡងសិស្សចាស់ៗ និងទម្រង់សំណួរប្រឡង ដើមបីរៀបចំខ្លួន។ ឯកសារទាំងអស់មានជាភាសាខ្មែរ និងអង់គ្លេស។",
                    en: "Download past student papers and practice question sets to prepare. Every file is available in Khmer and English.",
                },
            },
            items: [
                {
                    icon: "BookOpen",
                    title: { kh: "គណិតវិទ្យា", en: "Mathematics" },
                    meta: { kh: "ពេលវេលា: 150min", en: "Duration: 150 min" },
                    description: {
                        kh: "រួមមាន ពិជគណិត, ត្រីកោណមាត្រ, កាល់គុលុស, និងស្ថិតិ។",
                        en: "Covers trigonometry, calculus, algebra and statistics.",
                    },
                    file: neutral("PDF • 15.4 MB (Khmer-French)"),
                    downloadLabel: { kh: "ទាញយក PDF", en: "Download PDF" },
                    tone: "blue",
                },
                {
                    icon: "BookOpen",
                    title: { kh: "រូបវិទ្យាអនុវត្ត", en: "Applied Physics" },
                    meta: { kh: "ពេលវេលា: 90min", en: "Duration: 90 min" },
                    description: {
                        kh: "រួមមាន៖ មេកានិច, អគ្គិសនី, អុបទិក, និងរូបវិទ្យាទំនើប។",
                        en: "Covers mechanics, electricity, electronics and applied physics.",
                    },
                    file: neutral("PDF • 14.6 MB (Khmer-French)"),
                    downloadLabel: { kh: "ទាញយក Physics PDF", en: "Download Physics PDF" },
                    tone: "purple",
                },
            ],
            note: {
                icon: "Calculator",
                title: { kh: "ច្បាប់អំពីម៉ាស៊ីនគិតលេខ", en: "Calculator Rules" },
                text: {
                    kh: "អនុញ្ញាតឱ្យប្រើម៉ាស៊ីនគិតលេខវិទ្យាសាស្ត្រែប៉ុណ្ណោះ (Casio fx-570/9860/991)។",
                    en: "Only non-programmable scientific calculators are allowed (Casio fx-570/9860/991).",
                },
                action: { kh: "អានបទបញ្ជាបន្ថែម", en: "Read the full policy" },
            },
        },
    },
    eligibility: {
        header: {
            eyebrow: { kh: "តារាងលក្ខខណ្ឌចូលរៀន", en: "Eligibility Matrix" },
            icon: "FileText",
            title: { kh: "លក្ខខណ្ឌចូលរៀនទូទៅ", en: "General Entry Criteria & BacII" },
            subtitle: {
                kh: "លក្ខខណ្ឌទូទៅសម្រាប់សិស្សដែលបានបញ្ប់ថ្នាក់បមសិក្សា (BacII) ឬស្មើគ្នា ដែលចង់ចូលរៀននៅផ្នែកវិទ្យាសាស្ត្រ (Science Stream) សម្រាប់កម្មវិធីបរិញ្ញាបត្ររយៈពេល ៤ ឆ្ាំ និងបរិញ្ញាបត្ររង។",
                en: "General criteria for students who have completed BacII or an equivalent qualification and want to enter the Science Stream, covering the four-year degree and three-year associate programmes.",
            },
        },
        cells: [
            {
                item: {
                    label: [
                        { kh: "ពិន្ទុសមមូល", en: "Average score" },
                        { kh: "ជាមធ្យម", en: "or equivalent" },
                    ],
                    badge: [neutral("Grade A - C")],
                    tone: "green",
                    note: [
                        {
                            kh: "បុគ្គលដែលបានបញ្ចប់កម្មវិធីសិក្សាសាស្ត្រ ទទួលបានចម្លាភាពជាដំបូងសម្រាប់រកចម្បងទៅតាមដេប៉ាតឺបច្ចេកវិទ្យា។",
                            en: "Science Track graduates receive first-priority qualification for technical faculties.",
                        },
                    ],
                },
            },
            {
                item: {
                    label: [
                        { kh: "ពិន្ទុសមមូលគណិត", en: "Average score – Maths" },
                        { kh: "វិទ្យា & រូបវិទ្យា", en: "Physics & Chemistry" },
                    ],
                    badge: [neutral("Math ≥ C+"), neutral("Phys ≥ C")],
                    tone: "blue",
                    note: [
                        { kh: "គីមីវិទ្យាជាជម្រើស", en: "Chemistry is optional" },
                        {
                            kh: "(ត្រូវមានគីមីវិទ្យា ≥ D សម្រាប់វិទ្យាគីមី និងអាហារូបករណ៍)។",
                            en: "(Chemistry ≥ D required for Chemical & Food Engineering).",
                        },
                    ],
                },
            },
            {
                item: {
                    label: [{ kh: "ភាសាបរទេស", en: "Foreign language" }],
                    badge: [neutral("FR / EN")],
                    tone: "purple",
                    note: [
                        { kh: "កម្រិតមូលដ្ឋាន", en: "Basic level" },
                        {
                            kh: "កម្រិតមូលដ្ឋានជាភាសាប្រារេស ឬភាសាអង់គ្លេស។ មានឆ្នាំរៀបត្រណទី១ជាមួយភាសាទាំងពីរ (TRC) ផ្តល់ឱ្យនៅពេលចុះឈ្មោះចូលរៀន។",
                            en: "French or English baseline; preparatory bilingual year (TRC) provided on enrollment.",
                        },
                    ],
                },
            },
        ],
        gauges: {
            title: { kh: "កម្រិតសមត្ថភាពមុខវិជ្ជាអប្បបរមា", en: "Minimum Subject Competency Gauge" },
            note: { kh: "ផ្គកលើពិន្ទុប្រឡងជាតិបាច់ទី", en: "Scaled against the national exam score" },
            items: [
                {
                    item: {
                        label: { kh: "គណិតវិទ្យា", en: "Advanced Mathematics" },
                        requirement: { kh: "តម្រូវ 65% ≥ ពិន្ទុ C ឡើងទៅ", en: "65% required, grade C or above" },
                        value: 65,
                    },
                },
                {
                    item: {
                        label: { kh: "រូបវិទ្យា", en: "Physics" },
                        requirement: { kh: "តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ", en: "60% required, grade C or above" },
                        value: 60,
                    },
                },
                {
                    item: {
                        label: { kh: "គីមីវិទ្យា / ជីវវិទ្យា", en: "Chemistry / Biology" },
                        requirement: { kh: "តម្រូវ 50% ≥ ពិន្ទុ D ឡើងទៅ", en: "50% required, grade D or above" },
                        value: 50,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: {
                kh: "ចំណាំសំខាន់៖ បុគ្គលដែលមានបរិញ្ញាបតររង ឬសមមូល (DUT / Associate Degree) តរូវបានចាត់ទុកថាមានលក្ខខណ្ឌគ្រប់គ្រាន់។ សូមពិគ្រោះជាមួយក្រុមប្រឹក្សា (DUT / Associate Degree) បន្ថែម។",
                en: "Note: holders of a DUT or Associate Degree are considered to meet all entry criteria. Contact the admissions team for more.",
            },
        },
    },

    roadmap: {
        header: {
            eyebrow: { kh: "ដំណើរការជាជំហាន", en: "Step-by-Step Flow" },
            meta: { kh: "បានកែល្មអឆ្នាំ ២០២៥", en: "Updated 2025" },
            title: { kh: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន", en: "4-Step Admission Roadmap" },
            subtitle: {
                kh: "ដំណើរការចូលរៀននៅ ITC មាន ៤ ជំហានសំខាន់ៗ ចាប់ពីខែកញ្ញា ដល់ខែវិច្ឆិកា ២០២៥។",
                en: "The ITC admission process has 4 key steps, running from September to November 2025.",
            },
        },
        steps: [
            {
                item: {
                    title: { kh: "បំពេញពាក្យសុំអនឡាញ", en: "Online Registration & Form Submission" },
                    date: { kh: "08 កញ្ញា - 30 កញ្ញា ០២៥", en: "08 – 30 Sep 2025" },
                    dateTone: "blue",
                    description: {
                        kh: "ចុះឈ្មោះនៅលើ ITC Admissions Portal បង្កើតគណនី បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជាចំនួន ២។",
                        en: "Register on the ITC Admissions Portal, create an account, fill in your personal details and select 2 subjects (first and second choice).",
                    },
                    note: {
                        kh: "ពេលវេលាប្រហែល ១៥ នាទី  រួមទាំងការបង់ ~15 ដុល្លារ",
                        en: "About 15 minutes, including the ~$15 fee",
                    },
                },
            },
            {
                item: {
                    title: { kh: "ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃពិនិត្យ", en: "Document Verification & Fee" },
                    date: { kh: "15 តុលា ២០២៥", en: "15 Oct 2025" },
                    dateTone: "green",
                    description: {
                        kh: "មកផ្ទាល់នៅការិយាល័យ ITC ដើម្បីផ្ទៀងផ្ទាត់ឯកសារដើម និងបង់ថ្លៃពិនិត្យ $15.00 តាមរយៈ Bakong KHQR ឬធនាគារ (ABA / ACLEDA / Canadia / Wing)។",
                        en: "Come to the ITC office to verify your original documents and pay the $15.00 verification fee via Bakong KHQR or at a bank (ABA / ACLEDA / Canadia / Wing).",
                    },
                    note: {
                        kh: "ទទួលបានវិក្យបត្រ Bakong KHQR / ABA / Wing Bank",
                        en: "A Bakong KHQR / ABA / Wing Bank receipt is issued",
                    },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "ប្រឡងចូលរៀនជាតិ", en: "National Entrance Examination" },
                    date: { kh: "28 តុលា ២០២៥", en: "28 Oct 2025" },
                    dateTone: "red",
                    description: {
                        kh: "ប្ឡងនៅ ITC Campus រួមមាន ៣ មុខវិជ្ជា៖ គណិតវិទ្យា (150min), រូបវិទ្យា (90min), និង ូជីខល & វិទ្យាសាស្ត្រទូទៅ (60min)។",
                        en: "The exam at ITC Campus covers 3 subjects: Mathematics (150 min), Physics (90 min), and Khmer & General Science (60 min).",
                    },
                    note: { kh: "ម៉ោង: 08:00 - 12:30", en: "Time: 08:00 - 12:30" },
                },
            },
            {
                item: {
                    title: { kh: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន", en: "Official Results & Enrollment" },
                    date: { kh: "17 វិច្ឆិកា ២០២៥", en: "17 Nov 2025" },
                    dateTone: "purple",
                    description: {
                        kh: "លទ្ធផលផលូវការផ្សាយនៅលើ ITC Portal និង Telegram។ សិស្សជាប់ត្រូវមកចុះឈ្មោះចូលរៀនផ្ទាល់នៅ ITC ក្នុងរយៈពេល ៧ ថ្ងៃ។",
                        en: "The official results are published on the ITC Portal and Telegram. Students who pass must register and enrol at ITC within 7 days.",
                    },
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
                    title: { kh: "សញ្ញាបត្របឋមសិក្សាឬមធ្យមសិក្សា", en: "Upper secondary diploma or equivalent" },
                    subtitle: { kh: "ត្រាផ្លូវការ", en: "Official Stamps" },
                    description: {
                        kh: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបានបញ្ជាក់ពីសាលា។",
                        en: "Original documents bearing official stamps, or copies certified by the school.",
                    },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "សេចក្តីថ្លគិតគន្ទុពិន្ទុ", en: "Official Transcript" },
                    subtitle: { kh: "ពិន្ទុសាលាខាងត្បូង", en: "High School Transcript" },
                    description: {
                        kh: "ពិន្ទុប្រឡងជាតិបាច់ទី២ ឬ ៣ ដែលមានត្រាផ្លូវការពីក្រសួងអប់រំ។",
                        en: "National exam scores from grade 2 or 3, bearing an official stamp from the Ministry of Education.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ", en: "Birth Certificate & National ID" },
                    subtitle: { kh: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ", en: "Birth Certificate & National ID" },
                    description: {
                        kh: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ។",
                        en: "Copies of the birth certificate and national ID.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក", en: "4x6 Portrait Photos x 4" },
                    subtitle: { kh: "រូបថតប៉ូត្រាយ", en: "4x6 Photos x 4" },
                    description: {
                        kh: "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក (ផ្ទឃានខាងក្រោយពណ៌ស ឬខក់វ៉ា)។",
                        en: "4x6 photos, 4 in number, with a plain white or blue background.",
                    },
                },
            },
        ],
    },

    dates: {
        header: DATES_HEADER,
        countdown: {
            label: { kh: "ថ្ងៃផុតកំណត់ពាក្យសុំ", en: "Application deadline" },
            badge: { kh: "បន្ទាន់", en: "Urgent" },
            value: { kh: "30 កក្កដា ២២៥", en: "30 Jul 2025" },
            note: { kh: "៣០ កញ្ញា ២០២៥ • ២៣:៥៩", en: "September 30, 2025 • 23:59 PM" },
            remainingLabel: { kh: "ម៉ោងនៅសល់:", en: "Time remaining:" },
            units: [
                { value: neutral("18"), label: { kh: "ថ្ងៃ", en: "Day" }, sub: { kh: "ថ្ងៃ", en: "Days" } },
                { value: neutral("09"), label: { kh: "ម៉ោង", en: "Hour" }, sub: { kh: "ម៉ោង", en: "Hrs" } },
                { value: neutral("42"), label: { kh: "នាទី", en: "Minute" }, sub: { kh: "នាទី", en: "Min" } },
                { value: neutral("15"), label: { kh: "វិនាទី", en: "Second" }, sub: { kh: "វិនាទី", en: "Sec" } },
            ],
        },
        items: [
            {
                item: {
                    icon: "Calendar",
                    tone: "blue",
                    title: { kh: "ថ្ងៃផុតកំណត់ពាក្យសុំ", en: "Application deadline" },
                    value: { kh: "១៥ តុលា ២០២៥", en: "15 Oct 2025" },
                    note: { kh: "ការផ្ទៀងផ្ទាត់ឯកសារនៅការិយាល័យ", en: "ITC" },
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: { kh: "ប្រឡងចូលរៀនជាតិ", en: "National Entrance Examination" },
                    value: { kh: "២៨ តុលា ២០២៥", en: "28 Oct 2025" },
                    note: { kh: "ផ្សាយតាម Telegram & ITC Portal", en: "Published on Telegram & ITC Portal" },
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: { kh: "ផ្សាយលទ្ធផលជាផ្លូវការ", en: "Official Results Announcement" },
                    value: { kh: "១៧ វិច្ឆិកា ២០២៥", en: "17 Nov 2025" },
                    note: { kh: "ចុះឈ្មោះចូលរៀន", en: "TRC" },
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: { kh: "បញ្ចូលទៅក្នុង Google Calendar", en: "Add to Google Calendar" },
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: { kh: "សំណួរដែលសួរញឹកញាប់", en: "Admissions FAQ" },
            subtitle: {
                kh: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ ITC។",
                en: "Answers to the questions most often asked about admission to ITC.",
            },
        },
        items: [
            {
                item: {
                    question: {
                        kh: "តើអ្នកដែលបានបញ្ចប់ថ្នាក់ DUT អាចចូលរៀនបានដែរឬទេ?",
                        en: "Can someone who has completed a DUT or Associate Degree enrol?",
                    },
                    answer: {
                        kh: "បាទ/ចាស! សិស្សដែលមានបរិញ្ញាបត្ររង (DUT) ឬសមមូល អាចដាក់ពាក្យចូលរៀនបានដោយផ្ទាល់នៅ ITC ដោយគ្រាន់តែផ្តល់ឯកសារបញ្ជាក់ពីសាលាចាស់។ សូមទាក់ទងការិយាល័យចូលរៀនសម្រាប់ព័ត៌មានបន្ថែម។",
                        en: "Yes! Students holding an associate degree (DUT) or equivalent may apply to enrol directly at ITC, provided they submit documents certified by their old school. Please contact the admissions office for more information.",
                    },
                },
            },
            {
                item: {
                    question: {
                        kh: "តើសិស្ប្រភេទ A ទទួលបានអាហារូបករណ៍អ្វីខ្លះ?",
                        en: "What benefits do Category A students receive?",
                    },
                    answer: {
                        kh: "សិស្សប្រភេទ A (ពិន្ទុខ្ពស់បំផុត) អាចទទួលបានអាហារូបករណ៍ពេញលេញរហូតដល់ 100% រួមទាំងថ្លៃសិក្សា និងថលៃស្នាក់នៅ។ សូមពិនិត្យលក្ខខណ្លម្អិតនៅលើគេហទំព័រ ITC។",
                        en: "Category A students (the highest scores) can receive benefits of up to 100%, including tuition fees and dormitory fees. Please check the details on the ITC website.",
                    },
                },
            },
        ],
    },

    fee: {
        header: {
            icon: "Link2",
            title: { kh: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា", en: "Registration & exam fee and tuition" },
            subtitle: { kh: "ថ្លៃចុះឈ្មោះប្រឡងសរុប", en: "Registration & Exam Fee" },
        },
        label: { kh: "ថ្លៃចុះឈ្មោះប្រឡងសរុប", en: "Total registration & exam fee" },
        price: neutral("$15.00"),
        divider: "/",
        strike: neutral("៦០,០០០ រៀល"),
        badge: { label: { kh: "មិនអាចសងវិញបាន", en: "Non-refundable" }, tone: "green" },
    },

    payment: {
        brand: KHQR_BRAND,
        caption: {
            title: { kh: "ឈមោះ: ITC Admissions Fund", en: "Account: ITC Admissions Fund" },
            subtitle: KHQR_BANKS,
        },
        action: { icon: "CreditCard", label: { kh: "បង់ថ្លៃពាក្យសុំឥឡូវ", en: "Pay $15.00" } },
    },

    contact: {
        header: {
            icon: "Share2",
            title: { kh: "ការិយាល័យប្រធាន & ទំនាក់ទំនង", en: "Head Office & Contact" },
        },
        person: {
            name: { kh: "លោកគ្រូ សុខ វិបុល", en: "Mr Sok Vipul" },
            role: { kh: "បរធានការិយាល័យចូលរៀន & ទំនាក់ទំនង", en: "Head of Admissions & Relations" },
            badge: { kh: "ផ្ទាល់អនឡាញ", en: "Online" },
        },
        rows: [
            {
                icon: "MapPin",
                text: { kh: "បន្ទប់ ០៦ អាគារ A", en: "Campus ITC, Russian Blvd" },
            },
            { icon: "Phone", text: neutral("023 880 370 / 012 880 370") },
            { icon: "Mail", text: neutral("admission@itc.edu.kh") },
            {
                icon: "Clock",
                text: { kh: "ច័នទ - សុក្រ: 7:30 ព្ឹក - 5:00 លងាច", en: "Mon – Fri: 7:30 am – 5:00 pm" },
            },
        ],
        action: {
            icon: "MessageCircle",
            label: { kh: "ជជែក Telegram ជាមួយអ្នកណែនាំភ្លាម", en: "Chat with your advisor on Telegram now" },
        },
    },
};

/** University of Health Sciences. */
const USHA_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
            header: {
                eyebrow: { kh: "មជ្ឈមណ្ឌលធន្គត", en: "Resource Hub" },
                tone: "green",
                title: { kh: "កម្មវិធីប្រឡងចូលរៀន & សំណួរពីមុន", en: "Entrance Exam Format & Notices" },
                subtitle: {
                    kh: "ព័ត៌មានកម្មវិធីប្រឡងនិងឯកសារបន្ទាប់ពីក្រសួងសុខាភិបាល និងក្រសួងអប់រំ យុវជន និងកីឡា ដែលសាលាបានប្រកាស។",
                    en: "Information on the exam programme and the notices published by the Ministry of Health and the Ministry of Education, Youth and Sport.",
                },
            },
            items: [
                {
                    icon: "FileText",
                    title: { kh: "ប្រឡងចូលរៀនជាតិ", en: "National Entrance Examination" },
                    meta: { kh: "សិក្សាវិទ្យាសាស្ត្រ", en: "Science" },
                    description: {
                        kh: "ប្រឡងដោយក្រសួងអប់រំ យុវជន និងកីឡា សម្រាប់កម្មវិធីវិទ្យាសាស្ត្រពេទុយ និងសុខាភិបាលសាធារណៈ។",
                        en: "Set by the Ministry of Education, Youth and Sport for the medical and public health science programmes.",
                    },
                    file: neutral("PDF • Khmer-English"),
                    downloadLabel: { kh: "ទាញយកកម្មវិធីប្រឡង", en: "Download exam programme" },
                    tone: "blue",
                },
                {
                    icon: "FileText",
                    title: { kh: "ប្រឡងសមត្ថភាពសុខាភិបាល", en: "MoH Aptitude Test" },
                    meta: { kh: "សុខាភិបាល", en: "Health" },
                    description: {
                        kh: "ប្រឡងសមត្ថភាពដោយក្រសួងសុខាភិបាល សម្រាប់មហាវិទ្យាល័យឱសថកម្ម ទស្សនាយន្តបរិយាកាស និងគិលានុបដ្ឋាយន្ត សំឡី។",
                        en: "Aptitude test set by the Ministry of Health for the faculties of nursing, midwifery and medical laboratory science.",
                    },
                    file: neutral("PDF • Khmer-English"),
                    downloadLabel: { kh: "ទាញយកកម្មវិធីសមត្ថភាព", en: "Download aptitude test" },
                    tone: "purple",
                },
            ],
            note: {
                icon: "AlertCircle",
                title: { kh: "ចំណាំសំខាន់", en: "Note" },
                text: {
                    kh: "កម្មវិធីប្រឡងត្រូវបានរៀបចំដោយក្រសួងសមាធិការ ដូច្នេះសូមពិនិត្យកាលបរិច្ឆេទផ្លូវការនៅគេហទំព័ររបស់ស្ថាប័នបញ្ជាក់។",
                    en: "The exam programme is set by the relevant ministry, so please check the official timetable on the institution's website.",
                },
            },
        },
    },

    eligibility: {
        header: {
            eyebrow: { kh: "តារាងលក្ខខណ្ឌចូលរៀន", en: "Eligibility Matrix" },
            icon: "FileText",
            title: { kh: "លក្ខខណ្ឌចូលរៀនទូទៅ", en: "General Entry Criteria & BacII" },
            subtitle: {
                kh: "លក្ខខណ្ឌរបស់ក្រសួងសុខាភិបាល (UHS) សម្រាប់សិស្សដែលចង់ចូលរៀនវិទ្យាសាស្ត្រពេទុយ ឱសថ និងសុខាភិបាល។",
                en: "Criteria of the Ministry of Health (UHS) for students who want to study medicine, nursing and public health.",
            },
        },
        cells: [
            {
                item: {
                    label: [
                        { kh: "បរិញ្ញាបត្របឋមសិក្សា", en: "BacII certificate" },
                        { kh: "ថ្នាក់បមសិក្សាទុតិយភូមិ", en: "Rural high school" },
                    ],
                    badge: [neutral("BacII")],
                    tone: "green",
                    note: [
                        {
                            kh: "បរិញ្ញាបត្រផ្នគរវិទ្យាសាស្ត្រសម្រាប់ពេទុយ គីមីវិទ្យា & ជីវវិទ្យាសម្រាប់ឱសថ និងគិលានុបដ្ឋាយន្ត សំឡី។",
                            en: "A science certificate in medicine, chemistry & biology is required for nursing and medical laboratory science.",
                        },
                    ],
                },
            },
            {
                exam: true,
                item: {
                    label: [
                        { kh: "ការប្រឡងចូលរៀន", en: "Entrance examination" },
                        { kh: "ការប្រឡងចូលរៀន", en: "Entrance Examination" },
                    ],
                    badge: [neutral("MoEYS"), neutral("MoH")],
                    tone: "blue",
                    note: [
                        {
                            kh: "ជាប់ការប្រឡងចូលរៀនជាតិ ឬការប្រឡងដោយក្រសួងសុខាភិបាល អាស្រ័តមុខវិជជារបស់សាលា។",
                            en: "Either the national entrance exam or the test set by the Ministry of Health, depending on the school's programme.",
                        },
                    ],
                },
            },
            {
                item: {
                    label: [{ kh: "សុខភាព & ភាសា", en: "Health & language" }],
                    badge: [{ kh: "ស្រប", en: "Fit" }, neutral("B1 EN")],
                    tone: "purple",
                    note: [
                        {
                            kh: "មានសុខភាពល្អ និងមានចំណេះភាសាអង់គ្លេសកម្រិត B1 ឡើងវិញ។",
                            en: "Must be in good health and have English proficiency at B1 level or above.",
                        },
                    ],
                },
            },
        ],
        gauges: {
            title: { kh: "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា", en: "Minimum Subject Competency Gauge" },
            note: { kh: "ផ្គកលើពិន្ទុប្រឡងចូលរៀន", en: "Scaled against the entrance exam score" },
            items: [
                {
                    exam: true,
                    item: {
                        label: { kh: "ជីវវិទ្យា", en: "Biology" },
                        requirement: { kh: "តម្រូវ 65% ≥ ពិន្ទុ C ឡើងទៅ", en: "65% required, grade C or above" },
                        value: 65,
                    },
                },
                {
                    exam: true,
                    item: {
                        label: { kh: "គីមីវិទ្យា", en: "Chemistry" },
                        requirement: { kh: "តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ", en: "60% required, grade C or above" },
                        value: 60,
                    },
                },
                {
                    item: {
                        label: { kh: "ភាសាអង់គ្លេស", en: "English Proficiency" },
                        requirement: { kh: "តម្រូវ កម្រិត B1 ឡើងទៅ", en: "B1 level or above required" },
                        value: 55,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: {
                kh: "ចំណាំសំខាន់៖ សិស្សត្រូវមានសុខភាពល្អ និងគ្រប់គ្រាន់ការពិនិត្យសុខភាពមុនពេលចុះឈ្មោះ និងក្នុងដំណើរការសិក្សា។",
                en: "Note: students must be in good health and must have a health check before registration and during their studies.",
            },
        },
    },

    roadmap: {
        header: {
            eyebrow: { kh: "ដំណើរការជឆាក់ជម្រាប", en: "Step-by-Step Flow" },
            meta: { kh: "បានកែបន្សល់ឆ្នាំ ២០២៥", en: "Updated 2025" },
            title: { kh: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន", en: "4-Step Admission Roadmap" },
            subtitle: {
                kh: "ដំណើរការចូលរៀននៅ UHS មាន ៤ ជំហានសំខាន់ ចាប់ពីការចុះឈ្មោះរហូតដល់ការប្រកាសលទ្ធផល។",
                en: "Admission at UHS has 4 key steps, from registration through to the announcement of results.",
            },
        },
        steps: [
            {
                item: {
                    title: {
                        kh: "ស្នើសុំបញ្ជីបញ្ជាក់នៅមហាវិទ្យាល័យ",
                        en: "Collect the Faculty Application Form",
                    },
                    date: { kh: "០១ - ១៥ កញ្ញា ២០២៥", en: "01 - 15 Sep 2025" },
                    dateTone: "blue",
                    description: {
                        kh: "ទាញយកបញ្ជីបញ្ជាក់នៅការិយាល័យគ្រប់គ្រាន់ ឬបានចុះផ្សាយតាមគេហទំព័រសាលាតាមមុខវិជជា។",
                        en: "Collect the application form at the office, or download it from the school website for your programme.",
                    },
                    note: {
                        kh: "មុខវិជជាគិលានុបដ្ឋាយន្តបរិយាកាស និងសុខាភិបាលសាធារណៈចុះឈ្មោះក្នុងវិធីបរិយាកាសរបស់ខ្លួនឯង",
                        en: "Medical laboratory science and public health programmes register by their own method",
                    },
                },
            },
            {
                item: {
                    title: { kh: "ដាក់ឯកសារ & បង់ថ្លៃ", en: "Document Submission & Fee" },
                    date: { kh: "១៥ - ៣០ កញ្ញា ២០២៥", en: "15 - 30 Sep 2025" },
                    dateTone: "green",
                    description: {
                        kh: "ដាក់ឯកសារនៅការិយាល័យ និងបង់ថ្លៃចុះឈ្មោះ $5.00 តាមរយៈ Bakong KHQR ឬធនាគារ (ABA / ACLEDA / Canadia / Wing)។",
                        en: "Submit documents at the office and pay the $5.00 registration fee via Bakong KHQR or at a bank (ABA / ACLEDA / Canadia / Wing).",
                    },
                    note: { kh: "ទទួលបានវិក្យបត្របង់ប្រាក់", en: "A payment receipt is issued" },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "ប្រឡងចូលរៀន", en: "Entrance Examination" },
                    date: { kh: "០៤ តុលា ២០២៥", en: "04 Oct 2025" },
                    dateTone: "red",
                    description: {
                        kh: "ប្រឡងដោយក្រសួងអប់រំ យុវជន និងកីឡា ឬក្រសួងសុខាភិបាល អាស្រ័តមុខវិជជាដែលបានដាក់ក្នុងបញ្ជីបញ្ជាក់។",
                        en: "Set by the Ministry of Education, Youth and Sport or the Ministry of Health, depending on the programme listed in the application form.",
                    },
                    note: {
                        kh: "សិស្សត្រូវយកអត្តសញ្ញាណបថណ្ណមកជាមួយខ្លួនឯង",
                        en: "Students must bring their national ID with them",
                    },
                },
            },
            {
                item: {
                    title: { kh: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន", en: "Results & Enrollment" },
                    date: { kh: "០៩ វិច្ឆិកា ២០២៥", en: "09 Nov 2025" },
                    dateTone: "purple",
                    description: {
                        kh: "លទ្ធផលត្រូវបានប្រកាសនៅគេហទំព័រសាលា និងត្រូវចុះឈ្មោះចូលរៀនក្នុងរយៈពេល ៧ ថ្ងៃ។",
                        en: "Results are published on the school website, and enrolment must be completed within 7 days.",
                    },
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
                    title: { kh: "សញ្ញាបត្របឋមសិក្សាទុតិយភូមិ", en: "BacII Certificate" },
                    subtitle: { kh: "ត្រាផ្លូវការ", en: "Official Stamps" },
                    description: {
                        kh: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបញ្ជាក់ពីសាលា ផ្នគរវិទ្យាសាស្ត្រ។",
                        en: "Original documents bearing an official stamp, or certified copies issued by the science high school.",
                    },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "សេចក្តីថ្លគិតគន្ទុពិន្ទុ", en: "Official Transcript" },
                    subtitle: { kh: "ពិន្ទុប្រឡងជាតិ", en: "National Exam Score" },
                    description: {
                        kh: "ពិន្ទុប្រឡងចូលរៀនដែលបានបញ្ជាក់ពីក្រសួងអប់រំ យុវជន និងកីឡា។",
                        en: "The entrance exam score certified by the Ministry of Education, Youth and Sport.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ", en: "Birth Certificate & National ID" },
                    subtitle: { kh: "ឯកសារអត្តសញ្ញាណ", en: "Identity Documents" },
                    description: {
                        kh: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ។",
                        en: "Copies of the birth certificate and national ID.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក", en: "4x6 Photos x 4" },
                    subtitle: { kh: "រូបថតបញ្ចាំង", en: "Portrait Photos" },
                    description: {
                        kh: "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក ដោយមានផ្ទឃានខាងក្រោយពណ៌សច្បាស់។",
                        en: "4x6 photos, 4 pieces, with a clear white background.",
                    },
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
                    title: { kh: "ថ្ងៃផុតកំណត់បញ្ជីបញ្ជាក់", en: "Application form deadline" },
                    value: { kh: "១៥ កញ្ញា ២០២៥", en: "15 Sep 2025" },
                    note: { kh: "បញ្ជាក់ដាក់នៅការិយាល័យគ្រប់គ្រាន់", en: "UHS" },
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: { kh: "កាលប្រឡងចូលរៀន", en: "Entrance exam date" },
                    value: { kh: "០៤ តុលា ២០២៥", en: "04 Oct 2025" },
                    note: { kh: "ផ្សាយតាមក្រសួងសមាធិការ", en: "As set by the relevant ministry" },
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: { kh: "ប្រកាសលទ្ធផល", en: "Results announcement" },
                    value: { kh: "០៩ វិច្ឆិកា ២០២៥", en: "09 Nov 2025" },
                    note: { kh: "ប្រកាសនៅគេហទំព័រសាលា", en: "Published on the school website" },
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: { kh: "បញ្ចូលទៅក្នុង Google Calendar", en: "Add to Google Calendar" },
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: { kh: "សំណួរដែលសួរញឹកញាប់", en: "Admissions FAQ" },
            subtitle: {
                kh: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ UHS។",
                en: "Answers to the questions most often asked about admission to UHS.",
            },
        },
        items: [
            {
                exam: true,
                item: {
                    question: {
                        kh: "តើប្រឡងចូលរៀនរបស់ UHS ខុសពីប្រឡងជាតិយ៉ាងណា?",
                        en: "How does the UHS entrance exam differ from the national exam?",
                    },
                    answer: {
                        kh: "មហាវិទ្យាល័យវិទ្យាសាស្ត្រពេទុយ និងសុខាភិបាលសាធារណៈប្រើការប្រឡងចូលរៀនជាតិរបស់ក្រសួងអប់រំ យុវជន និងកីឡា ចន្លោះមហាវិទ្យាល័យឱសថកម្ម ទស្សនាយន្តបរិយាកាស និងគិលានុបដ្ឋាយន្ត សំឡី ប្រើការប្រឡងសមត្ថភាពរបស់ក្រសួងសុខាភិបាល។",
                        en: "The faculties of medicine and public health use the national entrance exam of the Ministry of Education, Youth and Sport, while the faculties of nursing, midwifery and medical laboratory science use the aptitude test of the Ministry of Health.",
                    },
                },
            },
            {
                item: {
                    question: {
                        kh: "តើមានអាហារូបករណ៍សម្រាប់សិស្ស UHS ដែរឬទេ?",
                        en: "Are scholarships available for UHS students?",
                    },
                    answer: {
                        kh: "មាន។ សាលាផ្តល់អាហារូបករណ៍រហូតដល់ ១០០% សម្រាប់សិស្សដែលមានពិន្ទុល្អ និងស្ថាប័នមួយនៅពេលប្រកាសលទ្ធផល។",
                        en: "Yes. The school offers scholarships of up to 100% for students with good grades who rank first when the results are announced.",
                    },
                },
            },
        ],
    },

    fee: {
        header: {
            icon: "Link2",
            title: { kh: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា", en: "Registration & exam fee" },
            subtitle: { kh: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា", en: "Registration & Exam Fee" },
        },
        label: { kh: "ថ្លៃចុះឈ្មោះប្រឡងសរុប", en: "Total exam registration fee" },
        price: neutral("$5.00"),
        divider: "/",
        strike: { kh: "២០,០០០ រៀល", en: "20,000 riel" },
        badge: { label: { kh: "មិនអាចសុំប្រាក់វិញ", en: "Non-refundable" }, tone: "green" },
    },

    payment: {
        brand: KHQR_BRAND,
        caption: {
            title: { kh: "ឈមោះ: UHS Admissions Account", en: "Name: UHS Admissions Account" },
            subtitle: KHQR_BANKS,
        },
        action: { icon: "CreditCard", label: { kh: "បង់ថ្លៃពាក្យសុំឥឡូវ", en: "Pay $5.00" } },
    },

    contact: {
        header: {
            icon: "Share2",
            title: { kh: "ការិយាល័យប្រធាន & ទំនាក់ទំនង", en: "Head of Office & Contact" },
        },
        person: {
            name: { kh: "ការិយាល័យសាលាវិទ្យាសាស្ត្រសុខាភិបាល", en: "Office of the University of Health Sciences" },
            role: { kh: "អង្គភាពចុះឈ្មោះនិងបរិញ្ញាបត្រ", en: "Admissions Unit" },
            badge: { kh: "ផ្ទាល់អនឡាញ • ការិយាល័យ", en: "In person • Office" },
        },
        rows: [
            {
                icon: "MapPin",
                text: {
                    kh: "ផ្លូវព្រះសីហមេនី លេខ ២៧១, រាជធានីភ្នំពេញ, កម្ពុជា",
                    en: "Preah Sihanouk Blvd, No. 271, Phnom Penh, Cambodia",
                },
            },
            { icon: "Globe", text: neutral("uhs.edu.kh") },
            { icon: "Clock", text: { kh: "ច័នទ - សុក្រ: 8:00 - 16:30", en: "Mon - Fri: 8:00 - 16:30" } },
            {
                icon: "Info",
                text: {
                    kh: "សូមផ្ទៀងផ្ទាត់ឯកសារនៅមហាវិទ្យាល័យដែលអ្នកចង់ចូលរៀន",
                    en: "Please check the documents with the faculty you want to apply to",
                },
            },
        ],
        action: {
            icon: "ExternalLink",
            label: { kh: "ទាក់ទងទៅគេហទំព័រសាលា", en: "uhs.edu.kh" },
        },
    },
};

/** Royal University of Phnom Penh. */
const RUPP_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
            header: {
                eyebrow: { kh: "មជ្ឈមណ្ឌលធន្គត", en: "Resource Hub" },
                tone: "green",
                title: {
                    kh: "កម្មវិធីប្រឡងចូលរៀនជ្រើសរើស & សំណួរពីមុន",
                    en: "Selection Exam Format & Past Papers",
                },
                subtitle: {
                    kh: "ទម្រង់ប្រឡងជ្រើសរើសរបស់មហាវិទ្យាល័យភូមិន្ទភ្នំពេញ ជាភាសាខ្មែរ និងអង់គ្លេស។",
                    en: "The selection exam papers of the Royal University of Phnom Penh, in Khmer and English.",
                },
            },
            items: [
                {
                    icon: "BookOpen",
                    title: { kh: "កម្មវិធីប្រឡងវិទ្យាសាស្ត្រ & សង្គម", en: "Science & Social Sciences" },
                    meta: { kh: "ប្រឡងជ្រើសរើស", en: "Selection exam" },
                    description: {
                        kh: "ប្រឡងគណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា អាស្រ័តមុខវិជជាវិទ្យាសាស្ត្រ។",
                        en: "Mathematics, physics, chemistry and biology, with a focus on the science subjects.",
                    },
                    file: neutral("PDF • Khmer-English"),
                    downloadLabel: { kh: "ទាញយកទម្រង់ PDF", en: "Download PDF papers" },
                    tone: "blue",
                },
                {
                    icon: "BookOpen",
                    title: { kh: "កម្មវិធីប្រឡងភាសាជាតិ", en: "Khmer Language Selection" },
                    meta: { kh: "ប្រឡងជ្រើសរើស", en: "Selection exam" },
                    description: {
                        kh: "ការវាយតម្លៃ វេជ្ជាសាស្ត្រ និងភាសាខ្មែរប្រកបដែលអាននិងសរសេរបានត្រឹមត្រូវ។",
                        en: "Reading comprehension, general knowledge and Khmer, with reading and writing at the required standard.",
                    },
                    file: neutral("PDF • Khmer"),
                    downloadLabel: { kh: "ទាញយកទម្រង់ PDF", en: "Download PDF papers" },
                    tone: "purple",
                },
            ],
            note: {
                icon: "Calculator",
                title: { kh: "ច្បាប់អំពីឧបករណ៍", en: "Calculator Rules" },
                text: {
                    kh: "អនុញ្ញាតឱ្យប្រើម៉ាស៊ីនគិតលេខដែលមិនមានកម្មវិធីប៉ុណ្ណោះ នៅម្រង់ប្រឡងគណិតវិទ្យា។",
                    en: "Only non-programmable scientific calculators are allowed in the mathematics exam hall.",
                },
            },
        },
    },

    eligibility: {
        header: {
            eyebrow: { kh: "តារាងលក្ខខណ្ឌចូលរៀន", en: "Eligibility Matrix" },
            icon: "FileText",
            title: { kh: "លក្ខខណ្ឌចូលរៀនទូទៅ", en: "General Entry Criteria & BacII" },
            subtitle: {
                kh: "លក្ខខណ្ឌទូទៅសម្រាប់សិស្សរបស់សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ ដោយគ្រប់មហាវិទ្យាល័យកំណត់ផ្នគរវិទ្យាខុសៗគ្នា។",
                en: "General criteria for students of the Royal University of Phnom Penh, with each faculty setting the requirements for its own field of study.",
            },
        },
        cells: [
            {
                item: {
                    label: [{ kh: "ពិន្ទុបរិញ្ញាបត្រ", en: "BacII Results" }],
                    badge: [neutral("A - C")],
                    tone: "green",
                    note: [
                        {
                            kh: "កម្រិតពិន្ទុសមមូលខុសគ្នាតាមមុខវិជជា ពិន្ទុខ្ពស់ជាងមានសិទ្ធិជ្រើសរើសជាមុន។",
                            en: "The average score varies by subject; higher scores take priority in the selection.",
                        },
                    ],
                },
            },
            {
                exam: true,
                item: {
                    label: [{ kh: "ប្រឡងជ្រើសរើស", en: "Selection Examination" }],
                    badge: [neutral("RUPP")],
                    tone: "blue",
                    note: [
                        {
                            kh: "សិស្សដែលមិនបានចូលក្នុងការប្រឡងជាតិ ឬពិន្ទុមិនគ្រប់គ្រាន់ ត្រូវប្រឡងជ្រើសរើសរបស់សាលា។",
                            en: "Students who did not sit the national exam, or whose scores do not meet the thresholds, must sit the school's selection exam.",
                        },
                    ],
                },
            },
            {
                item: {
                    label: [
                        { kh: "ភាសាខ្មែរ", en: "Khmer" },
                        { kh: "ភាសាបរទេស", en: "Foreign language" },
                    ],
                    badge: [neutral("Khmer"), neutral("EN / FR")],
                    tone: "purple",
                    note: [
                        {
                            kh: "សិស្សត្រូវចេះអាន និងសរសេរភាសាខ្មែរបានល្អ ហើយមុខវិជជមួយភាសាបរទេសមួយត្រូវបានផ្ទាល់។",
                            en: "Students must read and write Khmer well, and at least one foreign language subject is compulsory.",
                        },
                    ],
                },
            },
        ],
        gauges: {
            title: { kh: "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា", en: "Minimum Subject Competency Gauge" },
            note: { kh: "ផ្គកលើពិន្ទុបរិញ្ញាបត្រ", en: "Scaled against the certificate score" },
            items: [
                {
                    item: {
                        label: { kh: "ភាសាខ្មែរ", en: "Khmer" },
                        requirement: { kh: "តម្រូវ 70% ឡើងទៅ", en: "70% required or above" },
                        value: 70,
                    },
                },
                {
                    exam: true,
                    item: {
                        label: { kh: "គណិតវិទ្យា", en: "Mathematics" },
                        requirement: { kh: "តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ", en: "60% required, grade C or above" },
                        value: 60,
                    },
                },
                {
                    item: {
                        label: { kh: "ភាសាអង់គ្លេស", en: "English" },
                        requirement: { kh: "តម្រូវ កម្រិត B1 ឡើងទៅ", en: "B1 level or above required" },
                        value: 50,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: {
                kh: "ចំណាំសំខាន់៖ ការប្រឡងជ្រើសរើសដោយសាលាមិនមានកម្មវិធីទូទៅឡើយ វិធីប្រឡង និងកាលបរិច្ឆេទអាស្រ័តមុខវិជជារបស់មហាវិទ្យាល័យនីមួយៗ។",
                en: "Note: the selection exam set by the school has no general programme — the exam format and the subject schedule are set by each faculty.",
            },
        },
    },

    roadmap: {
        header: {
            eyebrow: { kh: "ដំណើរការជាជំហាន", en: "Step-by-Step Flow" },
            meta: { kh: "បានធ្វើបច្ចុប្បន្នភាព ២០២៥", en: "Updated 2025" },
            title: { kh: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន", en: "4-Step Admission Roadmap" },
            subtitle: {
                kh: "ដំណើរការចូលរៀននៅសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ ចាប់ពីខែកក្កដា ដល់ខែធ្នូ ឆ្នាំ ២០២៥។",
                en: "The admission journey at the Royal University of Phnom Penh, from January to December 2025.",
            },
        },
        steps: [
            {
                item: {
                    title: { kh: "ចុះឈ្មោះអនឡាញ", en: "Online Registration" },
                    date: { kh: "០១ - ៣០ កក្កដា ២០២៥", en: "01 - 30 Jan 2025" },
                    dateTone: "blue",
                    description: {
                        kh: "ចុះឈ្មោះនៅលើគេហទំព័រសាកលវិទ្យាល័យ បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជាដែលចង់ចូលរៀន។",
                        en: "Register on the university website, fill in your own details and select the subject you want to study.",
                    },
                    note: {
                        kh: "អាចជ្រើសបានបីមុខវិជជតាមលំដាប់ចម្រើន",
                        en: "Up to three subjects may be chosen, in order of preference",
                    },
                },
            },
            {
                item: {
                    title: { kh: "ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃ", en: "Document Verification & Fee" },
                    date: { kh: "០៥ - ២០ វិច្ឆិកា ២០២៥", en: "05 - 20 Nov 2025" },
                    dateTone: "green",
                    description: {
                        kh: "ដាក់ឯកសារនៅការិយាល័យសាលា និងបង់ថ្លៃចុះឈ្មោះ $10.00 តាមរយៈ Bakong KHQR ឬធនាគារ។",
                        en: "Submit the documents at the school office and pay the $10.00 registration fee via Bakong KHQR or a bank.",
                    },
                    note: {
                        kh: "ឯកសារដើមត្រូវបានទាក់ទងក្នុងសាខាកណ្ដាល",
                        en: "Original documents must be submitted in person",
                    },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "ប្រឡងជ្រើសរើស", en: "Selection Examination" },
                    date: { kh: "២៤ តុលា ២០២៥", en: "24 Oct 2025" },
                    dateTone: "red",
                    description: {
                        kh: "សិស្សដែលត្រូវបានប្រឡងប្រឡងជ្រើសរើសតាមមុខវិជជារបស់ខ្លួន ដោយសម្រាប់សាលា។",
                        en: "Students who sit the selection exam take it by subject, on behalf of the school.",
                    },
                    note: { kh: "ម៉ោង: 08:00 - 12:00", en: "Time: 08:00 - 12:00" },
                },
            },
            {
                item: {
                    title: { kh: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន", en: "Results & Enrollment" },
                    date: { kh: "០៨ ធ្នូ ២០២៥", en: "08 Dec 2025" },
                    dateTone: "purple",
                    description: {
                        kh: "លទ្ធផលត្រូវបានប្រកាសនៅគេហទំព័រ និងត្រូវចុះឈ្មោះនៅការិយាល័យក្នុងរយៈពេល ១០ ថ្ងៃ។",
                        en: "Results are published on the website, and registration at the office must be completed within 10 days.",
                    },
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
                    title: { kh: "សញ្ញាបត្របឋមសិក្សាទុតិយភូមិ", en: "BacII Certificate" },
                    subtitle: { kh: "ត្រាផ្លូវការ", en: "Official Stamps" },
                    description: {
                        kh: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបញ្ជាក់ពីសាលា សម្រាប់មុខវិជជដែលបានជ្រើសរើស។",
                        en: "Original documents bearing an official stamp, or certified copies, for the subjects selected.",
                    },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "សេចក្តីថ្លគិតគន្ទុពិន្ទុ", en: "Official Transcript" },
                    subtitle: { kh: "ពិន្ទុ BacII និងពិន្ទុប្រឡងចូលរៀន", en: "BacII & Entrance Scores" },
                    description: {
                        kh: "សេចក្តីថ្លគិតគន្ទុពិន្ទុបមសិក្សាទុតិយភូមិ រួមមានពិន្ទុប្រឡងចូលរៀនជាតិ និងលទ្ធផលប្រឡងជ្រើសរើស។",
                        en: "Official transcript of the BacII results, including the national entrance exam score and the selection exam results.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ", en: "Birth Certificate & National ID" },
                    subtitle: { kh: "ឯកសារអតតសញ្ញាណ", en: "Identity Documents" },
                    description: {
                        kh: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ។",
                        en: "Copies of the birth certificate and national ID card.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "រូបថត ៤x៦ ចំនួន ២ សន្ឹក", en: "4x6 Photos x 2" },
                    subtitle: { kh: "រូបថតបញ្ហា", en: "Portrait Photos" },
                    description: {
                        kh: "រូបថតទំហំ ៤x៦ ចំនួន ២ សនលឹក ដោយមានផ្ទឃានខាងក្រោយពណ៌សច្បាស់។",
                        en: "Two 4x6 photos, with a clear white background.",
                    },
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
                    title: { kh: "ថ្ងៃផុតកំណត់បង់ថ្លៃ", en: "Payment deadline" },
                    value: { kh: "២០ វិច្ឆិកា ២០២៥", en: "20 Nov 2025" },
                    note: { kh: "ការិយាល័យគ្រប់គ្រាន់", en: "RUPP" },
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: { kh: "ប្រឡងជ្រើសរើស", en: "Selection exam" },
                    value: { kh: "២៤ តុលា ២០២៥", en: "24 Oct 2025" },
                    note: { kh: "ផ្សាយតាមគេហទំព័រសាលា", en: "Published on the school website" },
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: { kh: "ប្រកាសលទ្ធផល", en: "Results announcement" },
                    value: { kh: "០៨ ធ្នូ ២០២៥", en: "08 Dec 2025" },
                    note: { kh: "ប្រកាសនៅគេហទំព័រសាកលវិទ្យាល័យ", en: "Published on the university website" },
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: { kh: "បញ្ចូលទៅក្នុង Google Calendar", en: "Add to Google Calendar" },
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: { kh: "សំណួរដែលសួរញឹកញាប់", en: "Admissions FAQ" },
            subtitle: {
                kh: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ RUPP។",
                en: "Answers to the questions most often asked about admission to RUPP.",
            },
        },
        items: [
            {
                exam: true,
                item: {
                    question: {
                        kh: "តើត្រូវប្រឡងជ្រើសរើសទោះបានជាប្រឡងជាតិក៏ដែរឬទេ?",
                        en: "Do I still have to sit the selection exam if I passed the national exam?",
                    },
                    answer: {
                        kh: "បាទ។ សិស្សដែលជាប់ការប្រឡងចូលរៀនជាតិ តែមិនមានចំណាប់តាមមុខវិជជ ត្រូវចូលរួមការប្រឡងជ្រើសរើសរបស់សាលាក្នុងវិធីបរិយាកាសទូទៅ។",
                        en: "Yes. Students who pass the national entrance exam but do not meet the subject thresholds must sit the school's selection exam in the general session.",
                    },
                },
            },
            {
                item: {
                    question: {
                        kh: "តើអាចជ្រើសរើសបានបីមុខវិជជឬនៅពេលចុះឈ្មោះឬទេ?",
                        en: "Can I choose three subjects when I register?",
                    },
                    answer: {
                        kh: "អាច។ សិស្សមានសិទ្ធិជ្រើសរើសមុខវិជជបានដូចគ្នាទៅការជ្រើសលំដាប់ចម្រើន លុះត្រាក់តែជាតិបង្កើតការងារត្រូវបានផ្ទៀងផ្ទាត់ទាំងអស់។",
                        en: "Yes. Students may choose the same number of subjects in the same order of preference, provided the faculty quota is not exceeded.",
                    },
                },
            },
        ],
    },

    fee: {
        header: {
            icon: "Link2",
            title: { kh: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា", en: "Registration, Exam & Study Fee" },
            subtitle: { kh: "ថ្លៃចុះឈ្មោះប្រឡង", en: "Registration & Exam Fee" },
        },
        label: { kh: "ថ្លៃចុះឈ្មោះប្រឡងសរុប", en: "Total exam registration fee" },
        price: neutral("$10.00"),
        divider: "/",
        strike: { kh: "៤០,០០០ រៀល", en: "KHR 40,000" },
        badge: { label: { kh: "មិនអាចបង្កើតវិញ", en: "Non-refundable" }, tone: "green" },
    },

    payment: {
        brand: KHQR_BRAND,
        caption: {
            title: { kh: "ឈមោះ: RUPP Admissions Account", en: "Account name: RUPP Admissions Account" },
            subtitle: KHQR_BANKS,
        },
        action: { icon: "CreditCard", label: { kh: "បង់ថ្លៃពាក្យសុំឥឡូវ", en: "Pay $10.00" } },
    },

    contact: {
        header: {
            icon: "Share2",
            title: { kh: "ការិយាល័យប្រធាន & ទំនាក់ទំនង", en: "Head Office & Contact" },
        },
        person: {
            name: { kh: "ការិយាល័យសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ", en: "Office of the Royal University of Phnom Penh" },
            role: { kh: "អង្គចូលរៀន & ទូទៅ", en: "Registrar & Admissions" },
            badge: { kh: "ផ្ទាល់អនឡាញ • ការិយាល័យ", en: "In person • Office" },
        },
        rows: [
            {
                icon: "MapPin",
                text: {
                    kh: "ផ្លូវសហព័ន្ធរុស្សី, ខណ្ឌទួលគោក, រាជធានីភ្នំពេញ, កម្ពុជា",
                    en: "Russian Federation Road, Toul Kork, Phnom Penh, Cambodia",
                },
            },
            { icon: "Globe", text: neutral("rupp.edu.kh") },
            { icon: "Clock", text: { kh: "ច័នទ - សុក្រ: 8:00 - 16:30", en: "Mon - Fri: 8:00 - 16:30" } },
            {
                icon: "Users",
                text: { kh: "សុំតាមមហាវិទ្យាល័យដែលបានជ្រើសរើសជាមុន", en: "Ask the faculty you were admitted to" },
            },
        ],
        action: {
            icon: "ExternalLink",
            label: { kh: "ទាក់ទងទៅគេហទំព័រសាលា", en: "rupp.edu.kh" },
        },
    },
};

/** Institute of Foreign Languages. */
const IFL_PROFILE: AdmissionsProfile = {
    exam: {
        papers: {
            header: {
                eyebrow: { kh: "មជ្ឈមណ្ឌលធន្គត", en: "Resource Hub" },
                tone: "green",
                title: { kh: "កម្មវិធីប្រឡងភាសា & សំណួរពីមុន", en: "Language Test Format & Past Papers" },
                subtitle: {
                    kh: "ទម្រង់ប្រឡងភាសាអង់គ្លេស និងប្រឡងសមត្ថភាពភាសាបរទេស ដើមបីរៀបចំខ្លួនមុនចុះឈ្មោះ។",
                    en: "The English test format and the foreign language aptitude test, to prepare before registering.",
                },
            },
            items: [
                {
                    icon: "BookOpen",
                    title: { kh: "ប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន", en: "Basic English Placement Test" },
                    meta: { kh: "ពេលវេលា: 90min", en: "Duration: 90 min" },
                    description: {
                        kh: "វេជ្ជាសាស្ត្រ ក្រាស្រយោធន៍ និងប្រយោគ សម្រាប់វាយតម្លៃកម្រិតភាសាពីមូលដ្ឋានដល់កម្រិតមួយ។",
                        en: "Listening, reading and speaking, to place your language level from basic to intermediate.",
                    },
                    file: neutral("PDF • Khmer-English"),
                    downloadLabel: { kh: "ទាញយកទម្រង់ PDF", en: "Download the PDF" },
                    tone: "blue",
                },
                {
                    icon: "BookOpen",
                    title: { kh: "ប្រឡងសមត្ថភាពភាសាបរទេស", en: "Language Aptitude Test" },
                    meta: { kh: "ពេលវេលា: 60min", en: "Duration: 60 min" },
                    description: {
                        kh: "ប្រឡងសមត្ថភាពសម្រាប់ដេប៉ាតឺភាសាបារាំង និងដេប៉ាតឺបកប្រែ សរសេរ និងស្តាប់។",
                        en: "The aptitude test for the foreign language and translation departments: writing and dictation.",
                    },
                    file: neutral("PDF • Khmer"),
                    downloadLabel: { kh: "ទាញយកទម្រង់ PDF", en: "Download the PDF" },
                    tone: "purple",
                },
            ],
            note: {
                icon: "Info",
                title: { kh: "ចំណាំសំខាន់", en: "Note" },
                text: {
                    kh: "សិស្សដែលជាប់ការប្រឡងភាសាអង់គ្លេសត្រូវចូលរួមសម្រាប់ដេប៉ាតឺភាសាអង់គ្លេសដោយស្រាប់ ដេប៉ាតឺភាសាបរទេសដែលទាមទារការប្រឡងបន្ថែម។",
                    en: "Students who pass the English test must join the English department, while the foreign language departments require an extra test.",
                },
            },
        },
    },

    eligibility: {
        header: {
            eyebrow: { kh: "តារាងលក្ខខណ្ឌចូលរៀន", en: "Eligibility Matrix" },
            icon: "FileText",
            title: { kh: "លក្ខខណ្ឌចូលរៀនទូទៅ", en: "General Entry Criteria & BacII" },
            subtitle: {
                kh: "លក្ខខណ្ឌរបស់វិទ្យាស្ថានភាសាបរទេស (IFL) សម្រាប់សិស្សដែលចង់ចូលរៀននៅដេប៉ាតឺភាសាអង់គ្លេស ភាសាបារាំង និងបកប្រែ។",
                en: "Entry criteria for the Institute of Foreign Languages (IFL) for students who want to study in the English, foreign language and translation departments.",
            },
        },
        cells: [
            {
                item: {
                    label: [
                        { kh: "បរិញ្ញាបត្រ", en: "Diploma" },
                        { kh: "ស្មើគ្នា", en: "or equivalent" },
                    ],
                    badge: [neutral("BacII")],
                    tone: "green",
                    note: [
                        {
                            kh: "បរិញ្ញាបត្របឋមសិក្សាទុតិយភូមិ (BacII) ឬសញ្ញាបត្រស្មើគ្នា ដោយអាស្រ័តមុខវិជជរបស់វិទ្យាស្ថាន។",
                            en: "A BacII (high school diploma) or an equivalent upper secondary diploma, depending on the institute's department.",
                        },
                    ],
                },
            },
            {
                exam: true,
                item: {
                    label: [{ kh: "ប្រឡងចូលរៀន & សមត្ថភាព", en: "Entrance & Aptitude Test" }],
                    badge: [neutral("IFL")],
                    tone: "blue",
                    note: [
                        {
                            kh: "ជាប់ការប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន និងការប្រឡងសមត្ថភាពភាសារបស់វិទ្យាស្ថាន អាស្រ័តមុខវិជជ។",
                            en: "Covers the institute's basic English test and language aptitude test, depending on the department.",
                        },
                    ],
                },
            },
            {
                item: {
                    label: [{ kh: "កម្រិតភាសា", en: "Language Level" }],
                    badge: [neutral("B1 EN"), neutral("A2 NEW")],
                    tone: "purple",
                    note: [
                        {
                            kh: "សិស្សត្រូវអាចរៀនភាសាបរទេសពេញលេញ ហើយចូលរៀនភាសាបរទេសពីកម្រិតមូលដ្ឋានបាន។",
                            en: "Students must be able to study a foreign language fully, and may enter the foreign language programme from a basic level.",
                        },
                    ],
                },
            },
        ],
        gauges: {
            title: { kh: "កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា", en: "Minimum Subject Competency Gauge" },
            note: { kh: "ផ្គកលើលទ្ធផលប្រឡងវាយតម្លៃ", en: "Scaled against the scored exam result" },
            items: [
                {
                    exam: true,
                    item: {
                        label: { kh: "ភាសាអង់គ្លេស", en: "English" },
                        requirement: { kh: "តម្រូវ 60% ឡើងទៅ", en: "60% required, or above" },
                        value: 60,
                    },
                },
                {
                    exam: true,
                    item: {
                        label: { kh: "សមត្ថភាពភាសា", en: "Language Aptitude" },
                        requirement: { kh: "តម្រូវ 50% ឡើងទៅ", en: "50% required, or above" },
                        value: 50,
                    },
                },
                {
                    item: {
                        label: { kh: "ភាសាខ្មែរ", en: "Khmer" },
                        requirement: { kh: "តម្រូវ កម្រិត B1 ឡើងទៅ", en: "Level B1 required, or above" },
                        value: 45,
                    },
                },
            ],
        },
        notice: {
            icon: "AlertCircle",
            text: {
                kh: "ចំណាំសំខាន់៖ កម្មវិធីឆ្នាំដំបូងសម្រាប់ភាសាបារាំង ត្រូវចូលរួមនៅដេប៉ាតឺភាសាខ្មែរ ខ្មែន ឬចិន។",
                en: "Note: the foundation year programme for foreign languages must be taken at the Khmer, French or Chinese department.",
            },
        },
    },

    roadmap: {
        header: {
            eyebrow: { kh: "ដំណើរការជាជំហាន", en: "Step-by-Step Flow" },
            meta: { kh: "បានកែសម្រួលឆ្នាំ ២០២៥", en: "Updated 2025" },
            title: { kh: "ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន", en: "4-Step Admission Roadmap" },
            subtitle: {
                kh: "ដំណើរការចូលរៀននៅ IFL មាន ៤ ជំហាន ចាប់ពីការទាញយកបញ្ជីបញ្ជាក់ ដល់ការចុះឈ្មោះចូលរៀន។",
                en: "The admission process at IFL has four steps, from collecting the application form to registering for study.",
            },
        },
        steps: [
            {
                item: {
                    title: { kh: "ទាញយកបញ្ជីបញ្ជាក់ & ចុះឈ្មោះ", en: "Collect the Form & Register" },
                    date: { kh: "០១ - ១០ កញ្ញា ២០២៥", en: "01 - 10 Sep 2025" },
                    dateTone: "blue",
                    description: {
                        kh: "ទាញយកបញ្ជីបញ្ជាក់នៅសាខាកណ្ដាលវិទ្យាស្ថាន បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជ។",
                        en: "Collect the application form at the institute's central branch, fill in your personal details and choose your department.",
                    },
                    note: {
                        kh: "អាចចុះឈ្មោះតាមអ៊ីមែល ឬមកផ្ទាល់នៅសាខា",
                        en: "You can register by email or come in person to the branch",
                    },
                },
            },
            {
                item: {
                    title: { kh: "ដាក់ឯកសារ & បង់ថ្លៃ", en: "Document Submission & Fee" },
                    date: { kh: "១០ - ២៥ កញ្ញា ២០២៥", en: "10 - 25 Sep 2025" },
                    dateTone: "green",
                    description: {
                        kh: "ដាក់ឯកសារនៅសាខាកណ្ដាល និងបង់ថ្លៃ $10.00 តាមរយៈ Bakong KHQR ឬធនាគារ។",
                        en: "Submit documents at the branch and pay the $10.00 fee via Bakong KHQR or a bank.",
                    },
                    note: { kh: "ទទួលបានវិក្យបត្របង់ប្រាក់", en: "A payment receipt is issued" },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "ប្រឡងភាសា & បទប្បង្កត់", en: "Language Test & Interview" },
                    date: { kh: "០៩ តុលា ២០២៥", en: "09 Oct 2025" },
                    dateTone: "red",
                    description: {
                        kh: "សិស្សប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន និងប្រឡងសមត្ថភាពភាសា រួមមានការសម្រាប់ដេប៉ាតឺបកប្រែ។",
                        en: "Students sit the basic English test and the language aptitude test, together with an interview for the translation department.",
                    },
                    note: { kh: "អាស្រ័តមុខវិជជដែលបានជ្រើសរើស", en: "Depends on the department chosen" },
                },
            },
            {
                item: {
                    title: { kh: "ប្រកាសលទ្ផល & ចុះឈោះចូលរៀន", en: "Results & Enrollment" },
                    date: { kh: "២០ តុលា ២០២៥", en: "20 Oct 2025" },
                    dateTone: "purple",
                    description: {
                        kh: "លទ្ធផលត្រូវបានប្រកាសនៅសាខាកណ្ដាល និងត្រូវចុះឈ្មោះចូលរៀនក្នុងរយៈពេល ៧ ថ្ងៃ។",
                        en: "Results are announced at the branch, and you must register for study within seven days.",
                    },
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
                    title: { kh: "សញ្ញាបត្របឋមសិក្សាទុតិយភូមិ", en: "BacII Certificate" },
                    subtitle: { kh: "ត្រាផ្លូវការ", en: "Official Stamps" },
                    description: {
                        kh: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបញ្ជាក់ពីសាលា ឬសញ្ញាបត្រស្មើគ្នា។",
                        en: "The original document with a wet signature, or a copy certified by the school or an equivalent diploma.",
                    },
                },
            },
            {
                exam: true,
                item: {
                    title: { kh: "វិក្យបត្រភាសា", en: "Language Certificate" },
                    subtitle: { kh: "B1 ឬសមមូល", en: "B1 or Equivalent" },
                    description: {
                        kh: "វិក្យបត្រភាសាអង់គ្លេសកម្រិត B1 ឡើងវិញ ឬវិក្យបត្រពីស្ថាប័នស្របសម្រាប់ដេប៉ាតឺបកប្រែ។",
                        en: "An English language certificate at level B1 or above, or a certificate from an institution recognised by the translation department.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "សំបុត្រកំណើត & អតតសញ្ញាណបថណ្ណ", en: "Birth Certificate & National ID" },
                    subtitle: { kh: "ឯកសារអត្តសញ្ញាណ", en: "Identity Documents" },
                    description: {
                        kh: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ។",
                        en: "A copy of the birth certificate and the national ID.",
                    },
                },
            },
            {
                item: {
                    title: { kh: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក", en: "4x6 Photos x 4" },
                    subtitle: { kh: "រូបថតសម្គាល់", en: "Portrait Photos" },
                    description: {
                        kh: "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក ដោយមានផ្ទឃានខាងក្រោយពណ៌សច្បាស់។",
                        en: "4x6 photos, four copies, with a clear white background.",
                    },
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
                    title: { kh: "ថ្ងៃផុតកំណត់បញ្ជីបញ្ជាក់", en: "Application form deadline" },
                    value: { kh: "១០ កញ្ញា ២០២៥", en: "10 Sep 2025" },
                    note: { kh: "សាខាកណ្ដាលវិទ្យាស្ថាន", en: "IFL" },
                },
            },
            {
                exam: true,
                item: {
                    icon: "MessageSquare",
                    tone: "green",
                    title: { kh: "ប្រឡងភាសា & បទប្បង្កត់", en: "Language Test & Interview" },
                    value: { kh: "០៩ តុលា ២០២៥", en: "09 Oct 2025" },
                    note: { kh: "ផ្សាយតាមគេហទំព័រវិទ្យាស្ថាន", en: "Published on the institute's website" },
                },
            },
            {
                item: {
                    icon: "GraduationCap",
                    tone: "purple",
                    title: { kh: "ប្រកាសលទ្ធផល", en: "Results announcement" },
                    value: { kh: "២០ តុលា ២០២៥", en: "20 Oct 2025" },
                    note: { kh: "ប្រកាសនៅសាខាកណ្ដាល", en: "Announced at the branch" },
                },
            },
        ],
        action: {
            icon: "BookOpen",
            label: { kh: "បញ្ចូលទៅក្នុង Google Calendar", en: "Add to Google Calendar" },
        },
    },

    faq: {
        header: {
            icon: "HelpCircle",
            title: { kh: "សំណួរដែលសួរញឹកញាប់", en: "Admissions FAQ" },
            subtitle: {
                kh: "ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ IFL។",
                en: "Answers to the questions most often asked about admission at IFL.",
            },
        },
        items: [
            {
                exam: true,
                item: {
                    question: {
                        kh: "តើមានការប្រឡងចូលរៀននៅវិទ្យាស្ថានភាសាបរទេសឬទេ?",
                        en: "Is there an entrance test at the Institute of Foreign Languages?",
                    },
                    answer: {
                        kh: "មាន។ រួមមានការប្រឡងភាសាអង់គ្លេសមូលដ្ឋាន និងការប្រឡងសមត្ថភាពភាសា ដែលបានកំណត់តាមមុខវិជជដែលសិស្សបានជ្រើសរើស។",
                        en: "Yes. It includes the basic English test and the language aptitude test, set according to the department the student has chosen.",
                    },
                },
            },
            {
                item: {
                    question: {
                        kh: "តើអាចចូលរៀនភាសាបារាំងពីកម្រិតមូលដ្ឋានបានទេ?",
                        en: "Can I study a foreign language from a basic level?",
                    },
                    answer: {
                        kh: "បាទ។ ដេប៉ាតឺភាសាបារាំងគ្រប់គ្រាន់ទទួលសិស្សចាប់ពីកម្រិតមូលដ្ឋាន។ សូមពិនិត្យមើលកម្មវិធីឆ្នាំដំបូងសម្រាប់ភាសាបារាំងនៅលើគេហទំព័រសាខាកណ្ដាល។",
                        en: "Yes. Every foreign language department accepts students from a basic level. Please check the foreign language foundation year programme on the branch website.",
                    },
                },
            },
        ],
    },

    fee: {
        header: {
            icon: "Link2",
            title: { kh: "ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា", en: "Registration, exam and study fees" },
            subtitle: { kh: "ថ្លៃចុះឈ្មោះប្រឡង", en: "Registration & Exam Fee" },
        },
        label: { kh: "ថ្លៃចុះឈ្មោះប្រឡងសរុប", en: "Total registration and exam fee" },
        price: neutral("$10.00"),
        divider: "/",
        strike: { kh: "៤០,០០០ រៀល", en: "KHR 40,000" },
        badge: { label: { kh: "មិនអាចសុំតាមវិញបាន", en: "Non-refundable" }, tone: "green" },
    },

    payment: {
        brand: KHQR_BRAND,
        caption: {
            title: { kh: "ឈមោះ: IFL Admissions Account", en: "Account name: IFL Admissions Account" },
            subtitle: KHQR_BANKS,
        },
        action: { icon: "CreditCard", label: { kh: "បង់ថ្លៃពាក្យសុំឥឡូវ", en: "Pay $10.00" } },
    },

    contact: {
        header: {
            icon: "Share2",
            title: { kh: "ការិយាល័យប្រធាន & ទំនាក់ទំនង", en: "Head office & contact" },
        },
        person: {
            name: { kh: "សាខាកណ្ដាលវិទ្យាស្ថានភាសាបរទេស", en: "Institute of Foreign Languages Central Branch" },
            role: { kh: "សាខាសិក្សា & ទំនាក់ទំនង", en: "Registrar & Student Affairs" },
            badge: { kh: "ផ្ទាល់អនឡាញ • ការិយាល័យ", en: "In person • Office" },
        },
        rows: [
            {
                icon: "MapPin",
                text: {
                    kh: "ផ្លូវព្រះសីហមេនី, រាជធានីភ្នំពេញ, កម្ពុជា",
                    en: "Preah Sihanouk Blvd, Phnom Penh, Cambodia",
                },
            },
            { icon: "Globe", text: neutral("ifl.rupp.edu.kh") },
            { icon: "Clock", text: { kh: "ច័នទ - សុក្រ: 8:00 - 16:30", en: "Mon - Fri: 8:00 - 16:30" } },
            {
                icon: "Info",
                text: {
                    kh: "បញ្ជីបញ្ជាក់អាចទាញយកផ្ទាល់នៅសាខាកណ្ដាល",
                    en: "The application form can be downloaded directly at the branch",
                },
            },
        ],
        action: {
            icon: "ExternalLink",
            label: { kh: "ទាក់ទងទៅគេហទំព័រ", en: "ifl.rupp.edu.kh" },
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

/** Khmer numerals, the digits a Khmer-language list is numbered in. */
const KHMER_DIGITS = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

/**
 * The digit a list is numbered with. Khmer reads in Khmer numerals, English in
 * Western ones, so this follows the reader rather than the school: a Khmer
 * school that lists its checklist ១២៣ is writing in Khmer, and showing that to
 * an English reader would reproduce the mixed-script page this file exists to
 * remove.
 */
function ordinal(index: number, lang: Lang): string {
    if (lang === "en") return String(index + 1);
    return KHMER_DIGITS[index] ?? String(index + 1);
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
function buildEligibility(profile: ResolvedProfile, hasExam: boolean): EligibilityMatrixData | undefined {
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
function buildRoadmap(profile: ResolvedProfile, hasExam: boolean): AdmissionRoadmapData | undefined {
    const steps = itemsOf(profile.roadmap.steps, hasExam);
    if (steps.length === 0) return undefined;

    return {
        header: profile.roadmap.header,
        steps: steps.map((step, index) => ({ ...step, number: index + 1 })),
    };
}

/** The hand-in checklist, numbered in Khmer numerals. */
function buildDocuments(profile: ResolvedProfile, hasExam: boolean, lang: Lang): RequiredDocumentsData | undefined {
    const items = itemsOf(profile.documents.items, hasExam);
    if (items.length === 0) return undefined;

    return {
        header: profile.documents.header,
        action: profile.documents.action,
        items: items.map((item, index) => ({ ...item, index: ordinal(index, lang) })),
    };
}

/** Deadlines and milestones. */
function buildDates(profile: ResolvedProfile, hasExam: boolean): ImportantDatesData | undefined {
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
function buildFaq(profile: ResolvedProfile, hasExam: boolean): AdmissionsFaqData | undefined {
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
export function getAdmissionsSections(profile: ResolvedProfile, lang: Lang): AdmissionsSections {
    const hasExam = profile.exam !== undefined;

    return {
        eligibility: buildEligibility(profile, hasExam),
        roadmap: buildRoadmap(profile, hasExam),
        documents: buildDocuments(profile, hasExam, lang),
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
 *
 * Built already resolved, because unlike a profile this is derived per request
 * and has the language to hand. Note that the school's own address and name
 * are read in the reader's language too — they are `NamespacedText` on the
 * entity, and picking `.en` here would have left a Khmer reader with an
 * English address.
 */
function deriveContact(university: University, lang: Lang): ContactCardData | undefined {
    const rows: ContactCardData["rows"] = [];
    const address = university.address && resolveCopy(university.address, lang);
    if (address) rows.push({ icon: "MapPin", text: address });
    if (university.website) rows.push({ icon: "Globe", text: university.website });
    if (rows.length === 0) return undefined;

    return {
        header: resolveBilingual<AdmissionsCardHeader>(CONTACT_HEADER, lang),
        person: {
            name: resolveCopy({ kh: "ការិយាល័យចូលរៀន", en: "Admissions Office" }, lang),
            role: university.name[lang] ?? university.name.en,
        },
        rows,
        action: university.website
            ? {
                  icon: "ExternalLink",
                  label: resolveCopy(
                      {
                          kh: `ទាក់ទងទៅគេហទំព័រសាលា (${university.website})`,
                          en: `Visit the school website (${university.website})`,
                      },
                      lang,
                  ),
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
 *
 * Resolved on the spot for the same reason as {@link deriveContact}: this is
 * derived from the record at request time, so it never sits in the data file.
 */
function deriveProfile(university: University, lang: Lang): ResolvedProfile {
    const head = resolveBilingual<AdmissionsCardHeader>;

    return {
        eligibility: {
            header: head(ELIGIBILITY_HEADER, lang),
            cells: [],
        },
        roadmap: {
            header: head(ROADMAP_HEADER, lang),
            steps: [],
        },
        documents: { header: head(DOCUMENTS_HEADER, lang), items: [] },
        dates: { header: head(DATES_HEADER, lang), items: [] },
        faq: {
            header: head(FAQ_HEADER, lang),
            items: [],
        },
        contact: deriveContact(university, lang),
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
 *
 * `lang` is the reader's language, resolved by the root layout from the
 * language cookie and handed down. A profile is declared per language and
 * resolved here, once, so the cards receive plain strings in the language the
 * page is being read in.
 */
export function getAdmissionsPageData(university: University, lang: Lang): AdmissionsPageData {
    /* Every program is listed: a student should see that a program's
     requirements are unpublished, not wonder why it is missing. */
    const groups = university.departments.map(dept => ({
        unit: dept.name,
        lines: dept.requirements,
    }));

    const total = groups.reduce((sum, group) => sum + group.lines.length, 0);

    const requirements: RequirementsCardData = {
        header: {
            ...resolveBilingual(REQUIREMENTS_HEADER, lang),
            badge:
                total > 0
                    ? resolveCopy(
                          { kh: `${total} តម្រូវការ`, en: `${total} Requirement${total === 1 ? "" : "s"}` },
                          lang,
                      )
                    : undefined,
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
        return {
            requirements,
            ...getAdmissionsSections(resolveBilingual<ResolvedProfile>(profile, lang), lang),
            pending: [],
        };
    }

    const sections = getAdmissionsSections(deriveProfile(university, lang), lang);

    return {
        requirements,
        ...sections,
        pending: getPendingSections(lang).filter(section => !sections[section.key]),
    };
}
