# ************************************************************
# Sequel Ace SQL dump
# Version 20062
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.1.0)
# Database: HABITS
# Generation Time: 2023-12-10 05:47:26 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Themes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Themes`;

CREATE TABLE `Themes` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`background_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
	`font_family` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
	`color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
	`logo_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
	`popup_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Themes_title_key` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Themes` WRITE;
/*!40000 ALTER TABLE `Themes` DISABLE KEYS */;

INSERT INTO `Themes` (`id`, `title`, `background_path`, `font_family`, `color`, `logo_color`, `popup_color`, `created_at`, `updated_at`)
VALUES
	(1,'starryNight','starry_night_bg.webp','default','white','default','default','2023-11-11 05:19:43.921','2023-11-11 05:19:43.921'),
	(2,'coral','coral_bg.webp','default','white','default','default','2023-11-11 05:16:45.437','2023-11-11 05:16:45.437'),
	(3,'rain','rain_woman_bg.webp','default','white','default','default','2023-11-11 05:18:32.096','2023-11-11 05:18:32.096'),
	(4,'sea','sea_ships_bg.webp','default','white','default','default','2023-11-11 05:19:13.793','2023-11-11 05:19:13.793'),
	(5,'cloud','clouds_bg.webp','default','white','default','default','2023-11-11 05:15:57.149','2023-11-11 05:15:57.149');

/*!40000 ALTER TABLE `Themes` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
