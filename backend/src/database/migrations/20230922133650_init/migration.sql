/*
  Warnings:

  - You are about to drop the column `event_day` on the `Event` table. All the data in the column will be lost.
  - Added the required column `due_day` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `event_day`,
    ADD COLUMN `due_day` DATE NOT NULL;
