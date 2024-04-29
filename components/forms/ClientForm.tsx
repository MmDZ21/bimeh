"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { clientSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ClientModel } from "@/types/prisma";
import { DatePicker } from "zaman";
const ClientForm = ({
  client,
  fetchClients,
}: {
  client: ClientModel | undefined;
  fetchClients: any;
}) => {
  const [date, setDate] = useState(new Date());

  const { toast } = useToast();
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      fname: client?.fname || "",
      lname: client?.lname || "",
      passCode: client?.passCode || "",
      email: client?.email || "",
      phone: client?.phone || "",
      address: client?.address || "",
      birthDate: client?.birthDate ? new Date(client?.birthDate) : "",
      debt: client?.debt ? String(client.debt) : "",
    },
  });
  const onSubmit = async (values: z.infer<typeof clientSchema>) => {
    const { fname, lname, address, debt, email, passCode, phone } = values;
    console.log(values);
    try {
      const formData = new FormData();
      if (client) {
        formData.append("clientId", client.id);
      }
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("address", address || "");
      formData.append("email", email || "");
      formData.append("phone", phone || "");
      formData.append("birthDate", date.toISOString() || "");
      formData.append("passCode", passCode || "");
      formData.append("debt", debt || "");

      const url = client ? "/api/clients/update" : "/api/clients/new/single";
      const method = client ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        return toast({
          title: "خطا",
          variant: "destructive",
          description: "خطا در انجام عملیات",
        });
      }

      toast({ title: "موفق", description: "تغییرات موردنظر با موفقیت ثبت شد" });
    } catch (error) {
      console.error("Error updating client:", error);
      toast({ title: "خطا در انجام عملیات", variant: "destructive" });
    }

    fetchClients();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:flex justify-center md:gap-20 md:shadow-md p-4 md:p-6 md:shadow-background"
      >
        <div className="space-y-6 pb-6 md:pb-0">
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input placeholder="نام مشتری ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام خانوادگی</FormLabel>
                <FormControl>
                  <Input placeholder="نام خانوادگی ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>کد ملی</FormLabel>
                <FormControl>
                  <Input placeholder="کد ملی ..." {...field} />
                </FormControl>
                <FormDescription className="text-[0.7rem]">
                  فقط به صورت ارقام انگلیسی
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>آدرس</FormLabel>
                <FormControl>
                  <Input placeholder="آدرس ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره تلفن</FormLabel>
                <FormControl>
                  <Input placeholder="تلفن ..." {...field} />
                </FormControl>
                <FormDescription className="text-[0.7rem]">
                  فقط به صورت ارقام انگلیسی
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input placeholder="ایمیل ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تاریخ تولد</FormLabel>
                <FormControl>
                  <DatePicker
                    inputClass="flex cursor-pointer h-10 w-full hover:bg-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    inputAttributes={{ placeholder: "انتخاب تاریخ" }}
                    onChange={(e) => setDate(e.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:!mt-20">
            <Button type="submit">ثبت</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
