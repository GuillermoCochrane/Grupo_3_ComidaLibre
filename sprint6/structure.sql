-- CREAR LA DB
DROP DATABASE IF EXISTS freefood_db;
CREATE DATABASE freefood_db DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
-- USAR LA DB
USE freefood_db;

-- CREAR LAS TABLAS
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `statuses`;
CREATE TABLE `statuses` (
    `id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
    `id` INT(2) unsigned NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    `id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `price` DECIMAL(10,2) NOT NULL,
    `image` VARCHAR(255) NOT NULL DEFAULT 'default.png',
    `description` TEXT(500),
    `discount` TINYINT(3) DEFAULT 0,
    `categories_id` INT(6) unsigned NOT NULL,
    `statuses_id` INT(6) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `categories_id_idx` (`categories_id` ASC),
    INDEX `statuses_id_idx` (`statuses_id` ASC),
    FOREIGN KEY (`categories_id`)
        REFERENCES `categories` (`id`),
    FOREIGN KEY (`statuses_id`)
        REFERENCES `statuses` (`id`)
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL UNIQUE,
    `email` VARCHAR(45) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL UNIQUE,
    `image` VARCHAR(255) NOT NULL DEFAULT 'default.png',
    `first_name` VARCHAR(45),
    `last_name` VARCHAR(45),
    `address` VARCHAR(100),
    `phone` VARCHAR(45),
    `roles_id` INT(2) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `roles_id_idx` (`roles_id` ASC),
    FOREIGN KEY (`roles_id`)
        REFERENCES `roles` (`id`)
);

DROP TABLE IF EXISTS `favourites`;
CREATE TABLE `favourites` (
    `id` INT(4) unsigned NOT NULL AUTO_INCREMENT,
    `users_id` INT(6) unsigned NOT NULL,
    `products_id` INT(6) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `users_id_idx` (`users_id` ASC),
    INDEX `products_id_idx` (`products_id` ASC),
    FOREIGN KEY (`users_id`)
        REFERENCES `users` (`id`),
    FOREIGN KEY (`products_id`) 
        REFERENCES `products` (`id`)
);

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
    `id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
    `users_id` INT(6) unsigned NOT NULL,
    `products_id` INT(6) unsigned NOT NULL,
    `quantity` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`),
    INDEX `users_id_idx` (`users_id` ASC),
    INDEX `products_id_idx` (`products_id` ASC),
    FOREIGN KEY (`users_id`) 
        REFERENCES `users` (`id`),
    FOREIGN KEY (`products_id`) 
        REFERENCES `products` (`id`)
);

DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
    `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    `payment_method` VARCHAR (45) DEFAULT 'debit',
    `total` DECIMAL(10,2) NOT NULL,
    `users_id` INT(6) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `users_id_idx` (`users_id` ASC),
    FOREIGN KEY (`users_id`)
        REFERENCES `users` (`id`)
);

DROP TABLE IF EXISTS `sales_details`;
CREATE TABLE `sales_details` (
    `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
    `quantity` TINYINT(2),
    `unit_price` DECIMAL(10,2),
    `discount` TINYINT(3),
    `total` DECIMAL(10,2) DEFAULT NULL,
    `sales_id` INT(10) unsigned NOT NULL,
    `products_id` INT(10) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `sales_id_idx` (`sales_id` ASC),
    INDEX `products_id_idx` (`products_id` ASC),
    FOREIGN KEY (`sales_id`)
        REFERENCES `sales` (`id`),
    FOREIGN KEY (`products_id`)
        REFERENCES `products` (`id`)
);

