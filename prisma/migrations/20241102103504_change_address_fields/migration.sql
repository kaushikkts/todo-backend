/*
  Warnings:

  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - Added the required column `line1` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "street",
ADD COLUMN     "line1" TEXT NOT NULL,
ADD COLUMN     "line2" TEXT;
