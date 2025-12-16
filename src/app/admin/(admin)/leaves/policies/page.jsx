"use client";
import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const LeavePolicyPage = () => {
  const [leavePolicies, setLeavePolicies] = useState({
    casualLeave: 6,
    sickLeave: 6,
    earnedLeave: 12,

    accrualMethod: "monthly",
    accrualValue: 1,

    carryForward: true,
    maxCarryForward: 12,

    encashment: false,
    sandwichRule: false,
    attachmentRequiredDays: 2,

    allowLOP: true,
  });

  const handleChange = (key, value) => {
    setLeavePolicies((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold">Leave Policy</h1>

      <Card>
        <CardHeader>
          <CardTitle>Leave Allocation</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-6">

          {/* Casual Leave */}
          <div>
            <Label>Casual Leave (CL)</Label>
            <Input
              type="number"
              value={leavePolicies.casualLeave}
              onChange={(e) => handleChange("casualLeave", e.target.value)}
            />
          </div>

          {/* Sick Leave */}
          <div>
            <Label>Sick Leave (SL)</Label>
            <Input
              type="number"
              value={leavePolicies.sickLeave}
              onChange={(e) => handleChange("sickLeave", e.target.value)}
            />
          </div>

          {/* Earned Leave */}
          <div>
            <Label>Earned Leave (EL)</Label>
            <Input
              type="number"
              value={leavePolicies.earnedLeave}
              onChange={(e) => handleChange("earnedLeave", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Accrual Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Accrual Policy</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Accrual Type</Label>
              <Select
                value={leavePolicies.accrualMethod}
                onValueChange={(value) => handleChange("accrualMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Accrual</SelectItem>
                  <SelectItem value="yearly">Yearly Accrual</SelectItem>
                  <SelectItem value="none">No Accrual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Accrual Value</Label>
              <Input
                type="number"
                disabled={leavePolicies.accrualMethod === "none"}
                value={leavePolicies.accrualValue}
                onChange={(e) => handleChange("accrualValue", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: 1 leave per month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carry Forward */}
      <Card>
        <CardHeader>
          <CardTitle>Carry Forward & Encashment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Carry Forward Rules */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Allow Leave Carry-Forward</Label>
              <p className="text-sm text-muted-foreground">
                Employees can carry forward unused leave to next year.
              </p>
            </div>
            <Switch
              checked={leavePolicies.carryForward}
              onCheckedChange={(value) => handleChange("carryForward", value)}
            />
          </div>

          {leavePolicies.carryForward && (
            <div>
              <Label>Max Carry Forward Days</Label>
              <Input
                type="number"
                value={leavePolicies.maxCarryForward}
                onChange={(e) => handleChange("maxCarryForward", e.target.value)}
              />
            </div>
          )}

          <Separator />

          {/* Encashment */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Allow Leave Encashment</Label>
              <p className="text-sm text-muted-foreground">
                Employee can convert unused leave into salary.
              </p>
            </div>
            <Switch
              checked={leavePolicies.encashment}
              onCheckedChange={(value) => handleChange("encashment", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Leave Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Rules & Restrictions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Sandwich Leave Rule */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Apply Sandwich Rule</Label>
              <p className="text-sm text-muted-foreground">
                Leaves clubbed between weekends/holidays count as leave.
              </p>
            </div>

            <Switch
              checked={leavePolicies.sandwichRule}
              onCheckedChange={(value) => handleChange("sandwichRule", value)}
            />
          </div>

          {/* Attachment Rule */}
          <div>
            <Label>Attachment Required After (Days)</Label>
            <Input
              type="number"
              value={leavePolicies.attachmentRequiredDays}
              onChange={(e) =>
                handleChange("attachmentRequiredDays", e.target.value)
              }
            />
            <p className="text-xs text-muted-foreground mt-1">
              Example: Medical certificate required after 2 days of leave.
            </p>
          </div>

          {/* LOP Rule */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Allow Loss of Pay (LOP)</Label>
              <p className="text-sm text-muted-foreground">
                If no leave balance, mark excess days as unpaid leave.
              </p>
            </div>

            <Switch
              checked={leavePolicies.allowLOP}
              onCheckedChange={(value) => handleChange("allowLOP", value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Save Leave Policy</Button>
      </div>
    </div>
  );
};

export default LeavePolicyPage;
