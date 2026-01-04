import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AssignmentTypeSelector({ value, onChange }) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList>
        <TabsTrigger value="fixed">Fixed Shift</TabsTrigger>
        <TabsTrigger value="rotation">Rotation</TabsTrigger>
        <TabsTrigger value="temporary">Temporary Override</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
