/*
  Warnings:

  - You are about to drop the column `custumerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `custumerNif` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "custumerName",
DROP COLUMN "custumerNif";
