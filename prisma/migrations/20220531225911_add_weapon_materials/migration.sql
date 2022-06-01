/*
  Warnings:

  - You are about to drop the column `material` on the `Weapon` table. All the data in the column will be lost.
  - Added the required column `materialId` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "material",
ADD COLUMN     "materialId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WeaponMaterial" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nameKey" TEXT NOT NULL,
    "materialType" "WeaponMaterialType" NOT NULL,

    CONSTRAINT "WeaponMaterial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "WeaponMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
