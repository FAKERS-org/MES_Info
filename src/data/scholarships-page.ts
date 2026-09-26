import { departmentPageData } from "@/data/department-page";
import type { ScholarshipItem } from "@/data/department-page";
import type { NamespacedText, University } from "@/data/universities";

/* ------------------------------------------------------------------ *
 * Types                                                               *
 * ------------------------------------------------------------------ */

export interface ScholarshipsCardData {
  header: { title: string; subtitle: string; badge?: string };
  items: ScholarshipItem[];
  /** Rendered when the school publishes none. */
  empty: NamespacedText;
  /** App-wide scholarship board, offered by the empty state as a next step. */
  board: { label: string; href: string };
  /** School website, offered by the empty state as the authoritative source. */
  website?: string;
}

/* ------------------------------------------------------------------ *
 * Sample content — only attached where it is known to be true         *
 * ------------------------------------------------------------------ */

/**
 * The three scholarships are the same sample the department page shows in its
 * scholarship brief — they are ITC's, so they are attached to ITC alone here
 * rather than copied into a second list that could drift.
 */
const ITC_SCHOLARSHIPS = departmentPageData.scholarship.scholarships;

const EMPTY_SCHOLARSHIPS: NamespacedText = {
  kh: "សាលានេះមិនទាន់បានចុះផ្សាយអាហារូបករណ៍នៅឡើយ។ អាចពិនិត្យមើលបញ្ជីអាហារូបករណ៍ទាំងអស់ ឬគេហទំព័រសាលា។",
  en: "This school has not published any scholarship yet — browse all scholarships or check the school's website.",
};

/* ------------------------------------------------------------------ *
 * Builder                                                             *
 * ------------------------------------------------------------------ */

/**
 * Left column of `/explore-universities/{university}/scholarships`.
 *
 * Following the rule of the university page, only content that is known to be
 * true is attached: ITC keeps its sample list, every other school renders the
 * empty state with a link to the global board instead of invented awards.
 */
export function getScholarshipsPageData(
  university: University
): ScholarshipsCardData {
  const site = university.website
    ? university.website.startsWith("http")
      ? university.website
      : `https://${university.website}`
    : undefined;

  const items = university.id === "itc" ? ITC_SCHOLARSHIPS : [];

  return {
    header: {
      title: "អាហារូបករណ៍",
      subtitle: "(Scholarships)",
      badge: items.length > 0 ? `${items.length} Available` : undefined,
    },
    items,
    empty: EMPTY_SCHOLARSHIPS,
    board: {
      label: "អាហារូបករណ៍ទាំងអស់ (All scholarships)",
      href: "/scholarships",
    },
    website: site,
  };
}
