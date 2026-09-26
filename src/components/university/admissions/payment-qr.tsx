import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export function PaymentQR() {
    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-xs font-bold text-white">
                            KB
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Bakong KHQR</p>
                            <p className="text-xs text-slate-500">Payment</p>
                        </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Instant Verify</Badge>
                </div>

                {/* QR Code Placeholder */}
                <div className="mb-4 flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-white p-6">
                    <div className="grid grid-cols-5 gap-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-4 w-4 rounded-sm ${Math.random() > 0.4 ? "bg-slate-800" : "bg-white"}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-3 text-center">
                    <p className="text-xs text-slate-500">ឈមោះ: ITC Admissions Fund</p>
                    <p className="text-xs text-slate-400">ABA / ACLEDA / Canadia / Wing</p>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-sm font-medium text-white transition hover:bg-blue-700">
                    <CreditCard className="h-4 w-4" />
                    បង់ថ្លៃពាក្យសុំឥឡូវ (Pay $15.00)
                </button>
            </CardContent>
        </Card>
    );
}
