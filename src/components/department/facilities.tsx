import { FlaskConical } from "lucide-react";

const Facilities = () => {
    const facilities = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
            title: "AI & HPC",
            subtitle: "Computing Lab",
            description: "បំពាក់ដោយ GPU Clusters សម្រាប់ការសិក្សា Deep Learning និងការស្រាវជ្រាវ AI ជាដើម។",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
            title: "Robotics & IoT",
            subtitle: "Arena",
            description: "ទីលានសាកល្បង Autonomous Drones, Robot arms និង Sensor IoT ផ្សេងៗ។",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
            title: "Cloud Sandbox",
            subtitle: "(AWS/GCP)",
            description: "អនុញ្ញាតឱ្យនិស្សិតប្រើប្រាស់ Cloud Credits ដើម្បីរៀនសូត្រ និង Deploy Web/App ជាក់ស្តែង។",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 bg-slate-50/50 rounded-2xl font-sans">
            {/* --- Header Section --- */}
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-100 p-3 rounded-xl shrink-0 text-emerald-600">
                    <FlaskConical className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-xl md:text-[22px] font-bold text-[#0B1F3A] leading-tight mb-0.5">
                        មជ្ឈមណ្ឌលសិក្សា & បច្ចេកវិទ្យា
                    </h1>
                    <p className="text-[13px] text-slate-500 font-medium">
                        High-Performance Computing Facilities & Innovation Centers
                    </p>
                </div>
            </div>

            {/* --- Cards Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {facilities.map(item => (
                    <div key={item.id} className="flex flex-col">
                        {/* Image Container */}
                        <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 shadow-sm border border-slate-100">
                            <img
                                src={item.image}
                                alt={`${item.title} ${item.subtitle}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="px-1">
                            <h2 className="text-[17px] font-bold text-[#0F4C81] leading-snug mb-2">
                                {item.title} <br className="hidden md:block" />
                                {item.subtitle}
                            </h2>
                            <p className="text-[13px] text-slate-500 leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facilities;
