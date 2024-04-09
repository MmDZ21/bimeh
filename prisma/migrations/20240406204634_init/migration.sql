-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BASIC');

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "phone" VARCHAR(255),
    "Logo" VARCHAR(255),
    "registrationNumber" INTEGER,
    "zipCode" INTEGER,
    "email" VARCHAR(255),
    "insurance" VARCHAR(255) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fname" VARCHAR(255) NOT NULL,
    "lname" VARCHAR(255) NOT NULL,
    "passCode" VARCHAR(255),
    "birthDate" TIMESTAMP(3),
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "temporary_password" VARCHAR(255),
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fname" VARCHAR(255) NOT NULL,
    "lname" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "address" VARCHAR(255),
    "email" VARCHAR(255),
    "debt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "policyNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "clientId" INTEGER NOT NULL,
    "description" VARCHAR(255),
    "expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instalment" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "policyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "instalment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instalment" ADD CONSTRAINT "instalment_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
