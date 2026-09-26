import { departmentPageData } from "@/data/department-page";
import type { ScholarshipItem } from "@/data/department-page";
import type { IconName } from "@/lib/icons";
import type { Tone } from "@/lib/tones";
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
  header: { title: string; subtitle: string; badge?: string };
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

const ITC_HERO: ScholarshipsHeroData = {
  icon: "GraduationCap",
  tone: "blue",
  eyebrow: "ឱកាសសិក្សាបន្ត (SCHOLARSHIPS 2025)",
  title: "ឱកាសកាត់បន្យកម្រិតសិក្សាសម្រាប់",
  accent: "សិស្ឆ្នើមរបស់ ITC",
  description:
    "ITC ផ្តល់ឱកាសអាហារូបករណ៍ដ៏ច្រើនសម្រាប់និស្សិតដែលមានសមត្ថភាពខ្ពស់ ក្នុងការសិក្សាបន្តថ្នាក់បរិញ្ញាបត្រ និងអនុបណ្ឌិត។ យើងជឿជាក់ថា ការវិនិយោគលើការអប់រំគឺជាគន្លឹះសម្រាប់អនាគត។",
  stats: [
    {
      icon: "GraduationCap",
      tone: "blue",
      label: "អាហារូបករណ",
      value: "២០+",
      caption: "Scholarships Available",
    },
    {
      icon: "DollarSign",
      tone: "green",
      label: "តម្លៃសរុប",
      value: "$350,000+",
      caption: "Total Scholarship Value",
    },
    {
      icon: "Percent",
      tone: "amber",
      label: "ការគ្របដណ្តប់",
      value: "80% & 95%",
      caption: "Coverage Rate",
    },
  ],
};

const ITC_GOVERNMENT: ScholarshipProgramData = {
  header: {
    eyebrow:
      "អាហារូបករណ៍រដឋាភិបាល & អាហារូបករណ៍សំខាន់ (Government & Flagship Scholarships)",
    icon: "Flag",
    tone: "blue",
    badge: "រដ្ឋាភិបាល",
    title: "អាហារូបករណរដ្ឋាភិបាលកម្ពុជា (MEYS) — Cambodia Government State Quota",
    subtitle:
      "អាហារូបករណ៍ពេញលេញសម្រាប់និស្ិតឆ្នើមរបស់ ITC ដើម្បីសិក្សានៅបរទេស (រុស្៊ី, ចិន, ជប៉ុន, កូរ៉េ, បារាំង)។",
  },
  stats: [
    {
      icon: "Star",
      tone: "amber",
      label: "ពិន្ទុ GPA ឆ្នាំ",
      value: "≥ 3.50",
      caption: "Minimum GPA Requirement",
    },
    {
      icon: "Award",
      tone: "purple",
      label: "ពិន្ទុប្ឡងជាតិ",
      value: "≥ 85%",
      caption: "National Exam Score",
    },
    {
      icon: "Globe",
      tone: "blue",
      label: "ចំណាត់ថ្នាក់ ITC",
      value: "Top 10%",
      caption: "ITC Class Ranking",
    },
  ],
  panels: [
    {
      tone: "blue",
      title: "អត្ថបរយោជន៍ (Benefits):",
      marker: "check",
      layout: "grid",
      items: [
        { title: "រយៈពេលពេញ ឆ្នាំ", caption: "Full 5 Years Coverage" },
        { title: "ប្រាក់ខែប្រចាំខែ (Stipend)", caption: "Monthly Allowance" },
        { title: "ការធ្វើដំណើរអន្តរជាតិ", caption: "International Trip" },
      ],
    },
    {
      tone: "slate",
      accent: "blue",
      marker: "dot",
      title: "លក្ខខណ្ឌសិទ្ធទទួលបាន (Eligibility Criteria):",
      items: [
        {
          title:
            "និស្ិតដែលកំពុងសិកសានៅ ITC ក្នុងឆ្នាំទី ៣ ឬទី ៤ នៃកម្មវិីបរិញ្ញាបត្រ",
        },
        { title: "មានពិន្ទុ GPA ≥ 3.50 និងពិន្ទុប្ឡងជាតិ ≥ 85%" },
        { title: "មានសមត្ភាពភាសា (អង់គ្លេស ឬភាសាប្រទេសគោលដៅ)" },
        { title: "មានសកមមភាពស្ម័គ្រចិតត និងសកម្មភាពសង្គម" },
      ],
    },
  ],
  deadline: "ផុតកំណត់: ៣០ កញ្ញា ២០២៥",
  action: { label: "ដាក់ពាក្យ (Apply Now)" },
};

