-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "profileUuid" TEXT;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_profileUuid_fkey" FOREIGN KEY ("profileUuid") REFERENCES "profile"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
