import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

interface Policy {
  clientId: string;
}

interface Instalment {
  price: number;
  isPaid: boolean;
  Policy: Policy;
}

export async function GET(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }

  try {
    const allInstalments = await prisma.instalment.findMany({
      select: {
        price: true,
        isPaid: true,
        Policy: {
          select: {
            clientId: true,
          },
        },
      },
    });

    const unpaidInstalmentsByClient: { [clientId: string]: number } =
      allInstalments.reduce(
        (acc: { [clientId: string]: number }, instalment: Instalment) => {
          const clientId = instalment.Policy.clientId;
          acc[clientId] =
            (acc[clientId] || 0) + (instalment.isPaid ? 0 : instalment.price);
          return acc;
        },
        {}
      );

    const clientIds = Object.keys(unpaidInstalmentsByClient);

    await Promise.all(
      clientIds.map(async (clientId) => {
        const totalDebt = unpaidInstalmentsByClient[clientId];
        await prisma.client.update({
          where: { id: clientId },
          data: { debt: totalDebt },
        });
      })
    );

    return new Response(JSON.stringify(clientIds), {
      status: 200,
      statusText: "Debts updated",
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
