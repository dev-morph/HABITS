/*
  Warnings:

  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `routine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `events`;

-- DropTable
DROP TABLE `routine`;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `routine_id` INTEGER NOT NULL,
    `event_day` DATE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `priority` INTEGER NOT NULL,
    `is_complete` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Routine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `recur_pattern` VARCHAR(191) NOT NULL,
    `event_day` VARCHAR(191) NOT NULL,
    `start_day` DATE NULL,
    `end_day` DATE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
