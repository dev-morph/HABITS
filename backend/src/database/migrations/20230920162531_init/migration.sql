/*
  Warnings:

  - You are about to drop the column `user_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Routine` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `user_id`,
    ADD COLUMN `user_email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Routine` DROP COLUMN `user_id`,
    ADD COLUMN `user_email` VARCHAR(191) NOT NULL;
