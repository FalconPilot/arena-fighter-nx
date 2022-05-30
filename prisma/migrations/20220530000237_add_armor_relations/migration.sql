/*
  Warnings:

  - Added the required column `lowHeadLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lowLegsLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lowTorsoLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleHeadLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleLegsLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleTorsoLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topHeadLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topLegsLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topTorsoLayerId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "lowHeadLayerId" INTEGER NOT NULL,
ADD COLUMN     "lowLegsLayerId" INTEGER NOT NULL,
ADD COLUMN     "lowTorsoLayerId" INTEGER NOT NULL,
ADD COLUMN     "middleHeadLayerId" INTEGER NOT NULL,
ADD COLUMN     "middleLegsLayerId" INTEGER NOT NULL,
ADD COLUMN     "middleTorsoLayerId" INTEGER NOT NULL,
ADD COLUMN     "topHeadLayerId" INTEGER NOT NULL,
ADD COLUMN     "topLegsLayerId" INTEGER NOT NULL,
ADD COLUMN     "topTorsoLayerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_topTorsoLayerId_fkey" FOREIGN KEY ("topTorsoLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_middleTorsoLayerId_fkey" FOREIGN KEY ("middleTorsoLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_lowTorsoLayerId_fkey" FOREIGN KEY ("lowTorsoLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_topHeadLayerId_fkey" FOREIGN KEY ("topHeadLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_middleHeadLayerId_fkey" FOREIGN KEY ("middleHeadLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_lowHeadLayerId_fkey" FOREIGN KEY ("lowHeadLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_topLegsLayerId_fkey" FOREIGN KEY ("topLegsLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_middleLegsLayerId_fkey" FOREIGN KEY ("middleLegsLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_lowLegsLayerId_fkey" FOREIGN KEY ("lowLegsLayerId") REFERENCES "ArmorLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
