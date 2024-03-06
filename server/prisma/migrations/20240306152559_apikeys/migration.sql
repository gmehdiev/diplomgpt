/*
  Warnings:

  - The primary key for the `current_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `current_message` table. All the data in the column will be lost.
  - The required column `uuid` was added to the `current_message` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "current_message" DROP CONSTRAINT "current_message_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "current_message_pkey" PRIMARY KEY ("uuid");

-- CreateTable
CREATE TABLE "apiKeys" (
    "uuid" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "proxy_address" TEXT NOT NULL,
    "proxy_port" TEXT NOT NULL,
    "proxy_username" TEXT NOT NULL,
    "proxy_password" TEXT NOT NULL,
    "used_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apiKeys_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "apiKeys_api_key_key" ON "apiKeys"("api_key");

-- CreateIndex
CREATE UNIQUE INDEX "apiKeys_proxy_address_key" ON "apiKeys"("proxy_address");
