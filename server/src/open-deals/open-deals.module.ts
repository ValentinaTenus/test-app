import { Module } from '@nestjs/common';
import { OpenDealsService } from './open-deals.service';
import { OpenDealsController } from './open-deals.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OpenDealsController],
  providers: [OpenDealsService, PrismaService],
})
export class OpenDealsModule {}
