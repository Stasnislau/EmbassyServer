/*
  Warnings:

  - You are about to drop the column `phone` on the `visaApplications` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `visaApplications` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `visaApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visaApplications" DROP COLUMN "phone",
DROP COLUMN "state",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
