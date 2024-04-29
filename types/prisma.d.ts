import { Prisma } from "@prisma/client";

type ClientModel = Prisma.ClientGetPayload<{
  include: {
    Policy: {
      include: {
        instalments: {
          include: {
            Policy;
          };
        };
        Client;
      };
    };
  };
}>;
type PolicyModel = Prisma.PolicyGetPayload<{
  include: {
    instalments: {
      select: {
        id;
        date;
        isPaid;
        paidAt;
        price;
        policyId;

        createdAt;
        updatedAt;
      };
      include: {
        Policy;
      };
    };
    Client;
  };
}>;
