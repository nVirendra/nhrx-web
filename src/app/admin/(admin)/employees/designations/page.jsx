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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Briefcase, Plus, Edit, Trash2 } from "lucide-react";

/* ---------------- API HOOKS ---------------- */
import { useDepartments } from "@/features/department/department.api";
import {
  useDesignations,
  useCreateDesignation,
  useUpdateDesignation,
  useToggleDesignationStatus,
  useDeleteDesignation,
} from "@/features/designation/designation.api";

export default function Designations() {
  const [open, setOpen] = React.useState(false);
  const [editDesignation, setEditDesignation] = React.useState(null);

  const [name, setName] = React.useState("");
  const [departmentId, setDepartmentId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  /* ---------------- DATA ---------------- */
  const { data: departments = [] } = useDepartments();
  const { data: designations = [] } = useDesignations();

  const createDesignation = useCreateDesignation();
  const updateDesignation = useUpdateDesignation();
  const toggleStatus = useToggleDesignationStatus();
  const deleteDesignation = useDeleteDesignation();

  /* ---------------- OPEN CREATE ---------------- */
  const openCreate = () => {
    setEditDesignation(null);
    setName("");
    setDepartmentId("");
    setDescription("");
    setIsActive(true);
    setOpen(true);
  };

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (item) => {
    setEditDesignation(item);
    setName(item.name);
    setDepartmentId(item.departmentId);
    setDescription(item.description || "");
    setIsActive(item.isActive);
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    const payload = {
      name,
      departmentId: Number(departmentId),
      description,
      isActive,
    };

    if (editDesignation) {
      updateDesignation.mutate({
        id: editDesignation.id,
        payload,
      });
    } else {
      createDesignation.mutate(payload);
    }

    setOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          Designations
        </h2>

        <Button className="gap-2" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add Designation
        </Button>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Designation List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {designations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>

                  <TableCell>
                    {item.department?.name}
                  </TableCell>

                  <TableCell>{item.description}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={item.isActive}
                        onCheckedChange={() =>
                          toggleStatus.mutate(item.id)
                        }
                      />
                      {item.isActive ? (
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
                      onClick={() => openEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => deleteDesignation.mutate(item.id)}
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

      {/* ---------------- CREATE / EDIT ---------------- */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editDesignation ? "Edit Designation" : "Create Designation"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <Input
              placeholder="Designation Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Select
              value={departmentId}
              onValueChange={setDepartmentId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem
                    key={dept.id}
                    value={String(dept.id)}
                  >
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Designation Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active</span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit}>
              {editDesignation ? "Update Designation" : "Create Designation"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
