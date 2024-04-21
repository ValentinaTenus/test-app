import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';

import { UserService } from 'src/user/user.service';
import { LoginDto, RegistrationDto } from './dto/dto';
import {
  RefreshTokenExpireDays,
  RefreshTokenName,
} from './constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    const { password, ...user } = await this.validateUser(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async registration(dto: RegistrationDto) {
    const existedUser = await this.userService.getByEmail(dto.email);

    if (existedUser) {
      throw new BadRequestException('User with this email already exist');
    }

    const { password, ...user } = await this.userService.create(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  addRefreshTokenToResponse(response: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + RefreshTokenExpireDays);

    const domain = process.env.NODE_ENV === 'production' ? '.onrender.com' : 'localhost';

    response.cookie(RefreshTokenName, refreshToken, {
      httpOnly: true,
      domain: domain,
      expires: expiresIn,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(response: Response) {
    const domain = process.env.NODE_ENV === 'production' ? 'test-app-api-v2nv.onrender.com' : 'localhost';
    
    response.cookie(RefreshTokenName, '', {
      httpOnly: true,
      domain: domain,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { password, ...user } = await this.userService.getById(result.id);
    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }
}
