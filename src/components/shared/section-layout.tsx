import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionLayoutProps {
  children: ReactNode;
  /** Side column. When omitted, the main content spans the full width. */
  aside?: ReactNode;
  /** Breakpoint of the 2/1 split: `xl` on the department page, `md` on the university page. */
  breakpoint?: "md" | "xl";
  /** `muted` renders the `bg-slate-50` band used by the department page. */
  background?: "none" | "muted";
  mainClassName?: string;
  asideClassName?: string;
  className?: string;
}

/**
 * Page band wrapping a wide main column plus a narrow side column, used by
 * both detail pages of `/explore-universities`.
 */
export function SectionLayout({
  children,
  aside,
  breakpoint = "xl",
  background = "none",
  mainClassName,
  asideClassName,
  className,
}: SectionLayoutProps) {
  return (
    <div
      className={cn(
        background === "muted" && "flex items-start justify-center bg-slate-50 py-8",
        className
      )}
    >
      <div
        className={cn(
          "grid w-full max-w-full grid-cols-1 gap-6",
          aside && `${breakpoint}:grid-cols-3`
        )}
      >
        <div className={cn(aside && `${breakpoint}:col-span-2`, mainClassName)}>
          {children}
        </div>

        {aside && (
          <div
            className={cn(
              "flex flex-col gap-6",
              `${breakpoint}:col-span-1`,
              asideClassName
            )}
          >
            {aside}
          </div>
        )}
      </div>
    </div>
  );
}
