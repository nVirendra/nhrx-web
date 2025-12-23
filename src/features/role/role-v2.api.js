import api from "@/shared/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* =====================================================
   ROLE APIs (v2)
===================================================== */

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

/* ---------------- GET ROLE DETAILS ---------------- */
export const getRoleDetailsApi = async (roleId) => {
  const res = await api.get(`/api/v1/roles/${roleId}`);
  return res.data.data;
};

export const useGetRoleDetails = (roleId) => {
  return useQuery({
    queryKey: ["role-details", roleId],
    queryFn: () => getRoleDetailsApi(roleId),
    enabled: !!roleId,
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

/* =====================================================
   PERMISSION & MENU MASTER APIs
===================================================== */

/* ---------------- PERMISSION MASTER ---------------- */
export const useGetPermissionMaster = () => {
  return useQuery({
    queryKey: ["permission-master"],
    queryFn: async () => {
      const res = await api.get("/api/v1/roles/permission-master");
      return res.data.data;
    },
  });
};

/* ---------------- MENU + SUBMENU + PERMISSION TREE ---------------- */
export const useGetMenuPermissionTree = () => {
  return useQuery({
    queryKey: ["menu-permission-tree"],
    queryFn: async () => {
      const res = await api.get("/api/v1/roles/menus/tree");
      return res.data.data;
    },
  });
};
