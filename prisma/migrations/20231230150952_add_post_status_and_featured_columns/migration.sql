-- AlterTable
ALTER TABLE `post` ADD COLUMN `featured` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `status` TINYINT NOT NULL DEFAULT 1;
