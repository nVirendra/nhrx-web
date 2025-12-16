import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { Trash2, Pencil, Plus } from "lucide-react";

// Dummy storage (Replace with API later)
const initialDeductions = [
  {
    id: 1,
    name: "Provident Fund (PF)",
    type: "Percentage",
    value: "12%",
    recurring: "Monthly",
  },
  {
    id: 2,
    name: "Professional Tax",
    type: "Fixed",
    value: "₹200",
    recurring: "Monthly",
  },
  {
    id: 3,
    name: "Loan EMI",
    type: "Fixed",
    value: "₹1500",
    recurring: "Monthly",
  },
];

const DeductionsPage = () => {
  const [deductions, setDeductions] = useState(initialDeductions);

  const [form, setForm] = useState({
    id: null,
    name: "",
    type: "Fixed",
    value: "",
    recurring: "Monthly",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = () => {
    if (isEdit) {
      setDeductions((prev) =>
        prev.map((d) => (d.id === form.id ? form : d))
      );
    } else {
      setDeductions((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }
  };

  const resetForm = () => {
    setForm({ id: null, name: "", type: "Fixed", value: "", recurring: "Monthly" });
    setIsEdit(false);
  };

  const deleteDeduction = (id) => {
    setDeductions((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payroll Deductions</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Deduction
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Deduction" : "Add Deduction"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Name */}
              <div>
                <Label>Deduction Name</Label>
                <Input
                  placeholder="PF, ESIC, TDS, Loan EMI..."
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              {/* Type */}
              <div>
                <Label>Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, type: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fixed">Fixed Amount</SelectItem>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Value */}
              <div>
                <Label>Value</Label>
                <Input
                  placeholder={form.type === "Percentage" ? "12%" : "1000"}
                  value={form.value}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, value: e.target.value }))
                  }
                />
              </div>

              {/* Recurring */}
              <div>
                <Label>Recurring</Label>
                <Select
                  value={form.recurring}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, recurring: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Recurrence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="One-time">One-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <Button onClick={handleSubmit}>
                {isEdit ? "Save Changes" : "Add Deduction"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Deductions</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Recurring</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {deductions.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.type}</TableCell>
                  <TableCell>{d.value}</TableCell>
                  <TableCell>{d.recurring}</TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setForm(d);
                            setIsEdit(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Edit Deduction</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                          {/* Name */}
                          <div>
                            <Label>Deduction Name</Label>
                            <Input
                              value={form.name}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Type */}
                          <div>
                            <Label>Type</Label>
                            <Select
                              value={form.type}
                              onValueChange={(v) =>
                                setForm((prev) => ({ ...prev, type: v }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Fixed">Fixed Amount</SelectItem>
                                <SelectItem value="Percentage">Percentage</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Value */}
                          <div>
                            <Label>Value</Label>
                            <Input
                              value={form.value}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Recurring */}
                          <div>
                            <Label>Recurring</Label>
                            <Select
                              value={form.recurring}
                              onValueChange={(v) =>
                                setForm((prev) => ({ ...prev, recurring: v }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="One-time">One-time</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button onClick={handleSubmit}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteDeduction(d.id)}
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
    </div>
  );
};

export default DeductionsPage;
