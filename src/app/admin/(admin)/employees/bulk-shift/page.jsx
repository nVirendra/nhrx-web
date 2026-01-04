"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BulkShiftAssignment from "./components/BulkShiftAssignment";

export default function BulkShiftPage() {
  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Bulk Shift Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <BulkShiftAssignment />
      </CardContent>
    </Card>
  );
}
