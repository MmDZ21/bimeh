"use client";
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
import { Check, Delete, Eye, MoreHorizontal, Trash2, X } from "lucide-react";
import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { PolicyModel } from "@/types/prisma";
export const columns: ColumnDef<PolicyModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mr-3 bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary "
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
    accessorKey: "policyNumber",
    id: "شماره بیمه نامه",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="شماره بیمه نامه" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("شماره بیمه نامه");
      const formatted = new Intl.NumberFormat("fa", {
        useGrouping: false,
      }).format(Number(amount));
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    id: "نوع",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="نوع" />
    ),
    cell: ({ row }) => {
      return row.original.type === "FIRE"
        ? "آتش سوزی"
        : row.original.type === "MOD"
        ? "بدنه"
        : row.original.type === "LIFE"
        ? "عمر"
        : row.original.type === "MTPL"
        ? "شخص ثالث"
        : row.original.type === "HEALTH"
        ? "درمان"
        : row.original.type === "TRAVEL"
        ? "مسافرت"
        : row.original.type === "EVENTS"
        ? "حوادث"
        : row.original.type === "ENGINEERING"
        ? "مهندسی"
        : row.original.type === "CARGO"
        ? "باربری"
        : "سایر";
    },
  },
  {
    accessorKey: "description",
    header: "توضیحات",
    id: "توضیحات",
  },
  {
    accessorKey: "expiration",
    header: "تاریخ انقضا",
    id: "تاریخ انقضا",
  },
  {
    accessorKey: "price",
    header: "هزینه (تومان)",
    id: "هزینه",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("هزینه"));
      const formatted = new Intl.NumberFormat("fa").format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "instalments",
    header: "اقساط",
    cell: ({ row }) => {
      const instalments = row.original.instalments;
      return instalments ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {instalments.map((i) => (
              <DropdownMenuItem key={i.id} className="flex gap-4" dir="rtl">
                <p>{i.date.toString()}</p>
                {i.isPaid ? (
                  <Check className="size-4 text-green-700" />
                ) : (
                  <X className="size-4 text-red-700" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span>بدون اقساط</span>
      );
    },
    id: "اقساط",
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
              <Link href={`/admin/policies/edit/${row.original.id}`}>
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
