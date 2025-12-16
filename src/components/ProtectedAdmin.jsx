// components/ProtectedAdmin.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedAdmin({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/auth/login");
    }
  }, []);

  return children;
}
