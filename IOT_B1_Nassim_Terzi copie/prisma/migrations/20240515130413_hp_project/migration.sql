-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- CreateTable
CREATE TABLE `Card` (
    `id_card` INTEGER NOT NULL AUTO_INCREMENT,
    `pseudo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `house` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `actor` VARCHAR(191) NOT NULL,
    `power` VARCHAR(191) NOT NULL,
    `rarity` DOUBLE NOT NULL,

    PRIMARY KEY (`id_card`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCards` (
    `id_user` INTEGER NOT NULL,
    `id_card` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id_user`, `id_card`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCards` ADD CONSTRAINT `UserCards_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCards` ADD CONSTRAINT `UserCards_id_card_fkey` FOREIGN KEY (`id_card`) REFERENCES `Card`(`id_card`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
