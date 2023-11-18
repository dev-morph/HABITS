/*
  Warnings:

  - Made the column `theme_id` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `theme_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_theme_id_fkey` FOREIGN KEY (`theme_id`) REFERENCES `Themes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
