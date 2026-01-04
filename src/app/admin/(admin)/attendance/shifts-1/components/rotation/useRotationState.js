"use client";

import { useState } from "react";

export function useRotationState() {
  const [rotation, setRotation] = useState({
    rotationName: "",
    rotationCode: "",
    cycleDays: 3,
    isActive: true,
    dayShiftMap: {},
  });

  const updateDayShift = (day, shiftId) => {
    setRotation(prev => ({
      ...prev,
      dayShiftMap: {
        ...prev.dayShiftMap,
        [day]: shiftId,
      },
    }));
  };

  return { rotation, setRotation, updateDayShift };
}
