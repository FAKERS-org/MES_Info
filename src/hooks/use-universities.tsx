"use client";

import apiClient from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext } from "react";

export type UniversitySummary = components["schemas"]["UniversitySummary"];

type UniversitiesContextType = {
    universities: UniversitySummary[];
    status: "loading" | "error" | "success";
    error: Error | null;
    refresh: () => void;
};

const UniversitiesContext = createContext<UniversitiesContextType | undefined>(undefined);

async function fetchUniversities(): Promise<UniversitySummary[]> {
    const response = await apiClient.get<{ items: UniversitySummary[] }>("/public/universities/?limit=100");
    return response.data.items;
}

export function UniversitiesProvider({ children }: { children: React.ReactNode }) {
    const queryResult = useQuery({
        queryKey: ["universities"],
        queryFn: fetchUniversities,
    });

    const refresh = useCallback(() => {
        queryResult.refetch();
    }, [queryResult.refetch]);

    let status: "loading" | "error" | "success";
    if (queryResult.isLoading) {
        status = "loading";
    } else if (queryResult.isError) {
        status = "error";
    } else {
        status = "success";
    }

    return (
        <UniversitiesContext.Provider
            value={{
                universities: queryResult.data ?? [],
                status,
                error: queryResult.error,
                refresh,
            }}
        >
            {children}
        </UniversitiesContext.Provider>
    );
}

export function useUniversities() {
    const context = useContext(UniversitiesContext);
    if (context === undefined) {
        throw new Error("useUniversities must be used within a UniversitiesProvider");
    }
    return context;
}
