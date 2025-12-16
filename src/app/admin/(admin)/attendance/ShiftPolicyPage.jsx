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

        <CardContent className="space-y-8">
          {/* GRACE TIME */}
          <div className="space-y-2">
            <Label>Grace Time (Minutes)</Label>
            <Input placeholder="Example: 10" type="number" />
            <p className="text-sm text-muted-foreground">
              Employees arriving within grace time will not receive a late mark.
            </p>
          </div>

          {/* LATE MARK POLICIES */}
          <div className="space-y-3">
            <Label className="font-semibold">Late Mark Rules</Label>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div>
                <p className="font-medium">Enable Late Marks</p>
                <p className="text-sm text-muted-foreground">
                  Late arrival beyond grace time counts as a late mark.
                </p>
              </div>
              <Switch />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>No. of Late Marks for Half-Day</Label>
                <Input placeholder="3" type="number" />
              </div>

              <div>
                <Label>No. of Late Marks for 1 Absent</Label>
                <Input placeholder="6" type="number" />
              </div>
            </div>
          </div>

          {/* HALF-DAY RULE */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Enable Half-Day Policy</Label>
              <p className="text-sm text-muted-foreground">
                Automatically mark half-day if minimum working hours not met.
              </p>
            </div>
            <Switch />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Minimum Hours for Half-Day</Label>
              <Input placeholder="4.5" type="number" />
            </div>

            <div>
              <Label>Minimum Hours for Full-Day</Label>
              <Input placeholder="8" type="number" />
            </div>
          </div>

          {/* OVERTIME POLICIES */}
          <div className="space-y-3">
            <Label className="font-semibold">Overtime Policy</Label>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div>
                <p className="font-medium">Allow Overtime</p>
                <p className="text-sm text-muted-foreground">
                  Overtime will be calculated beyond shift hours.
                </p>
              </div>
              <Switch />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum OT (Minutes)</Label>
                <Input placeholder="30" type="number" />
              </div>

              <div>
                <Label>Maximum OT Per Day (Hours)</Label>
                <Input placeholder="2" type="number" />
              </div>
            </div>
          </div>

          {/* AUTO ABSENT RULE */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Auto Mark Absent</Label>
              <p className="text-sm text-muted-foreground">
                Auto-absent if IN punch is missing.
              </p>
            </div>
            <Switch />
          </div>

          {/* WEEKOFF RULE */}
          <div>
            <Label>Weekoff Days</Label>
            <select className="border rounded-md p-2 w-full">
              <option>Saturday & Sunday</option>
              <option>Sunday</option>
              <option>Friday</option>
              <option>Flexible Weekoff</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShiftPolicyPage;
