// data/academic.ts
// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH.
//
// Every university, faculty, department, sub-department, requirement and
// curriculum block lives here exactly once. All other data modules
// (facultyRows, unitRows, curriculumBlockRows, catalog lists) are DERIVED
// from this file via the helper functions at the bottom.
//
// Do NOT create parallel data files that re-declare these entities.
// If you need a new view, add a helper — not a new file.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Shared primitive types ─────────────────────────────────────────────────

export interface NamespacedText {
    kh: string;
    en: string;
}

/** What a Unit is at its own level. */
export type UnitKind = "faculty" | "department" | "sub-department" | "foundation";

/** A single curriculum block, rendered as one card. */
export interface CurriculumBlock {
    badgeText: string;
    badgeBg?: string;
    title: string;
    englishTitle?: string;
    credits: string;
    description: string;
    courses: string[];
    specialBadge?: string;
}

/** A group of curriculum blocks with its own heading. */
export interface CurriculumSection {
    headingKh: string;
    headingEn: string;
    bannerText?: string;
    blocks: CurriculumBlock[];
}

/**
 * One card of the facilities strip. Optional on a unit: a leaf department that
 * has no labs of its own inherits its faculty's, and a university with no
 * facilities anywhere simply omits the whole section.
 */
export interface Facility {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    image: string;
}

/** How to reach the admissions desk. Every field is optional. */
export interface UniversityContact {
    phone?: string;
    email?: string;
    telegram?: string;
}

/** The fact row of the hero. Free text, already formatted for display. */
export interface UniversityStats {
    students?: string;
    tuition?: string;
    established?: string;
}

// ─── The recursive Unit ─────────────────────────────────────────────────────

export interface Unit {
    id: string;
    kind: UnitKind;
    name: NamespacedText;
    category: NamespacedText;
    logo?: string;
    requirements: NamespacedText[];
    /** Inline curriculum — replaces the separate academicCurriculum.ts file. */
    curriculum?: CurriculumSection;
    /** Labs and centres, inherited by child units that declare none. */
    facilities?: Facility[];
    /** Recursive children. Omit for leaf units. */
    units?: Unit[];
}

export interface University {
    id: string;
    name: NamespacedText;
    universityType: NamespacedText;
    universityCategory: NamespacedText;
    description: NamespacedText;
    logo?: string;
    website?: string;
    address?: NamespacedText;
    embedMapUrl?: string;
    contact?: UniversityContact;
    stats?: UniversityStats;
    /** Top-level units (faculties, departments, foundation years…). */
    units: Unit[];
}

