"use client";
import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Plus } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Dummy Holiday List
const initialHolidays = [
  { id: 1, name: "New Year", date: "2025-01-01", type: "Public" },
  { id: 2, name: "Republic Day", date: "2025-01-26", type: "Public" },
  { id: 3, name: "Mahashivratri", date: "2025-03-01", type: "Optional" },
  { id: 4, name: "Holi Festival", date: "2025-03-17", type: "Public" },
  { id: 5, name: "Good Friday", date: "2025-04-18", type: "Company" },
];

const typeColors = {
  Public: "bg-green-600",
  Optional: "bg-yellow-500",
  Company: "bg-blue-600",
};

const HolidayCalendarPage = () => {
  const [holidays, setHolidays] = useState(initialHolidays);

  const [filterMonth, setFilterMonth] = useState("all");

  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    type: "Public",
  });

  const addHoliday = () => {
    setHolidays([
      ...holidays,
      { id: Date.now(), ...newHoliday },
    ]);

    setNewHoliday({ name: "", date: "", type: "Public" });
  };

  const filteredHolidays =
    filterMonth === "all"
      ? holidays
      : holidays.filter(
          (h) => h.date.split("-")[1] === filterMonth
        );

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Holiday Calendar</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Holiday
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Holiday</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Holiday Name */}
              <div>
                <Label>Holiday Name *</Label>
                <Input
                  placeholder="Example: Holi Festival"
                  value={newHoliday.name}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, name: e.target.value })
                  }
                />
              </div>

              {/* Date */}
              <div>
                <Label>Select Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-9"
                    value={newHoliday.date}
                    onChange={(e) =>
                      setNewHoliday({ ...newHoliday, date: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Holiday Type */}
              <div>
                <Label>Holiday Type *</Label>
                <Select
                  value={newHoliday.type}
                  onValueChange={(val) =>
                    setNewHoliday({ ...newHoliday, type: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Public">Public Holiday</SelectItem>
                    <SelectItem value="Optional">Optional Holiday</SelectItem>
                    <SelectItem value="Company">Company Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={addHoliday}>
                Add Holiday
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Month Filter */}
      <div className="flex gap-4 max-w-md">
        <Select value={filterMonth} onValueChange={setFilterMonth}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by month" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            <SelectItem value="01">January</SelectItem>
            <SelectItem value="02">February</SelectItem>
            <SelectItem value="03">March</SelectItem>
            <SelectItem value="04">April</SelectItem>
            <SelectItem value="05">May</SelectItem>
            <SelectItem value="06">June</SelectItem>
            <SelectItem value="07">July</SelectItem>
            <SelectItem value="08">August</SelectItem>
            <SelectItem value="09">September</SelectItem>
            <SelectItem value="10">October</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">December</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Holiday Table */}
      <Card>
        <CardHeader>
          <CardTitle>Holiday List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Holiday</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredHolidays.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No holidays found for this month.
                  </TableCell>
                </TableRow>
              )}

              {filteredHolidays.map((h) => {
                const dayName = new Date(h.date).toLocaleDateString("en-US", {
                  weekday: "long",
                });

                return (
                  <TableRow key={h.id}>
                    <TableCell>{h.name}</TableCell>

                    <TableCell>{h.date}</TableCell>

                    <TableCell>{dayName}</TableCell>

                    <TableCell>
                      <Badge className={`${typeColors[h.type]} text-white`}>
                        {h.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HolidayCalendarPage;
