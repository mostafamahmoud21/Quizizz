/*
  Warnings:

  - Added the required column `level` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Levels" AS ENUM ('Easy', 'Medium', 'Hard');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "level" "Levels" NOT NULL;
