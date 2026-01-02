"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import LeavePolicyPage from "@/components/leave/LeavePolicyPage";

import {
  useLeavePolicyById,
  useCreateLeavePolicy,
  useUpdateLeavePolicy,
} from "@/features/leave/leave-policy.api";

const LeavePolicyFormPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = Boolean(id);

  const { data, isLoading } = useLeavePolicyById(id);
  const { mutate: createPolicy } = useCreateLeavePolicy();
  const { mutate: updatePolicy } = useUpdateLeavePolicy();

  

  const handleSubmit = useCallback((payload) => {
    if (isEdit  && updatePolicy) {
      updatePolicy({ id, payload }, {
        onSuccess: () => {
          toast.success("Policy updated");
          router.push("/admin/leaves/leave-policies");
        },
      });
    } else if (createPolicy) {
      createPolicy(payload, {
        onSuccess: () => {
          toast.success("Policy created");
          router.push("/admin/leaves/leave-policies");
        },
      });
    }
  });

  if (isEdit && isLoading) return null;

  return (
    <LeavePolicyPage
      mode={isEdit ? "edit" : "create"}
      initialData={data}
      onSubmit={handleSubmit}
    />
  );
};

export default LeavePolicyFormPage;
