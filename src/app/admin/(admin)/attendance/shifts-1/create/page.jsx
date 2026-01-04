"use client";

import ShiftTypeTabs from "../components/ShiftTypeTabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreateShiftPage() {
  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Create Shift</CardTitle>
      </CardHeader>
      <CardContent>
        <ShiftTypeTabs />
      </CardContent>
    </Card>
  );
}
