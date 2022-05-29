/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `sid` on the `Session` table. All the data in the column will be lost.
  - Added the required column `lastAction` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Session_sid_key";

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "data",
DROP COLUMN "expiresAt",
DROP COLUMN "sid",
ADD COLUMN     "lastAction" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");
