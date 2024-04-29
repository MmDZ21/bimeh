"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { dashboardContext } from "@/types";
import { ClientModel, PolicyModel } from "@/types/prisma";
import { Company } from "@prisma/client";
const DashboardContext = createContext<dashboardContext>({
  company: null,
  clients: [],
  policies: [],
  fetchCompany: null,
  fetchClients: null,
  isLoadingCompany: true, // Add loading state for company
  isLoadingClients: true, // Add loading state for clients
  updateDebts: null,
});

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [policies, setPolicies] = useState<PolicyModel[]>([]);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [isLoadingClients, setIsLoadingClients] = useState(true);

  const updateDebts = async () => {
    try {
      const response = await fetch("/api/clients/updateDebts");
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
      } else {
        console.error("Failed to updating debts :", response.status);
      }
    } catch (error) {
      console.error("Error updating debts:", error);
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await fetch("/api/company/get");
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
      } else {
        console.error("Failed to fetch company data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };
  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients/get");
      if (response.ok) {
        const data: ClientModel[] = await response.json();
        setClients(data);
        const policies: PolicyModel[] = data.flatMap((c) => c.Policy);
        setPolicies(policies);
      } else {
        console.error("Failed to fetch clients data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
  };

  useEffect(() => {
    fetchCompany()
      .then(() => setIsLoadingCompany(false))
      .catch(() => setIsLoadingCompany(false));

    fetchClients()
      .then(() => setIsLoadingClients(false))
      .catch(() => setIsLoadingClients(false));
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        company,
        clients,
        policies,
        fetchClients,
        fetchCompany,
        isLoadingClients,
        isLoadingCompany,
        updateDebts,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
