import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { hashSync, genSaltSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async save(user: Partial<User>) {
    const hashedPassword = this.hashPassword(user.password);
    const savedUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        isActivated: user.isActivated,
        activationLink: user.activationLink,
      },
    });
    return savedUser;
  }

  async findOne(uniqueField: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ uuid: uniqueField }, { email: uniqueField }],
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async getAllUsers() {
    const users = await this.prismaService.user.findMany({});

    const mappedUser = users.map((item) => {
      return {
        uuid: item.uuid,
        email: item.email,
      };
    });
    return mappedUser;
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
