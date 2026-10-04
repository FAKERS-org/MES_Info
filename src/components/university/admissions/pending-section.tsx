"use client";

import type { PendingSection } from "@/data/admissions-page";
import { AdmissionsCard } from "@/components/university/admissions/admissions-card";
import { resolveText } from "@/data/text";
import { useLanguage } from "@/lib/i18n";

export interface AdmissionsPendingProps {
  section: PendingSection;
}

export const AdmissionsPending = ({ section }: AdmissionsPendingProps) => {
  const { lang } = useLanguage();

  return (
    <AdmissionsCard
      header={section.header}
      headerAction={<PendingPill />}
      bodyClassName="py-3"
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        {resolveText(section.copy, lang)}
      </p>
    </AdmissionsCard>
  );
};

/** "Not published yet" in the card's action slot, as a muted tag. */
const PendingPill = () => (
  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
    មិនទាន់ចុះផ្សាយ · Pending
  </span>
);
