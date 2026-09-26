/**
 * University detail page (`/explore-universities/[university]`).
 *
 * UI content only — one hardcoded sample (ITC) used as a placeholder while
 * the university API is unbaked. It is *not* the university list: that
 * entity data lives in `./universities`.
 *
 * Text helpers live in `./text`, entity data in `./universities`.
 */
import type { IconName } from "@/lib/icons";

/* ------------------------------------------------------------------ *
 * Hero header (`UniversityIdCard`)                                    *
 * ------------------------------------------------------------------ */

export interface UniversityHeroBadge {
  label: string;
  /** Badge variant of the shadcn `Badge`. */
  variant?: "default" | "outline";
  icon?: IconName;
  className?: string;
}

export interface UniversityHeroAction {
  label?: string;
  icon: IconName;
  href?: string;
  className?: string;
}

export interface UniversityHeroStat {
  icon: IconName;
  label: string;
  value: string;
}

export interface UniversityHeroData {
  bannerBadges: UniversityHeroBadge[];
  /** Share / bookmark buttons sitting on the banner. */
  bannerActions: UniversityHeroAction[];
  logo: { src: string; alt: string };
  name: string;
  nameBadge: string;
  subtitle: string;
  badges: UniversityHeroBadge[];
  primaryAction: UniversityHeroAction;
  link: UniversityHeroAction;
  stats: UniversityHeroStat[];
}

/* ------------------------------------------------------------------ *
 * Aside / content cards                                               *
 * ------------------------------------------------------------------ */

export interface FacultyCourseData {
  titleKh: string;
  titleEn: string;
  badge?: string;
  degree: string;
  years: string;
  price: string;
  seats?: string;
  cta?: string;
  /** `University.departments[].id` this course links to. */
  departmentId: string;
}

export interface FacultyCardData {
  header: { title: string; subtitle: string; badge: string };
  courses: FacultyCourseData[];
}

export interface HotNewsFact {
  icon: IconName;
  label: string;
}

export interface HotNewsCardData {
  header: { title: string; badge: string };
  highlight: { title: string; description: string; action: string };
  exam: { label: string; registrants: string; date: string; place: string };
  facts: HotNewsFact[];
  employment: { icon: IconName; label: string; value: string; width: string };
  footer: { name: string; campus: string };
}

export interface AdmissionsAction {
  icon: IconName;
  label: string;
  /** Surface of the button, the shared layout stays in the component. */
  className: string;
}

export interface AdmissionsCardData {
  header: string;
  advisor: {
    avatar: string;
    name: string;
    role: string;
    status: string;
    isOnline: boolean;
  };
  actions: AdmissionsAction[];
}

export interface CampusMapCardData {
  header: { title: string; subtitle: string; campus: string };
  map: { src: string; alt: string; fallback: string; place: string };
  directions: string;
  address: string;
}

export interface BrochureCardData {
  icon: IconName;
  title: string;
  subtitle: string;
  description: string;
  action: { icon: IconName; label: string };
}

export interface UniversityMenuTab {
  value: string;
  icon: IconName;
  label: string;
  badge?: number;
}

/* ------------------------------------------------------------------ *
 * Page bundle                                                         *
 * ------------------------------------------------------------------ */

export interface UniversityPageData {
  hero: UniversityHeroData;
  faculty: FacultyCardData;
  hotNews: HotNewsCardData;
  admissions: AdmissionsCardData;
  campusMap: CampusMapCardData;
  brochure: BrochureCardData;
  menu: UniversityMenuTab[];
}

