import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function PATCH(request: Request) {
    const { userId } = auth();
    if (!userId) {
      return new Response("عدم دسترسی", { status: 401 });
    }
   try {
    const formData = await request.formData();
    
    const id = formData.get('id') as unknown;
    const title= formData.get('title') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string
    const logo = formData.get('logo') as string
    const registrationNumber = formData.get('registrationNumber') as unknown;
    const zipCode = formData.get('zipCode') as unknown
    const email = formData.get('email') as string
    const insurance = formData.get('insurance') as string
    
    const updatedCompany = await prisma.company.update({
        where:{
            id : id as number
        },
      data:{
        title,
        address,
        phone,
        logo,
        registrationNumber: registrationNumber as number,
        zipCode: zipCode as number,
        email,
        insurance
      }
    })
    return new Response(JSON.stringify(updatedCompany), {status: 200})
   } catch (error) {
    console.error("Error updating company: ", error)
    return new Response("Internal server error: ", {status: 500})
   }
}
