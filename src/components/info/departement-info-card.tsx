import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Department } from "@/data/universities";

export interface DepartementInfoCardProps {
  department: Department;
  logoSize?: number;
  open?: boolean;
  onToggle?: () => void;
  className?: string;
}

const DepartementInfoCard: React.FC<DepartementInfoCardProps> = ({
  department,
  logoSize = 48,
  open = false,
  onToggle,
  className,
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "h-fit w-full select-none rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:bg-accent/50",
        onToggle && "cursor-pointer",
        className
      )}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <img
            src={department.logo}
            alt={t(department.nameKey)}
            className="shrink-0 object-contain"
            style={{ height: logoSize, width: "auto" }}
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {t(department.nameKey)}
            </h3>
            <span className="text-sm text-muted-foreground">{t(department.enNameKey)}</span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-4 border-t border-muted pt-4">
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              {t("info.department.requirements.heading")}
            </h4>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {department.requirementKeys.map((key, index) => (
                <li key={index}>{t(key)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartementInfoCard;
