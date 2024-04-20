import { PartialType } from '@nestjs/mapped-types';
import { CreateOpenDealDto } from './create-open-deal.dto';

export class UpdateOpenDealDto extends PartialType(CreateOpenDealDto) {}
