import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Users } from '@prisma/client';

import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Get('/')
  @Auth()
  async profile(@CurrentUser() user: Users) {
    return await this.userService.getProfile(user.id);
  }

  @UsePipes(new ValidationPipe())
  @Put()
  @HttpCode(200)
  @Auth()
  async updateProfile(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }
}
