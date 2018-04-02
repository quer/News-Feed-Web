-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 02. 04 2018 kl. 21:39:43
-- Serverversion: 5.7.11
-- PHP-version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `news_feed`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `attr`
--

CREATE TABLE `attr` (
  `id` int(11) NOT NULL,
  `attrTag` varchar(45) DEFAULT NULL,
  `fieldName` varchar(45) DEFAULT NULL,
  `fieldValue` varchar(45) DEFAULT NULL,
  `feeds_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `attr`
--

INSERT INTO `attr` (`id`, `attrTag`, `fieldName`, `fieldValue`, `feeds_id`) VALUES
(1, NULL, 'image', 'DR:XmlImageArticle DR:ImageUri620x349', 1),
(2, 'src', 'title', 'title', 1),
(3, NULL, 'link', 'link', 1),
(4, NULL, 'DateFiled', 'pubDate', 1),
(5, NULL, 'image', 'description | img', 2),
(6, 'src', 'title', 'title', 2),
(7, NULL, 'link', 'link', 2),
(8, NULL, 'DateFiled', 'pubDate', 2);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `feeds`
--

CREATE TABLE `feeds` (
  `id` int(11) NOT NULL,
  `loopTag` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `feedUrl` text,
  `mainImage` text NOT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `feeds`
--

INSERT INTO `feeds` (`id`, `loopTag`, `name`, `feedUrl`, `mainImage`, `update_time`, `create_time`) VALUES
(1, 'item', 'test', 'https://www.dr.dk/nyheder/service/feeds/allenyheder', 'https://digitalt.tv/wp-content/uploads/2017/10/dr1logo.png', '2002-04-18 04:23:09', '2002-04-18 04:23:09'),
(2, 'item', 'tv2', 'http://feeds.tv2.dk/nyheder/rss', 'https://bdollerup.files.wordpress.com/2011/10/tv-2-news-ikon.png', '2002-04-18 04:25:12', '2002-04-18 04:25:12');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `login_attempts`
--

CREATE TABLE `login_attempts` (
  `user_id` int(11) NOT NULL,
  `time` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `login_attempts`
--

INSERT INTO `login_attempts` (`user_id`, `time`) VALUES
(1, '1522458768'),
(1, '1522458802');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `members`
--

INSERT INTO `members` (`id`, `username`, `email`, `password`) VALUES
(1, 'test_user', 'test@example.com', '$2y$10$IrzYJi10j3Jy/K6jzSLQtOLif1wEZqTRQoK3DcS3jdnFEhL4fWM4G');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `attr`
--
ALTER TABLE `attr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_attr_feeds1_idx` (`feeds_id`);

--
-- Indeks for tabel `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `attr`
--
ALTER TABLE `attr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Tilføj AUTO_INCREMENT i tabel `feeds`
--
ALTER TABLE `feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Tilføj AUTO_INCREMENT i tabel `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `attr`
--
ALTER TABLE `attr`
  ADD CONSTRAINT `fk_attr_feeds1` FOREIGN KEY (`feeds_id`) REFERENCES `feeds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
