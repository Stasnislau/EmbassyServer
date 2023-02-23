/*
  Warnings:

  - You are about to drop the column `firstName` on the `ResidencePermitApplication` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `ResidencePermitApplication` table. All the data in the column will be lost.
  - Added the required column `name` to the `ResidencePermitApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `ResidencePermitApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResidencePermitApplication" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;
