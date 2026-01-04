import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";

export default function BulkShiftForm({ setData }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Shift Type</Label>
        <Select onValueChange={v => setData(d => ({ ...d, type: v }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed">Fixed</SelectItem>
            <SelectItem value="rotation">Rotation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Shift / Rotation</Label>
        <Select onValueChange={v => setData(d => ({ ...d, refId: v }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Shift</SelectItem>
            <SelectItem value="rot3">3 Day Rotation</SelectItem>
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
    </div>
  );
}
