import React from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Download, 
  Send, 
  Camera, 
  Hourglass, 
  TrendingUp, 
  Globe 
} from 'lucide-react';

// Reusable Badge Component (mimicking Shadcn UI Badge)
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

// Reusable Button Component (mimicking Shadcn UI Button)
const Button = ({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'secondary', className?: string }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
  const variants = {
    default: "bg-[#0e5a8a] text-white hover:bg-[#0e5a8a]/90", // Dark blue button
    secondary: "bg-[#eef5fc] text-[#0e5a8a] hover:bg-[#eef5fc]/80", // Light blue button
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default function DepartmentIdHeading() {
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