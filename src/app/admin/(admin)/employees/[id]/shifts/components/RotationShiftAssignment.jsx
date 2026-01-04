import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";

export default function RotationShiftAssignment({ data, setData }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Select Rotation</Label>
        <Select onValueChange={v => setData(d => ({ ...d, rotationId: v }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select rotation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rot3">3 Day Rotation</SelectItem>
            <SelectItem value="rot7">7 Day Rotation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Rotation Start Date</Label>
        <Input
          type="date"
          onChange={e =>
            setData(d => ({ ...d, rotationStart: e.target.value }))
          }
        />
      </div>

      <div>
        <Label>Effective From</Label>
        <Input
          type="date"
          onChange={e => setData(d => ({ ...d, from: e.target.value }))}
        />
      </div>
    </div>
  );
}
