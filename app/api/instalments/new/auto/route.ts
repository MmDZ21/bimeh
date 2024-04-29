import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();
    const policyId = formData.get("policyId") as string;
    const quantity = formData.get("quantity") as unknown as number;
    const total = formData.get("total") as unknown as number;
    const price = total / quantity;
    const monthsBetween = formData.get("monthsBetween") as string;
    console.log(monthsBetween);
    const startDate = formData.get("startDate") as unknown as Date;

    let instalments = [
      {
        price,
        date: startDate,
        isPaid: false,
        policyId,
      },
    ];

    for (let i = 2; i <= quantity; i++) {
      const newDate = new Date(instalments[i - 2].date);
      newDate.setMonth(newDate.getMonth() + Number(monthsBetween));

      instalments.push({
        price,
        date: newDate,
        isPaid: false,
        policyId,
      });
    }
    console.log(instalments);
    const newInstalments = await prisma.instalment.createMany({
      data: instalments,
    });
    return new Response(JSON.stringify(instalments), { status: 201 });
  } catch (error) {
    console.error("Error creating instalments: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
