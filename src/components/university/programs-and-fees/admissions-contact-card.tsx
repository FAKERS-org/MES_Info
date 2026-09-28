import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Headphones, MessageSquare, Phone } from "lucide-react";

export default function AdmissionsContactCard() {
    return (
        <Card className="w-full max-w-sm rounded-[24px] border-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white overflow-hidden">
            <div className="p-5 flex flex-col gap-4">
                    {/* --- Header --- */}
                    <div className="flex items-center gap-2 mb-1">
                        <Headphones className="w-6 h-6 text-blue-600" strokeWidth={2} />
                        <h2 className="text-[17px] font-bold text-slate-800 font-khmer">
                            ទីប្រឹក្សាការសិក្សា (Admissions)
                        </h2>
                    </div>

                    {/* --- Profile Card --- */}
                    <div className="bg-[#f0f4f8] rounded-2xl p-4 flex items-center gap-4">
                        {/* Avatar Wrapper */}
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                            {/* Replace src with your actual image path */}
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                                alt="Vannarith"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="flex flex-col">
                            <h3 className="font-bold text-[#1e3a5f] font-khmer text-[15px] truncate max-w-[180px]">
                                លោក គ្រូ វណ្ណារឹទ្ធ (Vannar...
                            </h3>
                            <p className="text-slate-600 text-[13px] mt-0.5">Head of Student Admissions</p>

                            {/* Online Status */}
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                                <span className="text-[#10b981] text-xs font-semibold">Online</span>
                                <span className="text-slate-500 text-xs font-khmer">ឆ្លើយតបរហ័ស</span>
                            </div>
                        </div>
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="flex flex-col gap-2.5 mt-1">
                        {/* Telegram Button */}
                        <Button
                            variant="secondary"
                            className="w-full bg-[#e6f0f8] hover:bg-[#dbe9f6] text-[#1e3a5f] h-12 rounded-xl flex items-center justify-center gap-2 transition-colors border-0"
                        >
                            <MessageSquare className="w-5 h-5 text-[#1e3a5f]" strokeWidth={2} />
                            <span className="font-bold text-[15px] font-khmer">ផ្ញើសារសាកសួរ (Telegram Q&amp;A)</span>
                        </Button>

                        {/* Hotline Button */}
                        <Button
                            variant="secondary"
                            className="w-full bg-[#f4f6fb] hover:bg-[#eaeef5] text-slate-700 h-12 rounded-xl flex items-center justify-center gap-2 transition-colors border-0"
                        >
                            <Phone className="w-4 h-4 text-slate-700" strokeWidth={2} />
                            <span className="font-medium text-[15px]">Hotline: 023 880 370</span>
                        </Button>
                    </div>
                </div>
            </Card>
    );
}
