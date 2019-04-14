-- MySQL dump 10.13  Distrib 5.7.19, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: class
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `judgement`
--

DROP TABLE IF EXISTS `judgement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `judgement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `published_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `mark` tinyint(4) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `judgement_user_id_fk` (`user_id`),
  KEY `judgement_published_id_fk` (`published_id`),
  CONSTRAINT `judgement_published_id_fk` FOREIGN KEY (`published_id`) REFERENCES `published` (`id`),
  CONSTRAINT `judgement_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `judgement`
--

LOCK TABLES `judgement` WRITE;
/*!40000 ALTER TABLE `judgement` DISABLE KEYS */;
/*!40000 ALTER TABLE `judgement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organization_user_id_uindex` (`user_id`),
  UNIQUE KEY `organization_name_uindex` (`name`),
  CONSTRAINT `organization_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prototype`
--

DROP TABLE IF EXISTS `prototype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prototype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prototype_teacher_id_fk` (`teacher_id`),
  CONSTRAINT `prototype_teacher_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prototype`
--

LOCK TABLES `prototype` WRITE;
/*!40000 ALTER TABLE `prototype` DISABLE KEYS */;
/*!40000 ALTER TABLE `prototype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `published`
--

DROP TABLE IF EXISTS `published`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `published` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `prototype_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `published_teacher_id_fk` (`teacher_id`),
  KEY `published_prototype_id_fk` (`prototype_id`),
  KEY `published_organization_id_fk` (`organization_id`),
  CONSTRAINT `published_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  CONSTRAINT `published_prototype_id_fk` FOREIGN KEY (`prototype_id`) REFERENCES `prototype` (`id`),
  CONSTRAINT `published_teacher_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `published`
--

LOCK TABLES `published` WRITE;
/*!40000 ALTER TABLE `published` DISABLE KEYS */;
/*!40000 ALTER TABLE `published` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prototype_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `request_prototype_id_fk` (`prototype_id`),
  KEY `request_organization_id_fk` (`organization_id`),
  CONSTRAINT `request_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  CONSTRAINT `request_prototype_id_fk` FOREIGN KEY (`prototype_id`) REFERENCES `prototype` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `intro` text NOT NULL,
  `unit` text NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacher_user_id_uindex` (`user_id`),
  CONSTRAINT `teacher_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `open_id` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_account_uindex` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-27 19:13:48
