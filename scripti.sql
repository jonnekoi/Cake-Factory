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
(25, 'testi ', 10),
(26, 'testi ', 10),
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

INSERT INTO `ingredients_products` (`ingredient_id`, `product_id`) VALUES
(1, 58),
(1, 59),
(1, 60),
(1, 61),
(1, 62),
(1, 63),
(1, 64),
(1, 65),
(1, 66),
(1, 67),
(1, 68),
(1, 69),
(1, 70),
(1, 71),
(1, 72),
(1, 73),
(2, 58),
(2, 59),
(2, 60),
(2, 61),
(2, 62),
(2, 63),
(2, 64),
(2, 65),
(2, 66),
(2, 67),
(2, 68),
(2, 69),
(2, 70),
(2, 71),
(2, 72),
(2, 73),
(3, 58),
(3, 59),
(3, 60),
(3, 61),
(3, 62),
(3, 63),
(3, 64),
(3, 65),
(3, 66),
(3, 67),
(3, 68),
(3, 69),
(3, 70),
(3, 71),
(3, 72),
(3, 73),
(4, 58),
(4, 59),
(4, 60),
(4, 61),
(4, 62),
(4, 63),
(4, 64),
(4, 65),
(4, 66),
(4, 67),
(4, 68),
(4, 69),
(4, 70),
(4, 71),
(4, 72),
(4, 73),
(5, 59),
(5, 61),
(5, 62),
(5, 64),
(5, 65),
(5, 66),
(5, 67),
(5, 69),
(5, 70),
(5, 71),
(5, 73),
(6, 60),
(6, 67),
(6, 68),
(6, 70),
(6, 72),
(6, 73),
(7, 59),
(7, 67),
(7, 69),
(7, 70),
(8, 61),
(8, 65),
(9, 62),
(9, 65),
(9, 73),
(10, 60),
(10, 68),
(10, 72),
(11, 63),
(12, 63),
(15, 64),
(27, 58),
(28, 66),
(28, 67),
(30, 71),
(31, 71);

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

INSERT INTO `products` (`id`, `name`, `price`, `description`, `img`) VALUES
(48, 'testi', 23, 'imgdasdas', 'img95bdfac67fc8f4c4f473db03d6f0270b.png'),
(49, 'testi', 100, 'Toimiiko update?', 'img1cbf02876cc31f2888c2d69fb6b769d0.png'),
(51, 'sadsad', 23, 'sdaasd', 'img170090c5daa6c2444943c8d82e9dcb4a.png'),
(52, 'Kissa', 123, 'Kisu', 'imgef2cf73354fba940d8aa61ae274acdf4.jpeg'),
(58, 'Classic Vanilla Cake', 25, 'A timeless treat with a fluffy vanilla sponge and creamy buttercream frosting.', 'imgdae625bde41eb3fde056d1dd4bb2b657.jpeg'),
(59, 'Chocolate Fudge Cake', 30, 'Indulge in rich layers of chocolate goodness, perfect for any chocolate lover.', 'imgafb5cf3b09b9242b4eb95b1a385392e4.jpeg'),
(60, 'Nutty Banana Bread Cake', 30, 'A moist banana cake with a delightful crunch of nuts, great for breakfast or dessert.', 'img35a97fcb027aa09ef9f2934cd9004e7e.jpeg'),
(61, 'Strawberry Shortcake', 35, 'Layers of fluffy cake, fresh strawberries, and whipped cream, a classic delight.', 'img53fe231df7a515244a1802344c2ef35d.jpeg'),
(62, 'Blueberry Lemon Cake', 35, 'Tangy lemon cake dotted with juicy blueberries, a refreshing treat.', 'imgfdc382d9d1921c5784fc2b5ebfb28986.jpeg'),
(63, 'Kiwi Cheesecake', 40, 'Creamy cheesecake infused with zesty kiwi, a tropical delight.', 'img5bae4639e2bb1b2269c899725e453a2d.jpeg'),
(64, 'Apple Cinnamon Spice Cake', 30, 'Warm spices, tender apples, and a hint of cinnamon make this cake perfect for cozy ', 'img89c359e1324e1773c5051f239c891893.jpeg'),
(65, 'Triple Berry Delight Cake', 36, 'Bursting with the goodness of strawberries and blueberries, a fruity sensation in every bite.', 'imga7415d51e6a5b643bbde4fb3944907c0.jpeg'),
(66, 'Coconut Cream Cake', 40, 'Fluffy coconut cake layered with luscious cream, a tropical escape for your taste buds.', 'imge3ccb1f26e30ba2e35bfcaff9ca592fb.jpeg'),
(67, 'Almond Joy Cake', 45, 'Inspired by the popular candy, this cake features layers of almond, chocolate, and coconut.', 'imgba7699363c9b655bac42a5ecc290ac31.jpeg'),
(68, 'Banana Walnut Cake', 25, 'Moist banana cake packed with crunchy walnuts, a classic combination.', 'imgdbe0578272427079bca45335a7137fb7.jpeg'),
(69, 'Red Velvet Cake', 35, 'Rich, velvety layers of cocoa-infused cake, topped with smooth cream cheese frosting.', 'img8815af48edbe313c30cee978a6bd659b.jpeg'),
(70, 'Peanut Butter Chocolate Cake', 45, 'A heavenly combination of peanut butter and chocolate, a true indulgence for your taste buds.', 'img31ddecadd7f67a24b9f388ae5b40c34a.jpeg'),
(71, 'Lemon Raspberry Cake', 25, 'Bright lemon cake paired with tart raspberries, a delightful balance of sweet and tangy.', 'img9819e264b81c6803f2723bbd973834d2.jpeg'),
(72, 'Banana Nut Muffins', 4, 'Moist banana muffins with a crunchy walnut topping, perfect for a quick breakfast or snack.', 'imga1a323b0bed073f94e74555fd9f4befb.jpeg'),
(73, 'Blueberry Almond Muffins', 4, 'Tender muffins bursting with juicy blueberries and topped with sliced almonds for a delightful crunch.', 'imgd398b68f10345203d1d564320f50db06.jpeg');

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
