import { ClipboardList, Clock, FileCheck, History, ListChecks, Timer, User, UserRound, Settings, Building2, GraduationCap, BookOpen } from "lucide-react";
import { useLocation } from "react-router-dom";
import ComingSoon from "@/components/shared/coming-soon";
import { useLanguage } from "@/lib/i18n";
import UniInfoCard from "@/components/info/uni-info-card";
import { universities } from "@/data/universities";

type FeatureId = "exam" | "history" | "profile" | "info";

function resolveFeature(pathname: string): FeatureId {
  if (pathname.startsWith("/history")) return "history";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/info")) return "info";
  return "exam";
}

export default function ComingSoonPage() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const feature = resolveFeature(pathname);

const config = {
      exam: {
        title: t("comingSoon.exam.title"),
        description: t("comingSoon.exam.description"),
        features: [
          { icon: ClipboardList, label: t("comingSoon.exam.features.mock") },
          { icon: Timer, label: t("comingSoon.exam.features.timed") },
          { icon: ListChecks, label: t("comingSoon.exam.features.mcq") },
          { icon: FileCheck, label: t("comingSoon.exam.features.score") },
        ],
      },
      history: {
        title: t("comingSoon.history.title"),
        description: t("comingSoon.history.description"),
        features: [
          { icon: History, label: t("comingSoon.history.features.results") },
          { icon: FileCheck, label: t("comingSoon.history.features.scores") },
          { icon: Clock, label: t("comingSoon.history.features.duration") },
          { icon: ListChecks, label: t("comingSoon.history.features.review") },
        ],
      },
      profile: {
        title: t("comingSoon.profile.title"),
        description: t("comingSoon.profile.description"),
        features: [
          { icon: User, label: t("comingSoon.profile.features.account") },
          { icon: UserRound, label: t("comingSoon.profile.features.info") },
          { icon: Settings, label: t("comingSoon.profile.features.settings") },
        ],
      },
      info: {
        title: t("comingSoon.title"),
        description: t("comingSoon.description"),
        features: [
          { icon: Building2, label: t("comingSoon.features.institutions") },
          { icon: GraduationCap, label: t("comingSoon.features.departments") },
          { icon: BookOpen, label: t("comingSoon.features.exams") },
          { icon: Clock, label: t("comingSoon.features.timed") },
        ],
      },
    }[feature];

  return (
    <ComingSoon
      title={config.title}
      description={config.description}
      features={config.features}
    >
      {feature === "info" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {universities.map((university) => (
            <UniInfoCard key={university.id} university={university} />
          ))}
        </div>
      )}
    </ComingSoon>
  );
}
