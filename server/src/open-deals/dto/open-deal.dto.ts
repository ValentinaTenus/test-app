import { IsString } from 'class-validator';

import { CreateOpenDealDto } from './create-open-deal.dto';

export class OpenDeal extends CreateOpenDealDto {
  @IsString()
  id: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
