"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ShiftListPage() {
  return (
    <Card className="m-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Shifts</CardTitle>
        <Link href="/admin/attendance/shifts-1/create">
          <Button><Plus className="mr-2 h-4 w-4" />Create Shift</Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        {[1,2].map(i => (
          <div key={i} className="flex justify-between items-center border p-4 rounded-lg">
            <div>
              <h4 className="font-semibold">General Shift</h4>
              <p className="text-sm text-muted-foreground">09:30 - 18:30</p>
            </div>
            <Badge>Fixed</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
