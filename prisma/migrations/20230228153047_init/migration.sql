/*
  Warnings:

  - You are about to drop the column `zipCode` on the `residencePermitApplications` table. All the data in the column will be lost.
  - Added the required column `zip` to the `residencePermitApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "residencePermitApplications" DROP COLUMN "zipCode",
ADD COLUMN     "zip" TEXT NOT NULL;
