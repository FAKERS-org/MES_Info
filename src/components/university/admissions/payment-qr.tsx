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
        <div className="w-full max-w-sm mx-auto bg-card rounded-2xl shadow-xs border border-border p-5 font-sans">
            {/* --- Header --- */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-base md:text-lg font-bold text-foreground leading-tight">ថ្លៃពាក្យប្រឡង និងការទុកទីតាំង</h2>
                    <p className="text-xs text-muted-foreground mt-1">Registration & Exam Fee</p>
                </div>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Wallet className="h-4.5 w-4.5" />
                </div>
            </div>

            {/* --- Fee Amount Card --- */}
            <div className="bg-muted/70 border border-border rounded-xl p-4 flex justify-between items-center mb-6">
                <div>
                    <p className="text-xs text-muted-foreground mb-1">ទឹកប្រាក់តម្រូវឱ្យសម្រាយ</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl md:text-3xl font-bold text-foreground">$15.00</span>
                        <span className="text-sm font-medium text-muted-foreground/70">/</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">៦០,០០០ រៀល</p>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-200 text-xs font-semibold px-2.5 py-1.5 rounded-md text-center leading-tight">
                    Non-
                    <br />
                    refundable
                </div>
            </div>

            {/* --- Payment Method --- */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* KHQR Logo Placeholder */}
                    <div className="w-8 h-8 bg-destructive rounded-md flex items-center justify-center text-white font-bold text-xs tracking-tighter">
                        KH
                        <br />
                        QR
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Bakong KHQR</p>
                        <p className="text-xs text-muted-foreground">Payment</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-muted-foreground">Instant</p>
                    <p className="text-xs text-muted-foreground font-medium text-emerald-600 dark:text-emerald-400">Verified</p>
                </div>
            </div>

            {/* --- QR Code Area --- */}
            <div className="bg-muted/40 rounded-xl p-4 flex flex-col items-center justify-center border border-border mb-6">
                <StylizedQRCode />

                <div className="mt-4 text-center">
                    <p className="text-sm font-semibold text-foreground">គណនី: ITC Admissions Fund</p>
                    <p className="text-xs text-muted-foreground mt-0.5">ABA / ACLEDA / Canadia / Wing</p>
                </div>
            </div>

            {/* --- Action Button --- */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs">
                <ScanLine className="h-4.5 w-4.5" />
                បង់ប្រាក់តាមខ្លួនឯង (Pay $15.00)
            </Button>
        </div>
    );
};

export default PaymentQR;
