import { departmentPageData } from "@/data/department-page";
import type { ScholarshipItem } from "@/data/department-page";
import type { IconName } from "@/lib/icons";
import type { Lang } from "@/lib/language";
import type { Tone } from "@/lib/tones";
import type { Bilingual } from "@/data/text";
import { resolveBilingual, resolveText } from "@/data/text";
import type { NamespacedText, University } from "@/data/universities";

/* ------------------------------------------------------------------ *
 * Shared shapes                                                       *
 * ------------------------------------------------------------------ */

/**
 * Accent of a scholarship card's eyebrow, badge, panel or button. Stored as a
 * semantic name so the data stays free of Tailwind classes — `@/lib/tones`
 * owns the one mapping, and narrowing {@link Tone} here keeps the names
 * valid there by construction.
 */
export type ScholarshipTone = Extract<
  Tone,
  | "blue"
  | "purple"
  | "green"
  | "amber"
  | "orange"
  | "red"
  | "pink"
  | "slate"
>;

/**
 * Head of every section card: the eyebrow line (icon + label + badge on the
 * right), the Khmer title with its English gloss as the subtitle. `tone`
 * colours the eyebrow, the badge and — where the card asks for it — the wash
 * behind the head.
 */
export interface ScholarshipsCardHeader {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Right aligned chip: "រដ្ឋាភិបាល", "MPTC", a seat count… */
  badge?: string;
  icon?: IconName;
  tone?: ScholarshipTone;
}

/** One line of a hero or section stat: label above a large value. */
export interface ScholarshipStatData {
  icon?: IconName;
  tone?: ScholarshipTone;
  label: string;
  value?: string;
  /** Small print under the value, usually its English gloss. */
  caption?: string;
  /** Chips rendered between the value and the caption, e.g. covered majors. */
  chips?: { label: string; tone: ScholarshipTone }[];
}

/** Action rendered as a solid button: "Apply now", "Start application"… */
export interface ScholarshipAction {
  label: string;
  href?: string;
  tone?: ScholarshipTone;
}

/* ------------------------------------------------------------------ *
 * Hero                                                                *
 * ------------------------------------------------------------------ */

export interface ScholarshipsHeroData {
  icon: IconName;
  tone: ScholarshipTone;
  eyebrow: string;
  /** First line of the headline. */
  title: string;
  /** Highlighted second line of the headline. */
  accent: string;
  description: string;
  stats: ScholarshipStatData[];
}

/* ------------------------------------------------------------------ *
 * Program cards — one per scholarship programme                       *
 * ------------------------------------------------------------------ */

/** A row of a tinted panel: a line on its own, or with an English gloss. */
export interface ScholarshipListRow {
  title: string;
  caption?: string;
}

export interface ScholarshipPanelData {
  title: string;
  tone: ScholarshipTone;
  /** Colour of the bullet / check marks. Defaults to the panel's own tone. */
  accent?: ScholarshipTone;
  marker: "dot" | "check";
  /** `grid` sets the rows in three columns, `list` stacks them. */
  layout?: "grid" | "list";
  items: ScholarshipListRow[];
}

/** Sub-card of a grouped body: a partner, a fund, a programme office… */
export interface ScholarshipGroupData {
  icon: IconName;
  tone: ScholarshipTone;
  title: string;
  subtitle?: string;
  /** Colour of the check marks. Defaults to `"green"`. */
  accent?: ScholarshipTone;
  items: string[];
  action?: ScholarshipAction;
}

export interface ScholarshipNoticeData {
  icon?: IconName;
  /** Bold lead-in, e.g. "ចំណាំ:". */
  title?: string;
  text: string;
}

export interface ScholarshipProgramData {
  header: ScholarshipsCardHeader;
  stats?: ScholarshipStatData[];
  /** Tinted panels: benefits, eligibility, criteria… */
  panels?: ScholarshipPanelData[];
  /** Two-column sub-cards: partners, internal funds… */
  groups?: ScholarshipGroupData[];
  notice?: ScholarshipNoticeData;
  deadline?: string;
  action?: ScholarshipAction;
}

