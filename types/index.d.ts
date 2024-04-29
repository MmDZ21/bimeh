import { LucideIcon } from "lucide-react";
import { ClientModel, PolicyModel } from "./prisma";
import { Company } from "@prisma/client";

export interface Route {
  path: string;
  icon: LucideIcon;
  label: string;
  subroutes: Route[] | null;
}
export interface dashboardContext {
  company: Company | null;
  clients: ClientModel[];
  policies: PolicyModel[];
  fetchCompany: any;
  fetchClients: any;
  updateDebts: any;
  isLoadingCompany: boolean;
  isLoadingClients: boolean;
}
export type client = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
