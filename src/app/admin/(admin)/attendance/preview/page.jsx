"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AttendanceCalendar from "./components/AttendanceCalendar";

export default function AttendancePreviewPage() {
  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Attendance Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <AttendanceCalendar />
      </CardContent>
    </Card>
  );
}
