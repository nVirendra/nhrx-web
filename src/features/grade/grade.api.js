import api from "@/shared/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ================= LIST ================= */
export const useGrades = () => {
  return useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      const res = await api.get("/api/v1/grades");
      return res.data.data;
    },
  });
};

/* ================= CREATE ================= */
export const useCreateGrade = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/api/v1/grades", payload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grades"] });
    },
  });
};

/* ================= UPDATE ================= */
export const useUpdateGrade = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/api/v1/grades/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grades"] });
    },
  });
};

/* ================= TOGGLE STATUS ================= */
export const useToggleGradeStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/api/v1/grades/${id}/status`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grades"] });
    },
  });
};

/* ================= DELETE ================= */
export const useDeleteGrade = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/api/v1/grades/${id}`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grades"] });
    },
  });
};
