/*
  Warnings:

  - Added the required column `passportIssuingDate` to the `visaApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visaApplications" ADD COLUMN     "passportIssuingDate" TEXT NOT NULL;
