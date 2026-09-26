import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";

export function ContactCard() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-900">ការិយាល័យប្រធាន & ទំនាក់ទំនង</CardTitle>
                    <Share2 className="h-5 w-5 text-blue-600" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Contact Person */}
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                        <img
                            src="/avatar-placeholder.png"
                            alt="Admissions Officer"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">លោកគ្រូ សុខ វិបុល</p>
                        <p className="text-xs text-slate-500">បរធានការិយាល័យចូលរៀន & ទំនាក់ទំនង</p>
                        <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">
                            ផ្ទាល់អនឡាញ • Online
                        </Badge>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 rounded-lg bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>បន្ទប់ ០៦ អាគារ A (Campus ITC, Russian Blvd)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <span>023 880 370 / 012 880 370</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <span>admission@itc.edu.kh</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>ច័នទ - សុក្រ: 7:30 ព្ឹក - 5:00 លងាច</span>
                    </div>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-sm font-medium text-white transition hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4" />
                    ជជែក Telegram ជាមួយអ្នកណែនាំភ្លាម
                </button>
            </CardContent>
        </Card>
    );
}
