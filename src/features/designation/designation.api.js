import api from "@/shared/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* LIST */
export const useDesignations = () =>
  useQuery({
    queryKey: ["designations"],
    queryFn: async () => {
      const res = await api.get("/api/v1/designations");
      return res.data.data;
    },
  });

/* CREATE */
export const useCreateDesignation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      api.post("/api/v1/designations", payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["designations"] }),
  });
};

/* UPDATE */
export const useUpdateDesignation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) =>
      api.put(`/api/v1/designations/${id}`, payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["designations"] }),
  });
};

/* TOGGLE */
export const useToggleDesignationStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      api.patch(`/api/v1/designations/${id}/status`),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["designations"] }),
  });
};

/* DELETE */
export const useDeleteDesignation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      api.delete(`/api/v1/designations/${id}`),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["designations"] }),
  });
};
