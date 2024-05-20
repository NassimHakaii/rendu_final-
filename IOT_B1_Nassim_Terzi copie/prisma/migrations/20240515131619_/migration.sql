/*
  Warnings:

  - The primary key for the `usercards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `UserCards` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- DropIndex
DROP INDEX `UserCards_id_card_fkey` ON `usercards`;

-- AlterTable
ALTER TABLE `usercards` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `UserCards` ADD CONSTRAINT `UserCards_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCards` ADD CONSTRAINT `UserCards_id_card_fkey` FOREIGN KEY (`id_card`) REFERENCES `Card`(`id_card`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
