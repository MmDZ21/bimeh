import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function PUT(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();

    const id = formData.get("companyId") as string;
    const title = formData.get("title") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const logo = formData.get("logo") as string;
    const registrationNumber = formData.get("registrationNumber") as string;
    const zipCode = formData.get("zipCode") as string;
    const email = formData.get("email") as string;
    const insurance = formData.get("insurance") as string;

    const updatedCompany = await prisma.company.upsert({
      where: {
        id,
      },
      update: {
        title,
        address,
        phone,
        logo,
        registrationNumber,
        zipCode,
        email,
        insurance,
      },
      create: {
        title,
        address,
        phone,
        logo,
        registrationNumber,
        zipCode,
        email,
        insurance,
      },
    });
    return new Response(JSON.stringify(updatedCompany), {
      status: 200,
    });
  } catch (error) {
    console.error("Error upserting company: ", error);
    return new Response("Internal server error: ", {
      status: 500,
    });
  }
}
