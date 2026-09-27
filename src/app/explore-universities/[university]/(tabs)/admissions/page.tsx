import AdmissionRoadmap from "@/components/university/admissions/admission-roadmap";
import EligibilityMatrix from "@/components/university/admissions/eligibility-matrix";
import ImportantDates from "@/components/university/admissions/important-dates";
import PaymentQR from "@/components/university/admissions/payment-qr";
import { AdmissionsPending } from "@/components/university/admissions/pending-section";
import RequiredDocuments from "@/components/university/admissions/required-documents";
import type { AdmissionsSectionKey } from "@/data/admissions-page";
import { getAdmissionsPageData } from "@/data/admissions-page";
import { findUniversity } from "@/data/universities-source";
import { readLang } from "@/lib/language.server";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

interface AdmissionsPageProps {
    params: Promise<{ university: string }>;
}

/**
 * "Admissions" tab: a wide column of the school's admissions sections and a
 * narrow rail of dates, fees and contact.
 *
 * Every section is optional, so a school that sits no entrance exam simply
 * loses the exam sections, and the real requirements of each program always
 * render — the tab is never blank. A slot the school has published nothing for
 * falls back to {@link AdmissionsPending}, which keeps the page's shape and
 * says the section is unpublished; a slot the school never had (exam papers
 * for a school that admits without an exam) is left out entirely. The grid
 * drops to one column when the rail has nothing to show.
 *
 * The reader's language is read from the cookie here rather than from a client
 * context, because these cards are Server Components: the data is resolved
 * before render, so the markup that arrives already says one language and
 * there is no "both at once" state to flash.
 */
export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
    const { university: id } = await params;
    const university = await findUniversity(id);

    if (!university) notFound();

    const data = getAdmissionsPageData(university, await readLang());
    const pending = new Map(data.pending.map(section => [section.key, section]));

    /* Each slot shows its card when the school published it, says so when it did
     * not, and stays absent when the school never had one — e.g. exam papers for
     * a school that admits without an exam. The layout below is the single
     * source of the page order. */
    const slot = (key: AdmissionsSectionKey, node: ReactNode | undefined) => {
        if (node) return node;
        const section = pending.get(key);
        return section ? <AdmissionsPending key={key} section={section} /> : null;
    };

    const rail: ReactNode[] = [
        slot("dates", data.dates && <ImportantDates />),
        slot("payment", data.payment && <PaymentQR />),
        // slot("contact", data.contact && <ContactCard data={data.contact} />),
    ].filter(Boolean);

    const hasRail = rail.length > 0;

    return (
        <div className="py-3 md:py-6">
            <div className={cn("grid grid-cols-1 gap-4", hasRail && "lg:grid-cols-3")}>
                {/* Left Column - 2/3 width */}
                <div className={cn("space-y-4", hasRail && "lg:col-span-2")}>
                    {slot("eligibility", data.eligibility && <EligibilityMatrix />)}
                    {slot("roadmap", data.roadmap && <AdmissionRoadmap />)}
                    {slot("documents", data.documents && <RequiredDocuments />)}
                    {/* {data.resources && <ResourceHub data={data.resources} />} */}
                    {/* {slot("faq", data.faq && <AdmissionsFAQ data={data.faq} />)} */}
                    {/* <RequirementsCard data={data.requirements} /> */}
                </div>

                {/* Right Column - 1/3 width */}
                {hasRail && <div className="space-y-4">{rail}</div>}
            </div>
        </div>
    );
}
