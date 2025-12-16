import api from "@/shared/api/axios";
import { useMutation, useQuery  } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/v1/auth/login", payload);
      return res.data;
    },
  });
};


export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/v1/auth/me");
      return res.data.user;
    },
    retry: false,
  });
};