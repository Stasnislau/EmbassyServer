/*
  Warnings:

  - You are about to drop the column `zipCode` on the `users` table. All the data in the column will be lost.
  - Added the required column `birthPlace` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportIssuingDate` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `visaApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthPlace` to the `visaApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "zipCode",
ADD COLUMN     "birthPlace" TEXT NOT NULL,
ADD COLUMN     "passportIssuingDate" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "visaApplications" ADD COLUMN     "birthDate" TEXT NOT NULL,
ADD COLUMN     "birthPlace" TEXT NOT NULL;
