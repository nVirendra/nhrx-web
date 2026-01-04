import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ShiftPolicyForm() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Grace In (Minutes)</Label>
        <Input type="number" />
      </div>

      <div>
        <Label>Grace Out (Minutes)</Label>
        <Input type="number" />
      </div>

      <div>
        <Label>Overtime After (Minutes)</Label>
        <Input type="number" />
      </div>

      <div className="flex items-center gap-3">
        <Switch />
        <Label>Allow Comp-Off</Label>
      </div>
    </div>
  );
}
