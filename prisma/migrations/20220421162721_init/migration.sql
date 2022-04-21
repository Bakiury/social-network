-- CreateTable
CREATE TABLE `User` (
    `use_id` INTEGER NOT NULL AUTO_INCREMENT,
    `use_name` VARCHAR(30) NULL,
    `use_lastname` VARCHAR(30) NULL,
    `use_email` VARCHAR(60) NOT NULL,
    `use_password` VARCHAR(100) NOT NULL,
    `use_image` VARCHAR(64) NOT NULL,
    `use_birthday` DATETIME(3) NOT NULL,
    `use_description` VARCHAR(256) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_use_email_key`(`use_email`),
    PRIMARY KEY (`use_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `pos_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pos_description` VARCHAR(256) NOT NULL,
    `pos_title` VARCHAR(20) NOT NULL,
    `pos_image` VARCHAR(64) NOT NULL,
    `pos_use_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pos_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `com_id` INTEGER NOT NULL AUTO_INCREMENT,
    `com_description` VARCHAR(256) NOT NULL,
    `com_use_id` INTEGER NULL,
    `com_pos_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`com_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_pos_use_id_fkey` FOREIGN KEY (`pos_use_id`) REFERENCES `User`(`use_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_com_use_id_fkey` FOREIGN KEY (`com_use_id`) REFERENCES `User`(`use_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_com_pos_id_fkey` FOREIGN KEY (`com_pos_id`) REFERENCES `Post`(`pos_id`) ON DELETE SET NULL ON UPDATE CASCADE;