/* ------------------------------------------------------------------ *
 * Rail cards                                                          *
 * ------------------------------------------------------------------ */

export interface DepartmentAllocationEntry {
  code: string;
  name: string;
  nameEn: string;
  count: number;
  tone: ScholarshipTone;
}

export interface DepartmentAllocationData {
  /**
   * `badge` may carry a `{total}` placeholder — the card replaces it with the
   * summed seats, so the data never has to repeat the arithmetic.
   */
  header: ScholarshipsCardHeader;
  departments: DepartmentAllocationEntry[];
  summary: {
    /** "សរុបអាហារូបករណ៍ទាំងអស់:" — printed before the total. */
    label: string;
    /** Unit after the total, e.g. "ទីតាំង". */
    unit: string;
    caption: string;
  };
}

export interface HowToApplyStepData {
  number: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface HowToApplyData {
  header: ScholarshipsCardHeader;
  steps: HowToApplyStepData[];
  download?: { title: string; caption: string; file: string };
  contact?: { title: string; rows: { icon: IconName; text: string }[] };
  action?: ScholarshipAction;
}

/* ------------------------------------------------------------------ *
 * The board card — the school's own published list                    *
 * ------------------------------------------------------------------ */

export interface ScholarshipsCardData {
  header: { title: string; subtitle?: string; badge?: string };
  items: ScholarshipItem[];
  /** Rendered when the school publishes none. */
  empty: NamespacedText;
  /** App-wide scholarship board, offered by the empty state as a next step. */
  board: { label: string; href: string };
  /** School website, offered by the empty state as the authoritative source. */
  website?: string;
}

/* ------------------------------------------------------------------ *
 * Page bundle                                                         *
 * ------------------------------------------------------------------ */

export interface ScholarshipsPageData {
  hero: ScholarshipsHeroData;
  /** Real: the school's own published scholarships, for every school. */
  list: ScholarshipsCardData;
  /* Sample sections — attached for ITC only, empty/undefined elsewhere. */
  programs: ScholarshipProgramData[];
  allocation?: DepartmentAllocationData;
  howToApply?: HowToApplyData;
}

/* ------------------------------------------------------------------ *
 * How the copy above is authored                                        *
 * ------------------------------------------------------------------ */

/**
 * Fields typed as a bare `string` that are not display copy, so
 * {@link Bilingual} has to be told to leave them alone. `code` and `nameEn`
 * are identifiers and one side of a bilingual name; the rest are routes, a
 * file name and a bare host.
 */
type NonCopyKey =
  | "href"
  | "website"
  | "file"
  | "code"
  | "nameEn";

/**
 * The board card's list, with its two already-bilingual fields taken out of
 * the walk.
 *
 * `ScholarshipItem` holds `NamespacedText` and `ScholarshipListCard` resolves
 * it client-side with `resolveText`, because that card is where the reader can
 * flip language without a round trip. Left to {@link Bilingual} the same two
 * keys would be rewritten into `PageCopy` and flattened back to a single
 * string here — quietly taking the resolution away from the card that owns it.
 *
 * `Omit` rather than the `NonCopyKey` list, because `items` means the opposite
 * thing in `ScholarshipGroupData` (a list of copy) and in `ScholarshipsCardData`
 * (a list of already-bilingual records). One page-wide list cannot say both.
 */
type ListCardSource = Omit<
  Bilingual<ScholarshipsCardData, "href" | "website">,
  "items" | "empty"
> & {
  items: ScholarshipItem[];
  empty: NamespacedText;
};

/** The page bundle as it is written, with every string still language-tagged. */
type PageSource = Omit<
  Bilingual<ScholarshipsPageData, NonCopyKey>,
  "list"
> & { list: ListCardSource };

/** The page minus the board card, which is resolved by its own helper. */
type PageWithoutList = Omit<PageSource, "list">;

/* ------------------------------------------------------------------ *
 * Sample content — only attached where it is known to be true         *
 * ------------------------------------------------------------------ */

/**
 * The three scholarships are the same sample the department page shows in its
 * scholarship brief — they are ITC's, so they are attached to ITC alone here
 * rather than copied into a second list that could drift.
 */
const ITC_SCHOLARSHIPS = departmentPageData.scholarship.scholarships;

const EMPTY_SCHOLARSHIPS: NamespacedText = {
  kh: "សាលានេះមិនទាន់បានចុះផ្សាយអាហារូបករណ៍នៅឡើយ។ អាចពិនិត្យមើលបញ្ជីអាហារូបករណ៍ទាំងអស់ ឬគេហទំព័រសាលា។",
  en: "This school has not published any scholarship yet — browse all scholarships or check the school's website.",
};

const ITC_HERO: Bilingual<ScholarshipsHeroData> = {
  icon: "GraduationCap",
  tone: "blue",
  eyebrow: { kh: "ឱកាសសិក្សាបន្ត", en: "SCHOLARSHIPS 2025" },
  title: {
    kh: "ឱកាសកាត់បន្យកម្រិតសិក្សាសម្រាប់",
    en: "Cutting-edge scholarship opportunities for",
  },
  accent: { kh: "សិស្ឆ្នើមរបស់ ITC", en: "ITC students" },
  description: {
    kh: "ITC ផ្តល់ឱកាសអាហារូបករណ៍ដ៏ច្រើនសម្រាប់និស្សិតដែលមានសមត្ថភាពខ្ពស់ ក្នុងការសិក្សាបន្តថ្នាក់បរិញ្ញាបត្រ និងអនុបណ្ឌិត។ យើងជឿជាក់ថា ការវិនិយោគលើការអប់រំគឺជាគន្លឹះសម្រាប់អនាគត។",
    en: "ITC offers a wide range of scholarships for high-achieving students in undergraduate and graduate study. We believe investing in education is the key to the future.",
  },
  stats: [
    {
      icon: "GraduationCap",
      tone: "blue",
      label: { kh: "អាហារូបករណ៍", en: "Scholarships" },
      value: { kh: "២០+", en: "20+" },
      caption: { kh: "អាហារូបករណ៍ដែលមាន", en: "Scholarships Available" },
    },
    {
      icon: "DollarSign",
      tone: "green",
      label: { kh: "តម្លៃសរុប", en: "Total value" },
      value: { kh: "$350,000+", en: "$350,000+" },
      caption: { kh: "តម្លៃអាហារូបករណ៍សរុប", en: "Total Scholarship Value" },
    },
    {
      icon: "Percent",
      tone: "amber",
      label: { kh: "ការគ្របដណ្តប់", en: "Coverage" },
      value: { kh: "80% & 95%", en: "80% & 95%" },
      caption: { kh: "អត្រាការគ្របដណ្តប់", en: "Coverage Rate" },
    },
  ],
};

const ITC_GOVERNMENT: Bilingual<ScholarshipProgramData, NonCopyKey> = {
  header: {
    eyebrow: {
      kh: "អាហារូបករណ៍រដឋាភិបាល & អាហារូបករណ៍សំខាន់",
      en: "Government & Flagship Scholarships",
    },
    icon: "Flag",
    tone: "blue",
    badge: { kh: "រដ្ឋាភិបាល", en: "Government" },
    title: {
      kh: "អាហារូបករណ៍រដ្ឋាភិបាលកម្ពុជា (MEYS)",
      en: "Cambodia Government State Quota (MEYS)",
    },
    subtitle: {
      kh: "អាហារូបករណ៍ពេញលេញសម្រាប់និស្សិតឆ្នើមរបស់ ITC ដើម្បីសិក្សានៅបរទេស (រុស្៊ី, ចិន, ជប៉ុន, កូរ៉េ, បារាំង)។",
      en: "Full scholarships for top ITC graduates to study abroad (Russia, China, Japan, Korea, Germany).",
    },
  },
  stats: [
    {
      icon: "Star",
      tone: "amber",
      label: { kh: "ពិន្ទុ GPA ឆ្នាំ", en: "GPA score" },
      value: { kh: "≥ 3.50", en: "≥ 3.50" },
      caption: { kh: "តម្រូវការពិន្ទុ GPA អប្បរមា", en: "Minimum GPA Requirement" },
    },
    {
      icon: "Award",
      tone: "purple",
      label: { kh: "ពិន្ទុប្ឡងជាតិ", en: "National exam" },
      value: { kh: "≥ 85%", en: "≥ 85%" },
      caption: { kh: "ពិន្ទុប្រឡងជាតិ", en: "National Exam Score" },
    },
    {
      icon: "Globe",
      tone: "blue",
      label: { kh: "ចំណាត់ថ្នាក់ ITC", en: "ITC class rank" },
      value: { kh: "Top 10%", en: "Top 10%" },
      caption: { kh: "ចំណាត់ថ្នាក់ ITC", en: "ITC Class Ranking" },
    },
  ],
  panels: [
    {
      tone: "blue",
      title: { kh: "អត្ថបរយោជន៍", en: "Benefits" },
      marker: "check",
      layout: "grid",
      items: [
        {
          title: { kh: "រយៈពេលពេញ ៥ ឆ្នាំ", en: "Full 5 years" },
          caption: { kh: "គ្របដណ្តប់ទាំងរយៈពេល", en: "Full 5 Years Coverage" },
        },
        {
          title: { kh: "ប្រាក់ខែប្រចាំខែ", en: "Monthly allowance" },
          caption: { kh: "ប្រាក់ខែប្រចាំខែ", en: "Monthly Allowance" },
        },
        {
          title: { kh: "ការធ្វើដំណើរអន្តរជាតិ", en: "International trip" },
          caption: { kh: "ការធ្វើដំណើរអន្តរជាតិ", en: "International Trip" },
        },
      ],
    },
    {
      tone: "slate",
      accent: "blue",
      marker: "dot",
      title: { kh: "លក្ខខណ្ឌសិទ្ធទទួលបាន", en: "Eligibility Criteria" },
      items: [
        {
          title: {
            kh: "និស្សិតដែលកំពុងសិកសានៅ ITC ក្នុងឆ្នាំទី ៣ ឬទី ៤ នៃកម្មវិីបរិញ្ញាបត្រ",
            en: "Students currently studying at ITC in year 3 or 4 of the program",
          },
        },
        {
          title: {
            kh: "មានពិន្ទុ GPA ≥ 3.50 និងពិន្ទុប្ឡងជាតិ ≥ 85%",
            en: "GPA ≥ 3.50 and national exam score ≥ 85%",
          },
        },
        {
          title: {
            kh: "មានសមត្ភាពភាសា (អង់គ្លេស ឬភាសាប្រទេសគោលដៅ)",
            en: "Language proficiency (English or the target country's language)",
          },
        },
        {
          title: {
            kh: "មានសកមមភាពស្ម័គ្រចិតត និងសកម្មភាពសង្គម",
            en: "Good conduct and community involvement",
          },
        },
      ],
    },
  ],
  deadline: {
    kh: "ផុតកំណត់៖ ៣០ កញ្ញា ២០២៥",
    en: "Deadline: September 30, 2025",
  },
  action: { label: { kh: "ដាក់ពាក្យ", en: "Apply Now" } },
};

const ITC_TECH: Bilingual<ScholarshipProgramData, NonCopyKey> = {
  header: {
    eyebrow: {
      kh: "អាហារូបករណ៍ឧស្សាហកម្ម & បច្ចេកវិទ្យា",
      en: "Industry & Tech Scholarships",
    },
    icon: "Cpu",
    tone: "purple",
    badge: { kh: "MPTC", en: "MPTC" },
    title: {
      kh: "អាហារូបករណ៍ទេពកោសល្យឌីជីថល (MPTC)",
      en: "Tech Digital Talent Scholarship (MPTC)",
    },
    subtitle: {
      kh: "អាហារូបករណ៍ពីក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍ (MPTC) សម្រាប់និស្សិតផ្នែកបច្ចេកវិទ្យា និងទូរគមនាគមន៍។",
      en: "Scholarships from the Ministry of Posts and Telecommunications (MPTC) for students in technology and telecoms.",
    },
  },
  stats: [
    {
      tone: "purple",
      label: { kh: "អត្ប្រយោជន", en: "Coverage" },
      value: { kh: "100% ថ្លៃ + $700/ខែ", en: "100% fee + $700/m" },
      caption: {
        kh: "ថ្លៃសិក្សាទាំងអស់ + ប្រាក់ខែប្រចាំខែ",
        en: "Full Tuition + Monthly Stipend",
      },
    },
    {
      tone: "purple",
      label: { kh: "ផ្នែកសិក្សា", en: "Field of study" },
      chips: [
        { label: { kh: "GSC", en: "GSC" }, tone: "blue" },
        { label: { kh: "AI", en: "AI" }, tone: "green" },
        { label: { kh: "ទូរគមនាគមន៍", en: "Telecom" }, tone: "purple" },
      ],
      caption: {
        kh: "វិទ្យាសាស្ត្រកុំព្យូទ័រ & សន្តរកម្មណើធតាបណ្ណ",
        en: "Computer Science & Cybersecurity",
      },
    },
    {
      tone: "purple",
      label: { kh: "រយៈពេល", en: "Duration" },
      value: { kh: "២-៤ ឆ្នាំ", en: "2-4 years" },
      caption: { kh: "រយៈពេល", en: "Duration" },
    },
  ],
  panels: [
    {
      tone: "purple",
      marker: "check",
      title: { kh: "លក្ខខណ៌សិទ្ធទទួលបាន", en: "Eligibility" },
      items: [
        {
          title: {
            kh: "និស្សិត ITC ផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ, AI, ឬទូរគមនាគមន៍",
            en: "ITC students in Computer Science, AI or Telecom",
          },
        },
        {
          title: {
            kh: "GPA ≥ 3.20 និងមានគម្រោងស្រាវជ្រាវ",
            en: "GPA ≥ 3.20 and a research project",
          },
        },
        {
          title: {
            kh: "មានបទពិសោធន៍ផ្នែកបច្ចេកវិទ្យា (Coding, Projects)",
            en: "Technology experience (coding, projects)",
          },
        },
      ],
    },
  ],
  deadline: {
    kh: "ផុតកំណត់៖ ១៥ តុលា ២០២៥",
    en: "Deadline: October 15, 2025",
  },
  action: { label: { kh: "ដាក់ពាក្យ", en: "Apply" } },
};

const ITC_INSTITUTIONAL: Bilingual<ScholarshipProgramData, NonCopyKey> = {
  header: {
    eyebrow: {
      kh: "អាហារូបករណ៍ស្ថាប័ន & ដៃគូ",
      en: "Institutional & Partner Grants",
    },
    icon: "Building2",
    tone: "green",
    badge: { kh: "ដៃគូ", en: "Partner" },
    title: {
      kh: "អាហារូបករណ៍ស្ថាប័ន និងដៃគូអន្តរជាតិ",
      en: "Institutional & Partner Grants",
    },
    subtitle: {
      kh: "អាហារូបករណ៍ពីអង្គការអន្តរជាតិ និងដៃគូអភិវឌ្ន៍ រួមមាន UNESCO, JICA, និងមូលនិធិសិស្ ITC។",
      en: "Scholarships from international organisations and development partners, including UNESCO, JICA and the ITC Foundation.",
    },
  },
  groups: [
    {
      icon: "Globe",
      tone: "blue",
      title: { kh: "UNESCO & JICA", en: "UNESCO & JICA" },
      subtitle: { kh: "ដៃគូអន្តរជាតិ", en: "International Partners" },
      items: [
        { kh: "អាហារូបករណ៍សម្រាប់ស្ត្រីក្នុងវិស័យ STEM", en: "Scholarships for women in STEM" },
        { kh: "គម្រោងស្រាវជ្រាវរួម", en: "Joint research programmes" },
        { kh: "ការផ្លាស់ប្តូរនិស្ិតអន្តរជាតិ", en: "International student exchange" },
      ],
      action: { label: { kh: "ដាក់ពាក្យ", en: "Apply" } },
    },
    {
      icon: "Heart",
      tone: "red",
      title: { kh: "មូលនិធិសិស្ដិសិត ITC", en: "ITC Student Welfare Fund" },
      subtitle: { kh: "ជំនួយផ្ទៃក", en: "Internal Support" },
      items: [
        { kh: "ជំនួយហិរញ្ញវត្ថុសម្រាប់និសសិតខ្វះខាត", en: "Financial aid for students in difficulty" },
        { kh: "អាហារូបករណពាក់កណ្តាល (50%)", en: "50% tuition reduction" },
        { kh: "គាំទ្រសកម្មភាពសិក្សាបន្ថែម", en: "Support for extracurricular activities" },
      ],
      action: { label: { kh: "ដាក់ពាក្យ", en: "Apply" } },
    },
  ],
  notice: {
    icon: "Calendar",
    title: { kh: "ចំណាំ៖", en: "Note:" },
    text: {
      kh: "អាហារូបករណ៍ស្ាប័នមានផុតកំណត់ផ្សេងៗគ្នា។ សូមពិនិត្យមើលលម្អិតសម្រាប់កម្មវិីនីមួយៗ។",
      en: "Institutional scholarships have different deadlines. Please check the details for each programme.",
    },
  },
};

const ITC_ALLOCATION: Bilingual<DepartmentAllocationData, NonCopyKey> = {
  header: {
    eyebrow: {
      kh: "ការបែងចែកអាហារូបករណ៍តាមនាយកដ្ឋាន",
      en: "Scholarship Allocation by Department",
    },
    icon: "GraduationCap",
    tone: "slate",
    badge: { kh: "សរុប៖ {total} ទីតាំង", en: "Total: {total} seats" },
    title: {
      kh: "ការបែងចែកអាហារូបករណ៍តាមនាយកដ្ឋាន",
      en: "Scholarship Allocation by Department",
    },
    subtitle: {
      kh: "ចំនួនអាហារូបករណ៍ដែលមានសម្រាប់នាយកដ្ឋាននីមួយក្នុងឆ្នាំសិក្សា ២០២៥-២០២៦",
      en: "Number of scholarships available for each department in the 2025-2026 academic year",
    },
  },
  departments: [
    {
      name: { kh: "វិស្កម្មកុំព្យូទ័រ និងព័ត៌មានវិទ្យា", en: "Computer & Information Engineering" },
      nameEn: "Computer & Information Engineering",
      code: "CIE",
      count: 8,
      tone: "blue",
    },
    {
      name: { kh: "វិស្វកម្មអគ្គិសនី", en: "Electrical Engineering" },
      nameEn: "Electrical Engineering",
      code: "EE",
      count: 6,
      tone: "amber",
    },
    {
      name: { kh: "វិស្វកម្មសំណង់", en: "Civil Engineering" },
      nameEn: "Civil Engineering",
      code: "CE",
      count: 5,
      tone: "orange",
    },
    {
      name: { kh: "វិស្វកម្គីមី", en: "Chemical Engineering" },
      nameEn: "Chemical Engineering",
      code: "ChE",
      count: 4,
      tone: "green",
    },
    {
      name: { kh: "វិស្វកម្មមេកានិច", en: "Mechanical Engineering" },
      nameEn: "Mechanical Engineering",
      code: "ME",
      count: 5,
      tone: "purple",
    },
    {
      name: { kh: "វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា", en: "Science & Technology" },
      nameEn: "Science & Technology",
      code: "ST",
      count: 3,
      tone: "pink",
    },
  ],
  summary: {
    label: { kh: "សរុបអាហារូបករណ៍ទាំងអស់៖", en: "Total scholarships:" },
    unit: { kh: "ទីតាំង", en: "seats" },
    caption: {
      kh: "ចំនួនទីតាំងអាហារូបករណ៍ដែលមាន",
      en: "Total Scholarship Positions Available",
    },
  },
};

const ITC_HOW_TO_APPLY: Bilingual<HowToApplyData, NonCopyKey> = {
  header: {
    icon: "FileText",
    tone: "blue",
    title: { kh: "របៀបដាក់ពាក្យសុំ", en: "How to Apply" },
  },
  steps: [
    {
      number: 1,
      title: { kh: "បំពេញពាក្យសុំអនឡាញ", en: "Complete the online application" },
      subtitle: { kh: "ពាក្យសុំអនឡាញ", en: "Online Application" },
      description: {
        kh: "ចុះឈ្មោះ និងបំពេញទម្រង់ពាក្យសុំនៅលើ ITC Portal",
        en: "Register and complete the application form on the ITC Portal",
      },
    },
    {
      number: 2,
      title: { kh: "ដាក់ឯកសារភជាប់", en: "Upload documents" },
      subtitle: { kh: "ដាក់ឯកសារ", en: "Upload Documents" },
      description: {
        kh: "ផ្ទុកឡើង Transcript, GPA, និងឯកសារផ្សេង",
        en: "Upload your transcript, GPA and other documents",
      },
    },
    {
      number: 3,
      title: { kh: "រង់ចាំការពិនិត្យ", en: "Wait for review" },
      subtitle: { kh: "ការពិនិត្យ", en: "Review Process" },
      description: {
        kh: "គណៈកម្ការនឹងពិនិត្យពាក្យសុំក្នុងរយៈពេល ២-៤ សប្ាហ៍",
        en: "The committee will review the application within 2-4 weeks",
      },
    },
    {
      number: 4,
      title: { kh: "ទទួលលទ្ធល", en: "Get results" },
      subtitle: { kh: "ទទួលលទ្ធល", en: "Get Results" },
      description: {
        kh: "លទ្ធលនឹងត្រូវផ្សាយតាម ITC Portal និង Email",
        en: "Results will be announced on the ITC Portal and by email",
      },
    },
  ],
  download: {
    title: { kh: "ទាញយកឯកសារណែនាំ", en: "Download Guide" },
    caption: {
      kh: "ឯកសារ PDF ពេញលេញអំពីដំណើរការដាក់ពាក្យ និងលក្ខខណ្ឌ",
      en: "A full PDF guide to the application process and the conditions",
    },
    file: "ITC_Scholarship_Guide_2025.pdf",
  },
  contact: {
    title: { kh: "ទំនាក់ទំនងសម្រាប់សំណួរ", en: "Contact for Questions" },
    rows: [
      { icon: "Phone", text: { kh: "+855 (0) 23 880 370", en: "+855 (0) 23 880 370" } },
      { icon: "Mail", text: { kh: "scholarship@itc.edu.kh", en: "scholarship@itc.edu.kh" } },
      { icon: "Clock", text: { kh: "ច័នទ - សុក្រ៖ 8:00 - 17:00", en: "Mon - Fri: 8:00 - 17:00" } },
    ],
  },
  action: {
    label: { kh: "ចាប់ផ្តើមដាក់ពាក្យឥឡូវ", en: "Start Application" },
    tone: "green",
  },
};

/* ------------------------------------------------------------------ *
 * Builders                                                            *
 * ------------------------------------------------------------------ */

/**
 * Left column of `/explore-universities/{university}/scholarships`.
 *
 * Following the rule of the university page, only content that is known to be
 * true is attached: ITC keeps its sample list, every other school renders the
 * empty state with a link to the global board instead of invented awards.
 */
function getScholarshipsCardData(
  university: University,
  lang: Lang
): ListCardSource {
  const site = university.website
    ? university.website.startsWith("http")
      ? university.website
      : `https://${university.website}`
    : undefined;

  const items = university.id === "itc" ? ITC_SCHOLARSHIPS : [];

  return {
    header: {
      title: { kh: "អាហារូបករណ៍", en: "Scholarships" },
      badge:
        items.length > 0
          ? { [lang]: `${items.length} Available` }
          : undefined,
    },
    items,
    empty: EMPTY_SCHOLARSHIPS,
    board: {
      label: { kh: "អាហារូបករណ៍ទាំងអស់", en: "All scholarships" },
      href: "/scholarships",
    },
    website: site,
  };
}

/**
 * Banner of a school without sample content: only figures taken from the
 * entity itself (published scholarships, schools' departments) — no invented
 * totals, coverage rates or deadlines.
 */
function buildHero(
  university: University,
  published: number,
  lang: Lang
): Bilingual<ScholarshipsHeroData> {
  return {
    icon: "Award",
    tone: "blue",
    eyebrow: { kh: "ឱកាសសិក្សាបន្ត", en: "SCHOLARSHIPS" },
    title: { kh: "អាហារូបករណ៍សម្រាប់", en: "Scholarships for" },
    accent: { [lang]: resolveText(university.name, lang) },
    description: {
      kh: "សូមពិនិត្យមើលអាហារូបករណ៍ដែលសាលាបានចុះផ្សាយខាងក្រោម ហើយទាក់ទងជាមួយការិយាល័យសាលាដើម្បីទទួលបានព័ត៌មានលម្អិត។",
      en: "Browse the scholarships this school has published below, or contact the school's office for details.",
    },
    stats: [
      {
        icon: "Award",
        tone: "blue",
        label: { kh: "អាហារូបករណ៍ដែលបានចុះផ្សាយ", en: "Published scholarships" },
        value: { [lang]: `${published}` },
        caption: { kh: "អាហារូបករណ៍ដែលបានចុះផ្សាយ", en: "Published scholarships" },
      },
      {
        icon: "Building2",
        tone: "slate",
        label: { kh: "នាយកដ្ឋានសិក្សា", en: "Departments" },
        value: { [lang]: `${university.departments.length}` },
        caption: { kh: "នាយកដ្ឋានសិក្សា", en: "Departments" },
      },
    ],
  };
}

/**
 * Resolves the board card's copy while leaving its two already-bilingual
 * fields alone.
 *
 * This cannot be left to the one {@link resolveBilingual} call the rest of the
 * page uses. `items` and `empty` hold `NamespacedText`, and the walk reads any
 * `{ kh, en }` object as a `PageCopy` — so it would resolve them a second time,
 * on the client this time, turning each record into a single string and
 * breaking `ScholarshipListCard`. They are taken out of the walked value and
 * put back afterwards rather than marked, because the walk is structural and a
 * marker here would have to be honoured everywhere it recurses.
 */
function resolveListCard(
  list: ListCardSource,
  lang: Lang
): ScholarshipsCardData {
  const { items, empty, ...copy } = list;
  return {
    ...(resolveBilingual(copy, lang) as Omit<ScholarshipsCardData, "items" | "empty">),
    items,
    empty,
  };
}

/**
 * `/explore-universities/{university}/scholarships`.
 *
 * The hero and the published list are real — built from the entity for every
 * school. The three programme cards, the seat allocation and the "how to
 * apply" rail are the ITC catalogue and stay `undefined`/empty for every other
 * school instead of inventing deadlines, contacts and quotas, the same rule
 * the admissions tab applies to its sample sections.
 *
 * Copy is authored per language and resolved here, once, so the eight card
 * components keep receiving plain strings — the alternative, threading `lang`
 * through each of them, would have put the language switch in eight more files
 * for no gain.
 */
export function getScholarshipsPageData(
  university: University,
  lang: Lang
): ScholarshipsPageData {
  const list = getScholarshipsCardData(university, lang);

  const page: PageWithoutList =
    university.id !== "itc"
      ? { hero: buildHero(university, list.items.length, lang), programs: [] }
      : {
          hero: ITC_HERO,
          programs: [ITC_GOVERNMENT, ITC_TECH, ITC_INSTITUTIONAL],
          allocation: ITC_ALLOCATION,
          howToApply: ITC_HOW_TO_APPLY,
        };

  return {
    ...(resolveBilingual(page, lang) as Omit<ScholarshipsPageData, "list">),
    list: resolveListCard(list, lang),
  };
}
