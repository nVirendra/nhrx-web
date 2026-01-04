import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import RotationDayMap from "./RotationDayMap";

export default function RotationShiftForm() {
  return (
    <div className="space-y-6">
      <div>
        <Label>Rotation Name</Label>
        <Input placeholder="3 Day Rotation" />
      </div>

      <div>
        <Label>Cycle Days</Label>
        <Input type="number" placeholder="3" />
      </div>

      <RotationDayMap />

      <Button>Save Rotation</Button>
    </div>
  );
}
