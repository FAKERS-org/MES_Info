/**
 * @deprecated Deprecated as part of Two-Bucket Architecture Refactor.
 * Use generic `<MetadataRenderer data={...} />` instead.
 * Preserved for backward compatibility.
 */
import MetadataRenderer from "@/components/shared/metadata-renderer";
import type { UniversityHeadingData } from "@/components/department/department-heading";
import type { Lang } from "@/lib/language";

export interface AdmissionContactProps {
    university: UniversityHeadingData;
    lang: Lang;
}

const AdmissionContact = ({ university }: AdmissionContactProps) => {
    const contact = university.contact;
    const data: Record<string, unknown> = {};
    if (contact?.phone) data.contact_phone = contact.phone;
    if (contact?.email) data.contact_email = contact.email;
    if (contact?.telegram) data.contact_telegram = contact.telegram;

    return (
        <MetadataRenderer
            data={Object.keys(data).length > 0 ? data : null}
            title="Academic Inquiries"
            emptyMessage="No contact information available."
        />
    );
};

export default AdmissionContact;
