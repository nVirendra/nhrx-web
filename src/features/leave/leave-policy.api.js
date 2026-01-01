import api from "@/shared/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ---------------- QUERY KEYS ---------------- */
const LEAVE_POLICY_KEY = ["leave-policies"];

/* ---------------- CREATE LEAVE POLICY ---------------- */
export const useCreateLeavePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/api/v1/leaves/leave-policies", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_POLICY_KEY });
    },
  });
};

/* ---------------- GET ALL LEAVE POLICIES ---------------- */
export const useLeavePolicies = (params = {}) => {
  return useQuery({
    queryKey: [...LEAVE_POLICY_KEY, params],
    queryFn: async () => {
      const res = await api.get("/api/v1/leaves/leave-policies", { params });
      return res.data.data;
    },
  });
};

/* ---------------- GET LEAVE POLICY BY ID ---------------- */
export const useLeavePolicyById = (id) => {
  return useQuery({
    queryKey: [...LEAVE_POLICY_KEY, id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/api/v1/leaves/leave-policies/${id}`);
      return res.data.data;
    },
  });
};

/* ---------------- UPDATE LEAVE POLICY ---------------- */
export const useUpdateLeavePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/api/v1/leaves/leave-policies/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: LEAVE_POLICY_KEY });
      queryClient.invalidateQueries({ queryKey: [...LEAVE_POLICY_KEY, id] });
    },
  });
};

/* ---------------- TOGGLE LEAVE POLICY STATUS ---------------- */
export const useToggleLeavePolicyStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/api/v1/leaves/leave-policies/${id}/status`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_POLICY_KEY });
    },
  });
};

/* ---------------- DELETE LEAVE POLICY ---------------- */
export const useDeleteLeavePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/api/v1/leaves/leave-policies/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_POLICY_KEY });
    },
  });
};
