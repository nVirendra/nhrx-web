"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";


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
  Wallet2,
  CheckCircle,
  LogOut,
} from "lucide-react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "HrExtreme";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();


  const [expandedMenus, setExpandedMenus] = useState({});
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const userMenuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (key) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isActive = (path) => pathname === path;

  const logout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("access_token");

    router.replace("/auth/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },

    {
      icon: Users,
      label: "Employees",
      path: "/employees",
      children: [
        { label: "Employee Directory", path: "/admin/employees/directory" },
        { label: "Add Employee", path: "/admin/employees/add" },
        { label: "Branches", path: "/admin/employees/branches" },
        { label: "Departments", path: "/admin/employees/departments" },
        { label: "Designations", path: "/admin/employees/designations" },
        { label: "Grade", path: "/admin/employees/grades" },
      ],
    },

    {
      icon: Clock,
      label: "Attendance",
      path: "/attendance",
      children: [
        { label: "Daily Attendance", path: "/admin/attendance/daily" },
        { label: "Monthly Report", path: "/admin/attendance/monthly" },
        { label: "Shifts & Policies", path: "/admin/attendance/shifts" },
        { label: "Regularization", path: "/admin/attendance/regularization" },
      ],
    },

    {
      icon: CalendarDays,
      label: "Leaves",
      path: "/leaves",
      children: [
        { label: "Leave Requests", path: "/admin/leaves/requests" },
        { label: "Leave Approvals", path: "/admin/leaves/approvals" },
        { label: "Leave Policies", path: "/admin/leaves/leave-policies" },
        { label: "Holiday Calendar", path: "/admin/leaves/holidays" },
        { label: "Leave Calendar", path: "/admin/leaves/calendar" },
      ],
    },

    {
      icon: Wallet,
      label: "Payroll",
      path: "/payroll",
      children: [
        { label: "Salary Structure", path: "/admin/payroll/salary-structure" },
        { label: "Payslips", path: "/admin/payroll/payslips" },
        { label: "Deductions", path: "/admin/payroll/deductions" },
        { label: "Overtime", path: "/admin/payroll/overtime" },
        { label: "Reimbursements", path: "/admin/payroll/reimbursements" },
      ],
    },

    // {
    //   icon: Plane,
    //   label: "Travel",
    //   path: "/travel",
    //   children: [
    //     { label: "Travel Requests", path: "/admin/travel/requests" },
    //     { label: "Daily Allowance", path: "/admin/travel/da" },
    //   ],
    // },

    // {
    //   icon: Wallet2,
    //   label: "Expenses",
    //   path: "/expenses",
    //   children: [
    //     { label: "Expense Claims", path: "/admin/expenses/claims" },
    //     { label: "Approvals", path: "/admin/expenses/approvals" },
    //   ],
    // },

    {
      icon: UserCircle,
      label: "Roles & Permissions",
      path: "/role-permissions",
      children: [
        { label: "All Roles", path: "/admin/role-permissions/roles" },
        { label: "All Permissions", path: "/admin/role-permissions/permissions" },
      ],
    },

    {
      icon: CheckCircle,
      label: "Approvals",
      path: "/approvals/workflows",
      children: [
        { label: "Approval Flow", path: "/admin/approvals/workflows" },
        { label: "Approval Module", path: "/admin/approvals/modules" },
      ],
    },

    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      children: [
        { label: "System Settings", path: "/admin/settings/system" },
        { label: "Modules & Subscription", path: "/admin/settings/subscription" },
      ],
    },
  ];

  return (
    <aside className="w-64 md:w-20 lg:w-64 bg-sidebar border-r border-sidebar-border flex flex-col relative">

      {/* LOGO */}
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

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.path);

          return (
            <div key={item.path}>
              <button
                onClick={() => item.children && toggleMenu(item.path)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${active ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm md:hidden lg:block">{item.label}</span>
                </div>

                {item.children && (
                  <ChevronDown
                    className={`w-4 h-4 transition ${expandedMenus[item.path] ? "rotate-180" : ""
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
                      className={`block px-4 py-2 rounded-lg text-sm ${isActive(child.path)
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
          );
        })}
      </nav>

      {/* BOTTOM USER MENU */}
      <div className="border-t border-sidebar-border p-4 relative" ref={userMenuRef}>
        <button
          onClick={() => setOpenUserMenu((prev) => !prev)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/40 hover:bg-sidebar-accent transition"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-primary" />
          </div>

          <div className="md:hidden lg:block text-left">
            <p className="text-sm font-medium">HR Admin</p>
            <p className="text-xs text-muted-foreground">admin@hrms.com</p>
          </div>
        </button>

        {openUserMenu && (
          <div className="absolute bottom-16 left-4 right-4 bg-sidebar-accent border border-sidebar-border rounded-xl shadow-xl p-2 z-50">

            <Link
              href="/profile"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent/60"
            >
              Profile
            </Link>

            <Link
              href="/admin/settings/system"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent/60"
            >
              Settings
            </Link>

            <Link
              href="/modules"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent/60"
            >
              Modules / Center Tab
            </Link>

            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-red-500/30 text-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
