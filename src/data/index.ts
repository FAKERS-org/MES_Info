/**
 * Public entry point for `src/data/`.
 *
 * Three distinct things live in this folder — import them by name here, not
 * by reaching into the individual files:
 *
 * 1. `./universities`  — entity data: the `University` / `Department` types
 *                        and the seed list served by `/api/universities`.
 * 2. `./university-page` / `./department-page` / `./admissions-page` /
 *                        `./scholarships-page` — placeholder UI copy for the
 *                        detail pages. University page copy is *built*
 *                        from the entity (`getUniversityPageData`), the two
 *                        tab pages likewise, the department page copy is
 *                        still mock content.
 * 3. `./text`          — `resolveText`, the `NamespacedText` language picker.
 */
export type { University, Department, NamespacedText } from "./universities";
export { resolveText } from "./text";
export { departmentPageData } from "./department-page";
export { getUniversityPageData } from "./university-page";
export { getAdmissionsPageData } from "./admissions-page";
export { getScholarshipsPageData } from "./scholarships-page";
export type {
  AdmissionsPageData,
  RequirementGroup,
  ApplyStep,
  KeyDate,
  RequirementsCardData,
  ApplyStepsCardData,
  KeyDatesCardData,
} from "./admissions-page";
export type { ScholarshipsCardData } from "./scholarships-page";
export { iconMap, getIcon } from "@/lib/icons";
export type { IconName } from "@/lib/icons";
export type {
  UniversityPageData,
  UniversityHeroData,
  FacultyCardData,
  AboutCardData,
  HotNewsCardData,
  AdmissionsCardData,
  CampusMapCardData,
  BrochureCardData,
  UniversityMenuTab,
} from "./university-page";
export type {
  DepartmentStat,
  DepartmentIdHeadingData,
  SyllabusSection,
  CourseSyllabusData,
  RequirementItem,
  DeadlineItem,
  ApplicationConditionData,
  ScholarshipItem,
  ScholarshipBriefData,
  CareerItem,
  CareerPathData,
  ContactItem,
  DiscussionCardData,
  FacilityItem,
  FacilityCardData,
  DepartmentPageData,
} from "./department-page";
