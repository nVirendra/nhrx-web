"use client";

import React, { useState } from "react";

import {
  useGetRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
} from "@/features/role/role.api";

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

const Roles = () => {
  const { data: roles = [], isLoading } = useGetRoles();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    roleName: "",
    description: "",
  });

  const resetForm = () => {
    setForm({ id: null, roleName: "", description: "" });
    setIsEdit(false);
  };

  const handleSubmit = async () => {
    if (!form.roleName) return;

    if (isEdit) {
      await updateRole.mutateAsync({
        id: form.id,
        payload: {
          roleName: form.roleName,
          description: form.description,
        },
      });
    } else {
      await createRole.mutateAsync({
        roleName: form.roleName,
        description: form.description,
      });
    }

    resetForm();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    await deleteRole.mutateAsync(id);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role Management</h1>

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
                  value={form.roleName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, roleName: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={createRole.isPending || updateRole.isPending}
              >
                {isEdit ? "Save Changes" : "Create Role"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.roleName}</TableCell>
                    <TableCell>{role.description || "-"}</TableCell>

                    <TableCell className="text-right flex justify-end gap-2">
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
                            <Input
                              value={form.roleName}
                              onChange={(e) =>
                                setForm((p) => ({
                                  ...p,
                                  roleName: e.target.value,
                                }))
                              }
                            />
                            <Button onClick={handleSubmit}>
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;
