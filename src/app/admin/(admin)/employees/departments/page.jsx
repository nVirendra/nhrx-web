"use client";
import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Building2, Plus, Edit, Trash2 } from "lucide-react";

export default function Departments() {
  const [open, setOpen] = React.useState(false);
  const [editDepartment, setEditDepartment] = React.useState(null);

  // Mock Data (replace with API)
  const departments = [
    {
      id: 1,
      name: "Engineering",
      description: "Software development & maintenance",
      status: true,
    },
    {
      id: 2,
      name: "Human Resources",
      description: "Hiring, payroll & policies",
      status: true,
    },
    {
      id: 3,
      name: "Sales",
      description: "Client acquisition & revenue",
      status: false,
    },
  ];

  const openCreate = () => {
    setEditDepartment(null);
    setOpen(true);
  };

  const openEdit = (dept) => {
    setEditDepartment(dept);
    setOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Departments
        </h2>

        <Button className="gap-2" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add Department
        </Button>
      </div>

      {/* ---------------- DEPARTMENT TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Department List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">
                    {dept.name}
                  </TableCell>
                  <TableCell>{dept.description}</TableCell>

                  <TableCell>
                    {dept.status ? (
                      <Badge className="bg-green-500/15 text-green-600">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/15 text-red-600">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEdit(dept)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ---------------- CREATE / EDIT SHEET ---------------- */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editDepartment ? "Edit Department" : "Create Department"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <Input
              placeholder="Department Name"
              defaultValue={editDepartment?.name || ""}
            />

            <Textarea
              placeholder="Department Description"
              defaultValue={editDepartment?.description || ""}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active</span>
              <Switch defaultChecked={editDepartment?.status ?? true} />
            </div>

            <Button className="w-full mt-4">
              {editDepartment ? "Update Department" : "Create Department"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
