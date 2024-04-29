"use client";
import PolicyForm from "@/components/forms/PolicyForm";
import { useDashboard } from "@/contexts/DashboardContext";

import React from "react";

const Manual = () => {
  const { clients, fetchClients, isLoadingClients, updateDebts } =
    useDashboard();

  return (
    <div className="size-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
          اضافه کردن بیمه نامه
        </h1>
      </div>
      <div className="size-full flex flex-col justify-center items-center md:p-8">
        {!isLoadingClients ? (
          <PolicyForm
            policy={undefined}
            fetchPolicy={fetchClients}
            clients={clients}
            updateDebts={updateDebts}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Manual;
