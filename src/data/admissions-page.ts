import type { IconName } from "@/lib/icons";
import type { NamespacedText, University } from "@/data/universities";

/* ------------------------------------------------------------------ *
 * Types                                                               *
 * ------------------------------------------------------------------ */

/** Requirements of one program, straight from `Department.requirements`. */
export interface RequirementGroup {
  /** The program the lines belong to — what the school calls the unit. */
  unit: NamespacedText;
  lines: NamespacedText[];
}

/** One numbered step of the application flow. */
export interface ApplyStep {
  index: string;
  icon: IconName;
  title: NamespacedText;
  description: NamespacedText;
}

/** One date of the intake calendar. */
export interface KeyDate {
  icon: IconName;
  label: NamespacedText;
  value: string;
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

export interface ApplyStepsCardData {
  header: { title: string; subtitle: string };
  /** Absent when the school has not published its steps yet. */
  items?: ApplyStep[];
  /** Neutral fallback shown in place of the steps. */
  empty: NamespacedText;
  /** School website, offered by the fallback as the way forward. */
  website?: string;
}

export interface KeyDatesCardData {
  header: { title: string; subtitle: string };
  items: KeyDate[];
}

export interface AdmissionsPageData {
  requirements: RequirementsCardData;
  steps: ApplyStepsCardData;
  /** Only rendered when the school publishes a calendar. */
  keyDates?: KeyDatesCardData;
}

/* ------------------------------------------------------------------ *
 * Sample content — only attached where it is known to be true         *
 * ------------------------------------------------------------------ */

const ITC_STEPS: ApplyStep[] = [
  {
    index: "01",
    icon: "Send",
    title: { kh: "បំពេញពាក្យអនឡាញ", en: "Fill in the online form" },
    description: {
      kh: "បំពេញពាក្យតាមគេហទំព័រ ITC ដោយប្រើពេលប្រហែល ៥ នាទី",
      en: "Apply on the ITC website in about 5 minutes.",
    },
  },
  {
    index: "02",
    icon: "FileText",
    title: { kh: "ប្រគល់ឯកសារ", en: "Hand in your documents" },
    description: {
      kh: "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ សំបុត្រកំណើត និងរូបថត ៤×៦",
      en: "High school diploma, birth certificate and 4×6 photos.",
    },
  },
  {
    index: "03",
    icon: "Users",
    title: { kh: "ការសម្ភាសន៍ និងប្រឡងចូល", en: "Interview & entrance test" },
    description: {
      kh: "វិញ្ញាសាគណិតវិទ្យា រូបវិទ្យា និងហេតុផលតាមជំនាញដែលបានជ្រើសរើស",
      en: "Maths, physics and logic test for the chosen program.",
    },
  },
  {
    index: "04",
    icon: "GraduationCap",
    title: { kh: "ចុះឈ្មោះ និងបង់ថ្លៃ", en: "Enrol and pay" },
    description: {
      kh: "បង់ថ្លៃឆមាសទី១ ទទួលលេខចុះឈ្មោះ និងចាប់ផ្តើមសិក្សា",
      en: "Pay the first semester, get your student number and start.",
    },
  },
];

const ITC_KEY_DATES: KeyDate[] = [
  {
    icon: "CalendarDays",
    label: {
      kh: "កាលបរិច្ឆេទបញ្ចប់ពាក្យ",
      en: "Application deadline",
    },
    value: "ថ្ងៃទី ១៥ ខែ កុម្ភៈ ឆ្នាំ ២០២៥",
  },
  {
    icon: "Clock",
    label: { kh: "ការប្រឡងចូល", en: "Entrance test" },
    value: "ថ្ងៃទី ២៨ ខែ កុម្ភៈ ឆ្នាំ ២០២៥",
  },
  {
    icon: "GraduationCap",
    label: { kh: "ចាប់ផ្តើមឆមាស", en: "Semester starts" },
    value: "ថ្ងៃទី ០១ ខែ តុលា ឆ្នាំ ២០២៥",
  },
];

const EMPTY_STEPS: NamespacedText = {
  kh: "សាលានេះមិនទាន់បានបង្ហោះជំហាន និងកាលបរិច្ឆេទចុះឈ្មោះនៅឡើយ។ សូមពិនិត្យមើលគេហទំព័រ ឬទំនាក់ទំនងផ្ទាល់។",
  en: "This school has not published its application steps or dates yet — check its website or contact it directly.",
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
 * Left column of `/explore-universities/{university}/admissions`.
 *
 * The requirements are real: they are whatever the school seeded on each
 * `Department`. The steps and the calendar are the ITC sample, so every other
 * school gets the neutral "not published yet" fallback instead of invented
 * dates — the same rule the university page applies to its news and brochure.
 */
export function getAdmissionsPageData(
  university: University
): AdmissionsPageData {
  const site = university.website
    ? university.website.startsWith("http")
      ? university.website
      : `https://${university.website}`
    : undefined;

  /* Every program is listed: a student should see that a program's
     requirements are unpublished, not wonder why it is missing. */
  const groups = university.departments.map((dept) => ({
    unit: dept.name,
    lines: dept.requirements,
  }));

  const total = groups.reduce((sum, group) => sum + group.lines.length, 0);
  const isItc = university.id === "itc";

  return {
    requirements: {
      header: {
        title: "តម្រូវការចុះឈ្មោះ",
        subtitle: "(Admission Requirements)",
        badge:
          total > 0
            ? `${total} ${total === 1 ? "Requirement" : "Requirements"}`
            : undefined,
      },
      groups,
      empty: EMPTY_REQUIREMENTS,
      pending: PENDING_REQUIREMENTS,
    },

    steps: {
      header: {
        title: "ជំហានដាក់ពាក្យ",
        subtitle: "(How to Apply)",
      },
      items: isItc ? ITC_STEPS : undefined,
      empty: EMPTY_STEPS,
      website: site,
    },

    keyDates: isItc
      ? {
          header: {
            title: "កាលបរិច្ឆេទសំខាន់ៗ",
            subtitle: "(Key Dates)",
          },
          items: ITC_KEY_DATES,
        }
      : undefined,
  };
}
