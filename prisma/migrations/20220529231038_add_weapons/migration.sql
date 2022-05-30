-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('Dagger', 'Sword', 'Spear', 'Mace');

-- CreateEnum
CREATE TYPE "WeaponSize" AS ENUM ('Small', 'Medium', 'Big');

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "WeaponType" NOT NULL,
    "size" "WeaponSize" NOT NULL,
    "slashDamage" INTEGER NOT NULL,
    "bluntDamage" INTEGER NOT NULL,
    "pierceDamage" INTEGER NOT NULL,
    "flameDamage" INTEGER NOT NULL,
    "thunderDamage" INTEGER NOT NULL,
    "darkDamage" INTEGER NOT NULL,
    "arcaneDamage" INTEGER NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);
