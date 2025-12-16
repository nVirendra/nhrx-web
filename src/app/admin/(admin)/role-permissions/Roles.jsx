import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Pencil, Trash2, ShieldPlus } from "lucide-react";

// Dummy role list (replace with API later)
const INITIAL_ROLES = [
  { id: 1, name: "Admin" },
  { id: 2, name: "HR Manager" },
  { id: 3, name: "Employee" },
];

const Roles = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
  });

  const resetForm = () => {
    setForm({ id: null, name: "" });
    setIsEdit(false);
  };

  const handleSubmit = () => {
    if (isEdit) {
      setRoles((prev) =>
        prev.map((r) => (r.id === form.id ? form : r))
      );
    } else {
      setRoles((prev) => [...prev, { ...form, id: Date.now() }]);
    }
  };

  const handleDelete = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role Management (CRUD)</h1>

        <Dialog onOpenChange={(open) => !open && resetForm()}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <ShieldPlus className="w-4 h-4" />
              Add Role
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Role" : "Create Role"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label>Role Name</Label>
                <Input
                  placeholder="Enter role name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>

              <Button className="w-full" onClick={handleSubmit}>
                {isEdit ? "Save Changes" : "Create Role"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    {/* Edit Role */}
                    <Dialog onOpenChange={(open) => !open && resetForm()}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setForm(role);
                            setIsEdit(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Role</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                          <Label>Role Name</Label>
                          <Input
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          />

                          <Button onClick={handleSubmit}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Delete */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(role.id)}
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

export default Roles;
