"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import LeavePolicyForm from "../../components/LeavePolicyForm";
import {
  useLeavePolicyById,
  useUpdateLeavePolicy,
} from "@/features/leave/leave-policy.api";

export default function EditLeavePolicyPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useLeavePolicyById(id);
  const { mutate } = useUpdateLeavePolicy();

  if (!data && !isLoading) {
    return <p className="p-6">Policy not found</p>;
  }

  const handleSubmit = (payload) => {
    mutate(
      { id, payload },
      {
        onSuccess: () => {
          toast.success("Policy updated");
          router.push("/admin/leaves/leave-policies");
        },
      }
    );
  };

  return (
    <LeavePolicyForm
      mode="edit"
      initialData={data}
      onSubmit={handleSubmit}
    />
  );
}
