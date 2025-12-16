    import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { CheckCircle, XCircle, User } from "lucide-react";

const dummyRequests = [
  {
    id: 1,
    employee: "Virendra Nishad",
    type: "Casual Leave",
    from: "2025-01-14",
    to: "2025-01-15",
    days: 2,
    reason: "Family function",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Priya Sharma",
    type: "Sick Leave",
    from: "2025-01-20",
    to: "2025-01-20",
    days: 1,
    reason: "Fever",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Amit Verma",
    type: "Earned Leave",
    from: "2025-01-05",
    to: "2025-01-07",
    days: 3,
    reason: "Travel",
    status: "Approved",
  }
];

const statusVariant = {
  Approved: "default",
  Pending: "secondary",
  Rejected: "destructive",
};

const LeaveApprovalPage = () => {
  const [requests, setRequests] = useState(dummyRequests);
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status, remark = "") => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, remark } : item
      )
    );
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Leave Approvals</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {req.employee}
                  </TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.from}</TableCell>
                  <TableCell>{req.to}</TableCell>
                  <TableCell>{req.days}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[req.status]}>
                      {req.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right flex gap-2 justify-end">
                    {req.status === "Pending" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Review Leave Request</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                              <p><b>Employee:</b> {req.employee}</p>
                              <p><b>Leave:</b> {req.type}</p>
                              <p><b>Duration:</b> {req.from} → {req.to} ({req.days} Days)</p>

                              <div>
                                <Label>Reason</Label>
                                <p className="text-muted-foreground">{req.reason}</p>
                              </div>

                              <div>
                                <Label>Manager Remark (Optional)</Label>
                                <Textarea
                                  placeholder="Add a remark..."
                                  onChange={(e) =>
                                    setSelected({ ...req, remark: e.target.value })
                                  }
                                />
                              </div>

                              <div className="flex justify-end gap-3">
                                <Button
                                  variant="destructive"
                                  onClick={() => updateStatus(req.id, "Rejected", selected?.remark)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" /> Reject
                                </Button>

                                <Button
                                  onClick={() => updateStatus(req.id, "Approved", selected?.remark)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
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

export default LeaveApprovalPage;
