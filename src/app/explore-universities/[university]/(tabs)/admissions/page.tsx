import { notFound } from "next/navigation";
import { RequirementsCard } from "@/components/university/admissions/requirements-card";
import { ApplyStepsCard } from "@/components/university/admissions/apply-steps-card";
import { KeyDatesCard } from "@/components/university/admissions/key-dates-card";
import { getAdmissionsPageData } from "@/data/admissions-page";
import { universities } from "@/data/universities";

interface AdmissionsPageProps {
  params: Promise<{ university: string }>;
}

/**
 * "Admissions" tab: what each program requires, how to apply and the intake
 * calendar. The chrome (hero, menu, right rail) comes from the tab layout.
 */
export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
  const { university: id } = await params;
  const university = universities.find((u) => u.id === id);

  if (!university) notFound();

  const { requirements, steps, keyDates } = getAdmissionsPageData(university);

  return (
    <>
      <RequirementsCard data={requirements} />
      <ApplyStepsCard data={steps} />
      {keyDates && <KeyDatesCard data={keyDates} />}
    </>
  );
}
