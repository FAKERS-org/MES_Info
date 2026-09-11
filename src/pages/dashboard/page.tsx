import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/i18n";
import { institutions } from "@/data/institutions";
import UniInfoCard from "@/components/info/uni-info-card";

function ProfileCard() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm">
      <Avatar className="size-14">
        <AvatarFallback>YO</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-base font-bold text-foreground">
          {t("overview.welcome", { name: t("overview.userName") })}
        </p>
        <p className="text-sm text-muted-foreground">{t("overview.role")}</p>
      </div>
    </div>
  );
}

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <ProfileCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {institutions.map((institution) => (
          <UniInfoCard key={institution.id} institution={institution} />
        ))}
      </div>
    </div>
  );
}