import { createBrowserRouter } from "react-router-dom";
import { ComingSoonPage, ErrorPage, ExploreUniversitiesPage, InstitutePage, OverviewPage, RootLayout } from "./pages";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "explore-universities", element: <ExploreUniversitiesPage /> },
      { path: "info", element: <ComingSoonPage /> },
      { path: "info/:institution", element: <InstitutePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;