import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, ExploreUniversitiesPage, UniversityPage, OverviewPage, RootLayout, ComingSoonPage } from "./pages";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "explore-universities", element: <ExploreUniversitiesPage /> },
      { path: "explore-universities/:university", element: <UniversityPage /> },
      { path: "majors-and-careers", element: <ComingSoonPage /> },
      { path: "scholarships", element: <ComingSoonPage /> },
      { path: "compare", element: <ComingSoonPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;