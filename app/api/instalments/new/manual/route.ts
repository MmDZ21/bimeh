import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();

    const price = formData.get("price") as unknown as number;
    const date = formData.get("date") as string;
    const isPaid = formData.get("isPaid") as unknown as boolean;
    const paidAt = formData.get("paidAt") as string;
    const policyId = formData.get("policyId") as string;

    const instalment = await prisma.instalment.create({
      data: {
        price,
        date,
        isPaid,
        paidAt,
        Policy: {
          connect: {
            id: policyId,
          },
        },
      },
    });
    return new Response(JSON.stringify(instalment), { status: 201 });
  } catch (error) {
    console.error("Error creating instalment: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
