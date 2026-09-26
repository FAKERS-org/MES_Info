import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import { cn } from "@/lib/utils";
import type { PaymentQrData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";

export interface PaymentQrProps {
  data: PaymentQrData;
}

/**
 * Placeholder QR. The cells are a fixed pattern rather than `Math.random()`:
 * random cells differ between the server render and the hydration pass, which
 * React reports as a markup mismatch.
 */
const QR_PATTERN = "1110101011101010111010111";

/** Bakong KHQR block: brand, code placeholder, accounts and the pay button. */
export function PaymentQR({ data }: PaymentQrProps) {
  const { brand, caption, action } = data;

  return (
    <AdmissionsCard bodyClassName="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-xs font-bold text-white">
            {brand.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{brand.title}</p>
            {brand.subtitle && (
              <p className="text-xs text-slate-500">{brand.subtitle}</p>
            )}
          </div>
        </div>

        {brand.badge && (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {brand.badge}
          </Badge>
        )}
      </div>

      <div className="mb-4 flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-white p-6">
        <div className="grid grid-cols-5 gap-1">
          {QR_PATTERN.split("").map((cell, index) => (
            <div
              key={index}
              className={cn(
                "h-4 w-4 rounded-sm",
                cell === "1" ? "bg-slate-800" : "bg-white"
              )}
            />
          ))}
        </div>
      </div>

      {caption && (
        <div className="mb-3 text-center">
          <p className="text-xs text-slate-500">{caption.title}</p>
          {caption.subtitle && (
            <p className="text-xs text-slate-400">{caption.subtitle}</p>
          )}
        </div>
      )}

      {action && (
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-sm font-medium text-white transition hover:bg-blue-700">
          <Icon name={action.icon} className="h-4 w-4" />
          {action.label}
        </button>
      )}
    </AdmissionsCard>
  );
}