const ITC_TECH: ScholarshipProgramData = {
  header: {
    eyebrow: "អាហារូបករណ៍ឧស្សាហកម្ម & បច្ចេកវិទ្យា (Industry & Tech Scholarships)",
    icon: "Cpu",
    tone: "purple",
    badge: "MPTC",
    title: "អាហារូបករណ៍ទេពកោសល្យឌីជីថល (Tech Digital Talent — MPTC)",
    subtitle:
      "អាហារូបករណ៍ពីក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍ (MPTC) សមរាប់និស្សិតផ្នែកបច្ចេកវិទ្យា និងទូរគមនាគមន៍។",
  },
  stats: [
    {
      tone: "purple",
      label: "អត្ប្រយោជន",
      value: "100% Fee + $700/m",
      caption: "Full Tuition + Monthly Stipend",
    },
    {
      tone: "purple",
      label: "ផ្ែកសិក្សា",
      chips: [
        { label: "GSC", tone: "blue" },
        { label: "AI", tone: "green" },
        { label: "Telecom", tone: "purple" },
      ],
      caption: "Computer Science & Cybersecurity",
    },
    {
      tone: "purple",
      label: "រយៈពេល",
      value: "2-4 ឆ្នាំ",
      caption: "Duration",
    },
  ],
  panels: [
    {
      tone: "purple",
      marker: "check",
      title: "លក្ខខណឌសិទ្ធិទទួលបាន (Eligibility):",
      items: [
        { title: "និស្សិត ITC ផ្នែក Computer Science, AI, ឬ Telecom" },
        { title: "GPA ≥ 3.20 និងមានគម្រោងស្រាវជ្រាវ" },
        { title: "មានបទពិសោធន៍ផ្នែកបច្ចេកវិទ្យា (Coding, Projects)" },
      ],
    },
  ],
  deadline: "ផុតកំណត់: ១៥ តុលា ២០២៥",
  action: { label: "ដាក់ពាក្យ (Apply)" },
};

const ITC_INSTITUTIONAL: ScholarshipProgramData = {
  header: {
    eyebrow: "អាហារូបករណ៍ស្ថាប័ន & ដៃគូ (Institutional & Partner Grants)",
    icon: "Building2",
    tone: "green",
    badge: "Partner",
    title: "អាហារូបករណ៍ស្ថាប័ន និងដៃគូអន្តរជាតិ (Institutional & Partner Grants)",
    subtitle:
      "អាហារូបករណ៍ពីអង្គការអន្តរជាតិ និងដៃគូអភិវឌ្ន៍ រួមមាន UNESCO, JICA, និងមូលនិធិសិស្ ITC។",
  },
  groups: [
    {
      icon: "Globe",
      tone: "blue",
      title: "UNESCO & JICA",
      subtitle: "International Partners",
      items: [
        "អាហារូបករណ៍សម្ាប់ស្ត្រីក្នុងវិស័យ STEM",
        "គម្រោងស្រាវជ្រាវរួម",
        "ការផ្លាស់ប្តូរនិស្ិតអន្តរជាតិ",
      ],
      action: { label: "ដាក់ពាក្យ (Apply)" },
    },
    {
      icon: "Heart",
      tone: "red",
      title: "ITC Student Welfare Fund",
      subtitle: "Internal Support",
      items: [
        "ជំនួយហិរញ្ញវត្ថុសម្រាប់និសសិតខ្វះខាត",
        "អាហារូបករណពាក់កណ្តាល (50%)",
        "គាំទ្រសកម្មភាពសិក្សាបន្ថែម",
      ],
      action: { label: "ដាក់ពាក្យ (Apply)" },
    },
  ],
  notice: {
    icon: "Calendar",
    title: "ចំណាំ:",
    text: "អាហារូបករណ៍ស្ាប័នមានផុតកំណត់ផ្សេងៗគ្នា។ សូមពិនិត្យមើលលម្អិតសម្រាប់កម្មវិីនីមួយៗ។",
  },
};

const ITC_ALLOCATION: DepartmentAllocationData = {
  header: {
    eyebrow:
      "ការបែងចែកអាហារូបករណតាមនាយកដ្ឋាន (Scholarship Allocation by Department)",
    icon: "GraduationCap",
    tone: "slate",
    badge: "សរុប: {total} ទីតាំង",
    title: "ការបែងចែកអាហារូបករណ៍តាមនាយកដ្ឋាន (Scholarship Allocation by Department)",
    subtitle:
      "ចំនួនអាហារូបករណ៍ដែលមានសម្រាប់នាយកដ្ឋាននីមួយក្នុងឆ្នាំសិក្សា ២០២៥-២០២៦",
  },
  departments: [
    {
      name: "វិស្កម្មកុំព្យូទ័រ និងព័ត៌មានវិទ្ា",
      nameEn: "Computer & Information Engineering",
      code: "CIE",
      count: 8,
      tone: "blue",
    },
    {
      name: "វិស្វកម្មអគ្គិសនី",
      nameEn: "Electrical Engineering",
      code: "EE",
      count: 6,
      tone: "amber",
    },
    {
      name: "វិស្វកម្មសំណង់",
      nameEn: "Civil Engineering",
      code: "CE",
      count: 5,
      tone: "orange",
    },
    {
      name: "វិស្វកម្គីមី",
      nameEn: "Chemical Engineering",
      code: "ChE",
      count: 4,
      tone: "green",
    },
    {
      name: "វិស្វកមមមេកានិច",
      nameEn: "Mechanical Engineering",
      code: "ME",
      count: 5,
      tone: "purple",
    },
    {
      name: "វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា",
      nameEn: "Science & Technology",
      code: "ST",
      count: 3,
      tone: "pink",
    },
  ],
  summary: {
    label: "សរុបអាហារូបករណ៍ទាំងអស់:",
    unit: "ទីតាំង",
    caption: "Total Scholarship Positions Available",
  },
};

