-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: rolline
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gamemodes`
--

DROP TABLE IF EXISTS `gamemodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamemodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `dice_system` text NOT NULL,
  `rules` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamemodes`
--

LOCK TABLES `gamemodes` WRITE;
/*!40000 ALTER TABLE `gamemodes` DISABLE KEYS */;
INSERT INTO `gamemodes` VALUES (1,'DnD','D20','rulesd20'),(2,'d6','d6','d6like'),(3,'shadowrun','d6','5+ hits');
/*!40000 ALTER TABLE `gamemodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `gamemode_id` int NOT NULL,
  `template_sheet_id` int NOT NULL,
  `cover` text NOT NULL,
  `invite_link` text NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `games_gamemode_id_foreign_idx` (`gamemode_id`),
  CONSTRAINT `games_gamemode_id_foreign` FOREIGN KEY (`gamemode_id`) REFERENCES `gamemodes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Chroniques Oubliées fantasy',1,2,'https://source.unsplash.com/random/600x600','super','2020-10-17 21:02:15','2020-10-17 21:02:34'),(2,'Blade Runner',1,2,'https://source.unsplash.com/random/600x600','cool','2020-10-17 21:02:15','2020-10-17 21:02:34'),(3,'Arsène Lupin',3,2,'https://source.unsplash.com/random/600x600','gega','2020-10-17 21:02:15','2020-10-17 21:02:34'),(4,'donjon de naheulbeuk',2,1,'https://source.unsplash.com/random/120x120','raphaelperraud.com','2020-10-21 11:18:49','2020-10-21 11:18:49');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'SF'),(2,'Fantasy'),(3,'thriller'),(4,'policier'),(5,'CO'),(6,'aventure'),(7,'historique'),(8,'médieval'),(78,'super'),(79,'yougoslavie');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags_by_games`
--

DROP TABLE IF EXISTS `tags_by_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags_by_games` (
  `tag_id` int unsigned NOT NULL,
  `game_id` int unsigned NOT NULL,
  PRIMARY KEY (`tag_id`,`game_id`),
  KEY `tags_by_games_game_id_foreign_idx` (`game_id`),
  CONSTRAINT `tags_by_games_game_id_foreign` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tags_by_games_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags_by_games`
--

LOCK TABLES `tags_by_games` WRITE;
/*!40000 ALTER TABLE `tags_by_games` DISABLE KEYS */;
INSERT INTO `tags_by_games` VALUES (2,1),(5,1),(6,1),(1,2),(3,2),(6,2),(3,3),(4,3),(8,3),(2,4),(6,4),(8,4);
/*!40000 ALTER TABLE `tags_by_games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_sheets`
--

DROP TABLE IF EXISTS `template_sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template_sheets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `sheet` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_sheets`
--

LOCK TABLES `template_sheets` WRITE;
/*!40000 ALTER TABLE `template_sheets` DISABLE KEYS */;
INSERT INTO `template_sheets` VALUES (1,'Shadow Runner','shadow'),(2,'DnD','dnd like'),(3,'policier','polciier');
/*!40000 ALTER TABLE `template_sheets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` text NOT NULL,
  `mail` text NOT NULL,
  `password` text NOT NULL,
  `picture` text NOT NULL,
  `discord_id` text NOT NULL,
  `inscription_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'top','top@mail.com','supermdp','https://source.unsplash.com/random/120x120','3256','2020-10-17 21:03:18'),(2,'super','super@mail.com','supermdp','https://source.unsplash.com/random/120x120','1458','2020-10-17 21:18:56'),(3,'cool','cool@mail.com','coolmdp','https://source.unsplash.com/random/120x120','4586','2020-10-17 21:18:56'),(4,'genial','genial@mail.com','genialmdp','https://source.unsplash.com/random/120x120','6475','2020-10-17 21:19:29'),(5,'tropcool','tropcool@mail.com','tropcool@mail.com','https://source.unsplash.com/random/120x120','6432','2020-10-17 21:19:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_by_games`
--

DROP TABLE IF EXISTS `users_by_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_by_games` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_by_games`
--

LOCK TABLES `users_by_games` WRITE;
/*!40000 ALTER TABLE `users_by_games` DISABLE KEYS */;
INSERT INTO `users_by_games` VALUES (1,3),(1,1),(2,1),(2,4),(3,1),(3,2),(4,3),(4,4),(5,4),(5,2),(3,5),(5,4),(3,99),(2,99),(3,100),(2,100);
/*!40000 ALTER TABLE `users_by_games` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-31 20:58:10
