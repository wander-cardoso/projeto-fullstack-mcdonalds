/*
  Warnings:

  - Added the required column `custumerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custumerNif` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "custumerName" TEXT NOT NULL,
ADD COLUMN     "custumerNif" TEXT NOT NULL;
