/*
  Warnings:

  - You are about to drop the column `isFree` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `time` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_eventId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "isFree",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "tickets";
