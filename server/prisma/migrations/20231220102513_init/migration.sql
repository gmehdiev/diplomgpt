-- CreateEnum
CREATE TYPE "AiRole" AS ENUM ('system', 'user', 'assistant');

-- CreateTable
CREATE TABLE "profile" (
    "uuid" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 1,
    "userUuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "chat" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL DEFAULT 1,
    "top_t" INTEGER NOT NULL DEFAULT 1,
    "frequency_penalty" INTEGER NOT NULL DEFAULT 0,
    "presence_penalty" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE " message" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "chatUuid" TEXT,

    CONSTRAINT " message_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "current_message" (
    "id" TEXT NOT NULL,
    "is_selected" BOOLEAN NOT NULL DEFAULT true,
    "role" "AiRole" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "messageUuid" TEXT,

    CONSTRAINT "current_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userUuid_key" ON "profile"("userUuid");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE " message" ADD CONSTRAINT " message_chatUuid_fkey" FOREIGN KEY ("chatUuid") REFERENCES "chat"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "current_message" ADD CONSTRAINT "current_message_messageUuid_fkey" FOREIGN KEY ("messageUuid") REFERENCES " message"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
