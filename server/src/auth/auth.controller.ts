import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto/dto';
import { Request, Response } from 'express';
import { RefreshTokenName } from './constants/refresh-token-name';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe()) //to make validation works, check dto
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.authService.login(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegistrationDto) {
    return await this.authService.registration(dto);
  }

  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Req() req: Request, @Res() res: Response) {
    const refreshTokenFromCookie = req.cookies[RefreshTokenName];

    if (!refreshTokenFromCookie) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookie,
    );
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);

    return true;
  }
}
