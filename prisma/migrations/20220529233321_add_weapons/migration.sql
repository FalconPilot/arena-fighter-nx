/*
  Warnings:

  - Added the required column `weaponId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "weaponId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "armors" INTEGER[],
ADD COLUMN     "items" INTEGER[],
ADD COLUMN     "weapons" INTEGER[];

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
