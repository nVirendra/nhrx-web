"use client";

import { useState } from "react";
import EmployeeMultiSelect from "./EmployeeMultiSelect";
import BulkShiftForm from "./BulkShiftForm";
import BulkPreview from "./BulkPreview";

export default function BulkShiftAssignment() {
  const [data, setData] = useState({});

  return (
    <div className="space-y-6">
      <EmployeeMultiSelect setData={setData} />
      <BulkShiftForm setData={setData} />
      <BulkPreview data={data} />
    </div>
  );
}
