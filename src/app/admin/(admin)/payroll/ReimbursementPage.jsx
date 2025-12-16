import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

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

import { Upload, Pencil, Trash2, Plus } from "lucide-react";

// Dummy data
const initialReimbursements = [
  {
    id: 1,
    employee: "Virendra Nishad",
    category: "Travel",
    amount: 1500,
    date: "2025-01-16",
    note: "Auto fare & tolls",
    document: "",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Priya Sharma",
    category: "Office Supplies",
    amount: 600,
    date: "2025-01-10",
    note: "Pen drive purchase",
    document: "",
    status: "Approved",
  },
];

const statusVariant = {
  Pending: "secondary",
  Approved: "default",
  Rejected: "destructive",
};

const ReimbursementPage = () => {
  const [reimbursements, setReimbursements] = useState(initialReimbursements);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    employee: "",
    category: "",
    amount: "",
    date: "",
    note: "",
    document: "",
    status: "Pending",
  });

  const resetForm = () => {
    setForm({
      id: null,
      employee: "",
      category: "",
      amount: "",
      date: "",
      note: "",
      document: "",
      status: "Pending",
    });
    setIsEdit(false);
  };

  const handleSubmit = () => {
    if (isEdit) {
      setReimbursements((prev) =>
        prev.map((r) => (r.id === form.id ? form : r))
      );
    } else {
      setReimbursements((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }
  };

  const handleDelete = (id) => {
    setReimbursements((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reimbursements</h1>

        {/* Add Button */}
        <Dialog onOpenChange={(open) => !open && resetForm()}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Reimbursement
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Reimbursement" : "Add Reimbursement"}</DialogTitle>
            </DialogHeader>

            {/* Form */}
            <div className="space-y-4 mt-4">
              {/* Employee */}
              <div>
                <Label>Employee</Label>
                <Select
                  value={form.employee}
                  onValueChange={(v) => setForm((p) => ({ ...p, employee: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Virendra Nishad">Virendra Nishad</SelectItem>
                    <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                    <SelectItem value="Amit Verma">Amit Verma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div>
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amount: e.target.value }))
                  }
                />
              </div>

              {/* Date */}
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>

              {/* Note */}
              <div>
                <Label>Note</Label>
                <Textarea
                  placeholder="Enter description..."
                  value={form.note}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, note: e.target.value }))
                  }
                />
              </div>

              {/* Document Upload */}
              <div>
                <Label>Upload Bill</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        document: e.target.files[0]?.name || "",
                      }))
                    }
                  />
                  <Upload className="w-4 h-4" />
                </div>
              </div>

              <Button className="w-full" onClick={handleSubmit}>
                {isEdit ? "Save Changes" : "Add Reimbursement"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reimbursement Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reimbursements</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reimbursements.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.employee}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell>₹ {r.amount}</TableCell>
                  <TableCell>{r.date}</TableCell>

                  <TableCell>
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                  </TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    {/* EDIT */}
                    <Dialog onOpenChange={(open) => !open && resetForm()}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setForm(r);
                            setIsEdit(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Edit Reimbursement</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                          <div>
                            <Label>Amount</Label>
                            <Input
                              type="number"
                              value={form.amount}
                              onChange={(e) =>
                                setForm((p) => ({
                                  ...p,
                                  amount: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div>
                            <Label>Status</Label>
                            <Select
                              value={form.status}
                              onValueChange={(v) =>
                                setForm((p) => ({ ...p, status: v }))
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

                          <Button onClick={handleSubmit}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* DELETE */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(r.id)}
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

export default ReimbursementPage;
