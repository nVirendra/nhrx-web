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

/* ---------------- API ---------------- */
import {
  useGrades,
  useCreateGrade,
  useUpdateGrade,
  useToggleGradeStatus,
  useDeleteGrade,
} from "@/features/grade/grade.api";

export default function Grades() {
  const [open, setOpen] = React.useState(false);
  const [editGrade, setEditGrade] = React.useState(null);

  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [minSalary, setMinSalary] = React.useState("");
  const [maxSalary, setMaxSalary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  const { data: grades = [] } = useGrades();

  const createGrade = useCreateGrade();
  const updateGrade = useUpdateGrade();
  const toggleStatus = useToggleGradeStatus();
  const deleteGrade = useDeleteGrade();

  /* ---------------- OPEN CREATE ---------------- */
  const openCreate = () => {
    setEditGrade(null);
    setName("");
    setCode("");
    setMinSalary("");
    setMaxSalary("");
    setDescription("");
    setIsActive(true);
    setOpen(true);
  };

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (grade) => {
    setEditGrade(grade);
    setName(grade.name);
    setCode(grade.code);
    setMinSalary(String(grade.minSalary));
    setMaxSalary(String(grade.maxSalary));
    setDescription(grade.description || "");
    setIsActive(grade.isActive);
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    const payload = {
      name,
      code,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
      description,
      isActive,
    };

    if (editGrade) {
      updateGrade.mutate({ id: editGrade.id, payload });
    } else {
      createGrade.mutate(payload);
    }

    setOpen(false);
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

      {/* ---------------- TABLE ---------------- */}
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
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={grade.isActive}
                        onCheckedChange={() =>
                          toggleStatus.mutate(grade.id)
                        }
                      />
                      {grade.isActive ? (
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
                      onClick={() => openEdit(grade)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => deleteGrade.mutate(grade.id)}
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
              {editGrade ? "Edit Grade" : "Create Grade"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <Input
              placeholder="Grade Name (e.g. Grade A)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Grade Code (A / B / C / G1)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min Salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max Salary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
              />
            </div>

            <Textarea
              placeholder="Grade Description"
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
              {editGrade ? "Update Grade" : "Create Grade"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
