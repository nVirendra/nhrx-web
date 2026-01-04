import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";

export default function TemporaryOverrideForm({ data, setData }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Override Shift</Label>
        <Select onValueChange={v => setData(d => ({ ...d, shiftId: v }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="night">Night Shift</SelectItem>
            <SelectItem value="evening">Evening Shift</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>From Date</Label>
        <Input
          type="date"
          onChange={e => setData(d => ({ ...d, from: e.target.value }))}
        />
      </div>

      <div>
        <Label>To Date</Label>
        <Input
          type="date"
          onChange={e => setData(d => ({ ...d, to: e.target.value }))}
        />
      </div>

      <div>
        <Label>Reason</Label>
        <Input
          placeholder="Emergency / Replacement"
          onChange={e => setData(d => ({ ...d, reason: e.target.value }))}
        />
      </div>
    </div>
  );
}
