import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':uuid')
  async getAllMessage(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.messageService.allMessages(uuid);
  }
}
