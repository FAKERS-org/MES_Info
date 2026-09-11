import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard/page";
import ComingSoonPage from "./pages/coming-soon/page";
import InstitutePage from "./pages/info/institute/page";
import ErrorPage from "./pages/error/page";
import "./index.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/info" element={<ComingSoonPage />} />
      <Route path="/info/:institution" element={<InstitutePage />} />
      <Route path="/profile" element={<ComingSoonPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;