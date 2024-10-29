/*
  Warnings:

  - Added the required column `type` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Types" AS ENUM ('Quiz', 'Final');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "type" "Types" NOT NULL;
