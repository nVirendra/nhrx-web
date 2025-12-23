"use client";

import React, { useState, useMemo } from "react";
import {
  Pencil,
  Trash2,
  ShieldPlus,
  Search,
  Shield,
  Info,
} from "lucide-react";

// ---------- SHADCN ----------
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

// ---------- ROLE API ----------
import {
  useGetRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useGetMenuPermissionTree,
  getRoleDetailsApi,
} from "@/features/role/role-v2.api";

/* =====================================================
   Permission Tree (LOGIC FIXED, UI SAME)
===================================================== */

const PermissionTree = ({ menus = [], value, onChange }) => {
  const isSelected = (menuId, permissionId) =>
    value.some(
      (p) => p.menuId === menuId && p.permissionId === permissionId
    );

  const togglePermission = (menuId, permissionId) => {
    if (isSelected(menuId, permissionId)) {
      onChange(
        value.filter(
          (p) =>
            !(p.menuId === menuId && p.permissionId === permissionId)
        )
      );
    } else {
      onChange([...value, { menuId, permissionId }]);
    }
  };

  const toggleSubmenuAll = (menuId, permissions, checked) => {
    const ids = permissions.map((p) => p.id);

    if (checked) {
      const newPerms = ids
        .filter(
          (pid) => !isSelected(menuId, pid)
        )
        .map((pid) => ({ menuId, permissionId: pid }));

      onChange([...value, ...newPerms]);
    } else {
      onChange(
        value.filter(
          (p) =>
            p.menuId !== menuId ||
            !ids.includes(p.permissionId)
        )
      );
    }
  };

  return (
    <Accordion type="multiple" className="w-full">
      {menus.map((menu) => (
        <AccordionItem
          key={menu.id}
          value={menu.menu}
          className="border rounded-lg px-4 mb-2"
        >
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold">{menu.menu}</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-4 space-y-4">
            {menu.subMenus.map((sub) => {
              const permissionIds = sub.permissions.map((p) => p.id);
              const allSelected = permissionIds.every((pid) =>
                isSelected(menu.id, pid)
              );

              return (
                <div
                  key={sub.id}
                  className="bg-muted/30 rounded-md p-3 border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-bold">
                      {sub.name}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) =>
                          toggleSubmenuAll(
                            menu.id,
                            sub.permissions,
                            checked
                          )
                        }
                      />
                      <span className="text-xs text-muted-foreground">
                        Select All
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sub.permissions.map((perm) => (
                      <Badge
                        key={perm.id}
                        variant={
                          isSelected(menu.id, perm.id)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer px-3 py-1"
                        onClick={() =>
                          togglePermission(menu.id, perm.id)
                        }
                      >
                        {perm.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

/* =====================================================
   Role Management Page (UNCHANGED UI)
===================================================== */

export default function RoleManagementPage() {
  const { data: roles = [] } = useGetRoles();
  const { data: menuTree = [] } = useGetMenuPermissionTree();

  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    permissions: [],
  });

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (r) =>
        r.roleName?.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  const resetForm = () => {
    setForm({ id: null, name: "", description: "", permissions: [] });
    setIsEdit(false);
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      permissions: form.permissions,
    };

    if (isEdit) {
      await updateRole.mutateAsync({ id: form.id, payload });
    } else {
      await createRole.mutateAsync(payload);
    }

    setOpen(false);
    resetForm();
  };

  const handleEdit = async (id) => {
    const data = await getRoleDetailsApi(id);
    setForm(data);
    setIsEdit(true);
    setOpen(true);
  };

  /* ---------- UI BELOW IS IDENTICAL ---------- */

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-muted-foreground">
            Define roles and assign permissions
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <ShieldPlus className="w-4 h-4" />
              New Role
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl h-[85vh] p-0">
            <DialogHeader className="p-6 border-b">
              <DialogTitle>
                {isEdit ? "Edit Role" : "Create Role"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex h-full">
              <div className="w-80 p-6 border-r space-y-4">
                <div>
                  <Label>Role Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    className="h-32 resize-none"
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-md text-xs">
                  <Info className="inline w-4 h-4 mr-1" />
                  Active Permissions:{" "}
                  <strong>{form.permissions.length}</strong>
                </div>
              </div>

              <ScrollArea className="flex-1 p-6">
                <PermissionTree
                  menus={menuTree}
                  value={form.permissions}
                  onChange={(permissions) =>
                    setForm({ ...form, permissions })
                  }
                />
              </ScrollArea>
            </div>

            <DialogFooter className="p-4 border-t">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {isEdit ? "Update Role" : "Create Role"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* SEARCH */}
      <div className="max-w-sm relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="font-bold">{role.roleName}</div>
                  <div className="text-xs text-muted-foreground">
                    {role.description}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {role.permissions?.length || 0} permissions
                  </Badge>
                </TableCell>

                <TableCell className="text-right space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(role.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteRole.mutate(role.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
