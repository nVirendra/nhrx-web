"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EmployeeShiftAssignment from "./components/EmployeeShiftAssignment";

export default function EmployeeShiftPage() {
  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Employee Shift Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <EmployeeShiftAssignment />
      </CardContent>
    </Card>
  );
}
