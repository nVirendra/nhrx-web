import api from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useMastersByCategory = (category) => {
  return useQuery({
    queryKey: ["masters", category],
    queryFn: async () => {
      const res = await api.get(`/api/v1/masters/category/${category}`);
      return res.data.data;
    },
    enabled: !!category,
    staleTime: 1000 * 60 * 10 // 10 min cache (perfect for masters)
  });
};
