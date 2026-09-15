import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "@/lib/i18n";
import { UniversitiesProvider } from "@/hooks/use-universities";

// style
import "./index.css";
// router
import router from "./router";

const element = document.getElementById("root");
if (!element) throw new Error("Root element #root not found");

const app = (
  <StrictMode>
    <LanguageProvider>
      <UniversitiesProvider>
        <RouterProvider router={router} />
      </UniversitiesProvider>
    </LanguageProvider>
  </StrictMode>
);

(import.meta.hot.data.root ??= createRoot(element)).render(app);