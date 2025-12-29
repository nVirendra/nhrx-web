import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import ProtectedAdminClient from "../ProtectedAdminClient"
import { Toaster } from "sonner";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || ""

export const metadata = {
  title: {
    default: APP_NAME,
    template: `${APP_NAME} - %s`,
  },
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-secondary/30">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <ProtectedAdminClient>
            {children}
            <Toaster richColors position="top-right" />
          </ProtectedAdminClient>
        </main>
      </div>
    </div>
  )
}
