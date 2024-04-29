"use client";
import ClientForm from "@/components/forms/ClientForm";
import { useDashboard } from "@/contexts/DashboardContext";

const EditClient = ({ params }: { params: { id: string } }) => {
  const { clients, fetchClients, isLoadingClients } = useDashboard();
  const client = clients.find((client) => client.id === params.id);
  return (
    <div className="size-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
          {client?.fname + " " + client?.lname}
        </h1>
      </div>
      <div className="size-full flex flex-col justify-center items-center">
        {!isLoadingClients ? (
          <ClientForm client={client} fetchClients={fetchClients} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default EditClient;
