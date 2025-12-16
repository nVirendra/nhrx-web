"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock,
  Wallet,
  Settings,
  ChevronDown,
  UserCircle,
  Plane,
  Wallet2,CheckCircle 
} from "lucide-react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "HrExtreme";


const Sidebar = () => {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState({})
  const [activePopup, setActivePopup] = useState(null)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })

  const toggleMenu = (key) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const isActive = (path) => pathname === path

  // SAME menuItems (unchanged)
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
    },

    // EMPLOYEES
    {
      icon: Users,
      label: "Employees",
      path: "/employees",
      children: [
        { label: "Employee Directory", path: "/employees/directory" },
        { label: "Add Employee", path: "/employees/add" },
        { label: "Departments", path: "/employees/departments" },
        { label: "Designations", path: "/employees/designations" },
      ],
    },

    // ATTENDANCE
    {
      icon: Clock,
      label: "Attendance",
      path: "/attendance",
      children: [
        { label: "Daily Attendance", path: "/attendance/daily" },
        { label: "Monthly Report", path: "/attendance/monthly" },
        { label: "Shifts & Policies", path: "/attendance/shifts" },
        { label: "Regularization", path: "/attendance/regularization" },
      ],
    },

    // LEAVES
    {
      icon: CalendarDays,
      label: "Leaves",
      path: "/leaves",
      children: [
        { label: "Leave Requests", path: "/leaves/requests" },
        { label: "Leave Approvals", path: "/leaves/approvals" },
        { label: "Leave Policies", path: "/leaves/policies" },
        { label: "Holiday Calendar", path: "/leaves/holidays" },
        { label: "Leave Calendar", path: "/leaves/calendar" },
      ],
    },

    // PAYROLL
    {
      icon: Wallet,
      label: "Payroll",
      path: "/payroll",
      children: [
        { label: "Salary Structure", path: "/payroll/salary-structure" },
        { label: "Payslips", path: "/payroll/payslips" },
        { label: "Deductions", path: "/payroll/deductions" },
        { label: "Overtime", path: "/payroll/overtime" },
        { label: "Reimbursements", path: "/payroll/reimbursements" },
      ],
    },

    // RECRUITMENT
    // {
    //   icon: Briefcase,
    //   label: "Recruitment",
    //   path: "/recruitment",
    //   children: [
    //     { label: "Job Openings", path: "/recruitment/jobs" },
    //     { label: "Candidates", path: "/recruitment/candidates" },
    //     { label: "Interview Rounds", path: "/recruitment/interviews" },
    //     { label: "Hiring Decisions", path: "/recruitment/decisions" },
    //   ],
    // },

    // PERFORMANCE
    // {
    //   icon: Star,
    //   label: "Performance",
    //   path: "/performance",
    //   children: [
    //     { label: "Appraisals", path: "/performance/appraisals" },
    //     { label: "Goals", path: "/performance/goals" },
    //     { label: "Feedback", path: "/performance/feedback" },
    //   ],
    // },

    // ONBOARDING
    // {
    //   icon: NotebookPen,
    //   label: "Onboarding",
    //   path: "/onboarding",
    //   children: [
    //     { label: "Onboarding Tasks", path: "/onboarding/tasks" },
    //     { label: "Documents", path: "/onboarding/documents" },
    //   ],
    // },

    // TRAVEL MANAGEMENT
    {
      icon: Plane,
      label: "Travel",
      path: "/travel",
      children: [
        { label: "Travel Requests", path: "/travel/requests" },
        { label: "Daily Allowance", path: "/travel/da" },
      ],
    },

    // EXPENSES
    {
      icon: Wallet2,
      label: "Expenses",
      path: "/expenses",
      children: [
        { label: "Expense Claims", path: "/expenses/claims" },
        { label: "Approvals", path: "/expenses/approvals" },
      ],
    },

    // COMPLIANCE
    // {
    //   icon: FileCheck,
    //   label: "Compliance",
    //   path: "/compliance",
    //   children: [
    //     { label: "PF / ESIC Reports", path: "/compliance/pf-esic" },
    //     { label: "Statutory Forms", path: "/compliance/forms" },
    //   ],
    // },

    // COMPANY SETTINGS
    // {
    //   icon: Building2,
    //   label: "Company",
    //   path: "/company",
    //   children: [
    //     { label: "Company Profile", path: "/company/profile" },
    //     { label: "HR Policies", path: "/company/policies" },
    //   ],
    // },

    // USER MANAGEMENT
    {
      icon: UserCircle,
      label: "Roles & Permissions",
      path: "/roles-permissions",
      children: [
        { label: "All Roles", path: "/roles" },
        { label: "All Permissions", path: "/roles/permissions" },
      ],
    },

    // CHAT / MESSAGING
    // {
    //   icon: MessageSquare,
    //   label: "Messaging",
    //   path: "/messages",
    // },

    // ANALYTICS
    // {
    //   icon: BarChart3,
    //   label: "Analytics",
    //   path: "/analytics",
    // },

    // SECURITY
    // {
    //   icon: Shield,
    //   label: "Security",
    //   path: "/security",
    // },


    {
      icon: CheckCircle ,
      label: "Approvals",
      path: "/approvals/workflows",
    },

    // SETTINGS
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      children: [
        { label: "System Settings", path: "/settings/system" },
        { label: "Modules & Subscription", path: "/settings/subscription" },
      ],
    },
  ];

  return (
    <aside className="w-64 md:w-20 lg:w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 md:justify-center lg:justify-start">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            HR
          </div>
          <div className="md:hidden lg:block">
            <h1 className="text-lg font-bold">{APP_NAME}</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/40">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">HR Admin</p>
            <p className="text-xs text-muted-foreground">admin@hrms.com</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = pathname.startsWith(item.path)

          return (
            <div key={item.path}>
              <button
                onClick={() => item.children && toggleMenu(item.path)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${
                  active ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.children && (
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      expandedMenus[item.path] ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.children && expandedMenus[item.path] && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className={`block px-4 py-2 rounded-lg text-sm ${
                        isActive(child.path)
                          ? "bg-sidebar-accent font-medium"
                          : "hover:bg-sidebar-accent/30"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
