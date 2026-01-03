"use client";

import LeavePolicyForm from "../components/LeavePolicyForm";
import { useCreateLeavePolicy } from "@/features/leave/leave-policy.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateLeavePolicyPage() {
  const router = useRouter();
  const { mutate } = useCreateLeavePolicy();

  const handleSubmit = (payload) => {
    mutate(payload, {
      onSuccess: () => {
        toast.success("Policy created");
        router.push("/admin/leaves/leave-policies");
      },
    });
  };

  return <LeavePolicyForm mode="create" onSubmit={handleSubmit} />;
}
