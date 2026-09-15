import React from 'react';
import { 
  TrendingUp, 
  BrainCircuit, 
  Code2, 
  Database, 
  Cloud, 
  Building2, 
  MessageCircle, 
  Send, 
  Phone, 
  Mail, 
  Cpu, 
  Bot, 
  Server
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Component 1: Career Path Card ---

const CareerPathCard = () => {
  const careers = [
    {
      title: "AI / ML Engineer",
      icon: <BrainCircuit className="w-5 h-5 text-blue-500" />,
      description: "បង្កើតម៉ូដែលបញ្ញាសិប្បនិម្មិត NLP ភាសាខ្មែរ និងជំនាញវិស្វកម្មម៉ាស៊ីន",
      salary: "$600 – $2,200+",
    },
    {
      title: "Full-Stack Developer",
      icon: <Code2 className="w-5 h-5 text-blue-500" />,
      description: "អភិវឌ្ឍន៍កម្មវិធីគេហទំព័រ Web, FinTech apps និង Mobile platforms",
      salary: "$500 – $1,800",
    },
    {
      title: "Data Scientist & Analyst",
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      description: "វិភាគ Big Data ទាញយកអត្ថន័យពីទិន្នន័យ និងធ្វើយុទ្ធសាស្ត្រអាជីវកម្ម",
      salary: "$700 – $2,500",
    },
    {
      title: "Cloud & DevOps Architect",
      icon: <Cloud className="w-5 h-5 text-blue-500" />,
      description: "គ្រប់គ្រង Server Infrastructure, CI/CD pipelines & Cloud Security",
      salary: "$800 – $2,600+",
    }
  ];

  const partners = [
    { name: "Smart Axiata", icon: <Building2 className="w-4 h-4" /> },
    { name: "ABA Bank", icon: <Building2 className="w-4 h-4" /> },
    { name: "Wing Bank", icon: <Building2 className="w-4 h-4" /> },
    { name: "CADT Labs", icon: <Building2 className="w-4 h-4" /> },
    { name: "TotalEnergies", icon: <Building2 className="w-4 h-4" /> },
  ];

  return (
    <Card className="w-full max-w-3xl bg-white shadow-sm border-slate-100 rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">
                ឱកាសការងារ & ប្រាក់បៀវត្សរ៍
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Career Trajectories & Compensation in Cambodia & Regional Tech
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-3 py-1 font-semibold text-xs rounded-full">
            2025 Market Survey
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careers.map((career, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 text-sm">{career.title}</h3>
                  {career.icon}
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed min-h-[40px]">
                  {career.description}
                </p>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-3 mt-auto">
                <span className="text-xs font-semibold text-slate-500">ចន្លោះប្រាក់ខែជាមធ្យម</span>
                <span className="text-sm font-bold text-emerald-600">{career.salary}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            ដៃគូរួមសហការជាមួយ (TOP HIRING PARTNERS & INDUSTRY SPONSORS)
          </h4>
          <div className="flex flex-wrap gap-2">
            {partners.map((partner, idx) => (
              <Badge key={idx} variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 px-3 py-1.5 font-medium flex items-center gap-2 text-xs rounded-md">
                {partner.icon}
                {partner.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


// --- Component 2: Discussion Card ---

const DiscussionCard = () => {
  return (
    <Card className="w-full max-w-sm bg-[#0e3a53] text-white shadow-md border-none rounded-2xl overflow-hidden relative">
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="bg-white/10 p-2.5 rounded-full text-white">
            <MessageCircle size={24} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-white mb-1">
              អ្នកប្រឹក្សាយោបល់ផ្ទាល់
            </CardTitle>
            <CardDescription className="text-slate-300 font-medium text-xs">
              ITC ICT Admission Desk
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <p className="text-sm text-slate-200 leading-relaxed font-noto-khmer">
          ត្រូវការព័ត៌មានបន្ថែមពីការសិក្សា អាហារូបករណ៍ ឬការសម្ភាសន៍? ក្រុមការងារយើងខ្ញុំរីករាយជួយអ្នក។
        </p>

        <Button className="w-full bg-[#2a7fa8] hover:bg-[#236b8e] text-white font-semibold py-6 rounded-lg text-sm flex items-center gap-2 transition-colors border-none">
          <Send size={18} />
          ចាប់ផ្តើមសន្ទនា Telegram (Advisor)
        </Button>

        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center gap-3 text-slate-300 text-xs">
            <Phone size={14} className="text-slate-400" />
            <span>+855 (0) 23 880 370</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-xs">
            <Mail size={14} className="text-slate-400" />
            <span>info@itc.edu.kh</span>
          </div>
        </div>
      </CardContent>
      
      {/* Decorative background circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
    </Card>
  );
};


// --- Component 3: Facility Card ---

const FacilityCard = () => {
  const facilities = [
    {
      title: "AI & HPC Computing Lab",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500&auto=format&fit=crop", // Placeholder
      description: "បំពាក់ដោយ GPU Clusters សម្រាប់សិក្សា Deep Learning និងការស្រាវជ្រាវ AI ជាតិ",
      icon: <Cpu size={16} />
    },
    {
      title: "Robotics & IoT Arena",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=500&auto=format&fit=crop", // Placeholder
      description: "សម្រាប់ការសិក្សា Autonomous Drones, Robot arms និង Sensor IoT ជាដើម",
      icon: <Bot size={16} />
    },
    {
      title: "Cloud Sandbox (AWS/GCP)",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=500&auto=format&fit=crop", // Placeholder
      description: "ទទួលបាន Cloud Credits គ្មានកំណត់សម្រាប់ Deploy Web/App ជាក់ស្តែង",
      icon: <Server size={16} />
    }
  ];

  return (
    <Card className="w-full max-w-3xl bg-white shadow-sm border-slate-100 rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
            <Cpu size={24} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-slate-800">
              មជ្ឈមណ្ឌលស្រាវជ្រាវ & បច្ចេកវិទ្យា
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              High-Performance Computing Infrastructure & Innovation Centers
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facilities.map((facility, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-100/50 flex flex-col h-full">
              <div className="w-full h-32 rounded-lg overflow-hidden mb-3 relative bg-slate-200">
                <img 
                  src={facility.image} 
                  alt={facility.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2 text-slate-700">
                <span className="text-emerald-500">{facility.icon}</span>
                <h3 className="font-bold text-slate-800 text-sm leading-tight">{facility.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


// --- Main Layout Component ---

export default function AdditionalInfoDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-start font-sans">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl w-full">
        
        {/* Left Column: Career & Facility Cards */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <CareerPathCard />
          <FacilityCard />
        </div>

        {/* Right Column: Discussion Card */}
        <div className="xl:col-span-1 flex justify-center xl:justify-start">
          <DiscussionCard />
        </div>

      </div>
    </div>
  );
}