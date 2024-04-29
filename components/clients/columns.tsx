"use client";
import { ClientModel } from "@/types/prisma";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Delete, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
export const columns: ColumnDef<ClientModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mr-3 bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mr-3"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "fname",
    id: "نام",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="نام" />
    ),
  },
  {
    accessorKey: "lname",
    id: "نام خانوادگی",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="نام خانوادگی" />
    ),
  },
  {
    accessorKey: "passCode",
    header: "کد ملی",
    id: "کد ملی",
  },
  {
    accessorKey: "phone",
    header: "تلفن",
    id: "تلفن",
  },
  {
    accessorKey: "address",
    header: "آدرس",
    id: "آدرس",
  },
  {
    accessorKey: "email",
    header: "ایمیل",
    id: "ایمیل",
  },
  {
    accessorKey: "birthDate",
    header: "تاریخ تولد",
    id: "تاریخ تولد",
  },
  {
    accessorKey: "Policy",
    header: "بیمه نامه ها",
    cell: ({ row }) => {
      const policies = row.original.Policy;
      return policies ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {policies.map((p) => (
              <DropdownMenuItem key={p.id}>{p.policyNumber}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span>بدون بیمه نامه</span>
      );
    },
    id: "بیمه نامه ها",
  },

  {
    accessorKey: "debt",
    id: "بدهی",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="بدهی (تومان)" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("بدهی"));
      const formatted = new Intl.NumberFormat("fa").format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاریخ ثبت" />
    ),
    id: "تاریخ ثبت",
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">باز کردن</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="text-center">
              عملیات
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex justify-between cursor-pointer"
              asChild
            >
              <Link href={`/admin/clients/edit/${row.original.id}`}>
                <Eye className="size-4" />
                مشاهده
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between cursor-pointer"
              asChild
            >
              <Link href="#">
                <Trash2 className="size-4" />
                حذف
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
