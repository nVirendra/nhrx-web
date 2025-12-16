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

import { Layers, Plus, Edit, Trash2 } from "lucide-react";

export default function Grades() {
  const [open, setOpen] = React.useState(false);
  const [editGrade, setEditGrade] = React.useState(null);

  // Mock Grade Data (replace with API)
  const grades = [
    {
      id: 1,
      name: "Grade A",
      code: "A",
      minSalary: 25000,
      maxSalary: 50000,
      description: "Senior level employees",
      status: true,
    },
    {
      id: 2,
      name: "Grade B",
      code: "B",
      minSalary: 15000,
      maxSalary: 25000,
      description: "Mid level employees",
      status: true,
    },
    {
      id: 3,
      name: "Grade C",
      code: "C",
      minSalary: 8000,
      maxSalary: 15000,
      description: "Junior level employees",
      status: false,
    },
  ];

  const openCreate = () => {
    setEditGrade(null);
    setOpen(true);
  };

  const openEdit = (grade) => {
    setEditGrade(grade);
    setOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Grades
        </h2>

        <Button className="gap-2" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add Grade
        </Button>
      </div>

      {/* ---------------- GRADE TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Grade List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Salary Range (₹)</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">
                    {grade.name}
                  </TableCell>

                  <TableCell>{grade.code}</TableCell>

                  <TableCell>
                    ₹{grade.minSalary.toLocaleString()} – ₹
                    {grade.maxSalary.toLocaleString()}
                  </TableCell>

                  <TableCell>{grade.description}</TableCell>

                  <TableCell>
                    {grade.status ? (
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
                      onClick={() => openEdit(grade)}
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

      {/* ---------------- CREATE / EDIT GRADE ---------------- */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editGrade ? "Edit Grade" : "Create Grade"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <Input
              placeholder="Grade Name (e.g. Grade A)"
              defaultValue={editGrade?.name || ""}
            />

            <Input
              placeholder="Grade Code (A / B / C / G1)"
              defaultValue={editGrade?.code || ""}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min Salary"
                defaultValue={editGrade?.minSalary || ""}
              />
              <Input
                type="number"
                placeholder="Max Salary"
                defaultValue={editGrade?.maxSalary || ""}
              />
            </div>

            <Textarea
              placeholder="Grade Description"
              defaultValue={editGrade?.description || ""}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active</span>
              <Switch defaultChecked={editGrade?.status ?? true} />
            </div>

            <Button className="w-full mt-4">
              {editGrade ? "Update Grade" : "Create Grade"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
