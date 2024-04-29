import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function DELETE(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();
    const instalmentIds = formData.get("instalmentIds") as unknown as string[];
    const deletedInstalments = await prisma.instalment.deleteMany({
      where: {
        id: {
          in: instalmentIds,
        },
      },
    });
    return new Response(JSON.stringify(deletedInstalments), { status: 200 });
  } catch (error) {
    console.error("Error deleting instalments: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
