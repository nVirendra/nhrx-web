import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const SHIFT_OPTIONS = [
  { id: "morning", label: "Morning Shift" },
  { id: "evening", label: "Evening Shift" },
  { id: "night", label: "Night Shift" },
];

export default function RotationDayMapper({ rotation, updateDayShift }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Day-wise Shift Mapping</h4>

      {Array.from({ length: rotation.cycleDays }).map((_, i) => {
        const day = i + 1;
        return (
          <div key={day} className="flex items-center gap-4">
            <div className="w-20 font-medium">Day {day}</div>

            <Select
              value={rotation.dayShiftMap[day]}
              onValueChange={v => updateDayShift(day, v)}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                {SHIFT_OPTIONS.map(s => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
}
