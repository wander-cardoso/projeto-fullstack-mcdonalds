/*
  Warnings:

  - You are about to drop the column `restaurantID` on the `Order` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `consumptionMethod` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ConsumptionMethod" AS ENUM ('TAKEAWAY', 'DINE_IN');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_restaurantID_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "restaurantID",
ADD COLUMN     "restaurantId" TEXT NOT NULL,
DROP COLUMN "consumptionMethod",
ADD COLUMN     "consumptionMethod" "ConsumptionMethod" NOT NULL;

-- DropEnum
DROP TYPE "OrderConsuptionMethod";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
