"use client"

import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import { useAuthHydration } from "@/features/auth/auth.hooks"

export default function AdminLayout({ children }) {
  useAuthHydration();
  return (
    <div className="flex h-screen bg-secondary/30">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
