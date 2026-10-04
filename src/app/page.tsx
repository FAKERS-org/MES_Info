// `/` now serves the university listing: it re-exports the very same page that
// `/explore-universities` renders, so both URLs show the listing and there is
// only one implementation of it.
//
// The overview page that used to live at `/` is kept here, commented out, to be
// restored when it is wanted again.
//
// "use client";
//
// import { ErrorState } from "@/components/shared/error-state";
// import { SkeletonGrid } from "@/components/shared/skeleton";
// import { UniversityTile } from "@/components/university/university-tile";
// import { useUniversities } from "@/hooks/use-universities";
// import { useLanguage } from "@/lib/i18n";
//
// export default function OverviewPage() {
//     const { universities, status, refresh } = useUniversities();
//     const { t } = useLanguage();
//
//     if (status === "loading") {
//         return <SkeletonGrid count={4} />;
//     }
//
//     if (status === "error") {
//         return <ErrorState onRetry={refresh} />;
//     }
//
//     return (
//         <div className="w-full space-y-6">
//             <header>
//                 <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{t("nav.overview")}</h1>
//             </header>
//
//             <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {universities.map(university => (
//                     <UniversityTile key={university.id} university={university} />
//                 ))}
//             </div>
//         </div>
//     );
// }

export { default } from "./explore-universities/page";
