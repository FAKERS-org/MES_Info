import { notFound } from "next/navigation";
import { DegreeSearch } from "@/components/university/programs-and-fees/degree-search";
import { FacultyCard } from "@/components/university/programs-and-fees/faculty-card";
import { getUniversityPageData } from "@/data/university-page";
import { universities } from "@/data/universities";

interface ProgramsPageProps {
  params: Promise<{ university: string }>;
}

/** "Programs & Fees" tab: search pills + the programs list. Chrome lives in the layout. */
export default async function ProgramsPage({ params }: ProgramsPageProps) {
  const { university: id } = await params;
  const university = universities.find((u) => u.id === id);

  if (!university) notFound();

  const { filters, faculty } = getUniversityPageData(university);

  return (
    <>
      <DegreeSearch pills={filters} />
      <FacultyCard data={faculty} />
    </>
  );
}
