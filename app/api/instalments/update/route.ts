import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function PATCH(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const price = formData.get("price") as unknown as number;
    const isPaid = formData.get("isPaid") as unknown as boolean;
    const paidAt = formData.get("paidAt") as unknown as Date;
    const updatedInstalment = await prisma.instalment.update({
      where: {
        id,
      },
      data: {
        price,
        isPaid,
        paidAt,
      },
    });
    return new Response(JSON.stringify(updatedInstalment), { status: 200 });
  } catch (error) {
    console.error("Error updating instalment: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
