/*
  Warnings:

  - Added the required column `role` to the `Instructor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INSTRUCTOR', 'STUDENT');

-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "Role" NOT NULL;
