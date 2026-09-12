import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, ExploreUniversitiesPage, InstitutePage, OverviewPage, RootLayout } from "./pages";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "explore-universities", element: <ExploreUniversitiesPage /> },
      { path: "explore-universities/:university", element: <InstitutePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;