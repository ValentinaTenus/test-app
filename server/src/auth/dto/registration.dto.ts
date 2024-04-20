import { IsEmail, MinLength, IsString } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string;

  @IsString()
  name: string;
}
