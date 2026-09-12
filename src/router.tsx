import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, ExploreUniversitiesPage, UniversityPage, OverviewPage, RootLayout } from "./pages";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "explore-universities", element: <ExploreUniversitiesPage /> },
      { path: "explore-universities/:university", element: <UniversityPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;