import { Badge } from "@/components/ui/badge";

export default function AttendanceLegend() {
  return (
    <div className="flex gap-4 text-sm">
      <Badge variant="success">Present</Badge>
      <Badge variant="destructive">Absent</Badge>
      <Badge variant="outline">Holiday</Badge>
      <Badge variant="secondary">Week Off</Badge>
    </div>
  );
}
