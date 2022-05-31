/*
  Warnings:

  - You are about to drop the column `type` on the `ArmorLayerMaterial` table. All the data in the column will be lost.
  - Added the required column `materialType` to the `ArmorLayerMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArmorLayerMaterial" DROP COLUMN "type",
ADD COLUMN     "materialType" "LayerMaterialType" NOT NULL;
