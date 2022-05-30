/*
  Warnings:

  - You are about to drop the column `armors` on the `User` table. All the data in the column will be lost.
  - Added the required column `secondaryWeaponId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Weapon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `range` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WeaponMaterialType" AS ENUM ('Metal', 'Wood', 'Stone');

-- CreateEnum
CREATE TYPE "LayerSlot" AS ENUM ('Head', 'Torso', 'Legs');

-- CreateEnum
CREATE TYPE "LayerLevel" AS ENUM ('Top', 'Middle', 'Bottom');

-- CreateEnum
CREATE TYPE "LayerMaterialType" AS ENUM ('Cloth', 'Leather', 'Metal', 'Wood', 'Stone');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "WeaponType" ADD VALUE 'Axe';
ALTER TYPE "WeaponType" ADD VALUE 'Bow';
ALTER TYPE "WeaponType" ADD VALUE 'Crossbow';
ALTER TYPE "WeaponType" ADD VALUE 'Pistol';
ALTER TYPE "WeaponType" ADD VALUE 'Rifle';

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "secondaryWeaponId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "armors",
ADD COLUMN     "layers" INTEGER[];

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "material" "WeaponMaterialType" NOT NULL,
ADD COLUMN     "range" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ArmorLayerMaterial" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "LayerMaterialType" NOT NULL,
    "slashResistance" INTEGER NOT NULL,
    "bluntResistance" INTEGER NOT NULL,
    "pierceResistance" INTEGER NOT NULL,
    "flameResistance" INTEGER NOT NULL,
    "thunderResistance" INTEGER NOT NULL,
    "darkResistance" INTEGER NOT NULL,
    "arcaneResistance" INTEGER NOT NULL,

    CONSTRAINT "ArmorLayerMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorLayer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" "LayerLevel" NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "ArmorLayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_secondaryWeaponId_fkey" FOREIGN KEY ("secondaryWeaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorLayer" ADD CONSTRAINT "ArmorLayer_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "ArmorLayerMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
