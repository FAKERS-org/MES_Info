/**
 * Department detail page (`/explore-universities/[university]/[department]`).
 *
 * UI content only — one hardcoded sample used as a placeholder while the
 * department API is unbaked. It is *not* the `Department` entity: that type
 * and its records live in `./universities`.
 *
 * Text helpers live in `./text`, entity data in `./universities`.
 */
import type { NamespacedText } from "./universities";
import type { IconName } from "@/lib/icons";

export interface DepartmentStat {
  label: NamespacedText;
  value: NamespacedText;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  valueColor?: string;
}

export interface DepartmentIdHeadingData {
  title: NamespacedText;
  subtitle: NamespacedText;
  university: NamespacedText;
  facultyBadge: NamespacedText;
  accreditationBadge: NamespacedText;
  badges: NamespacedText[];
  logo: string;
  logoAlt: NamespacedText;
  stats: DepartmentStat[];
  actions: {
    primary: { label: NamespacedText; icon: IconName };
    secondary: { label: NamespacedText; icon: IconName }[];
  };
}

export interface SyllabusSection {
  year: NamespacedText;
  title: NamespacedText;
  credits: NamespacedText;
  description: NamespacedText;
  tags: string[];
  badge?: { label: NamespacedText; color: string };
}

export interface CourseSyllabusData {
  header: {
    title: NamespacedText;
    subtitle: NamespacedText;
    highlight: { label: NamespacedText; bg: string; text: string };
  };
  sections: SyllabusSection[];
}

export interface RequirementItem {
  label: NamespacedText;
}

export interface DeadlineItem {
  label: NamespacedText;
  value: NamespacedText;
}

export interface ApplicationConditionData {
  header: { title: NamespacedText };
  requirements: RequirementItem[];
  deadline: DeadlineItem;
}

export interface ScholarshipItem {
  title: NamespacedText;
  discount: NamespacedText;
  description: NamespacedText;
  color: string;
}

export interface ScholarshipBriefData {
  header: {
    title: NamespacedText;
    status: { label: NamespacedText; bg: string; text: string };
  };
  scholarships: ScholarshipItem[];
}

export interface CareerItem {
  title: NamespacedText;
  icon: IconName;
  description: NamespacedText;
  salary: string;
}

export interface CareerPathData {
  /** Copy the card needs that is not part of one job or one partner. */
  labels: { salary: NamespacedText; partners: NamespacedText };
  header: {
    title: NamespacedText;
    subtitle: NamespacedText;
    badge: { label: NamespacedText; bg: string; text: string };
  };
  careers: CareerItem[];
  partners: string[];
}

export interface ContactItem {
  label: NamespacedText;
  value: string;
  icon: IconName;
}

export interface DiscussionCardData {
  header: {
    title: NamespacedText;
    subtitle: NamespacedText;
  };
  description: NamespacedText;
  action: { label: NamespacedText; icon: IconName };
  contacts: ContactItem[];
}

export interface FacilityItem {
  title: NamespacedText;
  image: string;
  description: NamespacedText;
  icon: IconName;
}

export interface FacilityCardData {
  header: {
    title: NamespacedText;
    subtitle: NamespacedText;
  };
  facilities: FacilityItem[];
}

export interface DepartmentPageData {
  heading: DepartmentIdHeadingData;
  syllabus: CourseSyllabusData;
  application: ApplicationConditionData;
  scholarship: ScholarshipBriefData;
  career: CareerPathData;
  discussion: DiscussionCardData;
  facility: FacilityCardData;
}

