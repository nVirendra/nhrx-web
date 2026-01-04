import { Checkbox } from "@/components/ui/checkbox";

const EMPLOYEES = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Anita" },
  { id: 3, name: "Vikas" },
];

export default function EmployeeMultiSelect({ setData }) {
  const toggle = id =>
    setData(d => ({
      ...d,
      employees: d.employees?.includes(id)
        ? d.employees.filter(e => e !== id)
        : [...(d.employees || []), id],
    }));

  return (
    <div>
      <h4 className="font-semibold mb-2">Select Employees</h4>
      <div className="space-y-2">
        {EMPLOYEES.map(emp => (
          <label key={emp.id} className="flex items-center gap-2">
            <Checkbox onCheckedChange={() => toggle(emp.id)} />
            {emp.name}
          </label>
        ))}
      </div>
    </div>
  );
}
