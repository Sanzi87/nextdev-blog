-- AlterTable
ALTER TABLE `category` ADD COLUMN `desc` VARCHAR(191) NULL,
    ADD COLUMN `img` VARCHAR(191) NOT NULL DEFAULT 'no-image.webp';

-- AlterTable
ALTER TABLE `post` MODIFY `img` VARCHAR(191) NOT NULL DEFAULT 'no-image.webp';
