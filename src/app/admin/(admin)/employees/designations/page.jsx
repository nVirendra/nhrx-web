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
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Briefcase, Plus, Edit, Trash2 } from "lucide-react";

export default function Designations() {
  const [open, setOpen] = React.useState(false);
  const [editDesignation, setEditDesignation] = React.useState(null);

  // Mock department master (replace with API)
  const departments = [
    { id: 1, name: "Engineering" },
    { id: 2, name: "Human Resources" },
    { id: 3, name: "Sales" },
  ];

  // Mock designation data (replace with API)
  const designations = [
    {
      id: 1,
      name: "Software Engineer",
      department: "Engineering",
      description: "Responsible for application development",
      status: true,
    },
    {
      id: 2,
      name: "HR Executive",
      department: "Human Resources",
      description: "Handles hiring & employee relations",
      status: true,
    },
    {
      id: 3,
      name: "Sales Manager",
      department: "Sales",
      description: "Manages sales targets & team",
      status: false,
    },
  ];

  const openCreate = () => {
    setEditDesignation(null);
    setOpen(true);
  };

  const openEdit = (designation) => {
    setEditDesignation(designation);
    setOpen(true);
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

      {/* ---------------- DESIGNATION TABLE ---------------- */}
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

                  <TableCell>{item.department}</TableCell>

                  <TableCell>{item.description}</TableCell>

                  <TableCell>
                    {item.status ? (
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
                      onClick={() => openEdit(item)}
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

      {/* ---------------- CREATE / EDIT DESIGNATION ---------------- */}
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
              defaultValue={editDesignation?.name || ""}
            />

            <Select defaultValue={editDesignation?.department || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Designation Description"
              defaultValue={editDesignation?.description || ""}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active</span>
              <Switch defaultChecked={editDesignation?.status ?? true} />
            </div>

            <Button className="w-full mt-4">
              {editDesignation ? "Update Designation" : "Create Designation"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
