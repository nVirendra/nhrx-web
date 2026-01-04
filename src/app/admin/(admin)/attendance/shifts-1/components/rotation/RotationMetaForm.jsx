import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function RotationMetaForm({ rotation, setRotation }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Rotation Name</Label>
        <Input
          value={rotation.rotationName}
          onChange={e => setRotation(r => ({ ...r, rotationName: e.target.value }))}
          placeholder="3 Day Shift Rotation"
        />
      </div>

      <div>
        <Label>Rotation Code</Label>
        <Input
          value={rotation.rotationCode}
          onChange={e => setRotation(r => ({ ...r, rotationCode: e.target.value }))}
          placeholder="ROT_3DAY"
        />
      </div>

      <div>
        <Label>Cycle Days</Label>
        <Input
          type="number"
          min={1}
          value={rotation.cycleDays}
          onChange={e =>
            setRotation(r => ({
              ...r,
              cycleDays: Number(e.target.value),
              dayShiftMap: {},
            }))
          }
        />
      </div>

      <div className="flex items-center gap-3 pt-6">
        <Switch
          checked={rotation.isActive}
          onCheckedChange={v => setRotation(r => ({ ...r, isActive: v }))}
        />
        <Label>Rotation Active</Label>
      </div>
    </div>
  );
}
