import * as z from "zod";
export const types = [
  "FIRE",
  "MTPL",
  "CARGO",
  "ENGINEERING",
  "MOD",
  "LIFE",
  "EVENTS",
  "HEALTH",
  "TRAVEL",
  "ETC",
] as const;
export const companySchema = z.object({
  title: z
    .string({ required_error: "نام شرکت را وارد کنید" })
    .min(1, "نام شرکت را وارد کنید"),
  address: z.string().optional(),
  phone: z.string().optional(),
  registrationNumber: z.string().optional(),
  zipCode: z.string().optional(),
  email: z.string().optional(),
  insurance: z
    .string({ required_error: "شرکت بیمه را انتخاب کنید" })
    .min(1, "شرکت بیمه را انتخاب کنید"),
});

export const clientSchema = z.object({
  fname: z
    .string({ required_error: "نام مشتری را وارد کنید" })
    .min(1, "نام مشتری را وارد کنید"),
  lname: z
    .string({ required_error: "نام خانوادگی مشتری را وارد کنید" })
    .min(1, "نام خانوادگی مشتری را وارد کنید"),
  address: z.string().optional(),
  phone: z.string().optional(),
  passCode: z.string().optional(),
  email: z.string().optional(),
  birthDate: z.any().optional(),
  debt: z.string().optional(),
});

export const policySchema = z.object({
  policyNumber: z
    .string({ required_error: "شماره بیمه نامه را وارد کنید" })
    .min(1, "شماره بیمه نامه را وارد کنید"),
  type: z.enum(types),
  price: z.string(),
  instalments: z.any(),
  quantity: z.number().optional(),
  monthsBetween: z.string().optional(),
  description: z.string().optional(),
  expiration: z.any().optional(),
  client: z
    .string({ required_error: "مشتری را انتخاب کنید" })
    .min(1, "مشتری را انتخاب کنید"),
});
