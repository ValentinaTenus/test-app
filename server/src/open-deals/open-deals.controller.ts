import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OpenDealsService } from './open-deals.service';
import { CreateOpenDealDto } from './dto/create-open-deal.dto';
import { UpdateOpenDealDto } from './dto/update-open-deal.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('open-deals')
export class OpenDealsController {
  constructor(private readonly openDealsService: OpenDealsService) {}

  @UsePipes(new ValidationPipe())
  @Post('/')
  @Auth()
  create(@Body() createOpenDealDto: CreateOpenDealDto) {
    return this.openDealsService.create(createOpenDealDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.openDealsService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.openDealsService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateOpenDealDto: UpdateOpenDealDto,
  ) {
    return this.openDealsService.update(id, updateOpenDealDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.openDealsService.remove(id);
  }
}
