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

import { Building2, Plus, Edit, Trash2 } from "lucide-react";

/* ----------- API HOOKS ----------- */
import {
  useBranches,
  useCreateBranch,
  useUpdateBranch,
  useToggleBranchStatus,
  useDeleteBranch,
} from "@/features/branch/branch.api";

export default function Branches() {
  const [open, setOpen] = React.useState(false);
  const [editBranch, setEditBranch] = React.useState(null);

  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  const { data: branches = [] } = useBranches();

  const createBranch = useCreateBranch();
  const updateBranch = useUpdateBranch();
  const toggleStatus = useToggleBranchStatus();
  const deleteBranch = useDeleteBranch();

  /* ---------------- OPEN CREATE ---------------- */
  const openCreate = () => {
    setEditBranch(null);
    setName("");
    setCode("");
    setAddress("");
    setIsActive(true);
    setOpen(true);
  };

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (branch) => {
    setEditBranch(branch);
    setName(branch.name);
    setCode(branch.code || "");
    setAddress(branch.address || "");
    setIsActive(branch.isActive);
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    const payload = {
      name,
      code,
      address,
      isActive,
    };

    if (editBranch) {
      updateBranch.mutate({
        id: editBranch.id,
        payload,
      });
    } else {
      createBranch.mutate(payload);
    }

    setOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Branches
        </h2>

        <Button className="gap-2" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add Branch
        </Button>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Branch List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">
                    {branch.name}
                  </TableCell>

                  <TableCell>{branch.code}</TableCell>

                  <TableCell>{branch.address}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={branch.isActive}
                        onCheckedChange={() =>
                          toggleStatus.mutate(branch.id)
                        }
                      />
                      {branch.isActive ? (
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
                      onClick={() => openEdit(branch)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => deleteBranch.mutate(branch.id)}
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
              {editBranch ? "Edit Branch" : "Create Branch"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <Input
              placeholder="Branch Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Branch Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <Textarea
              placeholder="Branch Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active</span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit}>
              {editBranch ? "Update Branch" : "Create Branch"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
