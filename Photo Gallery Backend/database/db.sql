CREATE DATABASE photo_gallery;

USE photo_gallery;

CREATE TABLE IF NOT EXISTS `images`(
    `id_img` INT(11) unsigned AUTO_INCREMENT NOT NUll,
    `id_album` INT (11) unsigned NULL,
    `title` VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    `dimentions` VARCHAR(255) NOT NULL,
    `size` INT(11) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `public_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `update_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id_img`)
)ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `albums`(
    `id_album` INT(11) unsigned AUTO_INCREMENT NOT NUll,
    `name` VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    `background_image_url` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `update_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id_album`)
)ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `album_images` (
    `id` INT(11) unsigned AUTO_INCREMENT NOT NUll,
    `id_album` INT(11) unsigned  NOT NUll,
    `id_image` INT(11) unsigned  NOT NUll,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `update_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_album`)
      REFERENCES albums(`id_album`),
      FOREIGN KEY (`id_image`)
      REFERENCES images(`id_img`)
)ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

DESCRIBE `album_images`;
