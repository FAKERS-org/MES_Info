import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  ScholarshipAction,
  ScholarshipTone,
} from "@/data/scholarships-page";
import { buttonTone } from "@/lib/tones";

export interface ScholarshipApplyButtonProps {
  action: ScholarshipAction;
  /** Tone of the card the button sits on; used when the action names none. */
  fallbackTone?: ScholarshipTone;
  /** `outline` is the secondary action of a grouped sub-card. */
  variant?: "default" | "outline";
  /** Stretch the button across its column. */
  block?: boolean;
}

/**
 * The "apply" call to action every scholarship card ends on. An action with an
 * `href` becomes a link, otherwise it stays a plain button; the colour comes
 * from the action itself or, failing that, from the card it belongs to.
 */
export function ScholarshipApplyButton({
  action,
  fallbackTone = "blue",
  variant = "default",
  block = false,
}: ScholarshipApplyButtonProps) {
  const className = cn(
    block && "w-full",
    variant === "default" && buttonTone[action.tone ?? fallbackTone]
  );

  const content = (
    <>
      {action.label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </>
  );

  if (action.href) {
    return (
      <Button asChild variant={variant} className={className}>
        <Link href={action.href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} className={className}>
      {content}
    </Button>
  );
}
