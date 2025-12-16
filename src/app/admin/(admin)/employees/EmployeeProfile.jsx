import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  FileText,
  Calendar,
  UserCircle,
  Wallet,
  File,
  Activity,
} from "lucide-react";

// DEMO DATA (Replace with API)
const employee = {
  id: 1,
  name: "Virendra Nishad",
  department: "Engineering",
  designation: "Frontend Developer",
  email: "virendra@example.com",
  phone: "+91 9876543210",
  status: "Active",
  avatar: "",
  joiningDate: "2024-01-01",
  salary: "₹30,000",
};

const EmployeeProfile = () => {
  const { id } = useParams();

  return (
    <div className="p-6 space-y-6">
      {/* ------------------ HEADER ------------------ */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Profile</h1>
        <Button>Edit Profile</Button>
      </div>

      {/* ------------------ PROFILE CARD ------------------ */}
      <Card>
        <CardContent className="flex items-center gap-6 py-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={employee.avatar} />
            <AvatarFallback className="text-2xl">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h2 className="text-xl font-bold">{employee.name}</h2>
            <p className="text-sm text-muted-foreground">
              {employee.designation} — {employee.department}
            </p>

            <Badge variant={employee.status === "Active" ? "default" : "destructive"}>
              {employee.status}
            </Badge>

            <p className="text-sm mt-1">
              <strong>Email:</strong> {employee.email}
            </p>

            <p className="text-sm">
              <strong>Phone:</strong> {employee.phone}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ------------------ TABS ------------------ */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leaves">Leave Summary</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* ---------------- SUMMARY TAB ---------------- */}
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Employee Summary</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personal Details</h3>

                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Phone:</strong> {employee.phone}</p>
                <p><strong>Status:</strong> {employee.status}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Job Details</h3>

                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Designation:</strong> {employee.designation}</p>
                <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
                <p><strong>Salary:</strong> {employee.salary}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- DOCUMENTS TAB ---------------- */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> Documents
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button>Upload Document</Button>

              <div className="border rounded-lg p-4">
                <p className="text-muted-foreground">No documents uploaded yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- ATTENDANCE TAB ---------------- */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Attendance Records
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                Daily attendance and summary will be shown here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- LEAVE SUMMARY TAB ---------------- */}
        <TabsContent value="leaves">
          <Card>
            <CardHeader>
              <CardTitle>Leave Summary</CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h3 className="font-bold">Casual Leave</h3>
                <p className="text-2xl font-bold mt-1">6 / 12</p>
              </Card>

              <Card className="p-4">
                <h3 className="font-bold">Sick Leave</h3>
                <p className="text-2xl font-bold mt-1">2 / 8</p>
              </Card>

              <Card className="p-4">
                <h3 className="font-bold">Annual Leave</h3>
                <p className="text-2xl font-bold mt-1">10 / 20</p>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- PAYROLL TAB ---------------- */}
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" /> Payroll Details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p><strong>CTC:</strong> {employee.salary}</p>

              <Button>View Salary Slips</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- ACTIVITY LOG TAB ---------------- */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" /> Activity Log
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                Actions like login activity, profile updates, approvals, etc., will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeProfile;
