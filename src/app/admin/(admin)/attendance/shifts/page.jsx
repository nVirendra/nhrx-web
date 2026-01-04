"use client";
import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Plus } from "lucide-react";

// Dummy Shifts
const defaultShifts = [
  {
    id: 1,
    name: "General Shift",
    start: "09:00",
    end: "18:00",
    type: "Fixed",
  },
  {
    id: 2,
    name: "Morning Shift",
    start: "07:00",
    end: "15:00",
    type: "Fixed",
  },
  {
    id: 3,
    name: "Night Shift",
    start: "22:00",
    end: "06:00",
    type: "Rotational",
  },
];

const ShiftPolicyPage = () => {
  const [shifts, setShifts] = useState(defaultShifts);

  // New Shift Modal State
  const [newShift, setNewShift] = useState({
    name: "",
    start: "",
    end: "",
    type: "Fixed",
  });

  const addShift = () => {
    setShifts([...shifts, { id: Date.now(), ...newShift }]);
    setNewShift({ name: "", start: "", end: "", type: "Fixed" });
  };

  return (
    <div className="p-6 space-y-8">
      {/* PAGE HEADER */}
      <h1 className="text-2xl font-bold">Shift & Attendance Policies</h1>

      {/* SHIFT SECTION */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Shift Management
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Shift
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Shift</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label>Shift Name *</Label>
                    <Input
                      placeholder="Example: General Shift"
                      value={newShift.name}
                      onChange={(e) =>
                        setNewShift({ ...newShift, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Time *</Label>
                      <Input
                        type="time"
                        value={newShift.start}
                        onChange={(e) =>
                          setNewShift({ ...newShift, start: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>End Time *</Label>
                      <Input
                        type="time"
                        value={newShift.end}
                        onChange={(e) =>
                          setNewShift({ ...newShift, end: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Shift Type</Label>
                    <select
                      className="border rounded-md p-2 w-full"
                      value={newShift.type}
                      onChange={(e) =>
                        setNewShift({ ...newShift, type: e.target.value })
                      }
                    >
                      <option>Fixed</option>
                      <option>Rotational</option>
                      <option>Flexible</option>
                    </select>
                  </div>

                  <Button className="w-full" onClick={addShift}>
                    Add Shift
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift Name</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.name}</TableCell>
                  <TableCell>{shift.start}</TableCell>
                  <TableCell>{shift.end}</TableCell>
                  <TableCell>
                    <Badge>{shift.type}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
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
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
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
          {["1st","2nd","3rd","4th","5th"].map(o => (
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
};

export default ShiftPolicyPage;
