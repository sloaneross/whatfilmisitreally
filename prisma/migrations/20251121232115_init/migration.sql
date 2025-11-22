-- CreateEnum
CREATE TYPE "Process" AS ENUM ('C_41', 'E_6', 'ECN_2', 'B_W');

-- CreateTable
CREATE TABLE "Brand" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "location" TEXT,
    "does_coat" BOOLEAN,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" BIGSERIAL NOT NULL,
    "brand" BIGINT,
    "ISO" INTEGER,
    "dev_process" "Process",
    "is_available" BOOLEAN,
    "formats" TEXT[],

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film_to_parent" (
    "parent" BIGINT NOT NULL,
    "child" BIGINT NOT NULL,

    CONSTRAINT "film_to_parent_pkey" PRIMARY KEY ("parent","child")
);

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_brand_fkey" FOREIGN KEY ("brand") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_to_parent" ADD CONSTRAINT "film_to_parent_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_to_parent" ADD CONSTRAINT "film_to_parent_child_fkey" FOREIGN KEY ("child") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
