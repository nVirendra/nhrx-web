"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import AssignmentTypeSelector from "./AssignmentTypeSelector";
import FixedShiftAssignment from "./FixedShiftAssignment";
import RotationShiftAssignment from "./RotationShiftAssignment";
import TemporaryOverrideForm from "./TemporaryOverrideForm";
import AssignmentPreview from "./AssignmentPreview";

export default function EmployeeShiftAssignment() {
  const router = useRouter();

  const [type, setType] = useState("fixed");
  const [data, setData] = useState({});

  return (
    <div className="space-y-6">
      {/* 🔹 Action Bar */}
      <div className="flex justify-between items-center">
        <AssignmentTypeSelector value={type} onChange={setType} />

        <Button
          variant="outline"
          onClick={() => router.push("/admin/employees/bulk-shift")}
        >
          Bulk Shift Assignment
        </Button>
      </div>

      {type === "fixed" && (
        <FixedShiftAssignment data={data} setData={setData} />
      )}

      {type === "rotation" && (
        <RotationShiftAssignment data={data} setData={setData} />
      )}

      {type === "temporary" && (
        <TemporaryOverrideForm data={data} setData={setData} />
      )}

      <AssignmentPreview type={type} data={data} />
    </div>
  );
}
