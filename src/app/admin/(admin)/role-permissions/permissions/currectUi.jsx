"use client"
import React, { useState, useMemo } from "react";
import {
  Pencil, Trash2, ShieldPlus, Search,
  Shield, Info
} from "lucide-react";

// ---------- SHADCN ----------
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Ensure this shadcn component is installed
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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

import {
  useGetRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useGetMenuPermissionTree,
  getRoleDetailsApi,
} from "@/features/role/role-v2.api";




const PermissionTree = ({ menuTree = [], value, onChange }) => {
  const handleToggle = (key) => {
    const newValue = value.includes(key)
      ? value.filter((k) => k !== key)
      : [...value, key];
    onChange(newValue);
  };

  const handleSelectSubmenu = (subId, permissions, checked) => {
    const keys = permissions.map((p) => `${subId}:${p.id}`);

    if (checked) onChange([...new Set([...value, ...keys])]);
    else onChange(value.filter(v => !keys.includes(v)));
  };

  return (
    <Accordion type="multiple" className="w-full">
      {menuTree?.map((menu) => (
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
            {menu.subMenus?.map((sub) => {
              const subKeys = sub.permissions.map(
                (p) => `${sub.id}:${p.id}`
              );

              const allSelected = subKeys.every(k => value.includes(k));

              return (
                <div
                  key={sub.id}
                  className="bg-muted/30 rounded-md p-3 border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-bold">{sub.name}</Label>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) =>
                          handleSelectSubmenu(sub.id, sub.permissions, checked)
                        }
                      />

                      <span className="text-xs text-muted-foreground cursor-pointer">
                        Select All
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sub.permissions.map((perm) => {
                      const key = `${sub.id}:${perm.id}`;
                      const active = value.includes(key);

                      return (
                        <Badge
                          key={key}
                          variant={active ? "default" : "outline"}
                          className="cursor-pointer px-3 py-1"
                          onClick={() => handleToggle(key)}
                        >
                          {perm.label}
                        </Badge>
                      );
                    })}
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





export default function RoleManagementPage() {
  const { data: roles = [] } = useGetRoles();
  const { data: menuTree = [] } = useGetMenuPermissionTree();

  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const buildPermissionPayload = () => {
  return form.permissions.map(k => {
    const [menuId, permissionId] = k.split(":");
    return { menuId: Number(menuId), permissionId: Number(permissionId) };
  });
};

  // Added 'description' to the form state
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    permissions: []
  });

  const filteredRoles = useMemo(() => {
    return roles.filter(r =>
      r.roleName?.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  const resetForm = () => {
    setForm({ id: null, name: "", description: "", permissions: [] });
    setIsEdit(false);
  };

  const handleSubmit = async () => {
    if (!form.name) return;

    const payload = {
      name: form.name,
      description: form.description,
      permissions: buildPermissionPayload(),
    };

    if (isEdit) {
      await updateRole.mutateAsync({ id: form.id, payload });
    } else {
      await createRole.mutateAsync(payload);
    }

    resetForm();
    setOpen(false);
  };


  const handleEdit = async (id) => {
    const data = await getRoleDetailsApi(id);

    setForm({
      id: data.id,
      name: data.roleName,
      description: data.description,
      permissions: data.permissions?.map(
        (p) => `${p.menuId}:${p.permissionId}`
      ) || []
    });

    setIsEdit(true);
    setOpen(true);
  };


  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">Define roles and assign granular permissions to users.</p>
        </div>

        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <ShieldPlus className="w-5 h-5" />
              New Role
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 overflow-hidden">
            <DialogHeader className="p-6 border-b">
              <DialogTitle>{isEdit ? "Edit Role Details" : "Create New Role"}</DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Sidebar: Identity & Description */}
              <div className="w-full md:w-80 p-6 border-r bg-muted/10 space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Role Name</Label>
                    <Input
                      placeholder="e.g. Finance Admin"
                      value={form.name}
                      onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold">Description</Label>
                    <Textarea
                      placeholder="What is this role responsible for?"
                      className="resize-none h-32"
                      value={form.description}
                      onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <div className="flex gap-2 text-blue-700 dark:text-blue-300 mb-1">
                    <Info className="w-4 h-4 mt-0.5" />
                    <span className="text-xs font-bold uppercase">Summary</span>
                  </div>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                    Active Permissions: <strong>{form.permissions.length}</strong>
                  </p>
                </div>
              </div>

              {/* Main Content: Permission Tree */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    Access Level Configuration
                  </h3>
                  <PermissionTree
                    menuTree={menuTree}
                    value={form.permissions}
                    onChange={(permissions) => setForm(p => ({ ...p, permissions }))}
                  />

                </div>
              </ScrollArea>
            </div>

            <DialogFooter className="p-4 border-t bg-muted/5">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button disabled={!form.name} className="px-8" onClick={handleSubmit}>
                {isEdit ? "Update Role" : "Create Role"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center max-w-sm relative">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or description..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="border-muted shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="min-w-[200px]">Role & Description</TableHead>
              <TableHead>Permissions Snapshot</TableHead>
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