import React from 'react';
import { Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ScholarshipBriefCard() {
  const scholarships = [
    {
      title: "Techo Digital Talent (MPTC)",
      discount: "100% Full",
      description: "ឧបត្ថម្ភពេញលេញសិក្សា ១០០% រួមទាំងថ្លៃសិក្សា និងថ្លៃផ្សេងៗ",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "ITC Academic Excellence",
      discount: "50% - 100%",
      description: "សម្រាប់និស្សិតដែលមានពិន្ទុខ្ពស់បំផុតចំណាត់ថ្នាក់ក្នុង Top 50",
      color: "bg-slate-100 text-slate-700"
    },
    {
      title: "Women in Tech Grant",
      discount: "75% Award",
      description: "លើកទឹកចិត្តសិស្សនារីដែលមានទេពកោសល្យខាងវិស្វកម្ម AI និងកុំព្យូទ័រ។",
      color: "bg-teal-50 text-teal-700"
    }
  ];

  return (
    <Card className="w-full bg-white shadow-sm border-slate-100">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
              <Wallet size={20} />
            </div>
            <CardTitle className="text-lg font-bold text-slate-800">
              អាហារូបករណ៍
            </CardTitle>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-2 py-0.5 text-xs font-semibold">
            Available
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {scholarships.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
              <Badge className={`${item.color} border-none font-bold text-xs`}>
                {item.discount}
              </Badge>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {item.description}
            </p>
            {idx !== scholarships.length - 1 && <Separator className="mt-4 bg-slate-100" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}