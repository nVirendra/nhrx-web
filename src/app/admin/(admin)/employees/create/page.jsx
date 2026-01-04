import { Suspense } from "react";

import EmployeeCreateEditClient from "../components/EmployeeCreateEditClient";
export default function Page() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <EmployeeCreateEditClient />
    </Suspense>
  );
}
