import { Route } from "@/types";
import {
  BookText,
  Building,
  CornerDownLeft,
  FilePenLine,
  Home,
  LineChart,
  Settings,
  Users,
  Users2,
} from "lucide-react";

export const routes: Route[] = [
  {
    label: "خانه",
    path: "/admin",
    icon: Home,
    subroutes: null,
  },
  {
    label: "شرکت",
    path: "/admin/company",
    icon: Building,
    subroutes: [
      {
        label: "مشخصات شرکت",
        path: "/admin/company/details",
        icon: CornerDownLeft,
        subroutes: null,
      },
      {
        label: "مدیریت کاربران",
        path: "/admin/company/users",
        icon: CornerDownLeft,
        subroutes: null,
      },
    ],
  },
  {
    label: "بیمه نامه ها",
    path: "/admin/policies",
    icon: BookText,
    subroutes: [
      {
        label: "بیمه نامه جدید",
        path: "/admin/policies/new",
        icon: CornerDownLeft,
        subroutes: [
          {
            label: "اضافه کردن دستی",
            path: "/admin/policies/new/manual",
            icon: CornerDownLeft,
            subroutes: null,
          },
          {
            label: "اضافه کردن خودکار",
            path: "/admin/policies/new/auto",
            icon: CornerDownLeft,
            subroutes: null,
          },
        ],
      },
      {
        label: "مدیریت بیمه نامه ها",
        path: "/admin/policies/manage",
        icon: CornerDownLeft,
        subroutes: null,
      },
    ],
  },
  {
    label: "گزارشات",
    path: "/admin/statistics",
    icon: LineChart,
    subroutes: null,
  },
  {
    label: "مشتریان",
    path: "/admin/clients",
    icon: Users,
    subroutes: [
      {
        label: "مشتری جدید",
        path: "/admin/clients/new",
        icon: CornerDownLeft,
        subroutes: [
          {
            label: "اضافه کردن دستی",
            path: "/admin/clients/new/manual",
            icon: CornerDownLeft,
            subroutes: null,
          },
          {
            label: "اضافه کردن خودکار",
            path: "/admin/clients/new/auto",
            icon: CornerDownLeft,
            subroutes: null,
          },
        ],
      },
      {
        label: "مدیریت مشتریان",
        path: "/admin/clients/manage",
        icon: CornerDownLeft,
        subroutes: null,
      },
    ],
  },
  {
    icon: Settings,
    label: "تنظیمات",
    path: "/admin/settings",
    subroutes: null,
  },
];
