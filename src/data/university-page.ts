/**
 * University detail page (`/explore-universities/[university]`).
 *
 * The page copy is *built* from the `University` entity of `./universities`
 * (see {@link getUniversityPageData}), so every school renders its own hero,
 * majors list, address and website instead of one hardcoded sample.
 *
 * Cards that need data the entity does not carry yet — the news widget, the
 * advisor profile and the brochure — stay sample content and are only
 * attached to the record they were written for (ITC).
 *
 * Text helpers live in `./text`, entity data in `./universities`.
 */
import type { IconName } from "@/lib/icons";
import type { DepartmentKind, University } from "./universities";

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
    logo: { src?: string; alt: string };
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
    /** Field of study the entry belongs to (the explore filter facet). */
    badge?: string;
    /**
     * What the entry is at its own school — "មហាវិទ្យាល័យ (Faculty)",
     * "ដេប៉ាតឺម៉ង់ (Department)", "ឆ្នាំសិស្សបឋម (Foundation Year)". Rendered as a
     * tag so readers never have to parse the official title to know.
     */
    typeLabel: string;
    /** Amber treatment for entries that are not a degree (foundation year). */
    typeWarn?: boolean;
    /** One line explaining an unusual entry, e.g. what foundation year is. */
    note?: string;
    /** Only filled for departments that have sample program details. */
    degree?: string;
    years?: string;
    price?: string;
    seats?: string;
    cta?: string;
    /** `University.departments[].id` this course links to. */
    departmentId: string;
}

/** Entries sharing a parent unit, rendered under one section header. */
export interface FacultyGroup {
    /** `Department.faculty` of the group — absent when the school is flat. */
    title?: string;
    courses: FacultyCourseData[];
}

export interface FacultyCardData {
    header: { title: string; subtitle: string; badge: string };
    /** One group per parent unit; a single untitled group when flat. */
    groups: FacultyGroup[];
}

export interface AboutCardData {
    title: string;
    subtitle: string;
    description: string;
    facts: { icon: IconName; label: string }[];
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
    /** Opens the target in a new tab when set. */
    href?: string;
}

export interface AdmissionsCardData {
    header: string;
    /** Omitted when the school publishes no advisor yet. */
    advisor?: {
        name: string;
        role: string;
        status: string;
        isOnline: boolean;
    };
    actions: AdmissionsAction[];
}

export interface CampusMapCardData {
    header: { title: string; subtitle: string; campus: string };
    map: { iframeUrl?: string; alt: string; fallback: string; place: string };
    directions: string;
    /** Google Maps query behind the directions button. */
    directionsHref?: string;
    address: string;
}

export interface BrochureCardData {
    icon: IconName;
    title: string;
    subtitle: string;
    description: string;
    action: { icon: IconName; label: string; href?: string };
}

export interface UniversityMenuTab {
    /** Absolute route of the tab, active state is matched against it. */
    href: string;
    icon: IconName;
    label: string;
    badge?: number;
}

/* ------------------------------------------------------------------ *
 * Page bundle                                                         *
 * ------------------------------------------------------------------ */

export interface UniversityPageData {
    hero: UniversityHeroData;
    /** Filter pills above the majors list. */
    filters: string[];
    faculty: FacultyCardData;
    about: AboutCardData;
    /** Sample news, written for ITC only. */
    hotNews?: HotNewsCardData;
    admissions: AdmissionsCardData;
    campusMap: CampusMapCardData;
    /** Sample brochure, written for ITC only. */
    brochure?: BrochureCardData;
    menu: UniversityMenuTab[];
}

/* ------------------------------------------------------------------ *
 * Sample content — only attached where it is known to be true         *
 * ------------------------------------------------------------------ */

/**
 * Degree, length and tuition of the departments that had them in the old
 * hardcoded sample. Keyed `universityId/departmentId`; every other
 * department renders without those fields (they are optional in
 * {@link FacultyCourseData}).
 */
const PROGRAM_DETAILS: Record<string, Pick<FacultyCourseData, "degree" | "years" | "price" | "seats">> = {
    "itc/gic": {
        degree: "បរិញ្ញាបត្រវិស្វកម្ម (Diplôme d'Ingénieur)",
        years: "៥ ឆ្នាំ",
    },
    "itc/gtr": {
        degree: "បរិញ្ញាបត្រវិស្វកម្ម (Diplôme d'Ingénieur)",
        years: "៥ ឆ្នាំ",
        price: "$650",
        seats: "មានអាហារូបករណ៍",
    },
    "itc/gee": {
        degree: "បរិញ្ញាបត្រវិស្វកម្ម (Engineering)",
        years: "៥ ឆ្នាំ",
        price: "$650",
        seats: "ចំណុះ 120 នាក់",
    },
    "itc/gar": {
        degree: "បរិញ្ញាបត្រវិស្វកម្ម (Engineering Degree)",
        years: "៥ ឆ្នាំ",
        price: "$750",
        seats: "Smart Lab ITC",
    },
};

