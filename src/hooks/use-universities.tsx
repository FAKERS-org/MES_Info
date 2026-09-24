import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
// Import types generated in Step 1!
import type { paths } from "@/lib/api/schema"; 

export function useUniversities() {
  return useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      // Notice how clean this is. No loading state management needed here.
      const response = await apiClient.get("/public/universities");
      return response.data;
    },
  });
}