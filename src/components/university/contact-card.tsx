/**
 * @deprecated Deprecated as part of Two-Bucket Architecture Refactor.
 * Use generic `<MetadataRenderer data={...} />` instead.
 * Preserved for backward compatibility.
 */
import MetadataRenderer from "@/components/shared/metadata-renderer";

export interface AdmissionsContactCardProps {
    phone?: string | null;
    email?: string | null;
    telegram?: string | null;
    universityName?: string | null;
    website?: string | null;
    advisorName?: string | null;
    advisorRole?: string | null;
    advisorAvatar?: string | null;
}

export default function AdmissionsContactCard({
    phone,
    email,
    telegram,
    advisorName,
    advisorRole,
}: AdmissionsContactCardProps) {
    const data: Record<string, unknown> = {};
    if (phone) data.contact_phone = phone;
    if (email) data.contact_email = email;
    if (telegram) data.contact_telegram = telegram;
    if (advisorName) data.academic_advisor = advisorName;
    if (advisorRole) data.advisor_role = advisorRole;

    return (
        <MetadataRenderer
            data={Object.keys(data).length > 0 ? data : null}
            title="Admissions & Contact"
            emptyMessage="No contact information available."
        />
    );
}
