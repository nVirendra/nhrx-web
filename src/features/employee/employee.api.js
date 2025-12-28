import api from "@/shared/api/axios";
import { useMutation, useQuery  } from "@tanstack/react-query";

/* ---------------- CREATE EMPLOYEE ---------------- */
export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/api/v1/employees", payload);
      return res.data.data;
    },
  });
};

export const useEmployees = (params) => {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: async () => {
      const res = await api.get("/api/v1/employees", { params });
      return res.data;
    },
    keepPreviousData: true,
  });
};

/* ---------------- GET EMPLOYEE ---------------- */
export const useEmployeeDetails = (employeeId) => {
  return useQuery({
    queryKey: ["employee", employeeId],
    queryFn: async () => {
      const res = await api.get(`/api/v1/employees/${employeeId}`);
      return res.data.data;
    },
    enabled: !!employeeId,
  });
};

/* ---------------- UPDATE BY SECTION ---------------- */
export const useUpdateEmployeeSection = () => {
  return useMutation({
    mutationFn: async ({ employeeId, section, data }) => {
      const res = await api.put(`/api/v1/employees/${employeeId}`, {
        section,
        data,
      });
      return res.data.data;
    },
  });
};
