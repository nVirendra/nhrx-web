"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import EmployeeFormTabs from "../add/page";
import { useEmployeeDetails } from "@/features/employee/employee.api";

const EmployeeCreateEditClient = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const isEdit = Boolean(editId);

  const { data, isLoading } = useEmployeeDetails(
    isEdit ? Number(editId) : null
  );

  if (isEdit && isLoading) {
    return <p className="p-6">Loading employee details...</p>;
  }

  return (
    <EmployeeFormTabs
      mode={isEdit ? "edit" : "create"}
      employeeData={data?.data || {}}
    />
  );
};

export default EmployeeCreateEditClient;
