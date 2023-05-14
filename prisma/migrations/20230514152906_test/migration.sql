/*
  Warnings:

  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_ownerId_fkey";

-- DropIndex
DROP INDEX "Post_ownerId_id_idx";

-- DropIndex
DROP INDEX "Post_ownerId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "body",
DROP COLUMN "deleted",
DROP COLUMN "ownerId";
