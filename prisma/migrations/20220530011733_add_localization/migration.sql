/*
  Warnings:

  - Added the required column `nameKey` to the `ArmorLayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKey` to the `ArmorLayerMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKey` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArmorLayer" ADD COLUMN     "nameKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ArmorLayerMaterial" ADD COLUMN     "nameKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "headArmorName" TEXT,
ADD COLUMN     "legArmorName" TEXT,
ADD COLUMN     "torsoArmorName" TEXT;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "nameKey" TEXT NOT NULL;
