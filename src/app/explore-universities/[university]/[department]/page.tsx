import { findUnit, getUniversity } from "@/data/universities";
import { notFound, redirect } from "next/navigation";

interface LegacyDepartmentPageProps {
    params: Promise<{ university: string; department: string }>;
}

/**
 * `/explore-universities/{university}/{department}` — the original department
 * URL, kept as a redirect.
 *
 * It used to render a page of its own, reading `university.departments`, a
 * property the `University` type has not had since the tree moved to `units`;
 * the lookup was a type error and a runtime `.find` on `undefined`. Links
 * already in the wild still point here, so the unit is resolved by id at any
 * depth and the visitor is sent to the route that owns the page.
 */
export default async function LegacyDepartmentPage({ params }: LegacyDepartmentPageProps) {
    const { university, department } = await params;

    const uni = getUniversity(university);
    const unit = uni ? findUnit(uni, department) : undefined;
    if (!unit) notFound();

    redirect(`/explore-universities/${university}/programs/${department}`);
}
