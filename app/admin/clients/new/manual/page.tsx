import ClientForm from "@/components/forms/ClientForm";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Manual = () => {
  return (
    <div className="size-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
          اضافه کردن مشتری
        </h1>
      </div>
      <div className="size-full flex flex-col justify-center items-center">
        <Card>
          <CardContent>
            <ClientForm client={undefined} fetchClients={undefined} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Manual;
