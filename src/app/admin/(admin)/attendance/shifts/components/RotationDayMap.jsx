import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function RotationDayMap() {
  return (
    <div className="space-y-3">
      {[1,2,3].map(day => (
        <div key={day} className="flex items-center gap-4">
          <span className="w-20 font-medium">Day {day}</span>

          <Select>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Select Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="night">Night</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
