"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const FlexibleShiftForm = ({ value, onChange, onSubmit }) => {
  return (
    <div className="space-y-4 mt-4">
      <div>
        <Label>Shift Name</Label>
        <Input
          placeholder="Flexible Shift"
          value={value.name}
          onChange={(e) =>
            onChange({ ...value, name: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Minimum Work Hours</Label>
          <Input
            type="number"
            value={value.minHours}
            onChange={(e) =>
              onChange({ ...value, minHours: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <Label>Maximum Work Hours</Label>
          <Input
            type="number"
            value={value.maxHours}
            onChange={(e) =>
              onChange({ ...value, maxHours: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <Button className="w-full" onClick={onSubmit}>
        Save Flexible Shift
      </Button>
    </div>
  );
};

export default FlexibleShiftForm;
