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
    {
        id: "usha",
        name: {
            kh: "សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល",
            en: "University of Health Sciences",
        },
        universityType: { kh: "សាធារណៈ", en: "Public" },
        universityCategory: { kh: "សុខភាព", en: "Health" },
        description: {
            kh: "សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល (UHS) ជាស្ថាប័នសាធារណៈសំខាន់ដែលបណ្តុះបណ្តាលគ្រូពេទ្យ ឱសថករ និងអ្នកជំនាញសុខាភិបាលដទៃទៀតនៅកម្ពុជា។",
            en: "The University of Health Sciences (UHS) is the main public institution training doctors, pharmacists and other health professionals in Cambodia.",
        },
        logo: "/images/UHS-logo.png",
        website: "uhs.edu.kh",
        address: {
            kh: "រាជធានីភ្នំពេញ កម្ពុជា",
            en: "Phnom Penh, Cambodia",
        },
        embedMapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38884.090031628046!2d104.8687203128515!3d11.568542157651564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951425fa514cb%3A0x611565d7f90d26e2!2z4Z6f4Z624Z6A4Z6b4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6b4Z-Q4Z6Z4oCL4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6f4Z624Z6f4Z-S4Z6a4Z-S4Z6P4oCL4Z6f4Z674Z6B4Z624Z6X4Z634Z6U4Z624Z6b!5e1!3m2!1skm!2skh!4v1790477967393!5m2!1skm!2skh",
        departments: [
            {
                id: "medicine",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យវិទ្យាសាស្ត្រពេទ្យ",
                    en: "Faculty of Medicine",
                },
                category: {
                    kh: "សុខភាព",
                    en: "Health",
                },
                logo: "/images/UHS-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ផ្នែកវិទ្យាសាស្ត្រ",
                        en: "High school diploma (BacII) with a science major",
                    },
                    {
                        kh: "ជាប់ការប្រឡងចូលរៀនជាតិរបស់ក្រសួងអប់រំ យុវជន និងកីឡា",
                        en: "Pass the MoEYS national entrance examination",
                    },
                    {
                        kh: "មានសុខភាពល្អ និងគ្មានជំងឺឆ្លងរ៉ាំរ៉ែ",
                        en: "Good health and free from chronic infectious disease",
                    },
                ],
            },
            {
                id: "pharmacy",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យឱសថកម្ម",
                    en: "Faculty of Pharmacy",
                },
                category: {
                    kh: "សុខភាព",
                    en: "Health",
                },
                logo: "/images/UHS-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ផ្នែកគីមីវិទ្យា និងជីវវិទ្យា",
                        en: "BacII with chemistry and biology",
                    },
                    {
                        kh: "ជាប់ការប្រឡងចូលរៀនតាមការកំណត់របស់ក្រសួងសុខាភិបាល",
                        en: "Pass the admission exam set by the Ministry of Health",
                    },
                    {
                        kh: "មានចំណេះដឹងភាសាអង់គ្លេសមូលដ្ឋាន",
                        en: "Basic English proficiency",
                    },
                ],
            },
            {
                id: "dentistry",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យទន្តបរិយាកាស",
                    en: "Faculty of Dentistry",
                },
                category: {
                    kh: "សុខភាព",
                    en: "Health",
                },
                logo: "/images/UHS-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ផ្នែកវិទ្យាសាស្ត្រ",
                        en: "High school diploma (BacII) with a science major",
                    },
                    {
                        kh: "មានសមត្ថភាចង់ដឹង និងសុខភាពល្អ",
                        en: "Manual dexterity and good health",
                    },
                    {
                        kh: "ជាប់ការប្រឡងសមត្ថភាពរបស់ក្រសួងសុខាភិបាល",
                        en: "Pass the Ministry of Health aptitude test",
                    },
                ],
            },
            {
                id: "nursing",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យគិលានុបដ្ឋាយន្ត និងសំឡី",
                    en: "Faculty of Nursing & Midwifery",
                },
                category: {
                    kh: "សុខភាព",
                    en: "Health",
                },
                logo: "/images/UHS-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) គ្រប់ផ្នែក",
                        en: "High school diploma (BacII) from any stream",
                    },
                    {
                        kh: "មានចរិតល្អ និងអត់ធ្មត់ក្នុងការថែទាំអ្នកជំងឺ",
                        en: "A caring attitude and patience in patient care",
                    },
                    {
                        kh: "ជាប់ការប្រឡងចូលរៀនរបស់ក្រសួងសុខាភិបាល",
                        en: "Pass the Ministry of Health entrance examination",
                    },
                ],
            },
            {
                id: "public-health",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យសុខភាពសាធារណៈ",
                    en: "Faculty of Public Health",
                },
                category: {
                    kh: "សុខភាព",
                    en: "Health",
                },
                logo: "/images/UHS-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII)",
                        en: "High school diploma (BacII)",
                    },
                    {
                        kh: "ចង់ធ្វើការងារសង្គម និងសុខភាពសាធារណៈ",
                        en: "Interest in community and public health work",
                    },
                    {
                        kh: "ចេះភាសាអង់គ្លេស និងប្រើប្រាស់កុំព្យូទ័របាន",
                        en: "English literacy and computer skills",
                    },
                ],
            },
        ],
    },
    {
        id: "rupp",
        name: {
            kh: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
            en: "Royal University of Phnom Penh",
        },
        universityType: { kh: "សាធារណៈ", en: "Public" },
        universityCategory: { kh: "ទូទៅ", en: "General" },
        description: {
            kh: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (RUPP) ជាសាកលវិទ្យាល័យធំបំផុតនៅកម្ពុជា ផ្តល់កម្មវិធីផ្នែកវិទ្យាសាស្ត្រ វិទ្យាសាស្ត្រសង្គម បច្ចេកវិទ្យាព័ត៌មាន និងផ្សេងៗទៀត។",
            en: "The Royal University of Phnom Penh (RUPP) is Cambodia's largest university, offering programs across sciences, social sciences, information technology and more.",
        },
        logo: "/images/RUPP-logo.png",
        website: "rupp.edu.kh",
        address: {
            kh: "រាជធានីភ្នំពេញ កម្ពុជា",
            en: "Phnom Penh, Cambodia",
        },
        embedMapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.256008495881!2d104.8880324388945!3d11.568498216306848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2z4Z6f4Z624Z6A4Z6b4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6b4Z-Q4Z6Z4Z6X4Z684Z6Y4Z634Z6T4Z-S4Z6R4Z6X4Z-S4Z6T4Z-G4Z6W4Z-B4Z6J!5e1!3m2!1skm!2skh!4v1790477926630!5m2!1skm!2skh",
        departments: [
            {
                id: "computer-science",
                kind: "department",
                faculty: { kh: "មហាវិទ្យាល័យវិទ្យាសាស្ត្រ", en: "Faculty of Science" },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់វិទ្យាសាស្ត្រកុំព្យូទ័រ",
                    en: "Department of Computer Science",
                },
                category: {
                    kh: "បច្ចេកវិទ្យាព័ត៌មាន",
                    en: "Information Technology",
                },
                logo: "/images/RUPP-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ផ្នែកវិទ្យាសាស្ត្រ",
                        en: "High school diploma (BacII) with a science major",
                    },
                    {
                        kh: "ពូកែគណិតវិទ្យា និងតក្កសាស្ត្រមូលដ្ឋាន",
                        en: "Strong background in mathematics and logical reasoning",
                    },
                    {
                        kh: "ស្គាល់ការសរសេរកូដមូលដ្ឋានដូចជា Python ឬ JavaScript",
                        en: "Basic coding skills in Python or JavaScript",
                    },
                ],
            },
            {
                id: "electronics-telecom",
                kind: "department",
                faculty: { kh: "មហាវិទ្យាល័យវិស្វកម្ម", en: "Faculty of Engineering" },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់អេឡិចត្រូនិច និងទូរគមនាគមន៍",
                    en: "Department of Electronics & Telecommunications",
                },
                category: {
                    kh: "វិស្វកម្ម",
                    en: "Engineering",
                },
                logo: "/images/RUPP-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ផ្នែកគណិតវិទ្តា និងរូបវិទ្យា",
                        en: "BacII with mathematics and physics",
                    },
                    {
                        kh: "ចាប់អារម្មណ៍លើអេឡិចត្រូនិច និងបណ្តាញទូរគមនាគមន៍",
                        en: "Interest in electronics and communication networks",
                    },
                    {
                        kh: "ចេះកុំព្យូទ័រ និងភាសាអង់គ្លេសមូលដ្ឋាន",
                        en: "Computer literacy and basic English",
                    },
                ],
            },
            {
                id: "math-statistics",
                kind: "department",
                faculty: { kh: "មហាវិទ្យាល័យវិទ្យាសាស្ត្រ", en: "Faculty of Science" },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់គណិតវិទ្យា និងស្ថិតិ",
                    en: "Department of Mathematics & Statistics",
                },
                category: {
                    kh: "វិទ្យាសាស្ត្រ",
                    en: "Science",
                },
                logo: "/images/RUPP-logo.png",
                requirements: [
                    {
                        kh: "ពូកែគណិតវិទ្យាក្នុងបរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ",
                        en: "Strong mathematics results in high school",
                    },
                    {
                        kh: "ចូលចិត្តការវិភាគ និងការដោះស្រាយបញ្ហា",
                        en: "Enjoys analysis and problem solving",
                    },
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ផ្នែកវិទ្យាសាស្ត្រ",
                        en: "High school diploma (BacII) with a science major",
                    },
                ],
            },
            {
                id: "international-relations",
                kind: "department",
                faculty: {
                    kh: "វិទ្យាស្ថានសិក្សាអន្តរជាតិ និងគោលនយោបាយសាធារណៈ",
                    en: "Institute of International Studies and Public Policy",
                },
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ទំនាក់ទំនងអន្តរជាតិ",
                    en: "Department of International Relations",
                },
                category: {
                    kh: "វិទ្យាសាស្ត្រសង្គម",
                    en: "Social Sciences",
                },
                logo: "/images/RUPP-logo.png",
                requirements: [
                    {
                        kh: "ចេះភាសាអង់គ្លេសបានល្អ",
                        en: "Good English proficiency",
                    },
                    {
                        kh: "ចាប់អារម្មណ៍លើនយោបាយ និងបញ្ហាអន្តរជាតិ",
                        en: "Interest in politics and international affairs",
                    },
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) គ្រប់ផ្នែក",
                        en: "High school diploma (BacII) from any stream",
                    },
                ],
            },
            {
                id: "law",
                kind: "department",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់និយាម",
                    en: "Department of Law",
                },
                category: {
                    kh: "ច្បាប់ និងសេដ្ឋកិច្ច",
                    en: "Law & Economics",
                },
                logo: "/images/RUPP-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) គ្រប់ផ្នែក",
                        en: "High school diploma (BacII) from any stream",
                    },
                    {
                        kh: "ចេះអាន និងសរសេរភាសាខ្មែរបានល្អ",
                        en: "Strong Khmer reading and writing skills",
                    },
                    {
                        kh: "មានសីលធម៌ និងការទទួលខុសត្រូវខ្ពស់",
                        en: "Good ethics and a strong sense of responsibility",
                    },
                ],
            },
            {
                id: "economics-finance",
                kind: "department",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់សេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ",
                    en: "Department of Economics & Finance",
                },
                category: {
                    kh: "ច្បាប់ និងសេដ្ឋកិច្ច",
                    en: "Law & Economics",
                },
                logo: "/images/RUPP-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ផ្នែកពាណិជ្ជកម្ម ឬវិទ្យាសាស្ត្រ",
                        en: "BacII, commerce or science stream",
                    },
                    {
                        kh: "ចេះគណិតវិទ្យាមូលដ្ឋាន",
                        en: "Basic mathematics skills",
                    },
                    {
                        kh: "ចាប់អារម្មណ៍លើសេដ្ឋកិច្ច និងធនាគារ",
                        en: "Interest in economics and banking",
                    },
                ],
            },
        ],
    },
    {
        id: "ifl",
        name: {
            kh: "វិទ្យាស្ថានភាសាបរទេស",
            en: "Institute of Foreign Languages",
        },
        universityType: { kh: "សាធារណៈ", en: "Public" },
        universityCategory: { kh: "ភាសា", en: "Languages" },
        description: {
            kh: "វិទ្យាស្ថានភាសាបរទេស (IFL) ជាផ្នែកមួយនៃ RUPP ជាវិទ្យាស្ថានឈានមុខគេរបស់កម្ពុជាសម្រាប់ការបណ្តុះបណ្តាលភាសា និងការសិក្សាអន្តរជាតិ។",
            en: "The Institute of Foreign Languages (IFL), part of RUPP, is Cambodia's leading institute for language and international studies training.",
        },
        logo: "/images/IFL-logo.png",
        website: "ifl.rupp.edu.kh",
        address: {
            kh: "រាជធានីភ្នំពេញ កម្ពុជា",
            en: "Phnom Penh, Cambodia",
        },
        embedMapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.252631814041!2d104.89081657185184!3d11.568887118847769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517571af5219%3A0x1867ccb59bb50039!2z4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6f4Z-S4Z6Q4Z624Z6T4Z6X4Z624Z6f4Z624Z6U4Z6a4Z6R4Z-B4Z6f!5e1!3m2!1skm!2skh!4v1790477890509!5m2!1skm!2skh",
        departments: [
            {
                id: "english",
                kind: "department",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ភាសាអង់គ្លេស",
                    en: "Department of English",
                },
                category: {
                    kh: "ភាសា",
                    en: "Languages",
                },
                logo: "/images/IFL-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) ឬសញ្ញាបត្រស្មើគ្នា",
                        en: "High school diploma (BacII) or equivalent",
                    },
                    {
                        kh: "ជាប់ការប្រឡងភាសាអង់គ្លេសមូលដ្ឋានរបស់វិទ្យាស្ថាន",
                        en: "Pass the institute's basic English entrance exam",
                    },
                    {
                        kh: "អាចសិក្សាភាសាបរទេសបានពេញម៉ោង",
                        en: "Able to study a foreign language full-time",
                    },
                ],
            },
            {
                id: "french",
                kind: "department",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ភាសាបារាំង",
                    en: "Department of French",
                },
                category: {
                    kh: "ភាសា",
                    en: "Languages",
                },
                logo: "/images/IFL-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII)",
                        en: "High school diploma (BacII)",
                    },
                    {
                        kh: "មានបំណងរៀនភាសាបារាំងពីកម្រិតមូលដ្ឋាន",
                        en: "Willing to start French from a beginner level",
                    },
                    {
                        kh: "ជាប់ការប្រឡងសមត្ថភាពភាសា",
                        en: "Pass the language aptitude test",
                    },
                ],
            },
            {
                id: "chinese",
                kind: "department",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ភាសាចិន",
                    en: "Department of Chinese",
                },
                category: {
                    kh: "ភាសា",
                    en: "Languages",
                },
                logo: "/images/IFL-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII)",
                        en: "High school diploma (BacII)",
                    },
                    {
                        kh: "ចាប់អារម្មណ៍លើវប្បធម៌ និងភាសាចិន",
                        en: "Interest in Chinese language and culture",
                    },
                    {
                        kh: "ជាប់ការប្រឡងចូលរៀនរបស់វិទ្យាស្ថាន",
                        en: "Pass the institute entrance examination",
                    },
                ],
            },
            {
                id: "japanese",
                kind: "department",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ភាសាជប៉ុន",
                    en: "Department of Japanese",
                },
                category: {
                    kh: "ភាសា",
                    en: "Languages",
                },
                logo: "/images/IFL-logo.png",
                requirements: [
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII)",
                        en: "High school diploma (BacII)",
                    },
                    {
                        kh: "ចាប់អារម្មណ៍លើវប្បធម៌ និងភាសាជប៉ុន",
                        en: "Interest in Japanese language and culture",
                    },
                    {
                        kh: "ចេះភាសាអង់គ្លេសមូលដ្ឋាន",
                        en: "Basic English proficiency",
                    },
                ],
            },
            {
                id: "translation",
                kind: "department",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ការបកប្រែ និងការបកស្រាយ",
                    en: "Department of Translation & Interpreting",
                },
                category: {
                    kh: "ភាសា",
                    en: "Languages",
                },
                logo: "/images/IFL-logo.png",
                requirements: [
                    {
                        kh: "ចេះភាសាបរទេសយ៉ាងតិចមួយកម្រិត B1",
                        en: "At least one foreign language at B1 level",
                    },
                    {
                        kh: "មានសមត្ថភាពស្តាប់ និងសរសេរភាសាបានល្អ",
                        en: "Strong listening and writing skills",
                    },
                    {
                        kh: "បរិញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII)",
                        en: "High school diploma (BacII)",
                    },
                ],
            },
        ],
    },
];
