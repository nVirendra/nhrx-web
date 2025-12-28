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
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Building2, Plus, Edit, Trash2 } from "lucide-react";

/* ----------- API HOOKS ----------- */
import {
  useDepartments,
  useCreateDepartment,
  useUpdateDepartment,
  useToggleDepartmentStatus,
  useDeleteDepartment,
} from "@/features/department/department.api";

export default function Departments() {
  const [open, setOpen] = React.useState(false);
  const [editDepartment, setEditDepartment] = React.useState(null);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  const { data: departments = [] } = useDepartments();
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const toggleStatus = useToggleDepartmentStatus();
  const deleteDepartment = useDeleteDepartment();

  /* ---------------- OPEN CREATE ---------------- */
  const openCreate = () => {
    setEditDepartment(null);
    setName("");
    setDescription("");
    setIsActive(true);
    setOpen(true);
  };

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (dept) => {
    setEditDepartment(dept);
    setName(dept.name);
    setDescription(dept.description || "");
    setIsActive(dept.isActive);
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    const payload = { name, description, isActive };

    if (editDepartment) {
      updateDepartment.mutate({
        id: editDepartment.id,
        payload,
      });
    } else {
      createDepartment.mutate(payload);
    }

    setOpen(false);
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

      {/* ---------------- TABLE ---------------- */}
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
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={dept.isActive}
                        onCheckedChange={() =>
                          toggleStatus.mutate(dept.id)
                        }
                      />
                      {dept.isActive ? (
                        <Badge className="bg-green-500/15 text-green-600">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/15 text-red-600">
                          Inactive
                        </Badge>
                      )}
                    </div>
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
                      onClick={() => deleteDepartment.mutate(dept.id)}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea
              placeholder="Department Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active</span>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit}>
              {editDepartment ? "Update Department" : "Create Department"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
