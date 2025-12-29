import api from "@/shared/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ---------------- QUERY KEYS ---------------- */
const WORKFLOW_KEY = ["approval-workflows"];

/* ---------------- GET ALL WORKFLOWS ---------------- */
export const useApprovalWorkflows = (params = {}) => {
  return useQuery({
    queryKey: [...WORKFLOW_KEY, params],
    queryFn: async () => {
      const res = await api.get("/api/v1/workflows", { params });
      return res.data.data;
    },
  });
};

/* ---------------- GET WORKFLOW BY ID ---------------- */
export const useApprovalWorkflowById = (id) => {
  return useQuery({
    queryKey: [...WORKFLOW_KEY, id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/api/v1/workflows/${id}`);
      return res.data.data;
    },
  });
};

/* ---------------- CREATE WORKFLOW ---------------- */
export const useCreateApprovalWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/api/v1/workflows", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKFLOW_KEY });
    },
  });
};

/* ---------------- UPDATE WORKFLOW ---------------- */
export const useUpdateApprovalWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/api/v1/workflows/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: WORKFLOW_KEY });
      queryClient.invalidateQueries({ queryKey: [...WORKFLOW_KEY, id] });
    },
  });
};

/* ---------------- TOGGLE STATUS ---------------- */
export const useToggleWorkflowStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/api/v1/workflows/${id}/status`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKFLOW_KEY });
    },
  });
};

/* ---------------- DELETE WORKFLOW ---------------- */
export const useDeleteApprovalWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/api/v1/workflows/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKFLOW_KEY });
    },
  });
};
