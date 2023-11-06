/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Themes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Themes_title_key` ON `Themes`(`title`);
