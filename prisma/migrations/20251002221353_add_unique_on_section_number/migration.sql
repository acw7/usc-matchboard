/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Course_code-trgm_idx";

-- DropIndex
DROP INDEX "public"."Course_title_trgm_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Section_number_key" ON "Section"("number");
