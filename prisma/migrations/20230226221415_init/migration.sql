/*
  Warnings:

  - Added the required column `status` to the `residencePermitApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `visaApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "residencePermitApplications" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "visaApplications" ADD COLUMN     "status" TEXT NOT NULL;
