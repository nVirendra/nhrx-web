"use client";
import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useCreateLeavePolicy } from "@/features/leave/leave-policy.api";
import { useMastersByCategory } from "@/features/masters/master.api";
import { toast } from "sonner";



const LeavePolicyPage = () => {

  /* ---------------- MASTER DATA ---------------- */
  const { data: leaveTypesMaster = [] } = useMastersByCategory("LEAVE_TYPE");
  const { data: allocationCycles = [] } = useMastersByCategory("ALLOCATION_CYCLE");
  const { data: accrualBasisList = [] } = useMastersByCategory("ACCRUAL_BASIS");
  const { data: accrualMethods = [] } = useMastersByCategory("ACCRUAL_METHOD");
  const { data: applicableForList = [] } = useMastersByCategory("APPLICABLE_FOR");

  const { mutate: createLeavePolicy, isLoading } = useCreateLeavePolicy();


  /* ================= POLICY LEVEL ================= */
  const [policyName, setPolicyName] = useState("");

  const [policyRules, setPolicyRules] = useState({
    allowLOP: true,
    applyLimitEnabled: false,
    applyBeforeDays: 0,
    applyAfterDays: 0,
  });

  /* ================= LEAVE TYPE ================= */
  const [selectedLeaveType, setSelectedLeaveType] = useState("CL");

  const [leavePolicies, setLeavePolicies] = useState({
    CL: {
      allocation: 1,
      allocationCycle: "MONTHLY",
      accrualBasis: "TIME",
      accrualMethod: "NONE",
      accrualValue: 0,
      workingDaysThreshold: 0,
      isContinuous: false,
      carryForward: false,
      maxCarryForward: 0,
      encashment: false,
      sandwichRule: false,
      attachmentRequiredDays: 0,
      applicableFor: "ALL",
    },
    SL: {
      allocation: 6,
      allocationCycle: "YEARLY",
      accrualBasis: "TIME",
      accrualMethod: "YEARLY",
      accrualValue: 6,
      workingDaysThreshold: 0,
      isContinuous: false,
      carryForward: false,
      maxCarryForward: 0,
      encashment: false,
      sandwichRule: false,
      attachmentRequiredDays: 2,
      applicableFor: "ALL",
    },
    EL: {
      allocation: 12,
      allocationCycle: "YEARLY",
      accrualBasis: "WORKING_DAYS",
      accrualMethod: "MONTHLY",
      accrualValue: 1,
      workingDaysThreshold: 22,
      isContinuous: false,
      carryForward: true,
      maxCarryForward: 30,
      encashment: true,
      sandwichRule: true,
      attachmentRequiredDays: 0,
      applicableFor: "ALL",
    },
    WFH: {
      allocation: 0,
      allocationCycle: "YEARLY",
      accrualBasis: "TIME",
      accrualMethod: "NONE",
      accrualValue: 0,
      workingDaysThreshold: 0,
      isContinuous: false,
      carryForward: false,
      maxCarryForward: 0,
      encashment: false,
      sandwichRule: false,
      attachmentRequiredDays: 0,
      applicableFor: "ALL",
    },
    OD: {
      allocation: 0,
      allocationCycle: "YEARLY",
      accrualBasis: "TIME",
      accrualMethod: "NONE",
      accrualValue: 0,
      workingDaysThreshold: 0,
      isContinuous: false,
      carryForward: false,
      maxCarryForward: 0,
      encashment: false,
      sandwichRule: false,
      attachmentRequiredDays: 0,
      applicableFor: "ALL",
    },
  });

  const currentPolicy = leavePolicies[selectedLeaveType];

  const handleLeaveChange = (key, value) => {
    setLeavePolicies((prev) => ({
      ...prev,
      [selectedLeaveType]: {
        ...prev[selectedLeaveType],
        [key]: value,
      },
    }));
  };

  const handlePolicyRuleChange = (key, value) => {
    setPolicyRules((prev) => ({ ...prev, [key]: value }));
  };


  const buildPayload = () => {
    const leaveTypes = Object.entries(leavePolicies).map(
      ([leaveType, config]) => ({
        leaveType,

        allocation: Number(config.allocation),
        allocationCycle: config.allocationCycle,

        accrualBasis: config.accrualBasis,
        accrualMethod: config.accrualMethod,
        accrualValue: Number(config.accrualValue),

        workingDaysThreshold: Number(config.workingDaysThreshold || 0),
        isContinuous: Boolean(config.isContinuous),

        carryForward: Boolean(config.carryForward),
        maxCarryForward: Number(config.maxCarryForward || 0),
        encashment: Boolean(config.encashment),

        sandwichRule: Boolean(config.sandwichRule),
        attachmentRequiredDays: Number(config.attachmentRequiredDays || 0),

        applicableFor: config.applicableFor
      })
    );

    return {
      policyName,
      allowLOP: policyRules.allowLOP,
      applyLimitEnabled: policyRules.applyLimitEnabled,
      applyBeforeDays: policyRules.applyLimitEnabled
        ? Number(policyRules.applyBeforeDays)
        : 0,
      applyAfterDays: policyRules.applyLimitEnabled
        ? Number(policyRules.applyAfterDays)
        : 0,
      leaveTypes
    };
  };


  const handleSubmit = () => {
    if (!policyName.trim()) {
      toast.error("Policy name is required");
      return;
    }

    const payload = buildPayload();

    createLeavePolicy(payload, {
      onSuccess: () => {
        toast.success("Leave policy created successfully");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to create leave policy");
      }
    });
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Leave Policy</h1>

      {/* ================= POLICY DETAILS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            placeholder="Leave Policy Name"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
          />

          <div className="flex items-center justify-between border p-3 rounded-lg">
            <Label>Allow Loss of Pay (LOP)</Label>
            <Switch
              checked={policyRules.allowLOP}
              onCheckedChange={(v) =>
                handlePolicyRuleChange("allowLOP", v)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between border p-3 rounded-lg">
            <Label>Enable Leave Apply Day Limit</Label>
            <Switch
              checked={policyRules.applyLimitEnabled}
              onCheckedChange={(v) =>
                handlePolicyRuleChange("applyLimitEnabled", v)
              }
            />
          </div>

          {policyRules.applyLimitEnabled && (
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="number"
                placeholder="Apply Before (Days)"
                value={policyRules.applyBeforeDays}
                onChange={(e) =>
                  handlePolicyRuleChange("applyBeforeDays", e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Apply After (Days)"
                value={policyRules.applyAfterDays}
                onChange={(e) =>
                  handlePolicyRuleChange("applyAfterDays", e.target.value)
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= LEAVE TYPE ACCORDION ================= */}
      <Accordion
        type="single"
        collapsible
        value={selectedLeaveType}
        onValueChange={(v) => v && setSelectedLeaveType(v)}
      >
        {leaveTypesMaster.map((leave) => (
          <AccordionItem key={leave.code} value={leave.code}>
            <AccordionTrigger className="text-lg font-semibold">
              {leave.label}
            </AccordionTrigger>

            <AccordionContent className="space-y-8">
              {/* ⬇⬇⬇ BELOW THIS — YOUR ORIGINAL CARDS (UNCHANGED) ⬇⬇⬇ */}

              {/* Leave Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Leave Allocation</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="number"
                    value={currentPolicy.allocation}
                    onChange={(e) =>
                      handleLeaveChange("allocation", e.target.value)
                    }
                  />
                  <Select
                    value={currentPolicy.allocationCycle}
                    onValueChange={(v) => handleLeaveChange("allocationCycle", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Allocation Cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      {allocationCycles.map((cycle) => (
                        <SelectItem key={cycle.id} value={cycle.code}>
                          {cycle.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </CardContent>
              </Card>

              {/* Accrual Policy (EXTENDED, NOT REPLACED) */}
              <Card>
                <CardHeader>
                  <CardTitle>Accrual Policy</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Accrual Basis */}
                  <div>
                    <Label>Accrual Basis</Label>
                    <Select
                      value={currentPolicy.accrualBasis}
                      onValueChange={(v) => handleLeaveChange("accrualBasis", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Accrual Basis" />
                      </SelectTrigger>
                      <SelectContent>
                        {accrualBasisList.map((basis) => (
                          <SelectItem key={basis.id} value={basis.code}>
                            {basis.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>

                  {/* Existing Time-Based Accrual (UNCHANGED) */}
                  {currentPolicy.accrualBasis === "TIME" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Accrual Type</Label>
                        <Select
                          value={currentPolicy.accrualMethod}
                          onValueChange={(v) => handleLeaveChange("accrualMethod", v)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Accrual Method" />
                          </SelectTrigger>
                          <SelectContent>
                            {accrualMethods.map((method) => (
                              <SelectItem key={method.id} value={method.code}>
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                      </div>

                      <div>
                        <Label>Accrual Value</Label>
                        <Input
                          type="number"
                          disabled={currentPolicy.accrualMethod === "NONE"}
                          value={currentPolicy.accrualValue}
                          onChange={(e) =>
                            handleLeaveChange("accrualValue", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* NEW: Working Days Based Accrual */}
                  {currentPolicy.accrualBasis === "WORKING_DAYS" && (
                    <>
                      <div>
                        <Label>Working Days Required for Accrual</Label>
                        <Input
                          type="number"
                          value={currentPolicy.workingDaysThreshold}
                          onChange={(e) =>
                            handleLeaveChange("workingDaysThreshold", e.target.value)
                          }
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Example: 22 working days = 1 EL
                        </p>
                      </div>

                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <Label>Continuous Working Days</Label>
                        <Switch
                          checked={currentPolicy.isContinuous}
                          onCheckedChange={(v) =>
                            handleLeaveChange("isContinuous", v)
                          }
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Carry Forward & Encashment */}
              <Card>
                <CardHeader>
                  <CardTitle>Carry Forward & Encashment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between border p-3 rounded-lg">
                    <Label>Allow Carry Forward</Label>
                    <Switch
                      checked={currentPolicy.carryForward}
                      onCheckedChange={(v) =>
                        handleLeaveChange("carryForward", v)
                      }
                    />
                  </div>

                  {currentPolicy.carryForward && (
                    <div>
                      <Label>Max Carry Forward</Label>
                      <Input
                        type="number"
                        value={currentPolicy.maxCarryForward}
                        onChange={(e) =>
                          handleLeaveChange("maxCarryForward", e.target.value)
                        }
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between border p-3 rounded-lg">
                    <Label>Allow Encashment</Label>
                    <Switch
                      checked={currentPolicy.encashment}
                      onCheckedChange={(v) =>
                        handleLeaveChange("encashment", v)
                      }
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

                  {/* Gender Applicability */}
                  <div>
                    <Label>Leave Applicable For</Label>
                    <Select
                      value={currentPolicy.applicableFor}
                      onValueChange={(v) => handleLeaveChange("applicableFor", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Applicable For" />
                      </SelectTrigger>
                      <SelectContent>
                        {applicableForList.map((item) => (
                          <SelectItem key={item.id} value={item.code}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-lg">
                    <Label>Apply Sandwich Rule</Label>
                    <Switch
                      checked={currentPolicy.sandwichRule}
                      onCheckedChange={(v) =>
                        handleLeaveChange("sandwichRule", v)
                      }
                    />
                  </div>

                  <div>
                    <Label>Attachment Required After (Days)</Label>
                    <Input
                      type="number"
                      value={currentPolicy.attachmentRequiredDays}
                      onChange={(e) =>
                        handleLeaveChange("attachmentRequiredDays", e.target.value)
                      }
                    />
                  </div>


                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Leave Policy"}
        </Button>

      </div>
    </div>
  );
};

export default LeavePolicyPage;
