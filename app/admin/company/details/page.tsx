"use client";
import CompanyForm from "@/components/forms/CompanyForm";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";

import React from "react";

const CompanyDetails = () => {
  const { company, fetchCompany, isLoadingCompany } = useDashboard();
  return (
    <div className="size-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
          مشخصات شرکت
        </h1>
      </div>
      <div className="size-full flex flex-col justify-center items-center">
        {!isLoadingCompany ? (
          <Card>
            <CardContent>
              <CompanyForm company={company} fetchCompany={fetchCompany} />
            </CardContent>
          </Card>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
