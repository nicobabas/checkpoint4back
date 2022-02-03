-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 03 fév. 2022 à 19:22
-- Version du serveur :  8.0.27-0ubuntu0.20.04.1
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `remember`
--

-- --------------------------------------------------------

--
-- Structure de la table `book`
--

CREATE TABLE `book` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `book`
--

INSERT INTO `book` (`id`, `name`, `image`) VALUES
(3, 'Bali', 'https://images.pexels.com/photos/3577391/pexels-photo-3577391.jpeg?cs=srgb&dl=pexels-mudassir-ali-3577391.jpg&fm=jpg'),
(4, 'Mariage', 'https://images.pexels.com/photos/5379070/pexels-photo-5379070.jpeg?cs=srgb&dl=pexels-cottonbro-5379070.jpg&fm=jpg'),
(8, 'Le Sahara', 'http://localhost:8000/images/image-1643911711424.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `page`
--

CREATE TABLE `page` (
  `id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `book_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `page`
--

INSERT INTO `page` (`id`, `image`, `title`, `text`, `book_id`) VALUES
(7, 'http://localhost:8000/images/image-1643882883109.jpeg', '', '', 3),
(8, 'http://localhost:8000/images/image-1643882890773.jpg', '', '', 3),
(9, 'http://localhost:8000/images/image-1643882895612.jpg', '', '', 3),
(10, 'http://localhost:8000/images/image-1643882900607.jpeg', '', '', 3),
(11, 'http://localhost:8000/images/image-1643882907918.jpeg', '', '', 3),
(12, 'http://localhost:8000/images/image-1643882916704.jpeg', '', '', 3),
(13, 'http://localhost:8000/images/image-1643882924984.jpeg', '', '', 3),
(15, 'http://localhost:8000/images/image-1643883047491.jpeg', '', '', 3),
(16, 'http://localhost:8000/images/image-1643883054025.jpeg', '', '', 3),
(17, 'http://localhost:8000/images/image-1643883060531.jpeg', '', '', 3),
(18, 'http://localhost:8000/images/image-1643883069691.jpeg', '', '', 3),
(19, 'http://localhost:8000/images/image-1643883076301.jpeg', '', '', 3),
(20, 'http://localhost:8000/images/image-1643883083405.jpeg', '', '', 3),
(21, 'http://localhost:8000/images/image-1643883091103.jpeg', '', '', 3),
(22, 'http://localhost:8000/images/image-1643883098382.jpeg', '', '', 3),
(23, 'http://localhost:8000/images/image-1643883105599.jpeg', '', '', 3),
(24, 'http://localhost:8000/images/image-1643883112999.jpeg', '', '', 3),
(25, 'http://localhost:8000/images/image-1643883118162.jpeg', '', '', 3),
(35, 'http://localhost:8000/images/image-1643911885619.jpg', '', '', 8),
(36, 'http://localhost:8000/images/image-1643911890816.jpeg', '', '', 8),
(37, 'http://localhost:8000/images/image-1643911896257.jpeg', '', '', 8),
(38, 'http://localhost:8000/images/image-1643911901265.jpeg', '', '', 8),
(39, 'http://localhost:8000/images/image-1643911962961.jpg', '', '', 8),
(40, 'http://localhost:8000/images/image-1643912049378.jpeg', '', '', 8);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `is_admin`) VALUES
(1, NULL, NULL, 'fatima@test.com', '$2b$10$/inokAnjtIugb9ObCNhwfOA9H4TqQqIn8tAarP.T2ImECVJzXkVuy', 1),
(2, NULL, NULL, 'nicobabas@gmail.com', '$2b$10$rKfZUj1GMUdNu1D6CzWl.u58cV3LRyZ8tHkQO9r/1xcWdBXfVM9fS', 0),
(3, NULL, NULL, 'test@test.com', '$2b$10$9HicLjW6BSXlF6tNpUlzFOlohF8co0D28AnOImGbCpl45kWDNzUBG', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_book_TO_page` (`book_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `book`
--
ALTER TABLE `book`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `page`
--
ALTER TABLE `page`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `FK_book_TO_page` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
