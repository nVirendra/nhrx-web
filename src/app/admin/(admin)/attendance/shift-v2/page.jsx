"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
  Tabs, TabsList, TabsTrigger, TabsContent
} from "@/components/ui/tabs";
import { Plus, Settings, Trash2 } from "lucide-react";

/* ----------------------------------
  DUMMY DATA (Replace with API)
---------------------------------- */
const initialShifts = [
  {
    id: "s1",
    name: "Morning Shift",
    type: "fixed",
    start: "07:00",
    end: "15:00",
    isNight: false,
    isActive: true,
  },
  {
    id: "s2",
    name: "Evening Shift",
    type: "fixed",
    start: "15:00",
    end: "23:00",
    isNight: false,
    isActive: true,
  },
  {
    id: "s3",
    name: "Night Shift",
    type: "fixed",
    start: "23:00",
    end: "07:00",
    isNight: true,
    isActive: true,
  },
  {
    id: "r1",
    name: "Factory Rotation",
    type: "rotation",
    cycleDays: 3,
    isActive: true,
  },
];

export default function ShiftListPage() {
  const router = useRouter();
  const [shifts, setShifts] = useState(initialShifts);
  const [activeTab, setActiveTab] = useState("fixed");

  /* ---------------- CREATE HANDLERS ---------------- */

  const createFixedShift = () => {
    const id = Date.now().toString();
    const shift = {
      id,
      name: "New Fixed Shift",
      type: "fixed",
      start: "09:00",
      end: "18:00",
      isNight: false,
      isActive: true,
    };
    setShifts(prev => [...prev, shift]);
    router.push(`/admin/attendance/shift-v2/${id}?type=fixed`);
  };

  const createFlexibleShift = () => {
    const id = Date.now().toString();
    const shift = {
      id,
      name: "Flexible Shift",
      type: "flexible",
      minHours: 8,
      maxHours: 10,
      isActive: true,
    };
    setShifts(prev => [...prev, shift]);
    router.push(`/admin/attendance/shift-v2/${id}?type=flexible`);
  };

  const createRotation = () => {
    const id = Date.now().toString();
    const rotation = {
      id,
      name: "New Rotation",
      type: "rotation",
      cycleDays: 3,
      isActive: true,
    };
    setShifts(prev => [...prev, rotation]);
    router.push(`/admin/attendance/shift-v2/${id}?type=rotation`);
  };

  const toggleStatus = (id) => {
    setShifts(prev =>
      prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
  };

  const deleteShift = (id) => {
    setShifts(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shift Management</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Shifts
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-2" />Add Shift</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Shift</DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="fixed">Fixed</TabsTrigger>
                    <TabsTrigger value="flexible">Flexible</TabsTrigger>
                    <TabsTrigger value="rotation">Rotation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="fixed">
                    <Button onClick={createFixedShift}>Create Fixed Shift</Button>
                  </TabsContent>

                  <TabsContent value="flexible">
                    <Button onClick={createFlexibleShift}>Create Flexible Shift</Button>
                  </TabsContent>

                  <TabsContent value="rotation">
                    <Button onClick={createRotation}>Create Rotation</Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {shifts.map(shift => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.name}</TableCell>
                  <TableCell>
                    {shift.type === "rotation"
                      ? `Cycle: ${shift.cycleDays} days`
                      : `${shift.start} - ${shift.end}`}
                  </TableCell>
                  <TableCell>
                    <Badge>{shift.type.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={shift.isActive}
                      onCheckedChange={() => toggleStatus(shift.id)}
                    />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        router.push(`/admin/attendance/shift-v2/${shift.id}?type=${shift.type}`)
                      }
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => deleteShift(shift.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
