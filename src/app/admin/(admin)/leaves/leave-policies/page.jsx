"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";


/* ---------- UI ---------- */
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
import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/* ---------- API ---------- */
import {
  useLeavePolicies,
  useToggleLeavePolicyStatus,
  useDeleteLeavePolicy,
} from "@/features/leave/leave-policy.api";

const LeavePolicyListPage = () => {
  const router = useRouter();

  const { data: policies = [], isLoading } = useLeavePolicies();
  const { mutate: toggleStatus } = useToggleLeavePolicyStatus();
  const { mutate: deletePolicy } = useDeleteLeavePolicy();

  const handleToggle = (id) => {
    toggleStatus(id, {
      onSuccess: () => toast.success("Policy status updated"),
      onError: () => toast.error("Failed to update status"),
    });
  };

  const handleDelete = (id) => {
    deletePolicy(id, {
      onSuccess: () => toast.success("Policy deleted"),
      onError: () => toast.error("Failed to delete policy"),
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Policies</h1>

        <Button onClick={() => router.push("/admin/leaves/leave-policies/create")}>
          + Create Policy
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Policy List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.name}</TableCell>

                  <TableCell>
                    <Switch
                      checked={policy.isActive}
                      onCheckedChange={() => handleToggle(policy.id)}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(policy.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/admin/leaves/leave-policies/edit/${policy.id}`
                            )
                          }
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(policy.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {!policies.length && !isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No leave policies found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeavePolicyListPage;
