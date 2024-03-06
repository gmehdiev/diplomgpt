import { Body, Controller, Post, Res } from '@nestjs/common';
import { ProxyDto } from './dto/proxy.dto';
import { Response } from 'express';
import { ProxyService } from './proxy.service';
import { PrismaService } from '@prisma/prisma.service';

@Controller('proxy')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService) { }

    @Post()
    async addApiKeyWithProxy(@Body() dto: ProxyDto, @Res() res: Response) {
        await this.proxyService.validateApiKey(dto);

        return res.status(200);
    }
}