export const universityPageData: UniversityPageData = {
  hero: {
    bannerBadges: [
      {
        label:
          "MoEYS Verified (ទទួលស្គាល់ដោយក្រសួងអប់រំ យុវជន និងកីឡា)",
        icon: "CheckCircle2",
        className: "bg-teal-700/80 hover:bg-teal-700 text-white border-0",
      },
      {
        label: "Est. 1964 • គ្រឹះស្ថានសាធារណៈ",
        className: "bg-slate-700/60 hover:bg-slate-700 text-white border-0",
      },
    ],
    bannerActions: [
      {
        icon: "Share2",
        className: "rounded-full bg-white/10 hover:bg-white/20 text-white",
      },
      {
        icon: "Bookmark",
        className: "rounded-full bg-white/10 hover:bg-white/20 text-white",
      },
    ],
    logo: { src: "/images/ITC-logo.png", alt: "ITC Logo" },
    name: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
    nameBadge: "ITC",
    subtitle: "Institute of Technology of Cambodia",
    badges: [
      {
        label: "ប្រភេទគ្រឹះស្ថាន: (Public University)",
        variant: "outline",
        icon: "GraduationCap",
        className: "gap-1.5",
      },
      {
        label: "STEM Excellence Leader",
        icon: "Award",
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1.5",
      },
      {
        label: "AUN-QA Accredited",
        variant: "outline",
        icon: "Award",
        className: "gap-1.5 text-slate-600",
      },
    ],
    primaryAction: {
      label: "Chat Telegram (ជជែកអ៉ីវ)",
      icon: "MessageCircle",
      className: "bg-sky-600 hover:bg-sky-700 text-white gap-2 rounded-lg px-5",
    },
    link: {
      label: "itc.edu.kh",
      icon: "Globe",
      href: "https://itc.edu.kh",
      className: "flex items-center gap-1.5 text-slate-600 hover:text-sky-600 text-sm",
    },
    stats: [
      { icon: "MapPin", label: "ទីតាំង (Campus)", value: "Russian Blvd, Toul Kor..." },
      { icon: "Users", label: "ចំនួនសិស្សសរុប", value: "12,000+ Students" },
      { icon: "Wallet", label: "ថ្លៃសិក្សាមធ្យម", value: "$600 - $850 / ឆ្នាំ (Year)" },
      { icon: "Phone", label: "ទូរស័ព្ទទំនាក់ទំនង", value: "(+855) 23 880 370" },
    ],
  },

  faculty: {
    header: {
      title: "មហាវិទ្យាល័យវិស្វកម្មអគ្គិសនី និងជាមពល",
      subtitle: "Faculty of Electrical and Energy Engineering (FEE)",
      badge: "3 Majors Offered",
    },
    courses: [
      {
        titleKh: "វិស្វកម្មទូរគមនាគមន៍ និងបណ្តាញ",
        titleEn: "Telecommunication & Network Engineering (GTR)",
        badge: "ពេញនិយម",
        degree: "បរិញ្ញាបត្រវិស្វកម្ម (Diplôme d'Ingénieur)",
        years: "៥ ឆ្នាំ",
        price: "$650",
        seats: "មានអាហារូបករណ៍",
        departmentId: "gtr",
      },
      {
        titleKh: "វិស្វកម្មអគ្គិសនី",
        titleEn: "Electrical Power Engineering (GEE)",
        degree: "បរិញ្ញាបត្រវិស្វកម្ម (Engineering)",
        years: "៥ ឆ្នាំ",
        price: "$650",
        seats: "ចំណុះ 120 នាក់",
        departmentId: "gee",
      },
      {
        titleKh: "ស្វ័យប្រវត្តិកម្ម និងមនុស្សយន្ត",
        titleEn: "Automation & Robotics Engineering (GAR)",
        badge: "ថ្មីពិសេស",
        degree: "បរិញ្ញាបត្រវិស្វកម្ម (Engineering Degree)",
        years: "៥ ឆ្នាំ",
        price: "$750",
        seats: "Smart Lab ITC",
        departmentId: "gar",
      },
    ],
  },

  hotNews: {
    header: { title: "ព័ត៌មានសំខាន់បំផុតចំនួន២", badge: "ITC-INFO" },
    highlight: {
      title: "លទ្ធផលខាងចូលរៀន (BacII)",
      description:
        "សូម្បីតែកូនសិស្សថ្នាក់ទី១២ ដែលប្រឡងធ្លាក់ ឬ បោះបង់ការប្រឡង BacII ក៏អាចចុះឈ្មោះចូលរៀននៅវិទ្យាស្ថានបានដែរ។",
      action: "ចុះឈ្មោះចូលរៀន",
    },
    exam: {
      label: "ការប្រឡងចូលរៀន",
      registrants: "ចុះឈ្មោះ 42 នាក់",
      date: "ថ្ងៃទី ១៥ ខែ តុលា ២០២៥",
      place: "October 15, 2025 • Phnom Penh ITC Center",
    },
    facts: [
      {
        icon: "BookOpen",
        label: "ភាសាបរទេស: ខ្មែរ, អង់គ្លេស, បារាំង (Khmer, FR, EN)",
      },
      {
        icon: "Users",
        label: "និស្សិតសរុប: 12,500+ Enrolled (35% Female)",
      },
    ],
    employment: {
      icon: "BarChart3",
      label: "អត្រាជាប់ការងារ ៦ ខែ",
      value: "94.8%",
      width: "94.8%",
    },
    footer: {
      name: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
      campus: "Toul",
    },
  },

  admissions: {
    header: "ទីប្រឹក្សាការសិក្សា (Admissions)",
    advisor: {
      avatar: "/api/placeholder/100/100",
      name: "លោកគ្រូ វណ្ណា (Vanna...)",
      role: "Head of Student Admissions",
      status: "Online ឥឡូវនេះ",
      isOnline: true,
    },
    actions: [
      {
        icon: "MessageCircle",
        label: "ផ្ញើសារសួរ (Telegram Q&A)",
        className: "bg-blue-50 hover:bg-blue-100 text-blue-700",
      },
      {
        icon: "Phone",
        label: "Hotline: 023 880 370",
        className: "bg-slate-50 hover:bg-slate-100 text-slate-600",
      },
    ],
  },

  campusMap: {
    header: { title: "ទីតាំង និងផែនទី", subtitle: "(Campus Map)", campus: "Toul Kork" },
    map: {
      src: "https://maps.googleapis.com/maps/api/staticmap?center=Phnom+Penh,Cambodia&zoom=14&size=600x300&maptype=roadmap&key=YOUR_API_KEY_OR_PLACEHOLDER",
      alt: "Campus Map",
      fallback: "Map Preview",
      place: "Russian...",
    },
    directions: "ទិសដៅ (Directions)",
    address:
      "ស្ថិតនៅតែមួយខណ្ឌជាមួយវិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (Techno Flyover), រាជធានីភ្នំពេញ។",
  },

  brochure: {
    icon: "FileText",
    title: "ទាញយកគម្រោងបោះពុម្ពផ្សាយ",
    subtitle: "(Brochure)",
    description:
      "សេចក្តីលម្អិតអំពីវគ្គសិក្សា និងកាលវិភាគសិក្សា ២០២៥-២០២៦ (PDF, 8.4 MB)",
    action: { icon: "Download", label: "ទាញយកគម្រោងបោះពុម្ព (PDF)" },
  },

  menu: [
    {
      value: "majors",
      icon: "BookOpen",
      label: "ជំនាញសិក្សា & ថ្លៃសិក្សា (Majors & Fees)",
      badge: 28,
    },
    {
      value: "admissions",
      icon: "GraduationCap",
      label: "ការចុះឈ្មោះ & លក្ខខណ្ឌ (Admissions)",
    },
    {
      value: "scholarships",
      icon: "CalendarDays",
      label: "អាហារូបករណ៍ (Scholarships)",
    },
  ],
};
