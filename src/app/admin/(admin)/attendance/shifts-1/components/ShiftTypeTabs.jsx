"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FixedShiftForm from "./FixedShiftForm";
import FlexibleShiftForm from "./FlexibleShiftForm";
// import RotationShiftForm from "./RotationShiftForm";
import RotationShiftForm from "./rotation/RotationShiftForm";

export default function ShiftTypeTabs() {
  return (
    <Tabs defaultValue="fixed">
      <TabsList>
        <TabsTrigger value="fixed">Fixed</TabsTrigger>
        <TabsTrigger value="flexible">Flexible</TabsTrigger>
        <TabsTrigger value="rotation">Rotation</TabsTrigger>
      </TabsList>

      <TabsContent value="fixed"><FixedShiftForm /></TabsContent>
      <TabsContent value="flexible"><FlexibleShiftForm /></TabsContent>
      <TabsContent value="rotation"><RotationShiftForm /></TabsContent>
    </Tabs>
  );
}
