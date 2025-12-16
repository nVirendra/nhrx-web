import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
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

// Dummy Permission Groups (Replace with API later)
const PERMISSION_GROUPS = {
  Employees: ["View Employees", "Create Employee", "Edit Employee", "Delete Employee"],
  Attendance: ["View Attendance", "Modify Attendance", "Approve Regularization"],
  Leaves: ["View Leave Requests", "Approve Leave", "Configure Policies"],
  Payroll: ["View Payroll", "Process Payroll", "Manage Deductions", "View Payslips"],
  Recruitment: ["View Candidates", "Edit Job Posts", "Manage Interviews"],
  Settings: ["Manage Roles", "Access System Settings"],
};

// Dummy initial roles
const INITIAL_ROLES = [
  {
    id: 1,
    name: "Admin",
    permissions: Object.values(PERMISSION_GROUPS).flat(),
  },
  {
    id: 2,
    name: "HR Manager",
    permissions: [
      "View Employees",
      "Create Employee",
      "Edit Employee",
      "View Leave Requests",
      "Approve Leave",
      "View Attendance",
      "Modify Attendance",
      "View Payroll",
    ],
  },
];

const RoleManagementPage = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    permissions: [],
  });

  const resetForm = () => {
    setForm({ id: null, name: "", permissions: [] });
    setIsEdit(false);
  };

  const togglePermission = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      setRoles((prev) =>
        prev.map((r) => (r.id === form.id ? form : r))
      );
    } else {
      setRoles((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }
  };

  const handleDelete = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role Management</h1>

        <Dialog onOpenChange={(open) => !open && resetForm()}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <ShieldPlus className="w-4 h-4" /> Add Role
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Role" : "Create Role"}</DialogTitle>
            </DialogHeader>

            {/* Role Form */}
            <div className="space-y-6 mt-4">
              {/* Role Name */}
              <div>
                <Label>Role Name</Label>
                <Input
                  placeholder="HR Manager, Admin, Recruiter..."
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <h3 className="font-semibold">Assign Permissions</h3>

                {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
                  <Card key={group} className="p-4">
                    <h4 className="font-medium mb-3">{group}</h4>

                    <div className="grid md:grid-cols-2 gap-4">
                      {perms.map((perm) => (
                        <div key={perm} className="flex items-center space-x-3">
                          <Checkbox
                            checked={form.permissions.includes(perm)}
                            onCheckedChange={() => togglePermission(perm)}
                          />
                          <Label>{perm}</Label>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <Button onClick={handleSubmit} className="w-full">
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
                <TableHead>Total Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <p className="font-medium">{role.name}</p>
                  </TableCell>

                  <TableCell>{role.permissions.length}</TableCell>

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

                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Edit Role</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 mt-4">
                          <div>
                            <Label>Role Name</Label>
                            <Input
                              value={form.name}
                              onChange={(e) =>
                                setForm((p) => ({ ...p, name: e.target.value }))
                              }
                            />
                          </div>

                          <div className="space-y-4">
                            <h3 className="font-semibold">Permissions</h3>

                            {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
                              <Card key={group} className="p-4">
                                <h4 className="font-medium mb-3">{group}</h4>

                                <div className="grid md:grid-cols-2 gap-4">
                                  {perms.map((perm) => (
                                    <div key={perm} className="flex items-center space-x-3">
                                      <Checkbox
                                        checked={form.permissions.includes(perm)}
                                        onCheckedChange={() => togglePermission(perm)}
                                      />
                                      <Label>{perm}</Label>
                                    </div>
                                  ))}
                                </div>
                              </Card>
                            ))}
                          </div>

                          <Button onClick={handleSubmit} className="w-full">
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Role */}
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

export default RoleManagementPage;
