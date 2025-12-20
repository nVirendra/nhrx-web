"use client"

import { useAuthHydration } from "@/features/auth/auth.hooks"
import ProtectedAdmin from "@/components/ProtectedAdmin"

export default function ProtectedAdminClient({ children }) {
  useAuthHydration()
  return <ProtectedAdmin>{children}</ProtectedAdmin>
}
