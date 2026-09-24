"use client";

import { CheckCircle2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { resolveText } from "@/data/department";
import type { DepartmentIdHeadingData } from "@/data/department";
import { Icon } from "./icon-renderer";

export interface DepartmentIdHeadingProps {
  data: DepartmentIdHeadingData;
  className?: string;
}

export default function DepartmentIdHeading({
  data,
  className,
}: DepartmentIdHeadingProps) {
  const { lang } = useLanguage();

  return (
    <div className={cn("w-full max-w-full mx-auto font-sans", className)}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
        <div className="h-40 w-full bg-gradient-to-r from-[#0a4f7c] to-[#167bb3] absolute top-0 left-0 z-0"></div>

        <div className="relative z-10 px-6 pt-24 pb-6">
          <div className="absolute top-4 right-6 flex items-center gap-2 text-white/90 text-xs font-medium">
            <div className="flex items-center gap-1">
              <Icon name="ShieldCheck" className="w-4 h-4" />
              <span>{data.accreditationBadge}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              <GraduationCap className="w-4 h-4" />
              <span>{data.facultyBadge}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 -mt-20 md:-mt-24">
              <div className="relative w-32 h-32 md:w-36 md:h-36 bg-white rounded-full p-2 shadow-md flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full bg-[#0e5a8a] flex items-center justify-center border-4 border-[#d4af37]"
                  style={{
                    backgroundImage: `url(${data.logo})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="text-white text-xs text-center font-bold px-2">
                    {resolveText(data.logoAlt, lang)}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 bg-[#0a7d4f] text-white p-1 rounded-full border-2 border-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {data.badges.map((badge, idx) => (
                  <Badge
                    key={idx}
                    className="bg-[#eef5fc] text-[#0e5a8a] gap-1"
                  >
                    <span className="text-blue-500">⏱</span> {badge}
                  </Badge>
                ))}
                <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                  Fundamental Foundation
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {resolveText(data.title, lang)}
              </h1>
              <p className="text-gray-600 mt-1 md:text-lg">
                {resolveText(data.subtitle, lang)}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4 md:absolute md:top-24 md:right-6">
                <Button className="gap-2 rounded-full px-6">
                  {resolveText(data.actions.primary.label, lang)}
                  <Icon name={data.actions.primary.icon} />
                </Button>
                <div className="flex gap-2">
                  {data.actions.secondary.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="secondary"
                      className="gap-2 rounded-full"
                    >
                      <Icon name={action.icon} />
                      {resolveText(action.label, lang)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#f8fafc] rounded-xl p-4 flex items-center gap-4"
              >
                <div
                  className={`${stat.iconBg} p-3 rounded-lg ${stat.iconColor}`}
                >
                  <Icon name={stat.icon} className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    {resolveText(stat.label, lang)}
                  </p>
                  <p
                    className={`font-bold ${stat.valueColor ?? "text-gray-900"}`}
                  >
                    {resolveText(stat.value, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}