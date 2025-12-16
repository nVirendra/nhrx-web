import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Upload, Calendar, Clock } from "lucide-react";

// Dummy previous regularizations (Replace API)
const previousRequests = [
  {
    id: 1,
    date: "2025-01-12",
    oldIn: "-",
    oldOut: "-",
    newIn: "09:30 AM",
    newOut: "06:20 PM",
    reason: "Forgot to check-in",
    status: "Approved",
  },
  {
    id: 2,
    date: "2025-01-15",
    oldIn: "10:20 AM",
    oldOut: "06:00 PM",
    newIn: "09:10 AM",
    newOut: "06:15 PM",
    reason: "System error",
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-01-17",
    oldIn: "-",
    oldOut: "-",
    newIn: "09:00 AM",
    newOut: "06:00 PM",
    reason: "Missed punch",
    status: "Rejected",
  },
];

const statusVariant = {
  Approved: "default",
  Pending: "secondary",
  Rejected: "destructive",
};

const Regularization = () => {
  const [date, setDate] = useState("");
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState(null);

  const handleSubmit = () => {
    const payload = {
      date,
      inTime,
      outTime,
      reason,
      description,
      proof,
    };
    console.log("Regularization Request Submitted:", payload);
  };

  return (
    <div className="p-6 space-y-8">
      {/* PAGE HEADER */}
      <h1 className="text-2xl font-bold">Attendance Regularization</h1>

      {/* REQUEST FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Regularization Request</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* DATE */}
          <div>
            <label className="text-sm font-medium mb-1 block">Select Date *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pl-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm font-medium mb-1 block">Reason *</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Forgot to punch">Forgot to punch</SelectItem>
                <SelectItem value="System error">System error</SelectItem>
                <SelectItem value="Missed OUT punch">Missed OUT punch</SelectItem>
                <SelectItem value="Missed IN punch">Missed IN punch</SelectItem>
                <SelectItem value="Work outside office">Work outside office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* In Time */}
          <div>
            <label className="text-sm font-medium mb-1 block">Correct IN Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="time"
                className="pl-10"
                value={inTime}
                onChange={(e) => setInTime(e.target.value)}
              />
            </div>
          </div>

          {/* Out Time */}
          <div>
            <label className="text-sm font-medium mb-1 block">Correct OUT Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="time"
                className="pl-10"
                value={outTime}
                onChange={(e) => setOutTime(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 block">Description *</label>
            <Textarea
              placeholder="Explain the reason for regularization…"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Upload Proof */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 block">Upload Proof (Optional)</label>

            <div className="flex items-center gap-3">
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setProof(e.target.files[0])}
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

      {/* PREVIOUS REQUESTS */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Regularization Requests</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Old IN</TableHead>
                <TableHead>Old OUT</TableHead>
                <TableHead>New IN</TableHead>
                <TableHead>New OUT</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {previousRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.date}</TableCell>
                  <TableCell>{req.oldIn}</TableCell>
                  <TableCell>{req.oldOut}</TableCell>
                  <TableCell>{req.newIn}</TableCell>
                  <TableCell>{req.newOut}</TableCell>
                  <TableCell>{req.reason}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[req.status]}>
                      {req.status}
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

export default Regularization;
