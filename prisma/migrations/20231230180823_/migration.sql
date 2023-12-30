/*
  Warnings:

  - You are about to alter the column `featured` on the `post` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(1)`.
  - You are about to alter the column `status` on the `post` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `featured` VARCHAR(1) NOT NULL DEFAULT '0',
    MODIFY `status` VARCHAR(1) NOT NULL DEFAULT '1';
