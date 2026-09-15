import { ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApplicationConditionCard() {
  return (
    <Card className="w-full bg-white shadow-sm border-slate-100">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-500">
            <ShieldCheck size={22} />
          </div>
          <CardTitle className="text-lg font-bold text-slate-800">
            លក្ខខណ្ឌជ្រើសរើស
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">
              សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (BacII) និង/ឬ A, B, C (អនុវិទ្យាល័យវិទ្យាសាស្ត្រ)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">
              ប្រឡងចូលដោយផ្ទាល់លើជំនាញពីរគឺ ITC (គណិតវិទ្យា, រូបវិទ្យា & គំនិត Logic)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">
              ចំណេះដឹងភាសាអង់គ្លេស ឬ/ឬអាចសិក្សាដោយមូលដ្ឋាន (B1 Recommended)
            </span>
          </li>
        </ul>

        <div className="bg-[#eff6ff] rounded-xl p-4 flex items-center gap-3 mt-4">
          <div className="text-blue-600">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium mb-0.5">កាលបរិច្ឆេទបញ្ចប់ព្រឹត្តិបត្រ</p>
            <p className="text-sm font-bold text-slate-800">ថ្ងៃទី ១៥ ខែ កុម្ភៈ ឆ្នាំ ២០២៥</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}