"use client";
import React, { useEffect } from "react";
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
import { companySchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDashboard } from "@/contexts/DashboardContext";
import { useToast } from "@/components/ui/use-toast";
import { Company } from "@prisma/client";

const CompanyForm = ({
  company,
  fetchCompany,
}: {
  company: Company | null;
  fetchCompany: any;
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      title: company?.title || "",
      address: company?.title || "",
      email: company?.email || "",
      zipCode: company?.zipCode || "",
      insurance: company?.insurance || "",
      phone: company?.phone || "",
      registrationNumber: company?.registrationNumber || "",
    },
  });
  useEffect(() => {
    if (company) {
      form.reset({
        title: company.title || "",
        address: company.address || "",
        email: company.email || "",
        zipCode: company.zipCode || "",
        insurance: company.insurance || "",
        phone: company.phone || "",
        registrationNumber: company.registrationNumber || "",
      });
    }
  }, [company, form.reset]);
  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    const {
      insurance,
      title,
      address,
      email,
      phone,
      registrationNumber,
      zipCode,
    } = values;
    try {
      const formData = new FormData();
      formData.append("insurance", insurance);
      formData.append("title", title);
      formData.append("address", address || "");
      formData.append("email", email || "");
      formData.append("phone", phone || "");
      formData.append("registrationNumber", registrationNumber || "");
      formData.append("zipCode", zipCode || "");
      formData.append("companyId", company?.id || "");
      const response = await fetch("/api/company/update", {
        method: "PUT",
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
      console.error("Error updating company:", error);
      toast({ title: "خطا در انجام عملیات", variant: "destructive" });
    }

    fetchCompany();
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام شرکت</FormLabel>
                <FormControl>
                  <Input placeholder="نام شرکت شما ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره ثبت</FormLabel>
                <FormControl>
                  <Input placeholder="شماره ثبت شرکت شما ..." {...field} />
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
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>کد پستی</FormLabel>
                <FormControl>
                  <Input placeholder="کد پستی شرکت شما ..." {...field} />
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
                  <Input placeholder="آدرس شرکت شما ..." {...field} />
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
                  <Input placeholder="تلفن شرکت شما ..." {...field} />
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
                  <Input placeholder="ایمیل شرکت شما ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="insurance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>بیمه</FormLabel>
                <FormControl>
                  <Input placeholder="بیمه ..." {...field} />
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

export default CompanyForm;
