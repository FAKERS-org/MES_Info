import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AdmissionRoadmap } from "@/components/university/admissions/admission-roadmap";
import { AdmissionsFAQ } from "@/components/university/admissions/admissions-faq";
import { ContactCard } from "@/components/university/admissions/contact-card";
import { EligibilityMatrix } from "@/components/university/admissions/eligibility-matrix";
import { ImportantDates } from "@/components/university/admissions/important-dates";
import { PaymentQR } from "@/components/university/admissions/payment-qr";
import { RegistrationFee } from "@/components/university/admissions/registration-fee";
import { RequiredDocuments } from "@/components/university/admissions/required-documents";
import { RequirementsCard } from "@/components/university/admissions/requirements-card";
import { ResourceHub } from "@/components/university/admissions/resource-hub";
import { cn } from "@/lib/utils";
import { getAdmissionsPageData } from "@/data/admissions-page";
import { universities } from "@/data/universities";

interface AdmissionsPageProps {
  params: Promise<{ university: string }>;
}

/**
 * "Admissions" tab: a wide column of the school's admissions sections and a
 * narrow rail of dates, fees and contact. Every section is optional — the
 * sample ones (see `getAdmissionsPageData`) exist for ITC only — and the real
 * requirements of each program always render, so the tab is never blank.
 * The grid drops to one column when the rail has nothing to show.
 */
export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
  const { university: id } = await params;
  const university = universities.find((u) => u.id === id);

  if (!university) notFound();

  const data = getAdmissionsPageData(university);

  const rail: ReactNode[] = [];
  if (data.dates) rail.push(<ImportantDates key="dates" data={data.dates} />);
  if (data.fee) rail.push(<RegistrationFee key="fee" data={data.fee} />);
  if (data.payment) rail.push(<PaymentQR key="payment" data={data.payment} />);
  if (data.contact)
    rail.push(<ContactCard key="contact" data={data.contact} />);

  const hasRail = rail.length > 0;

  return (
    <div className="py-4 md:py-8">
      <div className={cn("grid grid-cols-1 gap-6", hasRail && "lg:grid-cols-3")}>
        {/* Left Column - 2/3 width */}
        <div className={cn("space-y-6", hasRail && "lg:col-span-2")}>
          {data.eligibility && <EligibilityMatrix data={data.eligibility} />}
          {data.roadmap && <AdmissionRoadmap data={data.roadmap} />}
          {data.documents && <RequiredDocuments data={data.documents} />}
          {data.resources && <ResourceHub data={data.resources} />}
          {data.faq && <AdmissionsFAQ data={data.faq} />}
          <RequirementsCard data={data.requirements} />
        </div>

        {/* Right Column - 1/3 width */}
        {hasRail && <div className="space-y-6">{rail}</div>}
      </div>
    </div>
  );
}
