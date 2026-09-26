import { AdmissionRoadmap } from "@/components/university/admissions/admission-roadmap";
import { AdmissionsFAQ } from "@/components/university/admissions/admissions-faq";
import { ContactCard } from "@/components/university/admissions/contact-card";
import { EligibilityMatrix } from "@/components/university/admissions/eligibility-matrix";
import { ImportantDates } from "@/components/university/admissions/important-dates";
import { PaymentQR } from "@/components/university/admissions/payment-qr";
import { RegistrationFee } from "@/components/university/admissions/registration-fee";
import { RequiredDocuments } from "@/components/university/admissions/required-documents";
import { ResourceHub } from "@/components/university/admissions/resource-hub";

export default function AdmissionsPage() {
    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - 2/3 width */}
                    <div className="space-y-6 lg:col-span-2">
                        <EligibilityMatrix />
                        <AdmissionRoadmap />
                        <RequiredDocuments />
                        <ResourceHub />
                        <AdmissionsFAQ />
                    </div>

                    {/* Right Column - 1/3 width */}
                    <div className="space-y-6">
                        <ImportantDates />
                        <RegistrationFee />
                        <PaymentQR />
                        <ContactCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
