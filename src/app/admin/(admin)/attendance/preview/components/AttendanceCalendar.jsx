"use client";

import CalendarDayCell from "./CalendarDayCell";
import AttendanceLegend from "./AttendanceLegend";

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

export default function AttendanceCalendar() {
  return (
    <div className="space-y-4">
      <AttendanceLegend />

      <div className="grid grid-cols-7 gap-3">
        {DAYS.map(day => (
          <CalendarDayCell key={day} day={day} />
        ))}
      </div>
    </div>
  );
}
