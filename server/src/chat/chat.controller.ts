import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from './chat.service';
import { ChatDto, UpdateChatDto } from './dto/chat.dto';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('')
  async create(@Body() dto: ChatDto, @Res() res: Response) {
    const chat = await this.chatService.create(dto.profileUuid);
    res.json(chat);
  }

  @Delete(':uuid')
  async delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chatService.delete(uuid);
    // res.json(chat)
  }

  @Patch(':uuid')
  async update(
    @Body() body: UpdateChatDto,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    return this.chatService.update(uuid, body.name);
    // res.json(chat)
  }

  @Get(':uuid')
  async getAllChat(@Param('uuid', new ParseUUIDPipe()) uuid: string){
    return this.chatService.getAllChat(uuid);
  }
}
