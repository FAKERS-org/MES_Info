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
import type { Lang } from "@/lib/language";
import { resolveBilingual, resolveText, type Bilingual, type PageCopy } from "./text";
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
    /** Omitted when the title already says it in both languages. */
    subtitle?: string;
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
    header: { title: string; subtitle?: string; campus: string };
    map: { iframeUrl?: string; alt: string; fallback: string; place: string };
    directions: string;
    /** Google Maps query behind the directions button. */
    directionsHref?: string;
    address: string;
}

export interface BrochureCardData {
    icon: IconName;
    title: string;
    subtitle?: string;
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
 * How the copy above is authored                                        *
 * ------------------------------------------------------------------ */

/**
 * Fields typed as a bare `string` that are *not* display copy. They have to be
 * named because a `string` is otherwise indistinguishable from copy — and the
 * cost of missing one is high: a Tailwind class wrapped in a `PageCopy` would
 * silently stop styling the button it was written for.
 *
 * `titleKh` / `titleEn` are the two sides of one field, already split by name;
 * `width` is a bar's inline style; the rest are URLs, a route and a channel
 * name. Anything holding a real `IconName` or a variant union needs no entry —
 * a union of string literals is an identifier, not copy.
 */
type NonCopyKey =
    | "className"
    | "src"
    | "href"
    | "iframeUrl"
    | "directionsHref"
    | "nameBadge"
    | "width"
    | "departmentId"
    | "titleKh"
    | "titleEn";

/** The page bundle as it is written, with every string still language-tagged. */
type UniversityPageSource = Bilingual<UniversityPageData, NonCopyKey>;

/* ------------------------------------------------------------------ *
 * Sample content — only attached where it is known to be true         *
 * ------------------------------------------------------------------ */

/**
 * Degree, length and tuition of the departments that had them in the old
 * hardcoded sample. Keyed `universityId/departmentId`; every other
 * department renders without those fields (they are optional in
 * {@link FacultyCourseData}).
 *
 * `degree` used to be one string holding both languages — `បរិញ្ញាបត្រវិស្វកម្ម
 * (Diplôme d'Ingénieur)` — and printed that way whatever the reader had
 * chosen. The parentheses were the seam, not part of the copy.
 */
const PROGRAM_DETAILS: Record<
    string,
    Bilingual<Pick<FacultyCourseData, "degree" | "years" | "price" | "seats">>
> = {
    "itc/gic": {
        degree: { kh: "បរិញ្ញាបត្រវិស្វកម្ម", en: "Diplôme d'Ingénieur" },
        years: { kh: "៥ ឆ្នាំ", en: "5 years" },
    },
    "itc/gtr": {
        degree: { kh: "បរិញ្ញាបត្រវិស្វកម្ម", en: "Diplôme d'Ingénieur" },
        years: { kh: "៥ ឆ្នាំ", en: "5 years" },
        price: { kh: "$650", en: "$650" },
        seats: { kh: "មានអាហារូបករណ៍", en: "Scholarship available" },
    },
    "itc/gee": {
        degree: { kh: "បរិញ្ញាបត្រវិស្វកម្ម", en: "Engineering" },
        years: { kh: "៥ ឆ្នាំ", en: "5 years" },
        price: { kh: "$650", en: "$650" },
        seats: { kh: "ចំណុះ 120 នាក់", en: "120 seats" },
    },
    "itc/gar": {
        degree: { kh: "បរិញ្ញាបត្រវិស្វកម្ម", en: "Engineering Degree" },
        years: { kh: "៥ ឆ្នាំ", en: "5 years" },
        price: { kh: "$750", en: "$750" },
        seats: { kh: "Smart Lab ITC", en: "Smart Lab ITC" },
    },
};

/** Admissions news of the ITC sample. */
const ITC_HOT_NEWS: Bilingual<HotNewsCardData, NonCopyKey> = {
    header: { title: { kh: "ព័ត៌មានសំខាន់បំផុតចំនួន២", en: "Important News" }, badge: { kh: "ITC-INFO", en: "ITC-INFO" } },
    highlight: {
        title: { kh: "លទ្ធផលខាងចូលរៀន", en: "BacII Results" },
        description: {
            kh: "សូម្បីតែកូនសិស្សថ្នាក់ទី១២ ដែលប្រឡងធ្លាក់ ឬ បោះបង់ការប្រឡង BacII ក៏អាចចុះឈ្មោះចូលរៀននៅវិទ្យាស្ថានបានដែរ។",
            en: "Students who sat — or sat for the first time — the grade 12 national exam may still apply to the institute.",
        },
        action: { kh: "ចុះឈ្មោះចូលរៀន", en: "Apply Now" },
    },
    exam: {
        label: { kh: "ការប្រឡងចូលរៀន", en: "Entrance Exam" },
        registrants: { kh: "ចុះឈ្មោះ 42 នាក់", en: "42 registered" },
        date: { kh: "ថ្ងៃទី ១៥ ខែ តុលា ២០២៥", en: "October 15, 2025" },
        place: {
            kh: "ថ្ងៃទី ១៥ ខែ តុលា ២០២៥ • មជ្ឈមណ្ឌល ITC ភ្នំពេញ",
            en: "October 15, 2025 • Phnom Penh ITC Center",
        },
    },
    facts: [
        {
            icon: "BookOpen",
            label: {
                kh: "ភាសាបរទេស៖ ខ្មែរ, អង់គ្លេស, បារាំង",
                en: "Languages: Khmer, French, English",
            },
        },
        {
            icon: "Users",
            label: {
                kh: "និស្សិតសរុប៖ 12,500+ នាក់ (35% ស្រី)",
                en: "Total students: 12,500+ (35% female)",
            },
        },
    ],
    employment: {
        icon: "BarChart3",
        label: { kh: "អត្រាជាប់ការងារ ៦ ខែ", en: "Employed within 6 months" },
        value: { kh: "94.8%", en: "94.8%" },
        width: "94.8%",
    },
    footer: {
        name: {
            kh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
            en: "Institute of Technology of Cambodia",
        },
        campus: { kh: "ទួល", en: "Toul" },
    },
};

/** Advisor desk of the ITC sample. */
const ITC_ADMISSIONS: Bilingual<AdmissionsCardData, NonCopyKey> = {
    header: { kh: "ទីប្រឹក្សាការសិក្សា", en: "Admissions" },
    advisor: {
        name: { kh: "លោកគ្រូ វណ្ណា", en: "Vanna" },
        role: { kh: "ប្រធានការិយាល័ចូលរៀនសិស្ស", en: "Head of Student Admissions" },
        status: { kh: "ឥឡូវនេះ", en: "Online" },
        isOnline: true,
    },
    actions: [
        {
            icon: "MessageCircle",
            label: { kh: "ផ្ញើសារសួរ", en: "Telegram Q&A" },
            className: "bg-blue-50 hover:bg-blue-100 text-blue-700",
        },
        {
            icon: "Phone",
            label: { kh: "ទូរស័ព្ទ៖ 023 880 370", en: "Hotline: 023 880 370" },
            className: "bg-slate-50 hover:bg-slate-100 text-slate-600",
        },
    ],
};

/** Brochure of the ITC sample. */
const ITC_BROCHURE: Bilingual<BrochureCardData, NonCopyKey> = {
    icon: "FileText",
    title: { kh: "ទាញយកគម្រោងបោះពុម្ពផ្សាយ", en: "Download Brochure" },
    description: {
        kh: "សេចក្តីលម្អិតអំពីវគ្គសិក្សា និងកាលវិភាគសិក្សា ២០២៥-២០២៦ (PDF, 8.4 MB)",
        en: "Details about the programs and the 2025-2026 curriculum (PDF, 8.4 MB)",
    },
    action: {
        icon: "Download",
        label: { kh: "ទាញយកគម្រោងបោះពុម្ព", en: "Download (PDF)" },
    },
};

/** Type tag of each `DepartmentKind`, in both languages. */
const TYPE_LABELS: Record<DepartmentKind, PageCopy> = {
    faculty: { kh: "មហាវិទ្យាល័យ", en: "Faculty" },
    department: { kh: "ដេប៉ាតឺម៉ង់", en: "Department" },
    foundation: { kh: "ឆ្នាំសិស្សបឋម", en: "Foundation Year" },
};

/**
 * Under a `kind: "foundation"` entry, which is not a degree program. The two
 * sentences used to be welded together with a `•`, which is what made a
 * Khmer reader and an English reader see the same half-glued line.
 */
const FOUNDATION_NOTE: PageCopy = {
    kh: "វគ្គនេះបញ្ចប់ជាមុនសិន មុនចូលថ្នាក់បរិញ្ញាបត្រ",
    en: "Taken before the bachelor's degree",
};

const BANNER_ACTIONS: Bilingual<UniversityHeroAction, NonCopyKey>[] = [
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
 *
 * `lang` picks the language the reader asked for. It is applied in two places
 * and they are not the same job:
 *
 *  - {@link resolveBilingual} walks the authored copy at the end, so every
 *    `PageCopy` in the bundle comes back as the string a card prints;
 *  - the fields read off the *entity* are chosen here, because the entity
 *    stores `NamespacedText` rather than `PageCopy` and so is never part of
 *    that walk.
 *
 * Splitting it that way is what stops a value being resolved twice or not at
 * all — the failure that made this page print Khmer to an English reader no
 * matter which cookie they had.
 */
export function getUniversityPageData(
    university: University,
    lang: Lang,
): UniversityPageData {
    const { departments, address, website, description } = university;
    const type = university.universityType;
    const category = university.universityCategory;

    const site = website ? (website.startsWith("http") ? website : `https://${website}`) : undefined;
    /**
     * The English address is the one fed to Google Maps — a geocoder wants the
     * romanised form — and the campus name it yields is a proper noun either
     * way. The reader-facing address below still follows `lang`.
     */
    const addressEn = address?.en ?? "";
    const campus = shortLocation(addressEn);

    /** Route prefix shared by the three menu tabs (Programs / Admissions / Scholarships). */
    const tabBase = `/explore-universities/${university.id}`;

    /**
     * Field of study of each entry — the cross-school facet behind the explore
     * chips and this card's filter pills. Deliberately *not* the faculty: a
     * school may name that facet after a subject (IFL) or a faculty (ITC).
     */
    const fieldLabels = [...new Set(departments.map(dept => dept.category[lang]))];
    const fieldNames = [...new Set(departments.map(dept => dept.category[lang]))];

    const courses: Bilingual<FacultyCourseData, NonCopyKey>[] = departments.map(dept => {
        const kind: DepartmentKind = dept.kind ?? "department";
        return {
            titleKh: dept.name.kh,
            titleEn: dept.name.en,
            badge: { [lang]: dept.category[lang] },
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
    const grouped = new Map<string, Bilingual<FacultyGroup, NonCopyKey>>();
    departments.forEach((dept, index) => {
        const title = dept.faculty ? dept.faculty[lang] : undefined;
        const key = title ?? "";
        let group = grouped.get(key);
        if (!group) {
            group = title === undefined ? { courses: [] } : { title: { [lang]: title }, courses: [] };
            grouped.set(key, group);
        }
        group.courses.push(courses[index]);
    });
    const groups = [...grouped.values()];

    const bundle: UniversityPageSource = {
        hero: {
            bannerBadges: [
                {
                    label: { [lang]: type[lang] },
                    icon: "GraduationCap",
                    className: "bg-teal-700/80 hover:bg-teal-700 text-white border-0",
                },
                {
                    label: { [lang]: category[lang] },
                    className: "bg-slate-700/60 hover:bg-slate-700 text-white border-0",
                },
            ],
            bannerActions: BANNER_ACTIONS,
            logo: { src: university.logo, alt: { [lang]: university.name[lang] } },
            /* The name in the reader's language only — no mixed-language subtitle. */
            name: { [lang]: university.name[lang] },
            nameBadge: university.id.toUpperCase(),
            subtitle: { [lang]: "" },
            badges: [
                {
                    label: {
                        [lang]:
                            lang === "en"
                                ? `University Type: ${type.en}`
                                : `ប្រភេទគ្រឹះស្ថាន៖ ${type.kh}`,
                    },
                    variant: "outline",
                    icon: "GraduationCap",
                    className: "gap-1.5",
                },
                {
                    label: { [lang]: category[lang] },
                    icon: "Award",
                    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1.5",
                },
                ...(website
                    ? [
                          {
                              label: { [lang]: website },
                              variant: "outline" as const,
                              icon: "Globe" as IconName,
                              className: "gap-1.5 text-slate-600",
                          },
                      ]
                    : []),
            ],
            primaryAction: {
                label: { kh: "ទស្សនាគេហទំព័រ", en: "Visit Website" },
                icon: "Globe",
                href: site,
                className: "bg-sky-600 hover:bg-sky-700 text-white gap-2 rounded-lg px-5",
            },
            link: {
                label: { [lang]: website ?? "—" },
                icon: "Globe",
                href: site,
                className: "flex items-center gap-1.5 text-slate-600 hover:text-sky-600 text-sm",
            },
            stats: [
                {
                    icon: "MapPin",
                    label: { kh: "ទីតាំង", en: "Campus" },
                    value: { [lang]: addressEn || "—" },
                },
                {
                    icon: "Globe",
                    label: { kh: "គេហទំព័រ", en: "Website" },
                    value: { [lang]: website ?? "—" },
                },
                {
                    icon: "GraduationCap",
                    label: { kh: "ប្រភេទគ្រឹះស្ថាន", en: "Type" },
                    value: { [lang]: type[lang] },
                },
                {
                    icon: "BookOpen",
                    label: { kh: "ជំនាញសិក្សា", en: "Programs" },
                    value: { [lang]: `${departments.length}` },
                },
            ],
        },

        filters: [{ kh: "គ្រប់ជំនាញ", en: "All Degrees" }, ...fieldLabels.map(label => ({ [lang]: label }))],

        faculty: {
            header: {
                /* App-level wording: the school decides whether a row below is a
           faculty, a department or a foundation year, never the label. */
                title: { kh: "ជំនាញសិក្សា", en: "Programs" },
                subtitle: { [lang]: fieldNames.join(" • ") },
                badge: {
                    [lang]:
                        lang === "en"
                            ? `${departments.length} Programs`
                            : `${departments.length} ជំនាញសិក្សា`,
                },
            },
            groups,
        },

        about: {
            title: { kh: "អំពីសាកលវិទ្យាល័យ", en: "About the University" },
            description: { [lang]: resolveText(description, lang) },
            facts: [
                { icon: "GraduationCap", label: { [lang]: type[lang] } },
                { icon: "Award", label: { [lang]: category[lang] } },
                {
                    icon: "BookOpen",
                    label: {
                        [lang]:
                            lang === "en"
                                ? `${departments.length} Programs`
                                : `${departments.length} ជំនាញសិក្សា`,
                    },
                },
                ...(website ? [{ icon: "Globe" as IconName, label: { [lang]: website } }] : []),
            ],
        },

        hotNews: university.id === "itc" ? ITC_HOT_NEWS : undefined,

        admissions: {
            header:
                university.id === "itc"
                    ? ITC_ADMISSIONS.header
                    : { kh: "ការចុះឈ្មោះ & ទំនាក់ទំនង", en: "Admissions & Contact" },
            advisor: university.id === "itc" ? ITC_ADMISSIONS.advisor : undefined,
            actions:
                university.id === "itc"
                    ? ITC_ADMISSIONS.actions
                    : [
                          ...(site
                              ? [
                                    {
                                        icon: "Globe" as IconName,
                                        label: { kh: "មើលគេហទំព័រ", en: "Visit Website" },
                                        className: "bg-blue-50 hover:bg-blue-100 text-blue-700",
                                        href: site,
                                    },
                                ]
                              : []),
                          {
                              icon: "MapPin" as IconName,
                              label: { kh: "ទីតាំងសាលា", en: "Campus Map" },
                              className: "bg-slate-50 hover:bg-slate-100 text-slate-600",
                              href: googleMapsUrl(addressEn || university.name.en),
                          },
                      ],
        },

        campusMap: {
            header: {
                title: { kh: "ទីតាំង និងផែនទី", en: "Location & Map" },
                campus: { [lang]: campus },
            },
            map: {
                iframeUrl: university.embedMapUrl,
                alt: { kh: "ផែនទីសាលា", en: "Campus Map" },
                fallback: { kh: "មើលផែនទីជាមុន", en: "Map Preview" },
                place: { [lang]: campus },
            },
            directions: { kh: "ទិសដៅ", en: "Directions" },
            directionsHref: googleMapsUrl(addressEn || university.name.en),
            address: { [lang]: resolveText(address ?? { kh: "", en: "" }, lang) },
        },

        brochure: university.id === "itc" ? ITC_BROCHURE : undefined,

        /* The three tabs are three routes; `href` is the only wiring the menu
       needs, the active state is derived from the current path. */
        menu: [
            {
                href: tabBase,
                icon: "BookOpen",
                label: { kh: "ជំនាញសិក្សា & ថ្លៃសិក្សា", en: "Programs & Fees" },
                badge: departments.length,
            },
            {
                href: `${tabBase}/admissions`,
                icon: "GraduationCap",
                label: { kh: "ការចុះឈ្មោះ & លក្ខខណ្ឌ", en: "Admissions" },
            },
            {
                href: `${tabBase}/scholarships`,
                icon: "CalendarDays",
                label: { kh: "អាហារូបករណ៍", en: "Scholarships" },
            },
        ],
    };

    return resolveBilingual(bundle, lang) as UniversityPageData;
}
