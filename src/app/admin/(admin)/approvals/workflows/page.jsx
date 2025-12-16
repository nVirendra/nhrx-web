"use client"

import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import {
  Settings2,
  Users,
  ArrowDownCircle,
  Plus,
  Trash2,
  GitBranch,
  CheckCircle,
  XCircle,
  UserCheck,
  Building2,
} from "lucide-react";

export default function ApprovalWorkflowPage() {
  const [approvalType, setApprovalType] = useState("single");
  const [steps, setSteps] = useState([]);

  // NEW STATES FOR FLEXIBLE WORKFLOW TARGET
  const [workflowScope, setWorkflowScope] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const departments = ["HR", "Finance", "Engineering", "IT", "Admin", "Sales"];
  const employees = [
    { id: "1", name: "Virendra Nishad" },
    { id: "2", name: "Priya Sharma" },
    { id: "3", name: "Amit Verma" },
  ];

  // ACTION ITEMS
  const approvalActions = [
    { key: "notify_user", label: "Notify User", description: "Send notification to user" },
    { key: "add_verification_badge", label: "Add Verification Badge", description: "Grant verification badge" },
  ];

  const rejectionActions = [
    { key: "notify_user", label: "Notify User", description: "Send notification to user" },
  ];

  const [selectedApprovalActions, setSelectedApprovalActions] = useState([]);
  const [selectedRejectionActions, setSelectedRejectionActions] = useState([]);

  // TOGGLE ACTIONS
  const toggleApprovalAction = (key) => {
    setSelectedApprovalActions((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const toggleRejectionAction = (key) => {
    setSelectedRejectionActions((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const removeApprovalAction = (key) => {
    setSelectedApprovalActions((prev) => prev.filter((x) => x !== key));
  };

  const removeRejectionAction = (key) => {
    setSelectedRejectionActions((prev) => prev.filter((x) => x !== key));
  };

  // ADD NEW APPROVAL STEP
  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { id: Date.now(), approver: "", authority: "" },
    ]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dynamic Approval Flow</h1>
      <p className="text-muted-foreground mb-8">
        Configure modern, multi-level approval workflows for HRMS modules.
      </p>

      <Card className="shadow-lg border bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Settings2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Workflow Settings</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-10">

          {/* --- MODULE SELECTION (KEPT AS IS) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div>
              <label className="font-medium text-sm">Module</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leave">Leave Request</SelectItem>
                  <SelectItem value="attendance">Attendance Regularization</SelectItem>
                  <SelectItem value="travel">Travel Expense</SelectItem>
                  <SelectItem value="reimbursement">Reimbursement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-medium text-sm">Priority</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4 mt-6">
              <div>
                <p className="font-medium text-sm">Auto Escalation</p>
                <p className="text-xs text-muted-foreground">
                  Move to next level if not approved in time
                </p>
              </div>
              <Switch />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-sm">Description</label>
            <Textarea placeholder="Describe workflow purpose..." className="mt-1" />
          </div>

          <Separator />

          {/* ---------------------------------------------------------------- */}
          {/*   🔥 NEW BLOCK — FLEXIBLE TARGET (All / Department / Employee)   */}
          {/* ---------------------------------------------------------------- */}
          <div className="space-y-4 border p-5 rounded-xl bg-slate-50">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Workflow Applies To
            </h3>

            {/* Select Scope */}
            <div>
              <label className="font-medium text-sm">Select Target</label>
              <Select value={workflowScope} onValueChange={setWorkflowScope}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="department">Department Wise</SelectItem>
                  <SelectItem value="employee">Employee Specific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department Selection */}
            {workflowScope === "department" && (
              <div>
                <label className="font-medium text-sm">Select Department</label>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" /> {dept}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Employee Selection */}
            {workflowScope === "employee" && (
              <div>
                <label className="font-medium text-sm">Select Employee</label>
                <Select
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4" />
                          {emp.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Separator />

          {/* ------------------------------------------------------------------------------------------------ */}
          {/*                        APPROVAL TYPE SECTION (UNCHANGED)                                         */}
          {/* ------------------------------------------------------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-sm">Approval Type</label>
              <Select value={approvalType} onValueChange={setApprovalType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Approval</SelectItem>
                  <SelectItem value="multiple">Multiple Approval</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {approvalType === "multiple" && (
              <div>
                <label className="font-medium text-sm">Flow Mode</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sequence">Sequence</SelectItem>
                    <SelectItem value="parallel">Parallel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Separator />

          {/* ------------------------------------------------------------------------------------------------ */}
          {/*                            STEPS SECTION (KEPT EXACTLY)                                         */}
          {/* ------------------------------------------------------------------------------------------------ */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" /> Approval Steps
            </h2>

            <Button className="gap-2" onClick={addStep}>
              <Plus className="h-4 w-4" /> Add Step
            </Button>
          </div>

          {steps.length === 0 ? (
            <div className="border border-dashed p-10 text-center rounded-xl bg-slate-50">
              <Users className="mx-auto h-10 w-10 text-slate-400" />
              <p className="font-medium mt-2 text-slate-600">
                No approval steps added yet
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={step.id} className="p-5 rounded-xl border shadow-sm bg-white">
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="font-semibold">Approval Level {idx + 1}</p>
                    </div>

                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="font-medium text-sm">Select Approver</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose approver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">HR Manager</SelectItem>
                          <SelectItem value="2">Finance Manager</SelectItem>
                          <SelectItem value="3">Admin Head</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="font-medium text-sm">Approval Authority</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select authority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approve">Approve</SelectItem>
                          <SelectItem value="review">Review Only</SelectItem>
                          <SelectItem value="final">Final Approval</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preview */}
          {steps.length > 0 && (
            <div className="p-6 rounded-xl border bg-blue-50">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-900">
                <ArrowDownCircle className="h-5 w-5" /> Approval Flow Preview
              </h3>

              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex justify-center items-center text-xs">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-blue-900">
                      Approver Level {idx + 1} → Permission Assigned
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* ------------------------------------------------------------------------------------------------ */}
          {/*                       APPROVAL ACTIONS (KEPT EXACTLY)                                           */}
          {/* ------------------------------------------------------------------------------------------------ */}

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Approval Actions</h2>
                <p className="text-gray-600">Actions triggered automatically on approval.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvalActions.map((action) => {
                const active = selectedApprovalActions.includes(action.key);
                return (
                  <div
                    key={action.key}
                    onClick={() => toggleApprovalAction(action.key)}
                    className={`cursor-pointer p-5 border rounded-xl shadow-sm hover:shadow-md transition-all ${
                      active ? "bg-green-50 border-green-400" : "bg-white border"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className={`font-semibold ${active ? "text-green-700" : "text-gray-800"}`}>
                          {action.label}
                        </h3>
                        <p className="text-sm text-gray-500">{action.key}</p>
                      </div>
                      {active && <CheckCircle className="h-6 w-6 text-green-600" />}
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full mt-3 inline-block ${
                      active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {action.description}
                    </span>
                  </div>
                );
              })}
            </div>

            {selectedApprovalActions.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Selected Approval Actions</h3>
                {selectedApprovalActions.map((key, index) => {
                  const action = approvalActions.find((a) => a.key === key);
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between bg-green-50 border border-green-300 p-4 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>

                        <div>
                          <h4 className="font-semibold">{action.label}</h4>
                          <p className="text-xs">{action.description}</p>
                        </div>
                      </div>

                      <Button variant="ghost" onClick={() => removeApprovalAction(key)}>
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* ------------------------------------------------------------------------------------------------ */}
          {/*                      REJECTION ACTIONS (KEPT EXACTLY)                                           */}
          {/* ------------------------------------------------------------------------------------------------ */}

          <div className="space-y-6">

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Rejection Actions</h2>
                <p className="text-gray-600">Actions triggered automatically on rejection.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rejectionActions.map((action) => {
                const active = selectedRejectionActions.includes(action.key);
                return (
                  <div
                    key={action.key}
                    onClick={() => toggleRejectionAction(action.key)}
                    className={`cursor-pointer p-5 border rounded-xl shadow-sm hover:shadow-md transition-all ${
                      active ? "bg-red-50 border-red-400" : "bg-white border"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className={`font-semibold ${active ? "text-red-700" : "text-gray-800"}`}>
                          {action.label}
                        </h3>
                        <p className="text-sm text-gray-500">{action.key}</p>
                      </div>
                      {active && <XCircle className="h-6 w-6 text-red-600" />}
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full mt-3 inline-block ${
                      active ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {action.description}
                    </span>
                  </div>
                );
              })}
            </div>

            {selectedRejectionActions.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Selected Rejection Actions</h3>
                {selectedRejectionActions.map((key, index) => {
                  const action = rejectionActions.find((a) => a.key === key);
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between bg-red-50 border border-red-300 p-4 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>

                        <div>
                          <h4 className="font-semibold">{action.label}</h4>
                          <p className="text-xs">{action.description}</p>
                        </div>
                      </div>

                      <Button variant="ghost" onClick={() => removeRejectionAction(key)}>
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          <Separator />

          <div className="text-center pt-6">
            <Button size="lg" className="px-10">
              Save Workflow
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
