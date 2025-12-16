import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";

// Dummy Data — Replace API later
const initialOvertime = [
  {
    id: 1,
    employee: "Virendra Nishad",
    date: "2025-01-10",
    hours: 3,
    rate: 200,
    amount: 600,
    status: "Approved",
  },
  {
    id: 2,
    employee: "Priya Sharma",
    date: "2025-01-12",
    hours: 2,
    rate: 180,
    amount: 360,
    status: "Pending",
  },
];

const statusColors = {
  Approved: "default",
  Pending: "secondary",
  Rejected: "destructive",
};

const OvertimePage = () => {
  const [overtimeList, setOvertimeList] = useState(initialOvertime);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    employee: "",
    date: "",
    hours: "",
    rate: "",
    amount: "",
    status: "Pending",
  });

  const resetForm = () => {
    setForm({
      id: null,
      employee: "",
      date: "",
      hours: "",
      rate: "",
      amount: "",
      status: "Pending",
    });
    setIsEdit(false);
  };

  const handleSubmit = () => {
    const calculatedAmount = Number(form.hours) * Number(form.rate);

    if (isEdit) {
      setOvertimeList((prev) =>
        prev.map((ot) =>
          ot.id === form.id ? { ...form, amount: calculatedAmount } : ot
        )
      );
    } else {
      setOvertimeList((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          amount: calculatedAmount,
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    setOvertimeList((prev) => prev.filter((ot) => ot.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Overtime Management</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add Overtime
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Overtime" : "Add Overtime"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Employee */}
              <div>
                <Label>Employee</Label>
                <Select
                  value={form.employee}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, employee: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Virendra Nishad">Virendra Nishad</SelectItem>
                    <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                    <SelectItem value="Amit Verma">Amit Verma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>

              {/* Hours */}
              <div>
                <Label>Hours</Label>
                <Input
                  type="number"
                  placeholder="Enter hours"
                  value={form.hours}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, hours: e.target.value }))
                  }
                />
              </div>

              {/* Rate */}
              <div>
                <Label>Rate per Hour (₹)</Label>
                <Input
                  type="number"
                  placeholder="Rate"
                  value={form.rate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, rate: e.target.value }))
                  }
                />
              </div>

              {/* Auto Calculated Amount */}
              <div>
                <Label>Total Amount</Label>
                <Input
                  disabled
                  value={form.hours && form.rate ? form.hours * form.rate : ""}
                />
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, status: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSubmit}>
                {isEdit ? "Save Changes" : "Add Overtime"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overtime Table */}
      <Card>
        <CardHeader>
          <CardTitle>Overtime Records</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {overtimeList.map((ot) => (
                <TableRow key={ot.id}>
                  <TableCell>{ot.employee}</TableCell>
                  <TableCell>{ot.date}</TableCell>
                  <TableCell>{ot.hours}</TableCell>
                  <TableCell>₹ {ot.rate}</TableCell>
                  <TableCell>₹ {ot.amount}</TableCell>

                  <TableCell>
                    <Badge variant={statusColors[ot.status]}>
                      {ot.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    {/* Edit */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setForm(ot);
                            setIsEdit(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Edit Overtime</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div>
                            <Label>Hours</Label>
                            <Input
                              type="number"
                              value={form.hours}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  hours: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div>
                            <Label>Rate</Label>
                            <Input
                              type="number"
                              value={form.rate}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  rate: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div>
                            <Label>Status</Label>
                            <Select
                              value={form.status}
                              onValueChange={(v) =>
                                setForm((prev) => ({ ...prev, status: v }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button onClick={handleSubmit}>Save</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Delete */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(ot.id)}
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

export default OvertimePage;