/** Admissions news of the ITC sample. */
const ITC_HOT_NEWS: HotNewsCardData = {
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
};

/** Advisor desk of the ITC sample. */
const ITC_ADMISSIONS: AdmissionsCardData = {
    header: "ទីប្រឹក្សាការសិក្សា (Admissions)",
    advisor: {
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
};

/** Brochure of the ITC sample. */
const ITC_BROCHURE: BrochureCardData = {
    icon: "FileText",
    title: "ទាញយកគម្រោងបោះពុម្ពផ្សាយ",
    subtitle: "(Brochure)",
    description: "សេចក្តីលម្អិតអំពីវគ្គសិក្សា និងកាលវិភាគសិក្សា ២០២៥-២០២៦ (PDF, 8.4 MB)",
    action: { icon: "Download", label: "ទាញយកគម្រោងបោះពុម្ព (PDF)" },
};

/** Type tag of each `DepartmentKind`, Khmer first like the rest of the page. */
const TYPE_LABELS: Record<DepartmentKind, string> = {
    faculty: "មហាវិទ្យាល័យ (Faculty)",
    department: "ដេប៉ាតឺម៉ង់ (Department)",
    foundation: "ឆ្នាំសិស្សបឋម (Foundation Year)",
};

/** Under a `kind: "foundation"` entry, which is not a degree program. */
const FOUNDATION_NOTE = "វគ្គនេះបញ្ចប់ជាមុនសិន មុនចូលថ្នាក់បរិញ្ញាបត្រ • Taken before the bachelor's degree";

const BANNER_ACTIONS: UniversityHeroAction[] = [
    {
        icon: "Share2",
        className: "rounded-full bg-white/10 hover:bg-white/20 text-white",
    },
    {
        icon: "Bookmark",
        className: "rounded-full bg-white/10 hover:bg-white/20 text-white",
    },
];

/* ------------------------------------------------------------------ *
 * Builder                                                             *
 * ------------------------------------------------------------------ */

function googleMapsUrl(query: string) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** `Russian Federation Blvd., Toul Kork District, Phnom Penh` → `Toul Kork District`. */
function shortLocation(address: string): string {
    const parts = address
        .split(",")
        .map(part => part.trim())
        .filter(Boolean);
    if (parts.length > 2) return parts[parts.length - 2];
    return parts[0] ?? address;
}

/**
 * Page bundle of one university: hero, majors, about, address and links are
 * derived from the entity, the sample cards are attached to ITC only.
 */
export function getUniversityPageData(university: University): UniversityPageData {
    const { departments, address, website, description } = university;
    const type = university.universityType;
    const category = university.universityCategory;

    const site = website ? (website.startsWith("http") ? website : `https://${website}`) : undefined;
    const addressEn = address?.en ?? "";
    const campus = shortLocation(addressEn);

    /** Route prefix shared by the three menu tabs (Programs / Admissions / Scholarships). */
    const tabBase = `/explore-universities/${university.id}`;

    /**
     * Field of study of each entry — the cross-school facet behind the explore
     * chips and this card's filter pills. Deliberately *not* the faculty: a
     * school may name that facet after a subject (IFL) or a faculty (ITC).
     */
    const fieldLabels = [...new Set(departments.map(dept => dept.category.kh))];
    const fieldNames = [...new Set(departments.map(dept => dept.category.en))];

    const courses: FacultyCourseData[] = departments.map(dept => {
        const kind: DepartmentKind = dept.kind ?? "department";
        return {
            titleKh: dept.name.kh,
            titleEn: dept.name.en,
            badge: dept.category.kh,
            typeLabel: TYPE_LABELS[kind],
            typeWarn: kind === "foundation",
            note: kind === "foundation" ? FOUNDATION_NOTE : undefined,
            departmentId: dept.id,
            ...PROGRAM_DETAILS[`${university.id}/${dept.id}`],
        };
    });

    /**
     * One group per parent unit, in first-appearance order. Entries without a
     * `faculty` land in a single untitled group — that is exactly how a flat
     * school (or an unknown parent) renders, so no structure is invented.
     * Maximum depth stays at one: the leaf always renders, the middle of any
     * deeper tree is collapsed away.
     */
    const grouped = new Map<string, FacultyGroup>();
    departments.forEach((dept, index) => {
        const title = dept.faculty ? `${dept.faculty.kh} (${dept.faculty.en})` : undefined;
        let group = grouped.get(title ?? "");
        if (!group) {
            group = title === undefined ? { courses: [] } : { title, courses: [] };
            grouped.set(title ?? "", group);
        }
        group.courses.push(courses[index]);
    });
    const groups = [...grouped.values()];

    return {
        hero: {
            bannerBadges: [
                {
                    label: `${type.kh} • ${type.en}`,
                    icon: "GraduationCap",
                    className: "bg-teal-700/80 hover:bg-teal-700 text-white border-0",
                },
                {
                    label: `${category.kh} • ${category.en}`,
                    className: "bg-slate-700/60 hover:bg-slate-700 text-white border-0",
                },
            ],
            bannerActions: BANNER_ACTIONS,
            logo: { src: university.logo, alt: university.name.en },
            name: university.name.kh,
            nameBadge: university.id.toUpperCase(),
            subtitle: university.name.en,
            badges: [
                {
                    label: `ប្រភេទគ្រឹះស្ថាន: (${type.en})`,
                    variant: "outline",
                    icon: "GraduationCap",
                    className: "gap-1.5",
                },
                {
                    label: `${category.kh} (${category.en})`,
                    icon: "Award",
                    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1.5",
                },
                ...(website
                    ? [
                          {
                              label: website,
                              variant: "outline" as const,
                              icon: "Globe" as IconName,
                              className: "gap-1.5 text-slate-600",
                          },
                      ]
                    : []),
            ],
            primaryAction: {
                label: "ទស្សនាគេហទំព័រ (Visit Website)",
                icon: "Globe",
                href: site,
                className: "bg-sky-600 hover:bg-sky-700 text-white gap-2 rounded-lg px-5",
            },
            link: {
                label: website ?? "—",
                icon: "Globe",
                href: site,
                className: "flex items-center gap-1.5 text-slate-600 hover:text-sky-600 text-sm",
            },
            stats: [
                {
                    icon: "MapPin",
                    label: "ទីតាំង (Campus)",
                    value: addressEn || "—",
                },
                {
                    icon: "Globe",
                    label: "គេហទំព័រ (Website)",
                    value: website ?? "—",
                },
                {
                    icon: "GraduationCap",
                    label: "ប្រភេទគ្រឹះស្ថាន (Type)",
                    value: `${type.kh} (${type.en})`,
                },
                {
                    icon: "BookOpen",
                    label: "ជំនាញសិក្សា (Programs)",
                    value: `${departments.length}`,
                },
            ],
        },

        filters: ["គ្រប់ជំនាញ (All Degrees)", ...fieldLabels],

        faculty: {
            header: {
                /* App-level wording: the school decides whether a row below is a
           faculty, a department or a foundation year, never the label. */
                title: "ជំនាញសិក្សា",
                subtitle: fieldNames.join(" • "),
                badge: `${departments.length} Programs`,
            },
            groups,
        },

        about: {
            title: "អំពីសាកលវិទ្យាល័យ",
            subtitle: "(About)",
            description: description.kh,
            facts: [
                { icon: "GraduationCap", label: `${type.kh} (${type.en})` },
                { icon: "Award", label: `${category.kh} (${category.en})` },
                {
                    icon: "BookOpen",
                    label: `${departments.length} ជំនាញសិក្សា / Programs`,
                },
                ...(website ? [{ icon: "Globe" as IconName, label: website }] : []),
            ],
        },

        hotNews: university.id === "itc" ? ITC_HOT_NEWS : undefined,

        admissions: {
            header: university.id === "itc" ? ITC_ADMISSIONS.header : "ការចុះឈ្មោះ & ទំនាក់ទំនង (Admissions)",
            advisor: university.id === "itc" ? ITC_ADMISSIONS.advisor : undefined,
            actions:
                university.id === "itc"
                    ? ITC_ADMISSIONS.actions
                    : [
                          ...(site
                              ? [
                                    {
                                        icon: "Globe" as IconName,
                                        label: "មើលគេហទំព័រ (Visit Website)",
                                        className: "bg-blue-50 hover:bg-blue-100 text-blue-700",
                                        href: site,
                                    },
                                ]
                              : []),
                          {
                              icon: "MapPin" as IconName,
                              label: "ទីតាំងសាលា (Campus Map)",
                              className: "bg-slate-50 hover:bg-slate-100 text-slate-600",
                              href: googleMapsUrl(addressEn || university.name.en),
                          },
                      ],
        },

        campusMap: {
            header: {
                title: "ទីតាំង និងផែនទី",
                subtitle: "(Campus Map)",
                campus,
            },
            map: {
                iframeUrl: university.embedMapUrl,
                alt: "Campus Map",
                fallback: "Map Preview",
                place: campus,
            },
            directions: "ទិសដៅ (Directions)",
            directionsHref: googleMapsUrl(addressEn || university.name.en),
            address: address?.kh ?? "",
        },

        brochure: university.id === "itc" ? ITC_BROCHURE : undefined,

        /* The three tabs are three routes; `href` is the only wiring the menu
       needs, the active state is derived from the current path. */
        menu: [
            {
                href: tabBase,
                icon: "BookOpen",
                label: "ជំនាញសិក្សា & ថ្លៃសិក្សា (Programs & Fees)",
                badge: departments.length,
            },
            {
                href: `${tabBase}/admissions`,
                icon: "GraduationCap",
                label: "ការចុះឈ្មោះ & លក្ខខណ្ឌ (Admissions)",
            },
            {
                href: `${tabBase}/scholarships`,
                icon: "CalendarDays",
                label: "អាហារូបករណ៍ (Scholarships)",
            },
        ],
    };
}
