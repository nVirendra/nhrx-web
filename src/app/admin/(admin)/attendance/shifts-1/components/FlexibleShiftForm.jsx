import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function FlexibleShiftForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label>Shift Name</Label>
        <Input placeholder="Flexible Shift" />
      </div>

      <div>
        <Label>Minimum Work Hours</Label>
        <Input type="number" placeholder="8" />
      </div>

      <div>
        <Label>Maximum Work Hours</Label>
        <Input type="number" placeholder="10" />
      </div>

      <Button>Save Flexible Shift</Button>
    </div>
  );
}
