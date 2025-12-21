import api from "@/shared/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ---------------- CREATE ROLE ---------------- */
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      api.post("/api/v1/roles", payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    },
  });
};

/* ---------------- LIST ROLES ---------------- */
export const useGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await api.get("/api/v1/roles");
      return res.data.data;
    },
  });
};

/* ---------------- UPDATE ROLE ---------------- */
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      api.put(`/api/v1/roles/${id}`, payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    },
  });
};

/* ---------------- DELETE ROLE ---------------- */
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      api.delete(`/api/v1/roles/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    },
  });
};
