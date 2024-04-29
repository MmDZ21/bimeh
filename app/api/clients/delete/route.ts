import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function DELETE(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();
    const ids = formData.get("clientId") as unknown as string[];
    const client = await prisma.client.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return new Response(JSON.stringify(client), { status: 201 });
  } catch (error) {
    console.error("Error deleting client: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
