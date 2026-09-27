"use client";

import type { PendingSection } from "@/data/admissions-page";
import { AdmissionsCard } from "@/components/university/admissions/admissions-card";
import { resolveText } from "@/data/text";
import { useLanguage } from "@/lib/i18n";

export interface AdmissionsPendingProps {
  section: PendingSection;
}

/**
 * Stand-in for a section the school has not published — the sections of a
 * school an admin added, until somebody writes them.
 *
 * It reuses the admissions card shell so an unbuilt section sits in the same
 * rhythm as a built one, but the body is a single muted line rather than a
 * full panel: a school missing six sections should read as a short page, not
 * as a page padded with six holes. Saying the section is unpublished is the
 * point — the alternative, silently dropping it, is what made this tab look
 * broken in the first place.
 */
export const AdmissionsPending = ({ section }: AdmissionsPendingProps) => {
  const { lang } = useLanguage();

  return (
    <AdmissionsCard
      header={section.header}
      headerAction={<PendingPill />}
      bodyClassName="py-3"
    >
      <p className="text-sm leading-relaxed text-slate-500">
        {resolveText(section.copy, lang)}
      </p>
    </AdmissionsCard>
  );
};

/** "Not published yet" in the card's action slot, as a muted tag. */
const PendingPill = () => (
  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
    មិនទាន់ចុះផ្សាយ · Pending
  </span>
);
