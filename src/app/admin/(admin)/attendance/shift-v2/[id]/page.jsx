"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function ShiftSettingsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const shiftType = searchParams.get("type"); // fixed | flexible | rotation

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shift Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Shift ID: {id}</CardTitle>
        </CardHeader>
      </Card>

      {/* ROTATION */}
      {shiftType === "rotation" && (
        <Card>
          <CardContent className="p-6">
            <div className="border rounded-lg p-4 bg-muted">
              Attendance rules are inherited from individual shifts assigned
              in rotation. Editing is disabled here.
            </div>
          </CardContent>
        </Card>
      )}

      {/* FIXED SHIFT */}
      {shiftType === "fixed" && (
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rules (Fixed Shift)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Grace In (Minutes)</Label>
              <Input type="number" defaultValue={10} />
            </div>

            <div className="flex justify-between border p-3 rounded-lg">
              <div>
                <Label>Enable Late Marks</Label>
              </div>
              <Switch />
            </div>

            <div>
              <Label>OT After (Minutes)</Label>
              <Input type="number" defaultValue={30} />
            </div>

            <div className="flex justify-between border p-3 rounded-lg">
              <div>
                <Label>Auto Mark Absent</Label>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      )}

      {/* FLEXIBLE SHIFT */}
      {shiftType === "flexible" && (
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rules (Flexible Shift)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Minimum Working Hours</Label>
              <Input type="number" defaultValue={8} />
            </div>

            <div>
              <Label>Maximum Working Hours</Label>
              <Input type="number" defaultValue={10} />
            </div>

            <div className="flex justify-between border p-3 rounded-lg">
              <div>
                <Label>Allow Overtime</Label>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
