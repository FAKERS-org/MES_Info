/**
 * University entity data — the single source of truth for the school list.
 *
 * Served verbatim by `GET /api/universities` and looked up by id on the
 * detail pages. `./university-page` and `./department-page` are separate
 * placeholder mocks for page-specific UI copy.
 */

/** Language-prefixed field map, e.g. { kh: "...", en: "..." }. */
export interface NamespacedText {
    kh: string;
    en: string;
}

/**
 * What a listed unit *is* at its own school. Schools mix these freely —
 * USHA lists faculties, RUPP/IFL list departments, some list a foundation
 * year — so this is display metadata only: the official `name` is always
 * rendered verbatim and this drives the type tag and grouping.
 */
export type DepartmentKind = "faculty" | "department" | "foundation";

export interface Department {
    id: string;
    name: NamespacedText;
    /** Defaults to `"department"` when omitted. */
    kind?: DepartmentKind;
    /**
     * Parent unit (faculty/institute) shown as a section header on the detail
     * page. Display-only grouping: omit when the school is flat or the parent
     * is unknown, the entry then renders without a header.
     */
    faculty?: NamespacedText;
    category: NamespacedText;
    /** Omitted by a school with no artwork; the avatar falls back to initials. */
    logo?: string;
    requirements: NamespacedText[];
}

export interface University {
    id: string;
    name: NamespacedText;
    universityType: NamespacedText;
    universityCategory: NamespacedText;
    description: NamespacedText;
    /** Omitted by a school with no artwork; the avatar falls back to initials. */
    logo?: string;
    website?: string;
    address?: NamespacedText;
    embedMapUrl?: string;
    departments: Department[];
}

/**
 * Server-side seed data. Served by GET /api/universities and
 * not imported by client code — the client always fetches from the API.
 */
export const universities: University[] = [
    {
        id: "itc",
        name: {
            kh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (សាលាតិចណូ)",
            en: "Institute of Technology of Cambodia",
        },
        universityType: { kh: "សាធារណៈ", en: "Public" },
        universityCategory: { kh: "បច្ចេកវិទ្យា", en: "Technology" },
        description: {
            kh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (ITC) ជាសាលាវិស្វកម្មសាធារណៈឈានមុខគេនៅកម្ពុជា ផ្តល់កម្មវិធីបរិញ្ញាបត្រ និងអនុបណ្ឌិតផ្នែកវិស្វកម្ម វិទ្យាសាស្ត្រអនុវត្ត និងបច្ចេកវិទ្យា។",
            en: "The Institute of Technology of Cambodia (ITC) is the leading public engineering school in Cambodia, offering bachelor's and master's programs in engineering, applied science and technology.",
        },
        logo: "/images/ITC-logo.png",
        website: "itc.edu.kh",
        address: {
            kh: "វិថីសហព័ន្ធរុស្សី ខណ្ឌទួលគោក រាជធានីភ្នំពេញ",
            en: "Russian Federation Blvd., Toul Kork District, Phnom Penh",
        },
        embedMapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2385.6276445870444!2d104.89800522998834!3d11.570417563099078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517388680e15%3A0x63057e6682968f5!2z4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6f4Z-S4Z6Q4Z624Z6T4Z6U4Z6F4Z-S4Z6F4Z-B4Z6A4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6A4Z6Y4Z-S4Z6W4Z674Z6H4Z62!5e1!3m2!1skm!2skh!4v1790477032645!5m2!1skm!2skh",
        departments: [
            {
                id: "gic",
                kind: "department",
                faculty: { kh: "មហាវិទ្យាល័យវិស្វកម្ម", en: "Faculty of Engineering" },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មព័ត៌មាន និងទំនាក់ទំនង (GIC)",
                    en: "Department of Information and Communication Engineering (GIC)",
                },
                category: {
                    kh: "វិស្វកម្ម",
                    en: "Engineering",
                },
                logo: "/images/GIC-logo.png",
                requirements: [
                    {
                        kh: "ស្គាល់ពីវិស័យ IT",
                        en: "Familiarity with the IT industry",
                    },
                    {
                        kh: "ចេះដឹងបច្ចេកវិទ្យា API, Database, Web Frontend",
                        en: "Mastery of API, Database, Web frontend technologies",
                    },
                    {
                        kh: "ប្រើប្រាស់បច្ចេកវិទ្យាច្រើនដូចជា Laravel, MySQL",
                        en: "Use of multiple tech stacks such as Laravel and MySQL",
                    },
                    {
                        kh: "យល់អំពីស្ថាបត្យកម្ម និងការដាក់ពង្រាយសូហ្វវែរ/ប្រព័ន្ធ",
                        en: "Understanding of software/system architecture and deployment",
                    },
                    {
                        kh: "មានជំនាញទំនាក់ទំនងភាសាអង់គ្លេស។ល។",
                        en: "English communication skills, etc.",
                    },
                ],
            },
            {
                id: "gtr",
                kind: "department",
                faculty: { kh: "មហាវិទ្យាល័យវិស្វកម្ម", en: "Faculty of Engineering" },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មទូរគមនាគមន៍ និងបណ្តាញ (GTR)",
                    en: "Department of Telecommunication and Network Engineering (GTR)",
                },
                category: {
                    kh: "វិស្វកម្ម",
                    en: "Engineering",
                },
                logo: "/images/ITC-logo.png",
                requirements: [],
            },
            {
                id: "gee",
                kind: "department",
                faculty: { kh: "មហាវិទ្យាល័យវិស្វកម្ម", en: "Faculty of Engineering" },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មអគ្គិសនី (GEE)",
                    en: "Department of Electrical Power Engineering (GEE)",
                },
                category: {
                    kh: "វិស្វកម្ម",
                    en: "Engineering",
                },
                logo: "/images/ITC-logo.png",
                requirements: [],
            },
            {
                id: "gar",
                kind: "department",
                faculty: { kh: "មហាវិទ្យាល័យវិស្វកម្ម", en: "Faculty of Engineering" },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ស្វ័យប្រវត្តិកម្ម និងមនុស្សយន្ត (GAR)",
                    en: "Department of Automation and Robotics Engineering (GAR)",
                },
                category: {
                    kh: "វិស្វកម្ម",
                    en: "Engineering",
                },
                logo: "/images/ITC-logo.png",
                requirements: [],
            },
        ],
    },
];
