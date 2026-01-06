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
          setShifts([...shifts, {
            id: Date.now(),
            ...rotationState,
            type: "rotational",
            isActive: true
          }]);
          setRotationState({ rotationName: "", rotationCode: "", cycleDays: 3, dayShiftMap: {}, isActive: true });
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
                                    <TabsContent value="fixed" className="space-y-4 mt-4">
                                        <div>
                                            <Label>Shift Name</Label>
                                            <Input
                                                value={fixedShiftForm.name}
                                                onChange={e => setFixedShiftForm({ ...fixedShiftForm, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                type="time"
                                                onChange={e => setFixedShiftForm({ ...fixedShiftForm, start: e.target.value })}
                                            />
                                            <Input
                                                type="time"
                                                onChange={e => setFixedShiftForm({ ...fixedShiftForm, end: e.target.value })}
                                            />
                                        </div>

                                        <Button className="w-full" onClick={saveFixedShift}>
                                            Save & Configure Attendance Rules
                                        </Button>
                                    </TabsContent>

                                    {/* Flexible Shift Form */}
                                    <TabsContent value="flexible" className="space-y-4 mt-4">
                                        <div>
                                            <Label>Shift Name</Label>
                                            <Input placeholder="Flexible Shift" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Min Work Hours</Label>
                                                <Input type="number" placeholder="8" />
                                            </div>
                                            <div>
                                                <Label>Max Work Hours</Label>
                                                <Input type="number" placeholder="10" />
                                            </div>
                                        </div>
                                        <Button className="w-full">Save Flexible Shift</Button>
                                    </TabsContent>

                                    {/* Rotation Shift Form */}
                                    <TabsContent value="rotation" className="space-y-6 mt-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Rotation Name</Label>
                                                <Input
                                                    value={rotationState.rotationName}
                                                    onChange={handleRotationNameChange}
                                                    placeholder="3 Day Shift Rotation"
                                                />
                                            </div>
                                            <div>
                                                <Label>Rotation Code</Label>
                                                <Input
                                                    value={rotationState.rotationCode}
                                                    onChange={handleRotationCodeChange}
                                                    placeholder="ROT_3DAY"
                                                />
                                            </div>
                                            <div>
                                                <Label>Cycle Days</Label>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    value={rotationState.cycleDays}
                                                    onChange={handleRotationCycleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-semibold">Day-wise Shift Assignment</h4>
                                            {Array.from({ length: rotationState.cycleDays }).map((_, i) => {
                                                const day = i + 1;
                                                return (
                                                    <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                                                        <div className="w-20 font-medium">Day {day}</div>
                                                        <Select
                                                            value={rotationState.dayShiftMap[day] || ""}
                                                            onValueChange={(v) => updateRotationDay(day, v)}
                                                        >
                                                            <SelectTrigger className="w-64">
                                                                <SelectValue placeholder="Assign shift" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {shifts.map(s => (
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

                                        <Button className="w-full" onClick={saveRotationShift}>
                                            Save Rotation Shift
                                        </Button>
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
