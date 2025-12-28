import api from "@/shared/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ---------------- GET BRANCHES ---------------- */
export const useBranches = () => {
  return useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const res = await api.get("/api/v1/branches");
      return res.data.data;
    },
  });
};

/* ---------------- CREATE ---------------- */
export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/api/v1/branches", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};

/* ---------------- UPDATE ---------------- */
export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/api/v1/branches/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};

/* ---------------- TOGGLE STATUS ---------------- */
export const useToggleBranchStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/api/v1/branches/${id}/status`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};

/* ---------------- DELETE ---------------- */
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/api/v1/branches/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};
