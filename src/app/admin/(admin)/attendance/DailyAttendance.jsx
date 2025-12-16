import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Search, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

// Dummy Data (replace with API)
const employees = [
  {
    id: 1,
    name: "Virendra Nishad",
    empCode: "EMP001",
    department: "Engineering",
    inTime: "09:12 AM",
    outTime: "06:40 PM",
    hours: "9h 28m",
    status: "Present",
  },
  {
    id: 2,
    name: "Priya Sharma",
    empCode: "EMP002",
    department: "HR",
    inTime: "-",
    outTime: "-",
    hours: "-",
    status: "Absent",
  },
  {
    id: 3,
    name: "Amit Verma",
    empCode: "EMP003",
    department: "Finance",
    inTime: "10:42 AM",
    outTime: "07:00 PM",
    hours: "8h 18m",
    status: "Late",
  },
];

const DailyAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  // Filtering
  const filtered = employees.filter((emp) => {
    return (
      (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.empCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (department === "all" || emp.department === department) &&
      (status === "all" || emp.status === status)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const statusVariant = {
    Present: "default",
    Absent: "destructive",
    Late: "secondary",
    "Half Day": "outline",
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daily Attendance</h1>
      </div>

      {/* FILTERS */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-4 gap-4">
          {/* Date Picker */}
          <div>
            <label className="text-sm font-medium mb-1 block">Select Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={selectedDate}
                className="pl-9"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <label className="text-sm font-medium mb-1 block">Department</label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
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

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Half Day">Half Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="relative mt-6 md:mt-0">
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

      {/* ATTENDANCE TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Emp Code</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>In Time</TableHead>
                <TableHead>Out Time</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No attendance records found.
                  </TableCell>
                </TableRow>
              )}

              {paginatedData.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.empCode}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.inTime}</TableCell>
                  <TableCell>{emp.outTime}</TableCell>
                  <TableCell>{emp.hours}</TableCell>

                  <TableCell>
                    <Badge variant={statusVariant[emp.status]}>
                      {emp.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>

            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyAttendance;
