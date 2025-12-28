"use client";
import React, { useState, useEffect  } from "react";

/* ---------- UI ---------- */
import {
  Card, CardHeader, CardTitle, CardContent, CardDescription,
} from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Save } from "lucide-react";

/* ---------- APIs ---------- */
import { useMastersByCategory } from "@/features/masters/master.api";
import { useCreateEmployee, useUpdateEmployeeSection, useEmployeeDetails } from "@/features/employee/employee.api";
import { useBranches } from "@/features/branch/branch.api";
import { useDepartments } from "@/features/department/department.api";
import { useDesignations } from "@/features/designation/designation.api";
import { useGrades } from "@/features/grade/grade.api";

const EmployeeFormTabs = ({ mode = "create", employeeData = {} }) => {

  const { data: employeeDetails } = useEmployeeDetails(
  mode === "edit" ? employeeData.id : null
);

useEffect(() => {
  if (!employeeDetails) return;

  setEmployeeId(employeeDetails.id);

  setFormData({
    avatar: employeeDetails.avatarUrl || "",

    firstName: employeeDetails.firstName || "",
    lastName: employeeDetails.lastName || "",
    email: employeeDetails.email || "",
    phone: employeeDetails.phone || "",
    dob: employeeDetails.dateOfBirth
      ? employeeDetails.dateOfBirth.split("T")[0]
      : "",

    gender: employeeDetails.genderId || "",
    maritalStatus: employeeDetails.maritalStatusId || "",
    bloodGroup: employeeDetails.bloodGroupId || "",

    address: employeeDetails.address || "",
    city: employeeDetails.city || "",
    state: employeeDetails.state || "",
    zip: employeeDetails.zip || "",

    employeeCode: employeeDetails.employeeCode || "",
    department: employeeDetails.departmentId || "",
    designation: employeeDetails.designationId || "",
    branch: employeeDetails.branchId || "",
    grade: employeeDetails.gradeId || "",
    employmentType: employeeDetails.employmentTypeId || "",
    joiningDate: employeeDetails.joiningDate
      ? employeeDetails.joiningDate.split("T")[0]
      : "",
    reportingManager: employeeDetails.reportingManagerId || "",
    status: employeeDetails.status || "Active",

    ctc: employeeDetails.salary?.ctc || "",
    basic: employeeDetails.salary?.basic || "",
    hra: employeeDetails.salary?.hra || "",
    allowances: employeeDetails.salary?.allowances || "",

    bankName: employeeDetails.bank?.bankName || "",
    accountNumber: employeeDetails.bank?.accountNumber || "",
    ifsc: employeeDetails.bank?.ifsc || "",

    emergencyName: employeeDetails.emergency?.name || "",
    emergencyPhone: employeeDetails.emergency?.phone || "",
    emergencyRelation: employeeDetails.emergency?.relation || "",

    highestEducation: employeeDetails.education?.highestEducation || "",
    university: employeeDetails.education?.university || "",
    passingYear: employeeDetails.education?.passingYear || "",

    shift: employeeDetails.attendance?.shift || "",
    weeklyOff: employeeDetails.attendance?.weeklyOff || "",
    biometricId: employeeDetails.attendance?.biometricId || "",

    workHistory:
      employeeDetails.workHistory?.length > 0
        ? employeeDetails.workHistory.map((w) => ({
            company: w.company,
            role: w.role,
            fromDate: w.fromDate
              ? w.fromDate.split("T")[0]
              : "",
            toDate: w.toDate ? w.toDate.split("T")[0] : "",
          }))
        : [{ company: "", role: "", fromDate: "", toDate: "" }],

    notes: employeeDetails.notes || "",
  });
}, [employeeDetails]);


  /* ---------- Masters ---------- */
  const { data: genders = [] } = useMastersByCategory("GENDER");
  const { data: maritalStatuses = [] } = useMastersByCategory("MARITAL_STATUS");
  const { data: bloodGroups = [] } = useMastersByCategory("BLOOD_GROUP");
  const { data: employmentTypes = [] } = useMastersByCategory("EMPLOYMENT_TYPE");
  

  /* ---------- Org Masters ---------- */
  const { data: branches = [] } = useBranches();
  const { data: departments = [] } = useDepartments();
  const { data: designations = [] } = useDesignations();
  const { data: grades = [] } = useGrades();

  /* ---------- API ---------- */
  const createEmployee = useCreateEmployee();
  const updateSection = useUpdateEmployeeSection();

  const [employeeId, setEmployeeId] = useState(employeeData.id || null);
  const isEdit = mode === "edit";
  const [activeTab, setActiveTab] = useState("profile");

  /* ---------- FORM STATE ---------- */
  const [formData, setFormData] = useState({
    avatar: "",

    /* PERSONAL */
    firstName: employeeData.firstName || "",
    lastName: employeeData.lastName || "",
    email: employeeData.email || "",
    phone: employeeData.phone || "",
    dob: employeeData.dob || "",
    gender: employeeData.gender || "",
    maritalStatus: employeeData.maritalStatus || "",
    bloodGroup: employeeData.bloodGroup || "",
    address: employeeData.address || "",
    city: employeeData.city || "",
    state: employeeData.state || "",
    zip: employeeData.zip || "",

    /* JOB */
    employeeCode: employeeData.employeeCode || "",
    department: employeeData.department || "",
    designation: employeeData.designation || "",
    branch: employeeData.branch || "",
    grade: employeeData.grade || "",
    employmentType: employeeData.employmentType || "",
    joiningDate: employeeData.joiningDate || "",
    workLocation: employeeData.workLocation || "",
    reportingManager: employeeData.reportingManager || "",
    status: employeeData.status || "Active",

    /* SALARY */
    ctc: employeeData.ctc || "",
    basic: employeeData.basic || "",
    hra: employeeData.hra || "",
    allowances: employeeData.allowances || "",

    /* BANK */
    bankName: employeeData.bankName || "",
    accountNumber: employeeData.accountNumber || "",
    ifsc: employeeData.ifsc || "",

    /* EMERGENCY */
    emergencyName: employeeData.emergencyName || "",
    emergencyPhone: employeeData.emergencyPhone || "",
    emergencyRelation: employeeData.emergencyRelation || "",

    /* EDUCATION */
    highestEducation: employeeData.highestEducation || "",
    university: employeeData.university || "",
    passingYear: employeeData.passingYear || "",

    /* ATTENDANCE */
    shift: employeeData.shift || "",
    weeklyOff: employeeData.weeklyOff || "",
    biometricId: employeeData.biometricId || "",

    /* WORK */
    workHistory: employeeData.workHistory || [{ company: "", role: "", fromDate: "", toDate: "" }],

    notes: employeeData.notes || "",
  });

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  /* ======================================================
     SAVE SECTION
  ====================================================== */
  const handleSectionSave = async (sectionName) => {
    try {
      let currentEmployeeId = employeeId;

      /* ---------- CREATE EMPLOYEE ---------- */
      if (!currentEmployeeId) {
        const res = await createEmployee.mutateAsync({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: "Temp@123",
          businessRoleId: null,
        });

        currentEmployeeId = res?.id || res?.data?.id;
        setEmployeeId(currentEmployeeId);
      }

      /* ---------- PAYLOAD ---------- */
      let payload = {};

      switch (sectionName.toLowerCase()) {
        case "profile":
          payload = { avatarUrl: formData.avatar };
          break;

        case "personal":
          payload = {
            dob: formData.dob,
            genderId: Number(formData.gender),
            maritalStatusId: Number(formData.maritalStatus),
            bloodGroupId: Number(formData.bloodGroup),
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          };
          break;

        case "job":
          payload = {
            employeeCode: formData.employeeCode,
            departmentId: Number(formData.department),
            designationId: Number(formData.designation),
            branchId: Number(formData.branch),
            gradeId: Number(formData.grade),
            employmentTypeId: Number(formData.employmentType),
            joiningDate: formData.joiningDate,
            reportingManagerId: formData.reportingManager || null,
            status: formData.status === "Active" ? "Active" : "Inactive",
          };
          break;

        case "salary":
          payload = {
            ctc: Number(formData.ctc),
            basic: Number(formData.basic),
            hra: Number(formData.hra),
            allowances: Number(formData.allowances),
          };
          break;

        case "bank":
          payload = {
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            ifsc: formData.ifsc,
          };
          break;

        case "emergency":
          payload = {
            name: formData.emergencyName,
            phone: formData.emergencyPhone,
            relation: formData.emergencyRelation,
          };
          break;

        case "education":
          payload = {
            highestEducation: formData.highestEducation,
            university: formData.university,
            passingYear: Number(formData.passingYear),
          };
          break;

        case "attendance":
          payload = {
            shift: formData.shift,
            weeklyOff: formData.weeklyOff,
            biometricId: formData.biometricId,
          };
          break;

        case "work":
        case "work history":
          payload = formData.workHistory;
          break;

        case "notes":
          payload = { notes: formData.notes };
          break;

        default:
          return;
      }

      await updateSection.mutateAsync({
        employeeId: currentEmployeeId,
        section: sectionName.toLowerCase(),
        data: payload,
      });

      alert(`${sectionName} saved successfully ✅`);
    } catch (err) {
      console.error(err);
      alert("Failed to save section ❌");
    }
  };
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </h1>
          <p className="text-muted-foreground">
            Manage employee onboarding details
          </p>
        </div>
      </div>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-10">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="job">Job</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="bank">Bank</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="work">Work History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* ================= PROFILE ================= */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Upload employee photo</CardDescription>
            </CardHeader>

            <CardContent className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback>
                  {formData.firstName?.[0]}
                  {formData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <Input type="file" className="hidden" id="avatarUpload"
                  onChange={(e) =>
                    handleChange("avatar", URL.createObjectURL(e.target.files[0]))
                  }
                />
                <Label htmlFor="avatarUpload" className="cursor-pointer flex items-center gap-2 text-primary">
                  <Upload className="w-4 h-4" /> Upload Image
                </Label>
              </div>
            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Profile")} className="gap-2">
                <Save className="w-4 h-4" /> Save Profile
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= PERSONAL ================= */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">

              <div>
                <Label>First Name *</Label>
                <Input value={formData.firstName} onChange={e => handleChange("firstName", e.target.value)} />
              </div>

              <div>
                <Label>Last Name *</Label>
                <Input value={formData.lastName} onChange={e => handleChange("lastName", e.target.value)} />
              </div>

              <div>
                <Label>Email *</Label>
                <Input type="email" value={formData.email} onChange={e => handleChange("email", e.target.value)} />
              </div>

              <div>
                <Label>Phone *</Label>
                <Input value={formData.phone} onChange={e => handleChange("phone", e.target.value)} />
              </div>

              <div>
                <Label>Date of Birth</Label>
                <Input type="date" value={formData.dob} onChange={e => handleChange("dob", e.target.value)} />
              </div>

              <div>
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={v => handleChange("gender", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {genders.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={v => handleChange("maritalStatus", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {maritalStatuses.map((m) => (
                      <SelectItem key={m.code} value={m.code}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

               <div>
                <Label>Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={v => handleChange("bloodGroup", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((bg) => (
                      <SelectItem key={bg.code} value={bg.code}>
                        {bg.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              

              <div className="md:col-span-3">
                <Label>Address</Label>
                <Textarea rows={2} value={formData.address} onChange={e => handleChange("address", e.target.value)} />
              </div>

              <div>
                <Label>City</Label>
                <Input value={formData.city} onChange={e => handleChange("city", e.target.value)} />
              </div>

              <div>
                <Label>State</Label>
                <Input value={formData.state} onChange={e => handleChange("state", e.target.value)} />
              </div>

              <div>
                <Label>Zip Code</Label>
                <Input value={formData.zip} onChange={e => handleChange("zip", e.target.value)} />
              </div>
            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Personal")} className="gap-2">
                <Save className="w-4 h-4" /> Save Personal Info
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= JOB ================= */}
        <TabsContent value="job">
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">

              <div>
                <Label>Employee ID *</Label>
                <Input value={formData.employeeId} onChange={e => handleChange("employeeId", e.target.value)} />
              </div>

              <div>
                <Label>Department *</Label>
                <Select value={formData.department} onValueChange={v => handleChange("department", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Designation *</Label>
                 <Select value={formData.designation} onValueChange={v => handleChange("designation", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {designations.map((des) => (
                      <SelectItem key={des.id} value={des.id}>
                        {des.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Joining Date</Label>
                <Input type="date" value={formData.joiningDate} onChange={e => handleChange("joiningDate", e.target.value)} />
              </div>

              <div>
                <Label>Branch</Label>
                <Select value={formData.branch} onValueChange={v => handleChange("branch", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Grade</Label>
                <Select value={formData.grade} onValueChange={v => handleChange("grade", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {grades.map((grd) => (
                      <SelectItem key={grd.id} value={grd.id}>
                        {grd.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Reporting Manager</Label>
                <Input value={formData.reportingManager} onChange={e => handleChange("reportingManager", e.target.value)} />
              </div>

              <div>
                <Label>Work Location</Label>
                <Input value={formData.workLocation} onChange={e => handleChange("workLocation", e.target.value)} />
              </div>

              <div>
                <Label>Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={v => handleChange("employmentType", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((emp_type) => (
                      <SelectItem key={emp_type.code} value={emp_type.code}>
                        {emp_type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <Label>Status</Label>
                <Switch
                  checked={formData.status === "Active"}
                  onCheckedChange={c =>
                    handleChange("status", c ? "Active" : "Inactive")
                  }
                />
                <span>{formData.status}</span>
              </div>

            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Job")} className="gap-2">
                <Save className="w-4 h-4" /> Save Job Info
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= SALARY ================= */}
        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>Salary & CTC</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">

              <div>
                <Label>CTC (Annual)</Label>
                <Input type="number" value={formData.ctc} onChange={e => handleChange("ctc", e.target.value)} />
              </div>

              <div>
                <Label>Basic Salary</Label>
                <Input type="number" value={formData.basic} onChange={e => handleChange("basic", e.target.value)} />
              </div>

              <div>
                <Label>HRA</Label>
                <Input type="number" value={formData.hra} onChange={e => handleChange("hra", e.target.value)} />
              </div>

              <div>
                <Label>Allowances</Label>
                <Input type="number" value={formData.allowances} onChange={e => handleChange("allowances", e.target.value)} />
              </div>

            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Salary")} className="gap-2">
                <Save className="w-4 h-4" /> Save Salary
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= BANK ================= */}
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">

              <div>
                <Label>Bank Name</Label>
                <Input value={formData.bankName} onChange={e => handleChange("bankName", e.target.value)} />
              </div>

              <div>
                <Label>Account Number</Label>
                <Input value={formData.accountNumber} onChange={e => handleChange("accountNumber", e.target.value)} />
              </div>

              <div>
                <Label>IFSC Code</Label>
                <Input value={formData.ifsc} onChange={e => handleChange("ifsc", e.target.value)} />
              </div>

            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Bank")} className="gap-2">
                <Save className="w-4 h-4" /> Save Bank Details
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= EMERGENCY ================= */}
        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">

              <div>
                <Label>Full Name</Label>
                <Input value={formData.emergencyName} onChange={e => handleChange("emergencyName", e.target.value)} />
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input value={formData.emergencyPhone} onChange={e => handleChange("emergencyPhone", e.target.value)} />
              </div>

              <div>
                <Label>Relation</Label>
                <Input value={formData.emergencyRelation} onChange={e => handleChange("emergencyRelation", e.target.value)} />
              </div>

            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Emergency")} className="gap-2">
                <Save className="w-4 h-4" /> Save Emergency
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= EDUCATION ================= */}
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education Information</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">

              <div>
                <Label>Highest Education</Label>
                <Input value={formData.highestEducation} onChange={e => handleChange("highestEducation", e.target.value)} />
              </div>

              <div>
                <Label>University / Institute</Label>
                <Input value={formData.university} onChange={e => handleChange("university", e.target.value)} />
              </div>

              <div>
                <Label>Passing Year</Label>
                <Input type="number" value={formData.passingYear} onChange={e => handleChange("passingYear", e.target.value)} />
              </div>

            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Education")} className="gap-2">
                <Save className="w-4 h-4" /> Save Education
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= ATTENDANCE ================= */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Settings</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Shift</Label>
                <Input value={formData.shift} onChange={e => handleChange("shift", e.target.value)} />
              </div>

              <div>
                <Label>Weekly Off</Label>
                <Input value={formData.weeklyOff} onChange={e => handleChange("weeklyOff", e.target.value)} />
              </div>

              <div>
                <Label>Biometric ID</Label>
                <Input value={formData.biometricId} onChange={e => handleChange("biometricId", e.target.value)} />
              </div>
            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Attendance")} className="gap-2">
                <Save className="w-4 h-4" /> Save Attendance
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= WORK HISTORY ================= */}
        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle>Work History</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {formData.workHistory.map((item, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 border p-4 rounded-lg relative">

                  <div>
                    <Label>Company</Label>
                    <Input
                      value={item.company}
                      onChange={(e) => {
                        const updated = [...formData.workHistory];
                        updated[index].company = e.target.value;
                        handleChange("workHistory", updated);
                      }}
                    />
                  </div>

                  <div>
                    <Label>Role / Designation</Label>
                    <Input
                      value={item.role}
                      onChange={(e) => {
                        const updated = [...formData.workHistory];
                        updated[index].role = e.target.value;
                        handleChange("workHistory", updated);
                      }}
                    />
                  </div>

                  <div>
                    <Label>From Date</Label>
                    <Input
                      type="date"
                      value={item.fromDate}
                      onChange={(e) => {
                        const updated = [...formData.workHistory];
                        updated[index].fromDate = e.target.value;
                        handleChange("workHistory", updated);
                      }}
                    />
                  </div>

                  <div>
                    <Label>To Date</Label>
                    <Input
                      type="date"
                      value={item.toDate}
                      onChange={(e) => {
                        const updated = [...formData.workHistory];
                        updated[index].toDate = e.target.value;
                        handleChange("workHistory", updated);
                      }}
                    />
                  </div>

                  {formData.workHistory.length > 1 && (
                    <Button
                      variant="destructive"
                      className="absolute -top-3 -right-3"
                      onClick={() => {
                        const updated = formData.workHistory.filter((_, i) => i !== index);
                        handleChange("workHistory", updated);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              <Button
                onClick={() =>
                  handleChange("workHistory", [
                    ...formData.workHistory,
                    { company: "", role: "", fromDate: "", toDate: "" },
                  ])
                }
              >
                + Add Work Experience
              </Button>
            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Work History")} className="gap-2">
                <Save className="w-4 h-4" /> Save Work History
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ================= NOTES ================= */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>

            <CardContent>
              <Textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </CardContent>

            <div className="flex justify-end p-4">
              <Button onClick={() => handleSectionSave("Notes")} className="gap-2">
                <Save className="w-4 h-4" /> Save Notes
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeFormTabs;