// ─────────────────────────────────────────────────────────────────────────────
// THE DATA
// ─────────────────────────────────────────────────────────────────────────────

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
            kh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (ITC) ជាសាលាវិស្វកម្មសាធារណៈឈានមុខគេនៅកម្ពុជា...",
            en: "The Institute of Technology of Cambodia (ITC) is the leading public engineering school in Cambodia...",
        },
        logo: "/images/ITC-logo.png",
        website: "itc.edu.kh",
        address: {
            kh: "វិថីសហព័ន្ធរុស្សី ខណ្ឌទួលគោក រាជធានីភ្នំពេញ",
            en: "Russian Federation Blvd., Toul Kork District, Phnom Penh",
        },
        embedMapUrl: "https://www.google.com/maps/embed?...",
        contact: {
            phone: "(+855) 23 880 370",
            email: "info@itc.edu.kh",
        },
        stats: {
            students: "12,000+ Students",
            tuition: "$600 - $850 / ឆ្នាំ (Year)",
            established: "Est. 1964 • ៦០ ឆ្នាំនៃឧត្តមភាព",
        },
        units: [
            // ─────────────────────────────────────────────────────────────
            // FACULTY OF ENGINEERING
            // ─────────────────────────────────────────────────────────────
            {
                id: "foe",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យវិស្វកម្ម",
                    en: "Faculty of Engineering",
                },
                category: { kh: "វិស្វកម្ម", en: "Engineering" },
                logo: "/images/FOE-logo.png",
                requirements: [],

                // Faculty-level facilities, inherited by every department below
                // that declares none of its own.
                facilities: [
                    {
                        id: "foe-ai",
                        title: "AI & HPC",
                        subtitle: "Computing Lab",
                        description:
                            "បំពាក់ដោយ GPU Clusters សម្រាប់ការសិក្សា Deep Learning និងការសរសេរវប្បធម៌ AI ជាដើម។",
                        image:
                            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
                    },
                    {
                        id: "foe-robotics",
                        title: "Robotics & IoT",
                        subtitle: "Arena",
                        description: "ទីលានសាកល្បង Autonomous Drones, Robot arms និង Sensor IoT ផ្សេងៗ។",
                        image:
                            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                    },
                    {
                        id: "foe-cloud",
                        title: "Cloud Sandbox",
                        subtitle: "(AWS/GCP)",
                        description:
                            "អនុញ្ញាតឱ្យនិស្សិតប្រើប្រាស់ Cloud Credits ដើម្បីរៀនសូត្រ និង Deploy Web/App ជាក់លាក់។",
                        image:
                            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
                    },
                ],

                // Faculty-level overview curriculum
                curriculum: {
                    headingKh: "កម្មវិធីសិក្សា & មុខជំនាញស្នូល",
                    headingEn: "Academic Curriculum & Specialization Milestones (140 Credits Total)",
                    bannerText: "Practical Labs: 680 Hours",
                    blocks: [
                        {
                            badgeText: "Year 1–2",
                            badgeBg: "bg-[#1E293B]",
                            title: "មូលដ្ឋានគ្រឹះវិស្វកម្ម & ក្បួនដោះស្រាយ",
                            englishTitle: "(Foundation & Algorithms)",
                            credits: "60 Credits",
                            description: "ផ្តោតលើគ្រឹះវិស្វកម្ម និងក្បួនដោះស្រាយ...",
                            courses: [
                                "C / C++ Programming",
                                "Data Structures & Algorithms",
                                "Engineering Calculus I & II",
                                "Discrete Mathematics",
                                "Digital Logic Systems",
                            ],
                        },
                        {
                            badgeText: "Year 3",
                            badgeBg: "bg-[#0284C7]",
                            title: "បច្ចេកវិទ្យាកម្រិតខ្ពស់",
                            englishTitle: "(Advanced Software & Cloud DevOps)",
                            credits: "40 Credits",
                            description: "អភិវឌ្ឍជំនាញ Software Architecture...",
                            courses: [
                                "Machine Learning Basics",
                                "Relational & NoSQL Databases",
                                "Cloud Computing & Docker",
                                "Mobile & Web Architectures",
                                "Computer Networks & Security",
                            ],
                        },
                        {
                            badgeText: "Year 4–5",
                            badgeBg: "bg-[#0F4C81]",
                            title: "ជំនាញ AI & ការអនុវត្តជាក់ស្តែង",
                            englishTitle: "(AI Track & Capstone)",
                            credits: "40 Credits + Thesis",
                            description: "ផ្តោតលើបច្ចេកវិទ្យាកម្រិតខ្ពស់ AI...",
                            courses: [
                                "Deep Learning & Neural Nets",
                                "Natural Language Processing (NLP)",
                                "Computer Vision & Robotics",
                                "Cybersecurity & Cryptography",
                            ],
                            specialBadge: "6-Month Industry Internship",
                        },
                    ],
                },

                units: [
                    // ─────────────────────────────────────────────────────
                    // GEE — Department of Electrical Power Engineering
                    // (a "self department" — has its own sub-departments)
                    // ─────────────────────────────────────────────────────
                    {
                        id: "gee",
                        kind: "department",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មអគ្គិសនី (GEE)",
                            en: "Department of Electrical Power Engineering (GEE)",
                        },
                        category: {
                            kh: "វិស្វកម្មអគ្គិសនី",
                            en: "Electrical Power Engineering",
                        },
                        logo: "/images/GEE-logo.png",
                        requirements: [
                            {
                                kh: "មានចំណេះដឹងល្អពីគ្រប់គ្រងអគ្គិសនី",
                                en: "Strong knowledge in electrical power systems",
                            },
                            {
                                kh: "យល់ដឹងពីការរចនាក្រដាសអគ្គិសនី",
                                en: "Understanding of electrical power distribution",
                            },
                        ],
                        curriculum: {
                            headingKh: "កម្មវិធីសិក្សា ដេប៉ាតឺម៉ង់វិស្វកម្មអគ្គិសនី",
                            headingEn: "Curriculum — Department of Electrical Power Engineering (GEE)",
                            bannerText: "Practical Labs: 320 Hours",
                            blocks: [
                                {
                                    badgeText: "Core",
                                    badgeBg: "bg-[#0F4C81]",
                                    title: "មូលដ្ឋានវិស្វកម្មអគ្គិសនី",
                                    englishTitle: "(Electrical Power Foundations)",
                                    credits: "45 Credits",
                                    description: "សិក្សាពីគោលការណ៍អគ្គិសនី ការបង្កើត និងការចែកចាយថាមពលអគ្គិសនី។",
                                    courses: [
                                        "Circuit Analysis",
                                        "Electromagnetic Fields",
                                        "Power Systems I",
                                        "Electrical Machines",
                                        "Control Systems",
                                    ],
                                },
                            ],
                        },
                        units: [
                            {
                                id: "ams",
                                kind: "sub-department",
                                name: {
                                    kh: "ដេប៉ាតឺម៉ង់បច្ចេកវិទ្យាការិយាល័យ (AMS)",
                                    en: "Department of Automation and Mechatronics Systems (AMS)",
                                },
                                category: {
                                    kh: "បច្ចេកវិទ្យាការិយាល័យ",
                                    en: "Automation and Mechatronics",
                                },
                                logo: "/images/AMS-logo.png",
                                requirements: [
                                    {
                                        kh: "ចេះដឹងពី PLC និង SCADA",
                                        en: "Proficient in PLC and SCADA",
                                    },
                                    {
                                        kh: "មានជំនាញក្នុងការរចនាស្ថាបត្យកម្ម",
                                        en: "Software engineering skills",
                                    },
                                ],
                                curriculum: {
                                    headingKh: "កម្មវិធីសិក្សា ដេប៉ាតឺម៉ង់បច្ចេកវិទ្យាការិយាល័យ",
                                    headingEn: "Curriculum — Department of Automation and Mechatronics Systems (AMS)",
                                    bannerText: "Practical Labs: 360 Hours",
                                    blocks: [
                                        {
                                            badgeText: "Core",
                                            badgeBg: "bg-[#0F4C81]",
                                            title: "ស្វ័យប្រវត្តិកម្ម និងមេកាត្រូនិក",
                                            englishTitle: "(Automation & Mechatronics)",
                                            credits: "50 Credits",
                                            description: "សិក្សាពី PLC, SCADA និងការរចនាប្រព័ន្ធស្វ័យប្រវត្តិ។",
                                            courses: [
                                                "PLC Programming",
                                                "SCADA Systems",
                                                "Robotics Fundamentals",
                                                "Industrial Control",
                                            ],
                                        },
                                    ],
                                },
                            },
                            {
                                id: "gic",
                                kind: "sub-department",
                                name: {
                                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មព័ត៌មាន និងទំនាក់ទំនង (GIC)",
                                    en: "Department of Information and Communication Engineering (GIC)",
                                },
                                category: {
                                    kh: "វិស្វកម្មព័ត៌មាន",
                                    en: "Information and Communication Engineering",
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
                                curriculum: {
                                    headingKh: "កម្មវិធីសិក្សា ដេប៉ាតឺម៉ង់វិស្វកម្មព័ត៌មាន និងទំនាក់ទំនង",
                                    headingEn:
                                        "Curriculum — Department of Information and Communication Engineering (GIC)",
                                    bannerText: "Practical Labs: 480 Hours",
                                    blocks: [
                                        {
                                            badgeText: "Year 1–2",
                                            badgeBg: "bg-[#1E293B]",
                                            title: "មូលដ្ឋានគ្រឹះ ICT",
                                            englishTitle: "(ICT Foundations)",
                                            credits: "60 Credits",
                                            description: "ណែនាំអំពីគ្រឹះកុំព្យូទ័រ បណ្តាញ និងការសរសេរកម្មវិធី។",
                                            courses: [
                                                "Programming Fundamentals",
                                                "Computer Networks",
                                                "Web Frontend Technologies",
                                                "Database Systems",
                                            ],
                                        },
                                        {
                                            badgeText: "Year 3–4",
                                            badgeBg: "bg-[#0284C7]",
                                            title: "ប្រព័ន្ធព័ត៌មានកម្រិតខ្ពស់",
                                            englishTitle: "(Advanced Information Systems)",
                                            credits: "45 Credits + Thesis",
                                            description:
                                                "អភិវឌ្ឍជំនាញ API, Cloud, និងស្ថាបត្យកម្មប្រព័ន្ធព័ត៌មានទំនើប។",
                                            courses: [
                                                "REST & GraphQL APIs",
                                                "Cloud Architecture",
                                                "Microservices",
                                                "Information Security",
                                            ],
                                            specialBadge: "6-Month Industry Internship",
                                        },
                                    ],
                                },
                            },
                            {
                                id: "gtr",
                                kind: "sub-department",
                                name: {
                                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មទូរគមនាគមន៍ និងបណ្តាញ (GTR)",
                                    en: "Department of Telecommunication and Network Engineering (GTR)",
                                },
                                category: {
                                    kh: "វិស្វកម្មទូរគមនាគមន៍",
                                    en: "Telecommunication and Network Engineering",
                                },
                                logo: "/images/GTR-logo.png",
                                requirements: [
                                    {
                                        kh: "យល់ដឹងពីបណ្តាញកុំព្យូទ័រ",
                                        en: "Understanding of computer networks",
                                    },
                                    {
                                        kh: "មានជំនាញក្នុងវិស្វកម្មទូរគមនាគមន៍",
                                        en: "Skills in telecommunication engineering",
                                    },
                                ],
                                curriculum: {
                                    headingKh: "កម្មវិធីសិក្សា ដេប៉ាតឺម៉ង់វិស្វកម្មទូរគមនាគមន៍ និងបណ្តាញ",
                                    headingEn:
                                        "Curriculum — Department of Telecommunication and Network Engineering (GTR)",
                                    bannerText: "Practical Labs: 400 Hours",
                                    blocks: [
                                        {
                                            badgeText: "Core",
                                            badgeBg: "bg-[#0F4C81]",
                                            title: "វិស្វកម្មទូរគមនាគមន៍",
                                            englishTitle: "(Telecommunication Engineering)",
                                            credits: "50 Credits",
                                            description: "សិក្សាពីបណ្តាញ ការបញ្ជូនសញ្ញា និងប្រព័ន្ធទូរគមនាគមន៍ទំនើប។",
                                            courses: [
                                                "Signals & Systems",
                                                "Wireless Communications",
                                                "Network Protocols",
                                                "Optical Networks",
                                            ],
                                        },
                                    ],
                                },
                            },
                        ],
                    },

                    // ─────────────────────────────────────────────────────
                    // GAR — Automation & Robotics
                    // ─────────────────────────────────────────────────────
                    {
                        id: "gar",
                        kind: "department",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់ស្វ័យប្រវត្តិកម្ម និងមនុស្សយន្ត (GAR)",
                            en: "Department of Automation and Robotics Engineering (GAR)",
                        },
                        category: {
                            kh: "ស្វ័យប្រវត្តិកម្ម",
                            en: "Automation and Robotics",
                        },
                        logo: "/images/GAR-logo.png",
                        requirements: [],
                    },

                    // ─────────────────────────────────────────────────────
                    // GMC — Mechanical Engineering
                    // ─────────────────────────────────────────────────────
                    {
                        id: "gmc",
                        kind: "department",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មមេកានិកខ្មែរ (GMC)",
                            en: "Department of Mechanical Engineering (GMC)",
                        },
                        category: {
                            kh: "វិស្វកម្មមេកានិក",
                            en: "Mechanical Engineering",
                        },
                        logo: "/images/GMC-logo.png",
                        requirements: [],
                    },

                    // ─────────────────────────────────────────────────────
                    // GCE — Civil Engineering
                    // ─────────────────────────────────────────────────────
                    {
                        id: "gce",
                        kind: "department",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មស្ថាបត្យកម្ម (GCE)",
                            en: "Department of Civil Engineering (GCE)",
                        },
                        category: {
                            kh: "វិស្វកម្មស្ថាបត្យកម្ម",
                            en: "Civil Engineering",
                        },
                        logo: "/images/GCE-logo.png",
                        requirements: [],
                    },
                ],
            },
        ],
    },

    // ═════════════════════════════════════════════════════════════════════
    // MOCK UNIVERSITY — Institute of New Technology.
    //
    // Kept in the same file, and in the same shape, as the ITC entry above so
    // every helper and every page is exercised by two universities instead of
    // one. It deliberately covers the cases the ITC tree does not:
    //   · two faculties (the ITC entry has one),
    //   · a department with no curriculum of its own, which must inherit its
    //     faculty's through getCurriculumFor,
    //   · a leaf with no facilities, inheriting through getFacilitiesFor,
    //   · a three-level chain (faculty → department → sub-department) that is
    //     deeper than GEE, and a sub-department with no children of its own.
    // ═════════════════════════════════════════════════════════════════════
    {
        id: "intec",
        name: {
            kh: "សាលាតិចណូជាតិ (សាលាតិចណូខ្មែរ)",
            en: "National Institute of Technology (Cambodia)",
        },
        universityType: { kh: "សាធារណៈ", en: "Public" },
        universityCategory: { kh: "បច្ចេកវិទ្យា", en: "Technology" },
        description: {
            kh: "សាលាតិចណូជាតិ គឺជាគ្រឹះស្ថានឧត្តមសិក្សាបច្ចេកវិទ្យាទូរគេរ ដែលបង្កើតបុគ្គលចេះជំនាញបច្ចេកវិទ្យាសម្រាប់កសារពាណិជ្ជកម្មនាំមុខវិជ្ជាផ្នែកទីក្រុងថ្មី។",
            en: "The National Institute of Technology trains engineers and technologists for the digital economy and the smart cities of the region.",
        },
        logo: "/images/INTEC-logo.png",
        website: "intec.edu.kh",
        address: {
            kh: "ផ្លូវជាតិលេខ ៥ ភូមិចំការដូង ខណ្ឌទួលគោក រាជធានីភ្នំពេញ",
            en: "National Road 5, Chamkar Dong, Toul Kork District, Phnom Penh",
        },
        embedMapUrl: "https://www.google.com/maps/embed?...",
        contact: {
            phone: "(+855) 23 883 512",
            email: "admission@intec.edu.kh",
        },
        stats: {
            students: "4,800+ Students",
            tuition: "$520 - $700 / ឆ្នាំ (Year)",
            established: "Est. 1968 • ៥៨ ឆ្នាំនៃឧត្តមភាព",
        },
        units: [
            // ─────────────────────────────────────────────────────────────
            // FACULTY OF INFORMATION TECHNOLOGY
            // ─────────────────────────────────────────────────────────────
            {
                id: "fit",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យបច្ចេកវិទ្យាព័ត៌មាន",
                    en: "Faculty of Information Technology",
                },
                category: { kh: "ព័ត៌មាន", en: "Information Technology" },
                logo: "/images/FIT-logo.png",
                requirements: [],

                curriculum: {
                    headingKh: "កម្មវិធីសិក្សា មហាវិទ្យាល័យបច្ចេកវិទ្យាព័ត៌មាន",
                    headingEn: "Faculty Curriculum — Information Technology (120 Credits Total)",
                    bannerText: "Practical Labs: 420 Hours",
                    blocks: [
                        {
                            badgeText: "Year 1–2",
                            badgeBg: "bg-[#1E293B]",
                            title: "មូលដ្ឋានបច្ចេកវិទ្យាព័ត៌មាន",
                            englishTitle: "(Computing Foundations)",
                            credits: "60 Credits",
                            description:
                                "គ្រឹះកុឆ្រៀវ ប្រភពទិន្នន័យ និងបណ្តាញកុំព្យូទ័រ ដើម្បីបង្កើតមូលដ្ឋានរឹងមាំសម្រាប់របរខាងក្រោយ។",
                            courses: [
                                "Programming Fundamentals",
                                "Digital Systems",
                                "Database Systems",
                                "Computer Networks",
                            ],
                        },
                        {
                            badgeText: "Year 3–4",
                            badgeBg: "bg-[#0284C7]",
                            title: "បច្ចេកវិទ្យាព័ត៌មានអនុវត្ត",
                            englishTitle: "(Applied Information Technology)",
                            credits: "60 Credits + Thesis",
                            description:
                                "បង្កើតប្រព័ន្ធព័ត៌មាន និងសហគ្រាប់គ្រប់គ្រងទិន្នន័យសម្រាប់អាជីវភាពក្នុងតាំងជាតិ។",
                            courses: [
                                "Enterprise Systems",
                                "Business Intelligence",
                                "IT Security",
                                "Capstone Project",
                            ],
                            specialBadge: "3-Month Industry Internship",
                        },
                    ],
                },

                facilities: [
                    {
                        id: "fit-cloud",
                        title: "Cloud & Data Lab",
                        subtitle: "(private cloud)",
                        description:
                            "ម៉ាស៊ីនមេ និងឃ្លាំងទិន្នន័យសម្រាប់សិក្សាប្រព័ន្ធព័ត៌មាន និង AI ថ្នាក់វិជ្ជា។",
                        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
                    },
                    {
                        id: "fit-cyber",
                        title: "Cyber Range",
                        subtitle: "(training)",
                        description:
                            "បរិយាកាសសុវភាពព័ត៌មានសម្រាប់ធ្វើត្រាងការវាយបន្ទាន់ក្នុងបរិយាកាសដែលគ្រប់គ្រង។",
                        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
                    },
                ],

                units: [
                    // ─────────────────────────────────────────────────
                    // ISE — Information Systems Engineering.
                    // Declares no curriculum of its own: the page must fall
                    // back to the faculty's, through getCurriculumFor.
                    // ─────────────────────────────────────────────────
                    {
                        id: "ise",
                        kind: "department",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មប្រព័ន្ធព័ត៌មាន (ISE)",
                            en: "Department of Information Systems Engineering (ISE)",
                        },
                        category: {
                            kh: "ប្រព័ន្ធព័ត៌មាន",
                            en: "Information Systems",
                        },
                        logo: "/images/ISE-logo.png",
                        requirements: [
                            {
                                kh: "ចេះដឹងក្រប់ជាតិពន្ធដើម្បីបង្កើតប្រព័ន្ធចំណោះស្រាយ",
                                en: "Grounded in national statistics and problem solving",
                            },
                            {
                                kh: "មានចំណេះដឹងភាសាអង់គ្លេសសម្រាប់ការងារប្រព័ន្ធ",
                                en: "English skills for system documentation",
                            },
                        ],
                        units: [
                            {
                                id: "isd",
                                kind: "sub-department",
                                name: {
                                    kh: "ដេប៉ាតឺម៉ង់ប្រព័ន្ធទិន្នន័យ (ISD)",
                                    en: "Department of Data Systems (ISD)",
                                },
                                category: {
                                    kh: "ទិន្នន័យ",
                                    en: "Data Systems",
                                },
                                logo: "/images/ISD-logo.png",
                                requirements: [
                                    {
                                        kh: "ជំនាញក្នុងម៉ាស៊ីនស្ថាប់ទិន្នន័យចំរើយ",
                                        en: "Skills in data-centre engineering",
                                    },
                                ],
                                curriculum: {
                                    headingKh: "កម្មវិធីសិក្សា ដេប៉ាតឺម៉ង់ប្រព័ន្ធទិន្នន័យ",
                                    headingEn: "Curriculum — Department of Data Systems (ISD)",
                                    bannerText: "Practical Labs: 300 Hours",
                                    blocks: [
                                        {
                                            badgeText: "Core",
                                            badgeBg: "bg-[#0F4C81]",
                                            title: "ប្រព័ន្ធទិន្នន័យ",
                                            englishTitle: "(Data Systems)",
                                            credits: "45 Credits",
                                            description:
                                                "ការរចនាឃ្លាំងទិន្នន័យ និងប្រព័ន្ធខ្សែអ្នកការវាយតម្លៃធំទូរគេរ។",
                                            courses: [
                                                "Data Modelling",
                                                "Data Engineering",
                                                "Analytics Platforms",
                                                "Big Data Storage",
                                            ],
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },

            // ─────────────────────────────────────────────────────────────
            // FACULTY OF ELECTRICAL ENGINEERING
            // ─────────────────────────────────────────────────────────────
            {
                id: "fee",
                kind: "faculty",
                name: {
                    kh: "មហាវិទ្យាល័យវិស្វកម្មអគ្គិសនី",
                    en: "Faculty of Electrical Engineering",
                },
                category: { kh: "អគ្គិសនី", en: "Electrical Engineering" },
                logo: "/images/FEE-logo.png",
                requirements: [],
                units: [
                    {
                        id: "fep",
                        kind: "department",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់បច្ចេកវិទ្យាអគ្គិសនីពាណិជ្ជកម្ម (FEP)",
                            en: "Department of Power Engineering Technology (FEP)",
                        },
                        category: {
                            kh: "អគ្គិសនីពាណិជ្ជកម្ម",
                            en: "Power Engineering",
                        },
                        logo: "/images/FEP-logo.png",
                        requirements: [
                            {
                                kh: "ចេះដឹងសិក្សាផ្លូវអគ្គិសនីទំនើប និងថាមថោម",
                                en: "Power systems and energy study",
                            },
                        ],
                        curriculum: {
                            headingKh: "កម្មវិធីសិក្សា ដេប៉ាតឺម៉ង់បច្ចេកវិទ្យាអគ្គិសនីពាណិជ្ជកម្ម",
                            headingEn: "Curriculum — Department of Power Engineering Technology (FEP)",
                            bannerText: "Practical Labs: 260 Hours",
                            blocks: [
                                {
                                    badgeText: "Core",
                                    badgeBg: "bg-[#0F4C81]",
                                    title: "ថាមអគ្គិសនី",
                                    englishTitle: "(Electrical Energy)",
                                    credits: "40 Credits",
                                    description:
                                        "សិក្សាពីបណ្តាញ ថាមថោម និងការបង្កើតថាមពលពីមេដែរ និងពាណិជ្ជកម្ម.",
                                    courses: [
                                        "Electrical Circuits",
                                        "Power Distribution",
                                        "Renewable Integration",
                                        "Grid Operations",
                                    ],
                                },
                            ],
                        },
                        // Own facilities: these shadow the faculty's, which the
                        // ISE department above inherits instead.
                        facilities: [
                            {
                                id: "fep-lab",
                                title: "High-Voltage Lab",
                                subtitle: "(HV test bay)",
                                description:
                                    "បន្ទប់សាកល្បងតង់ស្តង់ខ្ពស់ សម្រាប់វាយតម្លៃបណ្តាញអគ្គិសនីនិងការការពារបណ្តាញ។",
                                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// DERIVED VIEWS — every helper walks the single tree. No duplication.
// ─────────────────────────────────────────────────────────────────────────────

// ── Tree walking ────────────────────────────────────────────────────────────

/** Depth-first walk over every Unit in a university. */
export function walkUnits(uni: University): Unit[] {
    const out: Unit[] = [];
    const visit = (u: Unit) => {
        out.push(u);
        u.units?.forEach(visit);
    };
    uni.units.forEach(visit);
    return out;
}

/** Find a unit by id within a university (any depth). */
export function findUnit(uni: University, unitId: string): Unit | undefined {
    return walkUnits(uni).find(u => u.id === unitId);
}

/** Get the direct children of a unit (empty array for leaves). */
export function getChildren(unit: Unit): Unit[] {
    return unit.units ?? [];
}

/**
 * Every unit below `unit`, depth-first. The program list of a faculty is its
 * departments *and* their sub-departments: a sub-department is a program a
 * student applies to, so a list built from `getChildren` alone left GIC, AMS
 * and GTR out of the programs page entirely — reachable only as a code chip
 * under their parent, and unfindable by search.
 */
export function getDescendants(unit: Unit): Unit[] {
    return (unit.units ?? []).flatMap(child => [child, ...getDescendants(child)]);
}

/** Get the parent chain of a unit (root first). */
export function getAncestors(uni: University, unitId: string): Unit[] {
    const chain: Unit[] = [];
    const visit = (u: Unit, path: Unit[]): boolean => {
        const next = [...path, u];
        if (u.id === unitId) {
            chain.push(...next);
            return true;
        }
        return (u.units ?? []).some(child => visit(child, next));
    };
    uni.units.some(u => visit(u, []));
    return chain;
}

// ── Lookups ─────────────────────────────────────────────────────────────────

export function getUniversity(id: string): University | undefined {
    return universities.find(u => u.id === id);
}

/** All units in a university as a flat list, with parentId attached. */
export interface FlatUnit extends Unit {
    parentId: string | null;
    universityId: string;
}

export function getFlatUnits(universityId: string): FlatUnit[] {
    const uni = getUniversity(universityId);
    if (!uni) return [];

    const out: FlatUnit[] = [];
    const visit = (u: Unit, parentId: string | null) => {
        out.push({ ...u, parentId, universityId });
        u.units?.forEach(child => visit(child, u.id));
    };
    uni.units.forEach(u => visit(u, null));
    return out;
}

/**
 * Walk a unit's ancestor chain from the unit itself upwards and return the
 * first value `select` produces. This is the one place the "inherit from the
 * parent when the child says nothing" rule lives, so curriculum and facilities
 * resolve the same way instead of each re-implementing the walk.
 */
function resolveInherited<T>(
    uni: University,
    unitId: string,
    select: (unit: Unit) => T | undefined,
): T | undefined {
    const chain = getAncestors(uni, unitId).reverse(); // nearest first
    for (const unit of chain) {
        const value = select(unit);
        // An empty array counts as "not declared": a parent that lists no
        // facilities should not shadow a grandparent that lists three.
        if (value !== undefined && (!Array.isArray(value) || value.length > 0)) {
            return value;
        }
    }
    return undefined;
}

/**
 * Resolve the curriculum for a unit — walks up the ancestor chain
 * and returns the nearest curriculum found. This is what lets a
 * department inherit its faculty's curriculum when it has none of
 * its own (the "fallback" behavior you wanted earlier).
 */
export function getCurriculumFor(universityId: string, unitId: string): CurriculumSection | undefined {
    const uni = getUniversity(universityId);
    if (!uni) return undefined;
    return resolveInherited(uni, unitId, unit => unit.curriculum);
}

/** Facilities for a unit, inherited the same way its curriculum is. */
export function getFacilitiesFor(universityId: string, unitId: string): Facility[] {
    const uni = getUniversity(universityId);
    if (!uni) return [];
    return resolveInherited(uni, unitId, unit => unit.facilities) ?? [];
}

/** The faculty a unit belongs to, however deep the unit sits. */
export function getFacultyFor(universityId: string, unitId: string): Unit | undefined {
    const uni = getUniversity(universityId);
    if (!uni) return undefined;
    const faculty = getAncestors(uni, unitId).find(unit => unit.kind === "faculty");
    return faculty ?? getAncestors(uni, unitId)[0];
}

// ── API-shaped flat exports ────────────────────────────────────────────────

export interface UniversityRow {
    id: string;
    name_en: string;
    name_kh: string;
    university_type_en: string;
    university_type_kh: string;
    university_category_en: string;
    university_category_kh: string;
    logo: string | null;
    website: string | null;
    address_en: string | null;
    address_kh: string | null;
    embed_map_url: string | null;
    contact_phone: string | null;
    contact_email: string | null;
    stat_students: string | null;
    stat_tuition: string | null;
}

export interface UnitRow {
    id: string;
    university_id: string;
    parent_id: string | null;
    kind: UnitKind;
    name_en: string;
    name_kh: string;
    category_en: string;
    category_kh: string;
    logo: string | null;
    requirements: NamespacedText[];
}

export interface CurriculumBlockRow {
    owner_id: string;
    university_id: string;
    order: number;
    badge_text: string;
    badge_bg: string | null;
    title_kh: string;
    title_en: string | null;
    credits: string;
    description_kh: string;
    courses: string[];
    special_badge: string | null;
}

/** Universities as flat rows. */
export const universityRows: UniversityRow[] = universities.map(u => ({
    id: u.id,
    name_en: u.name.en,
    name_kh: u.name.kh,
    university_type_en: u.universityType.en,
    university_type_kh: u.universityType.kh,
    university_category_en: u.universityCategory.en,
    university_category_kh: u.universityCategory.kh,
    logo: u.logo ?? null,
    website: u.website ?? null,
    address_en: u.address?.en ?? null,
    address_kh: u.address?.kh ?? null,
    embed_map_url: u.embedMapUrl ?? null,
    contact_phone: u.contact?.phone ?? null,
    contact_email: u.contact?.email ?? null,
    stat_students: u.stats?.students ?? null,
    stat_tuition: u.stats?.tuition ?? null,
}));

/** Every unit across every university as flat rows. */
export const unitRows: UnitRow[] = universities.flatMap(uni =>
    getFlatUnits(uni.id).map(u => ({
        id: u.id,
        university_id: uni.id,
        parent_id: u.parentId,
        kind: u.kind,
        name_en: u.name.en,
        name_kh: u.name.kh,
        category_en: u.category.en,
        category_kh: u.category.kh,
        logo: u.logo ?? null,
        requirements: u.requirements,
    })),
);

/** Every curriculum block across every unit as flat rows. */
export const curriculumBlockRows: CurriculumBlockRow[] = universities.flatMap(uni =>
    getFlatUnits(uni.id).flatMap(unit =>
        (unit.curriculum?.blocks ?? []).map((block, order) => ({
            owner_id: unit.id,
            university_id: uni.id,
            order,
            badge_text: block.badgeText,
            badge_bg: block.badgeBg ?? null,
            title_kh: block.title,
            title_en: block.englishTitle ?? null,
            credits: block.credits,
            description_kh: block.description,
            courses: block.courses,
            special_badge: block.specialBadge ?? null,
        })),
    ),
);

export interface FacilityRow {
    owner_id: string;
    university_id: string;
    title: string;
    subtitle: string | null;
    description: string;
    image: string;
}

/**
 * Facilities as flat rows. Only the units that *declare* a list appear here —
 * inheritance is a render-time rule of this file, not a stored fact, so a
 * consumer replaying these rows must walk up the same way `getFacilitiesFor`
 * does.
 */
export const facilityRows: FacilityRow[] = universities.flatMap(uni =>
    getFlatUnits(uni.id).flatMap(unit =>
        (unit.facilities ?? []).map(facility => ({
            owner_id: unit.id,
            university_id: uni.id,
            title: facility.title,
            subtitle: facility.subtitle ?? null,
            description: facility.description,
            image: facility.image,
        })),
    ),
);