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
import { useCreateApprovalWorkflow } from "@/features/approval/approval-workflow.api";
import { toast } from "sonner";

export default function ApprovalWorkflowPage({
  mode = "create",              // "create" | "edit"
  workflowData = null,           // from GET /:id
  onSubmit = null,               // edit submit handler
  isSubmitting = false,
}) {

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

  /* ---------------- STATE ---------------- */
  const [approvalType, setApprovalType] = useState("single");
  const [steps, setSteps] = useState([]);

  const [workflowScope, setWorkflowScope] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedRoleForEmployee, setSelectedRoleForEmployee] = useState("");
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);

  const [autoEscalation, setAutoEscalation] = useState(false);

  const [module, setModule] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [flowMode, setFlowMode] = useState("");

  /* ---------------- DYNAMIC DATA ---------------- */
  const { data: departments = [] } = useDepartments();
  const { data: employeeRes } = useEmployees();
  const allEmployees = employeeRes?.data || [];

  useEffect(() => {
    setSelectedDepartment("");
    setSelectedEmployee("");
    setSelectedRoleForEmployee("");
    setOpenDepartment(workflowScope === "DEPARTMENT");
    setOpenEmployee(workflowScope === "EMPLOYEE");
  }, [workflowScope]);


  useEffect(() => {
    if (mode !== "edit" || !workflowData) return;

    setModule(workflowData.moduleCode);
    setPriority(workflowData.priorityCode);
    setApprovalType(workflowData.approvalTypeCode);
    setFlowMode(workflowData.flowModeCode || "");
    setWorkflowScope(workflowData.scopeCode);

    setDescription(workflowData.description || "");
    setAutoEscalation(workflowData.autoEscalation);

    setSelectedDepartment(
      workflowData.departmentId ? String(workflowData.departmentId) : ""
    );

    // setSelectedEmployee(
    //   workflowData.employeeId ? String(workflowData.employeeId) : ""
    // );
    if (workflowData.scopeCode !== "EMPLOYEE") return;
  if (!allEmployees.length) return;

  setSelectedEmployee(String(workflowData.employeeId));

    setSteps(
      workflowData.steps.map((step) => ({
        id: step.id,
        selectedRole: String(step.approverRoleId),
        selectedApprover: String(step.approverEmployeeId),
        authority: step.authorityCode,
        escalateAfterHours: step.escalateAfterHours || "",
      }))
    );

    setSelectedApprovalActions(
      workflowData.actions
        .filter((a) => a.triggerOn === "approval")
        .map((a) => a.actionCode)
    );

    setSelectedRejectionActions(
      workflowData.actions
        .filter((a) => a.triggerOn === "rejection")
        .map((a) => a.actionCode)
    );
  }, [mode, workflowData, allEmployees]);


  const [selectedApprovalActions, setSelectedApprovalActions] = useState([]);
  const [selectedRejectionActions, setSelectedRejectionActions] = useState([]);

  /* ---------------- ACTIONS ---------------- */
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

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { id: Date.now(), selectedRole: "", selectedApprover: "", authority: "", escalateAfterHours: "" },
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


  useEffect(() => {
    if (approvalType !== "MULTIPLE") {
      setFlowMode(""); // reset safely
    }
  }, [approvalType]);


  const { mutate: createWorkflow, isLoading } = useCreateApprovalWorkflow();

  const handleSaveWorkflow = () => {
    // --- basic validation ---
    if (!module || !priority || !approvalType) {
      toast.error("Module, Priority and Approval Type are required");
      return;
    }

    if (approvalType === "MULTIPLE" && !flowMode) {
      toast.error("Flow mode is required for multiple approval");
      return;
    }

    if (workflowScope === "DEPARTMENT" && !selectedDepartment) {
      toast.error("Please select department");
      return;
    }

    if (workflowScope === "EMPLOYEE" && !selectedEmployee) {
      toast.error("Please select employee");
      return;
    }

    if (!steps.length) {
      toast.error("At least one approval step is required");
      return;
    }

    const payload = {
      module,
      priority,
      description,
      approvalType,
      flowMode: approvalType === "MULTIPLE" ? flowMode : null,
      autoEscalation,

      scope: workflowScope,
      departmentId:
        workflowScope === "DEPARTMENT"
          ? Number(selectedDepartment)
          : null,
      employeeId:
        workflowScope === "EMPLOYEE"
          ? Number(selectedEmployee)
          : null,

      steps: steps.map((step, index) => ({
        levelOrder: index + 1,
        approverRoleId: Number(step.selectedRole),
        approverEmployeeId: Number(step.selectedApprover),
        authority: step.authority,
        escalateAfterHours: autoEscalation
          ? Number(step.escalateAfterHours || 0)
          : null,
      })),

      approvalActions: selectedApprovalActions,
      rejectionActions: selectedRejectionActions,
    };

    // console.log("Saving workflow with payload:", payload);
    // return false;

    if (mode === "edit") {
      onSubmit(payload);
      return;
    }
    createWorkflow(payload, {
      onSuccess: () => {
        toast.success("Approval workflow created successfully");
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to create approval workflow");
      },
    });


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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-sm">Module</label>
              <Select value={module} onValueChange={setModule}>
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
              <Select value={priority} onValueChange={setPriority}>
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
                <p className="text-xs text-muted-foreground">
                  Move to next level if not approved in time
                </p>
              </div>
              <Switch
                checked={autoEscalation}
                onCheckedChange={setAutoEscalation}
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe workflow purpose..."
              className="mt-1"
            />

          </div>

          <Separator />

          <div className="space-y-4 border p-5 rounded-xl bg-slate-50">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Workflow Applies To
            </h3>

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
                <label className="font-medium text-sm">Select Department</label>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                  open={openDepartment}
                  onOpenChange={setOpenDepartment}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={String(dept.id)}>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {dept.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {workflowScope === "EMPLOYEE" && (
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {allEmployees.map((emp) => (
                    <SelectItem key={emp.id} value={String(emp.id)}>
                      <UserCheck className="h-4 w-4 inline mr-2" />
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  {approvalTypes.map((a) => (
                    <SelectItem key={a.code} value={a.code}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            </div>

            {approvalType === "MULTIPLE" && (
              <div>
                <label className="font-medium text-sm">Flow Mode</label>
                <Select value={flowMode} onValueChange={setFlowMode}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {flowModes.map((f) => (
                      <SelectItem key={f.code} value={f.code}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>

                </Select>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" /> Approval Steps
            </h2>
            <Button className="gap-2" onClick={addStep}>
              <Plus className="h-4 w-4" /> Add Step
            </Button>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.id} className="p-5 rounded-xl border shadow-sm bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <p className="font-semibold">Approval Level {idx + 1}</p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeStep(step.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="font-medium text-sm">Select Approver Role</label>
                    <Select
                      value={step.selectedRole}
                      onValueChange={(value) => {
                        updateStep(step.id, "selectedRole", value);
                        updateStep(step.id, "selectedApprover", "");
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose approver role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={String(role.id)}>{role.roleName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-medium text-sm">Select Approver</label>
                    <Select
                      value={step.selectedApprover}
                      onValueChange={(value) => updateStep(step.id, "selectedApprover", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose approver" />
                      </SelectTrigger>
                      <SelectContent>
                        {allEmployees
                          .filter((emp) => emp.roleId === parseInt(step.selectedRole))
                          .map((emp) => (
                            <SelectItem key={emp.id} value={String(emp.id)}>
                              <div className="flex items-center gap-2">
                                <UserCheck className="h-4 w-4" />
                                {emp.name}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-medium text-sm">Approval Authority</label>
                    <Select
                      value={step.authority}
                      onValueChange={(value) => updateStep(step.id, "authority", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select authority" />
                      </SelectTrigger>
                      <SelectContent>
                        {approvalAuthorities.map((auth) => (
                          <SelectItem key={auth.code} value={auth.code}>{auth.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {autoEscalation && (
                    <div>
                      <label className="font-medium text-sm">
                        Escalate After (Hours)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={step.escalateAfterHours}
                        onChange={(e) =>
                          updateStep(step.id, "escalateAfterHours", e.target.value)
                        }
                        placeholder="e.g. 24"
                        className="mt-1"
                      />
                    </div>
                  )}


                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Restored Approval Actions UI */}
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
                const active = selectedApprovalActions.includes(action.code);
                return (
                  <div
                    key={action.code}
                    onClick={() => toggleApprovalAction(action.code)}
                    className={`cursor-pointer p-5 border rounded-xl shadow-sm hover:shadow-md transition-all ${active ? "bg-green-50 border-green-400" : "bg-white border"
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
                    <span className={`text-xs px-3 py-1 rounded-full mt-3 inline-block ${active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
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
                {selectedApprovalActions.map((code, index) => {
                  const action = approvalActions.find((a) => a.code === code);
                  return (
                    <div key={code} className="flex items-center justify-between bg-green-50 border border-green-300 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold">{action?.label}</h4>
                          <p className="text-xs">{action?.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => removeApprovalAction(code)}>
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Restored Rejection Actions UI */}
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
                const active = selectedRejectionActions.includes(action.code);
                return (
                  <div
                    key={action.code}
                    onClick={() => toggleRejectionAction(action.code)}
                    className={`cursor-pointer p-5 border rounded-xl shadow-sm hover:shadow-md transition-all ${active ? "bg-red-50 border-red-400" : "bg-white border"
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
                    <span className={`text-xs px-3 py-1 rounded-full mt-3 inline-block ${active ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
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
                {selectedRejectionActions.map((code, index) => {
                  const action = rejectionActions.find((a) => a.code === code);
                  return (
                    <div key={code} className="flex items-center justify-between bg-red-50 border border-red-300 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold">{action?.label}</h4>
                          <p className="text-xs">{action?.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => removeRejectionAction(code)}>
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="text-center pt-6">
            <Button
              size="lg"
              className="px-10"
              onClick={handleSaveWorkflow}
              disabled={isLoading || isSubmitting}
            >
              {mode === "edit"
                ? isSubmitting ? "Updating..." : "Update Workflow"
                : isLoading ? "Saving..." : "Save Workflow"}
            </Button>


          </div>
        </CardContent>
      </Card>
    </div>
  );
}