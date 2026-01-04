import { Badge } from "@/components/ui/badge";

export default function CalendarDayCell({ day }) {
  const mock = {
    shift: day % 3 === 0 ? "Night" : "General",
    status: day % 6 === 0 ? "Absent" : "Present",
  };

  return (
    <div className="border rounded-lg p-2 h-24 text-sm">
      <div className="font-semibold">{day}</div>

      <div className="mt-2 text-muted-foreground">
        {mock.shift} Shift
      </div>

      <Badge
        variant={mock.status === "Present" ? "success" : "destructive"}
        className="mt-2"
      >
        {mock.status}
      </Badge>
    </div>
  );
}
