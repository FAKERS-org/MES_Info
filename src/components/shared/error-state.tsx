import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ onRetry, className }: ErrorStateProps) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-border bg-card py-12 text-center",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">{t("error.loadFailed")}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <RotateCcw className="h-4 w-4" />
          {t("error.retry")}
        </button>
      )}
    </div>
  );
}
