SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `cakefactory` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cakefactory`;

CREATE TABLE `allergens` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `allergens` (`id`, `name`) VALUES
(1, 'Dairy'),
(2, 'Gluten'),
(3, 'Nuts'),
(4, 'Almond'),
(5, 'Egg'),
(6, 'Soy'),
(7, 'Lactose'),
(8, 'Strawberry'),
(9, 'Kiwi'),
(10, 'Apple'),
(11, 'hiiva');

CREATE TABLE `allergens_ingredients` (
  `allergen_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `allergens_ingredients` (`allergen_id`, `ingredient_id`) VALUES
(1, 4),
(1, 5),
(1, 7),
(1, 12),
(2, 1),
(3, 6),
(3, 7),
(3, 14),
(4, 13),
(5, 3),
(6, 7),
(7, 12),
(8, 8),
(9, 11),
(10, 15);

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `category_product` (
  `category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `discount` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `amount` float NOT NULL,
  `code` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `discount` (`id`, `name`, `amount`, `code`) VALUES
(8, 'Avajaistarjous', 10, 'AVAJAISET24');

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `ingredients` (`id`, `name`, `price`) VALUES
(1, 'Flour', 0.5),
(2, 'Sugar', 0.8),
(3, 'Eggs', 1.1),
(4, 'Butter', 0.6),
(5, 'Milk', 0.9),
(6, 'Nuts', 1.5),
(7, 'Chocolate', 2.5),
(8, 'Strawberries', 3.5),
(9, 'Blueberries', 1.3),
(10, 'Banana', 3.2),
(11, 'Kiwi', 1.75),
(12, 'Cream cheese', 2.1),
(13, 'Salt', 0.12),
(14, 'Bolt', 0.12),
(15, 'Apple', 0.54),
(27, 'Vanilla Extract', 2),
(28, 'Coconut', 2),
(29, 'Coffee', 3),
(30, 'Lemon', 2),
(31, 'Raspberry', 2),
(32, 'Orange', 2);

CREATE TABLE `ingredients_products` (
  `ingredient_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `price` float NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `orderer` int(11) DEFAULT NULL,
  `street_name` text NOT NULL,
  `street_num` text NOT NULL,
  `zip_code` int(11) NOT NULL,
  `city` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `orders_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `street_name` text DEFAULT NULL,
  `street_num` int(11) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `city` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `access` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

ALTER TABLE `allergens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_allergens_name` (`name`(3072));

ALTER TABLE `allergens_ingredients`
  ADD PRIMARY KEY (`allergen_id`,`ingredient_id`),
  ADD KEY `allergens_ingredients_ingredients__fk` (`ingredient_id`);

ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category_category` (`category`(3072));

ALTER TABLE `category_product`
  ADD PRIMARY KEY (`category_id`,`product_id`),
  ADD KEY `category_product_products__fk` (`product_id`);

ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ingredients_name` (`name`(3072)),
  ADD KEY `idx_ingredients_price` (`price`);

ALTER TABLE `ingredients_products`
  ADD PRIMARY KEY (`ingredient_id`,`product_id`),
  ADD KEY `ingredients_products_products__fk` (`product_id`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_users__fk` (`orderer`),
  ADD KEY `idx_orders_date` (`date`),
  ADD KEY `idx_orders_status` (`status`);

ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `idx_orders_products_order_id` (`order_id`),
  ADD KEY `idx_orders_products_product_id` (`product_id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_products_name` (`name`(3072)),
  ADD KEY `idx_products_price` (`price`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_users_username` (`username`(3072));


ALTER TABLE `allergens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `discount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;


ALTER TABLE `allergens_ingredients`
  ADD CONSTRAINT `allergens_ingredients_allergens__fk` FOREIGN KEY (`allergen_id`) REFERENCES `allergens` (`id`),
  ADD CONSTRAINT `allergens_ingredients_ingredients__fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

ALTER TABLE `category_product`
  ADD CONSTRAINT `category_product_category__fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `category_product_products__fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `ingredients_products`
  ADD CONSTRAINT `ingredients_products_ingredients__fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`),
  ADD CONSTRAINT `ingredients_products_products__fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_users__fk` FOREIGN KEY (`orderer`) REFERENCES `users` (`id`);

ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_orders__fk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orders_products_products__fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
