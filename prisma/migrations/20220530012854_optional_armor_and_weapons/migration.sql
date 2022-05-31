-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_lowHeadLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_lowLegsLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_lowTorsoLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_middleHeadLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_middleLegsLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_middleTorsoLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_secondaryWeaponId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_topHeadLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_topLegsLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_topTorsoLayerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_weaponId_fkey";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "weaponId" DROP NOT NULL,
ALTER COLUMN "secondaryWeaponId" DROP NOT NULL,
ALTER COLUMN "lowHeadLayerId" DROP NOT NULL,
ALTER COLUMN "lowLegsLayerId" DROP NOT NULL,
ALTER COLUMN "lowTorsoLayerId" DROP NOT NULL,
ALTER COLUMN "middleHeadLayerId" DROP NOT NULL,
ALTER COLUMN "middleLegsLayerId" DROP NOT NULL,
ALTER COLUMN "middleTorsoLayerId" DROP NOT NULL,
ALTER COLUMN "topHeadLayerId" DROP NOT NULL,
ALTER COLUMN "topLegsLayerId" DROP NOT NULL,
ALTER COLUMN "topTorsoLayerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastCheckout" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_secondaryWeaponId_fkey" FOREIGN KEY ("secondaryWeaponId") REFERENCES "Weapon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_topTorsoLayerId_fkey" FOREIGN KEY ("topTorsoLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_middleTorsoLayerId_fkey" FOREIGN KEY ("middleTorsoLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_lowTorsoLayerId_fkey" FOREIGN KEY ("lowTorsoLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_topHeadLayerId_fkey" FOREIGN KEY ("topHeadLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_middleHeadLayerId_fkey" FOREIGN KEY ("middleHeadLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_lowHeadLayerId_fkey" FOREIGN KEY ("lowHeadLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_topLegsLayerId_fkey" FOREIGN KEY ("topLegsLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_middleLegsLayerId_fkey" FOREIGN KEY ("middleLegsLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_lowLegsLayerId_fkey" FOREIGN KEY ("lowLegsLayerId") REFERENCES "ArmorLayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
