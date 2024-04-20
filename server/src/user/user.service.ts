import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { RegistrationDto } from 'src/auth/dto/registration.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.users.findUnique({
      where: { id: id },
    });
  }

  getByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async create(dto: RegistrationDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password),
    };

    return this.prisma.users.create({ data: user });
  }

  async update(id: string, dto: UpdateUserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.users.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true,
      },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    const { password, ...user } = profile;

    return {
      user: user,
    };
  }
}
