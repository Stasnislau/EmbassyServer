/*
  Warnings:

  - You are about to drop the column `passportCountry` on the `visaApplications` table. All the data in the column will be lost.
  - You are about to drop the column `passportExpiration` on the `visaApplications` table. All the data in the column will be lost.
  - Added the required column `passportExpirationDate` to the `visaApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportIssuingCountry` to the `visaApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visaApplications" DROP COLUMN "passportCountry",
DROP COLUMN "passportExpiration",
ADD COLUMN     "passportExpirationDate" TEXT NOT NULL,
ADD COLUMN     "passportIssuingCountry" TEXT NOT NULL;
