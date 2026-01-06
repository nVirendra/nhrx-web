"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/* ---------------- DEFAULT POLICY ---------------- */
const defaultPolicy = {
  graceInMinutes: 10,
  graceOutMinutes: 5,
  punchInWindowMinutes: 30,
  checkoutAfterMinutes: 240,
  lateAfterMinutes: 15,
  lateMarksToHalfDay: 3,
  lateMarksToAbsent: 6,
  minHalfDayMinutes: 270,
  minFullDayMinutes: 480,
  otAfterMinutes: 30,
  minOTMinutes: 30,
  maxOTMinutes: 120,
  autoMarkAbsent: true,
  weekoffType: "fixed",
  weekoffDays: ["Sun"],
};

export default function ShiftSettingsPage() {
  const { shiftId } = useParams();
  const [policy, setPolicy] = useState(defaultPolicy);

  const updatePolicy = (key, value) => {
    setPolicy(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Shift Settings</h1>

      {/* SHIFT HEADER */}
      <Card>
        <CardHeader>
          <CardTitle>Shift ID: {shiftId}</CardTitle>
        </CardHeader>
      </Card>

      {/* ATTENDANCE POLICY SECTION */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Rules & Policies</CardTitle>
              </CardHeader>
      
              <CardContent className="space-y-10">
      
                {/* ================= GRACE TIME ================= */}
                <div className="space-y-2">
                  <Label>Grace In Time (Minutes)</Label>
                  <Input type="number" placeholder="Example: 10" />
                  <p className="text-sm text-muted-foreground">
                    Late mark will not be applied if employee arrives within grace time.
                  </p>
                </div>
      
                <div className="space-y-2">
                  <Label>Grace Out Time (Minutes)</Label>
                  <Input type="number" placeholder="Example: 5" />
                </div>
      
                {/* ================= PUNCH WINDOW RULES ================= */}
                <div className="space-y-4">
                  <Label className="font-semibold">Punch Window Rules</Label>
      
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Punch-In Minute Window</Label>
                      <Input type="number" placeholder="Example: 30" />
                      <p className="text-xs text-muted-foreground">
                        Allowed minutes before/after shift start for valid IN punch.
                      </p>
                    </div>
      
                    <div>
                      <Label>Checkout After (Minutes)</Label>
                      <Input type="number" placeholder="Example: 240" />
                      <p className="text-xs text-muted-foreground">
                        OUT punch before this time will be ignored.
                      </p>
                    </div>
                  </div>
                </div>
      
                {/* ================= LATE MARK RULES ================= */}
                <div className="space-y-4">
                  <Label className="font-semibold">Late Mark Rules</Label>
      
                  <div className="flex items-center justify-between border p-3 rounded-lg">
                    <div>
                      <p className="font-medium">Enable Late Marks</p>
                      <p className="text-sm text-muted-foreground">
                        Late arrival beyond grace time counts as late mark.
                      </p>
                    </div>
                    <Switch />
                  </div>
      
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Late After (Minutes)</Label>
                      <Input type="number" placeholder="Example: 15" />
                    </div>
      
                    <div>
                      <Label>Late Marks → Half-Day</Label>
                      <Input type="number" placeholder="3" />
                    </div>
      
                    <div>
                      <Label>Late Marks → Absent</Label>
                      <Input type="number" placeholder="6" />
                    </div>
                  </div>
                </div>
      
                {/* ================= HALF DAY RULE ================= */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-lg">
                    <div>
                      <Label>Enable Half-Day Policy</Label>
                      <p className="text-sm text-muted-foreground">
                        Half-day if minimum working hours not met.
                      </p>
                    </div>
                    <Switch />
                  </div>
      
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Minimum Minutes for Half-Day</Label>
                      <Input type="number" placeholder="270 (4.5 hrs)" />
                    </div>
      
                    <div>
                      <Label>Minimum Minutes for Full-Day</Label>
                      <Input type="number" placeholder="480 (8 hrs)" />
                    </div>
                  </div>
                </div>
      
                {/* ================= OVERTIME RULES ================= */}
                <div className="space-y-4">
                  <Label className="font-semibold">Overtime Policy</Label>
      
                  <div className="flex items-center justify-between border p-3 rounded-lg">
                    <div>
                      <p className="font-medium">Allow Overtime</p>
                      <p className="text-sm text-muted-foreground">
                        Calculate OT beyond shift working hours.
                      </p>
                    </div>
                    <Switch />
                  </div>
      
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>OT After (Minutes)</Label>
                      <Input type="number" placeholder="30" />
                    </div>
      
                    <div>
                      <Label>Minimum OT (Minutes)</Label>
                      <Input type="number" placeholder="30" />
                    </div>
      
                    <div>
                      <Label>Max OT Per Day (Minutes)</Label>
                      <Input type="number" placeholder="120" />
                    </div>
                  </div>
                </div>
      
                {/* ================= AUTO ABSENT ================= */}
                <div className="flex items-center justify-between border p-3 rounded-lg">
                  <div>
                    <Label>Auto Mark Absent</Label>
                    <p className="text-sm text-muted-foreground">
                      Mark absent if no IN punch exists.
                    </p>
                  </div>
                  <Switch />
                </div>
      
                {/* ================= WEEKOFF ================= */}
                <div className="space-y-2">
                  <Label>Weekoff Type</Label>
                  <select className="border rounded-md p-2 w-full">
                    <option value="FIXED">Fixed</option>
                    <option value="FLEXIBLE">Flexible</option>
                    <option value="ROTATIONAL">Rotational</option>
                  </select>
                </div>
      
                <div className="space-y-2">
                  <Label>Weekoff Days</Label>
                  <div className="flex flex-wrap gap-3">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                      <label key={d} className="flex items-center gap-2">
                        <input type="checkbox" /> {d}
                      </label>
                    ))}
                  </div>
                </div>
      
                {/* ================= WEEKDAY PARTIAL DAY RULES ================= */}
                <div className="space-y-4 border-t pt-6">
                  <Label className="font-semibold">Weekday Partial Day Rules</Label>
      
                  {/* ONE RULE ROW (repeatable) */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label>Day</Label>
                        <select className="border rounded-md p-2 w-full">
                          <option>Friday</option>
                          <option>Saturday</option>
                        </select>
                      </div>
      
                      <div>
                        <Label>Begins At</Label>
                        <Input type="time" />
                      </div>
      
                      <div>
                        <Label>Ends At</Label>
                        <Input type="time" />
                      </div>
      
                      <div>
                        <Label>Attendance Credit</Label>
                        <select className="border rounded-md p-2 w-full">
                          <option>FULL_DAY</option>
                          <option>HALF_DAY</option>
                          <option>PRESENT</option>
                        </select>
                      </div>
                    </div>
      
                    <div className="flex gap-4">
                      {["1st", "2nd", "3rd", "4th", "5th"].map(o => (
                        <label key={o} className="flex items-center gap-2">
                          <input type="checkbox" /> {o}
                        </label>
                      ))}
                    </div>
                  </div>
      
                  <Button variant="outline">+ Add Partial Day Rule</Button>
                </div>
      
              </CardContent>
            </Card>
    </div>
  );
}
