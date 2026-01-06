"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const FixedShiftForm = ({ value, onChange, onSubmit }) => {
  return (
    <div className="space-y-4 mt-4">
      {/* Shift Name */}
      <div>
        <Label>Shift Name</Label>
        <Input
          value={value.name}
          onChange={(e) =>
            onChange({ ...value, name: e.target.value })
          }
          placeholder="General Shift"
        />
      </div>

      {/* Timings */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Time</Label>
          <Input
            type="time"
            value={value.start}
            onChange={(e) =>
              onChange({ ...value, start: e.target.value })
            }
          />
        </div>

        <div>
          <Label>End Time</Label>
          <Input
            type="time"
            value={value.end}
            onChange={(e) =>
              onChange({ ...value, end: e.target.value })
            }
          />
        </div>
      </div>

      {/* Save */}
      <Button className="w-full" onClick={onSubmit}>
        Save & Configure Attendance Rules
      </Button>
    </div>
  );
};

export default FixedShiftForm;
