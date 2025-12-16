import React, { useState, useEffect } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Calendar, Upload } from "lucide-react";

// Dummy Leave Balance
const leaveBalance = {
  "Casual Leave": 6,
  "Sick Leave": 4,
  "Earned Leave": 10,
};

// Dummy Leave Requests
const previousLeaves = [
  {
    id: 1,
    type: "Casual Leave",
    from: "2025-01-14",
    to: "2025-01-15",
    totalDays: 2,
    reason: "Family function",
    status: "Approved",
  },
  {
    id: 2,
    type: "Sick Leave",
    from: "2025-01-20",
    to: "2025-01-20",
    totalDays: 1,
    reason: "Fever",
    status: "Pending",
  },
  {
    id: 3,
    type: "Earned Leave",
    from: "2025-02-02",
    to: "2025-02-03",
    totalDays: 2,
    reason: "Travel",
    status: "Rejected",
  },
];

const statusVariant = {
  Approved: "default",
  Pending: "secondary",
  Rejected: "destructive",
};

const LeaveRequestPage = () => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState(null);

  // Auto calculate total days
  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);

      if (end >= start) {
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(diff);
      } else {
        setTotalDays(0);
      }
    }
  }, [fromDate, toDate]);

  const handleSubmit = () => {
    const payload = {
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
      attachment,
    };
    console.log("Leave Request Submitted:", payload);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <h1 className="text-2xl font-bold">Leave Request</h1>

      {/* Leave Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Apply for Leave</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* Leave Type */}
          <div>
            <Label>Leave Type *</Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(leaveBalance).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key} ({leaveBalance[key]} left)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* From Date */}
          <div>
            <Label>From Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pl-9"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
          </div>

          {/* To Date */}
          <div>
            <Label>To Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pl-9"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          {/* Total Days */}
          <div>
            <Label>Total Days</Label>
            <Input value={totalDays} disabled className="bg-muted" />
          </div>

          {/* Reason */}
          <div className="md:col-span-2">
            <Label>Reason *</Label>
            <Textarea
              rows={4}
              placeholder="Explain the reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Attachment */}
          <div className="md:col-span-2">
            <Label>Upload Document (Optional)</Label>
            <div className="flex items-center gap-3">
              <Input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setAttachment(e.target.files[0])}
              />
              <Upload className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <Button onClick={handleSubmit}>Submit Request</Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Leave Requests</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Total Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {previousLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.from}</TableCell>
                  <TableCell>{leave.to}</TableCell>
                  <TableCell>{leave.totalDays}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[leave.status]}>
                      {leave.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRequestPage;