const ITC_HOW_TO_APPLY: HowToApplyData = {
  header: {
    icon: "FileText",
    tone: "blue",
    title: "របៀបដាក់ពាក្យសុំ (How to Apply)",
  },
  steps: [
    {
      number: 1,
      title: "បំពេញពាក្យសុំអនឡាញ",
      subtitle: "Online Application",
      description: "ចុះឈ្មោះ និងបំពេញទម្រង់ពាក្យសុំនៅលើ ITC Portal",
    },
    {
      number: 2,
      title: "ដាក់ឯកសារភជាប់",
      subtitle: "Upload Documents",
      description: "ផ្ទុកឡើង Transcript, GPA, និងឯកសារផ្សេង",
    },
    {
      number: 3,
      title: "រង់ចាំការពិនិត្",
      subtitle: "Review Process",
      description:
        "គណៈកម្ការនឹងពិនិត្យពាក្យសុំក្នុងរយៈពេល ២-៤ សប្ាហ៍",
    },
    {
      number: 4,
      title: "ទទួលលទ្ធល",
      subtitle: "Get Results",
      description: "លទ្ធលនឹងត្រូវផ្សាយតាម ITC Portal និង Email",
    },
  ],
  download: {
    title: "ទាញយកឯកសារណែនាំ (Download Guide)",
    caption:
      "ឯកសារ PDF ពេញលេញអំពីដំណើរការដាក់ពាក្យ និងលក្ខខណ្ឌ",
    file: "ITC_Scholarship_Guide_2025.pdf",
  },
  contact: {
    title: "ទំនាក់ទំនងសម្រាប់សំណួរ (Contact for Questions)",
    rows: [
      { icon: "Phone", text: "+855 (0) 23 880 370" },
      { icon: "Mail", text: "scholarship@itc.edu.kh" },
      { icon: "Clock", text: "ច័នទ - សុក្រ: 8:00 - 17:00" },
    ],
  },
  action: {
    label: "ចាប់ផ្តើមដាក់ពាក្យឥឡូវ (Start Application)",
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
  university: University
): ScholarshipsCardData {
  const site = university.website
    ? university.website.startsWith("http")
      ? university.website
      : `https://${university.website}`
    : undefined;

  const items = university.id === "itc" ? ITC_SCHOLARSHIPS : [];

  return {
    header: {
      title: "អាហារូបករណ៍",
      subtitle: "(Scholarships)",
      badge: items.length > 0 ? `${items.length} Available` : undefined,
    },
    items,
    empty: EMPTY_SCHOLARSHIPS,
    board: {
      label: "អាហារូបករណ៍ទាំងអស់ (All scholarships)",
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
  published: number
): ScholarshipsHeroData {
  return {
    icon: "Award",
    tone: "blue",
    eyebrow: "ឱកាសសិក្សាបន្ត (SCHOLARSHIPS)",
    title: "អាហារូបករណ៍សម្រាប់",
    accent: university.name.kh,
    description:
      "សូមពិនិត្យមើលអាហារូបករណ៍ដែលសាលាបានចុះផ្សាយខាងក្រោម ហើយទាក់ទងជាមួយការិយាល័យសាលាដើម្បីទទួលបានព័ត៌មានលម្អិត។",
    stats: [
      {
        icon: "Award",
        tone: "blue",
        label: "អាហារូបករណ៍ដែលបានចុះផ្សាយ",
        value: `${published}`,
        caption: "Published scholarships",
      },
      {
        icon: "Building2",
        tone: "slate",
        label: "នាយកដ្ឋានសិក្សា",
        value: `${university.departments.length}`,
        caption: "Departments",
      },
    ],
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
 */
export function getScholarshipsPageData(
  university: University
): ScholarshipsPageData {
  const list = getScholarshipsCardData(university);

  if (university.id !== "itc") {
    return {
      hero: buildHero(university, list.items.length),
      list,
      programs: [],
    };
  }

  return {
    hero: ITC_HERO,
    list,
    programs: [ITC_GOVERNMENT, ITC_TECH, ITC_INSTITUTIONAL],
    allocation: ITC_ALLOCATION,
    howToApply: ITC_HOW_TO_APPLY,
  };
}
