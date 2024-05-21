import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { ChatOwnershipGuard } from '../quard/chat.quard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(ChatOwnershipGuard)
  @Get(':uuid')
  async getAllMessage(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.messageService.allMessages(uuid);
  }
}