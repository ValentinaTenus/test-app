import { IsInt, IsString } from 'class-validator';

export class CreateOpenDealDto {
  @IsString()
  buildingName: string;

  @IsString()
  price: string;

  @IsString()
  ticketPrice: string;

  @IsString()
  yield: string;

  @IsInt()
  daysLeft: number;

  @IsString()
  sold: string;
}
