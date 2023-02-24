/*
  Warnings:

  - You are about to drop the `ResidencePermitApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisaApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResidencePermitApplication" DROP CONSTRAINT "ResidencePermitApplication_userId_fkey";

-- DropForeignKey
ALTER TABLE "VisaApplication" DROP CONSTRAINT "VisaApplication_userId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_userId_fkey";

-- DropTable
DROP TABLE "ResidencePermitApplication";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VisaApplication";

-- DropTable
DROP TABLE "Visit";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportExpirationDate" TEXT NOT NULL,
    "passportIssuingCountry" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residencePermitApplications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "residencePermitType" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportIssuingCountry" TEXT NOT NULL,
    "passportExpirationDate" TEXT NOT NULL,
    "passportIssuingDate" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "residencePermitApplications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visaApplications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportExpiration" TEXT NOT NULL,
    "passportCountry" TEXT NOT NULL,
    "visaType" TEXT NOT NULL,
    "visaDuration" TEXT NOT NULL,
    "visaDate" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "visaApplications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "residencePermitApplications" ADD CONSTRAINT "residencePermitApplications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visaApplications" ADD CONSTRAINT "visaApplications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
