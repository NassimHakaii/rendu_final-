/*
  Warnings:

  - Made the column `image` on table `card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- DropIndex
DROP INDEX `UserCards_id_card_fkey` ON `usercards`;

-- DropIndex
DROP INDEX `UserCards_id_user_fkey` ON `usercards`;

-- AlterTable
ALTER TABLE `card` MODIFY `image` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserCards` ADD CONSTRAINT `UserCards_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCards` ADD CONSTRAINT `UserCards_id_card_fkey` FOREIGN KEY (`id_card`) REFERENCES `Card`(`id_card`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
