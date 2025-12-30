"use client";

import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useApprovalWorkflows,
  useToggleWorkflowStatus,
  useDeleteApprovalWorkflow,
} from "@/features/approval/approval-workflow.api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function ApprovalWorkflowListPage() {
  const router = useRouter();

  const { data: workflows = [], isLoading } = useApprovalWorkflows();
  const { mutate: toggleStatus } = useToggleWorkflowStatus();
  const { mutate: deleteWorkflow } = useDeleteApprovalWorkflow();

  if (isLoading) return <p className="p-6">Loading workflows...</p>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Approval Workflows</h1>
        <Button onClick={() => router.push("/approvals/workflows/create")}>
          <Plus className="h-4 w-4 mr-2" /> Create Workflow
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configured Workflows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {workflows.length === 0 && (
            <p className="text-muted-foreground">No workflows found.</p>
          )}

          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div>
                <h3 className="font-semibold">{wf.moduleCode}</h3>
                <p className="text-sm text-muted-foreground">
                  {wf.approvalTypeCode} · {wf.scopeCode}
                </p>

                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">{wf.priorityCode}</Badge>
                  {wf.flowModeCode && (
                    <Badge variant="outline">{wf.flowModeCode}</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={wf.isActive}
                  onCheckedChange={() =>
                    toggleStatus(wf.id, {
                      onSuccess: () => toast.success("Status updated"),
                    })
                  }
                />

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    router.push(`/admin/approvals/modules/${wf.id}/edit`)
                  }
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() =>
                    deleteWorkflow(wf.id, {
                      onSuccess: () =>
                        toast.success("Workflow deleted"),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
