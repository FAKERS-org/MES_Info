import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { universities } from "@/data/universities";

export default async function UniversityRootPage({
  params,
}: {
  params: Promise<{ university: string }>;
}) {
  const { university } = await params;

  const exists = universities.some((u) => u.id === university);
  if (!exists) notFound();

  redirect(`/explore-universities/${university}/programs`);
}