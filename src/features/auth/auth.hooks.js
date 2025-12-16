import { useEffect } from "react";
import { useMe } from "./auth.api";
import { useAuthStore } from "./auth.store";
import { useRouter } from "next/navigation";

export const useAuthHydration = () => {
  const { data, error } = useMe();
  const { setAuth, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setAuth(data);
    }
    if (error) {
      logout();
      router.replace("/auth/login");
    }
  }, [data, error]);
};
