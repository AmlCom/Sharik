-- 
-- 
-- 

-- Creating Database 'sharik':  

CREATE SCHEMA IF NOT EXISTS `sharik` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- Select Database 'sharik' to use for creating tables:
USE sharik;

-- Crating table 'users' 
CREATE TABLE IF NOT EXISTS `sharik`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL UNIQUE,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `mobile_phone` INT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));


    -- Inserting Fake data to table 'users':
    INSERT INTO `sharik`.`users` (`username`, `name`, `email`, `mobile_phone`, `password`) 
    VALUES ('aa', 'a a', 'aa@a.com', '0788967341', '111');

    INSERT INTO `sharik`.`users` (`username`, `name`, `email`, `mobile_phone`, `password`) 
    VALUES ('bb', 'b b', 'bb@b.com', '0793426742', '222');

    INSERT INTO `sharik`.`users` (`username`, `name`, `email`, `password`) 
    VALUES ('cc', 'c c', 'cc@c.com', '333');


-- Crating table 'service' 

CREATE TABLE `sharik`.`service` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `time_start` DATETIME NULL,
  `time_end` DATETIME NULL,
  `place_pick` VARCHAR(100) NULL,
  `place_drop` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

        -- Inserting Fake data to table 'users':
        INSERT INTO `sharik`.`service` (`user_id`, `name`, `description`, `place_pick`, `place_drop`) 
        VALUES ('2', 'car', 'car form to amman to zarqa', 'https://goo.gl/maps/jfqGprEEaPA2', 'https://www.google.com/maps/@32.0625536,36.0942746,20.99z');

        INSERT INTO `sharik`.`service` (`user_id`, `name`, `description`, `place_pick`) 
        VALUES ('1', 'room', 'room for two days', 'https://goo.gl/maps/Rhzqd8hqpGu');


ALTER TABLE `sharik`.`service` ADD CONSTRAINT `service_fk0` FOREIGN KEY (`user_id`) REFERENCES `sharik`.`users`(`id`);


-- 
CREATE TABLE `users` (
	`id` int NOT NULL,
	`username` varchar(45) NOT NULL UNIQUE,
	`name` varchar(45),
	`email` varchar(100) UNIQUE,
	`mobile_phone` int,
	`password` varchar(200) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `service` (
	`id` int NOT NULL,
	`user_id`  NOT NULL,
	`name` varchar(45) NOT NULL,
	`description` TEXT,
	`time_start` DATETIME,
	`time_end` DATETIME,
	`place_pick` varchar(100),
	`place_drop` varchar(100),
	PRIMARY KEY (`id`)
);

ALTER TABLE `service` ADD CONSTRAINT `service_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
