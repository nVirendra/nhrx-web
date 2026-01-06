"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const RotationShiftForm = ({
  value,
  shifts,
  onNameChange,
  onCodeChange,
  onCycleChange,
  onDayAssign,
  onSubmit,
}) => {
  return (
    <div className="space-y-6 mt-4">
      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Rotation Name</Label>
          <Input value={value.rotationName} onChange={onNameChange} />
        </div>

        <div>
          <Label>Rotation Code</Label>
          <Input value={value.rotationCode} onChange={onCodeChange} />
        </div>

        <div>
          <Label>Cycle Days</Label>
          <Input
            type="number"
            min={1}
            value={value.cycleDays}
            onChange={onCycleChange}
          />
        </div>
      </div>

      {/* Day Mapping */}
      <div className="space-y-4">
        <h4 className="font-semibold">Day-wise Shift Assignment</h4>

        {Array.from({ length: value.cycleDays }).map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              className="flex items-center gap-4 p-3 border rounded-lg"
            >
              <div className="w-20 font-medium">Day {day}</div>

              <Select
                value={value.dayShiftMap[day] || ""}
                onValueChange={(v) => onDayAssign(day, v)}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Assign shift" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.name} ({s.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>

      <Button className="w-full" onClick={onSubmit}>
        Save Rotation Shift
      </Button>
    </div>
  );
};

export default RotationShiftForm;
