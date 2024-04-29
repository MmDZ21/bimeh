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
import { policySchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ClientModel, PolicyModel } from "@/types/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "zaman";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  ChevronsUpDown,
  Check,
  X,
  MoreHorizontal,
  Trash2,
  Eye,
  Link,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { instalment } from "@prisma/client";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { v4 as uuidv4 } from "uuid";
const PolicyForm = ({
  policy,
  fetchPolicy,
  clients,
  updateDebts,
}: {
  policy: PolicyModel | undefined;
  fetchPolicy: any;
  clients: ClientModel[];
  updateDebts: any;
}) => {
  const [date, setDate] = useState(policy?.expiration || new Date());

  const [status, setStatus] = useState(false);
  const [instalmentPrice, setInstalmentPrice] = useState("");
  const [instalmentDate, setInstalmentDate] = useState(new Date());

  const [autoInstalmentDate, setAutoInstalmentDate] = useState(new Date());
  const [monthsBetween, setMonthsBetween] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(6);
  const [total, setTotal] = useState<number>(1000000);

  const [instalments, setInstalments] = useState<
    { id: string; price: string; date: Date; status: boolean }[]
  >(
    policy?.instalments
      ? policy.instalments.map((i: instalment) => {
          return {
            id: i.id,
            price: String(i.price),
            date: new Date(i.date),
            status: i.isPaid,
          };
        })
      : []
  );
  const [clientId, setClientId] = useState<string>(policy?.clientId || "");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof policySchema>>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      policyNumber: policy?.policyNumber ? String(policy.policyNumber) : "",
      type: policy?.type || "FIRE",
      description: policy?.description || "",
      price: policy?.price ? String(policy.price) : "",
      expiration: policy?.expiration || "",
      client: policy?.clientId || "",
      instalments: policy?.instalments || "",
      quantity: policy?.quantity || 0,
      monthsBetween: String(policy?.monthsBetween) || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof policySchema>) => {
    const { client, policyNumber, price, type, description } = values;
    try {
      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("policyNumber", policyNumber);
      formData.append("price", price);
      formData.append("type", type);
      formData.append("description", description || "");
      formData.append("expirationDate", String(date));
      formData.append("instalments", JSON.stringify(instalments) || "");
      formData.append("policyId", policy?.id || "");
      const url = policy ? "/api/policies/update" : "/api/policies/new/single";
      const method = policy ? "PATCH" : "POST";
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
      console.error("Error updating policy:", error);
      toast({ title: "خطا در انجام عملیات", variant: "destructive" });
    }
    await updateDebts();
    await fetchPolicy();
  };

  const sortInstalments = (ins: typeof instalments) => {
    const sorted = ins.slice().toSorted((a, b) => {
      // Convert the date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Compare the dates
      if (dateA < dateB) {
        return -1; // dateA comes before dateB
      }
      if (dateA > dateB) {
        return 1; // dateA comes after dateB
      }
      return 0; // dates are equal
    });
    setInstalments(sorted);
  };

  return (
    <div className="md:flex w-full justify-center gap-10">
      <div className="md:w-1/2">
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:flex justify-center md:gap-20 md:shadow-md p-4 md:p-6 md:shadow-background"
              >
                <div className="space-y-6 pb-6 md:pb-0">
                  <FormField
                    control={form.control}
                    name="policyNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شماره بیمه نامه </FormLabel>
                        <FormControl>
                          <Input placeholder="شماره بیمه نامه ..." {...field} />
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
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع بیمه</FormLabel>
                        <FormControl>
                          <Select
                            dir="rtl"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="نوع بیمه" />
                            </SelectTrigger>
                            <SelectContent className="flex justify-center">
                              {policySchema.shape.type.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option === "FIRE"
                                    ? "آتش سوزی"
                                    : option === "MOD"
                                    ? "بدنه"
                                    : option === "LIFE"
                                    ? "عمر"
                                    : option === "MTPL"
                                    ? "شخص ثالث"
                                    : option === "HEALTH"
                                    ? "درمان"
                                    : option === "TRAVEL"
                                    ? "مسافرت"
                                    : option === "EVENTS"
                                    ? "حوادث"
                                    : option === "ENGINEERING"
                                    ? "مهندسی"
                                    : option === "CARGO"
                                    ? "باربری"
                                    : "سایر"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>هزینه</FormLabel>
                        <FormControl>
                          <Input placeholder="هزینه" {...field} />
                        </FormControl>{" "}
                        <FormDescription className="text-[0.7rem]">
                          فقط به صورت ارقام انگلیسی
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاریخ انقضا</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>مشتری</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? (() => {
                                      const selectedClient = clients.find(
                                        (client) => client.id === field.value
                                      );
                                      return selectedClient
                                        ? `${selectedClient.fname} ${selectedClient.lname}`
                                        : "";
                                    })()
                                  : "انتخاب مشتری"}
                                <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="انتخاب مشتری..."
                                dir="rtl"
                              />
                              <CommandEmpty>یافت نشد</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {clients.map((client) => (
                                    <CommandItem
                                      value={client.id}
                                      key={client.id}
                                      onSelect={() => {
                                        form.setValue("client", client.id);
                                        setClientId(client.id);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "ml-2 h-4 w-4",
                                          client.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {client.fname + " " + client.lname}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="توضیحات بیمه نامه"
                            {...field}
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
          </CardContent>
        </Card>
      </div>
      <div className="md:w-1/2">
        <Card className="max-w-xs sm:max-w-sm md:max-w-full md:w-full overflow-scroll mx-auto">
          <CardHeader>
            <CardTitle>اقساط</CardTitle>
            <CardDescription>تعیین اقساط</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            <div className="md:flex justify-between">
              <Card className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInstalments((prev) => [
                      ...prev,
                      {
                        id: uuidv4(),
                        date: instalmentDate,
                        price: instalmentPrice,
                        status,
                      },
                    ]);
                  }}
                >
                  <CardHeader>
                    <CardTitle>قسط بندی</CardTitle>
                    <CardDescription>دستی</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="datepicker">تاریخ قسط</Label>
                        <DatePicker
                          inputClass="flex cursor-pointer h-10 w-full hover:bg-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          inputAttributes={{
                            placeholder: "انتخاب تاریخ",
                            id: "datepicker",
                            required: true,
                          }}
                          onChange={(e) => setInstalmentDate(e.value)}
                          className="z-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">مبلغ</Label>
                        <Input
                          placeholder="مبلغ قسط"
                          id="price"
                          onChange={(e) =>
                            setInstalmentPrice(e.currentTarget.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">وضعیت</Label>
                        <Select
                          dir="rtl"
                          onValueChange={(e) =>
                            setStatus(e === "TRUE" ? true : false)
                          }
                          required
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="انتخاب وضعیت" />
                          </SelectTrigger>
                          <SelectContent className="flex justify-center">
                            <SelectItem value="TRUE">پرداخت شده</SelectItem>
                            <SelectItem value="FALSE">پرداخت نشده</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">افزودن</Button>
                  </CardFooter>
                </form>
              </Card>
              <div className="flex items-center justify-center p-6">یا</div>
              <Card className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let instals = [
                      {
                        id: uuidv4(),
                        price: String(total / quantity),
                        date: autoInstalmentDate,
                        status: false,
                      },
                    ];
                    for (let i = 2; i <= quantity; i++) {
                      const newDate = new Date(instals[i - 2].date);
                      newDate.setMonth(
                        newDate.getMonth() + Number(monthsBetween)
                      );
                      instals.push({
                        id: uuidv4(),
                        price: String(total / quantity),
                        date: newDate,
                        status: false,
                      });
                    }
                    setInstalments(instals);
                  }}
                >
                  <CardHeader>
                    <CardTitle>قسط بندی</CardTitle>
                    <CardDescription>خودکار</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="datepicker">تاریخ اولین قسط</Label>
                        <DatePicker
                          inputClass="flex cursor-pointer h-10 w-full hover:bg-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          inputAttributes={{
                            placeholder: "انتخاب تاریخ",
                            id: "datepicker",
                            required: true,
                          }}
                          onChange={(e) => setAutoInstalmentDate(e.value)}
                          className="z-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="months">فاصله اقساط (ماه)</Label>
                        <Input
                          defaultValue={1}
                          type="number"
                          id="months"
                          onChange={(e) =>
                            setMonthsBetween(+e.currentTarget.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">تعداد اقساط</Label>
                        <Input
                          defaultValue={6}
                          type="number"
                          id="quantity"
                          onChange={(e) => setQuantity(+e.currentTarget.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total">مبلغ کل</Label>
                        <Input
                          placeholder="مبلغ کل بیمه نامه"
                          id="total"
                          onChange={(e) => setTotal(+e.currentTarget.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">قسط بندی</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            <div>
              <Table>
                <TableCaption>لیست اقساط مشتری</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center bg-primary text-white border-l border-l-white">
                      شماره
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-center bg-primary text-white border-l border-l-white"
                      onClick={() => sortInstalments(instalments)}
                    >
                      تاریخ
                    </TableHead>
                    <TableHead className="text-center bg-primary text-white border-l border-l-white">
                      مبلغ
                    </TableHead>
                    <TableHead className="text-center bg-primary text-white border-l border-l-white">
                      پرداخت
                    </TableHead>
                    <TableHead className="text-center bg-primary text-white">
                      عملیات
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instalments.length > 0 ? (
                    instalments.map((instalment, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {instalment.date.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center">
                          {instalment.price}
                        </TableCell>
                        <TableCell>
                          {instalment.status ? (
                            <Check className="text-green-700 mx-auto" />
                          ) : (
                            <X className="text-red-700 size-4 mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="flex justify-center">
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
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event propagation if necessary
                                    const updatedInstalments = instalments.map(
                                      (i) =>
                                        i.id === instalment.id
                                          ? { ...i, status: !i.status }
                                          : i
                                    );
                                    setInstalments(updatedInstalments);
                                  }}
                                >
                                  {instalment.status ? (
                                    <>
                                      <X className="size-4 text-red-700" />
                                      <p>پرداخت نشده</p>
                                    </>
                                  ) : (
                                    <>
                                      <Check className="size-4 text-green-700" />
                                      <p>پرداخت شد</p>
                                    </>
                                  )}
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex justify-between cursor-pointer"
                                asChild
                              >
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event propagation if necessary
                                    const updatedInstalments =
                                      instalments.filter(
                                        (i) => i.id !== instalment.id
                                      );
                                    setInstalments(updatedInstalments);
                                  }}
                                >
                                  <Trash2 className="size-4" />
                                  حذف
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        فاقد اقساط
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PolicyForm;
