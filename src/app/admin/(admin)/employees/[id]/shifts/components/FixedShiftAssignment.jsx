import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";

export default function FixedShiftAssignment({ data, setData }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Select Shift</Label>
        <Select onValueChange={v => setData(d => ({ ...d, shiftId: v }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Shift</SelectItem>
            <SelectItem value="morning">Morning Shift</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Effective From</Label>
        <Input
          type="date"
          onChange={e => setData(d => ({ ...d, from: e.target.value }))}
        />
      </div>

      <div>
        <Label>Effective To</Label>
        <Input
          type="date"
          onChange={e => setData(d => ({ ...d, to: e.target.value }))}
        />
      </div>
    </div>
  );
}
