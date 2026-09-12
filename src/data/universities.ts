/** Language-prefixed field map, e.g. { kh: "...", en: "..." }. */
export interface NamespacedText {
  kh: string;
  en: string;
}

export interface Department {
  id: string;
  name: NamespacedText;
  category: NamespacedText;
  logo: string;
  requirements: NamespacedText[];
}

export interface University {
  id: string;
  name: NamespacedText;
  description: NamespacedText;
  logo: string;
  website?: string;
  address?: NamespacedText;
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
    departments: [
      {
        id: "gic",
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
    ],
  },
  {
    id: "usha",
    name: {
      kh: "សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល (សាលាក្រហម)",
      en: "University of Health Sciences",
    },
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
    departments: [],
  },
  {
    id: "rupp",
    name: {
      kh: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
      en: "Royal University of Phnom Penh",
    },
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
    departments: [],
  },
  {
    id: "ifl",
    name: {
      kh: "វិទ្យាស្ថានភាសាបរទេស",
      en: "Institute of Foreign Languages",
    },
    description: {
      kh: "វិទ្យាស្ថានភាសាបរទេស (IFL) ជាផ្នែកមួយនៃ RUPP ជាវិទ្យាស្ថានឈានមុខគេរបស់កម្ពុជាសម្រាប់ការបណ្តុះបណ្តាលភាសា និងការសិក្សាអន្តរជាតិ។",
      en: "The Institute of Foreign Languages (IFL), part of RUPP, is Cambodia's leading institute for language and international studies training.",
    },
    logo: "/images/IFL-logo.png",
    website: "ifl.rupp.edu.kh",
    address: {
      kh: "រាជធាឨភ្នំពេញ កម្ពុជា",
      en: "Phnom Penh, Cambodia",
    },
    departments: [],
  },
];
