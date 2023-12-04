/*
  Warnings:

  - A unique constraint covering the columns `[profile_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Files_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Users_profile_id_key` ON `Users`(`profile_id`);

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Files`(`filename`) ON DELETE SET NULL ON UPDATE CASCADE;
