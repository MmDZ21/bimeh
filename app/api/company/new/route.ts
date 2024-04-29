import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const logo = formData.get("logo") as string;
    const registrationNumber = formData.get("registrationNumber") as unknown;
    const zipCode = formData.get("zipCode") as unknown;
    const email = formData.get("email") as string;
    const insurance = formData.get("insurance") as string;

    const company = await prisma.company.create({
      data: {
        title,
        address,
        phone,
        logo,
        registrationNumber: registrationNumber as number,
        zipCode: zipCode as number,
        email,
        insurance,
      },
    });
    return new Response(JSON.stringify(company), { status: 201 });
  } catch (error) {
    console.error("Error creating company: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
