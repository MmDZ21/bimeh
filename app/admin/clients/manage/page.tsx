"use client";

import { columns } from "@/components/clients/columns";
import { DataTable } from "@/components/data-table/DataTable";

import { useDashboard } from "@/contexts/DashboardContext";
const ManageClients = () => {
  const { clients } = useDashboard();
  return (
    <div className="size-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
          مشتریان
        </h1>
      </div>
      <div className="size-full flex flex-col justify-center items-center">
        <div className="max-w-xs sm:max-w-sm md:max-w-full md:w-full h-full px-10 py-10">
          <DataTable columns={columns} data={clients} />
        </div>
      </div>
    </div>
  );
};

export default ManageClients;
