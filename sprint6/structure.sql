-- CREAR LA DB
DROP DATABASE IF EXISTS freefood_db;
CREATE DATABASE freefood_db;

-- USAR LA DB
USE freefood_db;

-- CREAR LAS TABLAS



-- TABLA products
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100),
  `description` text(500),
  `price` decimal(10,2),
  `image` varchar(255),
  `discount` tinyint(3),
  `category_id` int(6) unsigned NOT NULL,
  `status_id` int(6) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_status_id_foreign` (`status_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
  CONSTRAINT `products_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- TABLA statuses
DROP TABLE IF EXISTS `statuses`;
CREATE TABLE `statuses` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




-- TABLA categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;





-- TABLA favourites
DROP TABLE IF EXISTS `favourites`;
CREATE TABLE `favourites` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(6) unsigned NOT NULL,
  `user_id` int(6) unsigned NOT NULL,
  PRIMARY KEY (`id`)
  KEY `favourites_product_id_foreign` (`product_id`),
  KEY `favourites_user_id_foreign` (`user_id`),
  CONSTRAINT `favourites_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
  CONSTRAINT `favourites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;





-- TABLA cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` tinyint(2),
  `subtotal` decimal(10,2),
  `product_id` int(6) unsigned NOT NULL,
  `user_id` int(6) unsigned NOT NULL,
  PRIMARY KEY (`id`)
  KEY `cart_product_id_foreign` (`product_id`),
  KEY `cart_user_id_foreign` (`user_id`),
  CONSTRAINT `cart_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
  CONSTRAINT `cart_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;





-- TABLA users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45),
  `last_name` varchar(45),
  `address` varchar(100),
  `email` varchar(45) NOT NULL UNIQUE,
  `phone` varchar(45),
  `username` varchar(45) NOT NULL UNIQUE,
  `password` varchar(45) NOT NULL UNIQUE,
  `image` varchar(255),
  `role_id` int(2) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;






-- TABLA roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;








-- TABLA sales
DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp,
  `updated_at` timestamp,
  `total` decimal(10,2),
    `user_id` int(6) unsigned NOT NULL,
  PRIMARY KEY (`id`)
  KEY `sales_user_id_foreign` (`user_id`),
  CONSTRAINT `sales_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;











-- TABLA sales_details
DROP TABLE IF EXISTS `sales_details`;
CREATE TABLE `sales_details` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` tinyint(2),
  `subtotal` decimal(10,2),
  `product_id` int(6) unsigned NOT NULL,
  `sale_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
  KEY `sales_details_product_id_foreign` (`product_id`),
  KEY `sales_details_sale_id_foreign` (`sale_id`),
  CONSTRAINT `sales_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
  CONSTRAINT `sales_details_sale_id_foreign` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



