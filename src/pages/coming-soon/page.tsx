import { ClipboardList, Clock, FileCheck, History, ListChecks, Timer, User, UserRound, Settings, Building2, GraduationCap, BookOpen, Briefcase, Award, GitCompare } from "lucide-react";
import { useLocation } from "react-router-dom";
import ComingSoon from "@/components/shared/coming-soon";
import { useLanguage } from "@/lib/i18n";
import { useUniversities } from "@/hooks/use-universities";
import UniInfoCard from "@/components/info/uni-info-card";
import { SkeletonGrid } from "@/components/shared/skeleton";

type FeatureId = "exam" | "history" | "profile" | "info" | "majors" | "scholarships" | "compare";

function resolveFeature(pathname: string): FeatureId {
  if (pathname.startsWith("/history")) return "history";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/info")) return "info";
  if (pathname.startsWith("/majors-and-careers")) return "majors";
  if (pathname.startsWith("/scholarships")) return "scholarships";
  if (pathname.startsWith("/compare")) return "compare";
  return "exam";
}

export default function ComingSoonPage() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const { universities, status } = useUniversities();
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
      majors: {
        title: t("comingSoon.majors.title"),
        description: t("comingSoon.majors.description"),
        features: [
          { icon: Briefcase, label: t("comingSoon.majors.features.majors") },
          { icon: BookOpen, label: t("comingSoon.majors.features.careers") },
          { icon: GraduationCap, label: t("comingSoon.majors.features.guides") },
        ],
      },
      scholarships: {
        title: t("comingSoon.scholarships.title"),
        description: t("comingSoon.scholarships.description"),
        features: [
          { icon: Award, label: t("comingSoon.scholarships.features.listings") },
          { icon: FileCheck, label: t("comingSoon.scholarships.features.deadlines") },
          { icon: ClipboardList, label: t("comingSoon.scholarships.features.apply") },
        ],
      },
      compare: {
        title: t("comingSoon.compare.title"),
        description: t("comingSoon.compare.description"),
        features: [
          { icon: GitCompare, label: t("comingSoon.compare.features.sideBySide") },
          { icon: Building2, label: t("comingSoon.compare.features.departments") },
          { icon: ListChecks, label: t("comingSoon.compare.features.requirements") },
        ],
      },
    }[feature];

  return (
    <ComingSoon
      title={config.title}
      description={config.description}
      features={config.features}
    >
      {feature === "info" &&
        (status === "loading" ? (
          <SkeletonGrid count={4} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {universities.map((university) => (
              <UniInfoCard key={university.id} university={university} />
            ))}
          </div>
        ))}
    </ComingSoon>
  );
}
