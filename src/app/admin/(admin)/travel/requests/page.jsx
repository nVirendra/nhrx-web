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
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Plane,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function TravelRequests() {
  const [filter, setFilter] = React.useState("all");

  // Mock Data (Replace with API)
  const travelRequests = [
    {
      id: 1,
      employee: "Virendra Nishad",
      from: "Mumbai",
      to: "Delhi",
      date: "12 Aug - 15 Aug",
      purpose: "Client Meeting",
      amount: "₹8,500",
      status: "PENDING",
    },
    {
      id: 2,
      employee: "Rahul Sharma",
      from: "Pune",
      to: "Bangalore",
      date: "02 Aug - 04 Aug",
      purpose: "Training",
      amount: "₹6,200",
      status: "APPROVED",
    },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500/15 text-green-600">Approved</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-500/15 text-red-600">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500/15 text-yellow-600">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">

      {/* ---------------- HEADER + FILTER ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          Travel Requests
        </h2>

        <div className="flex items-center gap-3">
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

          {/* Create Request */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Request
              </Button>
            </SheetTrigger>

            {/* ---------------- CREATE TRAVEL REQUEST FORM ---------------- */}
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Create Travel Request</SheetTitle>
              </SheetHeader>

              <div className="space-y-4 mt-6">
                <Input placeholder="From City" />
                <Input placeholder="To City" />

                <div className="grid grid-cols-2 gap-3">
                  <Input type="date" />
                  <Input type="date" />
                </div>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Travel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client Visit</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                  </SelectContent>
                </Select>

                <Textarea placeholder="Purpose of Travel" />

                <Input placeholder="Estimated Amount" />

                <Button className="w-full mt-4">Submit Request</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Request List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {travelRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.employee}</TableCell>
                  <TableCell>{req.from} → {req.to}</TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell>{req.purpose}</TableCell>
                  <TableCell>{req.amount}</TableCell>
                  <TableCell>{statusBadge(req.status)}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button size="icon" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>

                    {req.status === "PENDING" && (
                      <>
                        <Button size="icon" variant="ghost" className="text-green-600">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-600">
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
