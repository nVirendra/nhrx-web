"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

/* ---------- UI ---------- */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  ChevronLeft,
  ChevronRight,
  Search,MoreVertical, Eye, Pencil
} from "lucide-react";

/* ---------- API ---------- */
import { useEmployees } from "@/features/employee/employee.api";
import { useDepartments } from "@/features/department/department.api";

const EmployeeDirectory = () => {
  const router = useRouter();

  /* ---------- FILTER STATE ---------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  /* ---------- PAGINATION ---------- */
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  /* ---------- MASTER DATA ---------- */
  const { data: departments = [] } = useDepartments();

  /* ---------- EMPLOYEE API ---------- */
  const { data, isLoading } = useEmployees({
    page: currentPage,
    limit: perPage,
    search: searchTerm,
    department,
    status,
  });

  const employees = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <Button onClick={() => router.push("/admin/employees/create")}>
          Add Employee
        </Button>
      </div>

      {/* ================= FILTERS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Department */}
          <Select
            value={department}
            onValueChange={(v) => {
              setDepartment(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d.id} value={String(d.id)}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset */}
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setDepartment("all");
              setStatus("all");
              setCurrentPage(1);
            }}
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>

      {/* ================= TABLE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Loading employees...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}

              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback>
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{emp.name}</p>
                    </div>
                  </TableCell>

                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        emp.status === "Active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-36">
      <DropdownMenuItem
        onClick={() =>
          router.push(`/admin/employees/profile/${emp.id}`)
        }
      >
        <Eye className="mr-2 h-4 w-4" />
        View
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() =>
          router.push(`/admin/employees/create?edit=${emp.id}`)
        }
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ================= PAGINATION ================= */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>

            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDirectory;
