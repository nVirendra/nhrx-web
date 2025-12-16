import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const leaveData = {
  "2025-01-14": [{ name: "Virendra", type: "CL" }],
  "2025-01-15": [{ name: "Virendra", type: "CL" }],
  "2025-01-20": [{ name: "Priya", type: "SL" }],
  "2025-01-05": [{ name: "Amit", type: "EL" }],
  "2025-01-06": [{ name: "Amit", type: "EL" }],
  "2025-01-07": [{ name: "Amit", type: "EL" }],
};

const leaveColors = {
  CL: "bg-blue-500",
  SL: "bg-red-500",
  EL: "bg-green-500",
};

const LeaveCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = Jan
  const [currentYear, setCurrentYear] = useState(2025);

  const nextMonth = () => {
    setCurrentMonth((m) => (m === 11 ? 0 : m + 1));
    if (currentMonth === 11) setCurrentYear((y) => y + 1);
  };

  const prevMonth = () => {
    setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
    if (currentMonth === 0) setCurrentYear((y) => y - 1);
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
  });

  // Generate calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Team Leave Calendar</h1>

      {/* Month Selector */}
      <div className="flex items-center justify-between w-full max-w-md mx-auto">
        <Button variant="outline" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-semibold">
          {monthName} {currentYear}
        </h2>

        <Button variant="outline" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center font-medium mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">

            {blanks.map((_, i) => (
              <div key={i} className="h-20 border rounded bg-muted" />
            ))}

            {days.map((day) => {
              const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const leaves = leaveData[dateKey] || [];

              return (
                <div
                  key={day}
                  className="h-20 border rounded p-1 flex flex-col items-center gap-1"
                >
                  <p className="text-sm font-semibold">{day}</p>

                  {/* Leave Markers */}
                  <div className="flex flex-col gap-1 w-full">
                    {leaves.map((l, idx) => (
                      <div
                        key={idx}
                        className={`text-xs text-white px-1 py-0.5 rounded ${leaveColors[l.type]}`}
                      >
                        {l.name} – {l.type}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveCalendarPage;
