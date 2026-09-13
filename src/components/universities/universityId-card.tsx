// components/UniversityCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Share2,
  Bookmark,
  MapPin,
  Users,
  Wallet,
  Phone,
  Globe,
  CheckCircle2,
  GraduationCap,
  Award,
  MessageCircle,
} from "lucide-react";

export default function UniversityIdCard() {
  return (
    <Card
      padding="none"
      className="w-full max-w-full overflow-hidden rounded-2xl border shadow-lg bg-white"
    >
      {/* Header / Banner */}
      <div className="relative h-56 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
          <Badge className="bg-teal-700/80 hover:bg-teal-700 text-white border-0">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            MoEYS Verified (ទទួលស្គាល់ដោយក្រសួងអប់រំ យុវជន និងកីឡា)
          </Badge>
          <Badge className="bg-slate-700/60 hover:bg-slate-700 text-white border-0">
            Est. 1964 • គ្រឹះស្ថានសាធារណៈ
          </Badge>
        </div>

        {/* Action buttons top-right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>

        {/* Logo */}
        <div className="absolute left-6 -bottom-20">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-white p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                {/* Replace with your logo image */}
                <img
                  src="/images/ITC-logo.png"
                  alt="ITC Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <CheckCircle2 className="absolute -bottom-1 -right-1 w-6 h-6 text-green-500 fill-white" />
          </div>
        </div>

        {/* University name next to logo */}
        <div className="absolute left-[196px] top-[180px] -translate-y-1/2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-white">
              វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា
            </h1>
            <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
              ITC
            </Badge>
          </div>
          <p className="text-teal-100 text-sm mt-1">
            Institute of Technology of Cambodia
          </p>
        </div>
      </div>

      {/* Body */}
      <CardContent className="relative pt-24 pb-6 px-6">
        {/* 3 badges — next to the logo, just below the split border */}
        <div className="absolute left-[196px] top-4 flex items-center gap-2 flex-wrap pr-[300px]">
          <Badge variant="outline" className="gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            ប្រភេទគ្រឹះស្ថាន: (Public University)
          </Badge>
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1.5">
            <Award className="w-3.5 h-3.5" />
            STEM Excellence Leader
          </Badge>
          <Badge variant="outline" className="gap-1.5 text-slate-600">
            <Award className="w-3.5 h-3.5" />
            AUN-QA Accredited
          </Badge>
        </div>

        {/* Action buttons on the right */}
        <div className="flex justify-end gap-3">
          <Button className="bg-sky-600 hover:bg-sky-700 text-white gap-2 rounded-lg px-5">
            <MessageCircle className="w-4 h-4" />
            Chat Telegram (ជជែកអ៉ីវ)
          </Button>
          <a
            href="https://itc.edu.kh"
            className="flex items-center gap-1.5 text-slate-600 hover:text-sky-600 text-sm"
          >
            <Globe className="w-4 h-4" />
            itc.edu.kh
          </a>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <InfoItem
            icon={<MapPin className="w-5 h-5 text-slate-400" />}
            label="ទីតាំង (Campus)"
            value="Russian Blvd, Toul Kor..."
          />
          <InfoItem
            icon={<Users className="w-5 h-5 text-slate-400" />}
            label="ចំនួនសិស្សសរុប"
            value="12,000+ Students"
          />
          <InfoItem
            icon={<Wallet className="w-5 h-5 text-slate-400" />}
            label="ថ្លៃសិក្សាមធ្យម"
            value="$600 - $850 / ឆ្នាំ (Year)"
          />
          <InfoItem
            icon={<Phone className="w-5 h-5 text-slate-400" />}
            label="ទូរស័ព្ទទំនាក់ទំនង"
            value="(+855) 23 880 370"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}