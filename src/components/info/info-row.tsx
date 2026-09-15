import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InfoRowProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: ReactNode;
  href?: string;
  className?: string;
}

export function InfoRow({ icon, label, value, href, className }: InfoRowProps) {
  const content = (
    <>
      {icon && (
        <span className="mt-0.5 shrink-0 text-primary">{icon}</span>
      )}
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
      {value && (
        <span className="text-sm leading-relaxed text-muted-foreground">
          {value}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("flex items-start gap-3 py-1.5 text-sm font-medium text-primary hover:underline", className)}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {content}
    </div>
  );
}
