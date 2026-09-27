import { Button } from "@/components/ui/button";
import { ScanLine, Wallet } from "lucide-react";

// Custom stylized QR Code Component to match the design
const StylizedQRCode = () => {
    return (
        <div className="relative w-40 h-40 bg-white p-2">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B1F3A]" fill="currentColor">
                {/* Top Left Square */}
                <path d="M5 5h30v30H5V5zm5 5v20h20V10H10z" />
                <rect x="15" y="15" width="10" height="10" />

                {/* Top Right Square */}
                <path d="M65 5h30v30H65V5zm5 5v20h20V10H70z" />
                <rect x="75" y="15" width="10" height="10" />

                {/* Bottom Left Square */}
                <path d="M5 65h30v30H5V65zm5 5v20h20V70H10z" />
                <rect x="15" y="75" width="10" height="10" />

                {/* Random Data Modules (Scattered dots to simulate QR) */}
                <rect x="45" y="5" width="8" height="8" />
                <rect x="55" y="15" width="5" height="15" />
                <rect x="45" y="25" width="10" height="5" />

                <rect x="5" y="45" width="15" height="5" />
                <rect x="25" y="45" width="10" height="10" />
                <rect x="45" y="45" width="10" height="10" />
                <rect x="65" y="45" width="15" height="5" />
                <rect x="85" y="45" width="10" height="15" />

                <rect x="35" y="55" width="5" height="15" />
                <rect x="55" y="55" width="10" height="5" />
                <rect x="75" y="55" width="10" height="10" />

                <rect x="45" y="75" width="15" height="5" />
                <rect x="65" y="75" width="10" height="10" />
                <rect x="85" y="75" width="10" height="15" />

                <rect x="45" y="85" width="10" height="10" />
                <rect x="65" y="90" width="15" height="5" />
            </svg>

            {/* Center Red Square */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#D32F2F] rounded-sm border-2 border-white shadow-sm" />
        </div>
    );
};

const PaymentQR = () => {
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-5 font-sans">
            {/* --- Header --- */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 leading-tight">ថ្លៃពាក្យប្រឡង និងការទុកទីតាំង</h2>
                    <p className="text-xs text-slate-500 mt-1">Registration & Exam Fee</p>
                </div>
                <div className="bg-sky-50 p-2 rounded-lg text-sky-600">
                    <Wallet className="h-5 w-5" />
                </div>
            </div>

            {/* --- Fee Amount Card --- */}
            <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center mb-6">
                <div>
                    <p className="text-xs text-slate-500 mb-1">ទឹកប្រាក់តម្រូវឱ្យសម្រាយ</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#0B1F3A]">$15.00</span>
                        <span className="text-sm font-medium text-slate-400">/</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">៦០,០០០ រៀល</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-md text-center leading-tight">
                    Non-
                    <br />
                    refundable
                </div>
            </div>

            {/* --- Payment Method --- */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* KHQR Logo Placeholder */}
                    <div className="w-8 h-8 bg-[#C8102E] rounded flex items-center justify-center text-white font-bold text-[10px] tracking-tighter">
                        KH
                        <br />
                        QR
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">Bakong KHQR</p>
                        <p className="text-xs text-slate-500">Payment</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400">Instant</p>
                    <p className="text-xs text-slate-400">Verify</p>
                </div>
            </div>

            {/* --- QR Code Area --- */}
            <div className="bg-slate-50/50 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-100 mb-6">
                <StylizedQRCode />

                <div className="mt-4 text-center">
                    <p className="text-sm font-bold text-slate-800">គណនី: ITC Admissions Fund</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">ABA / ACLEDA / Canada / Wing</p>
                </div>
            </div>

            {/* --- Action Button --- */}
            <Button className="w-full bg-[#0F4C81] hover:bg-[#0c3e6a] text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 text-[15px]">
                <ScanLine className="h-5 w-5" />
                បង់ប្រាក់តាមខ្លួនឯង (Pay $15.00)
            </Button>
        </div>
    );
};

export default PaymentQR;
