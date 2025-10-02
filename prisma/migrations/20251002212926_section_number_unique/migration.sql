/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS "Course_code-trgm_idx"
  ON "Course" USING GIN ("code" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "Course_title_trgm_idx"
  ON "Course" USING GIN ("title" gin_trgm_ops);