export const departmentPageData: DepartmentPageData = {
  heading: {
    title: {
      kh: "វិទ្យាសាស្ត្រកុំព្យូទ័រ & AI",
      en: "Computer Science & Artificial Intelligence",
    },
    subtitle: {
      kh: "Computer Science & Artificial Intelligence — Diplôme d'Ingénieur & Bachelor of Science (Faculty of ICT)",
      en: "Computer Science & Artificial Intelligence — Diplôme d'Ingénieur & Bachelor of Science (Faculty of ICT)",
    },
    university: {
      kh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (សាលាតិចណូ)",
      en: "Institute of Technology of Cambodia",
    },
    facultyBadge: {
      kh: "មហាវិទ្យាល័យព័ត៌មាននិងបច្ចេកវិទ្យាទំនាក់ខ្មែរ (FICT)",
      en: "Faculty of Information & Comm. Tech (FICT)",
    },
    accreditationBadge: {
      kh: "ស្គាល់ដោយ MoEYS",
      en: "MoEYS Accredited",
    },
    badges: [
      {
        kh: "\"⏱ វិញ្ញាសារមូលដ្ឋាន\"",
        en: "⏱ Full-time",
      },
      {
        kh: "ស្គាល់ដោយ AUN-QA",
        en: "AUN-QA Certified",
      },
      {
        kh: "Fundamental Foundation",
        en: "Fundamental Foundation",
      },,
    ],
    logo: "/images/ITC-logo.png",
    logoAlt: {
      kh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
      en: "Institute of Technology of Cambodia",
    },
    stats: [
      {
        label: {
          kh: "ថ្លៃសិក្សាប្រចាំឆ្នាំ",
          en: "Annual Tuition",
        },
        value: {
          kh: "$700 / ឆ្នាំ",
          en: "$700 / year",
        },
        icon: "Camera",
        iconBg: "bg-[#e0f2fe]",
        iconColor: "text-[#0284c7]",
      },
      {
        label: {
          kh: "រយៈពេលសិក្សា",
          en: "Study Duration",
        },
        value: {
          kh: "4 - 5 ឆ្នាំ (Ingénieur)",
          en: "4 - 5 years (Ingénieur)",
        },
        icon: "Hourglass",
        iconBg: "bg-[#e0f2fe]",
        iconColor: "text-[#0284c7]",
      },
      {
        label: {
          kh: "អត្រាការងារបន្ទាប់ពីបញ្ចបំព្រឹត្តិបត្រ",
          en: "Employment Rate",
        },
        value: {
          kh: "98.2% Hired",
          en: "98.2% Hired",
        },
        icon: "TrendingUp",
        iconBg: "bg-[#dcfce7]",
        iconColor: "text-[#16a34a]",
        valueColor: "text-[#16a34a]",
      },
      {
        label: {
          kh: "ភាសាបម្រែ",
          en: "Languages",
        },
        value: {
          kh: "Trilingual KH/EN/FR",
          en: "Trilingual KH/EN/FR",
        },
        icon: "Globe",
        iconBg: "bg-[#e0f2fe]",
        iconColor: "text-[#0284c7]",
      },
    ],
    actions: {
      primary: {
        label: {
          kh: "ចុះឈ្មោះចូលរៀន (Apply Now)",
          en: "Apply Now",
        },
        icon: "Send",
      },
      secondary: [
        { label: { kh: "Syllabus PDF", en: "Syllabus PDF" }, icon: "Download" },
        { label: { kh: "Telegram Advisor", en: "Telegram Advisor" }, icon: "Send" },
      ],
    },
  },
  syllabus: {
    header: {
      title: {
        kh: "កម្មវិធីសិក្សា & មុខវិជ្ជាស្រុត",
        en: "Curriculum & Core Specializations",
      },
      subtitle: {
        kh: "សរុប ១៤០ ក្រឡេង",
        en: "140 Credits Total",
      },
      highlight: {
        label: {
          kh: "● បន្ទប់ពិសោធន៍អនុវត្តផ្លូវគ្នា៖ ៦៨០ ម៉ោង",
          en: "● Practical Labs: 680 Hours",
        },
        bg: "bg-blue-50",
        text: "text-blue-700",
      },
    },
    sections: [
      {
        year: {
          kh: "ឆ្នាំទី ១-២",
          en: "Year 1-2",
        },
        title: {
          kh: "មូលដ្ឋានគ្រឹះវិស្វកម្ម & ក្បួនដោះស្រាយ (Foundation & Algorithms)",
          en: "Foundation & Algorithms",
        },
        credits: {
          kh: "៦០ ក្រឡេង",
          en: "60 Credits",
        },
        description: {
          kh: "ដេញដោលទ្រឹស្តីវិទ្យាសាស្ត្រ គណិតវិទ្យា និងរចនាសម្ព័ន្ធទិន្នន័យ (Data Structures & Discrete Math).",
          en: "Covers applied mathematics, calculus, and data structures & discrete math.",
        },
        tags: [
          "C / C++ Programming",
          "Data Structures & Algorithms",
          "Engineering Calculus I & II",
          "Discrete Mathematics",
          "Digital Logic Systems",
        ],
      },
      {
        year: {
          kh: "ឆ្នាំទី ៣",
          en: "Year 3",
        },
        title: {
          kh: "បច្ចេកវិទ្យាកម្រិតខ្ពស់ (Advanced Software & Cloud DevOps)",
          en: "Advanced Software & Cloud DevOps",
        },
        credits: {
          kh: "៤០ ក្រឡេង",
          en: "40 Credits",
        },
        description: {
          kh: "គាំទ្រការអភិវឌ្ឍ Software Architecture ជាង ៣ ឆ្នាំ និងជំនាញ IT កម្រិតខ្ពស់ផ្សេងទៀត។",
          en: "Supports software architecture for 3+ years and other advanced IT skills.",
        },
        tags: [
          "Machine Learning Basics",
          "Relational & NoSQL Databases",
          "Cloud Computing & Docker",
          "Mobile & Web Architectures",
          "Computer Networks & Security",
        ],
      },
      {
        year: {
          kh: "ឆ្នាំទី ៤-៥",
          en: "Year 4-5",
        },
        title: {
          kh: "ជំនាញទំនើប AI & សហគ្រាសជាក់ស្តែង (AI Track & Capstone)",
          en: "AI Track & Capstone",
        },
        credits: {
          kh: "៤០ ក្រឡេង + សារណគន្ទ័វ",
          en: "40 Credits + Thesis",
        },
        description: {
          kh: "ការអនុវត្តជាក់ស្តែង AI ជាក់ស្តែង គម្រោងសិក្សា និងការបង្ហាញស្នាដៃ។",
          en: "Actual AI implementation, study project, and internship presentation.",
        },
        tags: [
          "Deep Learning & Neural Nets",
          "Natural Language Processing (NLP)",
          "Computer Vision & Robotics",
          "Cybersecurity & Cryptography",
        ],
        badge: {
          label: {
            kh: "បន្ទរោយការងារឧសិកម្មក្នុងវិស្វកម្ម ៦ ខែ",
            en: "6-Month Industry Internship",
          },
          color: "bg-[#0f766e] text-white",
        },
      },
    ],
  },
  application: {
    header: { title: { kh: "លក្ខខណ្ឌជ្រើសរើស", en: "Admission Requirements" } },
    requirements: [
      {
        label: {
          kh: "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) និង/ឬ A, B, C (អនុវិទ្យាល័រវិទ្យាសាស្ត្រ)",
          en: "High school diploma (BacII) or A, B, C (relevant high school)",
        },
      },
      {
        label: {
          kh: "ប្រឡងចូលដោយផ្ទាល់លើជំនាញពីរគឺ ITC (គណិតវិទ្យា, រូបវិទ្យា & គំនិត Logic)",
          en: "Entrance exam in two ITC subjects (Math, Physics & Logic)",
        },
      },
      {
        label: {
          kh: "ចំណេះដឹងភាសាអង់គ្លេស ឬ/ឬអាចសិក្សាដោយមូលដ្ឋាន (B1 Recommended)",
          en: "English proficiency or can study by foundation (B1 Recommended)",
        },
      },
    ],
    deadline: {
      label: {
        kh: "កាលបរិច្ឆេទបញ្ចបំព្រឹត្តិបត្រ",
        en: "Application Deadline",
      },
      value: {
        kh: "ថ្ងៃទី ១៥ ខែ កុម្ភៈ ឆ្នាំ ២០២៥",
        en: "October 15, 2025",
      },
    },
  },
  scholarship: {
    header: {
      title: { kh: "អាហារូបករណ៍", en: "Scholarships" },
      status: {
        label: {
          kh: "អាចស្វែងរកបាន",
          en: "Available",
        },
        bg: "bg-emerald-100",
        text: "text-emerald-700",
      },
    },
    scholarships: [
      {
        title: {
          kh: "Techo Digital Talent (MPTC)",
          en: "Techo Digital Talent (MPTC)",
        },
        discount: {
          kh: "សព្វលេញ ១០០%",
          en: "100% Full",
        },
        description: {
          kh: "ឧបត្ថម្ភពេញលេញសិក្សា ១០០% រួមទាំងថ្លៃសិក្សា និងថ្លៃផ្សេងៗ",
          en: "Full 100% coverage including tuition and other fees.",
        },
        color: "bg-blue-100 text-blue-700",
      },
      {
        title: {
          kh: "ITC Academic Excellence",
          en: "ITC Academic Excellence",
        },
        discount: {
          kh: "50% - 100%",
          en: "50% - 100%",
        },
        description: {
          kh: "សម្រាប់និស្សិតដែលមានពិន្ទុខ្ពស់បំផុញថ្នាក់ក្នុង Top 50",
          en: "For students in Top 50 highest scores.",
        },
        color: "bg-slate-100 text-slate-700",
      },
      {
        title: {
          kh: "Women in Tech Grant",
          en: "Women in Tech Grant",
        },
        discount: {
          kh: "បង្គល ៧៥%",
          en: "75% Award",
        },
        description: {
          kh: "លើកទឹកចិត្តសិស្សនារីដែលមានទេពកោសល្យខាងវិស្វកម្ម AI និងកុំព្យូទ័រ។",
          en: "Support female students with talent in AI and software development.",
        },
        color: "bg-teal-50 text-teal-700",
      },
    ],
  },
  career: {
    labels: {
      salary: {
        kh: "ចន្លោះប្រាក់ខែជាមូល",
        en: "Estimated monthly salary",
      },
      partners: {
        kh: "ដៃគូរួមសហការជាមួយ ",
        en: "Top Hiring Partners & Industry Sponsors",
      },
    },
    header: {
      title: {
        kh: "ឱកាសការងារ & ប្រាក់បៀវត្សរ៍",
        en: "Career Paths & Salaries",
      },
      subtitle: {
        kh: "ផ្លូវការងារ និងការទូទាត់នៅកម្ពុជា និងតំបន់បច្ចេកវិទ្យា",
        en: "Career Trajectories & Compensation in Cambodia & Regional Tech",
      },
      badge: {
        label: {
          kh: "ការស្ទាស់ទីកម្ម ២០២៥",
          en: "2025 Market Survey",
        },
        bg: "bg-blue-50",
        text: "text-blue-600",
      },
    },
    careers: [
      {
        title: {
          kh: "វេទិការការ AI / ML",
          en: "AI / ML Engineer",
        },
        icon: "BrainCircuit",
        description: {
          kh: "បង្កើតម៉ូដែលបញ្ញាសិប្បនិម្មិត NLP ភាសាខ្មែរ និងជំនាញវិស្វកម្មម៉ាស៊ីន",
          en: "Create NLP models for Khmer language and machine learning.",
        },
        salary: "$600 – $2,200+",
      },
      {
        title: {
          kh: "អ្នកបង្កើតគេហទេសពេញគ្រប់ជំនិត",
          en: "Full-Stack Developer",
        },
        icon: "Code2",
        description: {
          kh: "អភិវឌ្ឍន៍កម្មវិធីគេហទំព័ី Web, FinTech apps និង Mobile platforms",
          en: "Develop web apps, FinTech apps and mobile platforms.",
        },
        salary: "$500 – $1,800",
      },
      {
        title: {
          kh: "វិទ្យាសាស្ត្រទិន្នន័យ & អ្នកវាយតម្លៃ",
          en: "Data Scientist & Analyst",
        },
        icon: "TrendingUp",
        description: {
          kh: "វិភាគ Big Data ទាញយកអត្ថន័យពីទិន្នន័យ និងធ្វើយុទ្ធសាស្ត្រអាជីវកម្ម",
          en: "Analyze Big Data, extract insights from data, and do business analytics.",
        },
        salary: "$700 – $2,500",
      },
      {
        title: {
          kh: "ស្ថាប័ន Cloud & DevOps",
          en: "Cloud & DevOps Architect",
        },
        icon: "Cloud",
        description: {
          kh: "គ្រប់គ្រង Server Infrastructure, CI/CD pipelines & Cloud Security",
          en: "Manage server infrastructure, CI/CD pipelines & cloud security.",
        },
        salary: "$800 – $2,600+",
      },
    ],
    partners: [
      "Smart Axiata",
      "ABA Bank",
      "Wing Bank",
      "CADT Labs",
      "TotalEnergies",
    ],
  },
  discussion: {
    header: {
      title: {
        kh: "អ្នកប្រឹក្សាយោបល់ផ្ទាល់",
        en: "Live Advisor Support",
      },
      subtitle: {
        kh: "ITC ICT Admission Desk",
        en: "ITC ICT Admission Desk",
      },
    },
    description: {
      kh: "ត្រូវការព័ត៌មានបន្ថែមពីការសិក្សា អាហារូបករណ៍ ឬការសម្ភាសន៍? ក្រុមការងារយើងខ្ញុំរីករាយជួយអ្នក។",
      en: "Need more info about studies, scholarships or consultation? Our team is happy to help.",
    },
    action: {
      label: {
        kh: "ចាប់ផ្តើមសន្ទនាដេស៊ីក្រូម (Advisor)",
        en: "Start Telegram Conversation (Advisor)",
      },
      icon: "Send",
    },
    contacts: [
      {
        label: { kh: "Phone", en: "Phone" },
        value: "+855 (0) 23 880 370",
        icon: "Phone",
      },
      {
        label: { kh: "Email", en: "Email" },
        value: "info@itc.edu.kh",
        icon: "Mail",
      },
    ],
  },
  facility: {
    header: {
      title: {
        kh: "មជ្ឈមណ្ឌលសរាជិក & បច្ចេកវិទ្យា",
        en: "Research Labs & Technology Centers",
      },
      subtitle: {
        kh: "ហេតុផលកម្មបញ្ចឹងទិនីសមត្ថភាពខ្ពស់ និងមជ្ឈមណ្ឌលច្នាំកម្ម",
        en: "High-Performance Computing Infrastructure & Innovation Centers",
      },
    },
    facilities: [
      {
        title: {
          kh: "AI & HPC Computing Lab",
          en: "AI & HPC Computing Lab",
        },
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500&auto=format&fit=crop",
        description: {
          kh: "បំពាក់ដោយ GPU Clusters សម្រាប់សិក្សា Deep Learning និងការស្រាវជ្រាវ AI ជាតិ",
          en: "Equipped with GPU clusters for deep learning research and AI studies.",
        },
        icon: "Cpu",
      },
      {
        title: {
          kh: "Robotics & IoT Arena",
          en: "Robotics & IoT Arena",
        },
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=500&auto=format&fit=crop",
        description: {
          kh: "សម្រាប់ការសិក្សា Autonomous Drones, Robot arms និង Sensor IoT ជាដើម",
          en: "For studying autonomous drones, robot arms and IoT sensors.",
        },
        icon: "Bot",
      },
      {
        title: {
          kh: "Cloud Sandbox (AWS/GCP)",
          en: "Cloud Sandbox (AWS/GCP)",
        },
        image:
          "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=500&auto=format&fit=crop",
        description: {
          kh: "ទទួលបាន Cloud Credits គ្មានកំណត់សម្រាប់ Deploy Web/App ជាក់ស្តែង",
          en: "Unlimited cloud credits for deploying real web/apps.",
        },
        icon: "Server",
      },
    ],
  },
};
