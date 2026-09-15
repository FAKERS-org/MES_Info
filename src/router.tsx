import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, ExploreUniversitiesPage, UniversityIdPage, OverviewPage, RootLayout, ComingSoonPage } from "./pages";
import DepartmentIdPage from "./pages/explore-universities/university/department/page";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "explore-universities", element: <ExploreUniversitiesPage /> },
      { path: "explore-universities/:university", element: <UniversityIdPage /> },
      { path: "explore-universities/:university/:department", element: <DepartmentIdPage /> },
      { path: "majors-and-careers", element: <ComingSoonPage /> },
      { path: "scholarships", element: <ComingSoonPage /> },
      { path: "compare", element: <ComingSoonPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;