-- CreateTable
CREATE TABLE `Themes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `background_path` VARCHAR(191) NOT NULL,
    `font_family` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `logo_color` VARCHAR(191) NOT NULL,
    `popup_color` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
