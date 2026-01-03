"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useApprovalWorkflowById,
  useUpdateApprovalWorkflow,
} from "@/features/approval/approval-workflow.api";

import ApprovalWorkflowPage from "../../../workflows/page";

export default function EditApprovalWorkflowPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useApprovalWorkflowById(id);
  const { mutate: updateWorkflow, isLoading: updating } =
    useUpdateApprovalWorkflow();

  if (isLoading) return <p className="p-6">Loading workflow...</p>;

  const handleUpdate = (payload) => {
    updateWorkflow(
      { id, payload },
      {
        onSuccess: () => {
          toast.success("Workflow updated successfully");
          router.push("/admin/approvals/modules");
        },
        onError: () => toast.error("Update failed"),
      }
    );
  };

  return (
    <ApprovalWorkflowPage
      mode="edit"
      workflowData={data}
      onSubmit={handleUpdate}
      isSubmitting={updating}
    />
  );
}
