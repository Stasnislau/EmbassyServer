/*
  Warnings:

  - You are about to drop the column `userId` on the `credentials` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "credentials_email_key";

-- DropIndex
DROP INDEX "credentials_userId_key";

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "userId";
