/*
  Warnings:

  - You are about to drop the column `proxy_address` on the `apiKeys` table. All the data in the column will be lost.
  - You are about to drop the column `proxy_password` on the `apiKeys` table. All the data in the column will be lost.
  - You are about to drop the column `proxy_port` on the `apiKeys` table. All the data in the column will be lost.
  - You are about to drop the column `proxy_username` on the `apiKeys` table. All the data in the column will be lost.
  - Added the required column `proxy_link` to the `apiKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `used_at` to the `apiKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `used_count` to the `apiKeys` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "apiKeys_proxy_address_key";

-- AlterTable
ALTER TABLE "apiKeys" DROP COLUMN "proxy_address",
DROP COLUMN "proxy_password",
DROP COLUMN "proxy_port",
DROP COLUMN "proxy_username",
ADD COLUMN     "proxy_link" TEXT NOT NULL,
ADD COLUMN     "used_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "used_count" INTEGER NOT NULL;
