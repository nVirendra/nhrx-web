"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import {
    Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
    Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import {
    Tabs, TabsList, TabsTrigger, TabsContent
} from "@/components/ui/tabs";
import { Plus, Trash2, Settings } from "lucide-react";



import FixedShiftForm from "../shifts/components/FixedShiftForm";
import FlexibleShiftForm from "../shifts/components/FlexibleShiftForm";
import RotationShiftForm from "../shifts/components/RotationShiftForm";

export const dynamic = "force-dynamic";


/* ---------------- DUMMY DATA ---------------- */
const defaultShifts = [
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
    const [shifts, setShifts] = useState(defaultShifts);
    const [activeTab, setActiveTab] = useState("fixed");

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
    router.push(`/admin/attendance/shifts/${id}?type=fixed`);
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
    router.push(`/admin/attendance/shifts/${id}?type=flexible`);
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
    router.push(`/admin/attendance/shifts/${id}?type=rotation`);
  };


    const [fixedShiftForm, setFixedShiftForm] = useState({
        name: "",
        start: "",
        end: "",
        breakMinutes: 60
    });

    const [flexibleShiftForm, setFlexibleShiftForm] = useState({
        name: "",
        minHours: 8,
        maxHours: 10,
    });

    
    // Rotation State for Add Dialog
    const [rotationState, setRotationState] = useState({
        rotationName: "",
        rotationCode: "",
        cycleDays: 3,
        dayShiftMap: {},
        isActive: true
    });

    const updateRotationDay = useCallback((day, shiftId) => {
        setRotationState(r => ({
            ...r,
            dayShiftMap: { ...r.dayShiftMap, [day]: shiftId }
        }));
    }, []);

    const handleRotationNameChange = (e) => {
        setRotationState(r => ({ ...r, rotationName: e.target.value }));
    };

    const handleRotationCodeChange = (e) => {
        setRotationState(r => ({ ...r, rotationCode: e.target.value }));
    };

    const handleRotationCycleChange = (e) => {
        const cycleDays = Number(e.target.value);
        setRotationState(r => ({
            ...r,
            cycleDays,
            dayShiftMap: {}
        }));
    };

  

    const deleteShift = (id) => {
        setShifts(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Shift Management</h1>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Shifts
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button><Plus className="h-4 w-4" /> Add Shift</Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                    <DialogTitle>Create New Shift</DialogTitle>
                                </DialogHeader>

                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList>
                                        <TabsTrigger value="fixed">Fixed</TabsTrigger>
                                        <TabsTrigger value="flexible">Flexible</TabsTrigger>
                                        <TabsTrigger value="rotation">Rotation</TabsTrigger>
                                    </TabsList>

                                    {/* FIXED SHIFT */}
                                    <TabsContent value="fixed">
                                        <FixedShiftForm
                                            value={fixedShiftForm}
                                            onChange={setFixedShiftForm}
                                            onSubmit={createFixedShift}
                                        />
                                    </TabsContent>


                                    {/* Flexible Shift Form */}
                                    <TabsContent value="flexible">
                                        <FlexibleShiftForm
                                            value={flexibleShiftForm}
                                            onChange={setFlexibleShiftForm}
                                            onSubmit={createFlexibleShift}
                                        />
                                    </TabsContent>

                                    {/* Rotation Shift Form */}
                                    {/* ROTATION */}
                                    <TabsContent value="rotation">
                                        <RotationShiftForm
                                            value={rotationState}
                                            shifts={shifts}
                                            onNameChange={handleRotationNameChange}
                                            onCodeChange={handleRotationCodeChange}
                                            onCycleChange={handleRotationCycleChange}
                                            onDayAssign={updateRotationDay}
                                            onSubmit={createRotation}
                                        />
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
                                        router.push(`/admin/attendance/shifts/${shift.id}?type=${shift.type}`)
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
