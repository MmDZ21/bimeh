import { auth } from "@clerk/nextjs";
import { title } from "process";

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  const formData = request.body;
  const {
    title,
    address,
    phone,
    logo,
    registrationNumber,
    zipCode,
    email,
    insurance,
  } = formData;
}
