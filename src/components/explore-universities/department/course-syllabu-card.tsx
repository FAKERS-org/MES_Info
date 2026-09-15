import React from 'react';
import { BookOpen } from 'lucide-react';

export default function CourseSyllabusCard() {
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
            <h2 className="text-xl font-bold text-slate-800">
              កម្មវិធីសិក្សា & មុខវិជ្ជាស្រុត
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Academic Curriculum & Specialization Milestones (140 Credits Total)
            </p>
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
              <span className="bg-[#1e293b] text-white rounded-md px-2.5 py-1 text-xs font-semibold">
                {section.year}
              </span>
              <span className="text-xs font-semibold text-slate-500">{section.credits}</span>
            </div>
            
            <h3 className="font-bold text-slate-800 mb-2">{section.title}</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-noto-khmer">
              {section.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {section.tags.map((tag, tIdx) => (
                <span key={tIdx} className="bg-white text-slate-700 border border-slate-200 text-xs px-2.5 py-1 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {idx === 2 && (
              <div className="mt-4">
                <span className="inline-block bg-[#0f766e] text-white px-3 py-1.5 rounded-md text-sm font-medium">
                  6-Month Industry Internship
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}