import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function FixedShiftForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label>Shift Name</Label>
        <Input placeholder="General Shift" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Time</Label>
          <Input type="time" />
        </div>
        <div>
          <Label>End Time</Label>
          <Input type="time" />
        </div>
      </div>

      <div>
        <Label>Break (Minutes)</Label>
        <Input type="number" placeholder="60" />
      </div>

      <Button>Save Fixed Shift</Button>
    </div>
  );
}
