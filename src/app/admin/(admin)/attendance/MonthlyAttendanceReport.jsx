import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search } from "lucide-react";

// Dummy data (Replace with API)
const employees = [
  {
    id: 1,
    name: "Virendra Nishad",
    empCode: "EMP001",
    department: "Engineering",
    attendance: {
      // Day-wise status of the month (1-31)
      1: "P",
      2: "A",
      3: "P",
      4: "L",
      5: "P",
      6: "W",
      7: "W",
      8: "P",
      9: "P",
      10: "HD",
      // ... extend till 31
    },
  },
  {
    id: 2,
    name: "Priya Sharma",
    empCode: "EMP002",
    department: "HR",
    attendance: {
      1: "P",
      2: "P",
      3: "P",
      4: "A",
      5: "P",
      6: "W",
      7: "W",
    },
  },
];

const daysInMonth = 31;

const statusColors = {
  P: "bg-green-500 text-white", // Present
  A: "bg-red-500 text-white", // Absent
  L: "bg-blue-500 text-white", // Leave
  HD: "bg-yellow-500 text-black", // Half-day
  W: "bg-gray-300 text-gray-700", // Weekoff
  "-": "bg-muted text-muted-foreground",
};

const MonthlyAttendanceReport = () => {
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2025");
  const [department, setDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = employees.filter((emp) => {
    return (
      (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.empCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (department === "all" || emp.department === department)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Monthly Attendance Report</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-4 gap-4">
          {/* Month */}
          <div>
            <label className="text-sm mb-1 block font-medium">Select Month</label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year */}
          <div>
            <label className="text-sm mb-1 block font-medium">Select Year</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div>
            <label className="text-sm mb-1 block font-medium">Department</label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name or employee code"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Attendance for {month}, {year}
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Employee</TableHead>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <TableHead key={i + 1} className="text-center w-10">
                    {i + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {emp.empCode}
                      </p>
                    </div>
                  </TableCell>

                  {Array.from({ length: daysInMonth }, (_, d) => {
                    const day = d + 1;
                    const status = emp.attendance[day] || "-";

                    return (
                      <TableCell key={day} className="text-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-md ${statusColors[status]}`}
                        >
                          {status}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Status Legend</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Badge className="bg-green-500">P = Present</Badge>
          <Badge className="bg-red-500">A = Absent</Badge>
          <Badge className="bg-blue-500">L = Leave</Badge>
          <Badge className="bg-yellow-500 text-black">HD = Half Day</Badge>
          <Badge className="bg-gray-300 text-black">W = Weekoff</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyAttendanceReport;
