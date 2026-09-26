import { getIcon, type IconName } from "@/lib/icons";
import type { LucideIcon, LucideProps } from "lucide-react";

export interface IconRendererProps extends Omit<LucideProps, "ref"> {
    name: IconName;
}

/** Renders a registered icon ({@link IconName}) with the usual lucide props. */
export function Icon({ name, ...props }: IconRendererProps) {
    const IconComponent: LucideIcon = getIcon(name);
    return <IconComponent {...props} />;
}
