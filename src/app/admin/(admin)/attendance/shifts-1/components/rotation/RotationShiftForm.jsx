"use client";

import { Button } from "@/components/ui/button";
import { useRotationState } from "./useRotationState";
import RotationMetaForm from "./RotationMetaForm";
import RotationDayMapper from "./RotationDayMapper";
import RotationPreview from "./RotationPreview";

export default function RotationShiftForm() {
  const { rotation, setRotation, updateDayShift } = useRotationState();

  return (
    <div className="space-y-6">
      <RotationMetaForm rotation={rotation} setRotation={setRotation} />

      <RotationDayMapper
        rotation={rotation}
        updateDayShift={updateDayShift}
      />

      <RotationPreview rotation={rotation} />

      <div className="flex justify-end">
        <Button>Save Rotation Shift</Button>
      </div>
    </div>
  );
}
