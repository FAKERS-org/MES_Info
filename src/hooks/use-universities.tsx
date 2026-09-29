"use client";

import { universities as staticUniversities, type University } from "@/data";
import apiClient from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext } from "react";

// Switch: "static" | "api"
const DATA_SOURCE = "static" as const;

type UniversitiesContextType = {
    universities: University[];
    status: "loading" | "error" | "success";
    error: Error | null;
    refresh: () => void;
};

const UniversitiesContext = createContext<UniversitiesContextType | undefined>(undefined);

async function fetchUniversities(): Promise<University[]> {
    if (DATA_SOURCE === "static") {
        return staticUniversities as University[];
    }
    const response = await apiClient.get("/public/universities");
    return response.data as University[];
}

export function UniversitiesProvider({ children }: { children: React.ReactNode }) {
    const queryResult = useQuery({
        queryKey: ["universities"],
        queryFn: fetchUniversities,
    });

    const refresh = useCallback(() => {
        queryResult.refetch();
    }, [queryResult]);

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
    if (!context) {
        throw new Error("useUniversities must be used within a UniversitiesProvider");
    }
    return context;
}
