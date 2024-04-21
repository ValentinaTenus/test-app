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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe()) 
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.authService.login(dto);

    return res.json({
      ...response,
      refreshToken,
    });
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
  
    const refreshTokenFromHeader = req.headers['authorization'];

    if (!refreshTokenFromHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [, refreshToken] = refreshTokenFromHeader.split(' ');

    const { refreshToken: newRefreshToken, ...response } = await this.authService.getNewTokens(
      refreshToken,
    );

    return res.json({
      ...response,
      refreshToken: newRefreshToken,
    });
  }

  @HttpCode(200)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {

    return res.json({
      success: true,
    });
  }
}
