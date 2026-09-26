import { notFound } from "next/navigation";
import { ScholarshipListCard } from "@/components/university/scholarships/scholarship-list-card";
import { getScholarshipsPageData } from "@/data/scholarships-page";
import { universities } from "@/data/universities";

interface ScholarshipsPageProps {
  params: Promise<{ university: string }>;
}

/** "Scholarships" tab: the awards the school publishes, or a pointer to the global board. */
export default async function ScholarshipsPage({
  params,
}: ScholarshipsPageProps) {
  const { university: id } = await params;
  const university = universities.find((u) => u.id === id);

  if (!university) notFound();

  const data = getScholarshipsPageData(university);

  return <ScholarshipListCard data={data} />;
}
