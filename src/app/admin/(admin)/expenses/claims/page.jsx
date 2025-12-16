"use client"

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
  Plus,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function ExpenseClaims() {
  const [filter, setFilter] = React.useState("all");

  // Mock data (replace with API)
  const expenses = [
    {
      id: 1,
      employee: "Virendra Nishad",
      type: "Travel",
      date: "10 Aug 2025",
      amount: "₹2,400",
      description: "Taxi + Train",
      status: "PENDING",
    },
    {
      id: 2,
      employee: "Rahul Sharma",
      type: "Food",
      date: "08 Aug 2025",
      amount: "₹650",
      description: "Client lunch",
      status: "APPROVED",
    },
    {
      id: 3,
      employee: "Amit Verma",
      type: "Lodging",
      date: "05 Aug 2025",
      amount: "₹1,800",
      description: "Hotel stay",
      status: "REJECTED",
    },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500/15 text-green-600">Approved</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-500/15 text-red-600">Rejected</Badge>;
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
          Expense Claims
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

          {/* Create Expense */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Claim
              </Button>
            </SheetTrigger>

            {/* ---------------- CREATE EXPENSE CLAIM FORM ---------------- */}
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Create Expense Claim</SheetTitle>
              </SheetHeader>

              <div className="space-y-4 mt-6">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Expense Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="lodging">Lodging</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Input type="date" />

                <Input placeholder="Amount (₹)" />

                <Textarea placeholder="Expense Description" />

                {/* Bill Upload Placeholder */}
                <Input type="file" />

                <Button className="w-full mt-4">
                  Submit Claim
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ---------------- EXPENSE TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Claim List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {expenses.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.employee}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>

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
