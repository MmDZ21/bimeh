import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Type, instalment } from "@prisma/client";
import { date } from "zod";

interface ins {
  price: number;
  date: Date;
  status: boolean;
}
export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("عدم دسترسی", { status: 401 });
  }
  try {
    const formData = await request.formData();

    const policyNumber = formData.get("policyNumber") as string;
    const clientId = formData.get("clientId") as string;
    const price = formData.get("price") as unknown as number;
    const description = formData.get("description") as string;
    const expiration = formData.get("expirationDate") as string;
    const instalmentsString = formData.get("instalments") as string;
    const instalmentsParsed = JSON.parse(instalmentsString);
    const instalments = instalmentsParsed.map((i: ins) => {
      return {
        price: Number(i.price),
        date: new Date(i.date),
        isPaid: Boolean(i.status),
      };
    });
    const type = formData.get("type") as Type;
    const policy = await prisma.policy.create({
      data: {
        policyNumber: Number(policyNumber),
        description,
        expiration: new Date(expiration),
        price: Number(price),
        type,
        instalments: {
          createMany: {
            data: instalments,
          },
        },
        Client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
    return new Response(JSON.stringify(policy), { status: 201 });
  } catch (error) {
    console.error("Error creating policy: ", error);
    return new Response("Internal server error: ", { status: 500 });
  }
}
