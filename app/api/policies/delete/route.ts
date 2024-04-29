import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function DELETE(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();
    const policyIds = formData.get("policyId") as unknown as string[];

    const policy = await prisma.policy.deleteMany({
      where: {
        id: {
          in: policyIds,
        },
      },
    });
    return new Response(JSON.stringify(policy), { status: 200 });
  } catch (error) {
    console.error("Error deleting policy: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
