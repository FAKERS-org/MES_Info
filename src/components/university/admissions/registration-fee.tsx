import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";

export function RegistrationFee() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-900">ថ្លៃចុះឈ្មោះប្រឡង និងការសិក្សា</CardTitle>
                    <Link2 className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-xs text-slate-500">Registration & Exam Fee</p>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg bg-slate-50 p-4">
                    <p className="mb-1 text-xs text-slate-500">ថ្លៃចុះឈ្មោះប្រឡងសរុប</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">$15.00</span>
                        <span className="text-sm text-slate-500">/</span>
                        <span className="text-sm text-slate-500 line-through">៦០,០០០ រៀល</span>
                    </div>
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">Non-refundable</Badge>
                </div>
            </CardContent>
        </Card>
    );
}
