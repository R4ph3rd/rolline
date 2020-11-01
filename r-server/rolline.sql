-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : Dim 01 nov. 2020 à 22:41
-- Version du serveur :  8.0.21
-- Version de PHP : 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rolline`
--

-- --------------------------------------------------------

--
-- Structure de la table `assets`
--

CREATE TABLE `assets` (
  `id` int NOT NULL,
  `label` text,
  `path` text NOT NULL,
  `owner_id` int UNSIGNED NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `gamemodes`
--

CREATE TABLE `gamemodes` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `dice_system` text NOT NULL,
  `rules` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `gamemodes`
--

INSERT INTO `gamemodes` (`id`, `name`, `dice_system`, `rules`) VALUES
(1, 'DnD', 'D20', 'rulesd20'),
(2, 'd6', 'd6', 'd6like'),
(3, 'shadowrun', 'd6', '5+ hits'),
(5, 'cool', 'cool dices', 'coolrules');

-- --------------------------------------------------------

--
-- Structure de la table `games`
--

CREATE TABLE `games` (
  `id` int UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `gamemode_id` int NOT NULL,
  `template_sheet_id` int NOT NULL,
  `cover` text NOT NULL,
  `invite_link` text NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `games`
--

INSERT INTO `games` (`id`, `name`, `gamemode_id`, `template_sheet_id`, `cover`, `invite_link`, `creation_date`, `last_update`) VALUES
(1, 'Chroniques Oubliées fantasy', 1, 2, 'https://source.unsplash.com/random/600x600', 'super', '2020-10-17 21:02:15', '2020-10-17 21:02:34'),
(2, 'Blade Runner', 1, 2, 'https://source.unsplash.com/random/600x600', 'cool', '2020-10-17 21:02:15', '2020-10-17 21:02:34'),
(3, 'Arsène Lupin', 3, 2, 'https://source.unsplash.com/random/600x600', 'gega', '2020-10-17 21:02:15', '2020-10-17 21:02:34'),
(4, 'donjon de naheulbeuk', 2, 1, 'https://source.unsplash.com/random/120x120', 'raphaelperraud.com', '2020-10-21 11:18:49', '2020-10-21 11:18:49'),
(116, 'Mont michel', 5, 4, '/home/r4ph3rd/Documents/rolline/r-server/config/helpers/../../data/public/game_covers/56eb1d9422a0c6c2df9f0d37059ffbad-(4).jpg', 'http://localhost:5051/invite?function split() { [native code] }', '2020-11-01 22:40:58', '2020-11-01 22:40:58');

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE `tags` (
  `id` int UNSIGNED NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `label`) VALUES
(1, 'SF'),
(2, 'Fantasy'),
(3, 'thriller'),
(4, 'policier'),
(5, 'CO'),
(6, 'aventure'),
(7, 'historique'),
(8, 'médieval'),
(78, 'super'),
(79, 'yougoslavie');

-- --------------------------------------------------------

--
-- Structure de la table `tags_by_games`
--

CREATE TABLE `tags_by_games` (
  `tag_id` int UNSIGNED NOT NULL,
  `game_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tags_by_games`
--

INSERT INTO `tags_by_games` (`tag_id`, `game_id`) VALUES
(2, 1),
(5, 1),
(6, 1),
(1, 2),
(3, 2),
(6, 2),
(3, 3),
(4, 3),
(8, 3),
(2, 4),
(6, 4),
(8, 4),
(4, 116),
(5, 116);

-- --------------------------------------------------------

--
-- Structure de la table `template_sheets`
--

CREATE TABLE `template_sheets` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `sheet` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `template_sheets`
--

INSERT INTO `template_sheets` (`id`, `name`, `sheet`) VALUES
(1, 'Shadow Runner', 'shadow'),
(2, 'DnD', 'dnd like'),
(3, 'policier', 'polciier'),
(4, 'simple', 'simplesheet'),
(5, 'cool', 'coolsheet');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `pseudo` text NOT NULL,
  `mail` text NOT NULL,
  `password` text NOT NULL,
  `picture` text NOT NULL,
  `discord_id` text NOT NULL,
  `inscription_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `mail`, `password`, `picture`, `discord_id`, `inscription_date`) VALUES
(1, 'top', 'top@mail.com', 'supermdp', 'https://source.unsplash.com/random/120x120', '3256', '2020-10-17 21:03:18'),
(2, 'super', 'super@mail.com', 'supermdp', 'https://source.unsplash.com/random/120x120', '1458', '2020-10-17 21:18:56'),
(3, 'cool', 'cool@mail.com', 'coolmdp', 'https://source.unsplash.com/random/120x120', '4586', '2020-10-17 21:18:56'),
(4, 'genial', 'genial@mail.com', 'genialmdp', 'https://source.unsplash.com/random/120x120', '6475', '2020-10-17 21:19:29'),
(5, 'tropcool', 'tropcool@mail.com', 'tropcool@mail.com', 'https://source.unsplash.com/random/120x120', '6432', '2020-10-17 21:19:29');

-- --------------------------------------------------------

--
-- Structure de la table `users_by_games`
--

CREATE TABLE `users_by_games` (
  `user_id` int UNSIGNED NOT NULL,
  `game_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users_by_games`
--

INSERT INTO `users_by_games` (`user_id`, `game_id`) VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 4),
(2, 116),
(3, 1),
(3, 2),
(3, 116),
(4, 3),
(4, 4);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assets_owner_idx` (`owner_id`);

--
-- Index pour la table `gamemodes`
--
ALTER TABLE `gamemodes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `games_gamemode_id_foreign_idx` (`gamemode_id`),
  ADD KEY `games_template_sheet_id_foreign_idx` (`template_sheet_id`);

--
-- Index pour la table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tags_by_games`
--
ALTER TABLE `tags_by_games`
  ADD PRIMARY KEY (`tag_id`,`game_id`),
  ADD KEY `tags_by_games_game_id_foreign_idx` (`game_id`);

--
-- Index pour la table `template_sheets`
--
ALTER TABLE `template_sheets`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users_by_games`
--
ALTER TABLE `users_by_games`
  ADD PRIMARY KEY (`game_id`,`user_id`) USING BTREE,
  ADD KEY `user_by_games_user_idx` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `gamemodes`
--
ALTER TABLE `gamemodes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `games`
--
ALTER TABLE `games`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT pour la table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pour la table `template_sheets`
--
ALTER TABLE `template_sheets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_owner_idx` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_gamemode_id_foreign` FOREIGN KEY (`gamemode_id`) REFERENCES `gamemodes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`template_sheet_id`) REFERENCES `template_sheets` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `tags_by_games`
--
ALTER TABLE `tags_by_games`
  ADD CONSTRAINT `tags_by_games_game_id_foreign` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tags_by_games_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users_by_games`
--
ALTER TABLE `users_by_games`
  ADD CONSTRAINT `user_by_games_game_idx` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_by_games_user_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
