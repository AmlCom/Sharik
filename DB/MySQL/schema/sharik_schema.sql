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
  `usernam` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `mobile_phone` INT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usernam_UNIQUE` (`usernam` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));


    -- Inserting Fake data to table 'users':
    INSERT INTO `sharik`.`users` (`usernam`, `name`, `email`, `mobile_phone`, `password`) 
    VALUES ('aa', 'a a', 'aa@a.com', '0788967341', '111');

    INSERT INTO `sharik`.`users` (`usernam`, `name`, `email`, `mobile_phone`, `password`) 
    VALUES ('bb', 'b b', 'bb@b.com', '0793426742', '222');

    INSERT INTO `sharik`.`users` (`usernam`, `name`, `email`, `password`) 
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


