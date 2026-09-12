import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { University } from "@/data";
import { api } from "@/services/api";
import { universities as seedUniversities } from "@/data/universities";

export type UniversitiesStatus = "loading" | "error" | "ready";

interface UniversitiesContextValue {
  universities: University[];
  status: UniversitiesStatus;
  refresh: () => void;
}

const UniversitiesContext = createContext<UniversitiesContextValue | undefined>(
  undefined,
);

export function UniversitiesProvider({ children }: { children: ReactNode }) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [status, setStatus] = useState<UniversitiesStatus>("loading");

  const load = useCallback(() => {
    setStatus("loading");
    api
      .universities()
      .then((data) => {
        setUniversities(data);
        setStatus("ready");
      })
      .catch(() => {
        // Fallback for static hosts (e.g. Vercel) where the API
        // endpoint is not available — use the bundled seed data.
        setUniversities(seedUniversities);
        setStatus("ready");
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(
    () => ({ universities, status, refresh: load }),
    [universities, status, load],
  );

  return (
    <UniversitiesContext.Provider value={value}>
      {children}
    </UniversitiesContext.Provider>
  );
}

export function useUniversities() {
  const ctx = useContext(UniversitiesContext);
  if (!ctx) {
    throw new Error(
      "useUniversities must be used within UniversitiesProvider",
    );
  }
  return ctx;
}
