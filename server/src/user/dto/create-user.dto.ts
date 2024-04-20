import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
