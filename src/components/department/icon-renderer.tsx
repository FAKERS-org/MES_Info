import { type LucideIcon } from "lucide-react";
import { getIcon } from "@/data/department";
import type { IconName } from "@/data/department";

export interface IconRendererProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconRendererProps) {
  const IconComponent: LucideIcon = getIcon(name);
  return <IconComponent className={className} />;
}