"use client";

import React, { useState, useEffect } from "react";
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

import { useMastersByCategory } from "@/features/masters/master.api";
import { useDepartments } from "@/features/department/department.api";
import { useEmployees } from "@/features/employee/employee.api";
import { useGetRoles } from "@/features/role/role-v2.api";

export default function ApprovalWorkflowPage() {
  /* ---------------- MASTER DATA ---------------- */
  const { data: modules = [] } = useMastersByCategory("MODULE");
  const { data: priorities = [] } = useMastersByCategory("PRIORITY");
  const { data: approvalTypes = [] } = useMastersByCategory("APPROVAL_TYPE");
  const { data: flowModes = [] } = useMastersByCategory("FLOW_MODE");
  const { data: scopes = [] } = useMastersByCategory("APPROVAL_SCOPE");
  const { data: approvalActions = [] } = useMastersByCategory("APPROVAL_ACTION");
  const { data: rejectionActions = [] } = useMastersByCategory("REJECTION_ACTION");
  const { data: approvalAuthorities = [] } = useMastersByCategory("APPROVAL_AUTHORITY");
  const { data: roles = [] } = useGetRoles();

  /* ---------------- DYNAMIC DATA ---------------- */
  const { data: departments = [] } = useDepartments();
  const { data: employeeRes } = useEmployees();
  const allEmployees = employeeRes?.data || [];

  /* ---------------- STATE ---------------- */
  const [approvalType, setApprovalType] = useState("single");
  const [steps, setSteps] = useState([]);
  const [workflowScope, setWorkflowScope] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedRoleForEmployee, setSelectedRoleForEmployee] = useState("");
  const [autoEscalation, setAutoEscalation] = useState(false);
  const [selectedApprovalActions, setSelectedApprovalActions] = useState([]);
  const [selectedRejectionActions, setSelectedRejectionActions] = useState([]);

  // Sync logic for Workflow Scope
  useEffect(() => {
    setSelectedDepartment("");
    setSelectedEmployee("");
    setSelectedRoleForEmployee("");
  }, [workflowScope]);

  /* ---------------- HANDLERS ---------------- */
  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        selectedRole: "", 
        selectedApprover: "", 
        authority: "", 
        escalateAfterHours: "" 
      },
    ]);
  };

  const removeStep = (id) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStep = (id, field, value) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

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

  return (
    <div className="p-8 max-w-7xl mx-auto">
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
          {/* Module & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-sm">Module</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((m) => (
                    <SelectItem key={m.code} value={m.code}>{m.label}</SelectItem>
                  ))}
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
                  {priorities.map((p) => (
                    <SelectItem key={p.code} value={p.code}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <p className="font-medium text-sm">Auto Escalation</p>
                <p className="text-xs text-muted-foreground">Move to next level if delayed</p>
              </div>
              <Switch checked={autoEscalation} onCheckedChange={setAutoEscalation} />
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Description</label>
            <Textarea placeholder="Describe workflow purpose..." className="mt-1" />
          </div>

          <Separator />

          {/* Workflow Target Scope */}
          <div className="space-y-4 border p-5 rounded-xl bg-slate-50">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Workflow Applies To
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-medium text-sm">Select Target</label>
                <Select value={workflowScope} onValueChange={setWorkflowScope}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose target" />
                  </SelectTrigger>
                  <SelectContent>
                    {scopes.map((s) => (
                      <SelectItem key={s.code} value={s.code}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {workflowScope === "DEPARTMENT" && (
                <div>
                  <label className="font-medium text-sm">Department</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={String(dept.id)}>
                          <div className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {dept.name}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {workflowScope === "EMPLOYEE" && (
                <>
                  <div>
                    <label className="font-medium text-sm">Role Filter</label>
                    <Select value={selectedRoleForEmployee} onValueChange={(v) => { setSelectedRoleForEmployee(v); setSelectedEmployee(""); }}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => <SelectItem key={r.id} value={String(r.id)}>{r.roleName}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="font-medium text-sm">Employee</label>
                    <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {allEmployees
                          .filter(emp => !selectedRoleForEmployee || emp.roleId === parseInt(selectedRoleForEmployee))
                          .map((emp) => (
                            <SelectItem key={emp.id} value={String(emp.id)}>{emp.name}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Approval Steps */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" /> Approval Steps
            </h2>
            <Button className="gap-2" onClick={addStep}><Plus className="h-4 w-4" /> Add Step</Button>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => {
                // Filter employees specifically for this step's selected role
                const stepEmployees = allEmployees.filter(emp => emp.roleId === parseInt(step.selectedRole));

                return (
              <div key={step.id} className="p-5 rounded-xl border shadow-sm bg-white animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">{idx + 1}</span>
                    <p className="font-semibold text-lg">Level {idx + 1} Approver</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeStep(step.id)} className="text-destructive hover:bg-red-50">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="font-medium text-sm text-muted-foreground">Approver Role</label>
                    <Select 
                        value={step.selectedRole} 
                        onValueChange={(val) => {
                            updateStep(step.id, "selectedRole", val);
                            updateStep(step.id, "selectedApprover", ""); // Reset approver on role change
                        }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => <SelectItem key={r.id} value={String(r.id)}>{r.roleName}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-medium text-sm text-muted-foreground">Specific Approver</label>
                    <Select 
                        disabled={!step.selectedRole} 
                        value={step.selectedApprover} 
                        onValueChange={(val) => updateStep(step.id, "selectedApprover", val)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={step.selectedRole ? "Choose Employee" : "Select Role First"} />
                      </SelectTrigger>
                      <SelectContent>
                        {stepEmployees.map((emp) => (
                          <SelectItem key={emp.id} value={String(emp.id)}>
                            <div className="flex flex-col">
                                <span className="font-medium">{emp.name}</span>
                                <span className="text-xs opacity-70">{emp.email}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-medium text-sm text-muted-foreground">Authority</label>
                    <Select value={step.authority} onValueChange={(val) => updateStep(step.id, "authority", val)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Authority" />
                      </SelectTrigger>
                      <SelectContent>
                        {approvalAuthorities.map((auth) => <SelectItem key={auth.code} value={auth.code}>{auth.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {autoEscalation && (
                      <div className="md:col-span-3">
                          <label className="font-medium text-sm text-muted-foreground">Escalation Threshold (Hours)</label>
                          <Input 
                            type="number" 
                            className="mt-1 w-full md:w-1/3" 
                            placeholder="e.g. 48"
                            value={step.escalateAfterHours}
                            onChange={(e) => updateStep(step.id, "escalateAfterHours", e.target.value)}
                          />
                      </div>
                  )}
                </div>
              </div>
            )})}
          </div>

          {/* Action Sections */}
          <Separator />
          <div className="grid md:grid-cols-2 gap-12">
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-bold text-xl"><CheckCircle /> Approval Actions</div>
                <div className="grid gap-3">
                    {approvalActions.map(action => (
                        <div 
                            key={action.code}
                            onClick={() => toggleApprovalAction(action.code)}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedApprovalActions.includes(action.code) ? 'bg-green-50 border-green-500' : 'hover:bg-slate-50'}`}
                        >
                            <p className="font-semibold">{action.label}</p>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xl"><XCircle /> Rejection Actions</div>
                <div className="grid gap-3">
                    {rejectionActions.map(action => (
                        <div 
                            key={action.code}
                            onClick={() => toggleRejectionAction(action.code)}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedRejectionActions.includes(action.code) ? 'bg-red-50 border-red-500' : 'hover:bg-slate-50'}`}
                        >
                            <p className="font-semibold">{action.label}</p>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                        </div>
                    ))}
                </div>
            </section>
          </div>

          <div className="flex justify-center pt-10">
            <Button size="lg" className="w-full md:w-64 h-12 text-lg">Create Workflow</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}