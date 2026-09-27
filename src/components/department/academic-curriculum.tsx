import { Laptop } from "lucide-react";

const AcademicCurriculum = () => {
    const curriculumData = [
        {
            id: "year-1-2",
            badgeText: "Year 1–2",
            badgeBg: "bg-[#1E293B]", // Dark Slate
            title: "មូលដ្ឋានគ្រឹះវិស្វកម្ម & ក្បួនដោះស្រាយ",
            englishTitle: "(Foundation & Algorithms)",
            credits: "60 Credits",
            description:
                "ផ្តោតលើគ្រឹះវិស្វកម្ម និងក្បួនដោះស្រាយ ដើម្បីឱ្យនិស្សិតមានមូលដ្ឋានរឹងមាំក្នុងការសរសេរកូដ និងដោះស្រាយបញ្ហា។",
            courses: [
                "C / C++ Programming",
                "Data Structures & Algorithms",
                "Engineering Calculus I & II",
                "Discrete Mathematics",
                "Digital Logic Systems",
            ],
        },
        {
            id: "year-3",
            badgeText: "Year 3",
            badgeBg: "bg-[#0284C7]", // Sky Blue
            title: "បច្ចេកវិទ្យាកម្រិតខ្ពស់",
            englishTitle: "(Advanced Software & Cloud DevOps)",
            credits: "40 Credits",
            description: "អភិវឌ្ឍជំនាញ Software Architecture និង ប្រព័ន្ធទំនើបៗ ដូចជា ពពក (Cloud) និង DevOps។",
            courses: [
                "Machine Learning Basics",
                "Relational & NoSQL Databases",
                "Cloud Computing & Docker",
                "Mobile & Web Architectures",
                "Computer Networks & Security",
            ],
        },
        {
            id: "year-4-5",
            badgeText: "Year 4–5",
            badgeBg: "bg-[#0F4C81]", // Deep Blue
            title: "ជំនាញ AI & ការអនុវត្តជាក់ស្តែង",
            englishTitle: "(AI Track & Capstone)",
            credits: "40 Credits + Thesis",
            description: "ផ្តោតលើបច្ចេកវិទ្យាកម្រិតខ្ពស់ AI និង ការសិក្សាស្រាវជ្រាវ ដើម្បីដោះស្រាយបញ្ហាជាក់ស្តែង។",
            courses: [
                "Deep Learning & Neural Nets",
                "Natural Language Processing (NLP)",
                "Computer Vision & Robotics",
                "Cybersecurity & Cryptography",
            ],
            specialBadge: "6-Month Industry Internship",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 bg-slate-50/50 rounded-2xl font-sans">
            {/* --- Header Section --- */}
            <div className="flex items-start gap-4 mb-8">
                <div className="bg-sky-100 p-3 rounded-xl shrink-0 mt-1 text-[#0F4C81]">
                    <Laptop className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#0B1F3A] leading-tight mb-1">
                        កម្មវិធីសិក្សា & មុខជំនាញស្នូល
                    </h1>
                    <p className="text-sm text-slate-500">
                        Academic Curriculum & Specialization Milestones (140 Credits Total)
                    </p>
                </div>
            </div>

            {/* --- Practical Labs Banner --- */}
            <div className="flex items-center gap-2 mb-6 bg-white border border-slate-100 px-4 py-3 rounded-xl w-fit shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
                <span className="text-sm font-semibold text-slate-700">Practical Labs: 680 Hours</span>
            </div>

            {/* --- Curriculum Blocks --- */}
            <div className="space-y-4">
                {curriculumData.map(block => (
                    <div
                        key={block.id}
                        className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] border border-slate-100"
                    >
                        {/* Block Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 mb-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`${block.badgeBg} text-white text-xs font-bold px-3 py-1 rounded-md`}>
                                    {block.badgeText}
                                </span>
                                <h2 className="text-[15px] md:text-base font-bold text-[#0B1F3A]">
                                    {block.title}{" "}
                                    <span className="font-medium text-slate-500">{block.englishTitle}</span>
                                </h2>
                            </div>
                            <span className="text-sm font-bold text-slate-500 whitespace-nowrap">{block.credits}</span>
                        </div>

                        {/* Block Description */}
                        <p className="text-[13px] text-slate-500 leading-relaxed mb-5">{block.description}</p>

                        {/* Course Tags */}
                        <div className="flex flex-wrap gap-2">
                            {block.courses.map((course, idx) => (
                                <span
                                    key={idx}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg"
                                >
                                    {course}
                                </span>
                            ))}

                            {/* Special Badge for Year 4-5 */}
                            {block.specialBadge && (
                                <span className="bg-[#0F4C81] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                    {block.specialBadge}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademicCurriculum;
