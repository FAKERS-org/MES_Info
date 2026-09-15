// import ApplicationConditionCard from "@/components/explore-universities/department/application-condition-card";
// import CourseSyllabusCard from "@/components/explore-universities/department/course-syllabu-card";
// import DepartmentIdHeading from "@/components/explore-universities/department/department-id-heading";
// import ScholarshipBriefCard from "@/components/explore-universities/department/scholarship-brief-card";

// export default function DepartmentIdPage() {
//   return (
//     <div className="space-y-0">
//       <DepartmentIdHeading />

//       {/* Main Layout Container */}
//       <div className="bg-slate-50 py-8 flex justify-center items-start">
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-full w-full">
          
//           {/* Column 1: Syllabus (Takes up 2/3 width on large screens) */}
//           <div className="xl:col-span-2">
//             <CourseSyllabusCard />
//           </div>

//           {/* Column 2: Stacked Cards (Takes up 1/3 width on large screens) */}
//           <div className="xl:col-span-1 flex flex-col gap-6">
//             <ApplicationConditionCard />
//             <ScholarshipBriefCard />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { 
  // Card 1: Syllabus
  BookOpen,
  // Card 2: Application
  ShieldCheck, CheckCircle2, Calendar,
  // Card 3: Scholarship
  Wallet,
  // Card 4: Career
  TrendingUp, BrainCircuit, Code2, Cloud, Building2,
  // Card 5: Discussion
  MessageCircle, Send, Phone, Mail,
  // Card 6: Facility
  Cpu, Bot, Server,
  Badge,
  Download,
  GraduationCap,
  Camera,
  Hourglass,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DepartmentIdHeading  = () => {
  return (
    <div className="w-full max-w-full mx-auto font-sans">
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
        
        {/* Top Blue Header Background */}
        <div className="h-40 w-full bg-gradient-to-r from-[#0a4f7c] to-[#167bb3] absolute top-0 left-0 z-0"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-6 pt-24 pb-6">
          
          {/* Top Right Badges */}
          <div className="absolute top-4 right-6 flex items-center gap-2 text-white/90 text-xs font-medium">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>MoEYS Accredited</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              <GraduationCap className="w-4 h-4" />
              <span>Faculty of Information & Comm. Tech (FICT)</span>
            </div>
          </div>

          {/* Flex Container for Logo and Main Info */}
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Left Side: Logo */}
            <div className="flex-shrink-0 -mt-20 md:-mt-24">
              <div className="relative w-32 h-32 md:w-36 md:h-36 bg-white rounded-full p-2 shadow-md flex items-center justify-center">
                {/* Placeholder for the University Logo */}
                <div className="w-full h-full rounded-full bg-[#0e5a8a] flex items-center justify-center border-4 border-[#d4af37]">
                  <span className="text-white text-xs text-center font-bold px-2">INSTITUTE OF TECHNOLOGY OF CAMBODIA</span>
                </div>
                {/* Green Checkmark Badge */}
                <div className="absolute bottom-2 right-2 bg-[#0a7d4f] text-white p-1 rounded-full border-2 border-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Right Side: Course Details */}
            <div className="flex-1 mt-4 md:mt-0">
              
              {/* Top Row of Small Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-[#eef5fc] text-[#0e5a8a] gap-1">
                  <span className="text-blue-500">⏱</span> វិញ្ញាសារមូលដ្ឋាន
                </Badge>
                <Badge className="bg-[#eef5fc] text-[#0e5a8a]">AUN-QA Certified</Badge>
                <span className="text-xs text-gray-400 font-medium hidden sm:inline">Fundamental Foundation</span>
              </div>

              {/* Title and Subtitle */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                វិទ្យាសាស្ត្រកុំព្យូទ័រ & AI
              </h1>
              <p className="text-gray-600 mt-1 md:text-lg">
                Computer Science & Artificial Intelligence — Diplôme d'Ingénieur & Bachelor of Science (Faculty of ICT)
              </p>

              {/* Action Buttons (Right aligned on desktop) */}
              <div className="flex flex-wrap items-center gap-3 mt-4 md:absolute md:top-24 md:right-6">
                <Button className="gap-2 rounded-full px-6">
                  ចុះឈ្មោះចូលរៀន (Apply Now) <Send className="w-4 h-4" />
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" className="gap-2 rounded-full">
                    <Download className="w-4 h-4" /> Syllabus PDF
                  </Button>
                  <Button variant="secondary" className="gap-2 rounded-full">
                    <Send className="w-4 h-4" /> Telegram Advisor
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
            
            {/* Stat 1 */}
            <div className="bg-[#f8fafc] rounded-xl p-4 flex items-center gap-4">
              <div className="bg-[#e0f2fe] p-3 rounded-lg text-[#0284c7]">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">ថ្លៃសិក្សាប្រចាំឆ្នាំ</p>
                <p className="font-bold text-gray-900">$700 <span className="text-sm font-normal text-gray-500">/ ឆ្នាំ</span></p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#f8fafc] rounded-xl p-4 flex items-center gap-4">
              <div className="bg-[#e0f2fe] p-3 rounded-lg text-[#0284c7]">
                <Hourglass className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">រយៈពេលសិក្សា</p>
                <p className="font-bold text-gray-900">4 - 5 ឆ្នាំ <span className="text-sm font-normal text-gray-500">(Ingénieur)</span></p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#f8fafc] rounded-xl p-4 flex items-center gap-4">
              <div className="bg-[#dcfce7] p-3 rounded-lg text-[#16a34a]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">អត្រាការងារបន្ទាប់ពីបញ្ចប់</p>
                <p className="font-bold text-[#16a34a]">98.2% <span className="text-sm font-normal text-gray-500">Hired</span></p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#f8fafc] rounded-xl p-4 flex items-center gap-4">
              <div className="bg-[#e0f2fe] p-3 rounded-lg text-[#0284c7]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">ភាសាបម្រែ</p>
                <p className="font-bold text-gray-900">Trilingual <span className="text-sm font-normal text-gray-500">KH/EN/FR</span></p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
// ==========================================
// COMPONENT 1: COURSE SYLLABUS CARD
// ==========================================
const CourseSyllabusCard = () => {
  const sections = [
    {
      year: "Year 1-2",
      title: "មូលដ្ឋានគ្រឹះវិស្វកម្ម & ក្បួនដោះស្រាយ (Foundation & Algorithms)",
      credits: "60 Credits",
      description: "ដេញដោលទ្រឹស្តីវិទ្យាសាស្ត្រ គណិតវិទ្យា និងរចនាសម្ព័ន្ធទិន្នន័យ (Data Structures & Discrete Math).",
      tags: ["C / C++ Programming", "Data Structures & Algorithms", "Engineering Calculus I & II", "Discrete Mathematics", "Digital Logic Systems"]
    },
    {
      year: "Year 3",
      title: "បច្ចេកវិទ្យាកម្រិតខ្ពស់ (Advanced Software & Cloud DevOps)",
      credits: "40 Credits",
      description: "គាំទ្រការអភិវឌ្ឍ Software Architecture ជាង ៣ ឆ្នាំ និងជំនាញ IT កម្រិតខ្ពស់ផ្សេងទៀត។",
      tags: ["Machine Learning Basics", "Relational & NoSQL Databases", "Cloud Computing & Docker", "Mobile & Web Architectures", "Computer Networks & Security"]
    },
    {
      year: "Year 4-5",
      title: "ជំនាញទំនើប AI & សហគ្រាសជាក់ស្តែង (AI Track & Capstone)",
      credits: "40 Credits + Thesis",
      description: "ការអនុវត្តជាក់ស្តែង AI ជាក់ស្តែង គម្រោងសិក្សា និងការបង្ហាញស្នាដៃ។",
      tags: ["Deep Learning & Neural Nets", "Natural Language Processing (NLP)", "Computer Vision & Robotics", "Cybersecurity & Cryptography"]
    }
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">កម្មវិធីសិក្សា & មុខវិជ្ជាស្រុត</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Academic Curriculum & Specialization Milestones (140 Credits Total)</p>
            <div className="mt-3 inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
              ● Practical Labs: 680 Hours
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 pt-4 space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100/50">
            <div className="flex justify-between items-center mb-3">
              <span className="bg-[#1e293b] text-white rounded-md px-2.5 py-1 text-xs font-semibold">{section.year}</span>
              <span className="text-xs font-semibold text-slate-500">{section.credits}</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{section.title}</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-noto-khmer">{section.description}</p>
            <div className="flex flex-wrap gap-2">
              {section.tags.map((tag, tIdx) => (
                <span key={tIdx} className="bg-white text-slate-700 border border-slate-200 text-xs px-2.5 py-1 rounded-md font-medium">{tag}</span>
              ))}
            </div>
            {idx === 2 && (
              <div className="mt-4">
                <span className="inline-block bg-[#0f766e] text-white px-3 py-1.5 rounded-md text-sm font-medium">6-Month Industry Internship</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 2: APPLICATION CONDITION CARD
// ==========================================
const ApplicationConditionCard = () => {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-500 flex-shrink-0">
            <ShieldCheck size={22} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">លក្ខខណ្ឌជ្រើសរើស</h2>
        </div>
      </div>
      <div className="p-6 pt-4 space-y-4">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) និង/ឬ A, B, C (អនុវិទ្យាល័យវិទ្យាសាស្ត្រ)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">ប្រឡងចូលដោយផ្ទាល់លើជំនាញពីរគឺ ITC (គណិតវិទ្យា, រូបវិទ្យា & គំនិត Logic)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">ចំណេះដឹងភាសាអង់គ្លេស ឬ/ឬអាចសិក្សាដោយមូលដ្ឋាន (B1 Recommended)</span>
          </li>
        </ul>
        <div className="bg-[#eff6ff] rounded-xl p-4 flex items-center gap-3 mt-4">
          <div className="text-blue-600"><Calendar size={20} /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium mb-0.5">កាលបរិច្ឆេទបញ្ចប់ព្រឹត្តិបត្រ</p>
            <p className="text-sm font-bold text-slate-800">ថ្ងៃទី ១៥ ខែ កុម្ភៈ ឆ្នាំ ២០២៥</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 3: SCHOLARSHIP BRIEF CARD
// ==========================================
const ScholarshipBriefCard = () => {
  const scholarships = [
    { title: "Techo Digital Talent (MPTC)", discount: "100% Full", description: "ឧបត្ថម្ភពេញលេញសិក្សា ១០០% រួមទាំងថ្លៃសិក្សា និងថ្លៃផ្សេងៗ", color: "bg-blue-100 text-blue-700" },
    { title: "ITC Academic Excellence", discount: "50% - 100%", description: "សម្រាប់និស្សិតដែលមានពិន្ទុខ្ពស់បំផុតចំណាត់ថ្នាក់ក្នុង Top 50", color: "bg-slate-100 text-slate-700" },
    { title: "Women in Tech Grant", discount: "75% Award", description: "លើកទឹកចិត្តសិស្សនារីដែលមានទេពកោសល្យខាងវិស្វកម្ម AI និងកុំព្យូទ័រ។", color: "bg-teal-50 text-teal-700" }
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 flex-shrink-0"><Wallet size={20} /></div>
            <h2 className="text-lg font-bold text-slate-800">អាហារូបករណ៍</h2>
          </div>
          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-semibold">Available</span>
        </div>
      </div>
      <div className="p-6 pt-4 space-y-5">
        {scholarships.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                <span className={`${item.color} px-2 py-1 rounded-md font-bold text-xs whitespace-nowrap`}>{item.discount}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
            {idx !== scholarships.length - 1 && <div className="h-px bg-slate-100 w-full my-4" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 4: CAREER PATH CARD
// ==========================================
const CareerPathCard = () => {
  const careers = [
    { title: "AI / ML Engineer", icon: <BrainCircuit className="w-5 h-5 text-blue-500" />, description: "បង្កើតម៉ូដែលបញ្ញាសិប្បនិម្មិត NLP ភាសាខ្មែរ និងជំនាញវិស្វកម្មម៉ាស៊ីន", salary: "$600 – $2,200+" },
    { title: "Full-Stack Developer", icon: <Code2 className="w-5 h-5 text-blue-500" />, description: "អភិវឌ្ឍន៍កម្មវិធីគេហទំព័រ Web, FinTech apps និង Mobile platforms", salary: "$500 – $1,800" },
    { title: "Data Scientist & Analyst", icon: <TrendingUp className="w-5 h-5 text-blue-500" />, description: "វិភាគ Big Data ទាញយកអត្ថន័យពីទិន្នន័យ និងធ្វើយុទ្ធសាស្ត្រអាជីវកម្ម", salary: "$700 – $2,500" },
    { title: "Cloud & DevOps Architect", icon: <Cloud className="w-5 h-5 text-blue-500" />, description: "គ្រប់គ្រង Server Infrastructure, CI/CD pipelines & Cloud Security", salary: "$800 – $2,600+" }
  ];
  const partners = ["Smart Axiata", "ABA Bank", "Wing Bank", "CADT Labs", "TotalEnergies"];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0"><TrendingUp size={24} /></div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">ឱកាសការងារ & ប្រាក់បៀវត្សរ៍</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Career Trajectories & Compensation in Cambodia & Regional Tech</p>
            </div>
          </div>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 font-semibold text-xs rounded-full whitespace-nowrap hidden md:inline-block">2025 Market Survey</span>
        </div>
      </div>
      <div className="p-6 pt-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careers.map((career, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 text-sm">{career.title}</h3>
                  {career.icon}
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed min-h-[40px]">{career.description}</p>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-3 mt-auto">
                <span className="text-xs font-semibold text-slate-500">ចន្លោះប្រាក់ខែជាមធ្យម</span>
                <span className="text-sm font-bold text-emerald-600">{career.salary}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">ដៃគូរួមសហការជាមួយ (TOP HIRING PARTNERS & INDUSTRY SPONSORS)</h4>
          <div className="flex flex-wrap gap-2">
            {partners.map((partner, idx) => (
              <span key={idx} className="bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 font-medium flex items-center gap-2 text-xs rounded-md">
                <Building2 className="w-4 h-4" /> {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 5: DISCUSSION CARD
// ==========================================
const DiscussionCard = () => {
  return (
    <div className="w-full bg-[#0e3a53] text-white shadow-md rounded-2xl overflow-hidden relative">
      <div className="p-6 pb-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="bg-white/10 p-2.5 rounded-full text-white flex-shrink-0"><MessageCircle size={24} /></div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">អ្នកប្រឹក្សាយោបល់ផ្ទាល់</h2>
            <p className="text-slate-300 font-medium text-xs">ITC ICT Admission Desk</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-2 space-y-6 relative z-10">
        <p className="text-sm text-slate-200 leading-relaxed font-noto-khmer">ត្រូវការព័ត៌មានបន្ថែមពីការសិក្សា អាហារូបករណ៍ ឬការសម្ភាសន៍? ក្រុមការងារយើងខ្ញុំរីករាយជួយអ្នក។</p>
        <button className="w-full bg-[#2a7fa8] hover:bg-[#236b8e] text-white font-semibold py-3 rounded-lg text-sm flex justify-center items-center gap-2 transition-colors border-none cursor-pointer">
          <Send size={18} /> ចាប់ផ្តើមសន្ទនា Telegram (Advisor)
        </button>
        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-slate-300 text-xs"><Phone size={14} className="text-slate-400" /> <span>+855 (0) 23 880 370</span></div>
          <div className="flex items-center gap-3 text-slate-300 text-xs"><Mail size={14} className="text-slate-400" /> <span>info@itc.edu.kh</span></div>
        </div>
      </div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};

// ==========================================
// COMPONENT 6: FACILITY CARD
// ==========================================
const FacilityCard = () => {
  const facilities = [
    { title: "AI & HPC Computing Lab", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500&auto=format&fit=crop", description: "បំពាក់ដោយ GPU Clusters សម្រាប់សិក្សា Deep Learning និងការស្រាវជ្រាវ AI ជាតិ", icon: <Cpu size={16} /> },
    { title: "Robotics & IoT Arena", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=500&auto=format&fit=crop", description: "សម្រាប់ការសិក្សា Autonomous Drones, Robot arms និង Sensor IoT ជាដើម", icon: <Bot size={16} /> },
    { title: "Cloud Sandbox (AWS/GCP)", image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=500&auto=format&fit=crop", description: "ទទួលបាន Cloud Credits គ្មានកំណត់សម្រាប់ Deploy Web/App ជាក់ស្តែង", icon: <Server size={16} /> }
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 flex-shrink-0"><Cpu size={24} /></div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">មជ្ឈមណ្ឌលស្រាវជ្រាវ & បច្ចេកវិទ្យា</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">High-Performance Computing Infrastructure & Innovation Centers</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facilities.map((facility, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-100/50 flex flex-col h-full">
              <div className="w-full h-32 rounded-lg overflow-hidden mb-3 relative bg-slate-200">
                <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-2 text-slate-700">
                <span className="text-emerald-500">{facility.icon}</span>
                <h3 className="font-bold text-slate-800 text-sm leading-tight">{facility.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ==========================================
// MAIN PAGE LAYOUT (SANDBOX)
// ==========================================
export default function DepartmentSandboxPage() {
  return (
    <div className="min-h-screen">
      {/* Container to limit max width on huge screens */}
      <div className="max-w-full mx-auto space-y-8">
        
        {/* Header Placeholder */}
        <div className="mb-8">
          <DepartmentIdHeading />
        </div>

        {/* Row 1: Syllabus (2/3) and Application/Scholarship (1/3) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
          <div className="xl:col-span-2 w-full">
            <CourseSyllabusCard />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-6 w-full">
            <ApplicationConditionCard />
            <ScholarshipBriefCard />
          </div>
        </div>

        {/* Row 2: Career Path (2/3) and Discussion (1/3) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
          <div className="xl:col-span-2 w-full">
            <CareerPathCard />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-6 w-full">
            <DiscussionCard />
          </div>
        </div>

        {/* Row 3: Facility (Full Width) */}
        <div className="w-full">
          <FacilityCard />
        </div>

      </div>
    </div>
  );
}