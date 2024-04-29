import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function GET(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const company = await prisma.company.findFirst();
    return new Response(JSON.stringify(company), { status: 200 });
  } catch (error) {
    console.error("Error creating company: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
