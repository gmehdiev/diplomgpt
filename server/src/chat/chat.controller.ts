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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from './chat.service';
import { ChatDto, UpdateChatDto } from './dto/chat.dto';
import {  ProfileOwnershipGuard } from './quard/profile.quard';
import { ChatOwnershipGuard } from './quard/chat.quard';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('')
  async create(@Body() dto: ChatDto, @Res() res: Response) {
    const chat = await this.chatService.create(dto.profileUuid);
    res.json(chat);
  }

  @UseGuards(ChatOwnershipGuard)
  @Delete(':uuid')
  async delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chatService.delete(uuid);
    // res.json(chat)
  }

  @UseGuards(ChatOwnershipGuard)
  @Patch(':uuid')
  async update(
    @Body() body: UpdateChatDto,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    return this.chatService.update(uuid, body.name);
  }

  @UseGuards(ProfileOwnershipGuard)
  @Get(':uuid')
  async getAllChat(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chatService.getAllChat(uuid);
  }
}
