"use client";
import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Save } from "lucide-react";

const EmployeeForm = ({ mode = "create", employeeData = {} }) => {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    avatar: "",
    firstName: employeeData.firstName || "",
    lastName: employeeData.lastName || "",
    email: employeeData.email || "",
    phone: employeeData.phone || "",
    dob: employeeData.dob || "",
    gender: employeeData.gender || "",
    address: employeeData.address || "",
    city: employeeData.city || "",
    state: employeeData.state || "",
    zip: employeeData.zip || "",
    
    // Job Info
    employeeId: employeeData.employeeId || "",
    department: employeeData.department || "",
    designation: employeeData.designation || "",
    joiningDate: employeeData.joiningDate || "",
    workLocation: employeeData.workLocation || "",
    employmentType: employeeData.employmentType || "",
    status: employeeData.status || "Active",

    // Salary
    ctc: employeeData.ctc || "",
    basic: employeeData.basic || "",
    hra: employeeData.hra || "",
    allowances: employeeData.allowances || "",

    // Bank
    bankName: employeeData.bankName || "",
    accountNumber: employeeData.accountNumber || "",
    ifsc: employeeData.ifsc || "",

    // Emergency
    emergencyName: employeeData.emergencyName || "",
    emergencyPhone: employeeData.emergencyPhone || "",
    emergencyRelation: employeeData.emergencyRelation || "",

    notes: employeeData.notes || "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      console.log("Updating Employee:", formData);
    } else {
      console.log("Creating Employee:", formData);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Employee" : "Add New Employee"}
        </h1>

        <Button onClick={handleSubmit} className="flex gap-2">
          <Save className="w-4 h-4" />
          {isEdit ? "Update Employee" : "Create Employee"}
        </Button>
      </div>

      {/* ---------------- Avatar Upload ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
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
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatarUpload"
              onChange={(e) =>
                handleChange("avatar", URL.createObjectURL(e.target.files[0]))
              }
            />
            <Label
              htmlFor="avatarUpload"
              className="cursor-pointer flex items-center gap-2 text-primary"
            >
              <Upload className="w-4 h-4" /> Upload Image
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- PERSONAL INFORMATION ---------------- */}
      <Card>
        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>First Name *</Label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>

          <div>
            <Label>Last Name *</Label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>

          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label>Phone *</Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>

          <div>
            <Label>Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <Label>Address</Label>
            <Textarea
              rows={2}
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div>
            <Label>City</Label>
            <Input
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div>
            <Label>State</Label>
            <Input
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>

          <div>
            <Label>Zip Code</Label>
            <Input
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ---------------- JOB INFORMATION ---------------- */}
      <Card>
        <CardHeader><CardTitle>Job Information</CardTitle></CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Employee ID *</Label>
            <Input
              value={formData.employeeId}
              onChange={(e) => handleChange("employeeId", e.target.value)}
            />
          </div>

          <div>
            <Label>Department *</Label>
            <Select
              value={formData.department}
              onValueChange={(v) => handleChange("department", v)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Designation *</Label>
            <Input
              value={formData.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
            />
          </div>

          <div>
            <Label>Joining Date</Label>
            <Input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => handleChange("joiningDate", e.target.value)}
            />
          </div>

          <div>
            <Label>Work Location</Label>
            <Input
              value={formData.workLocation}
              onChange={(e) => handleChange("workLocation", e.target.value)}
            />
          </div>

          <div>
            <Label>Employment Type</Label>
            <Select
              value={formData.employmentType}
              onValueChange={(v) => handleChange("employmentType", v)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Intern">Intern</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label>Status</Label>
            <Switch
              checked={formData.status === "Active"}
              onCheckedChange={(c) =>
                handleChange("status", c ? "Active" : "Inactive")
              }
            />
            <span>{formData.status}</span>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- SALARY INFORMATION ---------------- */}
      <Card>
        <CardHeader><CardTitle>Salary & CTC</CardTitle></CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>CTC (Annual)</Label>
            <Input
              type="number"
              value={formData.ctc}
              onChange={(e) => handleChange("ctc", e.target.value)}
            />
          </div>

          <div>
            <Label>Basic Salary</Label>
            <Input
              type="number"
              value={formData.basic}
              onChange={(e) => handleChange("basic", e.target.value)}
            />
          </div>

          <div>
            <Label>HRA</Label>
            <Input
              type="number"
              value={formData.hra}
              onChange={(e) => handleChange("hra", e.target.value)}
            />
          </div>

          <div>
            <Label>Allowances</Label>
            <Input
              type="number"
              value={formData.allowances}
              onChange={(e) => handleChange("allowances", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ---------------- BANK DETAILS ---------------- */}
      <Card>
        <CardHeader><CardTitle>Bank Details</CardTitle></CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Bank Name</Label>
            <Input
              value={formData.bankName}
              onChange={(e) => handleChange("bankName", e.target.value)}
            />
          </div>

          <div>
            <Label>Account Number</Label>
            <Input
              value={formData.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
            />
          </div>

          <div>
            <Label>IFSC Code</Label>
            <Input
              value={formData.ifsc}
              onChange={(e) => handleChange("ifsc", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ---------------- EMERGENCY CONTACT ---------------- */}
      <Card>
        <CardHeader><CardTitle>Emergency Contact</CardTitle></CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input
              value={formData.emergencyName}
              onChange={(e) => handleChange("emergencyName", e.target.value)}
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              value={formData.emergencyPhone}
              onChange={(e) => handleChange("emergencyPhone", e.target.value)}
            />
          </div>

          <div>
            <Label>Relation</Label>
            <Input
              value={formData.emergencyRelation}
              onChange={(e) => handleChange("emergencyRelation", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ---------------- ADDITIONAL NOTES ---------------- */}
      <Card>
        <CardHeader><CardTitle>Additional Notes</CardTitle></CardHeader>

        <CardContent>
          <Textarea
            rows={4}
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Submit Button Footer */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg" className="flex gap-2">
          <Save className="w-4 h-4" />
          {isEdit ? "Update Employee" : "Create Employee"}
        </Button>
      </div>
    </div>
  );
};

export default EmployeeForm;
