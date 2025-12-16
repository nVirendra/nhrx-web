"use client";
import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Receipt,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function ExpenseApproval() {
  const [filter, setFilter] = React.useState("pending");

  // Mock data (replace with API)
  const approvals = [
    {
      id: 1,
      employee: "Virendra Nishad",
      type: "Travel",
      date: "10 Aug 2025",
      amount: "₹2,400",
      description: "Taxi + Train",
      submittedOn: "11 Aug 2025",
      status: "PENDING",
    },
    {
      id: 2,
      employee: "Rahul Sharma",
      type: "Food",
      date: "08 Aug 2025",
      amount: "₹650",
      description: "Client lunch",
      submittedOn: "09 Aug 2025",
      status: "APPROVED",
    },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-green-500/15 text-green-600">
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-red-500/15 text-red-600">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500/15 text-yellow-600">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">

      {/* ---------------- HEADER + FILTER ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          Expense Approvals
        </h2>

        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => v && setFilter(v)}
          className="bg-muted/40 p-1 rounded-lg"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
          <ToggleGroupItem value="approved">Approved</ToggleGroupItem>
          <ToggleGroupItem value="rejected">Rejected</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* ---------------- APPROVAL TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Approval Queue</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Expense Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {approvals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.employee}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.submittedOn}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    {/* View Details */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>

                      {/* ---------------- VIEW EXPENSE DETAILS ---------------- */}
                      <SheetContent className="w-full sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>Expense Details</SheetTitle>
                        </SheetHeader>

                        <div className="space-y-4 mt-6 text-sm">
                          <div>
                            <strong>Employee:</strong> {item.employee}
                          </div>
                          <div>
                            <strong>Type:</strong> {item.type}
                          </div>
                          <div>
                            <strong>Date:</strong> {item.date}
                          </div>
                          <div>
                            <strong>Amount:</strong> {item.amount}
                          </div>
                          <div>
                            <strong>Description:</strong>
                            <p className="mt-1 text-muted-foreground">
                              {item.description}
                            </p>
                          </div>

                          {/* Reject reason (optional) */}
                          {item.status === "PENDING" && (
                            <>
                              <Textarea placeholder="Rejection reason (if any)" />

                              <div className="flex gap-2 pt-2">
                                <Button className="flex-1 gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="flex-1 gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Reject
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Quick Actions (only for pending) */}
                    {item.status === "PENDING" && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-green-600"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
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
}
