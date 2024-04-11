import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
    const { userId } = auth();
    if (!userId) {
      return new Response("عدم دسترسی", { status: 401 });
    }
   try {
    const formData = await request.formData();
  
    const fname= formData.get('fname') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const lname = formData.get('lname') as string;
    const passCode = formData.get('passCode') as string;
    const birthDate = formData.get('birthDate') as unknown;
    const email = formData.get('email') as string;
    
    const client = await prisma.client.create({
      data:{
        fname,
        address,
        phone,
        lname,
        passCode,
        email,
        birthDate
      }
    })
    return new Response(JSON.stringify(client), {status: 201})
   } catch (error) {
    console.error("Error creating client: ", error)
    return new Response("Internal server error: ", {status: 500})
   }
}
