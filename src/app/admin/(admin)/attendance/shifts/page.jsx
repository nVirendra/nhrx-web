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

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";


import FixedShiftForm from "../shifts/components/FixedShiftForm";
import FlexibleShiftForm from "../shifts/components/FlexibleShiftForm";
import RotationShiftForm from "../shifts/components/RotationShiftForm";

export const dynamic = "force-dynamic";


/* ---------------- DUMMY DATA ---------------- */
const defaultShifts = [
    { id: "1", name: "General Shift", start: "09:00", end: "18:00", type: "fixed", isActive: true },
    { id: "2", name: "Morning Shift", start: "07:00", end: "15:00", type: "fixed", isActive: true },
];



export default function ShiftListPage() {
    const router = useRouter();

    const [shifts, setShifts] = useState(defaultShifts);
    const [activeTab, setActiveTab] = useState("fixed");

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

    const saveFlexibleShift = () => {
  if (!flexibleShiftForm.name) return;

  const newShiftId = Date.now().toString();

  const newShift = {
    id: newShiftId,
    ...flexibleShiftForm,
    type: "flexible",
    isActive: true,
  };

  setShifts((prev) => [...prev, newShift]);

  // ✅ NAVIGATE TO SETTINGS PAGE
  router.push(`/admin/attendance/shifts/${newShiftId}`);
};



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

    const saveRotationShift = () => {
  if (!rotationState.rotationName || !rotationState.rotationCode) return;

  const newShiftId = Date.now().toString();

  const newShift = {
    id: newShiftId,
    ...rotationState,
    type: "rotational",
    isActive: true,
  };

  setShifts((prev) => [...prev, newShift]);

  setRotationState({
    rotationName: "",
    rotationCode: "",
    cycleDays: 3,
    dayShiftMap: {},
    isActive: true,
  });

  // ✅ NAVIGATE TO SETTINGS PAGE
  router.push(`/admin/attendance/shifts/${newShiftId}`);
};



    /* ---------------- SAVE SHIFT ---------------- */
    const saveFixedShift = () => {
        if (!fixedShiftForm.name || !fixedShiftForm.start || !fixedShiftForm.end) return;

        const newShift = {
            id: Date.now().toString(),
            ...fixedShiftForm,
            type: "fixed",
            isActive: true
        };

        setShifts(prev => [...prev, newShift]);

        // Redirect to settings page
        router.push(`/admin/attendance/shifts/${newShift.id}`);
    };

    const toggleShiftActive = (id) => {
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
                                            onSubmit={saveFixedShift}
                                        />
                                    </TabsContent>


                                    {/* Flexible Shift Form */}
                                    <TabsContent value="flexible">
                                        <FlexibleShiftForm
                                            value={flexibleShiftForm}
                                            onChange={setFlexibleShiftForm}
                                            onSubmit={saveFlexibleShift}
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
                                            onSubmit={saveRotationShift}
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
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {shifts.map(shift => (
                                <TableRow key={shift.id}>
                                    <TableCell>{shift.name}</TableCell>
                                    <TableCell>{shift.start} - {shift.end}</TableCell>
                                    <TableCell>
                                        <Badge>{shift.type.toUpperCase()}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={shift.isActive}
                                            onCheckedChange={() => toggleShiftActive(shift.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => router.push(`/admin/attendance/shifts/${shift.id}`)}
                                        >
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
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
