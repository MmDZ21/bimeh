"use client";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/components/policies/columns";
import { useDashboard } from "@/contexts/DashboardContext";
import React from "react";

const ManagePolicies = () => {
  const { policies } = useDashboard();
  return (
    <div className="size-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
          مشتریان
        </h1>
      </div>
      <div className="size-full flex flex-col justify-center items-center">
        <div className="max-w-xs sm:max-w-sm md:max-w-full md:w-full h-full px-10 py-10">
          <DataTable columns={columns} data={policies} />
        </div>
      </div>
    </div>
  );
};

export default ManagePolicies;
