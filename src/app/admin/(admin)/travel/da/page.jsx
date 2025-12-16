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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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

import { Plus, IndianRupee, Edit, Trash2 } from "lucide-react";

export default function AllowancePage() {
  const [open, setOpen] = React.useState(false);

  // Mock allowance data (replace with API)
  const allowances = [
    {
      id: 1,
      name: "Daily Allowance (DA)",
      type: "Per Day",
      amount: "₹500",
      appliesTo: "All Employees",
      status: true,
    },
    {
      id: 2,
      name: "Travel Allowance (TA)",
      type: "Per KM",
      amount: "₹12 / KM",
      appliesTo: "Sales Team",
      status: true,
    },
    {
      id: 3,
      name: "Lodging Allowance",
      type: "Per Day",
      amount: "₹2000",
      appliesTo: "Grade A",
      status: false,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          Allowance Management
        </h2>

        {/* Create Allowance */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Allowance
            </Button>
          </SheetTrigger>

          {/* ---------------- ADD / EDIT ALLOWANCE FORM ---------------- */}
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Create Allowance</SheetTitle>
            </SheetHeader>

            <div className="space-y-4 mt-6">
              <Input placeholder="Allowance Name (e.g. Daily Allowance)" />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Allowance Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_day">Per Day</SelectItem>
                  <SelectItem value="per_km">Per KM</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Amount (₹)" />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Applies To" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="grade_a">Grade A</SelectItem>
                  <SelectItem value="sales">Sales Team</SelectItem>
                </SelectContent>
              </Select>

              <Textarea placeholder="Description / Policy notes" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active</span>
                <Switch defaultChecked />
              </div>

              <Button className="w-full mt-4">Save Allowance</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ---------------- ALLOWANCE TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Allowance List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Allowance</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Applies To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allowances.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.appliesTo}</TableCell>
                  <TableCell>
                    {item.status ? (
                      <Badge className="bg-green-500/15 text-green-600">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/15 text-red-600">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
