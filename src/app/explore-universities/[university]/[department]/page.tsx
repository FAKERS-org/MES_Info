import { findUnit, getAncestors, getUniversity } from "@/data/universities";
import { unitHref } from "@/lib/unit-routes";
import { notFound, redirect } from "next/navigation";

interface LegacyDepartmentPageProps {
    params: Promise<{ university: string; department: string }>;
}

/**
 * `/explore-universities/{university}/{unit}` — the original unit URL, kept as
 * a redirect.
 *
 * The unit is resolved by id anywhere in the tree and the visitor is sent to
 * the path that names its whole chain, so a link from before the hierarchy was
 * in the URL still lands on the right page. It used to render a page of its
 * own, reading `university.departments`, a property the `University` type has
 * not had since the tree moved to `units`.
 */
export default async function LegacyDepartmentPage({ params }: LegacyDepartmentPageProps) {
    const { university, department } = await params;

    const uni = getUniversity(university);
    if (!uni) notFound();

    const unit = uni ? findUnit(uni, department) : undefined;
    if (!unit) notFound();

    redirect(unitHref(university, getAncestors(uni, unit.id).map(ancestor => ancestor.id)));
}
